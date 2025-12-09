import React from "react";
import { User, Upload, Activity, Flag } from "lucide-react";
import { STATS_CARDS } from "../constants";

const IconMap: Record<string, any> = {
  user: User,
  upload: Upload,
  activity: Activity,
  flag: Flag,
};

export const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {STATS_CARDS.map((stat, index) => {
        const Icon = IconMap[stat.icon];

        return (
          <div
            key={index}
            className={`
              group p-6 rounded-2xl border bg-gray-200 text-primary-color 
              border-primary-color transition-all duration-300 h-36 
              flex flex-col justify-between relative overflow-hidden
              hover:bg-primary-color hover:text-white hover:border-primary-color
              hover:shadow-lg cursor-pointer
            `}
          >
            {/* Top-right icon container */}
            <div className="flex justify-between items-start">
              <div
                className={`
                  p-2 rounded-full border transition-all duration-300
                  group-hover:border-white/20
                  border-primary-color/20
                `}
              >
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className="transition-colors duration-300 text-primary-color group-hover:text-white"
                />
              </div>
            </div>

            {/* Label & Value */}
            <div>
              <p className="text-sm font-medium mb-1 text-gray-600 group-hover:text-gray-300 transition-colors duration-300">
                {stat.label}
              </p>
              <h3 className="text-3xl font-bold tracking-tight transition-colors duration-300">
                {stat.value}
              </h3>
            </div>

            {/* Optional: subtle shine effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
};
