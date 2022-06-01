import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/withSession";
import Group from "../../../models/Group";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (
    !req.session.user ||
    !req.body ||
    !req.body._id ||
    !req.body.name ||
    !req.body.about
  ) {
    res
      .status(400)
      .json({ error: "Bad request, no auth or necessary body is empty" });
    return;
  }
  const { _id, name, about } = req.body;

  await Group.findOneAndUpdate({ _id: _id }, { name, about }).lean().exec();
  res.status(200).end();
  return;
}
