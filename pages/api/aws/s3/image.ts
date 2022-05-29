import downloadS3 from "../../../../lib/s3Download";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../../lib/withSession";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(403).json({ error: "METHOD NOT ALLOWED" });
    return;
  }
  if (!req.query) {
    res.status(400).json({ error: "NO QUERY ID SPECIFIED" });
    return;
  }
  const { KEY } = req.query;
  const url = await downloadS3(KEY as string);
  if (url) {
    res.status(200).json(url);
    return;
  }
  res.status(500).json({ error: "Error has occured" });
  return;
}
