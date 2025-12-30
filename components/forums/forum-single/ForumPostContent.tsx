import CustomBadge from "@/components/shared/SharedBadge";
import ForumAuthorCard from "./ForumAuthorCard";
import DOMPurify from "dompurify";

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
        <div
          className="prose max-w-none prose-headings:mb-4 prose-p:mb-3 prose-ul:my-4 prose-li:my-1 prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-600 prose-a:text-emerald-700 hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
      </div>
    </div>
  );
}
