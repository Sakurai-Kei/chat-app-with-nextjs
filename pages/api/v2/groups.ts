import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/withSession";
import Group from "../../../models/Group";
import { HydratedDocument, Types } from "mongoose";
import { IGroup } from "../../../interfaces/models";
import dbConnect from "../../../lib/mongoDB";
import User from "../../../models/User";

export default withSessionRoute(groupsController);

async function groupsController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  if (!req.session.user) {
    res.status(403).json({ error: "Forbidden. Please log in first" });
    return;
  }
  const { user } = req.session;

  if (method === "GET") {
    const { name } = req.query;
    const groupsList = await Group.find({
      name: { $regex: new RegExp(name as string, "ig") },
    })
      .lean()
      .select("name about imgsrc")
      .exec();
    if (!groupsList) {
      res.status(404).json({ error: "No groups found with such name" });
      return;
    }
    res.status(200).json(groupsList);
    return;
  }

  if (method === "POST") {
    if (!req.body || !req.body.name || !req.body.about) {
      res.status(400).json({ error: "Body content cannot be empty" });
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

    await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { groups: newGroup } }
    ).exec();

    res.status(200).end();
    return;
  }

  res.status(500).json({ error: "Something went wrong. Please try again" });
  return;
}
