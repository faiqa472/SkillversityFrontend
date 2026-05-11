"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LearningTrack } from "@/types/tracks";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  Building2,
  GraduationCap,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TrackCardProps {
  track: LearningTrack;
  onClick?: () => void;
  onFollow?: () => void;
  variant?: "default" | "compact";
}

const difficultyColors: Record<string, string> = {
  beginner:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  intermediate:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  expert: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  all: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
};

const trackTypeIcons: Record<string, React.ReactNode> = {
  official: <Building2 className="h-3 w-3" />,
  tutor: <GraduationCap className="h-3 w-3" />,
  community: <Globe className="h-3 w-3" />,
  skillversity: <CheckCircle className="h-3 w-3" />,
};

const trackTypeLabels: Record<string, string> = {
  official: "Official",
  tutor: "Tutor",
  community: "Community",
  skillversity: "Curated",
};

export function TrackCard({
  track,
  onClick,
  onFollow,
  variant = "default",
}: TrackCardProps) {
  const isCompact = variant === "compact";

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all hover:shadow-lg hover:border-primary/50",
        isCompact && "p-3",
      )}
      onClick={onClick}
    >
      <CardHeader className={cn("pb-3", isCompact && "p-0 pb-2")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Technology Icon Placeholder */}
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
              {track.primary_technology?.icon_url ? (
                <img
                  src={track.primary_technology.icon_url}
                  alt={track.primary_technology.name}
                  className="h-6 w-6 object-contain"
                />
              ) : (
                <BookOpen className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                {track.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {trackTypeIcons[track.track_type]}
                <span>{trackTypeLabels[track.track_type]}</span>
                {track.is_verified_source && (
                  <CheckCircle className="h-3 w-3 text-blue-500" />
                )}
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={e => {
              e.stopPropagation();
              onFollow?.();
            }}
          >
            {track.is_following ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className={cn("pt-0", isCompact && "p-0")}>
        {/* Description */}
        {!isCompact && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {track.short_description || track.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge
            className={cn("text-xs", difficultyColors[track.difficulty_level])}
          >
            {track.difficulty_level}
          </Badge>
          {track.primary_technology && (
            <Badge variant="outline" className="text-xs">
              {track.primary_technology.name}
            </Badge>
          )}
          {track.is_open_path && (
            <Badge variant="secondary" className="text-xs">
              Open Path
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>
              {track.estimated_duration_weeks > 0
                ? `${track.estimated_duration_weeks}w`
                : `${track.estimated_duration_hours}h`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{track.followers_count.toLocaleString()}</span>
          </div>
          {track.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span>{Number(track.rating).toFixed(1)}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{track.modules_count} modules</span>
          </div>
        </div>

        {/* Service Providers Info */}
        {(track.tutors_offering_count > 0 ||
          track.companies_hiring_count > 0) && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t text-xs">
            {track.tutors_offering_count > 0 && (
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>{track.tutors_offering_count} tutors</span>
              </div>
            )}
            {track.companies_hiring_count > 0 && (
              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <Building2 className="h-3.5 w-3.5" />
                <span>{track.companies_hiring_count} hiring</span>
              </div>
            )}
          </div>
        )}

        {/* Progress Bar (if following) */}
        {track.user_progress && track.user_progress.progress_percentage > 0 && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Your Progress</span>
              <span className="font-medium">
                {track.user_progress.progress_percentage}%
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${track.user_progress.progress_percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Author */}
        {!isCompact && track.author && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {track.author.first_name?.[0]}
                {track.author.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {track.organization_name ||
                `${track.author.first_name} ${track.author.last_name}`}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
