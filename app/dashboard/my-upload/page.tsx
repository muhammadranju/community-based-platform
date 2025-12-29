import { Suspense } from "react";
import { MyUploadsContent } from "./MyUploadsContent";

export default function page() {
  return (
    <Suspense fallback={<div>Loading uploads...</div>}>
      <title>My Uploads Dashboard - African Traditional Architecture</title>
      <MyUploadsContent />
    </Suspense>
  );
}
