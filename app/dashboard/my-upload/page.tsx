import { Suspense } from "react";
import { MyUploadsContent } from "./MyUploadsContent";

export const metadata = {
  title: "My Uploads Dashboard - African Traditional Architecture",
  description: "My Uploads Dashboard Page",
};

export default function page() {
  return (
    <Suspense fallback={<div>Loading uploads...</div>}>
      <MyUploadsContent />
    </Suspense>
  );
}
