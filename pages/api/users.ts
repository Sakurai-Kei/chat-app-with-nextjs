import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongoDB";
import User from "../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const users = await User.find().select("-password -email").exec();
  res.status(200).json(users);
}
