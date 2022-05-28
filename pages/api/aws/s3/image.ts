import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextApiRequest, NextApiResponse } from "next";
import { s3Client } from "../../../../lib/s3ClientObject";
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

async function downloadS3(Key: string) {
  const bucketParams = {
    Bucket: process.env.AWS_SDK_BUCKET_NAME,
    Key,
  };
  try {
    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand(bucketParams),
      { expiresIn: 3600 }
    );
    return url;
  } catch (err) {
    console.log("Error", err);
  }
}
