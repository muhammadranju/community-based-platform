import { Suspense } from "react";
import VideosPage from "./VideosPage";

function page() {
  return (
    <>
      <title>Videos - African Traditional Architecture</title>
      <Suspense fallback={<div>Loading...</div>}>
        <VideosPage />
      </Suspense>
    </>
  );
}

export default page;
