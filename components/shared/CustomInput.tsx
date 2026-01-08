import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

interface PhoneInputProps {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
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
  value,
  onChange,
  disabled = false,
}) => {
  const handleChange = (val: string | undefined) => {
    // Heuristic: If detecting a US number (+1) starting with 01[3-9], switch to Bangladesh (+880)
    // +1 is the default fallback often. "017" parsed by US logic often results in +1017... or similar.
    // We check if the raw value implies a BD local number.
    if (val && val.startsWith("+101")) {
      const localPart = val.substring(2); // Remove '+1'
      // Check for BD mobile prefixes (013-019)
      if (/^01[3-9]/.test(localPart)) {
        // Auto-switch to BD (+880)
        // Remove the leading '0' from local part for E.164 (BD is +880 1xxx)
        // localPart is "017..." -> we want "880" + "17..."
        // So: +880 + localPart.substring(1)
        const corrected = "+880" + localPart.substring(1);
        onChange(corrected);
        return;
      }
    }
    onChange(val || "");
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-emerald-900 ml-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className={disabled ? "opacity-50 pointer-events-none" : ""}>
        <PhoneInput
          placeholder="Phone Number"
          value={value}
          onChange={handleChange}
          defaultCountry="US"
          disabled={disabled}
          className="flex gap-2 [&_.PhoneInputCountry]:mr-0 [&_.PhoneInputCountry]:border [&_.PhoneInputCountry]:border-gray-200 [&_.PhoneInputCountry]:rounded-lg [&_.PhoneInputCountry]:px-3 [&_.PhoneInputCountry]:bg-white [&_.PhoneInputInput]:w-full [&_.PhoneInputInput]:px-4 [&_.PhoneInputInput]:py-3 [&_.PhoneInputInput]:rounded-lg [&_.PhoneInputInput]:border [&_.PhoneInputInput]:border-gray-200 [&_.PhoneInputInput]:focus:outline-none [&_.PhoneInputInput]:focus:ring-2 [&_.PhoneInputInput]:focus:ring-brand-green/20 [&_.PhoneInputInput]:focus:border-brand-green [&_.PhoneInputInput]:transition-all [&_.PhoneInputInput]:placeholder:text-gray-400 [&_.PhoneInputInput]:text-gray-700 [&_.PhoneInputInput]:bg-white"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};
