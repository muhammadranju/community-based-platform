import { Suspense } from "react";
import VideosPage from "./VideosPage";

export const metadata = {
  title: "Videos - African Traditional Architecture",
  description: "Videos Page",
};
function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <VideosPage />
      </Suspense>
    </>
  );
}

export default page;
