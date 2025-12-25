import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import { Player, ControlBar, BigPlayButton, PosterImage } from "video-react";

interface VideoPlayerProps {
  url: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  if (!hasWindow) {
    return <Skeleton className="w-full aspect-video rounded-2xl" />;
  }

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl bg-black aspect-video shadow-lg ring-1 ring-black/5">
      <Player>
        <source src={url} />
        <ControlBar />
        <BigPlayButton />
      </Player>
    </div>
  );
};
