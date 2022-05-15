import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../../lib/withSession";
import RoomInstance from "../../../../models/RoomInstance";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (
    !req.session.user ||
    !req.body ||
    req.session.user._id !== req.body.userId
  ) {
    res.status(400).json({
      error: "Bad request, no/malformed auth and/or body attached to request",
    });
  } else {
    const { content, instanceId, userId } = req.body;

    const message = {
      content,
      user: new Types.ObjectId(userId),
      timestamp: new Date(),
    };

    const group = await RoomInstance.findOneAndUpdate(
      { _id: instanceId },
      { $push: { messages: message } }
    ).exec();
    res.status(200).end();
  }
}
