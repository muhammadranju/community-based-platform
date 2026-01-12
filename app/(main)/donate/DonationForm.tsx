"use client";

import { CustomInput, PhoneNumberInput } from "@/components/shared/CustomInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { CustomSelect } from "./CustomSelect";
import { toast } from "sonner";
import { authFetch } from "@/lib/authFetch";
import { isValidPhoneNumber } from "react-phone-number-input";
import Image from "next/image";

const cardLogos = [
  {
    name: "master-card",
    image: "/cards/mastercard.png",
  },
  {
    name: "american-express",
    image: "/cards/amex.png",
  },
  {
    name: "apple-pay",
    image: "/cards/apay.png",
  },
  {
    name: "discover",
    image: "/cards/discoverpay.png",
  },

  {
    name: "google-pay",
    image: "/cards/gpay.png",
  },
  {
    name: "visa",
    image: "/cards/visa.png",
  },
];

const donationAmounts = [
  { label: "$100", value: "100" },
  { label: "$200", value: "200" },
  { label: "$300", value: "300" },
  { label: "$400", value: "400" },
  { label: "$500", value: "500" },
  { label: "$600", value: "600" },
  { label: "$700", value: "700" },
  { label: "$800", value: "800" },
  { label: "$900", value: "900" },
  { label: "$1000", value: "1000" },
];
interface DonationFormProps {
  donationType: string;
  setDonationType: (value: string) => void;
  monetaryDonation: string;
  setMonetaryDonation: (value: string) => void;
  donationCategory: string;
  setDonationCategory: (value: string) => void;
}

export const DonationForm: React.FC<DonationFormProps> = ({
  donationType,
  setDonationType,
  monetaryDonation,
  setMonetaryDonation,
  donationCategory,
  setDonationCategory,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [volunteerMessage, setVolunteerMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isMonetaryDonation =
    donationType === "one-time" ||
    donationType === "monthly" ||
    donationType === "project-based" ||
    donationType === "corporate";
  const isVolunteerDonation = donationType === "volunteer";
  const contactInfoDisabled = isMonetaryDonation;

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (isVolunteerDonation) {
      if (!firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Invalid email address";
      }
      if (!phone) {
        newErrors.phoneNumber = "Phone number is required";
      } else if (!isValidPhoneNumber(phone)) {
        newErrors.phoneNumber = "Invalid phone number";
      }
      if (!country.trim()) {
        newErrors.country = "Country is required";
      }
      if (!donationCategory) {
        newErrors.donationCategory = "Please select a volunteer category";
      }
      if (!volunteerMessage.trim()) {
        newErrors.volunteerMessage =
          "Please tell us how you'd like to volunteer";
      }
    }

    if (isMonetaryDonation) {
      if (!firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Invalid email address";
      }
      if (!phone) {
        newErrors.phoneNumber = "Phone number is required";
      } else if (!isValidPhoneNumber(phone)) {
        newErrors.phoneNumber = "Invalid phone number";
      }
      if (!country.trim()) {
        newErrors.country = "Country is required";
      }
      if (!donationType) {
        newErrors.volunteerCategory = "Please select a monetary donation type";
      }
      const amountNum = Number(amount);
      if (amount === "" || isNaN(amountNum) || amountNum <= 0) {
        newErrors.amount = "Please enter a valid amount greater than 0";
      }
      if (!paymentMethod) {
        newErrors.paymentMethod = "Payment method is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isMonetaryDonation && paymentMethod === "mpesa") {
        toast.error("M-Pesa coming soon!");
      } else if (
        isMonetaryDonation &&
        (paymentMethod === "apple-pay" ||
          paymentMethod === "google-pay" ||
          paymentMethod === "discover" ||
          paymentMethod === "american-express" ||
          paymentMethod === "master-card" ||
          paymentMethod === "visa")
      ) {
        const res = await authFetch(`/donation/create-payment-link`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim() || "Not Available",
            lastName: lastName.trim() || "",
            email: email.trim() || "",
            phoneNumber: phone || "Not Available",
            country: country.trim() || "Not Available",
            volunteerCategory: monetaryDonation || "Not Available",
            donationCategory: monetaryDonation || "Not Available",
            description: message.trim() || "Not Available",
            amount: Number(amount),
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Error:", text);
          toast.error("Failed to create payment link. Please try again.");
          return;
        }

        const data = await res.json();

        window.location.href = data.url;
      } else if (isVolunteerDonation) {
        const res = await authFetch(`/donation/create-payment-link`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim() || "Not Available",
            lastName: lastName.trim() || "",
            email: email.trim() || "",
            phoneNumber: phone || "Not Available",
            country: country.trim() || "Not Available",
            volunteerCategory: donationType || "Not Available",
            donationCategory: donationCategory || "Not Available",
            paymentStatus: "unpaid",
            description: message.trim() || "Not Available",
            amount: Number(amount),
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Error:", text);
          toast.error("Failed to create payment link. Please try again.");
          return;
        }

        const data = await res.json();

        if (data.success) {
          toast.success(
            "Thank you for your volunteer interest! We'll contact you soon."
          );

          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setCountry("");
          setDonationType("");
          setDonationCategory("");
          setMessage("");
          setAmount("");
          setPaymentMethod("");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="donation-form"
      className="w-full bg-accent-bg border border-lime-500 rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm h-full flex flex-col overflow-hidden"
    >
      <div className="flex flex-col gap-6 overflow-y-auto pr-2">
        {/* Contact Info Fields - Always Visible */}
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="First Name"
              required={true}
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName}
            />
            <CustomInput
              label="Last Name"
              required={true}
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Email"
              required={true}
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <PhoneNumberInput
              label="Phone Number"
              required={true}
              value={phone}
              onChange={setPhone}
              error={errors.phoneNumber}
            />
          </div>

          <CustomInput
            label="Country"
            required={true}
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            error={errors.country}
          />
        </div>
        {/* Donation Type Selection - Always Visible */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-20 p-4 bg-gray-50 rounded-xl border   border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="monetary-radio"
                name="donation-type"
                checked={isMonetaryDonation}
                onChange={() => {
                  setDonationType("one-time");
                  setDonationCategory("");
                }}
                className="w-4 h-4 cursor-pointer text-lime-500 focus:ring-lime-500"
              />
              <label
                htmlFor="monetary-radio"
                className="text-sm font-semibold text-emerald-900 cursor-pointer"
              >
                Monetary Donation
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="volunteer-radio"
                name="donation-type"
                checked={isVolunteerDonation}
                onChange={() => {
                  setDonationType("volunteer");
                  setDonationCategory("");
                  setAmount("");
                  setPaymentMethod("");
                }}
                className="w-4 h-4 cursor-pointer text-lime-500 focus:ring-lime-500"
              />
              <label
                htmlFor="volunteer-radio"
                className="text-sm font-semibold text-emerald-900 cursor-pointer"
              >
                Volunteer Category
              </label>
            </div>
          </div>
        </div>

        {/* Volunteer Specific Fields */}
        {isVolunteerDonation && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div>
              <CustomSelect
                label="Volunteer Category"
                value={donationCategory}
                onChange={(e) => setDonationCategory(e.target.value)}
                placeholder="Select Content contribution"
                options={[
                  {
                    label: "Content Contribution",
                    value: "content-contribution",
                  },
                  {
                    label: "Academia Contribution",
                    value: "academia-contribution",
                  },
                  { label: "Share Your Skills", value: "share-your-skills" },
                  { label: "Resource Donation", value: "resource-donation" },
                ]}
              />
              {errors.donationCategory && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.donationCategory}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-emerald-900 ml-1 block mb-2">
                How would you like to volunteer?
              </label>
              <Textarea
                required={true}
                placeholder="Leave a brief comment here"
                value={volunteerMessage}
                onChange={(e) => setVolunteerMessage(e.target.value)}
                className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-700 bg-white"
              />
              {errors.volunteerMessage && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.volunteerMessage}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Monetary Specific Fields */}
        {isMonetaryDonation && (
          <div className="flex flex-col  gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="">
              <div className="flex flex-col gap-6 justify-between">
                <div className="flex-1">
                  <CustomSelect
                    label="Monetary Donation Category"
                    value={monetaryDonation}
                    placeholder="Project specific donation"
                    onChange={(e) => setMonetaryDonation(e.target.value)}
                    options={[
                      { label: "One-Time Donation", value: "one-time" },
                      { label: "Monthly Donation", value: "monthly" },
                      {
                        label: "Project Based Donation",
                        value: "project-based",
                      },
                      { label: "Corporate Donation", value: "corporate" },
                    ]}
                  />
                  {errors.volunteerCategory && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors.volunteerCategory}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="text-sm font-semibold text-emerald-900 ml-1 block mb-2">
                    Donation Amount
                  </label>
                  <Input
                    required={true}
                    placeholder="Enter amount (USD)"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-6 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-700 bg-white"
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors.amount}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1 items-center justify-center">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount.value}
                    onClick={() => setAmount(amount.value)}
                    className="text-xs font-semibold text-emerald-900 ml-1 p-2 border border-gray-500 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    {amount.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-10">
                <label className="text-sm font-semibold text-emerald-900 ml-1">
                  Payment Method
                </label>

                <div className="flex flex-wrap gap-2">
                  {cardLogos.map((card) => (
                    <Image
                      height={20}
                      width={50}
                      key={card.name}
                      src={card.image}
                      alt={card.name}
                      className="w-16 h-9 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setPaymentMethod(card.name)}
                    />
                  ))}
                </div>
              </div>

              <CustomSelect
                placeholder="Select a Payment Method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                options={[
                  // { label: "M-pesa", value: "mpesa" },
                  { label: "Master Card", value: "master-card" },
                  { label: "American Express", value: "american-express" },
                  { label: "Apple Pay", value: "apple-pay" },
                  { label: "Discover Card", value: "discover" },
                  { label: "Google Pay", value: "google-pay" },
                  { label: "Visa Card", value: "visa" },
                ]}
              />
              {errors.paymentMethod && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.paymentMethod}
                </p>
              )}
            </div>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isLoading || !donationType}
          className="w-full mt-4 bg-secondary-color hover:bg-secondary-color/90 text-white font-bold py-6 rounded-full shadow-lg transition-transform transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "Donate Now"}
        </Button>
      </div>
    </div>
  );
};
