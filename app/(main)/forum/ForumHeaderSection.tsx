import CustomBadge from "@/components/shared/SharedBadge";
import React from "react";

export const HeaderSection: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="mb-5">
      <div>
        <CustomBadge>{title}</CustomBadge>
      </div>
      <h1 className="text-primary-color text-3xl md:text-4xl lg:text-4xl font-bold leading-[1.15] tracking-tight max-w-6xl">
        {description}
      </h1>
    </div>
  );
};
