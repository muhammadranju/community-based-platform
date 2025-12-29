import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { authFetch } from "@/lib/authFetch";
import { Check } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CustomSelect } from "./CustomSelect";

export enum DonationCategory {
  MONETARY = "MONETARY",
  VOLUNTEER = "VOLUNTEER",
}

export enum VolunteerType {
  AMOUNT = "AMOUNT",
  HOW_TO = "HOW_TO",
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export const DonationForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const [donationType, setDonationType] = useState<string>("general");
  const [donationCategory, setDonationCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);

  // Reset category when switching to general donation
  useEffect(() => {
    if (donationType === "general") {
      setDonationCategory("");
    }
  }, [donationType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "mpesa") {
      handelMPesa();
    } else if (paymentMethod === "stripe") {
      handelStripe();
    }
  };

  const handelStripe = async () => {
    const res = await authFetch(`/donation/create-payment-link`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phoneNumber: phone,
        country,
        volunteerCategory: donationType,
        donationCategory,
        description: message,
        amount,
      }),
      auth: false,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Error:", text);
      return;
    }

    const data = await res.json();
    window.location.href = data.url; // redirect to Stripe Payment Link
    console.log(paymentMethod);
  };

  const handelMPesa = async () => {
    console.log(paymentMethod);
  };

  return (
    <div className="w-full bg-accent-bg border border-lime-500 rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm h-full flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            required
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label="Last Name"
            required
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Contact Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            required
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Phone Number"
            required
            placeholder="Your Address" // Keeping placeholder as requested in original code note
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Country */}
        <Input
          label="Country"
          required
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        {/* Donation Type Section */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            <div>
              <label className="text-sm font-semibold text-emerald-900 ml-1">
                Monetrary Donation Category
              </label>
              <CustomSelect
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
                options={[
                  { label: "General donation", value: "general" },
                  { label: "Project specific donation", value: "project" },
                ]}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-emerald-900 ml-1">
                Volunteer Category
              </label>
              <CustomSelect
                value={donationCategory}
                onChange={(e) => setDonationCategory(e.target.value)}
                placeholder="Select Category"
                options={[
                  { label: "Building Materials", value: "materials" },
                  { label: "Labor Costs", value: "labor" },
                  { label: "Community Outreach", value: "outreach" },
                  { label: "Research & Documentation", value: "research" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Donation Amount Section */}
        <div className="flex flex-col gap-3 mt-2">
          <Input
            label="Donation Amount"
            required
            placeholder="Enter amount (USD)"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {/* Comment/Message Section */}
        <div className="flex flex-col gap-1.5 w-full mt-2">
          <label className="text-sm font-semibold text-emerald-900 ml-1">
            Message (Optional)
          </label>
          <Textarea
            placeholder="Leave a brief comment here"
            className="text-gray-700 min-h-[100px] bg-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-emerald-900 ml-1">
              Payment Method
            </label>
            <div className="flex gap-1">
              <Image
                src="/bg/payment-methods.png"
                alt="Payment Methods"
                width={300} // Adjusted width to be more reasonable
                height={50}
                className="object-contain h-8 w-auto" // Added classes to control size
              />
            </div>
          </div>
          <CustomSelect
            placeholder="Select a Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            options={[
              { label: "M-pesa", value: "mpesa" },
              { label: "Stripe", value: "stripe" },
            ]}
          />
        </div>

        {/* Privacy Checkbox */}
        <div className="flex flex-col gap-2 mt-2 sr-only">
          <label className="text-sm font-bold text-emerald-900 ml-1">
            May we thank you publicly?
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                isAnonymous
                  ? "bg-emerald-900"
                  : "bg-white border-2 border-gray-300"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setIsAnonymous(!isAnonymous);
              }}
            >
              {isAnonymous && (
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              )}
            </div>
            <span className="text-gray-600 text-sm font-medium">
              No, Please keep my identity anonymous.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4 bg-secondary-color hover:bg-secondary-color/90 text-white font-bold py-6  rounded-full shadow-lg transition-transform transform active:scale-[0.99]"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

const Input: React.FC<InputProps> = ({
  label,
  required,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-emerald-900 ml-1">
        {label}
        {required && "*"}
      </label>
      <input
        className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-700 bg-white ${className}`}
        {...props}
      />
    </div>
  );
};
