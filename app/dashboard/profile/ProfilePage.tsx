"use client";
import { costumFormatDate } from "@/components/shared/DateTime";
import { authFetch } from "@/lib/authFetch";
import { Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const [user, setUser] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getUserData = async () => {
    const response = await authFetch("/user/profile");
    const user = await response.json();
    setUser(user.data);
    setImagePreview(`${process.env.NEXT_PUBLIC_API_URL}${user.data?.image}`);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("website", user.website);
      formData.append("bio", user.bio);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await authFetch("/user/profile", {
        method: "PATCH",
        auth: true,
        body: formData,
      });

      if (!response.ok) {
        toast.error("Failed to update profile");
        return;
      }

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setImageFile(null);
        localStorage.setItem("user", JSON.stringify(data.data));

        getUserData(); // Refresh user data
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    }
  };

  return (
    <div className="w-full">
      <title>Profile Dashboard - African Traditional Architecture</title>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-teal-900 mb-1">My Profile</h1>
        <p className="text-gray-500 text-sm">Update your public information.</p>
      </div>

      {/* Main Content Card */}
      <div className="bg-[#e4ede4] rounded-3xl p-6 sm:p-10 shadow-sm">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <div className="relative shrink-0 group">
            <img
              src={imagePreview}
              alt="Profile"
              onClick={handleImageClick}
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200/50 shadow-sm cursor-pointer transition-all hover:opacity-80 hover:border-teal-900/30"
            />
            {/* Upload Icon Overlay */}
            <div
              onClick={handleImageClick}
              className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="text-center sm:text-left mt-2">
            <h2 className="text-2xl font-bold text-teal-900 mb-1">
              {user?.name}
            </h2>
            <p className="text-gray-600 text-sm">{user?.email}</p>
            <p className="text-gray-600 text-sm">
              {costumFormatDate(user?.createdAt)}
            </p>
            <p className="text-teal-700 text-xs mt-2 italic">
              Click on image to upload new photo
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-gray-600 text-sm block">Full Name</label>
              <input
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                type="text"
                value={user?.name || ""}
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
                onChange={(e) => setUser({ ...user, website: e.target.value })}
                value={user?.website || ""}
                placeholder="https://example.com"
                className="w-full px-4 py-3.5 rounded-xl bg-white text-teal-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/10 shadow-sm"
              />
            </div>
          </div>

          {/* Short Bio */}
          <div className="space-y-2">
            <label className="text-gray-600 text-sm block">Short Bio</label>
            <textarea
              rows={6}
              value={user?.bio || ""}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              placeholder="Write something about yourself"
              className="w-full px-4 py-3.5 rounded-xl bg-white text-teal-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-900/10 resize-none shadow-sm"
            ></textarea>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button
            onClick={handelSubmit}
            className="flex items-center gap-3 px-6 py-4 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-700 transition shadow-lg text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={22} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
