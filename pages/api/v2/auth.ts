import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { withSessionRoute } from "../../../lib/withSession";
import User from "../../../models/User";
import { IUser } from "../../../interfaces/models";
import dbConnect from "../../../lib/mongoDB";

export default withSessionRoute(login);

async function login(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "POST") {
    res.status(405).json({ error: "You must login using POST method" });
    return;
  }
  if (!req.body || !req.body.loginId || !req.body.password) {
    res.status(400).json({ error: "Body content cannot be empty" });
    return;
  }
  if (req.session.user) {
    res.status(200).redirect("/app");
    return;
  }
  const { loginId, password } = req.body;

  const user: IUser = await User.findOne({
    $or: [{ username: loginId }, { email: loginId }],
  })
    .lean()
    .exec();
  if (!user) {
    res
      .status(404)
      .json({ error: "Username/Email and password combination is wrong" });
    return;
  }

  const samePassword = await bcrypt.compare(password, user.password);
  if (!samePassword) {
    res
      .status(404)
      .json({ error: "Username/Email and password combination is wrong" });
    return;
  }

  const userCookie = {
    _id: user._id.toString(),
    username: user.username,
  };

  req.session.user = userCookie;
  await req.session.save();
  res.status(200).redirect("/app");
  return;
}
