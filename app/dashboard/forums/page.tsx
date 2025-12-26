"use client";
import { authFetch } from "@/lib/authFetch";
import { MoreVertical, Upload } from "lucide-react";
import { useEffect, useState } from "react";

export interface IPostOwner {
  _id: string;
  name: string;
  role: "USER" | "ADMIN" | string;
  email: string;
  image: string;
}

export interface IDiscussionPost {
  _id: string;
  title: string;
  description: string;
  owner: IPostOwner;
  category: string;
  type: "rebuilding" | string;
  refSlug: string;
  slug: string;
  status: "approved" | "pending" | "rejected" | string;
  createdAt: string;
  updatedAt: string;
}

function page() {
  const [forums, setForums] = useState<IDiscussionPost[]>([]);
  const getForums = async () => {
    const res = await authFetch("/forums", {
      method: "GET",
      auth: true,
    });
    const data = await res.json();
    setForums(data?.data);
  };
  useEffect(() => {
    getForums();
  }, []);

  console.log(forums);
  return (
    <div className="w-full">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-teal-900">
          Flagged / Pending Review
        </h1>
        <div>
          <button className="flex items-center gap-2 bg-white text-teal-900 border border-teal-900 px-5 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm">
            <Upload size={16} className="rotate-180" />
            Export
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-lime-500 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-teal-900 text-white text-left">
                <th className="py-4 px-6 font-medium text-sm">Icon</th>
                <th className="py-4 px-6 font-medium text-sm">Title</th>
                <th className="py-4 px-6 font-medium text-sm">Owner</th>
                <th className="py-4 px-6 font-medium text-sm">Type</th>
                <th className="py-4 px-6 font-medium text-sm">Status</th>
                <th className="py-4 px-6 font-medium text-sm text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {forums.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors text-sm"
                >
                  {/* Icon */}
                  <td className="py-4 px-6 font-medium text-gray-700 max-w-[280px] truncate">
                    {item.type === "introductions" ? (
                      <img src="/Icons/Introductions.png" alt="" />
                    ) : item.type === "cultural" ? (
                      <img src="/Icons/Cultural.png" alt="" />
                    ) : item.type === "rebuilding" ? (
                      <img src="/Icons/Rebuilding.png" alt="" />
                    ) : item.type === "materials" ? (
                      <img src="/Icons/Materials.png" alt="" />
                    ) : item.type === "interactive" ? (
                      <img src="/Icons/Interactive.png" alt="" />
                    ) : (
                      <img src="/Icons/Community.png" alt="" />
                    )}
                  </td>
                  {/* Title */}
                  <td className="py-4 px-6 font-medium text-gray-700 max-w-[280px] truncate">
                    {item.title}
                  </td>

                  {/* Owner */}
                  <td className="py-4 px-6 text-gray-600 flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-700">
                        {item.owner.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.owner.email}
                      </p>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-4 px-6 text-gray-600 capitalize">
                    {item.type}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block min-w-[90px] text-center ${
                        item.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status === "approved"
                        ? "Approved"
                        : item.status === "pending"
                        ? "Pending"
                        : "Rejected"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-right">
                    <button className="bg-[#ecfccb] hover:bg-lime-200 text-teal-900 w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-auto">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default page;
