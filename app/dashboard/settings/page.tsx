import { Trash2, Upload } from "lucide-react";

function page() {
  return (
    <div className="w-full h-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-teal-900 mb-1">
          Account Settings
        </h1>
        <p className="text-gray-500 text-sm">Security and Privacy Control</p>
      </div>

      {/* Main Content Card */}
      <div className="bg-[#e4ede4] rounded-3xl p-6 sm:p-10 shadow-sm min-h-[500px]">
        {/* Change Password Section */}
        <div className="mb-10">
          <label className="text-gray-600 text-sm block mb-2">
            Change Password
          </label>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <input
              type="text"
              placeholder="New Password"
              className="flex-1 w-full md:max-w-md px-4 py-3.5 rounded-xl bg-white text-teal-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/10 shadow-sm placeholder-teal-900"
            />
            <button className="bg-[#d97706] hover:bg-[#b45309] text-white px-8 py-3.5 rounded-full font-medium text-sm transition-colors shadow-md min-w-[100px]">
              Update
            </button>

            <div className="flex-1 md:flex md:justify-end w-full">
              <button className="w-full md:w-auto bg-white hover:bg-gray-50 text-teal-900 px-6 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 border border-transparent">
                <Upload size={18} className="rotate-180" strokeWidth={2.5} />
                Export my data
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone Section */}
        <div>
          <label className="text-gray-600 text-sm block mb-2">
            Danger Zone
          </label>
          <div className="bg-white border border-red-400 rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-sm">
            <p className="text-teal-900 font-medium text-lg mb-8">
              Delete your account and all associated content. This action can
              not be undone.
            </p>
            <button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-3 rounded-full font-medium text-sm transition-colors shadow-md flex items-center gap-2">
              <Trash2 size={18} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;
