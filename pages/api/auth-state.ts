import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user) {
    res.status(200).json(false);
    res.end();
  } else {
    res.status(200).json(req.session.user);
    res.end();
  }
}