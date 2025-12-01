"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Left Section - Architecture Image */}
      {/* <div className="w-1/2 h-full  bg-[url('/Rectangle.png')] bg-cover  bg-center rounded-r-3xl">
        <div className="object-cover">
          <img src="/bg/Rectangle4.png" alt="Login Background" className=" " />
        </div>
      </div> */}
      <div className="w-1/2 h-full bg-[url('/Rectangle.png')] bg-cover bg-center rounded-r-3xl p-10">
        <div className="bg-[url('/bg/Rectangle4.png')] bg-cover bg-center rounded-3xl w-full h-full">
          <div className="w-full h-full hidden">.</div>
        </div>
      </div>
      {/* Left Section - Architecture Image
      <div className="hidden lg:block w-1/2 h-full relative">
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="/signup-bg.png"
            alt="Login Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div> */}

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 md:px-12 lg:px-16 py-6 overflow-y-auto">
        <div className="w-full max-w-xl mx-auto flex flex-col h-full justify-center">
          {/* Header: Logo and Login Button */}
          <div className="flex justify-between items-center mb-6 shrink-0">
            <Link href="/">
              <img src="/logo.png" alt="ATA Logo" className="h-12 w-auto" />
            </Link>
            <Link href="/signup">
              <Button className="bg-[#d97706] hover:bg-[#b45309] text-white rounded-full px-6 h-9 text-sm font-semibold">
                Signup
              </Button>
            </Link>
          </div>

          {/* Scrollable Content Container */}
          <div className="flex-1 flex flex-col justify-center min-h-0">
            {/* Badge */}
            <div className="mb-4">
              <span className="bg-[#84cc16] text-white px-3 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase">
                welcome back to the village
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-[#064e3b] mb-1">Log in</h1>

            {/* Login Link */}
            <p className="text-gray-500 text-sm mb-6">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#1a5d1a] font-bold hover:underline"
              >
                Sign up
              </Link>
            </p>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-[#064e3b] font-bold">
                  OR
                </span>
              </div>
            </div>

            {/* Google Button */}
            <Button
              variant="outline"
              className="w-full border border-gray-300 text-gray-600 font-medium py-2.5 h-11 rounded-lg hover:bg-gray-50 bg-white flex items-center justify-center gap-2 text-sm mb-5"
            >
              <FcGoogle className="w-10 h-10 text-2xl" />
              Continue with Google
            </Button>
            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs font-medium text-gray-600">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full px-3 py-2 h-10 border-gray-200 rounded-lg focus:ring-[#84cc16] focus:border-[#84cc16]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs font-medium text-gray-600">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-3 py-2 h-10 border-gray-200 rounded-lg focus:ring-[#84cc16] focus:border-[#84cc16]"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 flex items-center gap-1 text-xs"
                          >
                            {showPassword ? (
                              <EyeOff className="w-3 h-3" />
                            ) : (
                              <Eye className="w-3 h-3" />
                            )}
                            <span>Hide</span>
                          </button>
                        </div>
                      </FormControl>
                      <div className="flex justify-end">
                        <Link
                          href="/forgot-password"
                          className="text-sm underline underline-offset-1 text-gray-500 mt-0.5"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Terms */}
                <div className="pt-1">
                  <p className="text-[10px] text-gray-500">
                    By creating an account, you agree to our{" "}
                    <Link
                      href="#"
                      className="text-[#1a5d1a] font-bold underline"
                    >
                      Terms of use
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className="text-[#1a5d1a] font-bold underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>

                {/* Login Button */}
                <Button className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold py-2.5 h-11 rounded-lg text-sm shadow-sm mt-3">
                  LOGIN
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
