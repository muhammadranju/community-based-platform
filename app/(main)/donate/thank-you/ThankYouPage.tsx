"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function ThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [countdown, setCountdown] = useState(3);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setVerificationStatus("error");
      setErrorMessage("No payment session ID found in the URL.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const endpoint = `${apiUrl}/api/v1/donation/verify-payment?sessionId=${sessionId}`;

        const res = await fetch(endpoint);
        const data = await res.json();

        // Check for success status according to the API response
        const paymentStatus = data?.data?.paymentStatus || data?.paymentStatus;
        const isSuccess =
          paymentStatus === "success" ||
          paymentStatus === "succeeded" ||
          paymentStatus === "paid" ||
          data?.success === true;

        if (res.ok && isSuccess) {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("error");
          setErrorMessage(
            data?.message ||
              "Payment verification failed or was cancelled. Please check your payment details.",
          );
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setVerificationStatus("error");
        setErrorMessage(
          "An error occurred while verifying your payment. Please try again later.",
        );
      }
    };

    verifyPayment();
  }, [sessionId]);

  useEffect(() => {
    if (verificationStatus === "success") {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const redirect = setTimeout(() => {
        router.push("/donate");
      }, 3000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirect);
      };
    }
  }, [verificationStatus, router]);

  if (verificationStatus === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
          Verifying your payment...
        </h1>
        <p className="text-xl text-gray-600 max-w-lg mb-8">
          Please wait while we verify your donation and generate your receipt.
        </p>
      </div>
    );
  }

  if (verificationStatus === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="bg-red-50 rounded-full p-6 mb-6">
          <XCircle className="w-16 h-16 text-red-600" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
          Payment Failed
        </h1>

        <p className="text-xl text-gray-600 max-w-lg mb-8">
          {errorMessage || "We were unable to process your donation."}
        </p>

        <div className="flex gap-4">
          <Button
            onClick={() => router.push("/donate")}
            className="rounded-full bg-emerald-900 text-white hover:bg-emerald-800 px-8 py-6 text-lg"
          >
            Try Again
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="rounded-full border-gray-300 hover:bg-gray-50 px-8 py-6 text-lg"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-emerald-50 rounded-full p-6 mb-6">
        <CheckCircle2 className="w-16 h-16 text-emerald-600" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
        Thank You!
      </h1>

      <p className="text-xl text-gray-600 max-w-lg mb-8">
        Your donation has been successfully received. We appreciate your support
        in helping us make a big impact.
      </p>

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-500">
          Redirecting to donation page in {countdown} seconds...
        </p>
        <Button
          onClick={() => router.push("/donate")}
          variant="outline"
          className="mt-4 rounded-full border-emerald-900 text-emerald-900 hover:bg-emerald-50"
        >
          Return Immediately
        </Button>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
