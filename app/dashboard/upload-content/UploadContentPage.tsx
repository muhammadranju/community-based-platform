"use client";
import React, { useState } from "react";
import {
  Image as ImageIcon,
  Video,
  FileText,
  Upload,
  X,
  Send,
} from "lucide-react";
import { authFetch } from "@/lib/authFetch";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const regions = [
  "east",
  "central",
  "west",
  "north",
  "south",
  "global",
] as const;

const countries = [
  "kenya",
  "tanzania",
  "uganda",
  "ethiopia",
  "somalia",
  "burundi",
  "rwanda",
  "djibouti",
  "comoros",
  "eritrea",
  "seychelles",
  "mauritius",
  "south-sudan",
  "réunion",
  "mayotte",
] as const;

const categories = {
  introduction: "Introduction",
  cultural: "Cultural",
  rebuilding: "Rebuilding",
  materials: "Materials",
  interactive: "Interactive",
  community: "Community",
} as const;

type Region = (typeof regions)[number];
type CategoryKey = keyof typeof categories;

interface FormData {
  title: string;
  shortDescription: string;
  description: string;
  region: Region | "";
  category: CategoryKey | "";
  coverImage: File | null;
  images: File[];
  medias: File[];
  pdfs: File[];
  country: string;
}

export const UploadContentPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    shortDescription: "",
    description: "",
    region: "",
    category: "",
    coverImage: null,
    images: [],
    medias: [],
    pdfs: [],
    country: "",
  });

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "coverImage" | "images" | "medias" | "pdfs"
  ) => {
    if (!e.target.files) return;

    if (field === "coverImage") {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, coverImage: file }));

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setCoverPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setCoverPreview(null);
      }
    } else {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, [field]: [...prev[field], ...files] }));

      // Generate previews only for additional images
      if (field === "images") {
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviews((prev) => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
        });
      }
    }
  };

  const removeFile = (field: "images" | "medias" | "pdfs", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));

    if (field === "images") {
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const removeCover = () => {
    setFormData((prev) => ({ ...prev, coverImage: null }));
    setCoverPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("shortDescription", formData.shortDescription);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("region", formData.region);
    formDataToSubmit.append("country", formData.country);
    formDataToSubmit.append("category", formData.category);

    if (formData.coverImage) {
      formDataToSubmit.append("coverImage", formData.coverImage);
    }

    formData.images.forEach((file) => {
      formDataToSubmit.append("images", file);
    });

    formData.medias.forEach((file) => {
      formDataToSubmit.append("medias", file);
    });

    formData.pdfs.forEach((file) => {
      formDataToSubmit.append("pdfs", file);
    });

    try {
      const response = await authFetch("/contents", {
        method: "POST",
        body: formDataToSubmit,
        auth: true,
      });

      if (!response.ok) {
        throw new Error("Failed to upload content");
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      toast.success("Content uploaded successfully!");

      // Reset form
      setFormData({
        title: "",
        shortDescription: "",
        description: "",
        region: "",
        category: "",
        coverImage: null,
        images: [],
        medias: [],
        pdfs: [],
        country: "",
      });
      setCoverPreview(null);
      setImagePreviews([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  mx-auto ">
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-teal-900 mb-1">
          Upload Content
        </h1>
        <p className="text-gray-600">
          Fill in the details and upload your media assets
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
      >
        {/* Text Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-emerald-900 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleTextChange}
              placeholder="Enter title"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-900 mb-2">
              Short Description *
            </label>
            <input
              type="text"
              name="shortDescription"
              required
              value={formData.shortDescription}
              onChange={handleTextChange}
              placeholder="Enter short description"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <Label
            id="description"
            className="block text-sm font-medium text-emerald-900 mb-2"
          >
            Full Description *
          </Label>
          <textarea
            name="description"
            id="description"
            required
            rows={6}
            value={formData.description}
            onChange={handleTextChange}
            placeholder="Enter full description"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          />
        </div>

        {/* Dropdowns */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <Label className="block text-sm font-medium text-emerald-900 mb-2">
              Country *
            </Label>
            <select
              name="country"
              required
              value={formData.country}
              onChange={handleSelectChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option disabled value="">
                Select country
              </option>
              {countries.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-900 mb-2">
              Region *
            </label>
            <select
              name="region"
              required
              value={formData.region}
              onChange={handleSelectChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option disabled value="">
                Select region
              </option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-900 mb-2">
              Category *
            </label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleSelectChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select category</option>
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-emerald-900 mb-2">
            Cover Image *
          </label>
          {!coverPreview ? (
            <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500 transition">
              <Upload className="mx-auto mb-3 text-gray-400" size={40} />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "coverImage")}
                className="hidden"
                required={!formData.coverImage}
              />
            </label>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-gray-300">
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-full h-64 object-cover"
              />
              <button
                type="button"
                onClick={removeCover}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Multiple File Uploads */}
        {["images", "medias", "pdfs"].map((field) => {
          const title =
            field === "images"
              ? "Additional Images (up to 6)"
              : field === "medias"
              ? "Videos / Media"
              : "PDF Documents";
          const accept =
            field === "images"
              ? "image/*"
              : field === "medias"
              ? "video/*"
              : ".pdf";
          const icon =
            field === "images" ? (
              <ImageIcon size={20} />
            ) : field === "medias" ? (
              <Video size={20} />
            ) : (
              <FileText size={20} />
            );

          const files = formData[field as keyof typeof formData] as File[];

          return (
            <div key={field}>
              <label className="block text-sm font-medium text-emerald-900 mb-2">
                {title}
              </label>
              <UploadCard
                icon={icon}
                title={title}
                count={`${files.length}/6 uploaded`}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFiles = Array.from(e.dataTransfer.files);
                  setFormData((prev: any) => ({
                    ...prev,
                    [field]: [...prev[field], ...droppedFiles].slice(0, 6),
                  }));
                }}
              >
                <input
                  type="file"
                  multiple
                  accept={accept}
                  onChange={(e) => handleFileChange(e, field as any)}
                  className="hidden"
                  id={field}
                />
                <label htmlFor={field} className="cursor-pointer">
                  <Upload size={20} className="text-emerald-900" />
                </label>
              </UploadCard>

              {files.length > 0 && field === "images" && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, i) => (
                    <div
                      key={i}
                      className="relative rounded-lg overflow-hidden h-24 border border-gray-200 shadow-sm"
                    >
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile("images", i)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {files.length > 0 && field !== "images" && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {files.map((file, i) => (
                    <div
                      key={i}
                      className="relative bg-gray-100 rounded-lg p-3 text-center border border-gray-200"
                    >
                      <p className="text-xs text-gray-700 truncate pr-4">
                        {file.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFile(field as any, i)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="pt-6 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-3 px-36 py-4 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-700 transition shadow-lg text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={22} />
            {isLoading ? "Uploading..." : "Submit Content"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable UploadCard with children support
interface UploadCardProps {
  icon: React.ReactNode;
  title: string;
  count: string;
  children?: React.ReactNode;
  onDrop?: (e: React.DragEvent) => void;
}

const UploadCard: React.FC<UploadCardProps> = ({
  icon,
  title,
  count,
  children,
  onDrop,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div>
          <h3 className="font-bold text-emerald-900 text-sm">{title}</h3>
          <p className="text-gray-500 text-xs">{count}</p>
        </div>
      </div>

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border border-emerald-900/20 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group "
      >
        <div className="w-10 h-10 rounded-full bg-[#ecfccb]/50 group-hover:bg-[#ecfccb] flex items-center justify-center mb-3 transition-colors">
          {children || <Upload size={20} className="text-emerald-900" />}
        </div>
      </div>
    </div>
  );
};

export default UploadContentPage;
