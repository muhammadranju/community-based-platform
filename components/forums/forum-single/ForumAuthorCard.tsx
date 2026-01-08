import { costumFormatDate } from "@/components/shared/DateTime"; // fix typo if needed: customFormatDate

interface ForumAuthorCardProps {
  author: {
    name: string;
    image?: string;
    createdAt?: string;
  };
}

export default function ForumAuthorCard({ author }: ForumAuthorCardProps) {
  return (
    <div className="shrink-0 bg-white border border-green-600 rounded-lg p-3 w-full sm:w-40 flex flex-col items-center text-center shadow-sm">
      <div className="relative w-16 h-16 mb-2">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${
            author?.image || "/default-avatar.png"
          }`}
          alt={author?.name || "User"}
          className="w-full h-full object-cover rounded-full border-2 border-orange-200"
          onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      </div>
      <div className="text-xs font-bold text-gray-800 truncate w-full">
        {author?.name || "Anonymous"}
      </div>
      <div className="text-[10px] text-gray-500 font-medium mt-0.5">
        {author?.createdAt ? costumFormatDate(author.createdAt) : "Member"}
      </div>
    </div>
  );
}
