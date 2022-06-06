import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/mongoDB";
import { withSessionRoute } from "../../../../lib/withSession";
import Group from "../../../../models/Group";
import User from "../../../../models/User";
import { IGroup, IUser } from "../../../../interfaces/models";
import { HydratedDocument, Types } from "mongoose";

export default withSessionRoute(groupDetailController);

async function groupDetailController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { groupId } = req.query;

  if (!req.session.user) {
    res.status(403).json({ error: "Forbidden. Please log in" });
    return;
  }

  await dbConnect();

  if (method === "GET") {
    const group = await Group.findById(groupId)
      .lean()
      .populate({ path: "members", select: "username about imgsrc" })
      .populate({
        path: "messages",
        populate: { path: "user", select: "username about imgsrc" },
      })
      .exec();

    if (!group) {
      res.status(404).json({ error: "No such group found" });
      return;
    }
    res.status(200).json(group);
    return;
  }

  if (method === "POST") {
    res.status(501).json({ error: "NOT IMPLEMENTED" });
    return;
  }

  if (method === "PATCH") {
    if (!req.body) {
      res.status(400).json({ error: "Bad request" });
      return;
    }
    if (req.body.name) {
      const { _id, name, about } = req.body;
      const updatingGroup = Group.findOneAndUpdate({ _id }, { name, about })
        .lean()
        .exec();

      res.status(200).end();
      return;
    }
    if (req.body.memberId) {
      const { memberId, groupId } = req.body;
      const user: HydratedDocument<IUser> = await User.findOne({
        username: memberId,
      })
        .populate({ path: "groups" })
        .exec();
      const alreadyAdded = await Group.findOne({
        $and: [{ _id: groupId }, { members: user._id }],
      }).exec();

      if (!user || alreadyAdded) {
        res.status(404).json({ error: "No user found / already added " });
        return;
      }

      const group: HydratedDocument<IGroup> = await Group.findOneAndUpdate(
        { _id: groupId },
        { $push: { members: user } },
        { new: true }
      ).exec();

      user.groups.push(group);
      await user.save();

      res.status(200).end();
      return;
    }
  }
  if (method === "DELETE") {
    res.status(501).json({ error: "NOT IMPLEMENTED YET" });
    return;
  }
  res.status(500).json({ error: "Something went wrong. Please try again" });
  return;
}
