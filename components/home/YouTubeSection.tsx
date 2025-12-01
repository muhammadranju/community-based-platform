// import { Play, Share2 } from "lucide-react";

// export default function YouTubeSection() {
//   return (
//     <section className="py-16 md:py-24 bg-white">
//       <div className="container mx-auto px-4 md:px-6 text-center">
//         <span className="inline-block bg-[#84cc16] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
//           JOIN OUR YOUTUBE COMMUNITY
//         </span>
//         <h2 className="text-3xl md:text-4xl font-bold text-[#064e3b] mb-12">
//           Join Our YouTube Community
//         </h2>

//         <div className="relative w-full max-w-full mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
//           <iframe
//             width="560"
//             height="315"
//             src="https://www.youtube.com/embed/POjnZvFV75I?si=yuew0MHnrlcianK6&amp;start=2"
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Play } from "lucide-react";

export default function YouTubeSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 text-center">
        {/* Badge */}
        <span className="inline-block bg-[#84cc16] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wider">
          JOIN OUR YOUTUBE COMMUNITY
        </span>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#064e3b] mb-12 leading-tight">
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

        {/* Optional: Play icon overlay (uncomment if you want thumbnail style) */}
        {/* 
        <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl cursor-pointer group">
          <div className="absolute inset-0 bg-black/30 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play className="w-20 h-20 text-white drop-shadow-lg" fill="white" />
          </div>
          <iframe ... />
        </div>
        */}
      </div>
    </section>
  );
}
