import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PopularContentCardSkeleton({
  limit = 9,
}: {
  limit?: number;
}) {
  return Array.from({ length: limit }, (_, index) => (
    <Card className="h-full flex flex-col ">
      <CardHeader className="pb-4 ">
        <Skeleton className="h-7 w-3/4 bg-gray-100" />
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <Skeleton className="h-4 w-full bg-gray-100" />
        <Skeleton className="h-4 w-full bg-gray-100" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>

      <CardFooter className="pt-4 flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-7 w-32 rounded-full" />
        </div>

        <Skeleton className="h-9 w-24 rounded-full" />
      </CardFooter>
    </Card>
  ));
}
