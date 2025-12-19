import {
  Layers,
  Lightbulb,
  MessageSquareText,
  Redo2,
  User,
} from "lucide-react";

export const CommunityStatistics: React.FC = () => {
  const stats = [
    { icon: <Layers className="w-5 h-5" />, label: "15 Discussions" },
    { icon: <MessageSquareText className="w-5 h-5" />, label: "13.5 Topics" },
    { icon: <Redo2 className="w-5 h-5" />, label: "69.5k Posts" },
    { icon: <Lightbulb className="w-5 h-5" />, label: "9 Online" },
    { icon: <User className="w-5 h-5" />, label: "11.4k Members" },
  ];

  return (
    <div className="w-full border border-lime-500 hover:border-lime-700 rounded-3xl p-6 md:p-8 bg-white shadow-sm overflow-hidden mb-20">
      <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
        Community Statistics
      </h2>
      <div className="w-full h-px bg-gray-200 mb-6" />
      <div className="flex flex-wrap items-center justify-between gap-6 md:gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 text-emerald-900 font-medium transition-colors hover:text-emerald-700"
          >
            <div className="text-emerald-800">{stat.icon}</div>
            <span className="text-sm md:text-base whitespace-nowrap">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
