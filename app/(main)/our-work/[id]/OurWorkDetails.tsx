"use client";
import ArchiveExplorer from "@/components/our_work_details/ArchiveExplorer";
import HeaderBanner from "@/components/our_work_details/HeaderBanner";

const categories = [
  {
    id: 1,
    title: "East African Architecture",
    backgroundColor: "#B20500",
    icon: "/Frame/Frame-1.png",
    slug: "/east-african-architecture",
  },
  {
    id: 2,
    title: "Central African\nArchitecturess",
    backgroundColor: "#37893C",
    icon: "/Frame/Frame-2-2.png",
    slug: "/central-african-architecture",
  },
  {
    id: 3,
    title: "West African\nArchitecture",
    backgroundColor: "#063391",
    icon: "/Frame/Frame-3.png",
    slug: "/west-african-architecture",
  },
  {
    id: 4,
    title: "South African\nArchitecture",
    backgroundColor: "#C89D1F",
    icon: "/Frame/Frame-4.png",
    slug: "/south-african-architecture",
  },
  {
    id: 5,
    title: "North African\nArchitecture",
    backgroundColor: "#E26513",
    icon: "/Frame/Frame-5.png",
    slug: "/north-african-architecture",
  },
  {
    id: 6,
    title: "Global - African\nArchitecture",
    backgroundColor: "#6C0544",
    icon: "/Frame/Frame-6.png",
    slug: "/global-african-architecture",
  },
];

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
