// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { authFetch } from "@/lib/authFetch";
// import { Check } from "lucide-react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { CustomSelect } from "./CustomSelect";

// export enum DonationCategory {
//   MONETARY = "MONETARY",
//   VOLUNTEER = "VOLUNTEER",
// }

// export enum VolunteerType {
//   AMOUNT = "AMOUNT",
//   HOW_TO = "HOW_TO",
// }
// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   required?: boolean;
// }

// export const DonationForm: React.FC = () => {
//   const [paymentMethod, setPaymentMethod] = useState<string>("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [country, setCountry] = useState("");
//   const [donationType, setDonationType] = useState<string>("");
//   const [donationCategory, setDonationCategory] = useState<string>("");
//   const [amount, setAmount] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   // Reset category when switching to general donation
//   useEffect(() => {
//     if (donationType === "") {
//       setDonationCategory("");
//     }
//   }, [donationType]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (paymentMethod === "mpesa") {
//       handelMPesa();
//     } else if (paymentMethod === "stripe") {
//       handelStripe();
//     }
//   };

//   const handelStripe = async () => {
//     setIsLoading(true);
//     const res = await authFetch(`/donation/create-payment-link`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         firstName,
//         lastName,
//         email,
//         phoneNumber: phone,
//         country,
//         volunteerCategory: donationType,
//         donationCategory,
//         description: message,
//         amount: amount,
//       }),
//       auth: false,
//     });

//     if (!res.ok) {
//       setIsLoading(false);
//       const text = await res.text();
//       console.error("Error:", text);
//       return;
//     }

//     const data = await res.json();
//     window.location.href = data.url; // redirect to Stripe Payment Link
//     // console.log(paymentMethod);
//     setIsLoading(false);
//   };

//   const handelMPesa = async () => {
//     setIsLoading(true);
//     // console.log(paymentMethod);
//     setIsLoading(false);
//   };

//   return (
//     <div
//       id="donation-form"
//       className="w-full bg-accent-bg border border-lime-500 rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm h-full flex flex-col"
//     >
//       <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//         {/* Name Row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Input
//             label="First Name"
//             required={true}
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//           <Input
//             label="Last Name"
//             required={true}
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </div>

//         {/* Contact Row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Input
//             label="Email"
//             required={true}
//             placeholder="Email Address"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Input
//             label="Phone Number"
//             required={true}
//             placeholder="Your Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>

//         {/* Country */}
//         <Input
//           label="Country"
//           required={true}
//           placeholder="Country"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//         />

//         {/* Donation Type Section */}
//         <div className="flex flex-col gap-3 mt-2">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
//             <div>
//               <label className="text-sm font-semibold text-emerald-900 ml-1">
//                 Monetrary Donation Type
//               </label>
//               <CustomSelect
//                 value={donationType}
//                 placeholder="Select Donation Type"
//                 onChange={(e) => setDonationType(e.target.value)}
//                 options={[
//                   { label: "One-Time Donation", value: "one-time" },
//                   { label: "Monthly Donation", value: "monthly" },
//                   { label: "Project Based Donation", value: "project-based" },
//                   { label: "Corporate Donation", value: "corporate" },
//                 ]}
//               />
//             </div>
//             <div>
//               <label className="text-sm font-semibold text-emerald-900 ml-1">
//                 Volunteer Donation Type
//               </label>
//               <CustomSelect
//                 value={donationCategory}
//                 onChange={(e) => setDonationCategory(e.target.value)}
//                 placeholder="Select Donation Type"
//                 options={[
//                   {
//                     label: "Content Contribution",
//                     value: "content-contribution",
//                   },
//                   {
//                     label: "Academia Contribution",
//                     value: "academia-contribution",
//                   },
//                   { label: "Share Your Skills", value: "share-your-skills" },
//                   { label: "Resource Donation", value: "resource-donation" },
//                 ]}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Donation Amount Section */}
//         <div className="flex flex-col gap-3 mt-2">
//           <Input
//             label="Donation Amount"
//             required={true}
//             placeholder="Enter amount (USD)"
//             type="number"
//             min="1"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />

//           {/* Predefined Amounts */}
//           <div className="flex justify-center items-center gap-2 flex-wrap">
//             <AmountButtons setAmount={setAmount} />
//           </div>
//         </div>
//         {/* Comment/Message Section */}
//         <div className="flex flex-col gap-1.5 w-full mt-2">
//           <label className="text-sm font-semibold text-emerald-900 ml-1">
//             Message (Optional)
//           </label>
//           <Textarea
//             placeholder="Leave a brief comment here"
//             className="text-gray-700 min-h-[100px] bg-white"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </div>

//         {/* Payment Method */}
//         <div className="flex flex-col gap-2 mt-2">
//           <div className="flex justify-between items-center">
//             <label className="text-sm font-semibold text-emerald-900 ml-1">
//               Payment Method
//             </label>
//             <div className="flex gap-1">
//               <Image
//                 src="/bg/payment-methods.png"
//                 alt="Payment Methods"
//                 width={300} // Adjusted width to be more reasonable
//                 height={50}
//                 className="object-contain h-8 w-auto" // Added classes to control size
//               />
//             </div>
//           </div>
//           <CustomSelect
//             placeholder="Select a Payment Method"
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//             options={[
//               { label: "M-pesa", value: "mpesa" },
//               { label: "Stripe", value: "stripe" },
//             ]}
//           />
//         </div>

//         {/* Privacy Checkbox */}
//         <div className="flex flex-col gap-2 mt-2 sr-only">
//           <label className="text-sm font-bold text-emerald-900 ml-1">
//             May we thank you publicly?
//           </label>
//           <label className="flex items-center gap-3 cursor-pointer group">
//             <span
//               className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
//                 isAnonymous
//                   ? "bg-emerald-900"
//                   : "bg-white border-2 border-gray-300"
//               }`}
//               onClick={(e) => {
//                 e.preventDefault();
//                 setIsAnonymous(!isAnonymous);
//               }}
//             >
//               {isAnonymous && (
//                 <Check className="w-4 h-4 text-white" strokeWidth={3} />
//               )}
//             </span>
//             <span className="text-gray-600 text-sm font-medium">
//               No, Please keep my identity anonymous.
//             </span>
//           </label>
//         </div>

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="w-full mt-4 bg-secondary-color hover:bg-secondary-color/90 text-white font-bold py-6  rounded-full shadow-lg transition-transform transform active:scale-[0.99]"
//         >
//           {isLoading ? "Processing..." : "Donate Now"}
//         </Button>
//       </form>
//     </div>
//   );
// };

// const Input: React.FC<InputProps> = ({
//   label,
//   required,
//   className = "",
//   ...props
// }) => {
//   return (
//     <div className="flex flex-col gap-1.5 w-full">
//       <label className="text-sm font-semibold text-emerald-900 ml-1">
//         {label}
//         {required && "*"}
//       </label>
//       <input
//         className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-700 bg-white ${className}`}
//         {...props}
//       />
//     </div>
//   );
// };

// const AmountButtons = ({
//   setAmount,
// }: {
//   setAmount: (amount: string) => void;
// }) => {
//   const amounts = [100, 500, 600, 800, 1000, 1200, 1500];

//   return (
//     <>
//       {amounts.map((amt) => {
//         return (
//           <button
//             key={amt}
//             type="button" // Prevent form submission
//             onClick={() => {
//               setAmount(amt.toString());
//             }}
//             className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
//           >
//             {amt}$
//           </button>
//         );
//       })}
//     </>
//   );
// };

"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { authFetch } from "@/lib/authFetch";
import { Check } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CustomSelect } from "./CustomSelect";
import { z } from "zod";

const donationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  volunteerCategory: z
    .string()
    .min(1, { message: "Please select a monetary donation type" }),
  donationCategory: z.string().optional(),
  description: z.string().optional(),
  amount: z.number().gte(1, { message: "Amount must be at least 1 USD" }),
});

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export const DonationForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [donationType, setDonationType] = useState<string>("");
  const [donationCategory, setDonationCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Reset category when switching to general donation
  useEffect(() => {
    if (donationType === "") {
      setDonationCategory("");
    }
  }, [donationType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic checks before Zod
    if (!paymentMethod) {
      setErrors({ paymentMethod: "Payment method is required" });
      return;
    }

    const amountNum = Number(amount);
    if (amount === "" || isNaN(amountNum) || amountNum <= 0) {
      setErrors({ amount: "Please enter a valid amount greater than 0" });
      return;
    }

    // Prepare data (trim strings)
    const formData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNumber: phone.trim(),
      country: country.trim(),
      volunteerCategory: donationType,
      donationCategory: donationCategory,
      description: message.trim(),
      amount: amountNum,
    };

    // Zod validation
    const result = donationSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path && typeof path === "string") {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Validation passed
    setIsLoading(true);

    try {
      if (paymentMethod === "mpesa") {
        // Placeholder for M-Pesa (currently empty in original code)
        alert("M-Pesa payment processing not implemented yet.");
      } else if (paymentMethod === "stripe") {
        const res = await authFetch(`/donation/create-payment-link`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            country: formData.country,
            volunteerCategory: formData.volunteerCategory,
            donationCategory: formData.donationCategory || "",
            description: formData.description || "",
            amount: formData.amount,
          }),
          auth: false,
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Error:", text);
          alert("Failed to create payment link. Please try again.");
          return;
        }

        const data = await res.json();
        window.location.href = data.url; // Redirect to Stripe
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="donation-form"
      className="w-full bg-accent-bg border border-lime-500 rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm h-full flex flex-col"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            required={true}
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
          />
          <Input
            label="Last Name"
            required={true}
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
          />
        </div>

        {/* Contact Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            required={true}
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            label="Phone Number"
            required={true}
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phoneNumber}
          />
        </div>

        {/* Country */}
        <Input
          label="Country"
          required={true}
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          error={errors.country}
        />

        {/* Donation Type Section */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            <div>
              <label className="text-sm font-semibold text-emerald-900 ml-1">
                Monetary Donation Type *
              </label>
              <CustomSelect
                value={donationType}
                placeholder="Select Donation Type"
                onChange={(e) => setDonationType(e.target.value)}
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
              <label className="text-sm font-semibold text-emerald-900 ml-1">
                Volunteer Donation Type
              </label>
              <CustomSelect
                value={donationCategory}
                onChange={(e) => setDonationCategory(e.target.value)}
                placeholder="Select Donation Type"
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
            </div>
          </div>
        </div>

        {/* Donation Amount Section */}
        <div className="flex flex-col gap-3 mt-2">
          <Input
            label="Donation Amount"
            required={true}
            placeholder="Enter amount (USD)"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={errors.amount}
          />

          {/* Predefined Amounts */}
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <AmountButtons setAmount={setAmount} />
          </div>
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
              Payment Method *
            </label>
            <div className="flex gap-1">
              <Image
                src="/bg/payment-methods.png"
                alt="Payment Methods"
                width={300}
                height={50}
                className="object-contain h-8 w-auto"
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
          {errors.paymentMethod && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.paymentMethod}
            </p>
          )}
        </div>

        {/* Privacy Checkbox */}
        <div className="flex flex-col gap-2 mt-2 sr-only">
          <label className="text-sm font-bold text-emerald-900 ml-1">
            May we thank you publicly?
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <span
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
            </span>
            <span className="text-gray-600 text-sm font-medium">
              No, Please keep my identity anonymous.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-secondary-color hover:bg-secondary-color/90 text-white font-bold py-6 rounded-full shadow-lg transition-transform transform active:scale-[0.99]"
        >
          {isLoading ? "Processing..." : "Donate Now"}
        </Button>
      </form>
    </div>
  );
};

const Input: React.FC<InputProps> = ({
  label,
  required,
  className = "",
  error,
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
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};

const AmountButtons = ({
  setAmount,
}: {
  setAmount: (amount: string) => void;
}) => {
  const amounts = [100, 500, 600, 800, 1000, 1200, 1500];

  return (
    <>
      {amounts.map((amt) => {
        return (
          <button
            key={amt}
            type="button"
            onClick={() => {
              setAmount(amt.toString());
            }}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            {amt}$
          </button>
        );
      })}
    </>
  );
};
