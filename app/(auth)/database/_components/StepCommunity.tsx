"use client";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { WaitingListFormData } from "./schema";

// Custom Toggle Component (Yes/No Pills)
const YesNoToggle = ({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (val: boolean) => void;
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-8 py-2 rounded-full border text-base transition-colors ${
          value === true
            ? "border-[#065f46] text-[#065f46] font-medium"
            : "border-gray-300 text-gray-500 hover:border-gray-400"
        }`}
      >
        Yes
      </button>
      <span className="text-gray-500 text-lg">or</span>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-8 py-2 rounded-full border text-base transition-colors ${
          value === false
            ? "border-[#065f46] text-[#065f46] font-medium"
            : "border-gray-300 text-gray-500 hover:border-gray-400"
        }`}
      >
        No
      </button>
    </div>
  );
};

const StepCommunity = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<WaitingListFormData>();

  return (
    <div className="space-y-8">
      <h3 className="text-primary-color text-2xl font-bold">
        Community & Availability
      </h3>

      {/* Role/Title Toggle */}
      <div className="space-y-4">
        <Label>Role/Title (Builder, Architect, Designer, Student, Other)</Label>
        <Controller
          name="isRoleTitle"
          control={control}
          render={({ field }) => (
            <YesNoToggle
              value={field.value ?? null}
              onChange={(val: boolean) => field.onChange(val)}
            />
          )}
        />
        {errors.isRoleTitle && (
          <p className="text-red-500 text-sm">{errors.isRoleTitle.message}</p>
        )}
      </div>

      {/* Availability Toggle */}
      <div className="space-y-4">
        <Label>Available for mentorship or training?</Label>
        <Controller
          name="isAvailable"
          control={control}
          render={({ field }) => (
            <YesNoToggle
              value={field.value ?? null}
              onChange={(val: boolean) => field.onChange(val)}
            />
          )}
        />
        {errors.isAvailable && (
          <p className="text-red-500 text-sm">{errors.isAvailable.message}</p>
        )}
      </div>

      {/* Checkbox */}
      <div className="flex items-start space-x-3 pt-2">
        <input
          type="checkbox"
          checked
          id="agreedToTerms"
          {...register("agreedToTerms")}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-[#d97706] focus:ring-[#d97706]"
        />
        <label
          htmlFor="agreedToTerms"
          className="text-gray-600 text-base leading-tight cursor-pointer"
        >
          I agree to be listed in the public database and contacted about
          opportunities.
        </label>
      </div>
      {errors.agreedToTerms && (
        <p className="text-red-500 text-sm">{errors.agreedToTerms.message}</p>
      )}
    </div>
  );
};

export default StepCommunity;
