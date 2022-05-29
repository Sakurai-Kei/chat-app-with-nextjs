import useSWR, { useSWRConfig } from "swr";

export default function useS3(KEY: string) {
  const { data: url } = useSWR<string>("/api/aws/s3/image?KEY=" + KEY);
  return { url };
}
