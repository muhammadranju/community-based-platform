"use client";
import getUser from "@/components/shared/UserInfo";

const page = () => {
  const user = getUser();

  console.log(user);

  return (
    <div className="w-full ">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-teal-900 mb-1">My Profile</h1>
        <p className="text-gray-500 text-sm">Update your public information.</p>
      </div>

      {/* Main Content Card */}
      <div className="bg-[#e4ede4] rounded-3xl p-6 sm:p-10 shadow-sm">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <div className="relative shrink-0">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${user?.image}`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200/50 shadow-sm"
            />
          </div>
          <div className="text-center sm:text-left mt-2">
            <h2 className="text-2xl font-bold text-teal-900 mb-1">
              {user?.name}
            </h2>
            <p className="text-gray-600 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-gray-600 text-sm block">Fill Name</label>
              <input
                type="text"
                defaultValue={user?.name || "N/A"}
                className="w-full px-4 py-3.5 rounded-xl bg-white text-teal-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/10 shadow-sm"
              />
            </div>

            {/* Website / Social Links */}
            <div className="space-y-2">
              <label className="text-gray-600 text-sm block">
                Website / Social Links
              </label>
              <input
                type="text"
                defaultValue={user?.website || "N/A"}
                className="w-full px-4 py-3.5 rounded-xl bg-white text-teal-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/10 shadow-sm"
              />
            </div>
          </div>

          {/* Short Bio */}
          <div className="space-y-2">
            <label className="text-gray-600 text-sm block">Short Bio</label>
            <textarea
              rows={6}
              defaultValue={user?.bio || "N/A"}
              className="w-full px-4 py-3.5 rounded-xl bg-white text-teal-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/10 resize-none shadow-sm"
            ></textarea>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button className="bg-[#d97706] hover:bg-[#b45309] text-white px-8 py-3.5 rounded-full font-medium text-sm transition-colors shadow-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
export default page;
