// "use client";

// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { authFetch } from "@/lib/authFetch";
// import { toast } from "sonner";
// import { Upload, X } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { IBlog } from "@/types/types";
// import "react-quill-new/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// const categories = {
//   introduction: "Introduction",
//   cultural: "Cultural",
//   rebuilding: "Rebuilding",
//   materials: "Materials",
//   interactive: "Interactive",
//   community: "Community",
// } as const;

// interface EditBlogDialogProps {
//   blog: IBlog | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSuccess: () => void;
// }

// export default function EditBlogDialog({
//   blog,
//   open,
//   onOpenChange,
//   onSuccess,
// }: EditBlogDialogProps) {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//   });
//   const [tags, setTags] = useState<string[]>([]);
//   const [tagInput, setTagInput] = useState("");
//   const [coverImage, setCoverImage] = useState<File | null>(null);
//   const [shortDescription, setShortDescription] = useState("");
//   const [coverPreview, setCoverPreview] = useState<string | null>(null);

//   useEffect(() => {
//     if (blog && open) {
//       // Initialize form with blog data
//       // Note: We might need to fetch full blog details if IBlog doesn't have everything
//       // But assuming IBlog has what we need based on recent type updates.
//       // If category/tags are missing in IBlog, simple initialization might fail to show them.
//       // Ideally we should fetch the single blog here to be safe and get fresh data.
//       fetchBlogDetails(blog.slug);
//     } else {
//       // Reset form when closed
//       setFormData({
//         title: "",
//         description: "",
//         category: "",
//       });
//       setTags([]);
//       setShortDescription("");
//       setCoverImage(null);
//       setCoverPreview(null);
//     }
//   }, [blog, open]);

//   const fetchBlogDetails = async (id: string) => {
//     try {
//       const res = await authFetch(`/blogs/${id}`, {
//         method: "GET",
//         auth: true,
//       });
//       const data = await res.json();
//       if (data?.success) {
//         const blog = data?.data?.result;
//         console.log(blog);
//         setFormData({
//           title: blog?.title || "",
//           description: blog?.description || "",
//           category: blog?.category || "",
//         });
//         setShortDescription(blog?.shortDescription || ""); // Optimistic init, may be empty until edited
//         setTags(blog?.tags || []);
//         if (blog?.image) {
//           setCoverPreview(`${process.env.NEXT_PUBLIC_API_URL}${blog.image}`);
//         }
//       }
//     } catch (error) {
//       console.error("Failed to fetch blog details", error);
//       toast.error("Failed to load blog details");
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDescriptionChange = (
//     content: string,
//     delta: any,
//     source: any,
//     editor: any,
//   ) => {
//     setFormData((prev) => ({ ...prev, description: content }));
//     setShortDescription(editor.getText());
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       if (!file.type.startsWith("image/")) {
//         toast.error("Please select an image file");
//         return;
//       }

//       setCoverImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCoverPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setCoverImage(null);
//     setCoverPreview(null);
//   };

//   const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const newTag = tagInput.trim();
//       if (newTag && !tags.includes(newTag)) {
//         setTags([...tags, newTag]);
//         setTagInput("");
//       }
//     }
//   };

//   const removeTag = (indexToRemove: number) => {
//     setTags(tags.filter((_, index) => index !== indexToRemove));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!blog) return;

//     // Validation: Title and Description are required. Category recommended.
//     if (!formData.title || !formData.description) {
//       toast.error("Title and Description are required");
//       return;
//     }

//     setLoading(true);
//     const submitData = new FormData();
//     submitData.append("title", formData.title);
//     submitData.append("description", formData.description);
//     submitData.append("shortDescription", shortDescription);
//     if (formData.category) submitData.append("category", formData.category);

//     tags.forEach((tag) => {
//       submitData.append("tags", tag);
//     });

//     if (coverImage) {
//       submitData.append("image", coverImage);
//     }

//     try {
//       const res = await authFetch(`/blogs/${blog._id}`, {
//         method: "PATCH",
//         body: submitData,
//         auth: true,
//       });

//       const data = await res.json();

//       if (data?.success) {
//         toast.success("Blog updated successfully!");
//         onSuccess();
//         onOpenChange(false);
//       } else {
//         toast.error(data?.message || "Failed to update blog");
//       }
//     } catch (error) {
//       console.error("Error updating blog:", error);
//       toast.error("An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-h-[90vh] overflow-y-auto w-full">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold text-teal-900">
//             Edit Blogsss
//           </DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6 mt-4">
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Blog Title
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
//                 placeholder="Enter blog title"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category
//               </label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
//                 required
//               >
//                 <option value="">Select category</option>
//                 {Object.entries(categories).map(([key, label]) => (
//                   <option key={key} value={key}>
//                     {label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Tags
//             </label>
//             <div className="w-full px-4 py-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-500 transition-colors flex flex-wrap gap-2 items-center min-h-[50px]">
//               {tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
//                 >
//                   {tag}
//                   <button
//                     type="button"
//                     onClick={() => removeTag(index)}
//                     className="hover:text-teal-900 transition-colors"
//                   >
//                     <X size={14} />
//                   </button>
//                 </span>
//               ))}
//               <input
//                 type="text"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyDown={handleTagKeyDown}
//                 className="flex-1 bg-transparent border-none outline-none min-w-[120px]"
//                 placeholder={
//                   tags.length === 0 ? "Type tag and press Enter" : ""
//                 }
//               />
//             </div>
//             <p className="text-xs text-gray-500 mt-1">
//               Press Enter to add a tag
//             </p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Cover Image
//             </label>
//             {!coverPreview ? (
//               <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:bg-gray-50 transition-colors text-center cursor-pointer relative">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 />
//                 <div className="flex flex-col items-center gap-2 text-gray-500">
//                   <div className="bg-teal-50 p-3 rounded-full text-teal-600">
//                     <Upload size={24} />
//                   </div>
//                   <p className="font-medium">
//                     Click to upload or drag and drop
//                   </p>
//                   <p className="text-xs">
//                     SVG, PNG, JPG or GIF (max. 800x400px)
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="relative rounded-xl overflow-hidden border border-gray-200 aspect-video w-full max-w-md">
//                 <img
//                   src={coverPreview}
//                   alt="Preview"
//                   className="w-full h-full object-cover"
//                 />
//                 <button
//                   type="button"
//                   onClick={removeImage}
//                   className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Blog Content
//             </label>
//             <div className="prose-editor">
//               <ReactQuill
//                 theme="snow"
//                 value={formData.description}
//                 onChange={handleDescriptionChange}
//                 className="h-[300px] mb-12"
//                 modules={{
//                   toolbar: [
//                     [{ header: [1, 2, 3, false] }],
//                     ["bold", "italic", "underline", "strike"],
//                     [{ list: "ordered" }, { list: "bullet" }],
//                     ["link", "image"],
//                     ["clean"],
//                   ],
//                 }}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-4 pt-4">
//             <button
//               type="button"
//               onClick={() => onOpenChange(false)}
//               className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-8 py-2.5 rounded-full bg-teal-900 text-white font-medium hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Updating..." : "Update Blog"}
//             </button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { authFetch } from "@/lib/authFetch";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { IBlog } from "@/types/types";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const categories = {
  introduction: "Introduction",
  cultural: "Cultural",
  rebuilding: "Rebuilding",
  materials: "Materials",
  interactive: "Interactive",
  community: "Community",
} as const;

interface EditBlogDialogProps {
  blog: IBlog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function EditBlogDialog({
  blog,
  open,
  onOpenChange,
  onSuccess,
}: EditBlogDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [shortDescription, setShortDescription] = useState("");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  useEffect(() => {
    if (blog && open) {
      fetchBlogDetails(blog.slug);
    } else {
      setFormData({ title: "", description: "", category: "" });
      setTags([]);
      setShortDescription("");
      setCoverImage(null);
      setCoverPreview(null);
    }
  }, [blog, open]);

  const fetchBlogDetails = async (slug: string) => {
    try {
      const res = await authFetch(`/blogs/${slug}`, {
        method: "GET",
        auth: true,
      });
      const data = await res.json();
      if (data?.success) {
        const blogData = data?.data?.result;
        setFormData({
          title: blogData?.title || "",
          description: blogData?.description || "",
          category: blogData?.category || "",
        });
        setShortDescription(blogData?.shortDescription || "");
        setTags(blogData?.tags || []);
        if (blogData?.image) {
          setCoverPreview(
            `${process.env.NEXT_PUBLIC_API_URL}${blogData.image}`,
          );
        }
      }
    } catch (error) {
      console.error("Failed to fetch blog details", error);
      toast.error("Failed to load blog details");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (
    content: string,
    _delta: any,
    _source: any,
    editor: any,
  ) => {
    setFormData((prev) => ({ ...prev, description: content }));
    setShortDescription(editor.getText().trim());
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    if (!formData.title || !formData.description) {
      toast.error("Title and Description are required");
      return;
    }

    setLoading(true);
    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("shortDescription", shortDescription);
    if (formData.category) submitData.append("category", formData.category);
    tags.forEach((tag) => submitData.append("tags", tag));
    if (coverImage) submitData.append("image", coverImage);

    try {
      const res = await authFetch(`/blogs/${blog._id}`, {
        method: "PATCH",
        body: submitData,
        auth: true,
      });
      const data = await res.json();

      if (data?.success) {
        toast.success("Blog updated successfully!");
        onSuccess();
        onOpenChange(false);
      } else {
        toast.error(data?.message || "Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-7xl sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-900">
            Edit Blog
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Blog Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                className="rounded-xl border-gray-200 focus-visible:ring-teal-500/30 focus-visible:border-teal-500 h-11 px-4"
                required
              />
            </div>

            <div className="space-y-2 w-full">
              <Label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </Label>
              <Select
                name="category"
                value={formData.category}
                onValueChange={(val) =>
                  setFormData((p) => ({ ...p, category: val }))
                }
              >
                <SelectTrigger className="rounded-md border-gray-200 w-full focus:ring-teal-500/30 focus:border-teal-500 py-4 h-16 px-4">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categories).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Tags</Label>
            <div
              className={`
                flex min-h-[50px] w-full flex-wrap gap-2 rounded-xl border border-gray-200 
                px-3 py-2 text-sm ring-offset-background 
                focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20
                transition-colors
              `}
            >
              {tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="gap-1 bg-teal-50 text-teal-700 hover:bg-teal-50 px-3 py-1 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(idx)}
                    className="rounded-full hover:text-teal-900 ml-1"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}

              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={
                  tags.length === 0 ? "Type tag and press Enter" : ""
                }
                className="flex-1 min-w-[140px] border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
              />
            </div>
            <p className="text-xs text-gray-500">Press Enter to add a tag</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Cover Image
            </Label>

            {!coverPreview ? (
              <div className="group relative flex h-52 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/40 hover:border-teal-200 hover:bg-gray-50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                />
                <div className="flex flex-col items-center gap-3 text-gray-500">
                  <div className="rounded-full bg-teal-50 p-4 text-teal-600">
                    <Upload size={28} />
                  </div>
                  <p className="font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
              </div>
            ) : (
              <div className="group relative aspect-video w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-600 shadow hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Blog Content
            </Label>
            <div className="prose-editor rounded-xl border border-gray-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-colors overflow-hidden">
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={handleDescriptionChange}
                className="h-[320px] [&_.ql-container]:border-0 [&_.ql-toolbar]:border-b [&_.ql-editor]:min-h-[240px]"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-full border-gray-200 px-7 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-full bg-teal-900 px-9 hover:bg-teal-800 disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Blog"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
