import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/withSession";
import Group from "../../../models/Group";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user || !req.body) {
    res
      .status(400)
      .json({ error: "Please either log-in and/or fill the form" });
    return;
  }
  try {
    const { name, about } = req.body;
    const { user } = req.session;

    const group = await new Group({
      name,
      about,
      members: user!._id,
      messages: [],
      imgsrc: "",
    });
    await group.save();
    res.status(200).end();
    return;
  } catch (error) {}
}
