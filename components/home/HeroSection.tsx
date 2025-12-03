import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  const features = [
    {
      title: "Key African Architecture",
      image: "/Frame/Frame-1.png",
      color: "bg-[#B20500]", // Red
    },
    {
      title: "Central African Architecture",
      image: "/Frame/Frame-2.png",
      color: "bg-[#37893C]", // Green
      text: "text-[#1a5d1a]",
    },
    {
      title: "East African Architecture",
      image: "/Frame/Frame-3.png",
      color: "bg-[#063391]", // Blue
    },
    {
      title: "South African Architecture",
      image: "/Frame/Frame-4.png",
      color: "bg-[#C89D1F]", // Yellow
    },
    {
      title: "West African Architecture",
      image: "/Frame/Frame-5.png",
      color: "bg-[#E26513]", // Orange
    },
    {
      title: "North African Architecture",
      image: "/Frame/Frame-6.png",
      color: "bg-[#6C0544]", // Purple
    },
  ];

  return (
    <section className="relative text-white  rounded-xl ">
      {/* Background Pattern Overlay */}
      <div className="absolute  inset-0 bg-[url('/hero-bg.png')] bg-size-[100%_100%] bg-no-repeat bg-center opacity-100 rounded-2xl"></div>

      <div className="container mx-auto px-4 md:px-6 pt-12 pb-5  relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-10">
            <h1 className="text-3xl md:text-6xl font-bold leading-tight ">
              Central African <br />
              Traditional Architecture
            </h1>
            <Button className="bg-white text-[#1a5d1a] hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold">
              Explore Our Digital Archive
            </Button>

            {/* Social Icons (Small) */}
            <div className="lg:flex hidden lg:mt-10 ">
              <img src="./Icons/icon-1.png" alt="" />
              <img src="./Icons/icon-2.png" alt="" />
              <img src="./Icons/icon-3.png" alt="" />
              <img src="./Icons/icon-4.png" alt="" />
              <img src="./Icons/icon-5.png" alt="" />
              <img src="./Icons/icon-6.png" alt="" />
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[250px] md:h-[400px] rounded-3xl overflow-hidden border-2 border-white/20 lg:mt-0 -mt-14">
            {/* Placeholder for the huts image */}
            <div className="absolute inset-0 bg-gray-200/10 flex items-center justify-center">
              <img
                src="/mousgoums.png"
                alt="Hero"
                className="object-cover h-full "
              />
            </div>
            {/* Floating Labels */}
            <div className="absolute lg:top-8 top-2 lg:left-8 left-2 bg-white text-black px-4 py-2 rounded-lg text-xs font-bold shadow-lg">
              Mousgoum <br />
              Architecture Cameroon
            </div>
            <div className="absolute lg:top-8 top-2 lg:right-8 right-2 bg-white text-black px-4 py-2 rounded-lg text-xs font-bold shadow-lg">
              Bamum Architecture
              <br /> Cameroon
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-5 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.color} rounded-xl p-4 flex lg:flex-col items-center justify-center text-center lg:h-40 transition-transform hover:-translate-y-1 cursor-pointer shadow-lg`}
            >
              <div className=" p-2 rounded-full mb-2">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={80}
                  height={80}
                />
              </div>
              <span className={`lg:text-lg text-xs font-bold leading-tight `}>
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
