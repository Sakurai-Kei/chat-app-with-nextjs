import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/mongoDB";
import { withSessionRoute } from "../../../../lib/withSession";
import User from "../../../../models/User";
import Group from "../../../../models/Group";
import { IGroup, IRoomInstance, IUser } from "../../../../interfaces/models";
import { Document, HydratedDocument, Types } from "mongoose";
import RoomInstance from "../../../../models/RoomInstance";

export default withSessionRoute(roomInstanceController);

async function roomInstanceController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { roomId } = req.query;

  if (method === "GET") {
    const roomInstance: HydratedDocument<IRoomInstance> =
      await RoomInstance.findById(roomId)
        .lean()
        .populate({
          path: "members",
          select: "name about imgsrc",
        })
        .populate({
          path: "messages",
        })
        .exec();

    if (!roomInstance) {
      res.status(404).json({ error: "No such private instance found" });
      return;
    }
    res.status(200).json(roomInstance);
    return;
  }

  if (method === "POST") {
    const { userId, targetMemberUsername } = req.body;
    const targetUser: IUser = await User.findOne({
      username: targetMemberUsername,
    })
      .lean()
      .exec();

    if (!targetUser) {
      res.status(409).json({ error: "No such user found" });
      return;
    }

    const instanceExist: IRoomInstance = await RoomInstance.findOne({
      $and: [{ members: targetUser._id }, { members: userId }],
    })
      .lean()
      .exec();

    if (instanceExist) {
      res.redirect("/app/instance/" + instanceExist._id.toString());
      return;
    }

    const newInstance: HydratedDocument<IRoomInstance> = new RoomInstance({
      members: [new Types.ObjectId(userId), targetUser._id],
      messages: [],
    });

    await newInstance.save();
    res.status(200).end();
    return;
  }

  if (method === "PATCH") {
    res.status(501).json({ error: "NOT IMPLEMENTED" });
    return;
  }

  if (method === "DELETE") {
    res.status(501).json({ error: "NOT IMPLEMENTED" });
    return;
  }

  res.status(500).json({ error: "Something went wrong. Please try again" });

  return;
}
