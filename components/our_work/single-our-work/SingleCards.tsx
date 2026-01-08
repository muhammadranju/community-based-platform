import { ArrowRight, Copy, FileText, PlayCircle, Youtube } from "lucide-react";
import { Attachment } from "./interface";

export const SingleFileCard = ({ file }: { file: Attachment }) => (
  <div className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col group cursor-pointer">
    <div className="h-48 overflow-hidden bg-gray-50 relative p-4 flex items-center justify-center border-b">
      <div className="bg-white shadow-sm border w-32 h-40 mx-auto p-2 text-[6px] text-gray-400 overflow-hidden leading-tight">
        <div className="w-full h-2 bg-gray-200 mb-2"></div>
        <div className="w-3/4 h-2 bg-gray-200 mb-2"></div>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="w-full h-1 bg-gray-100 mb-1"></div>
          ))}
      </div>
    </div>
    <div className="p-3 sm:p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
          <FileText size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm sm:text-base">
            {file.title}
          </h4>
          <p className="text-xs text-gray-500">{file.meta}</p>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight size={16} />
      </div>
    </div>
  </div>
);

export const SingleVideoCard = ({ video }: { video: Attachment }) => (
  <div className="relative rounded-2xl overflow-hidden group aspect-video bg-black">
    <img
      src={video.thumbnail}
      alt={video.title}
      className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
    />
    <div className="absolute top-3 left-3 flex items-center gap-2 text-white/90">
      <Youtube size={20} className="text-red-500 fill-current" />
      <span className="text-xs font-medium shadow-black drop-shadow-md">
        {video.title}
      </span>
    </div>
    <div className="absolute top-3 right-3 text-white/90">
      <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded text-xs backdrop-blur-sm">
        <Copy size={12} />
        Copy link
      </div>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <PlayCircle
        size={64}
        className="text-white fill-white/20 drop-shadow-xl cursor-pointer hover:scale-110 transition-transform"
      />
    </div>
    <div className="absolute bottom-3 left-3">
      <div className="bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
        Watch on <Youtube size={14} />
      </div>
    </div>
  </div>
);
