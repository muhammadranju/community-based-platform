"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { authFetch } from "@/lib/authFetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// --- Schema ---
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call

    const res = await authFetch("/auth/forget-password", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (data.success) {
      console.log(data);
      router.push(`/verify-opt?email=${values.email}`);
      toast.success("Verification code sent!", {
        description: "Please check your email for the verification code.",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white overflow-x-hidden">
      <LoginLeftDesign link="/signup" text="Signup" />

      {/* Right Panel */}
      <div className="w-full lg:w-[55%] flex flex-col relative">
        <AuthHeader link="/login" text="Login" />

        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 py-10 lg:py-0">
          <div className="w-full max-w-xl mx-auto">
            <BackButton link="/login" text="Login" />

            <Badge className="bg-lime-500 text-white px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wider uppercase inline-block shadow-sm">
              Forgot password
            </Badge>

            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-2 tracking-tight mt-4">
              Forgot your password?
            </h1>

            <p className="text-gray-500 text-sm mb-8">
              No worries! Enter your email and we’ll send you a verification
              code.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-medium">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="h-12 border-gray-300 rounded-lg focus-visible:ring-lime-500 bg-white text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 rounded-lg text-sm shadow-md transition-all uppercase tracking-wide"
                >
                  {isLoading ? "Sending..." : "Send Code"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
