"use client";
import CustomBadge from "@/components/shared/SharedBadge";
import WaitingListWizard from "../_components/WaitingListWizard";
import WaitingHeader from "../WaitingHeader";
import WaitingHeroSection from "../WaitingHeroSection";

export default function WaitingSignupPage() {
  return (
    <div className="text-gray-900 selection:bg-green-100 max-w-7xl mx-auto px-4 lg:px-0">
      {/* Navbar */}
      <WaitingHeader />

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-start">
          {/* Left Column: Green Card */}
          <WaitingHeroSection />

          {/* Right Column: Form */}
          <div className="lg:col-span-8 pt-4 lg:pl-4">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="mb-6">
                <CustomBadge>Database</CustomBadge>
              </div>

              {/* Headlines */}
              <h1 className="text-primary-color text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] mb-6">
                Join the Database of African Builders, Architects & Designers
              </h1>

              <p className="text-gray-600 text-lg mb-12 font-light leading-relaxed max-w-2xl">
                We are soon launching a portfolio of Indigenous African
                architecture designs, signup to stay update
              </p>

              {/* Wizard Component */}
              <WaitingListWizard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
