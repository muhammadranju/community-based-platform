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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function WaitingListPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex  w-full bg-white overflow-hidden px-4 lg:px-0">
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
        {/* On mobile, use aspect ratio or fixed height to prevent stretching. */}
        <div className="relative w-full max-w-md lg:max-w-full lg:h-full max-h-[400px] lg:max-h-[90vh] aspect-[4/5] lg:aspect-auto bg-white rounded-[2.5rem] overflow-hidden flex flex-col  z-10">
          {/* Top Wireframe/Geometry Section */}

          {/* Bottom Image Section (The Hut) */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="w-full h-full relative">
              <img
                src="/bg/Rectangle2.png"
                alt="African Traditional Architecture"
                className="w-full h-full object-cover object-bottom"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000&auto=format&fit=crop";
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 md:px-12 lg:px-16 py-6 overflow-y-auto">
        <div className="w-full max-w-xl mx-auto flex flex-col h-full justify-center">
          {/* Header: Logo and Login Button */}
          <div className="flex justify-between items-center mb-6 shrink-0">
            <Link href="/">
              <img src="/logo.png" alt="ATA Logo" className="h-12 w-auto" />
            </Link>
            <Link href="/waiting-list/signup">
              <Button className="bg-amber-600 hover:bg-amber-600 text-white rounded-full px-6 h-9 text-sm font-semibold">
                Sign up
              </Button>
            </Link>
          </div>

          {/* Scrollable Content Container */}
          <div className="flex-1 flex flex-col justify-center min-h-0">
            {/* Badge */}
            <div className="mb-4">
              <span className="bg-lime-500 text-white px-3 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase">
                Waiting List
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">
              Join The Waiting List
            </h1>

            {/* Login Link */}
            <p className="text-gray-500 text-sm mb-6">
              We are soon launching a portfolio of Indigenous African
              architecture designs, signup to stay update
            </p>

            {/* Subheading / Login Link */}
            <p className="text-gray-500 text-sm mb-8">
              Don't have an account?{" "}
              <Link
                href="/waiting-list/signup"
                className="text-[#1a5d1a] font-bold hover:underline decoration-2 underline-offset-2"
              >
                Sign Up Waiting List
              </Link>
            </p>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs font-medium text-gray-600">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="w-full px-3 py-2 h-10 border-gray-200 rounded-lg focus:ring-lime-500 focus:border-lime-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs font-medium text-gray-600">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@email.com"
                          className="w-full px-3 py-2 border-gray-200 rounded-lg focus:ring-lime-500 focus:border-lime-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs font-medium text-gray-600">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your country"
                          className="w-full px-3 py-2 h-10 border-gray-200 rounded-lg focus:ring-lime-500 focus:border-lime-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs font-medium text-gray-600">
                        Tell us about your project & <br /> the design
                        inspiration you would like to see
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share here..."
                          className="w-full px-3 py-2 border-gray-200 rounded-lg focus:ring-lime-500 focus:border-lime-500"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-600 text-white font-bold py-2.5 h-11 rounded-lg text-sm shadow-sm mt-3"
                >
                  JOIN NOW
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
