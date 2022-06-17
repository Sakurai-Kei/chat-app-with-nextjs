import path from "path";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import uploadS3 from "../../../../lib/s3Upload";
import { withSessionRoute } from "../../../../lib/withSession";
import { HydratedDocument } from "mongoose";
import { IGroup } from "../../../../interfaces/models";
import dbConnect from "../../../../lib/mongoDB";
import Group from "../../../../models/Group";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSessionRoute(uploadProfilePicture);

async function uploadProfilePicture(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!req.session.user) {
    res.status(400).json({ error: "Bad request. Please log in to continue" });
    return;
  }

  await dbConnect();
  const { _id, username } = req.session.user;
  const { groupId } = req.query;

  // CODE TO UPDATE PICTURE, AWS S3
  const promise = new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({});
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ req, fields, files });
    });
  });
  //@ts-expect-error
  return promise.then(async ({ req, fields, files }) => {
    const file = files.picture;
    const filePath = file.filepath;
    const mimetypeAllowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];
    if (
      !mimetypeAllowed.some(function (mimetype) {
        return mimetype === file.mimetype!;
      })
    ) {
      res
        .status(415)
        .json({ error: "Unsupported file type. Only jpeg/jpg or png" });
      return;
    }
    const Key = path.basename(filePath) + "." + /[^/]*$/g.exec(file.mimetype!);
    const fileStream = fs.createReadStream(filePath);
    const result = await uploadS3(Key, file.mimetype!, fileStream);
    if (result?.$metadata.httpStatusCode === 200) {
      // SAVE KEY TO MONGODB
      const objectURL = `https://${process.env.AWS_SDK_BUCKET_NAME}.s3.${process.env.AWS_SDK_REGION}.amazonaws.com/${Key}`;
      const updatingGroup: HydratedDocument<IGroup> = await Group.findById(
        groupId
      ).exec();
      if (updatingGroup) {
        updatingGroup.imgsrc = objectURL;
        updatingGroup.isNew = false;
        await updatingGroup.save();
        res.status(200).end();
        return;
      }
      res.status(404).json({ error: "Could not find the group to be updated" });
      return;
    }
    res.status(500).json({ error: "Something went wrong. Please try again" });
    return;
  });
}
