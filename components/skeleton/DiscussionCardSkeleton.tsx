import { Skeleton } from "@/components/ui/skeleton";

export default function DiscussionCardSkeleton({
  limit = 6,
}: {
  limit?: number;
}) {
  return (
    <>
      {Array.from({ length: limit }).map((_, i) => (
        <div key={i} className="flex items-start gap-4 rounded-lg border p-5">
          {/* Avatar / Icon circle */}
          <Skeleton className="h-12 w-12 rounded-full shrink-0" />

          <div className="flex-1 space-y-3">
            {/* Title */}
            <Skeleton className="h-7 w-3/4 rounded" />

            {/* Description lines */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
            </div>
          </div>

          {/* Right-side stats column */}
          <div className="flex flex-col items-end gap-4 text-right min-w-[140px]">
            <div className="flex gap-6 justify-end">
              <Skeleton className="h-5 w-10 rounded" /> {/* POSTS */}
              <Skeleton className="h-5 w-12 rounded" /> {/* VIEWS */}
              <Skeleton className="h-5 w-20 rounded" /> {/* LAST UPDATED */}
            </div>
            <Skeleton className="h-4 w-24 rounded" /> {/* actual date value */}
          </div>
        </div>
      ))}
    </>
  );
}
