"use client";

import ContactHeroHeader from "@/components/shared/ContactHeroHeader";
import ContactFormSection from "@/components/contact/ContactFormSection";
import { authFetch } from "@/lib/authFetch";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { isValidPhoneNumber } from "react-phone-number-input";

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
    setData((prev) => ({ ...prev, [name]: value }));
  };

  /* Phone Change Handler */
  const handlePhoneChange = (value: string) => {
    setData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.phone && !isValidPhoneNumber(data.phone)) {
      toast.error("Invalid phone number");
      return;
    }

    try {
      setLoading(true);

      const response = await authFetch("/user-contacts", {
        method: "POST",
        body: JSON.stringify(data),
        auth: false,
      });

      if (!response.ok) {
        toast.error("Failed to send message");
        setLoading(false);
        return;
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully", {
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
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:mb-20 mb-10">
      {/* Hero Header */}
      <ContactHeroHeader
        title="Get In Touch With Us"
        imageSrc="/bg/our_work_bg.png"
        alt="Contact Hero Background"
      />

      {/* Main Split Section */}
      <div className="flex flex-col-reverse lg:flex-row gap-0 rounded-3xl overflow-hidden bg-accent-bg mt-20 shadow-lg">
        {/* Left: Image */}
        <div className="relative h-[400px] lg:h-auto w-full flex-1">
          <Image
            src="/bg/Rectangle4.png"
            alt="Traditional Village Scene"
            height={350}
            width={650}
            className="object-cover"
            priority
          />
        </div>

        {/* Right: Form */}
        <ContactFormSection
          loading={loading}
          data={data}
          onChange={handleChange}
          onPhoneChange={handlePhoneChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ContactPage;
