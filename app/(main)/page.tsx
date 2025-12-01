import HeroSection from "@/components/home/HeroSection";
import RebuildingSection from "@/components/home/RebuildingSection";
import OurWorkSection from "@/components/home/OurWorkSection";
import GetInvolvedSection from "@/components/home/GetInvolvedSection";
import FeaturedStoriesSection from "@/components/home/FeaturedStoriesSection";
import YouTubeSection from "@/components/home/YouTubeSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4">
      <HeroSection />
      <RebuildingSection />
      <OurWorkSection />
      <GetInvolvedSection />
      <FeaturedStoriesSection />
      <YouTubeSection />
    </div>
  );
}
