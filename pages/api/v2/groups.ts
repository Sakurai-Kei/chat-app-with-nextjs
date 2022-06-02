import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/withSession";
import Group from "../../../models/Group";
import { HydratedDocument, Types } from "mongoose";
import { IGroup } from "../../../interfaces/models";

export default withSessionRoute(groupsController);

async function groupsController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { user } = req.session;

  if (method === "GET") {
    if (!user) {
      res.status(403).json({ error: "Forbidden. Please log in first" });
      return;
    }
    // Code to get lists of group?
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

  res.status(500).json({ error: "Something went wrong. Please try again" });
  return;
}
