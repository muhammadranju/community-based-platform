import React, { useState } from "react";
// import { Input } from "./ui/Input";
// import { CustomSelect } from "./ui/CustomSelect";
// import { RadioSection } from "./ui/RadioSection";
// import { DonationCategory, VolunteerType } from "../types";
import { CreditCard, Check } from "lucide-react";
import { CustomSelect } from "./CustomSelect";
import { RadioSection } from "./RadioSection";
export interface Option {
  label: string;
  value: string;
}

export enum DonationCategory {
  MONETARY = "MONETARY",
  VOLUNTEER = "VOLUNTEER",
}

export enum VolunteerType {
  AMOUNT = "AMOUNT",
  HOW_TO = "HOW_TO",
}

export const DonationForm: React.FC = () => {
  const [category, setCategory] = useState<string>(DonationCategory.MONETARY);
  const [volType, setVolType] = useState<string>(VolunteerType.AMOUNT);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);

  // Placeholder handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your donation!");
  };

  return (
    <div className="w-full bg-[#f4fbf6] border border-green-200 rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm h-full flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="First Name" required placeholder="First Name" />
          <Input label="Last Name" required placeholder="Last Name" />
        </div>

        {/* Contact Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            required
            placeholder="Email Address"
            type="email"
          />
          <Input label="Phone Number" required placeholder="Your Address" />
          {/* Note: UI image says "Phone Number" label but placeholder says "Your Address", mimicking image exactly */}
        </div>

        {/* Country */}
        <Input label="Country" required placeholder="Country" />

        {/* Donation Type Section */}
        <div className="flex flex-col gap-3 mt-2">
          <RadioSection
            title="Choose donation type and category"
            name="donationCategory"
            selectedValue={category}
            onChange={setCategory}
            options={[
              {
                label: "Monetary Donation Category",
                value: DonationCategory.MONETARY,
              },
              {
                label: "Volunteer Category",
                value: DonationCategory.VOLUNTEER,
              },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            <CustomSelect
              value="project"
              onChange={() => {}}
              options={[
                { label: "Project specific donation", value: "project" },
              ]}
            />
            <CustomSelect
              value=""
              onChange={() => {}}
              // placeholder="Content contribution"
              className="opacity-60 bg-gray-50"
              disabled
            />
          </div>
        </div>

        {/* Donation Amount Section */}
        <div className="flex flex-col gap-3 mt-2">
          <RadioSection
            title="Choose donation amount or tell us more about how you would like to volunteer"
            name="volunteerType"
            selectedValue={volType}
            onChange={setVolType}
            options={[
              { label: "Donation Amount", value: VolunteerType.AMOUNT },
              {
                label: "How would you like to volunteer?",
                value: VolunteerType.HOW_TO,
              },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            <CustomSelect
              value="100"
              onChange={() => {}}
              options={[
                { label: "$100", value: "100" },
                { label: "$50", value: "50" },
                { label: "$200", value: "200" },
              ]}
            />
            <CustomSelect
              value=""
              onChange={() => {}}
              // placeholder="Leave a brief comment here"
              className="text-gray-500"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-green-900 ml-1">
              Payment Method
            </label>
            <div className="flex gap-1">
              {/* Simulating the payment icons strip */}
              <div className="h-5 w-8 bg-green-600 rounded flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
              </div>
              <div className="h-5 w-8 bg-blue-600 rounded flex items-center justify-center">
                <div className="w-2 h-2 rounded-sm bg-white opacity-50"></div>
              </div>
              <div className="h-5 w-8 bg-red-500 rounded flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-70 -ml-1"></div>
              </div>
              <div className="h-5 w-8 bg-blue-500 rounded flex items-center justify-center font-bold text-[8px] text-white">
                AMEX
              </div>
              <div className="h-5 w-8 bg-black rounded flex items-center justify-center text-white text-[8px]">
                Pay
              </div>
              <div className="h-5 w-8 bg-white border border-gray-300 rounded flex items-center justify-center text-[6px] font-bold text-gray-600">
                DISC
              </div>
              <div className="h-5 w-8 bg-white border border-gray-300 rounded flex items-center justify-center text-[6px] font-bold text-blue-600">
                G Pay
              </div>
              <div className="h-5 w-8 bg-white border border-gray-300 rounded flex items-center justify-center text-[6px] font-bold text-blue-800">
                VISA
              </div>
            </div>
          </div>
          <CustomSelect
            // placeholder="Select a Payment Method"
            value=""
            onChange={() => {}}
          />
        </div>

        {/* Privacy Checkbox */}
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-sm font-semibold text-green-900 ml-1">
            May we thank you publicly?
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                isAnonymous
                  ? "bg-brand-green"
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
        <button
          type="submit"
          className="w-full mt-4 bg-brand-orange hover:bg-brand-orangeHover text-white font-bold py-4 rounded-full shadow-lg transition-transform transform active:scale-[0.99]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  required,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-green-900 ml-1">
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
