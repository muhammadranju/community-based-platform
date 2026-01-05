import { Suspense } from "react";
import VerifyOTP from "./VerifyOTPPage";

export const metadata = {
  title: "Verify OTP - African Traditional Architecture",
  description: "Verify OTP Page",
};
function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyOTP />;
      </Suspense>
    </>
  );
}

export default page;
