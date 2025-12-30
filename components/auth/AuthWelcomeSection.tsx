import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface AuthWelcomeSectionProps {
  title: string;
  badgeText?: string;
  linkText: string;
  linkHref: string;
}

export default function AuthWelcomeSection({
  title,
  badgeText = "welcome back to the village",
  linkText,
  linkHref,
}: AuthWelcomeSectionProps) {
  return (
    <>
      <Badge className="bg-lime-500 text-white px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wider uppercase inline-block shadow-sm">
        {badgeText}
      </Badge>
      <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-2 tracking-tight">
        {title}
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Don't have an account?{" "}
        <Link
          href={linkHref}
          className="text-[#1a5d1a] font-bold hover:underline decoration-2 underline-offset-2"
        >
          {linkText}
        </Link>
      </p>
    </>
  );
}
