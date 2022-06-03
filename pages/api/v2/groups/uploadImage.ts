import path from "path";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import Group from "../../../../models/Group";
import uploadS3 from "../../../../lib/s3Upload";
import { withSessionRoute } from "../../../../lib/withSession";
import dbConnect from "../../../../lib/mongoDB";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSessionRoute(uploadGroupPicture);

async function uploadGroupPicture(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  await dbConnect();
  if (!req.session.user) {
    res.status(400).json({ error: "Bad request. Please log in to continue" });
    return;
  }
  const { _id, username } = req.session.user;
  const { groupId } = req.query;

  // CODE TO UPDATE PICTURE, AWS S3
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const { file } = files;
    const filePath = (file as File).filepath;
    const mimetypeAllowed = ["image/jpeg", "image/png"];
    if (
      !mimetypeAllowed.some(function (mimetype) {
        return mimetype === (file as File).mimetype!;
      })
    ) {
      res
        .status(415)
        .json({ error: "Unsupported file type. Only jpeg/jpg or png" });
      return;
    }
    const Key =
      path.basename(filePath) + "." + /[^/]*$/g.exec((file as File).mimetype!);
    const fileStream = fs.createReadStream(filePath);
    const result = await uploadS3(Key, (file as File).mimetype!, fileStream);
    if (result?.$metadata.httpStatusCode === 200) {
      // SAVE KEY TO MONGODB
      const objectURL = `https://${process.env.AWS_SDK_BUCKET_NAME}.s3.${process.env.AWS_SDK_REGION}.amazonaws.com/${Key}`;
      const updatingGroup = await Group.findOneAndUpdate(
        { username },
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
  res.status(500).json({ error: "Something went wrong. Please try again" });
  return;
}
