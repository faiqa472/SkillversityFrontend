"use client";

import React from "react";
import Link from "next/link";
import {
  Code,
  Video,
  FileText,
  CheckCircle,
  Terminal,
  Play,
} from "lucide-react";

export type ContentUnitType =
  | "project"
  | "sandbox"
  | "video"
  | "article"
  | "quiz";

interface ContentUnitCardProps {
  id: string;
  type: ContentUnitType;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration?: string;
}

const TYPE_CONFIG = {
  project: {
    label: "Project",
    icon: Terminal,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    route: "interactive-project",
  },
  sandbox: {
    label: "Sandbox",
    icon: Code,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    route: "interactive-project",
  },
  video: {
    label: "Video",
    icon: Video,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    route: "course-series",
  }, // Fallback route
  article: {
    label: "Read",
    icon: FileText,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    route: "default",
  },
  quiz: {
    label: "Quiz",
    icon: CheckCircle,
    color: "text-green-500",
    bg: "bg-green-500/10",
    route: "default",
  },
};

const ContentUnitCard: React.FC<ContentUnitCardProps> = ({
  id,
  type,
  title,
  level,
  duration,
}) => {
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;

  return (
    <Link
      href={`/coming-soon/${config.route}?id=${id}`}
      className="block group"
    >
      <div className="flex items-start gap-4 p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors">
        {/* Icon Box */}
        <div
          className={`w-12 h-12 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`w-6 h-6 ${config.color}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${config.color}`}
            >
              {config.label}
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span className="text-xs text-muted-foreground">{level}</span>
          </div>

          <h4 className="font-semibold text-base leading-snug truncate group-hover:text-primary transition-colors">
            {title}
          </h4>

          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            {duration && (
              <span className="bg-muted px-1.5 py-0.5 rounded flex items-center gap-1">
                <Play className="w-2.5 h-2.5" /> {duration}
              </span>
            )}
            <span className="text-primary font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Start Now &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentUnitCard;
