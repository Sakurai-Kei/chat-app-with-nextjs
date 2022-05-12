import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongoDB";
import GroupInstance from "../../models/GroupInstance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const groupInstances = await GroupInstance.find().exec();
  res.status(200).json(groupInstances);
}
