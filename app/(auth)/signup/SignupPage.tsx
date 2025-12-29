"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AuthHeader from "@/components/auth/AuthHeader";
import LoginLeftDesign from "@/components/auth/LoginLeftDesign";
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
import Cookies from "js-cookie";
import Link from "next/link";

import { authFetch } from "@/lib/authFetch";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import BackButton from "@/components/shared/BackButton";

// --- Schema Definition ---
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // --- Form Setup ---
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    setLoading(true);
    const response = await authFetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name: values.username }),
    });
    if (!response.ok) {
      setLoading(false);
      toast.error("Failed to signup");
    }
    const data = await response.json();

    if (data.success) {
      setLoading(false);

      toast.success("Signup successful");

      router.push("/login");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Success callback
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL_GOOGLE as string,
          {
            idToken: codeResponse.code, // ✅ AUTH CODE
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        Cookies.set("token", token);

        toast.success("Google Login successful");
        router.push("/dashboard/users/soverview");
      } catch (error) {
        toast.error("Google login failed");
      }
    },
    onError: () => toast.error("Google login failed"),
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white  overflow-x-hidden ">
      <LoginLeftDesign link="/login" text="Login" />
      {/* --- Right Panel (Form) --- */}
      {/* Fixed: Adjusted width to 55% (was 60%) to prevent layout breaking on 1024px screens */}
      <div className="w-full lg:w-[55%] flex flex-col relative">
        {/* Top Navigation Bar */} {/* Desktop Navigation Bar */}
        <AuthHeader link="/login" text="Login" />
        {/* Form Content Container */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 pb-10 lg:py-0">
          <div className="w-full max-w-xl mx-auto mt-10">
            <BackButton link="/" text="Home" />
            {/* Badge */}
            <Badge className="bg-lime-500 text-white px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wider uppercase inline-block shadow-sm">
              JOIN THE VILLAGE
            </Badge>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-2 tracking-tight">
              Create an account
            </h1>

            {/* Subheading / Login Link */}
            <p className="text-gray-500 text-sm mb-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-teal-800 font-bold hover:underline decoration-2 underline-offset-2"
              >
                Login
              </Link>
            </p>

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
                          className="h-12 border-gray-300 rounded-lg focus-visible:ring-lime-500 bg-white text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Address */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-medium">
                        Email address
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
                            className="h-12 border-gray-300 rounded-lg focus-visible:ring-lime-500 bg-white pr-10 text-base"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      <p className="text-[10px] text-gray-600 mt-1.5">
                        Use 8 or more characters with a mix of letters, numbers
                        & symbols
                      </p>
                    </FormItem>
                  )}
                />

                {/* Terms */}
                <div className="pb-2">
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    By creating an account, you agree to our <br />
                    <a
                      href="#"
                      className="text-teal-800 font-bold underline decoration-1 underline-offset-2"
                    >
                      Terms of use
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-teal-800 font-bold underline decoration-1 underline-offset-2"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 rounded-lg text-sm shadow-md transition-all uppercase tracking-wide"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>

                {/* Divider */}
                <div className="relative ">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border border-gray-400"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-4 bg-white text-emerald-900 font-bold">
                      OR
                    </span>
                  </div>
                </div>

                {/* Google Button */}
                {/* Google Button */}
                <div className="flex justify-center w-full">
                  <Button
                    type="button"
                    onClick={() => googleLogin()}
                    variant="outline"
                    className="
                              w-full h-12
                              flex items-center justify-center gap-3
                              border border-gray-300
                              bg-white text-gray-700 font-medium
                              rounded-lg shadow-sm
                              transition-all duration-200
                              hover:bg-gray-100 hover:shadow-md hover:scale-[1.01]
                              active:scale-[0.98]
                            "
                  >
                    <FcGoogle className="w-5 h-5" />
                    <span>Continue with Google</span>
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
