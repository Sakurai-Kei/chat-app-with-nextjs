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
  const { instanceId } = req.query;

  if (!user) {
    res.status(403).json({ error: "Forbidden. Please log in first" });
    return;
  }

  await dbConnect();

  if (method === "GET") {
    const roomInstance: IRoomInstance = await RoomInstance.findById(
      instanceId,
      { messages: { $slice: -15 } }
    )
      .lean()
      .populate({
        path: "messages",
        populate: {
          path: "user",
          select: "username about imgsrc",
        },
      })
      .populate({
        path: "members",
        select: "username about imgsrc",
      })
      .exec();

    res.status(200).json(roomInstance);

    return;
  }

  if (method === "POST") {
    const { userId, targetMemberUsername } = req.body;

    const currentUser: HydratedDocument<IUser> = await User.findById(
      userId
    ).exec();
    const targetUser: HydratedDocument<IUser> = await User.findOne({
      username: targetMemberUsername,
    }).exec();

    if (!targetUser) {
      res.status(404).json({ error: "No such user found" });
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
      members: [new Types.ObjectId(userId), targetUser],
      messages: [],
    });

    await newInstance.save();

    currentUser.roomInstances.push(newInstance);
    targetUser.roomInstances.push(newInstance);

    await currentUser.save();
    await targetUser.save();

    res.status(200).end();
    return;
  }

  res.status(500).json({ error: "Something went wrong. Please try again" });
  return;
}
