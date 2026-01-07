import { useState } from "react";
import { countryCodeFlags } from "./CountryCodeFlags";
import { Search, X } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  phoneNumber: string;
  disabled?: boolean;
}

export const CustomInput: React.FC<InputProps> = ({
  label,
  required,
  className = "",
  error,
  disabled = false,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-emerald-900 ml-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-700 bg-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};

export const PhoneNumberInput: React.FC<PhoneInputProps> = ({
  label,
  required,
  error,
  countryCode,
  onCountryCodeChange,
  phoneNumber,
  disabled = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const countryCodes = Object.entries(countryCodeFlags).map(([code, data]) => ({
    label: `${code} ${data.country}`,
    value: code,
    flag: data.flag,
  }));

  const filteredCodes = countryCodes.filter((code) =>
    code.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCode = countryCodes.find((c) => c.value === countryCode);

  const handleSelectCode = (value: string) => {
    onCountryCodeChange(value);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-emerald-900 ml-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-2">
        {/* Country Code Button with Flag */}
        <div className="relative w-44">
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`w-full px-3 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-gray-700 bg-white text-left flex items-center justify-between ${
              disabled
                ? "opacity-50 cursor-not-allowed bg-gray-100"
                : "hover:border-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">{selectedCode?.flag}</span>
              <span className="truncate text-sm font-semibold">
                {selectedCode?.value}
              </span>
            </span>
            <span className="text-xs">▼</span>
          </button>

          {isOpen && !disabled && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {filteredCodes.length > 0 ? (
                  filteredCodes.map((code) => (
                    <button
                      key={code.value}
                      type="button"
                      onClick={() => handleSelectCode(code.value)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-emerald-50 transition-colors flex items-center gap-2 ${
                        countryCode === code.value
                          ? "bg-emerald-100 text-emerald-900 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{code.flag}</span>
                      <span>{code.label}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500 text-center">
                    No countries found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone Input */}
        <input
          disabled={disabled}
          type="tel"
          placeholder="Phone Number"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-700 bg-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};
