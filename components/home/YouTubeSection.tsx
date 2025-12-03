import CustomBadge from "./HomeBadge";

export default function YouTubeSection() {
  return (
    <section className="bg-white lg:py-28 py-12">
      <div className="text-center">
        {/* Badge */}
        <CustomBadge>
          lets learn about indigenous african architecture
        </CustomBadge>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-emerald-900 mb-10 leading-tight">
          Join Our YouTube Community
        </h2>

        {/* Perfectly Centered & Responsive YouTube Video */}
        <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          <iframe
            src="https://www.youtube.com/embed/POjnZvFV75I?si=yuew0MHnrlcianK6&start=2"
            title="African Traditional Architecture - YouTube Channel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
