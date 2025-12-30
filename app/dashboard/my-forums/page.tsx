import { Suspense } from "react";
import { MyForumsContent } from "./MyForumsContent";

export const metadata = {
  title: "My Forums Dashboard - African Traditional Architecture",
  description: "My Forums Dashboard Page",
};

export default function page() {
  return (
    <Suspense fallback={<div>Loading forums...</div>}>
      <MyForumsContent />
    </Suspense>
  );
}
