import CustomBadge from "@/components/shared/SharedBadge";
import ForumAuthorCard from "./ForumAuthorCard";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface ForumPostContentProps {
  forumData: any;
}

export default function ForumPostContent({ forumData }: ForumPostContentProps) {
  const cleanHTML = DOMPurify.sanitize(forumData?.description || "", {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "h1",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "a",
    ],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });

  return (
    <div className="border border-green-600/30 rounded-4xl overflow-hidden shadow-sm bg-white">
      {/* Light Green Header */}
      <div className="bg-[#efffd6] p-4 sm:p-8 md:p-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <ForumAuthorCard author={forumData?.owner} />
          <div className="flex-1 space-y-3 sm:space-y-4">
            <CustomBadge>
              GENERAL DISCUSSION ON AFRICAN INDIGENOUS ARCHITECTURE
            </CustomBadge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#064E3B] leading-tight">
              {forumData?.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-10 md:px-12 md:py-10">
        <p className="prose prose-lg md:prose-2xl prose-headings:text-emerald-900 prose-p:text-gray-600 prose-a:text-orange-600 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:p-4 prose-blockquote:not-italic prose-blockquote:rounded-lg prose-img:rounded-2xl prose-strong:text-emerald-800 max-w-full wrap-break-word">
          {parse(forumData?.description)}
        </p>
      </div>
    </div>
  );
}
