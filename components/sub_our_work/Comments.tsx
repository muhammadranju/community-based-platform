import {
  ArrowRight,
  ArrowUp,
  Bold,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileText,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  MessageCircle,
  Paperclip,
  PlayCircle,
  Smile,
  Underline,
  Video,
  Youtube,
} from "lucide-react";
import { createRoot } from "react-dom/client";
import { Button } from "../ui/button";

// --- Types ---
interface User {
  name: string;
  avatar: string;
  joined: string;
}

interface Attachment {
  type: "image" | "video" | "file";
  url?: string;
  thumbnail?: string;
  title?: string; // For files or videos
  meta?: string; // e.g. "100 Pages"
}

interface CommentData {
  id: number;
  user: User;
  handle: string;
  title?: string;
  content: string;
  likes: number;
  replies: number;
  attachments?: Attachment[];
}

// --- Mock Data ---
const COMMENTS: CommentData[] = [
  {
    id: 1,
    user: {
      name: "Historyenjoyer822",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80",
      joined: "Mar 2024",
    },
    handle: "@ArchitectureAddict",
    content:
      "As an architecture student, I'm honestly blown away by how sustainable and functional this is. No machines, no cement—just pure skill and harmony with the land.",
    likes: 942,
    replies: 23,
  },
  {
    id: 2,
    user: {
      name: "Historyenjoyer822",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      joined: "Mar 2024",
    },
    handle: "@CoastalBuilderMombasa",
    title: "Swahili Coral-Rag Housecraft",
    content:
      "Growing up on the coast, our elders taught us to quarry coral rag at low tide, let it \"set,\" then saw and chisel while it's still workable. Walls are thick, lime-plastered, and the layout wraps around a private courtyard for airflow and privacy. Classic doors aren't just decoration—they signal household identity and craft lineage. (Coral-rag + lime plaster practice is widely documented for Stone Town/Lamu.)",
    likes: 942,
    replies: 23,
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1764377725021-33bba9d00944?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1764377725021-33bba9d00944?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1764377725021-33bba9d00944?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    id: 3,
    user: {
      name: "Historyenjoyer822",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      joined: "Mar 2024",
    },
    handle: "@TravelWithLola",
    content:
      'I used to think Maasai homes were "simple" until I saw how intentional every detail is. So much respect.',
    likes: 504,
    replies: 9,
  },
  {
    id: 4,
    user: {
      name: "Historyenjoyer822",
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      joined: "Mar 2024",
    },
    handle: "@FieldResearcherAddis",
    title: "Sidama bamboo houses (Southern Ethiopia)",
    content:
      "In Sidama, builders lash a central post and radiate flexible members, weaving bamboo into a dense lattice. The \"onion-dome\" silhouette sheds rain, and the breathable skin balances humidity. Research highlights bamboo's sustainability and the typology's adaptability for modern, low-cost housing when detailed properly. Traditional Architecture JournalClaisse",
    likes: 942,
    replies: 23,
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1764591696226-ea4e8d655bc7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        type: "video",
        thumbnail:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1159&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Sidama House construction",
      },
    ],
  },
  {
    id: 5,
    user: {
      name: "Historyenjoyer822",
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      joined: "Mar 2024",
    },
    handle: "@FieldResearcherAddis",
    content:
      "Here are the detailed references and case studies mentioned above regarding the Ethiopian Vernacular Bamboo Architecture.",
    likes: 942,
    replies: 23,
    attachments: [
      {
        type: "file",
        title: "Modern Sidama",
        meta: "100 Pages",
        thumbnail:
          "https://f002.backblazeb2.com/file/moz-static/blog/images/pdf-icon-preview.png",
      },
      {
        type: "file",
        title: "Sidama Nation",
        meta: "20 Pages",
        thumbnail:
          "https://f002.backblazeb2.com/file/moz-static/blog/images/pdf-icon-preview.png",
      },
      {
        type: "file",
        title: "Sidama Home",
        meta: "20 Pages",
        thumbnail:
          "https://f002.backblazeb2.com/file/moz-static/blog/images/pdf-icon-preview.png",
      },
    ],
  },
];

// --- Components ---

const Pagination = () => {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-primary-color transition-colors">
        <ChevronLeft size={20} />
      </button>

      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-highlight bg-lime-50 text-primary font-medium flex items-center justify-center">
        1
      </button>
      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center hover:bg-gray-50">
        2
      </button>
      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center hover:bg-gray-50">
        3
      </button>
      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center hover:bg-gray-50">
        4
      </button>

      <div className="text-gray-400 font-bold px-1 text-lg">...</div>

      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center hover:bg-gray-50">
        21
      </button>

      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-primary-color transition-colors">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

const FileCard = ({ file }: { file: Attachment }) => (
  <div className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col group cursor-pointer">
    <div className="h-48 overflow-hidden bg-gray-50 relative p-4 flex items-center justify-center border-b">
      {/* Simulate PDF Preview */}
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

const VideoCard = ({ video }: { video: Attachment }) => (
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

const CommentItem = ({ comment }: { comment: CommentData }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* User Sidebar */}
      <div className="shrink-0 md:w-48 ">
        <div className="border border-emerald-900 rounded-xl p-4 flex flex-row md:flex-col items-center  gap-3 md:gap-4 bg-white h-full md:h-auto">
          <img
            src={comment.user.avatar}
            alt={comment.user.name}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-emerald-900 text-sm md:text-base">
              {comment.user.name}
            </h3>
            <p className="text-xs text-emerald-900 mt-0.5">
              <span className="font-medium">Joined:</span> {comment.user.joined}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0">
        <div className="mb-1">
          <span className="text-emerald-900 font-medium text-sm md:text-base">
            {comment.handle}
          </span>
        </div>

        {comment.title && (
          <h4 className="font-bold text-emerald-900 text-base md:text-lg mb-2">
            {comment.title}
          </h4>
        )}

        <p className="text-emerald-900 text-sm md:text-base leading-relaxed mb-4">
          {comment.content}
        </p>

        {/* Attachments */}
        {comment.attachments && comment.attachments.length > 0 && (
          <div
            className={`mb-4 grid gap-4 ${
              comment.attachments[0].type === "file"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : comment.attachments.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3"
            }`}
          >
            {comment.attachments.map((att, idx) => {
              if (att.type === "file") return <FileCard key={idx} file={att} />;
              if (att.type === "video")
                return <VideoCard key={idx} video={att} />;
              return (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden aspect-4/3 sm:aspect-square relative"
                >
                  <img
                    src={att.url}
                    alt="Attachment"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 text-emerald-900 text-sm">
          <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <div className="bg-blue-50 p-1 rounded text-primary">
              <ArrowUp size={16} fill="currentColor" className="text-primary" />
            </div>
            <span>{comment.likes} likes</span>
          </button>
          <div className="h-4 w-px bg-gray-300"></div>
          <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <MessageCircle size={18} />
            <span>{comment.replies} replies</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const CommentsSection = () => {
  return (
    <div className="flex justify-center  mb-10">
      <div className="w-full  border-2 border-emerald-900 rounded-3xl p-4 sm:p-8 md:p-12 shadow-sm relative overflow-hidden">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle
              size={32}
              className="text-emerald-900"
              strokeWidth={2.5}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 tracking-tight">
              Comment
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="save-info"
              className="rounded border-gray-300 text-emerald-900 focus:ring-emerald-900 w-4 h-4"
            />
            <label
              htmlFor="save-info"
              className="text-sm text-emerald-900 font-medium"
            >
              Save my name email and website
            </label>
          </div>
        </div>

        {/* Input Area */}
        <div className="mb-12">
          <div className="border border-emerald-900 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-900/20 transition-all">
            <textarea
              className="w-full p-4 min-h-[140px] resize-none outline-none text-gray-700 placeholder:text-gray-400"
              placeholder="Write your message here"
            ></textarea>

            {/* Toolbar */}
            <div className="bg-white border-t border-emerald-900 p-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-500">
                <div className="flex items-center gap-2">
                  <button className="hover:text-primary p-1">
                    <Bold size={16} />
                  </button>
                  <button className="hover:text-primary p-1">
                    <Italic size={16} />
                  </button>
                  <button className="hover:text-primary p-1">
                    <Underline size={16} />
                  </button>
                </div>
                <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <button className="hover:text-primary p-1">
                    <LinkIcon size={16} />
                  </button>
                  <button className="hover:text-primary p-1">
                    <ImageIcon size={16} />
                  </button>
                  <button className="hover:text-primary p-1">
                    <Video size={16} />
                  </button>
                </div>
                <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <button className="hover:text-primary p-1">
                    <Smile size={16} />
                  </button>
                  <button className="hover:text-primary p-1">
                    <List size={16} />
                  </button>
                </div>
                <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>
                <button className="hover:text-emerald-900 p-1 flex items-center gap-1 text-xs sm:text-sm font-medium">
                  <Paperclip size={16} /> Attach File
                </button>
              </div>

              <Button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-600/80 text-white font-medium px-6 py-2.5 rounded-full transition-colors shadow-sm">
                Post Comment
              </Button>
            </div>
          </div>
        </div>

        {/* Comments Count & Pagination Top */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">
            2,342 Comments
          </h2>
          <Pagination />
        </div>

        {/* Comments List */}
        <div className="space-y-10">
          {COMMENTS.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>

        {/* Bottom Pagination */}
        <div className="mt-12 flex justify-center md:justify-end">
          <Pagination />
        </div>
      </div>
    </div>
  );
};
