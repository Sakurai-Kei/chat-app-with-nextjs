import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoDB";
import RoomInstance from "../../../models/RoomInstance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const _id = req.query.id;
  const roomInstance = await RoomInstance.find({ members: _id })
    .populate({ path: "members", select: "-password -email" })
    .exec();
  res.status(200).json(roomInstance);
}
