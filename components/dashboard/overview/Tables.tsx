import React from "react";
import { MoreVertical } from "lucide-react";
import { RECENT_UPLOADS, NEWEST_MEMBERS } from "../constants";

export const RecentUploadsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-lime-500/30 overflow-hidden mb-8">
      <div className="p-6 pb-4">
        <h3 className="text-primary-color text-lg font-bold">Latest Upload</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-primary-color text-white text-left text-sm">
              <th className="py-3 px-6 font-medium rounded-tl-lg">Title</th>
              <th className="py-3 px-6 font-medium">Type</th>
              <th className="py-3 px-6 font-medium">Owner</th>
              <th className="py-3 px-6 font-medium">Status</th>
              <th className="py-3 px-6 font-medium text-right rounded-tr-lg">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {RECENT_UPLOADS.map((item) => (
              <tr
                key={item.id}
                className="text-sm hover:bg-gray-50 transition-colors text-gray-600"
              >
                <td className="py-4 px-6 font-medium text-gray-800">
                  {item.title}
                </td>
                <td className="py-4 px-6">{item.type}</td>
                <td className="py-4 px-6">{item.owner}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-block min-w-[80px] text-center
                    ${
                      item.status === "Approved"
                        ? "bg-[#dcfce7] text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }
                  `}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-gray-400 hover:text-primary-color p-1 rounded-full hover:bg-gray-100">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const NewestMembersTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-lime-500/30 overflow-hidden">
      <div className="p-6 pb-4">
        <h3 className="text-primary-color text-lg font-bold">Newest Members</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-primary-color text-white text-left text-sm">
              <th className="py-3 px-6 font-medium rounded-tl-lg">Name</th>
              <th className="py-3 px-6 font-medium">Role</th>
              <th className="py-3 px-6 font-medium">Country</th>
              <th className="py-3 px-6 font-medium">Uploads</th>
              <th className="py-3 px-6 font-medium text-right rounded-tr-lg">
                Manage
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {NEWEST_MEMBERS.map((member) => (
              <tr
                key={member.id}
                className="text-sm hover:bg-gray-50 transition-colors text-gray-600"
              >
                <td className="py-4 px-6 font-medium text-gray-800">
                  {member.name}
                </td>
                <td className="py-4 px-6">{member.role}</td>
                <td className="py-4 px-6">{member.country}</td>
                <td className="py-4 px-6">{member.uploads}</td>
                <td className="py-4 px-6 text-right">
                  <button className="text-primary-color bg-teal-50 hover:bg-teal-100 p-1.5 rounded-full transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
