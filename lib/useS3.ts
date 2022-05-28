import useSWRImmutable from "swr/immutable";

export default function useS3(KEY: string) {
  const { data: url } = useSWRImmutable<string>("/api/aws/s3/image?KEY=" + KEY);
  return { url };
}
