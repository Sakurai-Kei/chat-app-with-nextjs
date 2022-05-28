// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ReadStream } from "fs";
import { s3Client } from "./s3ClientObject";

export default async function uploadS3(
  Key: string,
  type: string,
  Body: ReadStream
) {
  // Set the parameters
  const params = {
    Bucket: process.env.AWS_SDK_BUCKET_NAME, // The name of the bucket
    Key, // The name of the object
    Body, // The content of the object
    ContentType: type,
  };

  // Create an object and upload it to the Amazon S3 bucket.
  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    return results; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}
