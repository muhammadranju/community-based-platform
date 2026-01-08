"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AuthHeader from "@/components/auth/AuthHeader";
import AuthWelcomeSection from "@/components/auth/AuthWelcomeSection";
import BackButton from "@/components/shared/BackButton";

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

import { Textarea } from "@/components/ui/textarea";
import { authFetch } from "@/lib/authFetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// --- Schema Definition ---
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),

  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." }),
  about: z.string().min(2, { message: "About must be at least 2 characters." }),
});

export default function DatabasePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      about: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const response = await authFetch("/database", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        name: values.name,
        country: values.country,
        about: values.about,
      }),
    });

    if (!response.ok) {
      toast.error("Failed to add to database");
      setLoading(false);
      return;
    }

    const data = await response.json();

    if (data.success) {
      toast.success("Database entry successful", {
        description: "You will be redirected to the home page in 2 seconds.",
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
      form.reset();
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white overflow-x-hidden">
      <div className="w-full lg:w-[45%] shrink-0 relative overflow-hidden bg-[#65a30d] flex items-center justify-center p-6 lg:p-12 min-h-[400px] lg:min-h-screen lg:h-auto">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-100 pointer-events-none z-0">
          <img
            src="/Rectangle.png"
            alt="Pattern"
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 opacity-100 bg-[url('/Rectangle.png')] bg-repeat -z-10"></div>
        </div>

        {/* Content Container (Card) */}
        <div className="relative w-full max-w-md lg:max-w-full lg:h-full max-h-[400px] lg:max-h-[90vh] aspect-[4/5] lg:aspect-auto bg-white rounded-[2.5rem] overflow-hidden flex flex-col z-10">
          {/* Bottom Image Section with Text Overlay */}
          <div className="absolute bottom-0 left-0 right-0 w-full h-full z-10">
            <img
              src="/bg/Rectangle2.png"
              alt="African Traditional Architecture"
              className="w-full h-full object-cover object-bottom"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000&auto=format&fit=crop";
              }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 z-20">
              <div className="text-white">
                <h2 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">
                  African Traditional
                  <br />
                  Decor & Interior Design
                </h2>
                <p className="text-sm lg:text-base leading-relaxed text-gray-100">
                  If you desire to start building your dream home based on the
                  foundation of our ancestors knowledge, but don't know where to
                  start. We hope the design inspirations here will help you get
                  started. We have a combination of paid and free resources
                  based on the contributions of our experts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[55%] flex flex-col relative">
        <AuthHeader link="/login" text="Login" />

        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 pb-10 lg:py-0">
          <div className="w-full max-w-xl mx-auto">
            <BackButton link="/" text="Home" />

            {/* Reusable Welcome Section */}
            <AuthWelcomeSection
              title="Join The Database"
              badgeText="DATABASE"
              linkText="Login"
              linkHref="/login"
              showLink={false}
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-medium">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
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

                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-medium">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your country"
                          className="h-12 border-gray-300 rounded-lg focus-visible:ring-lime-500 bg-white text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* About Project */}
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-medium lg:w-64 md:w-64">
                        Tell us about your project & the design inspiration you
                        would like to see
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your country"
                          className="h-28 border-gray-300 rounded-lg focus-visible:ring-lime-500 bg-white text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 rounded-lg text-sm shadow-md transition-all uppercase tracking-wide"
                >
                  {loading ? "Joining..." : "Join Now"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
