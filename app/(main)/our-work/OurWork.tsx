import CustomBadge from "@/components/home/HomeBadge";
import ArchiveCard from "@/components/our_work/ArchiveCard";
import PopularContent from "@/components/our_work/PopularContent";
import ProcessCard from "@/components/our_work/ProcessCard";
import {
  ARCHIVE_DATA,
  CONTRIBUTE_DATA,
  EXPLORE_DATA,
} from "@/components/our_work/ProcessCardData";
import SharedTitle from "@/components/shared/SharedTitle";
import Image from "next/image";

function OurWork() {
  return (
    <>
      {/* Top Hero Section */}
      <section className="relative w-full flex items-center justify-center text-white max-w-7xl lg:px-0 px-4 mx-auto mt-4 md:mt-0 mb-24">
        <div className="relative w-full h-full lg:min-h-[400px] rounded-3xl overflow-hidden flex items-center justify-center lg:py-20 py-16 lg:px-6 px-4">
          <Image
            src={"/bg/our_work_bg.png"}
            alt="Hero"
            fill
            className="object-cover absolute inset-0"
            priority
          />
          {/* Overlay for better text contrast */}
          <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
            <h1 className="text-2xl md:text-5xl font-medium mb-6  tracking-tight">
              African Indigenous Architecture Digital Archive
            </h1>
            <p className="text-gray-200 text-base md:text-lg max-w-2xl font-light leading-relaxed">
              A digital repository of indigenous African architecture,
              preserving cultural heritage through community contributions.
            </p>
          </div>
        </div>
      </section>

      {/* Section Title */}
      <section className="text-center pb-10 ">
        <CustomBadge>Explore Content In The Archive</CustomBadge>

        <h2 className="text-3xl md:text-5xl font-bold text-primary-color ">
          How to contribute and explore the archive
        </h2>
      </section>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start max-w-7xl mx-auto lg:px-0 px-4">
        <ProcessCard data={CONTRIBUTE_DATA} />
        <ProcessCard data={EXPLORE_DATA} />
      </div>

      <section className="w-full py-12 lg:py-24 max-w-7xl mx-auto lg:px-0 px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-6 ">
          {/* Badge */}

          <CustomBadge>Digital Archive</CustomBadge>

          {/* Title */}
          <SharedTitle title="Explore Our Digital Archive By Region" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 py-12 ">
          {ARCHIVE_DATA.map((card) => (
            <ArchiveCard key={card.id} {...card} />
          ))}
        </div>
      </section>

      {/* Popular Content Section */}
      <section className="bg-accent-bg py-16 border-t border-brand-green/10 ">
        <div className="px-4 md:px-6 max-w-7xl mx-auto">
          <PopularContent />
        </div>
      </section>
    </>
  );
}

export default OurWork;
