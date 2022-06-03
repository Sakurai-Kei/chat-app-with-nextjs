import path from "path";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import User from "../../../../models/User";
import uploadS3 from "../../../../lib/s3Upload";
import { withSessionRoute } from "../../../../lib/withSession";
import { HydratedDocument } from "mongoose";
import { IUser } from "../../../../interfaces/models";
import dbConnect from "../../../../lib/mongoDB";
import PersistentFile from "formidable/PersistentFile";

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

  // CODE TO UPDATE PICTURE, AWS S3
  const promise = new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({});
    form.parse(req, async function (err, fields, files) {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  //@ts-expect-error
  return promise.then(async ({ fields, files }) => {
    const file = files.picture;
    const filePath = file.filepath;
    const mimetypeAllowed = ["image/jpeg", "image/png"];
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
      const updatingUser: HydratedDocument<IUser> = await User.findById(
        _id
      ).exec();
      if (updatingUser) {
        updatingUser.imgsrc = objectURL;
        updatingUser.isNew = false;
        await updatingUser.save();
        res.status(200).end();
      }
    }
    res.status(500).json({ error: "Something went wrong. Please try again" });
  });
}
//     const file = files.picture;
//     const filePath = file.filepath;
//     const mimetypeAllowed = ["image/jpeg", "image/png"];
//     if (
//       !mimetypeAllowed.some(function (mimetype) {
//         return mimetype === file.mimetype!;
//       })
//     ) {
//       res
//         .status(415)
//         .json({ error: "Unsupported file type. Only jpeg/jpg or png" });
//       return;
//     }
//     const Key = path.basename(filePath) + "." + /[^/]*$/g.exec(file.mimetype!);
//     const fileStream = fs.createReadStream(filePath);
//     const result = await uploadS3(Key, (file as File).mimetype!, fileStream);
//     if (result?.$metadata.httpStatusCode === 200) {
//       // SAVE KEY TO MONGODB
//       const objectURL = `https://${process.env.AWS_SDK_BUCKET_NAME}.s3.${process.env.AWS_SDK_REGION}.amazonaws.com/${Key}`;
//       const updatingUser: HydratedDocument<IUser> = await User.findById(
//         _id
//       ).exec();
//       if (updatingUser) {
//         updatingUser.imgsrc = objectURL;
//         updatingUser.isNew = false;
//         await updatingUser.save();
//         return promise.then(() => {
//           res.status(200).end();
//         })
//       }
//       return promise.then(() => {
//         res.status(500).json({ error: 'Something went wrong' });
//       })
// })
// const form = new formidable.IncomingForm({})
// form.parse(req, async function (err, fields, files) {
//   const file = files.picture;
//   const filePath = file.filepath;
//   const mimetypeAllowed = ["image/jpeg", "image/png"];
//   if (
//     !mimetypeAllowed.some(function (mimetype) {
//       return mimetype === file.mimetype!;
//     })
//   ) {
//     res
//       .status(415)
//       .json({ error: "Unsupported file type. Only jpeg/jpg or png" });
//     return;
//   }
//   const Key = path.basename(filePath) + "." + /[^/]*$/g.exec(file.mimetype!);
//   const fileStream = fs.createReadStream(filePath);
//   const result = await uploadS3(Key, (file as File).mimetype!, fileStream);
//   if (result?.$metadata.httpStatusCode === 200) {
//     // SAVE KEY TO MONGODB
//     const objectURL = `https://${process.env.AWS_SDK_BUCKET_NAME}.s3.${process.env.AWS_SDK_REGION}.amazonaws.com/${Key}`;
//     const updatingUser: HydratedDocument<IUser> = await User.findById(
//       _id
//     ).exec();
//     if (updatingUser) {
//       updatingUser.imgsrc = objectURL;
//       updatingUser.isNew = false;
//       await updatingUser.save();
//       res.status(200).json({ message: 'OKAY' });
//       return
//     }
//       res.status(500).json({ error: 'Something went wrong. Please try again'})
//       return;
//     }
//     return res
//       .status(result?.$metadata.httpStatusCode || 500)
//       .json({ error: "Something happen and request failed" });
//   });
//   res.status(500).json({ error: "Something went wrong. Please try again" });
//   return;
// }
