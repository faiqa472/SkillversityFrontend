"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonMedia from "@/components/ui/skeleton-media";
import { cn } from "@/lib/utils";

interface TrackCardSkeletonProps {
  count?: number;
  variant?: "default" | "compact";
}

function SingleTrackCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" }) {
  const isCompact = variant === "compact";

  return (
    <Card className={cn("overflow-hidden", isCompact && "p-3")}>
      <CardHeader className={cn("pb-3", isCompact && "p-0 pb-2")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            {/* Animated Icon Placeholder */}
            <SkeletonMedia variant="image" className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </CardHeader>

      <CardContent className={cn("pt-0", isCompact && "p-0")}>
        {/* Description */}
        {!isCompact && (
          <div className="space-y-1.5 mb-3">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Service Providers */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-14" />
        </div>

        {/* Author */}
        {!isCompact && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function TrackCardSkeleton({ count = 1, variant = "default" }: TrackCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SingleTrackCardSkeleton key={i} variant={variant} />
      ))}
    </>
  );
}
