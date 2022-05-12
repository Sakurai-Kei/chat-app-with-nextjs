import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongoDB";
import RoomInstance from "../../models/RoomInstance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const roomInstances = await RoomInstance.find().exec();
  res.status(200).json(roomInstances);
}
