import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../../interfaces/models";
import dbConnect from "../../../../lib/mongoDB";
import { withSessionRoute } from "../../../../lib/withSession";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import Group from "../../../../models/Group";
import RoomInstance from "../../../../models/RoomInstance";
import Message from "../../../../models/Message";

export default withSessionRoute(userController);

async function userController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { _id } = req.query;

  await dbConnect();

  if (method === "GET") {
    const user = await User.findById(_id)
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
    const newUser = new User<Partial<IUser>>({
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
    if (req.body.username !== req.session.user?.username) {
      res
        .status(409)
        .json({ error: "Body username does not match cookie username" });
      return;
    }
    const { username, about, imgsrc } = req.body;
    const updatingUser = await User.findOneAndUpdate(
      { username },
      { about, imgsrc }
    )
      .lean()
      .exec();
    if (!updatingUser) {
      res.status(404).json({ error: "Could not find user" });
      return;
    }
    res.status(200).end();
    return;
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
    const deletingUser = await User.findOneAndDelete({ username })
      .lean()
      .exec();
    const deleteFromGroups = await Group.updateMany(
      { members: deletingUser._id },
      {
        $pull: {
          members: deletingUser._id,
          messages: { user: deletingUser._id },
        },
      }
    )
      .lean()
      .populate({ path: "messages", select: "user" })
      .exec();
    const deletePrivateInstances = await RoomInstance.deleteMany({
      members: deletingUser._id,
    })
      .lean()
      .exec();
    const deleteMessages = await Message.deleteMany({ user: deletingUser._id })
      .lean()
      .exec();

    req.session.destroy();
    res.status(200).redirect("/");
    return;
  }
  return;
}
