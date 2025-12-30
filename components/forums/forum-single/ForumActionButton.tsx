import { LucideIcon } from "lucide-react";

interface ForumActionButtonProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function ForumActionButton({
  icon: Icon,
  label,
  active = false,
  onClick,
}: ForumActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
        active
          ? "text-green-700 bg-green-50 font-medium"
          : "text-gray-600 hover:text-green-800 hover:bg-gray-50"
      }`}
    >
      <div className="bg-emerald-900 rounded-full p-2">
        <Icon size={18} className="text-white" />
      </div>
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </button>
  );
}
