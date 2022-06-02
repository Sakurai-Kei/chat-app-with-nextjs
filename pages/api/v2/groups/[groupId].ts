import path from "path";
import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/mongoDB";
import { withSessionRoute } from "../../../../lib/withSession";
import User from "../../../../models/User";
import Group from "../../../../models/Group";
import { IGroup } from "../../../../interfaces/models";
import { HydratedDocument, Types } from "mongoose";
import uploadS3 from "../../../../lib/s3Upload";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSessionRoute(groupDetailController);

async function groupDetailController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { groupId, task = "" } = req.query;
  const { user } = req.session;

  await dbConnect();

  if (method === "GET") {
    const group = await Group.findById(groupId)
      .lean()
      .populate({ path: "members", select: "username about imgsrc" })
      .populate({
        path: "messages",
        populate: { path: "user", select: "username about imgsrc" },
      })
      .exec();

    if (!group) {
      res.status(404).json({ error: "No such group found" });
      return;
    }
    res.status(200).json(group);
    return;
  }

  if (method === "POST") {
    if (!user) {
      res.status(403).json({ error: "Forbidden. Please log in first" });
      return;
    }
    const { name, about } = req.body;
    const newGroup: HydratedDocument<IGroup> = await new Group({
      name,
      about,
      members: [new Types.ObjectId(user._id)],
      messages: [],
      imgsrc: "",
    });
    await newGroup.save();
    res.status(200).end();
    return;
  }

  if (method === "PATCH") {
    if (!req.body || !req.body._id || !req.body.name || !req.body.about) {
      res.status(400).json({ error: "Bad request" });
      return;
    }
    if (task === "update-group-bio") {
      const { _id, name, about } = req.body;
      const updatingGroup = Group.findOneAndUpdate({ _id }, { name, about })
        .lean()
        .exec();

      res.status(200).end();
      return;
    }
    if (task === "update-group-image") {
      if (!req.session.user) {
        res
          .status(400)
          .json({ error: "Bad request. Please log in to continue" });
        return;
      }
      const { _id, username } = req.session.user;
      // CODE TO UPDATE PICTURE, AWS S3
      const form = new formidable.IncomingForm();
      const { groupId } = req.query;
      // Bye-bye typescript error
      form.parse(req, async function (err, fields, files: any) {
        const { file } = files;
        const filePath = file.filepath;
        const Key =
          path.basename(filePath) + "." + /[^/]*$/g.exec(file.mimetype);
        const fileStream = fs.createReadStream(filePath);
        const result = await uploadS3(Key, file.mimetype, fileStream);
        if (result?.$metadata.httpStatusCode === 200) {
          // SAVE KEY TO MONGODB
          const objectURL = `https://${process.env.AWS_SDK_BUCKET_NAME}.s3.${process.env.AWS_SDK_REGION}.amazonaws.com/${Key}`;
          const updatingGroup = await Group.findOneAndUpdate(
            { _id: groupId },
            { imgsrc: objectURL }
          )
            .lean()
            .exec();
          res.status(200).end();
          return;
        }
        return res
          .status(result?.$metadata.httpStatusCode || 500)
          .json({ error: "Something happen and request failed" });
      });
    }
  }
  if (method === "DELETE") {
    res.status(501).json({ error: "NOT IMPLEMENTED YET" });
    return;
  }
  res.status(500).json({ error: "Something went wrong. Please try again" });
  return;
}
