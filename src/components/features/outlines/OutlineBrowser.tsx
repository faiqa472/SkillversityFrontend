'use client';

/**
 * OutlineBrowser Component
 * Browse and search learning outlines with filters
 */

import React, { useState, useEffect } from 'react';
import { useOutlines } from '@/hooks/useOutlines';
import { OutlineSearchParams, AuthorType, DifficultyLevel } from '@/types/outlines';
import { OutlineCard } from './OutlineCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Loader2 } from 'lucide-react';

interface OutlineBrowserProps {
  onSelectOutline?: (outlineId: string) => void;
  skillTag?: string;
  jobRole?: string;
  className?: string;
}

export function OutlineBrowser({ onSelectOutline, skillTag, jobRole, className }: OutlineBrowserProps) {
  const [searchParams, setSearchParams] = useState<OutlineSearchParams>({
    skill_tags: skillTag ? [skillTag] : undefined,
    job_role: jobRole,
  });
  const [searchInput, setSearchInput] = useState('');
  const { outlines, loading, error, totalCount } = useOutlines(searchParams);

  useEffect(() => {
    setSearchParams(prev => ({
      ...prev,
      skill_tags: skillTag ? [skillTag] : undefined,
      job_role: jobRole,
      page: 1,
    }));
  }, [skillTag, jobRole]);

  const handleSearch = () => {
    setSearchParams(prev => ({ ...prev, search: searchInput, page: 1 }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAuthorTypeChange = (value: string) => {
    setSearchParams(prev => ({
      ...prev,
      author_type: value === 'all' ? undefined : value as AuthorType,
      page: 1,
    }));
  };

  const handleDifficultyChange = (value: string) => {
    setSearchParams(prev => ({
      ...prev,
      difficulty_level: value === 'all' ? undefined : value as DifficultyLevel,
      page: 1,
    }));
  };

  const handleOrderingChange = (value: string) => {
    setSearchParams(prev => ({ ...prev, ordering: value, page: 1 }));
  };

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search outlines..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} variant="secondary">
          Search
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select onValueChange={handleAuthorTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Author Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="tutor">Tutor</SelectItem>
            <SelectItem value="skillversity">SkillVersity</SelectItem>
            <SelectItem value="collaborative">Collaborative</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={handleDifficultyChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={handleOrderingChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-created_at">Newest</SelectItem>
            <SelectItem value="created_at">Oldest</SelectItem>
            <SelectItem value="-rating">Highest Rated</SelectItem>
            <SelectItem value="-view_count">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {totalCount} outline{totalCount !== 1 ? 's' : ''} found
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Outline Grid */}
      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {outlines.map((outline) => (
            <OutlineCard
              key={outline.id}
              outline={outline}
              onClick={() => onSelectOutline?.(outline.id) || window.location.assign(`/learning-paths/${outline.id}`)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && outlines.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Filter className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No outlines found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
