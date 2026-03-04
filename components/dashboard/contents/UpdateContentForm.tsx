"use client";
import { Label } from "@/components/ui/label";
import { authFetch } from "@/lib/authFetch";
import {
  FileText,
  Image as ImageIcon,
  Send,
  Upload,
  Video,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { IPost } from "@/app/dashboard/contents/ContentsPage";

const regions = [
  "east-african-architecture",
  "central-african-architecture",
  "west-african-architecture",
  "north-african-architecture",
  "south-african-architecture",
  "global-african-architecture",
] as const;

import africanArchitectureRegions from "../../../components/our_work/africanArchitectureRegions";

const categories = {
  introduction: "Introduction",
  cultural: "Cultural",
  rebuilding: "Rebuilding",
  materials: "Materials",
  interactive: "Interactive",
  community: "Community",
} as const;

type Region = (typeof regions)[number] | string;
type CategoryKey = keyof typeof categories | string;

interface Step {
  title: string;
  value: string[];
}

interface FormDataState {
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
  stepByStep: Step[];
}

interface UpdateContentFormProps {
  post: IPost;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const UpdateContentForm: React.FC<UpdateContentFormProps> = ({
  post,
  onSuccess,
  onCancel,
}) => {
  const formatBackendRegion = (backendRegion: string) => {
    switch (backendRegion) {
      case "east":
        return "east-african-architecture";
      case "central":
        return "central-african-architecture";
      case "west":
        return "west-african-architecture";
      case "north":
        return "north-african-architecture";
      case "south":
        return "south-african-architecture";
      case "global":
        return "global-african-architecture";
      default:
        return backendRegion;
    }
  };

  const [formData, setFormData] = useState<FormDataState>({
    title: post.title || "",
    shortDescription: post.shortDescription || "",
    description: post.description || "",
    region: formatBackendRegion(post.region) || "",
    category: post.category || "",
    coverImage: null,
    images: [],
    medias: [],
    pdfs: [],
    country: post.country || "",
    stepByStep: [], // Will populate if available in API
  });

  const [existingCoverPhoto, setExistingCoverPhoto] = useState<string | null>(
    post.coverImage || null,
  );
  const [existingImages, setExistingImages] = useState<string[]>(
    post.images || [],
  );
  const [existingMedias, setExistingMedias] = useState<string[]>(
    post.medias || [],
  );
  const [existingPdfs, setExistingPdfs] = useState<string[]>(post.pdfs || []);

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic Country List Logic
  const regionData = africanArchitectureRegions.find(
    (r) => r.title === formData.region,
  );

  const availableCountries = regionData
    ? regionData.countries.slice().sort((a, b) => a.localeCompare(b))
    : [];

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStep = () => {
    setFormData((prev) => ({
      ...prev,
      stepByStep: [...prev.stepByStep, { title: "", value: [""] }],
    }));
  };

  const handleRemoveStep = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stepByStep: prev.stepByStep.filter((_, i) => i !== index),
    }));
  };

  const handleStepTitleChange = (index: number, title: string) => {
    setFormData((prev) => {
      const newSteps = [...prev.stepByStep];
      newSteps[index] = { ...newSteps[index], title };
      return { ...prev, stepByStep: newSteps };
    });
  };

  const handleAddStepValue = (stepIndex: number) => {
    setFormData((prev) => {
      const newSteps = [...prev.stepByStep];
      newSteps[stepIndex] = {
        ...newSteps[stepIndex],
        value: [...newSteps[stepIndex].value, ""],
      };
      return { ...prev, stepByStep: newSteps };
    });
  };

  const handleRemoveStepValue = (stepIndex: number, valueIndex: number) => {
    setFormData((prev) => {
      const newSteps = [...prev.stepByStep];
      newSteps[stepIndex] = {
        ...newSteps[stepIndex],
        value: newSteps[stepIndex].value.filter((_, i) => i !== valueIndex),
      };
      return { ...prev, stepByStep: newSteps };
    });
  };

  const handleStepValueChange = (
    stepIndex: number,
    valueIndex: number,
    text: string,
  ) => {
    setFormData((prev) => {
      const newSteps = [...prev.stepByStep];
      const newValues = [...newSteps[stepIndex].value];
      newValues[valueIndex] = text;
      newSteps[stepIndex] = { ...newSteps[stepIndex], value: newValues };
      return { ...prev, stepByStep: newSteps };
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "region") {
        if (value !== prev.region) {
          return { ...prev, region: value as Region, country: "" };
        }
        return { ...prev, region: value as Region };
      }
      if (name === "category") {
        return { ...prev, category: value as CategoryKey };
      }
      if (name === "country") {
        return { ...prev, country: value };
      }
      return prev;
    });
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "coverImage" | "images" | "medias" | "pdfs",
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    try {
      if (field === "coverImage") {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, coverImage: file }));
        setExistingCoverPhoto(null);

        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setCoverPreview(reader.result as string);
          reader.readAsDataURL(file);
        } else {
          setCoverPreview(null);
        }
      } else {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
          ...prev,
          [field]: [...prev[field], ...files],
        }));

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
    } catch (error) {
      console.error("File processing error:", error);
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

  const removeExistingMedia = (
    field: "images" | "medias" | "pdfs",
    index: number,
  ) => {
    if (field === "images")
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    if (field === "medias")
      setExistingMedias((prev) => prev.filter((_, i) => i !== index));
    if (field === "pdfs")
      setExistingPdfs((prev) => prev.filter((_, i) => i !== index));
  };

  const removeCover = () => {
    setFormData((prev) => ({ ...prev, coverImage: null }));
    setCoverPreview(null);
  };

  const removeExistingCover = () => {
    setExistingCoverPhoto(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("shortDescription", formData.shortDescription);
    formDataToSubmit.append("description", formData.description);

    // Map region to backend enum
    const regionMapping: Record<string, string> = {
      "east-african-architecture": "east",
      "west-african-architecture": "west",
      "north-african-architecture": "north",
      "south-african-architecture": "south",
      "central-african-architecture": "central",
      "global-african-architecture": "global",
    };

    const backendRegion =
      regionMapping[formData.region] || formData.region.split("-")[0];

    formDataToSubmit.append("region", backendRegion);
    formDataToSubmit.append("country", formData.country);
    formDataToSubmit.append("category", formData.category);

    if (formData.coverImage) {
      formDataToSubmit.append("coverImage", formData.coverImage);
    } else if (existingCoverPhoto) {
      formDataToSubmit.append("coverImage", existingCoverPhoto);
    }

    formData.images.forEach((file) => formDataToSubmit.append("images", file));
    existingImages.forEach((url) => formDataToSubmit.append("images", url));

    formData.medias.forEach((file) => formDataToSubmit.append("medias", file));
    existingMedias.forEach((url) => formDataToSubmit.append("medias", url));

    formData.pdfs.forEach((file) => formDataToSubmit.append("pdfs", file));
    existingPdfs.forEach((url) => formDataToSubmit.append("pdfs", url));

    if (formData.stepByStep.length > 0) {
      formDataToSubmit.append(
        "stepByStep",
        JSON.stringify(formData.stepByStep),
      );
    }

    try {
      const response = await authFetch(`/contents/${post._id}`, {
        method: "PATCH",
        body: formDataToSubmit,
        auth: true,
      });

      if (!response.ok) {
        throw new Error("Failed to update content");
      }

      toast.success("Content updated successfully!");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto relative">
      <div className="mb-5 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-teal-900 mb-1">
            Edit Content
          </h1>
          <p className="text-gray-600">
            Update the details and media for this content
          </p>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 bg-white hover:bg-red-50 hover:text-red-500 rounded-full transition-colors shadow-sm border border-gray-200"
          >
            <X size={20} />
          </button>
        )}
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

        {/* Step by Step Guide */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm border-b pb-2 text-emerald-900 mt-2 font-semibold">
              Step By Step Guide (Optional)
            </h4>
            <button
              type="button"
              onClick={handleAddStep}
              className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition"
            >
              <Plus size={18} />
              Add Step
            </button>
          </div>

          <div className="space-y-6">
            {formData.stepByStep.map((step, stepIndex) => (
              <div
                key={stepIndex}
                className="bg-white rounded-xl p-6 border border-gray-200 relative group"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveStep(stepIndex)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-900 mb-2">
                      Step {stepIndex + 1} Title
                    </label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) =>
                        handleStepTitleChange(stepIndex, e.target.value)
                      }
                      placeholder="e.g. Preparation"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-emerald-900">
                      Description / Points
                    </label>
                    {step.value.map((val, valIndex) => (
                      <div key={valIndex} className="flex gap-2">
                        <textarea
                          rows={2}
                          value={val}
                          onChange={(e) =>
                            handleStepValueChange(
                              stepIndex,
                              valIndex,
                              e.target.value,
                            )
                          }
                          placeholder="Describe this step..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white resize-none"
                        />
                        {step.value.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveStepValue(stepIndex, valIndex)
                            }
                            className="p-2 text-gray-400 hover:text-red-500 transition self-start mt-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddStepValue(stepIndex)}
                      className="text-sm font-medium text-amber-600 hover:text-amber-700 transition flex items-center gap-1 mt-2"
                    >
                      <Plus size={16} /> Add Point
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-emerald-900 mb-2">
              Region *
            </label>
            <select
              name="region"
              required
              value={formData.region}
              onChange={handleSelectChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 capitalize"
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r.replace(/-/g, " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-900 mb-2">
              Country *
            </label>
            <select
              name="country"
              required
              value={formData.country}
              onChange={handleSelectChange}
              disabled={!formData.region}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 capitalize disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="">Select Country</option>
              {availableCountries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {!formData.region && (
              <p className="text-xs text-amber-600 mt-1">
                Please select a region first
              </p>
            )}
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
              <option value="">Select Category</option>
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Media Uploads */}
        <div className="space-y-8">
          {/* Cover Image */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
            <label className="block text-sm font-semibold text-emerald-900 mb-4">
              Cover Image
            </label>
            {coverPreview || existingCoverPhoto ? (
              <div className="relative w-full h-64 rounded-xl overflow-hidden group">
                <img
                  src={
                    coverPreview ||
                    `${process.env.NEXT_PUBLIC_API_URL}${existingCoverPhoto}`
                  }
                  alt="Cover preview"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={coverPreview ? removeCover : removeExistingCover}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "coverImage")}
                  className="hidden"
                  id="cover-upload"
                  required={!existingCoverPhoto && !formData.coverImage}
                />
                <label
                  htmlFor="cover-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer group"
                >
                  <Upload className="w-10 h-10 text-gray-400 group-hover:text-emerald-500 mb-3" />
                  <span className="text-emerald-900 font-medium">
                    Upload new Cover Image
                  </span>
                  <span className="text-gray-500 text-sm mt-1">
                    Click to browse (replace old cover)
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Multiple Images */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
            <div className="flex justify-between items-end mb-4">
              <label className="block text-sm font-semibold text-emerald-900">
                Gallery Images
              </label>
              <span className="text-sm text-gray-500">
                {existingImages.length + formData.images.length} uploaded
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {existingImages.map((src, idx) => (
                <div
                  key={`existing-${idx}`}
                  className="relative group aspect-square rounded-xl overflow-hidden shadow-sm"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${src}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeExistingMedia("images", idx)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {imagePreviews.map((src, idx) => (
                <div
                  key={`new-${idx}`}
                  className="relative group aspect-square rounded-xl overflow-hidden shadow-sm"
                >
                  <img src={src} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeFile("images", idx)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer transition-colors">
                <Plus className="w-8 h-8 text-gray-400" />
                <span className="text-xs text-gray-500 mt-2">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, "images")}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Videos */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <label className="block text-sm font-semibold text-emerald-900 mb-4">
                Videos
              </label>
              <div className="space-y-3">
                {existingMedias.map((src, idx) => (
                  <div
                    key={`exist-vid-${idx}`}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <Video size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 truncate">
                        Existing Video {idx + 1}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExistingMedia("medias", idx)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {formData.medias.map((file, idx) => (
                  <div
                    key={`new-vid-${idx}`}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                        <Video size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("medias", idx)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <label className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer p-2 border-2 border-dashed border-emerald-200 rounded-lg justify-center transition-colors">
                  <Plus size={16} /> Add Video
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "medias")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* PDFs */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <label className="block text-sm font-semibold text-emerald-900 mb-4">
                PDF Documents
              </label>
              <div className="space-y-3">
                {existingPdfs.map((src, idx) => (
                  <div
                    key={`exist-pdf-${idx}`}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-red-100 p-2 rounded-lg text-red-600">
                        <FileText size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 truncate">
                        Existing PDF {idx + 1}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExistingMedia("pdfs", idx)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {formData.pdfs.map((file, idx) => (
                  <div
                    key={`new-pdf-${idx}`}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                        <FileText size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("pdfs", idx)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <label className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 cursor-pointer p-2 border-2 border-dashed border-amber-200 rounded-lg justify-center transition-colors">
                  <Plus size={16} /> Add PDF
                  <input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={(e) => handleFileChange(e, "pdfs")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100 gap-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors shadow-sm"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all shadow-md shadow-emerald-200 hover:shadow-lg disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={18} />
            )}
            {isLoading ? "Saving Changes..." : "Update Content"}
          </button>
        </div>
      </form>
    </div>
  );
};
