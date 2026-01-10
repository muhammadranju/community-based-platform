"use client";

import { useState } from "react";
import { DonateHero } from "./DonateHero";
import { DonationForm } from "./DonationForm";
import MonetaryDonations from "./MonetaryDonations";
import { WaysToGive } from "./WaysToGive";
import Image from "next/image";

export default function DonatePage() {
  // Lifted state for coordination between DonationForm and MonetaryDonations
  const [donationType, setDonationType] = useState<string>("one-time");
  const [donationCategory, setDonationCategory] = useState<string>(
    "content-contribution"
  );
  const [monetaryDonation, setMonetaryDonation] = useState<string>("one-time");

  const handleMonetarySelect = (value: string) => {
    setDonationType("one-time"); // Or keep it simple as "monetary" check? The form uses specific values.
    // Actually, the form uses: isMonetaryDonation = donationType === "one-time" || ...
    // So if I select "monthly", donationType might need to allow that OR stick to "one-time" as the key for "monetary mode"
    // BUT the form logic: const isMonetaryDonation = donationType === "one-time" || ...
    // means donationType just needs to be one of the 4 values.
    // However, the form separates `donationType` (radio logic) and `monetaryDonation` (dropdown logic).
    // Let's set both to be safe and consistent.

    // In the form current logic:
    // Radio click -> setDonationType("one-time"); setDonationCategory("");
    // Dropdown change -> setMonetaryDonation(value);

    // So here:
    setDonationType(value); // This ensures isMonetaryDonation becomes true if value is one of the 4.
    setMonetaryDonation(value);
    setDonationCategory("");
  };

  const handleVolunteerSelect = (value: string) => {
    setDonationType("volunteer");
    setDonationCategory(value);
    setMonetaryDonation("one-time"); // Reset or keep default?
  };

  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4 max-w-7xl mx-auto ">
      {/* Main Container constrained to a reasonable max-width for large screens */}
      <section className="w-full space-y-8">
        {/* Top Hero Section */}
        <DonateHero />

        {/* Bottom "Ways to Give" Section */}
        <WaysToGive />

        {/* Content Grid */}
        <div
          id="donation-section"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full mb-20"
        >
          {/* Left Column: Image */}
          <div className="lg:col-span-5 flex flex-col h-[500px] lg:h-auto top-8">
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
              {/* Using a placeholder image that closely resembles the prompt's rural village scene */}
              <Image
                height={500}
                width={500}
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
            <DonationForm
              donationType={donationType}
              setDonationType={setDonationType}
              monetaryDonation={monetaryDonation}
              setMonetaryDonation={setMonetaryDonation}
              donationCategory={donationCategory}
              setDonationCategory={setDonationCategory}
            />
          </div>
        </div>
      </section>
      <MonetaryDonations
        onSelectDonation={handleMonetarySelect}
        onSelectVolunteer={handleVolunteerSelect}
      />
    </div>
  );
}
