import { IDiscussionPost } from "@/app/dashboard/forums/page";
import { MoreVertical } from "lucide-react";

const getIconSrc = (type: string) => {
  const iconMap: Record<string, string> = {
    introductions: "/Icons/Introductions.png",
    cultural: "/Icons/Cultural.png",
    rebuilding: "/Icons/Rebuilding.png",
    materials: "/Icons/Materials.png",
    interactive: "/Icons/Interactive.png",
  };
  return iconMap[type] || "/Icons/Community.png";
};

interface ForumTableRowProps {
  post: IDiscussionPost;
  onViewDetails: (post: IDiscussionPost) => void;
}

export default function ForumTableRow({
  post,
  onViewDetails,
}: ForumTableRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors text-sm">
      <td className="py-4 px-6">
        <img
          src={getIconSrc(post.type)}
          alt={post.type}
          className="w-8 h-8 object-contain"
        />
      </td>
      <td className="py-4 px-6 font-medium text-gray-700 max-w-[280px] truncate">
        {post.title}
      </td>
      <td className="py-4 px-6 text-gray-600">
        <div>
          <p className="font-medium text-gray-700">{post.owner.name}</p>
          <p className="text-xs text-gray-500">{post.owner.email}</p>
        </div>
      </td>
      <td className="py-4 px-6 text-gray-600 capitalize">{post.type}</td>
      <td className="py-4 px-6">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block min-w-[90px] text-center ${
            post.status === "approved"
              ? "bg-green-100 text-green-700"
              : post.status === "pending"
              ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
        </span>
      </td>
      <td className="py-4 px-6 text-right">
        <button
          onClick={() => onViewDetails(post)}
          className="bg-[#ecfccb] hover:bg-lime-200 text-teal-900 w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-auto"
        >
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}
