import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { withSessionRoute } from "../../../../lib/withSession";
import uploadS3 from "../../../../lib/s3Upload";
import RoomInstance from "../../../../models/RoomInstance";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user || !req.query) {
    res
      .status(400)
      .json({ error: "Bad request, no group ID or not authenticated" });
    return;
  }
  const { _id } = req.session.user;
  const form = new formidable.IncomingForm();
  const { instanceId } = req.query;
  form.parse(req, async function (err, fields, files) {
    const { file } = files;
    //@ts-expect-error
    const filePath = file.filepath;
    //@ts-expect-error
    const Key = path.basename(filePath) + "." + /[^/]*$/g.exec(file.mimetype);
    const fileStream = fs.createReadStream(filePath);
    //@ts-expect-error
    const result = await uploadS3(Key, file.mimetype, fileStream);
    if (result?.$metadata.httpStatusCode === 200) {
      // SAVE KEY TO MONGODB
      const message = {
        content: Key,
        isImage: true,
        user: _id,
        timestamp: new Date(),
      };

      await RoomInstance.findOneAndUpdate(
        { _id: instanceId },
        { $push: { messages: message } }
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
