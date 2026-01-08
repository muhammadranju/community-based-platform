import { Suspense } from "react";
import ResetPassword from "./ResetPassowrdPage";

export const metadata = {
  title: "Reset Password - African Traditional Architecture",
  description: "Reset Password",
};

function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
    </>
  );
}

export default page;
