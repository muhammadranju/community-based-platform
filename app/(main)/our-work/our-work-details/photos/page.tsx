import { Suspense } from "react";
import { Gallery } from "./PhotoGallery";
import { Header } from "./PhotoHeader";

export const metadata = {
  title: "Photos - African Traditional Architecture",
  description: "Photos African Traditional Architecture",
};

function page() {
  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4 max-w-7xl mx-auto">
      <div className="min-h-screen bg-white w-full max-w-[1920px] mx-auto relative">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <main className="px-4 md:px-8 pb-10 pt-20 md:pt-24 max-w-7xl mx-auto">
          <Gallery />
        </main>
      </div>
    </div>
  );
}

export default page;
