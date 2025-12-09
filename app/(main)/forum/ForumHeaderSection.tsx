import CustomBadge from "@/components/shared/SharedBadge";
import React from "react";

export const HeaderSection: React.FC = () => {
  return (
    <div className="space-y-6 mb-8">
      <div>
        <CustomBadge>FORUM</CustomBadge>
      </div>
      <h1 className="text-primary-color text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight max-w-4xl">
        Join the village and start or contribute to ongoing discussions about
        Indigenous African Architecture
      </h1>
    </div>
  );
};
