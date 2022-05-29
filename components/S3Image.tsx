import useS3 from "../lib/useS3";
import Image from "next/image";
import { memo, Suspense, useMemo } from "react";

function S3Image(props: { KEY: string; alt: string }) {
  const { KEY, alt } = props;
  const { url } = useS3(KEY);
  const memoizedUrl = useMemo(() => {
    return url as string;
  }, [url]);
  if (!url) {
    return <div className="animate-pulse w-96 h-96 bg-slate-500"></div>;
  }
  return (
    <Suspense
      fallback={
        <div className=" animate-pulse w-full h-full bg-slate-500"></div>
      }
    >
      <Image
        quality={100}
        priority={true}
        src={memoizedUrl}
        width={480}
        height={480}
        layout="intrinsic"
        alt={"shared by " + alt}
        className="rounded-lg shadow-md"
      />
    </Suspense>
  );
}

export default memo(S3Image, (prevProps, nextProps) => {
  if (prevProps.KEY === nextProps.KEY) {
    return true;
  }
  return false;
});
