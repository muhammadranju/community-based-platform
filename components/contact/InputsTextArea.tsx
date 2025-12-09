import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.FC<IconProps>;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.FC<IconProps>;
}

export const CustomInput: React.FC<InputProps> = ({
  label,
  icon: Icon,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-primary-color text-sm font-medium mb-2 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-color">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`w-full bg-white text-primary-color rounded-full py-3.5  ${
            Icon ? "pl-12 pr-6" : "px-6"
          } placeholder:text-primary-color focus:outline-none focus:ring-2 focus:ring-teal-600/20 transition-all shadow-sm ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

export const CustomTextarea: React.FC<TextareaProps> = ({
  label,
  icon: Icon,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-primary-color text-sm font-medium mb-2 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-5 top-5 text-primary-color">
            <Icon size={18} />
          </div>
        )}
        <textarea
          className={`w-full bg-white rounded-3xl py-4 ${
            Icon ? "pl-12 pr-6" : "px-6"
          } text-primary-color placeholder:text-primary-color focus:outline-none focus:ring-2 focus:ring-teal-600/20 transition-all shadow-sm min-h-[160px] resize-none ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
