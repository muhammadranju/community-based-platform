import YouTubeSection from "@/components/home/YouTubeSection";
import OurWork from "./OurWork";

export default function page() {
  return (
    <div className="flex flex-col ">
      <OurWork />
      <YouTubeSection />
    </div>
  );
}
