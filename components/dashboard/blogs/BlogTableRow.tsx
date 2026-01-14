import { costumFormatDate } from "@/components/shared/DateTime";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Edit, Eye, MoreVertical, Trash } from "lucide-react";
import { IBlog } from "@/types/types";
import Link from "next/link";

interface BlogTableRowProps {
  blog: IBlog;
  handelDeleteBlog: (blog: IBlog) => void;
  handleEditBlog: (blog: IBlog) => void;
}

export default function BlogTableRow({
  blog,
  handelDeleteBlog,
  handleEditBlog,
}: BlogTableRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors text-sm">
      <td className="py-4 px-6">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${blog.image}`}
          alt={blog.title}
          className="w-16 h-16 object-cover rounded-md"
        />
      </td>
      <td className="py-4 px-6 font-medium text-gray-700 max-w-[260px] truncate">
        {blog.title}
      </td>
      <td className="py-4 px-6 font-medium text-gray-700 max-w-[260px] truncate">
        {blog?.author?.name || "unknown"}
      </td>
      <td className="py-4 px-6 font-medium text-gray-700 max-w-[260px] truncate capitalize">
        {blog?.category}
      </td>
      <td className="py-4 px-6 flex flex-wrap gap-2 font-medium text-gray-700 max-w-[260px] truncate capitalize">
        {blog?.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2"
          >
            {tag}
          </span>
        ))}
      </td>
      <td className="py-4 px-6 text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-gray-400" />
          {costumFormatDate(blog.createdAt)}
        </div>
      </td>
      <td className="py-4 px-6 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-[#ecfccb] hover:bg-lime-200 text-teal-900 w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-auto">
              <MoreVertical size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer">
              <Link
                href={`/blogs/${blog.slug}`}
                className="flex items-center w-full"
                target="_blank"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleEditBlog(blog)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handelDeleteBlog(blog)}
              className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
