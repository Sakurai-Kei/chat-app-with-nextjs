import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "./s3ClientObject";

export default async function downloadS3(Key: string) {
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
