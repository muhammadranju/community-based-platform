import React, { useState } from "react";
// import VideoCard from './VideoCard';
// import Pagination from "./Pagination";
// import { Video } from "../types";
import { Video, VideoCard } from "./page";
import VideoPagination from "./VideoPagination";

// Mock data to simulate the African village/nature aesthetic from the image
const MOCK_VIDEOS: Video[] = [
  {
    id: 1,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop",
    duration: "10:05",
    title: "Village Life",
  },
  {
    id: 2,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1481492020427-40a9622048cd?q=80&w=1000&auto=format&fit=crop",
    duration: "08:30",
    title: "Tribal Walk",
  },
  {
    id: 3,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1000&auto=format&fit=crop",
    duration: "12:15",
    title: "Aerial View",
  },
  {
    id: 4,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544983870-692550cb5287?q=80&w=1000&auto=format&fit=crop",
    duration: "05:45",
    title: "Huts in Sunlight",
  },
  {
    id: 5,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1533646560942-069a5a40e671?q=80&w=1000&auto=format&fit=crop",
    duration: "09:20",
    title: "Community Gathering",
  },
  {
    id: 6,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1547471080-7528185270d4?q=80&w=1000&auto=format&fit=crop",
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
