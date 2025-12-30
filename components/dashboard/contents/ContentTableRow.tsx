import { IPost } from "@/app/dashboard/contents/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical } from "lucide-react";
// import { IPost } from "./ContentTable"; // adjust path if needed

interface ContentTableRowProps {
  post: IPost;
  onViewDetails: (post: IPost) => void;
}

export default function ContentTableRow({
  post,
  onViewDetails,
}: ContentTableRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors text-sm">
      <td className="py-4 px-6">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${post.coverImage}`}
          alt={post.title}
          className="w-16 h-16 object-cover rounded-md"
        />
      </td>
      <td className="py-4 px-6 font-medium text-gray-700 max-w-[260px] truncate">
        {post.title}
      </td>
      <td className="py-4 px-6 text-gray-600 capitalize">{post.category}</td>
      <td className="py-4 px-6 text-gray-600">{post.owner.name}</td>
      <td className="py-4 px-6 text-gray-600 capitalize">{post.country}</td>
      <td className="py-4 px-6 text-gray-600 capitalize">{post.region}</td>
      <td className="py-4 px-6 text-gray-600">
        {new Date(post.updatedAt).toLocaleDateString()}
      </td>
      <td className="py-4 px-6">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block min-w-[90px] text-center ${
            post.status === "approved"
              ? "bg-green-100 text-green-700"
              : post.status === "rejected"
              ? "bg-red-100 text-red-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {post.status}
        </span>
      </td>
      <td className="py-4 px-6 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-[#ecfccb] hover:bg-lime-200 text-teal-900 w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-auto">
              <MoreVertical size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => onViewDetails(post)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
