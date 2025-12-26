"use client";
import CustomBadge from "@/components/shared/SharedBadge";
import { CommentsSection } from "@/components/sub_our_work/Comments";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Heart,
  Loader2,
  MessageSquare,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// --- Types ---

interface DiscussionPost {
  id: string;
  author: {
    name: string;
    joined: string;
    avatarUrl: string;
  };
  tag: string;
  title: string;
  intro: string[];
  questions: string[];
}

// --- Internal Components (Defined within App scope as requested) ---

// 1. Icon Wrapper for the Header Actions
const ActionButton = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors   ${
      active
        ? "text-green-700 bg-green-50 font-medium"
        : "text-gray-600 hover:text-green-800 hover:bg-gray-50"
    }`}
  >
    <div className="bg-emerald-900 rounded-full p-2">
      <Icon
        size={18}
        className={active ? "fill-current text-white" : " text-white"}
      />
    </div>
    <span className="text-xs sm:text-sm font-medium">{label}</span>
  </button>
);

// 2. The Header Component
const Header = ({ onClick }: { onClick: () => void }) => (
  <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 mb-2">
    <div className="flex items-center gap-3">
      <Button
        onClick={onClick}
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-color text-white hover:bg-green-900 transition-colors shadow-sm"
      >
        <ChevronLeft size={20} />
      </Button>
      <h1 className="text-lg sm:text-xl font-bold text-[#064E3B] tracking-tight">
        Ask a question/Start a New Discussions
      </h1>
    </div>

    <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
      <ActionButton icon={ThumbsUp} label="Like" />
      <ActionButton icon={ThumbsDown} label="Dislike" />
      <ActionButton icon={Heart} label="Save" />
      <ActionButton icon={Share2} label="Share" />
    </div>
  </header>
);

// 3. User Avatar Card Component
const UserProfileCard = ({ author }: { author: DiscussionPost["author"] }) => (
  <div className="flex-shrink-0 bg-white border border-green-600 rounded-lg p-3 w-full sm:w-40 flex flex-col items-center text-center shadow-sm">
    <div className="relative w-16 h-16 mb-2">
      <img
        src={author.avatarUrl}
        alt={author.name}
        className="w-full h-full object-cover rounded-full border-2 border-orange-200"
      />
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
    </div>
    <div className="text-xs font-bold text-gray-800 truncate w-full">
      {author.name}
    </div>
    <div className="text-[10px] text-gray-500 font-medium mt-0.5">
      {author.joined}
    </div>
  </div>
);

// 4. AI Response Component (Functional Integration)
const AIResponseSection = ({
  post,
  prompt,
}: {
  post: DiscussionPost;
  prompt: string;
}) => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = async () => {
    if (!process.env.API_KEY) {
      setError("API Key not configured in environment.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      //   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const fullPrompt = `
        You are a knowledgeable historian and architect specializing in African indigenous architecture.
        Please provide a thoughtful, educational response to the following discussion post. 
        Address the specific questions asked in the "Let's Talk About It" section.
        Keep the tone respectful, communal, and insightful.
        
        Topic: ${post.title}
        Context: ${post.intro.join(" ")}
        Questions: ${post.questions.join(" ")}
      `;

      // const result = await ai.models.generateContent({
      //   model: 'gemini-2.5-flash',
      //   contents: fullPrompt,
      // });

      //   setResponse(result.text);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-100 pt-6">
      {/* {!response && !loading && (
        <button 
          onClick={generateResponse}
          className="flex items-center gap-2 bg-gradient-to-r from-green-700 to-green-900 text-white px-5 py-2.5 rounded-lg shadow hover:shadow-md transition-all text-sm font-medium mx-auto sm:mx-0"
        >
          <Sparkles size={16} className="text-yellow-300" />
          Generate Expert Response with Gemini
        </button>
      )} */}

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 text-green-800">
          <Loader2 size={32} className="animate-spin mb-3" />
          <p className="text-sm font-medium">
            Consulting the digital archives...
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm mt-4">
          {error}
        </div>
      )}

      {response && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-green-100 rounded-md">
              <MessageSquare size={18} className="text-green-800" />
            </div>
            <h3 className="font-semibold text-gray-800">
              Community Insight (AI Generated)
            </h3>
          </div>
          <div className="prose prose-sm prose-green max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {response}
          </div>
          <button
            onClick={() => setResponse(null)}
            className="mt-4 text-xs text-gray-500 hover:text-green-700 underline"
          >
            Clear response
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

export default function page() {
  // Static data matching the image exactly
  const router = useRouter();
  const postData: DiscussionPost = {
    id: "1",
    author: {
      name: "Historyenjoyer822",
      joined: "Joined: Mar 2024",
      avatarUrl: "https://picsum.photos/id/64/200/200", // Using generic placeholder as requested
    },
    tag: "GENERAL DISCUSSION ON AFRICAN INDIGENOUS ARCHITECTURE",
    title: "How Did Your Community Traditionally Build Without Modern Tools?",
    intro: [
      "Before the age of cement mixers, bulldozers, and laser levels — our ancestors built cities, homes, palaces, and temples using nothing but their hands, wisdom, and locally available materials. From stone walls stacked without mortar to domed homes made from bundled saplings, the techniques they used were not only resourceful — they were genius.",
      "In today's world, we often look to digital tools and imported solutions for construction. But what about the tools that lived in the mind, the body, and the rhythm of the community?",
    ],
    questions: [
      "What materials did your community use — mud, thatch, stone, dung, reeds, bamboo?",
      "How were measurements done? Did they use the human body (arm lengths, strides) or tools like strings and sticks?",
      "Were there ceremonies before building? Who led the process — a builder, elder, or spiritual leader?",
      "What were some clever engineering solutions your ancestors developed (e.g., wind-resistant roofs, passive cooling)?",
      "How were the labour and roles divided? Was it communal? Gender-specific?",
    ],
  };

  return (
    <div className="min-h-screen bg-white text-gray-800  selection:bg-green-100 lg:px-0 px-4">
      <div className="max-w-7xl mx-auto ">
        {/* Top Hero Image - Using a landscape placeholder that mimics the aerial village view */}
        <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden mb-12 shadow-sm">
          <img
            src="/bg/Rectangle22.png"
            alt="Aerial view of African village architecture"
            className="w-full h-full object-cover transform hover:scale-101 transition-transform duration-700"
          />
        </div>

        {/* Header Section */}
        <Header onClick={() => router.back()} />

        {/* Main Content Card */}
        <div className="border border-green-600/30 rounded-4xl overflow-hidden shadow-sm bg-white">
          {/* Hero Section (Light Green Top) */}
          <div className="bg-[#efffd6] p-4 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {/* Left: User Profile */}
              <UserProfileCard author={postData.author} />

              {/* Right: Title & Badge */}
              <div className="flex-1 space-y-3 sm:space-y-4">
                <CustomBadge>{postData.tag}</CustomBadge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#064E3B] leading-tight">
                  {postData.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Body Content Section */}
          <div className="p-6 sm:p-10 md:px-12 md:py-10">
            <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
              {postData.intro.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-[#15803d] font-bold text-xl mb-4">
                Let's Talk About It:
              </h3>
              <ol className="space-y-3 text-gray-600 text-base sm:text-lg list-none pl-1">
                {postData.questions.map((q, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="font-medium text-gray-500 min-w-[1.5rem]">
                      {i + 1}.
                    </span>
                    <span className="leading-relaxed">{q}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Gemini Integration Section */}
            <AIResponseSection post={postData} prompt="" />
            {/* Bottom Pagination */}
          </div>
        </div>
        <div className="my-10">
          <CommentsSection />
        </div>
      </div>
    </div>
  );
}
