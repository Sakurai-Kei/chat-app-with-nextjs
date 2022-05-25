import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoDB";
import { withSessionRoute } from "../../../lib/withSession";
import Group from "../../../models/Group";
import User from "../../../models/User";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body || !req.session.user) {
    res.status(400).json({ error: "No request body and/or auth " });
    return;
  }

  await dbConnect();
  const { memberId, groupId } = req.body;
  const user = await User.findOne({ username: memberId }).exec();
  const alreadyAdded = await Group.findOne({ members: user._id }).exec();
  if (!user || alreadyAdded) {
    res.status(404).json({ error: "No user found / already added " });
    return;
  }

  const group = await Group.findOneAndUpdate(
    { _id: groupId },
    { $push: { members: user._id } }
  ).exec();
  res.status(200).end();
  return;
}
