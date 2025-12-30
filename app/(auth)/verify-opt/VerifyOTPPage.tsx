"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AuthHeader from "@/components/auth/AuthHeader";
import LoginLeftDesign from "@/components/auth/LoginLeftDesign";
import BackButton from "@/components/shared/BackButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authFetch } from "@/lib/authFetch";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

// --- Schema ---
const formSchema = z.object({
  otp: z.string().length(4, { message: "Please enter the 4-digit code." }),
});

export default function VerifyOTP() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  console.log(email);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate OTP verification
    const res = await authFetch("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({
        oneTimeCode: Number(values.otp),
        email: email,
      }),
    });
    const data = await res.json();

    if (data.success) {
      console.log(data);
      router.push(`/reset-password?token=${data.data}`);
      toast.success("OTP verified successfully!", {
        description: `${data.message}`,
      });
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!email) {
      router.push("/login");
    }
  }, []);

  function handleResend() {
    setIsResending(true);
    setTimeout(() => {
      alert("New OTP sent!");
      setIsResending(false);
    }, 1500);
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white overflow-x-hidden">
      <LoginLeftDesign link="/signup" text="Signup" />

      {/* Right Panel */}
      <div className="w-full lg:w-[55%] flex flex-col relative">
        <AuthHeader link="/login" text="Login" />

        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 py-10 lg:py-0">
          <div className="w-full max-w-xl mx-auto">
            <BackButton link="/forgot-password" text="Back" />

            <Badge className="bg-lime-500 text-white px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wider uppercase inline-block shadow-sm">
              Verify OTP
            </Badge>

            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-2 tracking-tight mt-4">
              Enter verification code
            </h1>

            <p className="text-gray-500 text-sm mb-8">
              We’ve sent a 4-digit code to your email. Please enter it below to
              continue.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* OTP Field */}
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-medium">
                        Verification Code
                      </FormLabel>
                      <FormControl>
                        <div className="flex justify-center">
                          <InputOTP maxLength={4} {...field}>
                            <InputOTPGroup className="gap-3">
                              <InputOTPSlot
                                index={0}
                                className="w-14 h-12 text-2xl font-bold border-gray-300 rounded-lg focus-visible:ring-lime-500 focus-visible:ring-2"
                              />
                              <InputOTPSlot
                                index={1}
                                className="w-14 h-12 text-2xl font-bold border-gray-300 rounded-lg focus-visible:ring-lime-500 focus-visible:ring-2"
                              />
                              <InputOTPSeparator className="mx-4 text-gray-400" />
                              <InputOTPSlot
                                index={2}
                                className="w-14 h-12 text-2xl font-bold border-gray-300 rounded-lg focus-visible:ring-lime-500 focus-visible:ring-2"
                              />
                            </InputOTPGroup>

                            <InputOTPGroup className="gap-3">
                              <InputOTPSlot
                                index={3}
                                className="w-14 h-12 text-2xl font-bold border-gray-300 rounded-lg focus-visible:ring-lime-500 focus-visible:ring-2"
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormMessage className="text-center mt-2" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 rounded-lg text-sm shadow-md transition-all uppercase tracking-wide"
                >
                  {isLoading ? "Verifying..." : "Verify & Continue"}
                </Button>
              </form>
            </Form>

            {/* Resend Link */}
            <p className="text-center text-sm text-gray-500 mt-8 sr-only">
              Didn’t receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-amber-600 font-medium hover:underline focus:outline-none"
              >
                {isResending ? "Sending..." : "Resend code"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
