import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "../../lib/mongoDB";
import User from "../../models/User";
import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.loginId || !req.body.password) {
    res.redirect("/log-in");
  }

  try {
    await dbConnect();
    const { loginId, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: loginId }, { email: loginId }],
    }).exec();

    if (!user) {
      res.status(404).json({ error: "No such account found" });
      res.end();
    }
    const samePassword = await bcrypt.compare(password, user.password);
    if (!samePassword) {
      res
        .status(409)
        .json({ error: "Username/Email and password combination is wrong" });
      res.end();
    }
    const userCookie = {
      _id: user._id.toString(),
      username: user.username,
    };
    req.session.user = userCookie;
    await req.session.save();
    res.status(200).end();
  } catch (error) {
    console.error("Error has occured: " + error);
  }
}
