import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoDB";
import RoomInstance from "../../../models/RoomInstance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const id = req.query.id;
  const roomInstance = await RoomInstance.findById(id).exec();
  res.status(200).json(roomInstance);
}
