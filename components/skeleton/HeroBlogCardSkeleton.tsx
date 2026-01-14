import { Skeleton } from "@/components/ui/skeleton";

export default function HeroBlogCardSkeleton({
  limit = 3,
}: {
  limit?: number;
}) {
  return (
    <>
      {Array.from({ length: limit }, (_, index) => (
        <div className="relative h-[500px] md:h-[650px] rounded-3xl overflow-hidden shrink-0 lg:w-[500px] w-[400px] snap-center">
          {/* Image placeholder */}
          <Skeleton className="absolute inset-0 w-full h-full " />

          {/* Gradient overlay placeholder */}
          <div className="absolute bottom-0 left-0 w-full h-3/4">
            <Skeleton className="w-full h-full opacity-80" />
          </div>

          {/* Content area */}
          <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full z-10 space-y-5">
            {/* Title */}
            <Skeleton className="h-10 w-4/5 rounded" />
            <Skeleton className="h-10 w-3/4 rounded" />

            {/* Description lines */}
            <div className="space-y-3 pt-3">
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-5/6 rounded" />
              <Skeleton className="h-5 w-4/6 rounded" />
            </div>

            {/* Button */}
            <Skeleton className="mt-6 h-11 w-36 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}
