"use client";

import { DonateHero } from "./DonateHero";
import { DonationForm } from "./DonationForm";
import MonetaryDonations from "./MonetaryDonations";
import { WaysToGive } from "./WaysToGive";

export default function page() {
  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4 max-w-7xl mx-auto ">
      {/* Main Container constrained to a reasonable max-width for large screens */}
      <section className="w-full space-y-8">
        {/* Top Hero Section */}
        <DonateHero />

        {/* Bottom "Ways to Give" Section */}
        <WaysToGive />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full mb-20">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 flex flex-col h-[500px] lg:h-auto top-8">
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
              {/* Using a placeholder image that closely resembles the prompt's rural village scene */}
              <img
                src="/bg/Rectangle5.jpg"
                alt="Rural village landscape with traditional houses"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Optional gradient overlay for text legibility if needed, but keeping it clean to match image */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <DonationForm />
          </div>
        </div>
      </section>
      <MonetaryDonations />
    </div>
  );
}
