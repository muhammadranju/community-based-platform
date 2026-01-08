import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import ForumActionButton from "./ForumActionButton";
import { Heart, Share2, ThumbsDown, ThumbsUp } from "lucide-react";

interface ForumDetailHeaderProps {
  onBack: () => void;
}

export default function ForumDetailHeader({ onBack }: ForumDetailHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 mb-2">
      <div className="flex items-center gap-3">
        <Button
          onClick={onBack}
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-color text-white hover:bg-green-900 transition-colors shadow-sm"
        >
          <ChevronLeft size={20} />
        </Button>
        <h1 className="text-lg sm:text-xl font-bold text-[#064E3B] tracking-tight">
          Ask a question/Start a New Discussion
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
        <ForumActionButton icon={ThumbsUp} label="Like" />
        <ForumActionButton icon={ThumbsDown} label="Dislike" />
        <ForumActionButton icon={Heart} label="Save" />
        <ForumActionButton icon={Share2} label="Share" />
      </div>
    </header>
  );
}
