import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.redirect("/");
}
