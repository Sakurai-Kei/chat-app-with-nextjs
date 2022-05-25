import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/withSession";
import { Types } from "mongoose";
import RoomInstance from "../../../models/RoomInstance";
import User from "../../../models/User";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, targetMemberUsername } = req.body;
  const targetUser = await User.findOne({
    username: targetMemberUsername,
  }).exec();
  const instanceExist = await RoomInstance.findOne({
    $and: [
      { members: targetUser._id },
      { members: new Types.ObjectId(userId) },
    ],
  });
  if (!targetUser) {
    res.status(404).json({ error: "No user found" });
    return;
  }
  if (userId === targetUser._id.toString()) {
    res
      .status(409)
      .json({ error: "You cannot add yourself to a private instance" });
    return;
  }
  if (instanceExist) {
    res.redirect("/app/instance/" + instanceExist._id.toString());
    return;
  }
  const roomInstance = new RoomInstance({
    members: [new Types.ObjectId(userId), targetUser._id],
    messages: [],
  });
  await roomInstance.save();
  res.status(200).end();
  return;
}
