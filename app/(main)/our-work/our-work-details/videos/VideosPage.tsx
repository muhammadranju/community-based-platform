"use client";
import { ArrowLeft, Play } from "lucide-react";
import { CURRENT_VIDEO, RELATED_VIDEOS, VideoPlayer } from "./VideoPlayer";
import { MainContent } from "./MainContent";
import { RelatedVideoList } from "./RelatedVideoList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import VideoGallery from "./VideoGallery";
import HeaderBanner from "@/components/our_work_details/HeaderBanner";

export interface Video {
  id: number;
  thumbnailUrl: string;
  title: string;
  duration: string;
}

interface VideoCardProps {
  video: Video;
}
function VideosPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4 max-w-7xl mx-auto">
      <HeaderBanner />
      {/* Navigation / Back Button */}
      <Button
        onClick={() => router.back()}
        className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-emerald-900 rounded-full shadow-md hover:bg-forest/90 transition-transform active:scale-95 my-5"
        aria-label="Go back"
      >
        <ArrowLeft
          className="w-5 h-5 md:w-6 md:h-6 text-white"
          strokeWidth={2.5}
        />
      </Button>

      {/* Main Card Container */}
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-3xl lg:rounded-4xl border-2 border-brand-lime bg-white shadow-xl my-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white">
          {/* Left Column: Video & Info */}
          <div className="p-4 md:p-6 lg:p-8 lg:col-span-8 lg:border-r lg:border-gray-100">
            <VideoPlayer />
            <MainContent details={CURRENT_VIDEO} />
          </div>

          {/* Right Column: Related Videos */}
          <div className="bg-gray-50/50 p-4 md:p-6 lg:col-span-4 lg:bg-transparent lg:p-6">
            <div className="lg:sticky lg:top-6 h-full">
              <RelatedVideoList videos={RELATED_VIDEOS} />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen w-full flex items-center justify-center p-4 my-10 bg-white">
        <VideoGallery />
      </div>
    </div>
  );
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="group relative w-full aspect-square rounded-4xl overflow-hidden cursor-pointer shadow-sm transition-transform duration-300 hover:scale-[1.02] py-10">
      {/* Background Image */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-[500px] object-cover transition-opacity duration-300 group-hover:opacity-90"
      />

      {/* Overlay Gradient (Optional for better visibility) */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>

      {/* Center Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-white/80 bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
          <Play
            className="w-6 h-6 text-white fill-white ml-1"
            strokeWidth={0}
          />
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
