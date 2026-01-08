import { SectionData } from "@/types/types";
import React from "react";
import SharedButton from "../shared/SharedButton";
import TimelineStep from "./TimelineStep";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProcessCardProps {
  data: SectionData;
  link: string;
  buttonText: string;
}

const ProcessCard: React.FC<ProcessCardProps> = ({
  data,
  link,
  buttonText,
}) => {
  const router = useRouter();
  return (
    <div className="bg-accent-bg lg:rounded-[2.5rem] rounded-[1rem] p-6 md:p-10  w-full h-full flex flex-col">
      {/* Header of the Card */}
      <div className="flex  md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <h2 className="text-xl md:text-3xl font-bold text-emerald-900  tracking-tight">
          {data.title}
        </h2>
        <Link href={link}>
          <SharedButton>{buttonText}</SharedButton>
        </Link>

        <button
          onClick={() => router.push(link)}
          className="px-4  py-3 font-semibold rounded-full text-sm w-[200px]  bg-amber-600 text-white hover:bg-amber-600/80 cursor-pointer lg:hidden"
        >
          {buttonText}
        </button>
      </div>

      {/* Timeline Steps */}
      <div className="flex-1 ">
        {data.steps.map((step, index) => (
          <TimelineStep
            key={step.id}
            step={step}
            isLast={index === data.steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessCard;
