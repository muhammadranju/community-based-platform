import React, { useState } from "react";
import VideoPagination from "./VideoPagination";
import { Video, VideoCard } from "./VideosPage";

// Mock data to simulate the African village/nature aesthetic from the image
const MOCK_VIDEOS: Video[] = [
  {
    id: 1,
    thumbnailUrl: "/bg/our-page-bg-2.png",
    duration: "10:05",
    title: "Village Life",
  },
  {
    id: 2,
    thumbnailUrl: "/bg/our-page-bg-1.png",
    duration: "08:30",
    title: "Tribal Walk",
  },
  {
    id: 3,
    thumbnailUrl: "/bg/folder-img-2.png",
    duration: "12:15",
    title: "Aerial View",
  },
  {
    id: 4,
    thumbnailUrl: "/bg/folder-img-1.png",
    duration: "05:45",
    title: "Huts in Sunlight",
  },
  {
    id: 5,
    thumbnailUrl: "/bg/folder-img-2.png",
    duration: "09:20",
    title: "Community Gathering",
  },
  {
    id: 6,
    thumbnailUrl: "/bg/folder-img-1.png",
    duration: "15:00",
    title: "Desert Patterns",
  },
];

const VideoGallery: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 21;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-[#F4F9ED] rounded-[3rem] border border-[#D8E6C5] p-6 md:p-10 shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#052E16] tracking-tight">
          Watch More Videos
        </h2>

        {/* Top Pagination (Hidden on mobile for better layout, or kept if needed. The design shows it clearly) */}
        <div className="self-end md:self-auto">
          <VideoPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {MOCK_VIDEOS.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Bottom Pagination */}
      <div className="flex justify-start">
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
