export default function RebuildingSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <span className="inline-block bg-[#84cc16] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            OUR MISSION
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#064e3b] mb-2">
            Rebuilding
          </h2>
          <h2 className="text-2xl md:text-4xl font-bold text-[#064e3b]">
            Indigenous African Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative lg:h-[300px] ">
            <img src="./Icons/icon-7.png" className="mb-5" alt="" />
            {/* Placeholder for the carved door/person image */}
            <img
              src="/person/person-1.png"
              alt="Mission"
              className="object-cover"
            />
            {/* <div className="absolute inset-0 bg-[#d97706] flex items-center justify-center">
              <span className="text-white font-bold opacity-50">
                Mission Image Placeholder
              </span>
            </div> */}
          </div>

          {/* Text Content */}
          <div className="space-y-6 lg:mt-0 mt-5">
            <p className="text-gray-600 max-w-2xl font-light text-xl lg:text-2xl leading-relaxed">
              We are a passionate community committed to preserving,
              celebrating, and reimagining indigenous African Architecture.
              Through travel, conversation, and cultural exchange, we create
              opportunities for indigenous communities to connect and share
              their architectural knowledge. Our open forum encourages
              meaningful dialogue, while our investment in research,
              digitization and resource hubs ensures that indigenous building
              traditions are documented, shared and passed on to future
              generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
