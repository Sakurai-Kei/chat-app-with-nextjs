import useS3 from "../lib/useS3";
import Image from "next/image";

export default function S3Image(props: { KEY: string; alt: string }) {
  const { KEY, alt } = props;
  const { url } = useS3(KEY);
  if (!url) {
    return <div className="animate-pulse w-96 h-96 bg-slate-500"></div>;
  }
  return (
    <Image
      quality={100}
      priority={true}
      src={url}
      width={480}
      height={480}
      layout="intrinsic"
      alt={"shared by " + alt}
      className="rounded-lg shadow-md"
    />
  );
}
