"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AuthHeader from "@/components/auth/AuthHeader";
import LoginLeftDesign from "@/components/auth/LoginLeftDesign";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthWelcomeSection from "@/components/auth/AuthWelcomeSection";
import BackButton from "@/components/shared/BackButton";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { authFetch } from "@/lib/authFetch";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import getUser from "@/components/shared/UserInfo";

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = getUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await authFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      toast.error("Failed to login");
      setLoading(false);
      return;
    }

    const data = await response.json();
    if (data.success) {
      const { token, user } = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      Cookies.set("token", token);
      toast.success("Login successful");

      if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
        router.push("/dashboard/overview");
      } else {
        router.push("/dashboard/users/overview");
      }
    }
    setLoading(false);
  }

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL_GOOGLE!,
          { idToken: codeResponse.code },
          { headers: { "Content-Type": "application/json" } }
        );
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        Cookies.set("token", token);
        toast.success("Google Login successful");
        router.push("/dashboard/users/overview");
      } catch (error) {
        toast.error("Google login failed");
      }
    },
    onError: () => toast.error("Google login failed"),
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white overflow-x-hidden">
      <LoginLeftDesign link="/signup" text="Sign Up" />

      <div className="w-full lg:w-[55%] flex flex-col relative">
        <AuthHeader link="/signup" text="Sign Up" />

        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 py-10 lg:py-0">
          <div className="w-full max-w-xl mx-auto">
            <BackButton link="/" text="Home" />

            <AuthWelcomeSection
              title="Log in"
              linkText="Sign Up"
              linkHref="/signup"
            />

            {/* Google Button - Desktop */}
            <div className="hidden lg:block">
              <GoogleSignInButton onClick={() => googleLogin()} />
              <AuthDivider />
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-medium flex justify-between items-center">
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
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="h-12 border-gray-300 rounded-lg focus-visible:ring-lime-500 bg-white text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="text-right">
                        <Link
                          href="/forgot-password"
                          className="text-base text-[#034833] hover:underline decoration-2 underline-offset-2"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 rounded-lg text-sm shadow-md transition-all uppercase tracking-wide"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>

            {/* Google Button + Divider - Mobile */}
            <div className="lg:hidden mt-6">
              <AuthDivider />
              <GoogleSignInButton onClick={() => googleLogin()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
