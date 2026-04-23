"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrackBrowser, TrackCard, TrackCardSkeleton } from "@/components/features/tracks";
import { useTracks, useCategories, useTechnologies, useFollowingTracks } from "@/hooks/useTracks";
import { useRole } from "@/hooks/useRole";
import {
  Compass, Plus, BookOpen, Bookmark, TrendingUp, Search,
  Building2, GraduationCap, Globe, CheckCircle, Sparkles, Code,
  Layers, Database, Cloud, Terminal, GitBranch, ArrowLeft
} from "lucide-react";
import Link from "next/link";

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  frontend: <Layers className="h-5 w-5" />,
  backend: <Terminal className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  devops: <Cloud className="h-5 w-5" />,
  mobile: <Code className="h-5 w-5" />,
  ai: <Sparkles className="h-5 w-5" />,
};

// Coming Soon Component for Learning Tracks
function TracksComingSoon() {
  const features = [
    { icon: <Building2 className="h-5 w-5" />, title: "Official Paths", desc: "From Meta, Google, AWS & more" },
    { icon: <GraduationCap className="h-5 w-5" />, title: "Tutor Tracks", desc: "Expert-curated learning journeys" },
    { icon: <Globe className="h-5 w-5" />, title: "Community Paths", desc: "Crowd-sourced authentic guides" },
    { icon: <CheckCircle className="h-5 w-5" />, title: "Verified Sources", desc: "Quality-checked resources" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 border border-primary/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 p-8 md:p-12">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Animated Icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center">
              <Compass className="h-10 w-10 text-white animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </div>

          {/* Badge */}
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <Sparkles className="h-3 w-3 mr-1" />
            Coming Soon
          </Badge>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
            Learning Source Engine
          </h2>

          {/* Description */}
          <p className="text-muted-foreground mb-8 max-w-lg">
            The most comprehensive tech learning paths platform. Authentic, verified learning tracks from 
            companies, expert tutors, and the community. Your single source of truth for what to learn.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all hover:scale-105"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 mx-auto text-primary">
                  {feature.icon}
                </div>
                <h4 className="font-medium text-sm">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats Preview */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-muted-foreground">60+ Technologies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300" />
              <span className="text-muted-foreground">8 Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse delay-500" />
              <span className="text-muted-foreground">Verified Sources</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="gap-2" disabled>
              <GitBranch className="h-4 w-4" />
              Launching Soon
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/courses">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Courses Instead
              </Link>
            </Button>
          </div>

          {/* Bottom text */}
          <p className="mt-6 text-xs text-muted-foreground">
            Be the first to know when we launch. Follow us for updates.
          </p>
        </div>
      </div>
    </div>
  );
}

function TrendingTracks() {
  const router = useRouter();
  const { tracks, loading, error } = useTracks({
    ordering: '-view_count',
    page: 1,
  });

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TrackCardSkeleton count={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
        Failed to load trending tracks.
      </div>
    );
  }

  if (tracks.length === 0) {
    return <TracksComingSoon />;
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tracks.slice(0, 6).map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            onClick={() => router.push(`/tracks/${track.slug}`)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          ProTip: Follow tracks to get notified when they're updated.
        </p>
      </div>
    </>
  );
}

function CategoryGrid() {
  const router = useRouter();
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="animate-pulse space-y-2">
              <div className="h-10 w-10 bg-muted rounded-lg" />
              <div className="h-4 w-20 bg-muted rounded" />
              <div className="h-3 w-12 bg-muted rounded" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => (
        <Card
          key={category.id}
          className="p-4 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
          onClick={() => router.push(`/tracks?category=${category.slug}`)}
        >
          <div
            className="h-10 w-10 rounded-lg flex items-center justify-center mb-2 transition-colors"
            style={{ backgroundColor: category.color ? `${category.color}20` : undefined }}
          >
            {categoryIcons[category.slug] || <Code className="h-5 w-5" />}
          </div>
          <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {category.technologies_count} technologies
          </p>
        </Card>
      ))}
    </div>
  );
}

function FollowingTracks() {
  const router = useRouter();
  const { following, loading, error } = useFollowingTracks();

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TrackCardSkeleton count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
        Failed to load your tracks.
      </div>
    );
  }

  if (following.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Bookmark className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="font-semibold mb-1">No saved tracks yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Follow tracks to save them here and track your progress
        </p>
        <Button asChild variant="outline">
          <Link href="/tracks?tab=browse">Browse Tracks</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {following.map((f) => (
        <TrackCard
          key={f.id}
          track={f.track}
          onClick={() => router.push(`/tracks/${f.track.slug}`)}
        />
      ))}
    </div>
  );
}

// Component to show tracks filtered by category or search
function FilteredTracks({ category, search }: { category?: string; search?: string }) {
  const router = useRouter();
  const { categories } = useCategories();
  const { technologies } = useTechnologies({ category });
  const { tracks, loading, error } = useTracks({
    technology: category ? undefined : undefined,
    search: search,
  });

  // Find category name
  const categoryData = categories.find((c) => c.slug === category);

  // Filter tracks by technologies in this category
  const filteredTracks = category
    ? tracks.filter((track) => {
        const techSlugs = technologies.map((t) => t.slug);
        return (
          techSlugs.includes(track.primary_technology?.slug) ||
          track.technologies?.some((t) => techSlugs.includes(t.slug))
        );
      })
    : tracks;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/tracks")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="h-6 w-48 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TrackCardSkeleton count={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/tracks")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {category ? `${categoryData?.name || category} Tracks` : `Search: "${search}"`}
            </h1>
            <p className="text-sm text-muted-foreground">
              {filteredTracks.length} track{filteredTracks.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>
        {category && (
          <Badge variant="outline" className="gap-1">
            {categoryIcons[category] || <Code className="h-4 w-4" />}
            {categoryData?.name || category}
          </Badge>
        )}
      </div>

      {/* Technologies in this category */}
      {category && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {technologies.slice(0, 12).map((tech) => (
            <Badge
              key={tech.id}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => router.push(`/tracks?technology=${tech.slug}`)}
            >
              {tech.name}
              <span className="ml-1 text-xs opacity-70">({tech.tracks_count})</span>
            </Badge>
          ))}
          {technologies.length > 12 && (
            <Badge variant="outline">+{technologies.length - 12} more</Badge>
          )}
        </div>
      )}

      {/* Results */}
      {error ? (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          Failed to load tracks.
        </div>
      ) : filteredTracks.length === 0 ? (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 border border-primary/10 p-8">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center">
                {categoryIcons[category || ""] || <Compass className="h-8 w-8 text-white" />}
              </div>
            </div>
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
            <h3 className="font-bold text-xl mb-2">
              {category ? `${categoryData?.name || category} Tracks` : "Search Results"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              {category
                ? `We're curating the best ${categoryData?.name || category} learning paths. Expert-verified tracks coming soon!`
                : "No tracks match your search yet. Our library is growing daily."}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push("/tracks")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tracks
              </Button>
              <Button variant="outline" asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              onClick={() => router.push(`/tracks/${track.slug}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TracksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isTutor, isCompany } = useRole();
  const [activeTab, setActiveTab] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");

  // Get URL params
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");
  const tabParam = searchParams.get("tab");

  // Set active tab from URL
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Initialize search query from URL
  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParam]);

  const canCreateTrack = isTutor || isCompany;

  // If category or search param exists, show filtered view
  if (categoryParam || searchParam) {
    return (
      <div className="space-y-6">
        <FilteredTracks category={categoryParam || undefined} search={searchParam || undefined} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Compass className="h-8 w-8 text-primary" />
            Learning Tracks
          </h1>
          <p className="text-muted-foreground">
            Authentic learning paths from companies, tutors, and community
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="h-8 gap-1">
            <GitBranch className="h-3 w-3" />
            Source Engine
          </Badge>
          {canCreateTrack && (
            <Button onClick={() => router.push("/tracks/create")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Track
            </Button>
          )}
        </div>
      </div>

      {/* Track Type Legend */}
      <div className="flex flex-wrap gap-3 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>Official (Company)</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <GraduationCap className="h-4 w-4" />
          <span>Tutor Created</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Globe className="h-4 w-4" />
          <span>Community</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <CheckCircle className="h-4 w-4" />
          <span>Curated</span>
        </div>
      </div>

      {/* Category Quick Access */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Browse by Category</h2>
        <CategoryGrid />
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tracks by technology, skill, or topic..."
          className="pl-12 h-11"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchQuery) {
              router.push(`/tracks?search=${encodeURIComponent(searchQuery)}`);
            }
          }}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 gap-6">
          <TabsTrigger
            value="trending"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger
            value="browse"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 gap-2"
          >
            <BookOpen className="h-4 w-4" />
            All Tracks
          </TabsTrigger>
          <TabsTrigger
            value="following"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 gap-2"
          >
            <Bookmark className="h-4 w-4" />
            Following
          </TabsTrigger>
        </TabsList>

        {/* Trending Tab */}
        <TabsContent value="trending" className="space-y-4">
          <TrendingTracks />
        </TabsContent>

        {/* Browse All Tab */}
        <TabsContent value="browse">
          <TrackBrowser onSelectTrack={(slug) => router.push(`/tracks/${slug}`)} />
        </TabsContent>

        {/* Following Tab */}
        <TabsContent value="following">
          <FollowingTracks />
        </TabsContent>
      </Tabs>

      {/* Contribute CTA */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold">Share Your Learning Path</h3>
                <p className="text-sm text-muted-foreground">
                  Create tracks from your experience. Help others learn the right way.
                </p>
              </div>
            </div>
            {canCreateTrack ? (
              <Button asChild>
                <Link href="/tracks/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Track
                </Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/tutor/apply">Become a Contributor</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
