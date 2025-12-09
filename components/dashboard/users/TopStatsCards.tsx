import { CircleDot, Flag, Upload, User } from "lucide-react";
import React from "react";

function TopStatsCards() {
  return (
    <>
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Users */}
        <div className="bg-[#e4ede4] p-6 rounded-2xl flex flex-col justify-between h-40 border border-teal-900/5">
          <div className="flex justify-between items-start">
            <div className="p-2 border border-teal-900 rounded-lg text-teal-900">
              <User size={24} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <p className="text-teal-900 font-bold mb-1">Total users</p>
            <h3 className="text-4xl font-bold text-teal-900">3.2K</h3>
          </div>
        </div>

        {/* Card 2: Total Uploads (Dark) */}
        <div className="bg-[#042f2e] p-6 rounded-2xl flex flex-col justify-between h-40 border border-teal-900 shadow-md">
          <div className="flex justify-between items-start">
            <div className="p-2 border border-white/20 rounded-lg text-white">
              <Upload size={24} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <p className="text-white font-bold mb-1">Total Uploads</p>
            <h3 className="text-4xl font-bold text-white">1.2K</h3>
          </div>
        </div>

        {/* Card 3: Active (30d) */}
        <div className="bg-[#e4ede4] p-6 rounded-2xl flex flex-col justify-between h-40 border border-teal-900/5">
          <div className="flex justify-between items-start">
            <div className="p-2 border border-teal-900 rounded-lg text-teal-900">
              <CircleDot size={24} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <p className="text-teal-900 font-bold mb-1">Active (30d)</p>
            <h3 className="text-4xl font-bold text-teal-900">1.3K</h3>
          </div>
        </div>

        {/* Card 4: Flagged Items */}
        <div className="bg-[#e4ede4] p-6 rounded-2xl flex flex-col justify-between h-40 border border-teal-900/5">
          <div className="flex justify-between items-start">
            <div className="p-2 border border-teal-900 rounded-lg text-teal-900">
              <Flag size={24} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <p className="text-teal-900 font-bold mb-1">Flagged Items</p>
            <h3 className="text-4xl font-bold text-teal-900">79</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopStatsCards;
