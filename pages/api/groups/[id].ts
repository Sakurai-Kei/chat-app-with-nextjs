import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoDB";
import { withSessionRoute } from "../../../lib/withSession";
import Group from "../../../models/Group";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  try {
    const _id = req.query.id;
    const group = await Group.find({ members: _id }).exec();
    res.status(200).json(group);
  } catch (error) {}
}