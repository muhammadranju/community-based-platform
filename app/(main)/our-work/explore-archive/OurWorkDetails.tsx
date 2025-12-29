// "use client";
// import ArchiveExplorer from "@/components/our_work_details/ArchiveExplorer";
// import HeaderBanner from "@/components/our_work_details/HeaderBanner";

// function OurWorkDetails() {
//   return (
//     <main className="w-full">
//       <HeaderBanner />

//       {/* Archive Explorer Section */}
//       <section className="py-12 md:py-10">
//         <ArchiveExplorer />
//       </section>
//     </main>
//   );
// }

// export default OurWorkDetails;

// app/our-work/explore-archive/page.tsx

import { Suspense } from "react";
import ArchiveExplorer from "@/components/our_work_details/ArchiveExplorer";
import HeaderBanner from "@/components/our_work_details/HeaderBanner";

export default function OurWorkDetails() {
  return (
    <main className="w-full">
      <Suspense fallback={null}>
        <HeaderBanner />
      </Suspense>

      {/* Archive Explorer Section */}
      <section className="py-12 md:py-10">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-20 text-center">
              <p className="text-gray-600 text-lg">Loading archive...</p>
            </div>
          }
        >
          <ArchiveExplorer />
        </Suspense>
      </section>
    </main>
  );
}
