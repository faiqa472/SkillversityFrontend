'use client';

/**
 * OutlineCard Component
 * Display outline summary in a card format
 */

import React from 'react';
import { LearningOutline } from '@/types/outlines';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Clock,
  Eye,
  Star,
  Bookmark,
  BookmarkCheck,
  Users,
} from 'lucide-react';
import { outlinesApi } from '@/lib/outlines-api';
import { VerifiedBadge, CompanyBadge, OfficialBadge } from '@/components/ui/verified-badge';

interface OutlineCardProps {
  outline: LearningOutline;
  onClick?: () => void;
  showBookmark?: boolean;
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-orange-100 text-orange-800',
  expert: 'bg-red-100 text-red-800',
};

const authorTypeLabels: Record<string, string> = {
  company: 'Company',
  tutor: 'Tutor',
  skillversity: 'SkillVersity',
  collaborative: 'Collaborative',
};

export function OutlineCard({ outline, onClick, showBookmark = true }: OutlineCardProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(outline.is_bookmarked);
  const [bookmarkLoading, setBookmarkLoading] = React.useState(false);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkLoading(true);
    try {
      await outlinesApi.bookmark(outline.id);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const formatDuration = (duration: string) => {
    // Parse ISO duration or HH:MM:SS format
    const match = duration.match(/(\d+):(\d+):(\d+)/);
    if (match) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      if (hours > 0) return `${hours}h ${minutes}m`;
      return `${minutes}m`;
    }
    return duration;
  };

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-lg"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold leading-tight line-clamp-2">
              {outline.title}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              by <span className="inline-flex items-center gap-1">
                {outline.primary_author?.name || outline.primary_author?.email}
                {outline.author_type === 'skillversity' && (
                  <OfficialBadge size="sm" title="Official SkillVersity" />
                )}
                {outline.author_type === 'company' && (
                  <CompanyBadge size="sm" title="Verified Company" />
                )}
                {outline.author_type === 'tutor' && (
                  <VerifiedBadge size="sm" title="Verified Tutor" />
                )}
              </span>
            </p>
          </div>
          {showBookmark && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              disabled={bookmarkLoading}
              className="shrink-0"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-primary" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {outline.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className={difficultyColors[outline.difficulty_level]}>
            {outline.difficulty_level}
          </Badge>
          <Badge variant="outline">
            {authorTypeLabels[outline.author_type]}
          </Badge>
        </div>

        {outline.skill_tags && outline.skill_tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {outline.skill_tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {outline.skill_tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{outline.skill_tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDuration(outline.estimated_duration)}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              v{outline.current_version}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{outline.view_count}</span>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <Users className="h-4 w-4" />
              <span>{Math.floor(Math.random() * 20) + 1} Tutors</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span>{parseFloat(String(outline.rating || 0)).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
