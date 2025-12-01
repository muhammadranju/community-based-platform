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
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Left Section - Architecture Image */}
      <div className="w-1/2 h-full bg-[url('/Rectangle.png')] bg-cover bg-center rounded-r-3xl p-10">
        <div className="bg-[url('/bg/Rectangle2.png')] bg-cover bg-center rounded-3xl w-full h-full">
          <div className="w-full h-full hidden">.</div>
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
            <Link href="/login">
              <Button className="bg-secondary-color hover:bg-[#b45309] text-white rounded-full px-6 h-9 text-sm font-semibold">
                Login
              </Button>
            </Link>
          </div>

          {/* Scrollable Content Container */}
          <div className="flex-1 flex flex-col justify-center min-h-0">
            {/* Badge */}
            <div className="mb-4">
              <span className="bg-accent-color text-white px-3 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase">
                Waiting List
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-primary-color mb-2">
              Join The Waiting List
            </h1>

            {/* Login Link */}
            <p className="text-gray-500 text-sm mb-6">
              We are soon launching a portfolio of Indigenous African
              architecture designs, signup to stay update
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
                          className="w-full px-3 py-2 h-10 border-gray-200 rounded-lg focus:ring-accent-color focus:border-accent-color"
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
                          className="w-full px-3 py-2 border-gray-200 rounded-lg focus:ring-accent-color focus:border-accent-color"
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
                          className="w-full px-3 py-2 h-10 border-gray-200 rounded-lg focus:ring-accent-color focus:border-accent-color"
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
                          className="w-full px-3 py-2 border-gray-200 rounded-lg focus:ring-accent-color focus:border-accent-color"
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
                  className="w-full bg-secondary-color hover:bg-[#b45309] text-white font-bold py-2.5 h-11 rounded-lg text-sm shadow-sm mt-3"
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
