import { withSessionRoute } from "../../../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import dbConnect from "../../../lib/mongoDB";

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
  await dbConnect();

  const { username, about, imgsrc } = req.body;

  try {
    await User.findOneAndUpdate({ username }, { about, imgsrc }).exec();
    res.status(200).end();
    return;
  } catch (error) {
    res.status(500).json({ error: `Something went Wrong: ${error}` });
    return;
  }
}
