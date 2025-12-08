function WaitingHeroSection() {
  return (
    <>
      {/* Left Column: Green Card */}
      <div className="lg:col-span-4 lg:sticky lg:top-8">
        <div className="bg-teal-900 rounded-3xl p-8 text-white flex flex-col h-full shadow-2xl relative overflow-hidden">
          {/* Content wrapper */}
          <div className="relative z-10 flex flex-col gap-6">
            <h2 className="text-2xl font-bold leading-tight">
              Database of African Builders, Architects & Designers
            </h2>

            <p className="text-green-50 text-sm leading-relaxed opacity-90 lg:block hidden">
              This is a database of Indigenous African builders, designers and
              architects who are passionate about helping the community to build
              their homes. Our goal is to connect home owners to African
              professionals that specialize in preserving, and rebuilding
              indigenous African Architecture.
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
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-transparent to-transparent z-10"></div>
            <img
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
