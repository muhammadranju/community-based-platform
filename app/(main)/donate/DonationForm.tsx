"use client";

import {
  countryCodeFlags,
  phonePatterns,
} from "@/components/shared/CountryCodeFlags";
import { CustomInput, PhoneNumberInput } from "@/components/shared/CustomInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { CustomSelect } from "./CustomSelect";
import { toast } from "sonner";
import { authFetch } from "@/lib/authFetch";

export const DonationForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [country, setCountry] = useState("");
  const [donationType, setDonationType] = useState<string>("");
  const [donationCategory, setDonationCategory] = useState<string>("");
  const [monetaryDonation, setMonetaryDonation] = useState<string>("one-time");

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

  // Auto-detect country code from phone number
  const handlePhoneChange = (value: string) => {
    setPhone(value);

    // Check if the input starts with + and extract code
    if (value.startsWith("+")) {
      const codeMatch = value.match(/^\+\d{1,3}/);
      if (codeMatch) {
        const potentialCode = codeMatch[0];
        if (countryCodeFlags[potentialCode]) {
          setCountryCode(potentialCode);
        }
      }
    } else {
      // Try to detect from the number pattern
      for (const pattern of phonePatterns) {
        if (pattern.pattern.test(value)) {
          setCountryCode(pattern.code);
          break;
        }
      }
    }
  };

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
      if (!phone.trim()) {
        newErrors.phoneNumber = "Phone number is required";
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
      } else if (isMonetaryDonation && paymentMethod === "stripe") {
        const res = await authFetch(`/donation/create-payment-link`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim() || "N/A",
            lastName: lastName.trim() || "N/A",
            email: email.trim() || "",
            phoneNumber: countryCode + phone.trim() || "N/A",
            country: country.trim() || "N/A",
            volunteerCategory: monetaryDonation || "N/A",
            donationCategory: monetaryDonation || "N/A",
            description: message.trim() || "N/A",
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
            firstName: firstName.trim() || "N/A",
            lastName: lastName.trim() || "N/A",
            email: email.trim() || "",
            phoneNumber: countryCode + phone.trim() || "N/A",
            country: country.trim() || "N/A",
            volunteerCategory: donationType || "N/A",
            donationCategory: donationCategory || "N/A",
            paymentStatus: "unpaid",
            description: message.trim() || "N/A",
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            label="First Name"
            required={true}
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
            disabled={contactInfoDisabled}
          />
          <CustomInput
            label="Last Name"
            required={true}
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
            disabled={contactInfoDisabled}
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
            disabled={contactInfoDisabled}
          />
          <PhoneNumberInput
            label="Phone Number"
            required={true}
            placeholder="eg. +254712345678"
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
            phoneNumber={phone}
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            error={errors.phoneNumber}
            disabled={contactInfoDisabled}
          />
        </div>

        <CustomInput
          label="Country"
          required={true}
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          error={errors.country}
          disabled={contactInfoDisabled}
        />

        <div className="flex flex-col gap-3 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="radio"
                  id="monetary-radio"
                  name="donation-type"
                  checked={isMonetaryDonation}
                  onChange={() => {
                    setDonationType("one-time");
                    setDonationCategory("");
                  }}
                  className="w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="monetary-radio"
                  className="text-sm font-semibold text-emerald-900 cursor-pointer"
                >
                  Monetary Donation Category
                </label>
              </div>
              <CustomSelect
                value={monetaryDonation}
                placeholder="Project specific donation"
                onChange={(e) => setMonetaryDonation(e.target.value)}
                disabled={!isMonetaryDonation}
                options={[
                  { label: "One-Time Donation", value: "one-time" },
                  { label: "Monthly Donation", value: "monthly" },
                  { label: "Project Based Donation", value: "project-based" },
                  { label: "Corporate Donation", value: "corporate" },
                ]}
              />
              {errors.volunteerCategory && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.volunteerCategory}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
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
                  className="w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="volunteer-radio"
                  className="text-sm font-semibold text-emerald-900 cursor-pointer"
                >
                  Volunteer Category
                </label>
              </div>
              <CustomSelect
                value={donationCategory}
                onChange={(e) => setDonationCategory(e.target.value)}
                placeholder="Content contribution"
                disabled={!isVolunteerDonation}
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
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            <div>
              <label className="text-sm font-semibold text-emerald-900 ml-1 block mb-2">
                Donation Amount
              </label>
              <Input
                required={isMonetaryDonation}
                placeholder="Enter amount (USD)"
                type="number"
                min="1"
                disabled={!isMonetaryDonation}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full px-4 py-6 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-700 bg-white ${
                  !isMonetaryDonation
                    ? "opacity-50 cursor-not-allowed bg-gray-100"
                    : ""
                }`}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.amount}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-emerald-900 ml-1 block mb-2">
                How would you like to volunteer?
              </label>
              <Input
                required={isVolunteerDonation}
                placeholder="Leave a brief comment here"
                type="text"
                disabled={!isVolunteerDonation}
                value={volunteerMessage}
                onChange={(e) => setVolunteerMessage(e.target.value)}
                className={`w-full px-4 py-6 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-700 bg-white ${
                  !isVolunteerDonation
                    ? "opacity-50 cursor-not-allowed bg-gray-100"
                    : ""
                }`}
              />
              {errors.volunteerMessage && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.volunteerMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full mt-2 hidden">
          <label className="text-sm font-semibold text-emerald-900 ml-1">
            Message (Optional)
          </label>
          <Textarea
            placeholder="Leave a brief comment here"
            className={`text-gray-700 min-h-[100px] bg-white ${
              !isMonetaryDonation
                ? "opacity-50 cursor-not-allowed bg-gray-100"
                : ""
            }`}
            value={message}
            onChange={(e) => isMonetaryDonation && setMessage(e.target.value)}
            disabled={!isMonetaryDonation}
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <label className="text-sm font-semibold text-emerald-900 ml-1">
            Payment Method
          </label>
          <CustomSelect
            placeholder="Select a Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            disabled={!isMonetaryDonation}
            options={[
              { label: "M-pesa", value: "mpesa" },
              { label: "Stripe", value: "stripe" },
            ]}
          />
          {errors.paymentMethod && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.paymentMethod}
            </p>
          )}
        </div>

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
