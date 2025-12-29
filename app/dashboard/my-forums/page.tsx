import { Suspense } from "react";
import { MyForumsContent } from "./MyForumsContent";

export default function page() {
  return (
    <Suspense fallback={<div>Loading forums...</div>}>
      <title>My Forums Dashboard - African Traditional Architecture</title>
      <MyForumsContent />
    </Suspense>
  );
}
