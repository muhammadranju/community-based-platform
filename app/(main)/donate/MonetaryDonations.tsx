import { HandHeart, Heart } from "lucide-react";
import React from "react";

// --- Types & Data ---

interface DonationOption {
  title: string;
  description: string;
  totalRaised: string;
  icon: React.ReactNode;
}

interface VolunteerOption {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const donationData: DonationOption[] = [
  {
    title: "One-Time Donations",
    description: "Simple one time contribution to help support our work",
    totalRaised: "$1000",
    icon: <HandHeart className="w-8 h-8 text-white" />,
  },
  {
    title: "Monthly Donations",
    description: "Recurring contributions that help support our work long term",
    totalRaised: "$1000",
    icon: <HandHeart className="w-8 h-8 text-white" />,
  },
  {
    title: "Project Based Donations",
    description: "Let donors choose exactly what they want to support",
    totalRaised: "$1000",
    icon: <HandHeart className="w-8 h-8 text-white" />,
  },
  {
    title: "Corporate Donations",
    description:
      "For businesses, universities, or cultural institutions that want to sponsor research, videos, or exhibitions.",
    totalRaised: "$1000",
    icon: <HandHeart className="w-8 h-8 text-white" />,
  },
];

const volunteerData: VolunteerOption[] = [
  {
    title: "Content Contributions",
    description:
      "Upload original photos, videos, and documents of Indigenous African architecture or Share oral histories, interviews, or step-by-step building guides to help us build an open source digital archive of our Indigenous African Architecture",
    icon: <Heart className="w-8 h-8 text-white" />,
  },
  {
    title: "Academia Contributions",
    description:
      "Submit research papers, books & monographs, peer-reviewed journal articles, book chapters, theses and dissertations, white papers, feasibility studies and much more to help us further research and build the knowledge base of our Indigenous African Architecture",
    icon: <Heart className="w-8 h-8 text-white" />,
  },
  {
    title: "Share Your Skills",
    description:
      "Be part of our collaborative studio and help create mood boards and design concepts, produce detailed construction drawings and plans, build 3D interior/exterior models and renders, and design easy-to-read architectural infographics. Flexible, remote, and fully credited.",
    icon: <Heart className="w-8 h-8 text-white" />,
  },
  {
    title: "Resource Donations",
    description:
      "Donate artifacts, rare books, very old postcards and equipment like cameras, scanners, audio recorders, to help us with our fieldwork, and the digitization of Indigenous African Architecture.",
    icon: <Heart className="w-8 h-8 text-white" />,
  },
];

// --- Internal Components ---
// Defined in the same file as requested

const SectionHeader: React.FC<{ number: string; title: string }> = ({
  number,
  title,
}) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="flex-shrink-0 w-16 h-16 bg-[#8cc63f] rounded-full flex items-center justify-center shadow-sm">
      <span className="text-white text-3xl font-bold">{number}</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-[#022c22] tracking-tight">
      {title}
    </h2>
  </div>
);

const DonationCard: React.FC<DonationOption> = ({
  title,
  description,
  totalRaised,
  icon,
}) => {
  return (
    <div className="flex flex-col h-full bg-white border border-[#8cc63f] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300">
      <div className="mb-5">
        <div className="w-14 h-14 bg-[#064e3b] rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-[#064e3b] mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed min-h-[40px]">
          {description}
        </p>
      </div>

      <div className="mt-auto">
        <div className="bg-[#f3f4f6] rounded-lg p-3 px-4 mb-6">
          <p className="text-xs font-semibold text-[#064e3b] underline decoration-[#064e3b] decoration-1 underline-offset-2 mb-1">
            Total Raised
          </p>
          <p className="text-[#064e3b] font-bold text-lg">{totalRaised}</p>
        </div>

        <button className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
          Donate Now
        </button>
      </div>
    </div>
  );
};

const VolunteerCard: React.FC<VolunteerOption> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="flex flex-col h-full bg-white border border-[#8cc63f] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">
        <div className="w-14 h-14 bg-[#064e3b] rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-[#064e3b] mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="mt-auto pt-6">
        <button className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm">
          Contribute
        </button>
      </div>
    </div>
  );
};

export default function MonetaryDonations() {
  return (
    <div className="space-y-5 lg:mb-20 mb-12 ">
      {/* Section 1: Monetary Donations */}
      <section>
        <SectionHeader number="1" title="Monetary Donations" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationData.map((item, index) => (
            <DonationCard
              key={index}
              title={item.title}
              description={item.description}
              totalRaised={item.totalRaised}
              icon={item.icon}
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
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
