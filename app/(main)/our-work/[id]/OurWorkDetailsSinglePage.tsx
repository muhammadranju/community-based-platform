"use client";
import HeaderBanner from "@/components/our_work_details/HeaderBanner";
import CopyPath from "@/components/shared/CopyPath";
import CustomBadge from "@/components/shared/SharedBadge";
import { ContentCommentsSection } from "@/components/sub_our_work/ContentComments";
import {
  DocumentsCard,
  MediaCard,
} from "@/components/sub_our_work/DocumentsCard";
import { SectionCard } from "@/components/sub_our_work/SectionCard";
import { authFetch } from "@/lib/authFetch";
import { GUIDE_DATA } from "@/lib/data";
import { HeartIcon, ShareIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function OurWorkDetailsSinglePage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("region");
  const [data, setData] = useState<any>(null);
  const [comments, setComments] = useState<any>(null);
  const { id } = useParams();
  const copy = () => {
    CopyPath();
    toast.success("Link copied to clipboard");
  };

  const router = useRouter();

  const getSingleData = async () => {
    const response = await authFetch(`/contents/${id}`);
    const data = await response.json();
    setData(data?.data?.result);
    setComments(data?.data?.commentsByContents);
  };

  useEffect(() => {
    getSingleData();
  }, []);

  const MOCK_DOCS =
    data?.pdfs?.map((path: string, index: number, arr: string[]) => {
      const fileName = path.split("/").pop() || "";

      const title = fileName.replace(/-\d+\.pdf$/, "").replace(/_/g, " ");

      return {
        id: String(index + 1),
        title,
        subtitle: `PDF Document • ${arr?.length}`,
        owner: data?.owner.name,
        type: "pdf",
      };
    }) || [];
  return (
    <>
      <div className="text-gray-800">
        <HeaderBanner />

        <div className=" mx-auto space-y-8 ">
          <div className="bg-accent-bg p-8 rounded-4xl space-y-5">
            {/* Header Section */}
            <header className="relative w-full bg-emerald-900 rounded-4xl p-8 md:p-16 text-white overflow-hidden shadow-sm ">
              {/* Badge */}
              <CustomBadge>Explore Content in the Archive</CustomBadge>

              <h1 className="text-3xl md:text-5xl lg:text-[40px] font-semibold max-w-4xl leading-tight mb-8">
                {data?.title}
              </h1>

              <div className="flex items-center gap-6">
                <button
                  onClick={() => toast.success("Saved to your library")}
                  className="flex items-center gap-2 hover:text-gray-200 transition-colors group cursor-pointer"
                >
                  <div className="p-2 rounded-full bg-white border border-white/30 group-hover:bg-white/90 transition-colors">
                    <HeartIcon className="w-5 h-5 text-emerald-900" />
                  </div>
                  <span className="text-sm font-medium">Save</span>
                </button>

                <button
                  onClick={copy}
                  className="flex items-center gap-2 hover:text-gray-200 transition-colors group cursor-pointer"
                >
                  <div className="p-2 rounded-full bg-white border border-white/30 group-hover:bg-white/10 transition-colors">
                    <ShareIcon className="w-5 h-5 text-emerald-900" />
                  </div>
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </header>

            {/* Content Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MediaCard
                count={data?.images?.length}
                label="Photos"
                type="photos"
                imageUrl={
                  data?.images[0]
                    ? `${process.env.NEXT_PUBLIC_API_URL}/${data?.images[0]}`
                    : "/Icons/image-icon.jpg"
                }
                // Using a distinct image of Maasai or similar landscape
                // imageUrl={`${process.env.NEXT_PUBLIC_API_URL}/${data?.images[0]}`}
                url={`/our-work/our-work-details/photos?region=${search}&slug=${id}`}
              />
              <MediaCard
                count={data?.medias?.length}
                label="Videos"
                type="videos"
                imageUrl={
                  data?.images[1]
                    ? `${process.env.NEXT_PUBLIC_API_URL}/${data?.images[1]}`
                    : "/Icons/video-image.jpg"
                }
                url={`/our-work/our-work-details/videos?region=${search}&slug=${id}`}
              />
              <DocumentsCard
                documents={MOCK_DOCS?.slice(0, 3)}
                totalCount={data?.pdfs?.length}
                owner={data?.owner.name}
                url={`/our-work/our-work-details/pdfs?region=${search}&slug=${id}`}
              />
            </section>
          </div>
          {/* About Section */}
          <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 pt-8 pb-16">
            <div className="flex-1 space-y-6">
              <CustomBadge>Learn More</CustomBadge>

              <h2 className="text-4xl md:text-5xl font-bold text-emerald-900">
                About the{" "}
                {data?.title?.length > 10
                  ? data?.title.slice(0, 10) + "..."
                  : data?.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {data?.shortDescription || "No description available"}
              </p>
            </div>

            <div className="flex-1">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-4xl overflow-hidden shadow-sm">
                <img
                  // src="/bg/our-page-bg-3.png"
                  src={`${
                    data?.coverImage
                      ? process.env.NEXT_PUBLIC_API_URL + data?.coverImage
                      : "/bg/our-page-bg-3.png"
                  }`}
                  alt="Maasai Manyatta Hut"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Header Section */}
          <header className="mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-emerald-900 leading-tight mb-2">
              Step-by-Step Guide:
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-[28px] font-semibold text-emerald-900 leading-snug">
              {data?.title}
            </h2>
          </header>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {GUIDE_DATA?.map((section) => (
              <SectionCard key={section.id} data={section} />
            ))}
          </div>
        </div>
      </div>
      <ContentCommentsSection
        comments={comments}
        contentData={data}
        onCommentAdded={getSingleData}
      />
    </>
  );
}

export default OurWorkDetailsSinglePage;
