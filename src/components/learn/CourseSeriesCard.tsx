"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  Clock,
  Award,
  ChevronRight,
  Play,
  FileText,
  Code,
  Terminal,
  CheckCircle,
  Users,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { OfficialBadge, CompanyBadge } from "@/components/ui/verified-badge";
import SkeletonMedia from "@/components/ui/skeleton-media";

export interface CourseSeriesProps {
  id: string;
  title: string;
  provider: {
    name: string;
    type: "platform" | "company" | "university";
    logo?: string;
  };
  courseCount: number;
  duration: string;
  level: string;
  skills: string[];
  includes: string[]; // List of feature keys like 'video', 'project', 'capstone'
}

// Map feature keys to Icons and Labels
const FEATURE_MAP: Record<string, any> = {
  video: {
    label: "Videos",
    icon: Play,
    color: "text-rose-500",
    route: "course-series",
  },
  reading: {
    label: "Readings",
    icon: FileText,
    color: "text-amber-500",
    route: "default",
  },
  sandbox: {
    label: "Sandboxes",
    icon: Code,
    color: "text-blue-500",
    route: "interactive-project",
  },
  project: {
    label: "Projects",
    icon: Terminal,
    color: "text-purple-500",
    route: "interactive-project",
  },
  quiz: {
    label: "Quizzes",
    icon: CheckCircle,
    color: "text-green-500",
    route: "assessment",
  },
  capstone: {
    label: "Capstone",
    icon: Award,
    color: "text-orange-500",
    route: "capstone",
  },
  community: {
    label: "Community",
    icon: Users,
    color: "text-indigo-500",
    route: "community",
  },
  feedback: {
    label: "Feedback",
    icon: MessageSquare,
    color: "text-pink-500",
    route: "feedback",
  },
};

const CourseSeriesCard: React.FC<CourseSeriesProps> = ({
  id,
  title,
  provider,
  courseCount,
  duration,
  level,
  skills,
  includes = ["video", "reading", "quiz", "project"], // Default set
}) => {
  return (
    <div className="h-full flex flex-col bg-card border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      {/* Media Preview (Skeleton Media) */}
      <div className="relative h-32 w-full">
        <SkeletonMedia variant="series" className="h-full w-full" />
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-background/90 px-2 py-1 rounded shadow-sm">
            <Award className="w-3 h-3 text-yellow-500" />
            Certificate
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col space-y-4">
        {/* Title & Provider */}
        <div className="space-y-2">
          <Link href={`/coming-soon/course-series?id=${id}`} className="block">
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm text-muted-foreground">
              {provider.name}
            </span>
            {provider.type === "platform" && <OfficialBadge size="sm" />}
            {provider.type === "company" && <CompanyBadge size="sm" />}
            <Badge
              variant="outline"
              className="text-xs uppercase tracking-wide"
            >
              {level}
            </Badge>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 3).map(skill => (
            <span
              key={skill}
              className="px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-muted text-muted-foreground rounded"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Ecosystem Features (The 'Includes' section) */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            Includes
          </p>
          <div className="flex flex-wrap gap-2">
            {includes.slice(0, 5).map(key => {
              const feature = FEATURE_MAP[key];
              if (!feature) return null;
              const Icon = feature.icon;
              return (
                <Link key={key} href={`/coming-soon/${feature.route}?id=${id}`}>
                  <div
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                    title={feature.label}
                  >
                    <Icon className={`w-3.5 h-3.5 ${feature.color}`} />
                    {/* Show label only on larger screens or tooltip? Keeping it minimal icon-first for now but accessible */}
                  </div>
                </Link>
              );
            })}
            {includes.length > 5 && (
              <span className="text-xs text-muted-foreground self-center">
                +{includes.length - 5} more
              </span>
            )}
          </div>
        </div>

        <div className="flex-1" />

        {/* Footer Meta */}
        <div className="pt-4 mt-2 border-t flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> {courseCount} Courses
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {duration}
            </span>
          </div>
          <Link href={`/coming-soon/course-series?id=${id}`}>
            <span className="flex items-center text-primary font-medium text-xs uppercase tracking-wide group-hover:underline">
              View Series <ChevronRight className="w-3 h-3 ml-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseSeriesCard;
