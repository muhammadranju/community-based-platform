import React from "react";
import { Button } from "../ui/button";
// import Button from "./Button";

const ArchiveHeader: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-emerald-900hadow-sm mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-emerald-900  mb-8 tracking-tight">
        Contribute Photos, Videos & Documents To The Archive
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button
          variant="outline"
          className="px-8 py-2 h-auto text-sm font-semibold w-full sm:w-auto rounded-full border-secondary-color"
        >
          Submit Content
        </Button>

        <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none rounded-full px-6 py-2 h-auto border-gray-300 text-brand-dark hover:bg-gray-50 text-sm font-semibold"
          >
            Sign up
          </Button>
          <Button className="flex-1 sm:flex-none px-6 py-2 h-auto text-sm font-semibold shadow-none bg-amber-600 rounded-full hover:bg-amber-600/80">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveHeader;
