"use client";

import React from "react";
import { Play, Image as ImageIcon, Code, Layers } from "lucide-react";

interface SkeletonMediaProps {
    variant?: "video" | "image" | "code" | "series";
    className?: string;
}

const SkeletonMedia: React.FC<SkeletonMediaProps> = ({ variant = "image", className = "" }) => {
    return (
        <div className={`relative overflow-hidden bg-muted/30 ${className}`}>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-background/10 to-transparent skeleton-shimmer" />

            {/* Content based on variant */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                {variant === "video" && (
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center">
                            <Play className="w-5 h-5 ml-1 fill-current" />
                        </div>
                    </div>
                )}

                {variant === "image" && (
                    <ImageIcon className="w-10 h-10" />
                )}

                {variant === "code" && (
                    <div className="w-full h-full p-4 space-y-2 opacity-50">
                        <div className="w-1/3 h-2 bg-current rounded" />
                        <div className="w-2/3 h-2 bg-current rounded" />
                        <div className="w-1/2 h-2 bg-current rounded" />
                        <div className="w-3/4 h-2 bg-current rounded" />
                        <Code className="absolute bottom-4 right-4 w-6 h-6" />
                    </div>
                )}

                {variant === "series" && (
                    <div className="relative">
                        <Layers className="w-12 h-12" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-current rounded-full animate-ping" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkeletonMedia;
