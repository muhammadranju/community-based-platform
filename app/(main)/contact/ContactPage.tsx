"use client";
import {
  CustomInput,
  CustomTextarea,
} from "@/components/contact/InputsTextArea";
import CustomBadge from "@/components/shared/SharedBadge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { IoIosSend, IoMdMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdPhone } from "react-icons/md";

const ContactPage: React.FC = () => {
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

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomInput
                label="Your Email"
                placeholder="Your Email"
                type="email"
                icon={IoIosSend}
              />
              <CustomInput
                label="Your Phone"
                placeholder="Your Phone"
                type="tel"
                icon={MdPhone}
              />
            </div>

            <CustomInput
              label="Your Address"
              placeholder="Your Address"
              icon={IoLocationSharp}
            />

            <CustomTextarea
              label="Message"
              placeholder="Write Message.."
              icon={IoMdMail}
            />

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 rounded-full text-sm shadow-md transition-all uppercase tracking-wide"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
