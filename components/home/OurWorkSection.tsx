import Image from "next/image";
import Link from "next/link";

export default function OurWorkSection() {
  const works = [
    {
      title: "African Traditional Architecture Digital Archive",
      description:
        "We are building a comprehensive digital archive of African traditional architecture to preserve this knowledge for future generations.",
      image: "/bg/Rectangle1.png",
      link: "#",
      buttonText: "Read More",
    },
    {
      title: "African Traditional Decor & Interior Design",
      description:
        "Explore the beauty of African traditional decor and interior design through our curated collection.",
      image: "/bg/Rectangle2.png",
      link: "#",
      buttonText: "See The Gallery",
    },
    {
      title: "Database of African Architects, Artisans & Designers",
      description:
        "Connect with a network of African architects, artisans, and designers who are keeping these traditions alive.",
      image: "/bg/Rectangle1.png",
      link: "#",
      buttonText: "Join The Registry",
    },
  ];

  return (
    <section className="py-10 lg:px-10 px-2 md:py-10 bg-[#E6EBDF] container mx-auto rounded-xl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-5">
          <h2 className="text-3xl md:text-4xl font-bold text-[#064e3b] mb-4">
            Our Work
          </h2>
          <span className="inline-block bg-[#84cc16] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            WHAT WE ARE WORKING ON
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-[#064e3b]">
            Learn about our key initiatives and resource hubs
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-sm flex flex-col h-full"
            >
              <h4 className="font-bold text-[#064e3b] mb-4 h-12">
                {work.title}
              </h4>
              <p className="text-sm text-gray-600 mb-6 flex-grow">
                {work.description}
              </p>
              <Link
                href={work.link}
                className="inline-flex items-center text-green-700 font-semibold px-3 text-sm mb-6 border border-orange-500 rounded-full px-2 py-2 w-fit"
              >
                {work.buttonText}
              </Link>

              {/* ONLY THIS PART CHANGED — Image now centered + full width/height */}
              <div className="relative h-52 rounded-2xl w-full mt-auto overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
