import { useCallback, useEffect, useState } from "react";
import videojs, { VideoJsPlayerOptions } from "video.js";
import "video.js/dist/video-js.css";

export default function VideoPlayer(props: VideoJsPlayerOptions) {
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const onVideo = useCallback((el: HTMLVideoElement) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (!videoEl) {
      return;
    }
    const videoJsOptions = {
      techOrder: ["html5"],
      responsive: true,
      fluid: true,
      autoplay: true,
      muted: true,
      loop: true,
      controls: true,
      sources: props.sources,
    };
    const player = videojs(videoEl, videoJsOptions);
    // return () => {
    //   player.dispose();
    // };
  }, [props, videoEl]);

  return (
    <div data-vjs-player>
      <video
        ref={onVideo}
        className="video-js w-[16rem] h-[9rem]"
        playsInline
      />
    </div>
  );
}
