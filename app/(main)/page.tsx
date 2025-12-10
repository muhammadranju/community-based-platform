import AfricanArchitectureHero from "@/components/home/AfricanArchitectureHero";
import FeaturedStoriesSection from "@/components/home/FeaturedStoriesSection";
import GetInvolvedSection from "@/components/home/GetInvolvedSection";
import OurWorkSection from "@/components/home/OurWorkSection";
import RebuildingSection from "@/components/home/RebuildingSection";
import YouTubeSection from "@/components/home/YouTubeSection";

export const metadata = {
  title: "Home - African Traditional Architecture",
  description: "Home African Traditional Architecture",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4 max-w-7xl mx-auto lg:space-y-24 space-y-14">
      <AfricanArchitectureHero />
      <RebuildingSection />
      <OurWorkSection />
      <GetInvolvedSection />
      <FeaturedStoriesSection />
      <YouTubeSection />
    </div>
  );
}
