import path from "path";
import fs from "fs";
import formidable, { File } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../../interfaces/models";
import dbConnect from "../../../../lib/mongoDB";
import { withSessionRoute } from "../../../../lib/withSession";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import Group from "../../../../models/Group";
import RoomInstance from "../../../../models/RoomInstance";
import Message from "../../../../models/Message";
import { HydratedDocument } from "mongoose";
import uploadS3 from "../../../../lib/s3Upload";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSessionRoute(userController);

async function userController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { userId, task = "" } = req.query;

  await dbConnect();

  if (method === "GET") {
    const user = await User.findById(userId)
      .lean()
      .populate({
        path: "groups",
        select: "name about imgsrc",
      })
      .populate({
        path: "roomInstances",
        select: "members",
        populate: {
          path: "members",
          select: "name about imgsrc",
        },
      })
      .exec();
    if (!user) {
      res.status(404).json({ error: "No such user found" });
      return;
    }
    res.status(200).json(user);
    return;
  }

  if (method === "POST") {
    const { username, password, confirmPassword, email } = req.body;
    const userExist = await User.findOne({
      $or: [{ username }, { email }],
    })
      .lean()
      .exec();

    if (userExist) {
      res.status(409).json({
        error: "Username and/or email is already in use",
      });
      return;
    }
    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords does not match" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 15);
    const newUser: HydratedDocument<IUser> = new User({
      username,
      password: hashedPassword,
      email,
      about: `About ${username}`,
      imgsrc: "",
      groups: [],
      roomInstances: [],
    });

    await newUser.save();
    res.status(200).end();
    return;
  }

  if (method === "PATCH") {
    if (task === "update-user-bio") {
      if (req.body.username !== req.session.user?.username) {
        res
          .status(409)
          .json({ error: "Body username does not match cookie username" });
        return;
      }
      const { username, about } = req.body;
      const updatingUser = await User.findOneAndUpdate({ username }, { about })
        .lean()
        .exec();

      if (!updatingUser) {
        res.status(404).json({ error: "Could not find user" });
        return;
      }
      res.status(200).end();
      return;
    }

    if (task === "update-user-image") {
      if (!req.session.user) {
        res
          .status(400)
          .json({ error: "Bad request. Please log in to continue" });
        return;
      }
      const { _id, username } = req.session.user;

      // CODE TO UPDATE PICTURE, AWS S3
      const form = new formidable.IncomingForm();
      // Typescript error can go out the door
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
          const updatingUser = await User.findOneAndUpdate(
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
  }

  if (method === "DELETE") {
    if (!req.session.user) {
      res.status(403).json({ error: "Please log in to proceed " });
      return;
    }

    const { username } = req.body;

    if (username !== req.session.user?.username) {
      res.status(409).json({ error: "Please retype your username correctly" });
      return;
    }

    const deletedUser = await User.findOneAndDelete({ username }).lean().exec();

    const deleteFromGroups = await Group.updateMany(
      { members: deletedUser._id },
      {
        $pull: {
          members: deletedUser._id,
          messages: { user: deletedUser._id },
        },
      }
    )
      .lean()
      .populate({ path: "messages", select: "user" })
      .exec();
    const deletePrivateInstances = await RoomInstance.deleteMany({
      members: deletedUser._id,
    })
      .lean()
      .exec();
    const deleteMessages = await Message.deleteMany({ user: deletedUser._id })
      .lean()
      .exec();
    req.session.destroy();
    res.status(200).redirect("/");
    return;
  }
  return;
}
