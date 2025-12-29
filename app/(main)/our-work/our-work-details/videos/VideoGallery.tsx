import React, { useState } from "react";
import { BigPlayButton, ControlBar, Player } from "video-react";
import VideoPagination from "./VideoPagination";
import { Video } from "./VideosPage";

interface VideoCardProps {
  video: Video;
}
export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="group relative w-full  rounded-2xl overflow-hidden cursor-pointer shadow-sm transition-transform duration-300">
      {/* Background Image */}
      <Player>
        <source src={video?.url} />
        <ControlBar />
        <BigPlayButton />
      </Player>
    </div>
  );
};

const VideoGallery: React.FC<{ videos: Video[] }> = ({ videos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  console.log(videos);
  return (
    <div className="w-full mx-auto bg-[#F4F9ED] rounded-3xl border border-[#D8E6C5] p-6 md:p-10 shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#052E16] tracking-tight">
          Watch More Videos
        </h2>

        {/* Top Pagination (Hidden on mobile for better layout, or kept if needed. The design shows it clearly) */}
        <div className="self-end md:self-auto sr-only">
          <VideoPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Bottom Pagination */}
      <div className="flex justify-start sr-only">
        <VideoPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default VideoGallery;
