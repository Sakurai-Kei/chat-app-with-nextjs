import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongoDB";
import Group from "../../models/Group";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const groups = await Group.find()
    .populate("members", "-password -email")
    .exec();
  res.status(200).json(groups);
}
