"use client";
import HeaderBanner from "@/components/our_work_details/HeaderBanner";
import CustomBadge from "@/components/shared/SharedBadge";
import { CommentsSection } from "@/components/sub_our_work/Comments";
import {
  DocumentItem,
  DocumentsCard,
  MediaCard,
} from "@/components/sub_our_work/DocumentsCard";
import { SectionCard } from "@/components/sub_our_work/SectionCard";
import { GUIDE_DATA } from "@/lib/data";
import { HeartIcon, ShareIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Mock Data
const MOCK_DOCS: DocumentItem[] = [
  {
    id: "1",
    title: "Courtney Henry",
    subtitle: "Medical Assistant",
    type: "pdf",
  },
  {
    id: "2",
    title: "Courtney Henry",
    subtitle: "Medical Assistant",
    type: "pdf",
  },
  {
    id: "3",
    title: "Courtney Henry",
    subtitle: "Medical Assistant",
    type: "pdf",
  },
];

function OurWorkDetailsPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("region");

  return (
    <>
      <div className="text-gray-800">
        <HeaderBanner />

        <div className=" mx-auto space-y-8 ">
          <div className="bg-accent-bg p-5 rounded-2xl space-y-5">
            {/* Header Section */}
            <header className="relative w-full bg-emerald-900 rounded-4xl p-8 md:p-16 text-white overflow-hidden shadow-sm ">
              {/* Badge */}
              <CustomBadge>Explore Content in the Archive</CustomBadge>

              <h1 className="text-3xl md:text-5xl lg:text-[40px] font-semibold max-w-4xl leading-tight mb-8">
                Manyatta - Indigenous home of the Maasai people in Kenya
              </h1>

              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 hover:text-gray-200 transition-colors group cursor-pointer">
                  <div className="p-2 rounded-full bg-white border border-white/30 group-hover:bg-white/90 transition-colors">
                    <HeartIcon className="w-5 h-5 text-emerald-900" />
                  </div>
                  <span className="text-sm font-medium">Save</span>
                </button>

                <button className="flex items-center gap-2 hover:text-gray-200 transition-colors group cursor-pointer">
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
                count={200}
                label="Photos"
                type="photos"
                // Using a distinct image of Maasai or similar landscape
                imageUrl="/bg/our-page-bg-1.png"
                url={`/our-work-details/photos?region=/${search}`}
              />
              <MediaCard
                count={10}
                label="Videos"
                type="videos"
                // Using a distinct image of Maasai people walking or gathering
                imageUrl="/bg/our-page-bg-2.png"
                url={`/our-work-details/videos?region=/${search}`}
              />
              <DocumentsCard
                documents={MOCK_DOCS}
                totalCount={7}
                owner="Manyatta"
                url={`/our-work-details/pdfs?region=/${search}`}
              />
            </section>
          </div>
          {/* About Section */}
          <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 pt-8 pb-16">
            <div className="flex-1 space-y-6">
              <CustomBadge>Learn More</CustomBadge>

              <h2 className="text-4xl md:text-5xl font-bold text-emerald-900">
                About the Maasai people
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                The Maasai are a Nilotic ethnic group primarily found in
                southern Kenya and northern Tanzania. Known for their vibrant
                culture, traditional dress, and semi-nomadic lifestyle, the
                Maasai are one of the most internationally recognized
                communities in Africa. Their society is deeply rooted in age-old
                customs, cattle herding, and strong community bonds. Cattle are
                central to their way of life—economically, spiritually, and
                socially. Despite the pressures of modernization, many Maasai
                communities continue to maintain their traditional ways of
                living, including the construction of their unique homes.
              </p>
            </div>

            <div className="flex-1">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-4xl overflow-hidden shadow-sm">
                <img
                  src="/bg/our-page-bg-3.png"
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
              How the Maasai Build Their Traditional Homes (Enkaji/Manyatta)
            </h2>
          </header>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {GUIDE_DATA.map((section) => (
              <SectionCard key={section.id} data={section} />
            ))}
          </div>
        </div>
      </div>
      {/* <CommentsSection comments={MOCK_COMMENTS} forumData={MOCK_FORUM_DATA} /> */}
    </>
  );
}

export default OurWorkDetailsPage;
