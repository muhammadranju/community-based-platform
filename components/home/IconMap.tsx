import React from "react";

export const EastIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path
      d="M50 10 L20 90 L80 90 Z M50 25 L65 80 L35 80 Z"
      stroke="currentColor"
      strokeWidth="5"
      fill="none"
    />
    <rect x="45" y="40" width="10" height="40" fill="currentColor" />
  </svg>
);

export const WestIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <circle
      cx="50"
      cy="50"
      r="35"
      stroke="currentColor"
      strokeWidth="8"
      fill="none"
    />
    <path d="M50 15 Q85 50 50 85 Q15 50 50 15" fill="currentColor" />
  </svg>
);

export const CentralIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 10 C30 10 10 30 10 50 C10 70 30 90 50 90 C70 90 90 70 90 50 C90 30 70 10 50 10 Z M50 20 C65 20 80 35 80 50 C80 65 65 80 50 80 C35 80 20 65 20 50 C20 35 35 20 50 20 Z" />
    <circle cx="50" cy="50" r="10" />
  </svg>
);

export const SouthIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <rect x="20" y="20" width="25" height="25" rx="5" />
    <rect x="55" y="20" width="25" height="25" rx="5" />
    <rect x="20" y="55" width="25" height="25" rx="5" />
    <rect x="55" y="55" width="25" height="25" rx="5" />
  </svg>
);

export const NorthIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <rect
      x="15"
      y="15"
      width="70"
      height="70"
      stroke="currentColor"
      strokeWidth="5"
      fill="none"
    />
    <line
      x1="15"
      y1="50"
      x2="85"
      y2="50"
      stroke="currentColor"
      strokeWidth="5"
    />
    <line
      x1="50"
      y1="15"
      x2="50"
      y2="85"
      stroke="currentColor"
      strokeWidth="5"
    />
    <rect
      x="22"
      y="22"
      width="20"
      height="20"
      fill="currentColor"
      opacity="0.5"
    />
    <rect
      x="58"
      y="58"
      width="20"
      height="20"
      fill="currentColor"
      opacity="0.5"
    />
  </svg>
);

export const GlobalIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path
      d="M20 20 L80 80 M80 20 L20 80"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <circle cx="50" cy="50" r="20" fill="currentColor" />
  </svg>
);

// Map for dynamic usage
export const IconMap: Record<string, React.FC<{ className?: string }>> = {
  East: EastIcon,
  West: WestIcon,
  Central: CentralIcon,
  South: SouthIcon,
  North: NorthIcon,
  Global: GlobalIcon,
};
