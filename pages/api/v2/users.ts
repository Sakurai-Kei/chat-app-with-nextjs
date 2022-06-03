import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/withSession";
import { HydratedDocument, Types } from "mongoose";
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/mongoDB";
import User from "../../../models/User";
import { IUser } from "../../../interfaces/models";

export default withSessionRoute(usersController);

async function usersController(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { user } = req.session;

  await dbConnect();

  if (method === "GET") {
    // Code to get lists of group?
    return;
  }

  if (method === "POST") {
    const { username, password, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ error: "Password and confirm password does not match" });
      return;
    }

    const userExist = await User.findOne({
      $or: [{ username }, { email }],
    }).exec();

    if (userExist) {
      res.status(409).json({
        error: "Username and/or email is already in use",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 15);
    const user: HydratedDocument<IUser> = new User({
      username,
      password: hashedPassword,
      email,
      about: `About ${username}`,
      imgsrc: "",
    });
    await user.save();

    const userCookie = {
      _id: user._id.toString(),
      username: user.username,
    };
    req.session.user = userCookie;
    await req.session.save();
    res.status(200).redirect("/");
    return;
  }

  res.status(500).json({ error: "Something went wrong. Please try again" });
  return;
}
