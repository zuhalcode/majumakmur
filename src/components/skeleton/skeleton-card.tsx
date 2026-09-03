import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  count?: number;
}

export function SkeletonCard({ count = 6 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            {/* Name + Actions */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-2/3" />

              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>

            {/* Value */}
            <Skeleton className="h-8 w-32" />

            {/* Description */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardHeader>
        </Card>
      ))}
    </>
  );
}
