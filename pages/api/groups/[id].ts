import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoDB";
import Group from "../../../models/Group";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const id = req.query.id;
  const group = await Group.findById(id).exec();
  res.status(200).json(group);
}
