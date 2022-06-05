import { HydratedDocument, Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { IMessage } from "../../../interfaces/models";
import dbConnect from "../../../lib/mongoDB";
import { withSessionRoute } from "../../../lib/withSession";
import Group from "../../../models/Group";
import Message from "../../../models/Message";
import RoomInstance from "../../../models/RoomInstance";

export default withSessionRoute(messagesController);

async function messagesController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { refId, instance } = req.query;

  if (method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!instance) {
    res.status(400).json({ error: "Instance is not specified" });
    return;
  }

  if (!req.body || !req.body.content || !req.body.userId) {
    res.status(400).json({ error: "Bad request due to empty body" });
    return;
  }

  if (!req.session.user || req.session.user._id !== req.body.userId) {
    res.status(400).json({ error: "Cannot identify/deceptive user info" });
    return;
  }

  await dbConnect();

  if (method === "POST") {
    const { content, isImage, groupId, userId } = req.body;
    const newMessage: HydratedDocument<IMessage> = new Message({
      content,
      isImage,
      instance,
      refId,
      user: new Types.ObjectId(userId),
      timestamp: new Date(),
    });
    await newMessage.save();

    if (instance === "Group") {
      const updatingGroup = await Group.findOneAndUpdate(
        { _id: refId },
        { $push: { messages: newMessage } }
      ).exec();
      res.status(200).end();
      return;
    }

    if (instance === "RoomInstance") {
      const updatingRoomInstance = await RoomInstance.findOneAndUpdate(
        { _id: refId },
        { $push: { messages: newMessage } }
      ).exec();
      res.status(200).end();
      return;
    }
  }
  res.status(500).json({ error: "Something went wrong. Please try again " });
  return;
}
