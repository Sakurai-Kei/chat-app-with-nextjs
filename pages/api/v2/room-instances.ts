import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/withSession";
import User from "../../../models/User";
import RoomInstance from "../../../models/RoomInstance";
import { IUser, IRoomInstance } from "../../../interfaces/models";
import { HydratedDocument, Types } from "mongoose";
import dbConnect from "../../../lib/mongoDB";

export default withSessionRoute(roomInstancesController);

async function roomInstancesController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { user } = req.session;

  if (!user) {
    res.status(403).json({ error: "Forbidden. Please log in first" });
    return;
  }

  await dbConnect();

  if (method === "GET") {
    // Code to get lists of roomInstances?
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

  res.status(500).json({ error: "Something went wrong. Please try again" });
  return;
}
