import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

interface GoogleSignInButtonProps {
  onClick: () => void;
}

export default function GoogleSignInButton({
  onClick,
}: GoogleSignInButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="outline"
      className="
        w-full h-12
        flex items-center justify-center gap-3
        border border-gray-300
        bg-white text-gray-700 font-medium
        rounded-lg shadow-sm
        transition-all duration-200
        hover:bg-gray-100 hover:shadow-md hover:scale-[1.01]
        active:scale-[0.98]
      "
    >
      <FcGoogle className="w-5 h-5" />
      <span>Continue with Google</span>
    </Button>
  );
}
