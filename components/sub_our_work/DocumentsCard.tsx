import React from "react";

import { ChevronRight, GridIcon, Grip, PlayIcon } from "lucide-react";
import Link from "next/link";
import { PdfIcon } from "./Icons";
import { GlassButton, PrimaryButton } from "./PrimaryButton";
// import { GridIcon, PlayIcon, PdfIcon, ArrowRightIcon } from './Icons';

export interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  type: "pdf" | "doc";
}

export interface MediaStat {
  count: number;
  label: string;
  image: string;
}

export interface ArchiveData {
  title: string;
  description: string;
  stats: {
    photos: MediaStat;
    videos: MediaStat;
    documents: DocumentItem[];
  };
  about: {
    title: string;
    content: string;
    imageUrl: string;
  };
}
// --- Media Card (Photos/Videos) ---
interface MediaCardProps {
  count: number;
  label: string;
  type: "photos" | "videos";
  imageUrl: string;
  url: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  count,
  label,
  type,
  imageUrl,
  url,
}) => {
  return (
    <div className="group relative h-[450px] w-full rounded-4xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow">
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center text-center">
        <h3 className="text-white text-4xl font-bold mb-6 drop-shadow-md">
          {count} {label}
        </h3>
        <Link href={url}>
          <GlassButton
            label={`View all ${label}`}
            icon={
              type === "photos" ? (
                <Grip className="w-4 h-4" />
              ) : (
                <Grip className="w-4 h-4" />
              )
            }
          />
        </Link>
      </div>
    </div>
  );
};

// --- Documents Card ---
interface DocumentsCardProps {
  documents: DocumentItem[];
  totalCount: number;
  owner: string;
  url: string;
}

export const DocumentsCard: React.FC<DocumentsCardProps> = ({
  documents,
  totalCount,
  owner,
  url,
}) => {
  return (
    <div className="h-full min-h-[450px] bg-white rounded-4xl p-8 flex flex-col shadow-sm">
      <h3 className="text-2xl font-bold text-emerald-900 mb-6">
        {totalCount} PDF Documents
      </h3>

      <div className="flex-1 flex flex-col gap-4">
        {documents?.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 bg-accent-bg/50 rounded-2xl group hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-red-500">
                {/* <PdfIcon className="w-6 h-6" /> */}
                <img
                  src="/bg/pdf-icon.png"
                  className="w-8 h-8 group-hover:invert-100 text-white"
                  alt="PDF"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-emerald-900 text-sm">
                  {doc.title}
                </span>
                <span className="text-xs text-gray-500">{owner}</span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-emerald-900 text-white flex items-center justify-center opacity-100 transition-opacity">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href={url}>
          <PrimaryButton
            label="View all Documents"
            icon={<Grip className="w-4 h-4" />}
            fullWidth
          />
        </Link>
      </div>
    </div>
  );
};
