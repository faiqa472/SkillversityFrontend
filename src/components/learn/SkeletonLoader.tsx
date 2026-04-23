import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SeriesSkeleton = () => {
    return (
        <div className="h-full rounded-xl border p-5 space-y-4">
            <div className="flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="flex gap-2 pt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
            </div>
            <div className="pt-8 flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
            </div>
        </div>
    );
};

export const UnitSkeleton = () => {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl border">
            <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>
    );
};

const SkeletonLoader: React.FC = () => {
    return (
        <div className="w-full h-full min-h-[280px] rounded-xl border border-border/50 bg-card p-5 space-y-4 overflow-hidden relative">
            <div className="skeleton-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-muted/10 to-transparent" />
            <div className="w-12 h-12 rounded-lg bg-muted/40" />
            <div className="flex justify-between items-start pt-2">
                <div className="h-6 w-2/3 bg-muted/40 rounded" />
                <div className="h-5 w-16 bg-muted/30 rounded-full" />
            </div>
            <div className="space-y-2 pt-1">
                <div className="h-4 w-full bg-muted/30 rounded" />
                <div className="h-4 w-5/6 bg-muted/30 rounded" />
            </div>
            <div className="flex items-center gap-4 pt-4 mt-auto">
                <div className="h-4 w-20 bg-muted/30 rounded" />
                <div className="h-4 w-20 bg-muted/30 rounded" />
            </div>
            <div className="pt-4 mt-auto">
                <div className="h-9 w-full bg-muted/20 rounded-lg" />
            </div>
        </div>
    );
};

export default SkeletonLoader;
