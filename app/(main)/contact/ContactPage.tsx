"use client";
import {
  CustomInput,
  CustomTextarea,
} from "@/components/contact/InputsTextArea";
import CustomBadge from "@/components/shared/SharedBadge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authFetch } from "@/lib/authFetch";
import { User2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { IoIosSend, IoMdMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdPhone } from "react-icons/md";
import { toast } from "sonner";

const ContactPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await authFetch("/user-contacts", {
        method: "POST",
        body: JSON.stringify(data),
        auth: false,
      });

      if (!response.ok) {
        setLoading(false);
        toast.error("Failed to send message");
        throw new Error("Failed to send message");
      }
      const result = await response.json();

      if (result.success) {
        setLoading(false);
        toast.success("Message sent succ  essfully", {
          description: "We will get back to you as soon as possible",
        });
        setData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="lg:mb-20 mb-10">
      {/* Header Section */}
      <div className="w-full lg:min-h-[400px] h-[150px] rounded-3xl flex items-center justify-center relative overflow-hidden ">
        <Image
          src="/bg/our_work_bg.png"
          alt="Contact Hero"
          fill
          className="object-cover absolute inset-0"
          priority
        />
        <h1 className="text-white text-3xl md:text-5xl font-bold z-10 tracking-tight">
          Get In Touch With Us
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col-reverse lg:flex-row gap-0  rounded-3xl overflow-hidden bg-accent-bg mt-20">
        {/* Left Side - Image with Geometric Overlay */}
        <div className="relative h-[400px] lg:h-auto w-full flex-1">
          {/* Image source: Using a placeholder that resembles a hut/nature */}
          <Image
            src="/bg/Rectangle4.png"
            alt="Traditional Hut"
            fill
            className="object-cover absolute inset-0"
            priority
          />
        </div>

        {/* Right Side - Form */}
        <div className="p-8 flex flex-col justify-center flex-1">
          <div className="flex justify-start mb-6">
            <CustomBadge>Contact Information</CustomBadge>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-primary-color mb-10 leading-tight">
            We'd love to hear from you
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <CustomInput
              label="Name"
              placeholder="Enter your name"
              name="name"
              value={data.name}
              onChange={handleChange}
              icon={User2Icon}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomInput
                label="Your Email"
                placeholder="Your Email"
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                icon={IoIosSend}
              />
              <CustomInput
                label="Your Phone"
                placeholder="Your Phone"
                type="tel"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                icon={MdPhone}
              />
            </div>

            <CustomInput
              label="Your Address"
              placeholder="Your Address"
              name="address"
              value={data.address}
              onChange={handleChange}
              icon={IoLocationSharp}
            />

            <CustomTextarea
              label="Message"
              placeholder="Write Message.."
              name="message"
              value={data.message}
              onChange={handleChange}
              icon={IoMdMail}
            />

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 rounded-full text-sm shadow-md transition-all uppercase tracking-wide"
            >
              {loading ? (
                <>
                  <Spinner className="size-6" /> Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
