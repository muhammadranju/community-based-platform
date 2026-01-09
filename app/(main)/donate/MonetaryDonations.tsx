"use client";
import { HandHeart, Heart } from "lucide-react";
import React from "react";

// --- Types & Data ---

interface DonationOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: string;
}

interface VolunteerOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: string;
}

const donationData: DonationOption[] = [
  {
    title: "One-Time Donations",
    description: "Simple one time contribution to help support our work",
    icon: <HandHeart className="w-8 h-8 text-white" />,
    value: "one-time",
  },
  {
    title: "Monthly Donations",
    description: "Recurring contributions that help support our work long term",
    icon: <HandHeart className="w-8 h-8 text-white" />,
    value: "monthly",
  },
  {
    title: "Project Based Donations",
    description: "Let donors choose exactly what they want to support",
    icon: <HandHeart className="w-8 h-8 text-white" />,
    value: "project-based",
  },
  {
    title: "Corporate Donations",
    description:
      "For businesses, universities, or cultural institutions that want to sponsor research, videos, or exhibitions.",
    icon: <HandHeart className="w-8 h-8 text-white" />,
    value: "corporate",
  },
];

const volunteerData: VolunteerOption[] = [
  {
    title: "Content Contributions",
    description:
      "Upload original photos, videos, and documents of Indigenous African architecture or Share oral histories, interviews, or step-by-step building guides to help us build an open source digital archive of our Indigenous African Architecture",
    icon: <Heart className="w-8 h-8 text-white" />,
    value: "content-contribution",
  },
  {
    title: "Academia Contributions",
    description:
      "Submit research papers, books & monographs, peer-reviewed journal articles, book chapters, theses and dissertations, white papers, feasibility studies and much more to help us further research and build the knowledge base of our Indigenous African Architecture",
    icon: <Heart className="w-8 h-8 text-white" />,
    value: "academia-contribution",
  },
  {
    title: "Share Your Skills",
    description:
      "Be part of our collaborative studio and help create mood boards and design concepts, produce detailed construction drawings and plans, build 3D interior/exterior models and renders, and design easy-to-read architectural infographics. Flexible, remote, and fully credited.",
    icon: <Heart className="w-8 h-8 text-white" />,
    value: "share-your-skills",
  },
  {
    title: "Resource Donations",
    description:
      "Donate artifacts, rare books, very old postcards and equipment like cameras, scanners, audio recorders, to help us with our fieldwork, and the digitization of Indigenous African Architecture.",
    icon: <Heart className="w-8 h-8 text-white" />,
    value: "resource-donation",
  },
];

// --- Internal Components ---
// Defined in the same file as requested

const SectionHeader: React.FC<{ number: string; title: string }> = ({
  number,
  title,
}) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="shrink-0 w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center shadow-sm">
      <span className="text-white text-3xl font-bold">{number}</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-[#022c22] tracking-tight">
      {title}
    </h2>
  </div>
);

interface CardProps extends DonationOption {
  onSelect: (value: string) => void;
}

const DonationCard: React.FC<CardProps> = ({
  title,
  description,
  icon,
  value,
  onSelect,
}) => {
  return (
    <div className="flex flex-col h-full bg-white border border-lime-500 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300">
      <div className="mb-5">
        <div className="w-14 h-14 bg-emerald-900 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-emerald-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed min-h-[40px]">
          {description}
        </p>
      </div>

      <div className="mt-auto">
        <button
          onClick={() => {
            onSelect(value);
            document.getElementById("donation-section")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm cursor-pointer"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};

interface VolCardProps extends VolunteerOption {
  onSelect: (value: string) => void;
}

const VolunteerCard: React.FC<VolCardProps> = ({
  title,
  description,
  icon,
  value,
  onSelect,
}) => {
  return (
    <div className="flex flex-col h-full bg-white border border-lime-500 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">
        <div className="w-14 h-14 bg-emerald-900 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-emerald-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="mt-auto pt-6">
        <button
          onClick={() => {
            onSelect(value);
            document.getElementById("donation-section")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
        >
          Contribute
        </button>
      </div>
    </div>
  );
};

interface MonetaryDonationsProps {
  onSelectDonation?: (value: string) => void;
  onSelectVolunteer?: (value: string) => void;
}

export default function MonetaryDonations({
  onSelectDonation,
  onSelectVolunteer,
}: MonetaryDonationsProps) {
  return (
    <div className="space-y-5 lg:mb-20 mb-12 ">
      {/* Section 1: Monetary Donations */}
      <section>
        <SectionHeader number="1" title="Monetary Donations" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationData.map((item, index) => (
            <DonationCard
              key={index}
              {...item}
              onSelect={(val) => onSelectDonation?.(val)}
            />
          ))}
        </div>
      </section>

      {/* Section 2: Volunteer Opportunities */}
      <section>
        <SectionHeader number="2" title="Volunteer Opportunities" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {volunteerData.map((item, index) => (
            <VolunteerCard
              key={index}
              {...item}
              onSelect={(val) => onSelectVolunteer?.(val)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
