import React from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioSectionProps {
  title: string;
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export const RadioSection: React.FC<RadioSectionProps> = ({
  title,
  name,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex">
        <span className="px-4 py-1.5 rounded-full border border-brand-green/30 bg-gray-100/50 text-xs font-medium text-green-900 tracking-wide uppercase sm:normal-case sm:tracking-normal">
          {title}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center w-5 h-5 rounded-full border-2 border-brand-green bg-white transition-all">
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />
                )}
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => onChange(option.value)}
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />
              </div>
              <span
                className={`text-sm font-medium transition-colors ${
                  isSelected
                    ? "text-green-900"
                    : "text-gray-600 group-hover:text-green-800"
                }`}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
