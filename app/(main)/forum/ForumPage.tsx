import CulturalHistoricalDiscussions from "./CulturalHistoricalDiscussions";
import { ForumCard } from "./ForumCard";
import { HeaderSection } from "./ForumHeaderSection";
import RebuildingInnovation from "./RebuildingInnovation";

function ForumPage() {
  return (
    <>
      {/* Top Hero Image - Using a landscape placeholder that mimics the aerial village view */}
      <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden mb-12 shadow-sm">
        <img
          src="/bg/Rectangle7.png"
          alt="Aerial view of African village architecture"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content Section */}
      <HeaderSection />
      <ForumCard />
      <CulturalHistoricalDiscussions />
      <RebuildingInnovation />
    </>
  );
}

export default ForumPage;
