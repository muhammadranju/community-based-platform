import React from "react";
import { Image as ImageIcon, Video, FileText, Upload } from "lucide-react";

interface UploadCardProps {
  icon: React.ReactNode;
  title: string;
  count: string;
}

const UploadCard: React.FC<UploadCardProps> = ({ icon, title, count }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#ecfccb] flex items-center justify-center text-teal-900">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-teal-900 text-sm">{title}</h3>
          <p className="text-gray-500 text-xs">{count}</p>
        </div>
      </div>

      <div className="border border-teal-900/20 rounded-xl h-48 sm:h-56 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">
        <div className="w-10 h-10 rounded-full bg-[#ecfccb]/50 group-hover:bg-[#ecfccb] flex items-center justify-center mb-3 transition-colors">
          <Upload size={20} className="text-teal-900" />
        </div>
        <p className="text-teal-900 font-medium text-sm">
          Drag & drop or click to upload
        </p>
      </div>
    </div>
  );
};

export const UploadContentPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-teal-900 mb-1">
          Upload Content
        </h1>
        <p className="text-gray-500 text-sm">
          Upload your Image, Video and Documents
        </p>
      </div>

      <div className="space-y-6">
        {/* Photos Card */}
        <UploadCard
          icon={<ImageIcon size={20} />}
          title="Photos"
          count="0/6 uploaded"
        />
        {/* Videos Card */}
        <UploadCard
          icon={<Video size={20} />}
          title="Videos"
          count="0/6 uploaded"
        />
        {/* Documents Card */}
        <UploadCard
          icon={<FileText size={20} />}
          title="PDF Documents"
          count="0/6 uploaded"
        />
      </div>
    </div>
  );
};
