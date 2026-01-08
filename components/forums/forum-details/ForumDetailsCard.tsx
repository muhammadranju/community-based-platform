import Link from "next/link";
import parse from "html-react-parser";
export interface DiscussionData {
  id: number;
  title: string;
  description: string;
  posts: string;
  views: string;
  lastUpdated: string;
  type: string;
  updatedBy?: string;
  variant: "blue" | "green" | "purple" | "red" | "gold" | "orange";
  iconType:
    | "introductions"
    | "cultural"
    | "rebuilding"
    | "materials"
    | "interactive"
    | "community";
  link?: string;
  slug?: string;
}
export const ForumDetailsCard = ({
  data,
  link,
  slug,
}: {
  data: DiscussionData;
  link: string;
  slug: string;
}) => {
  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 shadow-sm p-5 md:p-6 mb-4`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        {/* Icon Section */}
        <div className="shrink-0">
          <div
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white border-6 ${
              data.type === "introductions"
                ? "border-blue-900"
                : data.type === "cultural"
                ? "border-green-900"
                : data.type === "rebuilding"
                ? "border-purple-900"
                : data.type === "materials"
                ? "border-red-900"
                : data.type === "interactive"
                ? "border-purple-900"
                : "border-orange-900"
            } p-2`}
          >
            {data.type === "introductions" ? (
              <img src="/Icons/Introductions.png" alt="" />
            ) : data.type === "cultural" ? (
              <img src="/Icons/Cultural.png" alt="" />
            ) : data.type === "rebuilding" ? (
              <img src="/Icons/Rebuilding.png" alt="" />
            ) : data.type === "materials" ? (
              <img src="/Icons/Materials.png" alt="" />
            ) : data.type === "interactive" ? (
              <img src="/Icons/Interactive.png" alt="" />
            ) : (
              <img src="/Icons/Community.png" alt="" />
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="grow min-w-0 pr-4">
          <Link href={`/forum/${link}/${slug}`}>
            <h3
              className={`text-lg md:text-xl font-bold ${
                data.type === "introductions"
                  ? "text-blue-900"
                  : data.type === "cultural"
                  ? "text-green-900"
                  : data.type === "rebuilding"
                  ? "text-purple-900"
                  : data.type === "materials"
                  ? "text-red-900"
                  : data.type === "interactive"
                  ? "text-gold-900"
                  : "text-orange-900"
              } mb-2 leading-tight hover:underline cursor-pointer`}
            >
              {data.title}
            </h3>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            {parse(
              data.description.length > 100
                ? data.description.substring(0, 100) + "..."
                : data.description
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
