import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../../interfaces/models";
import dbConnect from "../../../../lib/mongoDB";
import { withSessionRoute } from "../../../../lib/withSession";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import Group from "../../../../models/Group";
import RoomInstance from "../../../../models/RoomInstance";
import Message from "../../../../models/Message";
import { HydratedDocument } from "mongoose";

export default withSessionRoute(messageController);

async function messageController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { messageId } = req.query;

  if (method === "GET") {
    const message = await Message.findById(messageId)
      .lean()
      .populate({
        path: "user",
        select: "username about imgsrc",
      })
      .exec();

    if (!message) {
      res.status(404).json({ error: "No such message found" });
    }

    res.status(200).json(message);
    return;
  }

  if (method === "POST") {
    if (
      !req.body ||
      !req.body.content ||
      !req.body.instance ||
      !req.body.user
    ) {
      res.status(400).json({ error: "Bad Request" });
      return;
    }
    if (req.body.instance === "private") {
      // FOR PRIVATE INSTANCE
      return;
    }
    if (req.body.instance === "group") {
      // FOR GROUP
      return;
    }
    return;
  }

  res.status(500).json({ error: "Something went wrong. Please try again" });
  return;
}
