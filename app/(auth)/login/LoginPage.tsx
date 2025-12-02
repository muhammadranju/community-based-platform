"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
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
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // --- Form Setup ---
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",

      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Simulate API call
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white font-sans overflow-x-hidden">
      <LoginLeftDesign link="/signup" text="Signup" />
      {/* --- Right Panel (Form) --- */}
      <div className="w-full lg:w-[55%] flex flex-col relative">
        {/* Desktop Navigation Bar */}
        <AuthHeader link="/signup" text="Signup" />

        {/* Form Content Container */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 py-10 lg:py-0 ">
          <div className="w-full max-w-xl mx-auto">
            {/* Badge */}
            <Badge className="bg-accent-color text-white px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wider uppercase inline-block shadow-sm">
              welcome back to the village
            </Badge>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-color mb-2 tracking-tight">
              Log in
            </h1>

            {/* Subheading / Login Link */}
            <p className="text-gray-500 text-sm mb-8">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#1a5d1a] font-bold hover:underline decoration-2 underline-offset-2"
              >
                Sign Up
              </Link>
            </p>

            <div className="lg:block hidden">
              {/* Google Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full border border-gray-300 text-gray-600 font-medium h-12 rounded-lg hover:bg-gray-50 bg-white flex items-center justify-center gap-3 text-sm shadow-sm transition-all"
                onClick={() => console.log("Google Login")}
              >
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white text-primary-color font-bold">
                    OR
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* User Name */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-medium">
                        User name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          className="h-12 border-gray-300 rounded-lg focus-visible:ring-accent-color bg-white text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-medium flex justify-between">
                        <span>Password</span>
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
                      <Link
                        href="/forgot-password"
                        className="text-base text-[#034833]  hover:underline decoration-2 underline-offset-2 text-end"
                      >
                        Forgot your password?
                      </Link>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-secondary-color hover:bg-secondary-color2 text-white font-bold h-12 rounded-lg text-sm shadow-md transition-all uppercase tracking-wide"
                >
                  Login
                </Button>
                <div className="lg:hidden ">
                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-4 bg-white text-primary-color font-bold">
                        OR
                      </span>
                    </div>
                  </div>

                  {/* Google Button */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border border-gray-300 text-gray-600 font-medium h-12 rounded-lg hover:bg-gray-50 bg-white flex items-center justify-center gap-3 text-sm shadow-sm transition-all"
                    onClick={() => console.log("Google Login")}
                  >
                    <FcGoogle className="w-5 h-5" />
                    Continue with Google
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
