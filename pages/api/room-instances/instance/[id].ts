import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/mongoDB";
import RoomInstance from "../../../../models/RoomInstance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const _id = req.query.id;
  const roomInstance = await RoomInstance.findById(_id, {
    messages: { $slice: -15 },
  })
    .populate({
      path: "messages",
      populate: {
        path: "user",
        select: "-password -email -about -groups -contactList",
      },
    })
    .populate({ path: "members", select: "-password -email" })
    .exec();
  res.status(200).json(roomInstance);
}
