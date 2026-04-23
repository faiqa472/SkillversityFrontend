import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface OutlineCardSkeletonProps {
    count?: number;
}

export function OutlineCardSkeleton({ count = 1 }: OutlineCardSkeletonProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="cursor-wait opacity-80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2 w-full">
                                <Skeleton className="h-6 w-3/4 bg-muted/40" />
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-12 bg-muted/30" />
                                    <Skeleton className="h-4 w-24 bg-muted/30" />
                                </div>
                            </div>
                            <Skeleton className="h-8 w-8 rounded-md bg-muted/30" />
                        </div>
                    </CardHeader>

                    <CardContent className="pb-3">
                        <div className="space-y-2 mb-4">
                            <Skeleton className="h-4 w-full bg-muted/20" />
                            <Skeleton className="h-4 w-5/6 bg-muted/20" />
                        </div>

                        <div className="flex gap-2 mb-3">
                            <Skeleton className="h-5 w-16 rounded-full bg-muted/30" />
                            <Skeleton className="h-5 w-20 rounded-full bg-muted/30" />
                        </div>

                        <div className="flex gap-1">
                            <Skeleton className="h-5 w-12 rounded-full bg-muted/20" />
                            <Skeleton className="h-5 w-14 rounded-full bg-muted/20" />
                            <Skeleton className="h-5 w-10 rounded-full bg-muted/20" />
                        </div>
                    </CardContent>

                    <CardFooter className="pt-0">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex gap-4">
                                <Skeleton className="h-4 w-12 bg-muted/30" />
                                <Skeleton className="h-4 w-12 bg-muted/30" />
                            </div>
                            <div className="flex gap-4">
                                <Skeleton className="h-4 w-8 bg-muted/30" />
                                <Skeleton className="h-4 w-10 bg-muted/30" />
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </>
    );
}
