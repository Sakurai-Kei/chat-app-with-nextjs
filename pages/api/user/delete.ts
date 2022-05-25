import { withSessionRoute } from "../../../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import dbConnect from "../../../lib/mongoDB";
import RoomInstance from "../../../models/RoomInstance";
import Group from "../../../models/Group";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (
    !req.session ||
    !req.session.user ||
    !req.body ||
    !req.body.username ||
    !req.body.about
  ) {
    res.status(400).json({
      error: "Bad request, no/malformed auth and/or body attached to request",
    });
    return;
  }
  if (req.body.username !== req.session.user.username) {
    res.status(409).json({
      error: "Please retype your username correctly",
    });
    return;
  }
  await dbConnect();

  const { username, about } = req.body;

  try {
    const user = await User.findOneAndDelete({ username }).exec();
    const instances = await RoomInstance.deleteMany({
      members: user._id,
    }).exec();
    const groups = await Group.updateMany(
      { members: user._id },
      { $pull: { members: user._id, messages: { user: user._id } } }
    ).exec();
    req.session.destroy();
    res.status(200).redirect("/");
    return;
  } catch (error) {
    res.status(500).json({ error: `Something went Wrong: ${error}` });
    return;
  }
}
