import React from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  placeholder,
  value,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full relative group">
      {label && (
        <label className="text-sm font-semibold text-green-900 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-900/20 focus:border-emerald-900 transition-all cursor-pointer ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Custom Arrow Box */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-lime-500 rounded flex items-center justify-center pointer-events-none shadow-sm">
          <ChevronDown className="w-5 h-5 text-white" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};
