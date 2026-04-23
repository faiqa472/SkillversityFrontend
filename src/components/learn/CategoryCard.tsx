"use client";

import React, { useState } from "react";
import { ArrowRight, Star, Users, BookOpen, Clock } from "lucide-react";
import ComingSoonModal from "../shared/ComingSoonModal";

export interface CategoryItem {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    studentCount?: string;
    courseCount?: string;
    duration?: string;
    isNew?: boolean;
    isPopular?: boolean;
    tags: string[];
}

interface CategoryCardProps {
    item: CategoryItem;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div
                className="group relative h-full bg-card border border-border/50 hover:border-primary/50 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden"
                onClick={() => setIsModalOpen(true)}
            >
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                    {item.isNew && (
                        <span className="px-2 py-1 text-xs font-medium text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-full animate-in fade-in">
                            New
                        </span>
                    )}
                    {item.isPopular && (
                        <span className="px-2 py-1 text-xs font-medium text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> Popular
                        </span>
                    )}
                </div>

                {/* Icon */}
                <div className="relative mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-2 mb-4">
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                    </p>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                    {item.studentCount && (
                        <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            <span>{item.studentCount} Students</span>
                        </div>
                    )}
                    {item.courseCount && (
                        <div className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{item.courseCount} Courses</span>
                        </div>
                    )}
                    {item.duration && (
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{item.duration}</span>
                        </div>
                    )}
                </div>

                {/* Action Indicator */}
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore Now <ArrowRight className="w-4 h-4 ml-1" />
                </div>
            </div>

            <ComingSoonModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                featureName={item.title}
            />
        </>
    );
};

export default CategoryCard;
