"use client";
import React, { useEffect, useState } from "react";
import { Filter, Upload, MoreVertical, Check, X } from "lucide-react";
import { WAITING_LIST_ITEMS } from "@/components/dashboard/constants";
import { authFetch } from "@/lib/authFetch";

export interface IWaitingList {
  _id: string;
  name: string;
  role: "builder" | string;
  email: string;
  image: string;
  website: string;
  country: string;
  expertise: string;
  experience: string;
  about: string;
  bio: string;
  status: "active" | "inactive" | string;
  available: boolean;
  verified?: boolean;
  isRoleTitle: boolean;
  agreedToTerms: boolean;
  uploads?: string[];
}

export const DashboardWaitingList: React.FC = () => {
  const [waitingList, setWaitingList] = useState<IWaitingList[]>([]);
  const getWaitingList = async () => {
    const res = await authFetch("/waiting-list", {
      method: "GET",
      auth: true,
    });
    const data = await res.json();
    setWaitingList(data?.data);
  };
  useEffect(() => {
    getWaitingList();
  }, []);

  console.log(waitingList);
  return (
    <div className="w-full">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-teal-900">Waiting list</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-950 transition-colors text-sm shadow-sm">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-white text-teal-900 border border-teal-900 px-5 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm">
            <Upload size={16} className="rotate-180" />
            Export
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-lime-500 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-teal-900 text-white text-left">
                <th className="py-4 px-6 font-medium text-sm">Image</th>
                <th className="py-4 px-6 font-medium text-sm">Name</th>
                <th className="py-4 px-6 font-medium text-sm">Email</th>
                <th className="py-4 px-6 font-medium text-sm">Website</th>
                <th className="py-4 px-6 font-medium text-sm">Country</th>
                <th className="py-4 px-6 font-medium text-sm">Expertise</th>
                <th className="py-4 px-6 font-medium text-sm">Experience</th>
                <th className="py-4 px-6 font-medium text-sm">About</th>
                <th className="py-4 px-6 font-medium text-sm">Bio</th>
                <th className="py-4 px-6 font-medium text-sm">Role</th>
                <th className="py-4 px-6 font-medium text-sm">Status</th>
                <th className="py-4 px-6 font-medium text-sm text-center">
                  Available
                </th>

                <th className="py-4 px-6 font-medium text-sm text-right">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {waitingList.map((item, idx) => (
                <tr
                  key={`${item._id}-${idx}`}
                  className="hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  {/* Image */}
                  <td className="py-4 px-6">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>

                  {/* Name */}
                  <td className="py-4 px-6">{item.name}</td>

                  {/* Email */}
                  <td className="py-4 px-6">{item.email}</td>

                  {/* Website */}
                  <td className="py-4 px-6">
                    {item.website ? (
                      <a
                        href={item.website}
                        target="_blank"
                        className="text-teal-700 hover:underline"
                      >
                        Visit
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Country */}
                  <td className="py-4 px-6">{item.country}</td>

                  {/* Expertise */}
                  <td className="py-4 px-6">{item.expertise}</td>

                  {/* Experience */}
                  <td className="py-4 px-6">{item.experience}</td>

                  {/* About */}
                  <td className="py-4 px-6 truncate max-w-[200px]">
                    {item.about}
                  </td>

                  {/* Bio */}
                  <td className="py-4 px-6">
                    {item.bio.length > 50
                      ? `${item.bio.substring(0, 50)}...`
                      : item.bio}
                  </td>

                  {/* Role */}
                  <td className="py-4 px-6 capitalize">{item.role}</td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Available */}
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.available ? "Available" : "Not Available"}
                    </span>
                  </td>

                  {/* Manage */}
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

      {/* Footer Action */}
      <div className="flex justify-end mt-6">
        <button className="bg-[#d97706] hover:bg-[#b45309] text-white px-8 py-3 rounded-full font-semibold shadow-md transition-colors text-sm">
          See More
        </button>
      </div>
    </div>
  );
};
