import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/mongoDB";
import { withSessionRoute } from "../../../../lib/withSession";
import User from "../../../../models/User";
import Group from "../../../../models/Group";
import RoomInstance from "../../../../models/RoomInstance";
import Message from "../../../../models/Message";
import { HydratedDocument, Types } from "mongoose";
import { IGroup, IMessage, IUser } from "../../../../interfaces/models";

export default withSessionRoute(userController);

async function userController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { userId } = req.query;

  await dbConnect();

  if (method === "GET") {
    const user = await User.findById(userId)
      .lean()
      .populate({
        path: "groups",
        select: "name about imgsrc",
      })
      .populate({
        path: "roomInstances",
        select: "members",
        populate: {
          path: "members",
          select: "username about imgsrc",
        },
      })
      .exec();
    if (!user) {
      res.status(404).json({ error: "No such user found" });
      return;
    }
    res.status(200).json(user);
    return;
  }

  if (method === "POST") {
    res.status(501).json({ error: "NOT IMPLEMENTED" });
    return;
  }

  if (method === "PATCH") {
    if (req.body.username !== req.session.user?.username) {
      res
        .status(409)
        .json({ error: "Body username does not match cookie username" });
      return;
    }
    const { username, about } = req.body;
    const updatingUser = await User.findOneAndUpdate({ username }, { about })
      .lean()
      .exec();

    if (!updatingUser) {
      res.status(404).json({ error: "Could not find user" });
      return;
    }
    res.status(200).end();
    return;
  }

  if (method === "DELETE") {
    if (!req.session.user) {
      res.status(403).json({ error: "Please log in to proceed " });
      return;
    }

    if (!req.body || !req.body.username) {
      res.status(400).json({ error: "Body content is empty " });
      return;
    }

    const { username } = req.body;

    if (username !== req.session.user?.username) {
      res.status(409).json({ error: "Please retype your username correctly" });
      return;
    }

    const deletedUser = await User.findOneAndDelete({ username }).lean().exec();

    const deleteFromGroup: IGroup[] = await Group.aggregate()
      .match({ members: deletedUser._id })
      .exec();

    deleteFromGroup.forEach(async (group) => {
      const newGroupMessage: IMessage[] = await Message.aggregate()
        .match({ refId: group._id, user: { $nin: [deletedUser._id] } })
        .exec();
      const newGroupMember = group.members.filter(
        (member) => member._id.toString() !== deletedUser._id.toString()
      );
      const newGroup: HydratedDocument<IGroup> = new Group({
        ...group,
        members: newGroupMember,
        messages: newGroupMessage,
      });
      newGroup.isNew = false;
      await newGroup.save();
    });

    const deletePrivateInstances = await RoomInstance.deleteMany({
      members: deletedUser._id,
    }).exec();
    const deleteMessages = await Message.deleteMany({
      user: deletedUser._id,
    }).exec();

    req.session.destroy();
    res.status(200).end();
    return;
  }
  return;
}
