import Image from "next/image";

function WaitingHeroSection() {
  return (
    <>
      {/* Left Column: Green Card */}
      <div className="lg:col-span-4 lg:sticky lg:top-8">
        <div className="bg-primary-color rounded-3xl p-8 text-white flex flex-col h-full shadow-2xl relative overflow-hidden">
          {/* Content wrapper */}
          <div className="relative z-10 flex flex-col gap-6">
            <h2 className="text-2xl font-bold leading-tight">
              Join Database and Get Access to Our Latest Designs
            </h2>

            <p className="text-green-50 text-sm leading-relaxed opacity-90 lg:block hidden">
              Join our database and get access to our latest designs. We are
              currently accepting applications for our next batch of designs. If
              you are interested in joining our waiting list, please fill out
              the form below. We will review your application and contact you as
              soon as possible.
            </p>

            <div className="lg:pt-2 pt-0">
              <button className="border border-white/30 hover:bg-white/10 text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors w-fit">
                Join Our Database
              </button>
            </div>
          </div>

          {/* Image Section within the card */}
          <div className="lg:mt-8 -mx-8 -mb-8 relative h-64 lg:h-80 p-5">
            {/* Circular styled image container at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-color via-transparent to-transparent z-10"></div>
            <Image
              height={450}
              width={420}
              src="/bg/Rectangle1.png"
              alt="Traditional African Huts"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WaitingHeroSection;
