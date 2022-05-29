import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoDB";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const id = req.query.id as string | undefined;
  if (!id) {
    res.status(400).json(false);
    return;
  }
  const user = await User.findById(new Types.ObjectId(id)).lean().exec();
  res.status(200).json(user);
}
