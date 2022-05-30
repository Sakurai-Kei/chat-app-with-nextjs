import { useMemo } from "react";
import useSWR from "swr";

export default function useS3(KEY: string) {
  const { data: url } = useSWR<string>("/api/aws/s3/image?KEY=" + KEY);
  const memoizedUrl = useMemo(() => {
    return url;
  }, [url]);
  return memoizedUrl;
}
