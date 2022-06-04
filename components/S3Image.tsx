import useS3 from "../lib/useS3";
import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";

export default memo(S3Image);

function S3Image(props: { KEY: string; alt: string }) {
  const { KEY, alt } = props;
  const url = useS3(KEY);
  const [currentURL, setCurrentURL] = useState("");
  const memoizedUrl = useMemo(() => {
    if (currentURL) {
      return currentURL;
    }
    if (!currentURL && url) {
      return url;
    }
    return undefined;
  }, [url, currentURL]);

  useEffect(() => {
    if (url && !currentURL) {
      setCurrentURL(url);
      return;
    }
    return;
  }, [url, currentURL]);

  return (
    <>
      {(!url || !memoizedUrl) && (
        <div className="animate-pulse w-96 h-96 bg-slate-500"></div>
      )}
      {url && memoizedUrl && (
        <Image
          quality={100}
          priority={true}
          src={memoizedUrl}
          placeholder="blur"
          blurDataURL={memoizedUrl}
          width={480}
          height={480}
          layout="intrinsic"
          alt={"shared by " + alt}
          className="rounded-lg shadow-md"
        />
      )}
    </>
  );
}
