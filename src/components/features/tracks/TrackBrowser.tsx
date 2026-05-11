"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrackCard } from "./TrackCard";
import { TrackCardSkeleton } from "./TrackCardSkeleton";
import { TechnologySelect } from "./filters/TechnologySelect";
import { useTracks } from "@/hooks/useTracks";
import { tracksApi } from "@/lib/tracks-api";
import { TrackSearchParams, TrackType, TrackDifficulty } from "@/types/tracks";
import {
  Search,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Building2,
  GraduationCap,
  Globe,
  CheckCircle,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TrackBrowserProps {
  onSelectTrack?: (slug: string) => void;
  initialFilters?: Partial<TrackSearchParams>;
}

const trackTypeOptions = [
  { value: "all", label: "All Types", icon: null },
  {
    value: "official",
    label: "Official",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    value: "tutor",
    label: "Tutor Created",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    value: "community",
    label: "Community",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    value: "skillversity",
    label: "Curated",
    icon: <CheckCircle className="h-4 w-4" />,
  },
];

const difficultyOptions = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

const sortOptions = [
  { value: "-followers_count", label: "Most Popular" },
  { value: "-rating", label: "Highest Rated" },
  { value: "-created_at", label: "Newest" },
  { value: "-view_count", label: "Most Viewed" },
  { value: "title", label: "A-Z" },
];

export function TrackBrowser({
  onSelectTrack,
  initialFilters,
}: TrackBrowserProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  // Filter state
  const [search, setSearch] = useState(initialFilters?.search || "");
  const [technology, setTechnology] = useState(
    initialFilters?.technology || "all",
  );
  const [trackType, setTrackType] = useState<string>(
    initialFilters?.track_type || "all",
  );
  const [difficulty, setDifficulty] = useState<string>(
    initialFilters?.difficulty || "all",
  );
  const [ordering, setOrdering] = useState(
    initialFilters?.ordering || "-followers_count",
  );
  const [openOnly, setOpenOnly] = useState(initialFilters?.open_only || false);
  const [verifiedOnly, setVerifiedOnly] = useState(
    initialFilters?.verified_only || false,
  );

  // Build search params
  const searchParams: TrackSearchParams = {
    search: search || undefined,
    technology: technology !== "all" ? technology : undefined,
    track_type: trackType !== "all" ? (trackType as TrackType) : undefined,
    difficulty:
      difficulty !== "all" ? (difficulty as TrackDifficulty) : undefined,
    ordering,
    open_only: openOnly || undefined,
    verified_only: verifiedOnly || undefined,
    page,
  };

  const { tracks, totalCount, loading, error } = useTracks(searchParams);

  const handleTrackClick = (slug: string) => {
    if (onSelectTrack) {
      onSelectTrack(slug);
    } else {
      router.push(`/tracks/${slug}`);
    }
  };

  const handleFollow = async (slug: string) => {
    try {
      await tracksApi.follow(slug);
      // Refresh would happen via hook
    } catch (err) {
      console.error("Failed to follow track:", err);
    }
  };

  const totalPages = Math.ceil(totalCount / 12);

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tracks by name, skill, or technology..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 flex-wrap">
          <TechnologySelect
            value={technology}
            onValueChange={v => {
              setTechnology(v);
              setPage(1);
            }}
            placeholder="Technology"
            className="w-[160px]"
          />

          <Select
            value={trackType}
            onValueChange={v => {
              setTrackType(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Track Type" />
            </SelectTrigger>
            <SelectContent>
              {trackTypeOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  <div className="flex items-center gap-2">
                    {opt.icon}
                    <span>{opt.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={difficulty}
            onValueChange={v => {
              setDifficulty(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficultyOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ordering} onValueChange={setOrdering}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* More Filters Toggle */}
          <Button
            variant={showFilters ? "secondary" : "outline"}
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>

          {/* View Mode Toggle */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Extended Filters */}
      {showFilters && (
        <div className="flex gap-3 p-3 bg-muted/50 rounded-lg">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={openOnly}
              onChange={e => {
                setOpenOnly(e.target.checked);
                setPage(1);
              }}
              className="rounded"
            />
            Open Paths Only
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={e => {
                setVerifiedOnly(e.target.checked);
                setPage(1);
              }}
              className="rounded"
            />
            Verified Sources Only
          </label>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{loading ? "Loading..." : `${totalCount} tracks found`}</span>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {/* Track Grid/List */}
      {loading ? (
        <div
          className={cn(
            viewMode === "grid"
              ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              : "space-y-3",
          )}
        >
          <TrackCardSkeleton
            count={6}
            variant={viewMode === "list" ? "compact" : "default"}
          />
        </div>
      ) : tracks.length === 0 ? (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 border border-primary/10 p-8">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center">
                <Search className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="font-bold text-xl mb-2 bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              Coming Soon
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              Learning tracks are being curated by experts. Check back soon for
              authentic, verified learning paths from companies, tutors, and the
              community.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="/courses">Browse Courses</a>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            viewMode === "grid"
              ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              : "space-y-3",
          )}
        >
          {tracks.map(track => (
            <TrackCard
              key={track.id}
              track={track}
              variant={viewMode === "list" ? "compact" : "default"}
              onClick={() => handleTrackClick(track.slug)}
              onFollow={() => handleFollow(track.slug)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-4">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
