import { IPost } from "@/app/dashboard/contents/page";
import { IUser } from "@/app/dashboard/users/page";
import { authFetch } from "@/lib/authFetch";
import React, { useEffect, useState } from "react";

export const RecentUploadsTable: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const getPosts = async () => {
    const res = await authFetch("/contents/all-contents?limit=4", {
      method: "GET",
      auth: true,
    });
    const data = await res.json();
    setPosts(data?.data);
  };
  useEffect(() => {
    getPosts();
  }, []);

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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((item) => (
              <tr
                key={item._id}
                className="text-sm hover:bg-gray-50 transition-colors text-gray-600"
              >
                <td className="py-4 px-6 font-medium text-gray-800">
                  {item.title}
                </td>
                <td className="py-4 px-6 capitalize">{item.category}</td>
                <td className="py-4 px-6">{item.owner.name}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-block min-w-[80px] text-center
                    ${
                      item.status === "approved"
                        ? "bg-[#dcfce7] text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }
                  `}
                  >
                    {item.status === "approved" ? "Approved" : "Pending"}
                  </span>
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
  const [users, setUsers] = useState<IUser[]>([]);
  const getUsers = async () => {
    const res = await authFetch("/user/all-users", {
      method: "GET",
      auth: true,
    });
    const data = await res.json();
    setUsers(data?.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
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
              <th className="py-3 px-6 font-medium">Website</th>
              <th className="py-3 px-6 font-medium">Uploads</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users?.slice(1, 5).map((member) => (
              <tr
                key={member._id}
                className="text-sm hover:bg-gray-50 transition-colors text-gray-600"
              >
                <td className="py-4 px-6 font-medium text-gray-800">
                  {member.name}
                </td>
                <td className="py-4 px-6">
                  {member.role === "SUPER_ADMIN" ? "Admin" : "Member"}
                </td>
                <td className="py-4 px-6">{member.website || "N/A"}</td>
                <td className="py-4 px-6">{member.uploads.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
