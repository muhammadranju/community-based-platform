import { ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface ActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  fullWidth,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`
        bg-amber-600 hover:bg-amber-600/80 active:bg-amber-600/60 transition-colors
        text-white font-medium text-sm px-6 py-3 rounded-full
        flex items-center justify-center gap-2
        ${fullWidth ? "w-full" : "w-auto"}
      `}
    >
      {icon}
      <span>{label}</span>

      <div className="bg-emerald-900 rounded-full p-1 ml-1">
        <ChevronRight className="w-3 h-3" />
      </div>
    </Button>
  );
};

export const GlassButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className="bg-amber-600 hover:bg-amber-600/80 active:bg-amber-600/60 transition-colors text-white font-medium text-sm px-5 py-2.5 rounded-full flex items-center gap-2"
    >
      {icon}
      <span>{label}</span>
      <div className="bg-emerald-900 rounded-full p-1 ml-1">
        <ChevronRight className="w-3 h-3" />
      </div>
    </Button>
  );
};
