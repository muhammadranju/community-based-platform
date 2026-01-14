import Link from "next/link";
import { Upload } from "lucide-react";

export default function BlogTableHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 className="text-3xl font-bold text-teal-900">Blogs</h1>

      <div className="flex gap-3">
        <Link
          href={"/dashboard/blogs/add-blog"}
          className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-950 transition-colors text-sm cursor-pointer"
        >
          <Upload size={16} />
          Add Blog
        </Link>
      </div>
    </div>
  );
}
