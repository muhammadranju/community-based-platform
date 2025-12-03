"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";

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
import LoginLeftDesign from "@/components/auth/LoginLeftDesign";
import Link from "next/link";
import AuthHeader from "@/components/auth/AuthHeader";
import { Badge } from "@/components/ui/badge";

// --- Schema Definition ---
const formSchema = z.object({
  confirmPassword: z.string().min(2, {
    message: "Confirm Password must be at least 2 characters.",
  }),

  newPassword: z.string().min(8, {
    message: "New Password must be at least 8 characters.",
  }),
});

export default function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- Form Setup ---
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Simulate API call
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white  overflow-x-hidden">
      <LoginLeftDesign link="/signup" text="Signup" />
      {/* --- Right Panel (Form) --- */}
      <div className="w-full lg:w-[55%] flex flex-col relative">
        {/* Desktop Navigation Bar */}
        <AuthHeader link="/login" text="Login" />

        {/* Form Content Container */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 py-10 lg:py-0 ">
          <div className="w-full max-w-xl mx-auto">
            <Link href="/login" className="flex items-center gap-2 my-5">
              <Button
                variant="outline"
                className="rounded-xl py-5 bg-primary-color text-white hover:bg-primary-color hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-primary-color">Back to Login</span>
            </Link>
            <Badge className="bg-accent-color text-white px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wider uppercase inline-block shadow-sm">
              Reset password
            </Badge>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-color mb-2 tracking-tight">
              Reset your password
            </h1>

            {/* Subheading / Login Link */}
            <p className="text-gray-500 text-sm mb-8">
              Go ahead and set a new password
            </p>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/*New Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-medium flex justify-between">
                        <span>New Password</span>
                        <div
                          className="flex items-center text-gray-400 gap-1 cursor-pointer hover:text-gray-600 select-none"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                          <span className="text-xs">
                            {showPassword ? "Hide" : "Show"}
                          </span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-12 border-gray-300 rounded-lg focus-visible:ring-accent-color bg-white pr-10 text-base"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-medium flex justify-between">
                        <span>Confirm Password</span>
                        <div
                          className="flex items-center text-gray-400 gap-1 cursor-pointer hover:text-gray-600 select-none"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                          <span className="text-xs">
                            {showConfirmPassword ? "Hide" : "Show"}
                          </span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter confirm password"
                            className="h-12 border-gray-300 rounded-lg focus-visible:ring-accent-color bg-white pr-10 text-base"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-secondary-color hover:bg-secondary-color2 text-white font-bold h-12 rounded-lg text-sm shadow-md transition-all uppercase tracking-wide"
                >
                  SAVE
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
