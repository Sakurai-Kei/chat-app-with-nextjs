import { NextApiRequest, NextApiResponse } from "next";
import { IMessage, IUser } from "../../../../interfaces/models";
import dbConnect from "../../../../lib/mongoDB";
import { withSessionRoute } from "../../../../lib/withSession";
import Group from "../../../../models/Group";
import RoomInstance from "../../../../models/RoomInstance";
import Message from "../../../../models/Message";
import { HydratedDocument, Types } from "mongoose";

export default withSessionRoute(messageController);

async function messageController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { messageId } = req.query;

  await dbConnect();

  if (method === "GET") {
    const message = await Message.findById(messageId)
      .lean()
      .populate({
        path: "user",
        select: "username about imgsrc",
      })
      .exec();

    if (!message) {
      res.status(404).json({ error: "No such message found" });
    }

    res.status(200).json(message);
    return;
  }

  if (method === "POST") {
    if (
      !req.body ||
      !req.body.content ||
      !req.body.instance ||
      !req.body.user
    ) {
      res.status(400).json({ error: "Bad Request" });
      return;
    }
    if (req.body.instance === "RoomInstance") {
      const { content, isImage, instance, roomId, userId } = req.body;

      const newMessage: HydratedDocument<IMessage> = new Message({
        content,
        isImage,
        instance,
        refId: new Types.ObjectId(roomId),
        user: new Types.ObjectId(userId),
        timestamp: new Date(),
      });
      const savedMessage = await newMessage.save();

      const updatingRoomInstance = await RoomInstance.updateOne(
        { _id: new Types.ObjectId(roomId) },
        { $push: { messages: savedMessage._id } }
      )
        .lean()
        .exec();

      res.status(200).end();
      return;
    }
    if (req.body.instance === "Group") {
      const { content, isImage, instance, groupId, userId } = req.body;

      const newMessage: HydratedDocument<IMessage> = new Message({
        content,
        isImage,
        instance,
        refId: new Types.ObjectId(groupId),
        user: new Types.ObjectId(userId),
        timestamp: new Date(),
      });
      const savedMessage = await newMessage.save();

      const updatingGroup = await Group.updateOne(
        { _id: new Types.ObjectId(groupId) },
        { $push: { messages: savedMessage._id } }
      )
        .lean()
        .exec();

      res.status(200).end();
      return;
    }
    res.status(400).json({ error: "Please define instance enum" });
    return;
  }

  if (method !== "GET" && method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.status(500).json({ error: "Something went wrong. Please try again" });
  return;
}
