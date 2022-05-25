import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "../../lib/mongoDB";
import User from "../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.redirect("/sign-up");
    return;
  }

  const { username, password, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    res
      .status(400)
      .json({ error: "Password and confirm password does not match" });
    return;
  }

  try {
    await dbConnect();

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
    const user = new User({
      username,
      password: hashedPassword,
      email,
      about: `About ${username}`,
      imgsrc: "",
    });
    await user.save();
    res.status(200).end();
    return;
  } catch (error) {
    console.error("Error has occured: " + error);
  }
}
