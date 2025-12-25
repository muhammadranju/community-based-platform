"use client";
import ArchiveExplorer from "@/components/our_work_details/ArchiveExplorer";
import HeaderBanner from "@/components/our_work_details/HeaderBanner";

function OurWorkDetails() {
  return (
    <main className="w-full">
      <HeaderBanner />

      {/* Archive Explorer Section */}
      <section className="py-12 md:py-10">
        <ArchiveExplorer />
      </section>
    </main>
  );
}

export default OurWorkDetails;
