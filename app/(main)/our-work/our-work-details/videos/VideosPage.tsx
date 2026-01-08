"use client";
import HeaderBanner from "@/components/our_work_details/HeaderBanner";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/authFetch";
import { ArrowLeft, Play } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MainContent } from "./MainContent";
import { RelatedVideoList } from "./RelatedVideoList";
import VideoGallery from "./VideoGallery";
import { VideoPlayer } from "./VideoPlayer";

export interface Video {
  id: number;
  thumbnailUrl: string;
  title: string;
  duration: string;
  url: string;
}

function VideosPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [content, setContent] = useState<any>(null); // Full content object
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const fetchVideo = async () => {
    if (!slug) return;
    try {
      const response = await authFetch(`/contents/${slug}`);
      const data = await response.json();
      const contentData = data?.data?.result;
      setContent(contentData);

      if (contentData?.medias) {
        // Construct playlist from medias array
        const list = contentData.medias.map(
          (mediaUrl: string, index: number) => ({
            id: `vid-${index}`,
            title: contentData.title, // User requested same title
            author: contentData.owner?.name || "Unknown Author",
            thumbnail: contentData.coverImage
              ? `${process.env.NEXT_PUBLIC_API_URL}/${contentData.coverImage}`
              : "/bg/our-page-bg-2.png", // Fallback
            // If the media URL is relative, prepend API URL
            url: mediaUrl.startsWith("http")
              ? mediaUrl
              : `${process.env.NEXT_PUBLIC_API_URL}${mediaUrl}`,
            duration: "Playing", // Placeholder as we don't have duration metaprops
          })
        );
        setPlaylist(list);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };
  const router = useRouter();

  useEffect(() => {
    fetchVideo();
  }, [slug]);

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
  };

  const currentVideo = playlist[currentVideoIndex];

  // Construct details for MainContent
  const mainContentDetails = content
    ? {
        title: content.title,
        description: content.description,
        learningPoints: [], // Mock or empty since not in provided JSON
      }
    : {
        title: "Loading...",
        description: "",
        learningPoints: [],
      };

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
      <div className="mx-auto lg:max-w-[1400px] overflow-hidden rounded-3xl lg:rounded-4xl lg:border-2 border-brand-lime bg-white lg:shadow-xl my-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white">
          {/* Left Column: Video & Info */}
          <div className="md:p-6 lg:p-8 lg:col-span-8 lg:border-r lg:border-gray-100">
            {currentVideo && (
              <VideoPlayer key={currentVideo.url} url={currentVideo.url} />
            )}
            <MainContent details={mainContentDetails} />
          </div>

          {/* Right Column: Related Videos */}
          <div className="bg-gray-50/50 p-4 md:p-6 lg:col-span-4 lg:bg-transparent lg:p-6">
            <div className="lg:sticky lg:top-6 h-full">
              <RelatedVideoList
                videos={playlist}
                onVideoSelect={handleVideoSelect}
                currentIndex={currentVideoIndex}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen w-full flex items-center justify-center my-5 bg-white">
        <VideoGallery videos={playlist} />
      </div>
    </div>
  );
}

export default VideosPage;
