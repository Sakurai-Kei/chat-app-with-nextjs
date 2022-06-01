import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoDB";
import { withSessionRoute } from "../../../lib/withSession";
import RoomInstance from "../../../models/RoomInstance";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const _id = req.query.id as string | undefined;
  if (!_id) {
    res.status(400).json(false);
    return;
  }
  const roomInstance = await RoomInstance.find({
    members: _id,
  })
    .lean()
    .populate({ path: "members", select: "-password -email" })
    .exec();
  res.status(200).json(roomInstance);
}
