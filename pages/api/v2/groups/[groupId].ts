import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/mongoDB";
import { withSessionRoute } from "../../../../lib/withSession";
import User from "../../../../models/User";
import Group from "../../../../models/Group";
import { IGroup } from "../../../../interfaces/models";
import { HydratedDocument, Types } from "mongoose";

export default withSessionRoute(groupController);

async function groupController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { groupId } = req.query;
  const { user } = req.session;

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
    if (!user) {
      res.status(403).json({ error: "Forbidden. Please log in first" });
      return;
    }
    const { name, about } = req.body;
    const newGroup: HydratedDocument<IGroup> = await new Group({
      name,
      about,
      members: [new Types.ObjectId(user._id)],
      messages: [],
      imgsrc: "",
    });
    await newGroup.save();
    res.status(200).end();
    return;
  }

  if (method === "PATCH") {
    if (!req.body || !req.body._id || !req.body.name || !req.body.about) {
      res.status(400).json({ error: "Bad request" });
      return;
    }
    const { _id, name, about } = req.body;
    const updatingGroup = Group.findOneAndUpdate({ _id }, { name, about })
      .lean()
      .exec();

    res.status(200).end();
    return;
  }

  if (method === "DELETE") {
    res.status(501).json({ error: "NOT IMPLEMENTED YET" });
    return;
  }
  return;
}
