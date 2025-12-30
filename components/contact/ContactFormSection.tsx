"use client";

import {
  CustomInput,
  CustomTextarea,
} from "@/components/contact/InputsTextArea";
import CustomBadge from "@/components/shared/SharedBadge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { MapPin, User2Icon } from "lucide-react";
import React from "react";
import { IoIosSend, IoMdMail } from "react-icons/io";
import { MdPhone } from "react-icons/md";

interface ContactFormSectionProps {
  loading: boolean;
  data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ContactFormSection({
  loading,
  data,
  onChange,
  onSubmit,
}: ContactFormSectionProps) {
  return (
    <div className="p-8 flex flex-col justify-center flex-1">
      <div className="flex justify-start mb-6">
        <CustomBadge>Contact Information</CustomBadge>
      </div>

      <h2 className="text-3xl md:text-4xl font-black text-primary-color mb-10 leading-tight">
        We'd love to hear from you
      </h2>

      <form className="space-y-6" onSubmit={onSubmit}>
        <CustomInput
          label="Name"
          placeholder="Enter your name"
          name="name"
          value={data.name}
          onChange={onChange}
          icon={User2Icon}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInput
            label="Your Email"
            placeholder="Your Email"
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            icon={IoIosSend}
          />
          <CustomInput
            label="Your Phone"
            placeholder="Your Phone"
            type="tel"
            name="phone"
            value={data.phone}
            onChange={onChange}
            icon={MdPhone}
          />
        </div>

        <CustomInput
          label="Your Address"
          placeholder="Your Address"
          name="address"
          value={data.address}
          onChange={onChange}
          icon={MapPin}
        />

        <CustomTextarea
          label="Message"
          placeholder="Write Message.."
          name="message"
          value={data.message}
          onChange={onChange}
          icon={IoMdMail}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 rounded-full text-sm shadow-md transition-all uppercase tracking-wide"
        >
          {loading ? (
            <>
              <Spinner className="size-6 mr-2" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  );
}
