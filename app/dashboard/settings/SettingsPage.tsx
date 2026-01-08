"use client";
import getUser from "@/components/shared/UserInfo";
import { authFetch } from "@/lib/authFetch";
import { Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function SettingsPage() {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const user = getUser();

  const handleUpdatePassword = async () => {
    // Basic validation
    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    try {
      const response = await authFetch("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword: password.currentPassword,
          newPassword: password.newPassword,
          confirmPassword: password.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update password");
      } else {
        toast.success("Password updated successfully");
        // Clear fields on success
        setPassword({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen ">
      <title>Settings Dashboard - African Traditional Architecture</title>
      <div className="w-full mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal-900 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">
            Manage your security and privacy settings
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-[#e4ede4] rounded-3xl p-6 sm:p-10 shadow-lg">
          {/* Change Password Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-teal-900 mb-6">
              Change Password
            </h2>

            {/* Password Inputs - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full px-5 py-4 rounded-xl bg-white text-teal-900 font-medium text-sm focus:outline-none focus:ring-4 focus:ring-teal-900/20 shadow-md placeholder-gray-500 transition-all"
                value={password.currentPassword}
                onChange={(e) =>
                  setPassword({ ...password, currentPassword: e.target.value })
                }
                autoComplete="current-password"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-5 py-4 rounded-xl bg-white text-teal-900 font-medium text-sm focus:outline-none focus:ring-4 focus:ring-teal-900/20 shadow-md placeholder-gray-500 transition-all"
                value={password.newPassword}
                onChange={(e) =>
                  setPassword({ ...password, newPassword: e.target.value })
                }
                autoComplete="new-password"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-5 py-4 rounded-xl bg-white text-teal-900 font-medium text-sm focus:outline-none focus:ring-4 focus:ring-teal-900/20 shadow-md placeholder-gray-500 transition-all"
                value={password.confirmPassword}
                onChange={(e) =>
                  setPassword({ ...password, confirmPassword: e.target.value })
                }
                autoComplete="new-password"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                onClick={handleUpdatePassword}
                className="w-full sm:w-auto bg-[#d97706] hover:bg-[#b45309] active:scale-95 text-white px-10 py-4 rounded-full font-semibold text-sm transition-all shadow-lg transform"
              >
                Update Password
              </button>

              <button className="w-full sm:w-auto bg-white hover:bg-gray-100 active:scale-95 text-teal-900 px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-3 border border-gray-200">
                <Upload size={20} className="rotate-180" strokeWidth={2.5} />
                Export My Data
              </button>
            </div>
          </div>

          {/* Danger Zone - Only for regular users */}
          {user?.role === "USER" && (
            <div className="border-t border-gray-300 pt-10">
              <h2 className="text-xl font-semibold text-teal-900 mb-6">
                Danger Zone
              </h2>
              <div className="bg-white border-2 border-red-500/50 rounded-2xl p-8 text-center shadow-inner">
                <p className="text-gray-800 font-medium text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                  Permanently delete your account and all associated data. This
                  action{" "}
                  <span className="text-red-600 font-bold">
                    cannot be undone
                  </span>
                  .
                </p>
                <button className="bg-[#dc2626] hover:bg-[#b91c1c] active:scale-95 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all shadow-lg flex items-center gap-3 mx-auto">
                  <Trash2 size={20} strokeWidth={2.5} />
                  Delete My Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
