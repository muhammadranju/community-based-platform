import {
  Bold,
  Eraser,
  FileIcon,
  ImageIcon,
  Italic,
  LinkIcon,
  List,
  Paperclip,
  Trash2,
  Underline,
  Video,
  VideoIcon,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});
const modules = {
  toolbar: {
    container: "#custom-toolbar",
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "link",
  "image",
  "video",
];

function CustomToolbarEditor({
  formData,
  setFormData,
  handleFileChange,
  isLoading,
  handelSubmit,
  imagePreviews,
  removeImage,
  forumData,
  handleYouTubeVideoChange,
  handlePdfChange,
  removePdf,
}: any) {
  const [open, setOpen] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const handleAddVideo = () => {
    if (!videoLink.trim()) return;
    const currentVideos = formData.videos || [];
    handleYouTubeVideoChange([...currentVideos, videoLink]);
    setVideoLink("");
  };

  const handleRemoveVideo = (index: number) => {
    const currentVideos = formData.videos || [];
    const updatedVideos = currentVideos.filter(
      (_: string, i: number) => i !== index
    );
    handleYouTubeVideoChange(updatedVideos);
  };

  return (
    <>
      {/* Input Area */}
      <div className="mb-12">
        <div className="border border-emerald-900 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-900/20 transition-all bg-white relative">
          <div className="quill-wrapper">
            <style jsx global>{`
              .quill-wrapper .ql-container {
                border: none !important;
                font-family: inherit;
                font-size: 1rem;
              }
              .quill-wrapper .ql-editor {
                min-height: 140px;
                padding: 1rem;
              }
              .quill-wrapper .ql-toolbar {
                display: none; /* Hide default toolbar location if any */
              }
              .quill-wrapper .ql-tooltip {
                z-index: 50;
              }
            `}</style>
            <ReactQuill
              theme="snow"
              value={formData.comment}
              onChange={(value: string) =>
                setFormData({ ...formData, comment: value })
              }
              modules={modules}
              formats={formats}
              placeholder="Write your message here"
              className="w-full"
            />
          </div>

          {/* Custom Toolbar */}
          <div className="bg-white border-t border-emerald-900 p-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quill Custom Toolbar */}
            <div
              id="custom-toolbar"
              className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-500 border-none! p-0!"
            >
              <button
                className="ql-clean hover:text-emerald-700 transition-colors p-1"
                title="Clear Formatting"
              >
                <Eraser size={18} />
              </button>
              <button
                className="ql-bold hover:text-emerald-700 transition-colors p-1"
                title="Bold"
              >
                <Bold size={18} />
              </button>
              <button
                className="ql-italic hover:text-emerald-700 transition-colors p-1"
                title="Italic"
              >
                <Italic size={18} />
              </button>
              <button
                className="ql-underline hover:text-emerald-700 transition-colors p-1"
                title="Underline"
              >
                <Underline size={18} />
              </button>

              {/* Separator */}
              <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>

              <button
                className="ql-link hover:text-emerald-700 transition-colors p-1"
                title="Link"
              >
                <LinkIcon size={18} />
              </button>
              <button
                className="ql-image hover:text-emerald-700 transition-colors p-1"
                title="Insert Image"
              >
                <ImageIcon size={18} />
              </button>
              <button
                className="ql-video hover:text-emerald-700 transition-colors p-1"
                title="Insert Video"
              >
                <Video size={18} />
              </button>

              {/* Separator */}
              <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>

              <button
                className="ql-list hover:text-emerald-700 transition-colors p-1"
                value="bullet"
                title="Bullet List"
              >
                <List size={18} />
              </button>

              {/* Separator */}
              <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>

              <div className="flex items-center gap-2 sm:gap-4">
                <label className="cursor-pointer hover:text-emerald-900 flex items-center gap-1 text-xs sm:text-sm font-medium transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Paperclip size={16} /> Attach File
                </label>
                <label className="cursor-pointer hover:text-emerald-900 flex items-center gap-1 text-xs sm:text-sm font-medium transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="hidden"
                  />
                  <Paperclip size={16} /> Attach YouTube Video
                </label>
                <label className="cursor-pointer hover:text-emerald-900 flex items-center gap-1 text-xs sm:text-sm font-medium transition-colors">
                  <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={handlePdfChange}
                    className="hidden"
                  />
                  <Paperclip size={16} /> Attach PDF
                </label>
              </div>
            </div>

            {/* Hidden input needs to be somewhere */}
            <input
              type="text"
              name="content"
              readOnly
              value={forumData?._id || ""}
              className="hidden"
            />

            {/* Actions & Previews */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {imagePreviews.map((preview: string, index: number) => (
                    <div
                      key={index}
                      className="relative w-12 h-12 rounded-lg overflow-hidden border border-emerald-900/20 shadow-sm"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-lg p-0.5"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handelSubmit}
                disabled={isLoading}
                className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-2.5 rounded-full transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 min-w-[140px]"
              >
                {isLoading ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </div>

        {/* Video List Display - Show added videos below the editor */}
        {formData.videos && formData.videos.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {formData.videos.map((vid: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm text-gray-700"
              >
                <VideoIcon size={14} />
                <span className="truncate max-w-[200px]">{vid}</span>
                <button
                  onClick={() => handleRemoveVideo(idx)}
                  className="hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* PDF List Display - Show added PDFs below the editor */}
        {formData.pdfs && formData.pdfs.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {formData.pdfs.map((pdf: File, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full text-sm text-red-700"
              >
                <FileIcon size={14} />
                <span className="truncate max-w-[200px]">{pdf.name}</span>
                <button
                  onClick={() => removePdf(idx)}
                  className="hover:text-red-900"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[725px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Attach YouTube Video to your comment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 justify-center items-center">
              <Input
                id="name-1"
                name="name"
                className="rounded-full"
                placeholder="Enter video URL"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />

              <Button
                type="button"
                onClick={handleAddVideo}
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-2.5 rounded-full transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 min-w-[140px]"
              >
                Add More +
              </Button>
            </div>

            {/* List of currently added videos inside the dialog */}
            <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
              {formData.videos &&
                formData.videos.map((vid: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
                  >
                    <span className="text-sm truncate flex-1 mr-2">{vid}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveVideo(idx)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-medium px-6 py-2.5 rounded-full transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 min-w-[140px]"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CustomToolbarEditor;
