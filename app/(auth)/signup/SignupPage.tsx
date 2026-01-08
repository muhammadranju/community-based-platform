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

// --- Schema Definition ---
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = getUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const response = await authFetch("/user", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.username,
      }),
    });

    if (!response.ok) {
      toast.error("Failed to signup");
      setLoading(false);
      return;
    }

    const data = await response.json();

    if (data.success) {
      toast.success("Signup successful");
      router.push("/login");
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

        toast.success("Google Signup successful");
        router.push("/dashboard/users/overview"); // Fixed typo: soverview → overview
      } catch (error) {
        toast.error("Google signup failed");
      }
    },
    onError: () => toast.error("Google signup failed"),
  });
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white overflow-x-hidden">
      <LoginLeftDesign link="/login" text="Login" />

      <div className="w-full lg:w-[55%] flex flex-col relative">
        <AuthHeader link="/login" text="Login" />

        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 pb-10 lg:py-0">
          <div className="w-full max-w-xl mx-auto">
            <BackButton link="/" text="Home" />

            {/* Reusable Welcome Section */}
            <AuthWelcomeSection
              title="Create an account"
              badgeText="JOIN THE VILLAGE"
              linkText="Login"
              linkHref="/login"
            />

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Username */}
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

                {/* Email */}
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

                {/* Password with Show/Hide */}
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
                      <p className="text-[10px] text-gray-600 mt-1.5">
                        Use 8 or more characters with a mix of letters, numbers
                        & symbols
                      </p>
                    </FormItem>
                  )}
                />

                {/* Terms Agreement */}
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
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 rounded-lg text-sm shadow-md transition-all uppercase tracking-wide"
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </form>
            </Form>

            {/* Divider + Google Button (consistent with Login) */}
            <AuthDivider />
            <GoogleSignInButton onClick={() => googleLogin()} />
          </div>
        </div>
      </div>
    </div>
  );
}
