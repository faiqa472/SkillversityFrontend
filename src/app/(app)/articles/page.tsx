"use client";

import { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Clock,
  Bookmark,
  TrendingUp,
  Sparkles,
  X,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { articlesApi, type Article } from "@/lib/api-client";
import { dummyArticles } from "@/lib/dummy-data";
import {
  VerifiedBadge,
  OfficialBadge,
  GoldVerifiedBadge,
  CompanyBadge,
} from "@/components/ui/verified-badge";
import { Skeleton } from "@/components/ui/skeleton";

const ARTICLES_PER_PAGE = 5;

// All available tags/categories
const ALL_TAGS = [
  "React",
  "JavaScript",
  "TypeScript",
  "Python",
  "Data Science",
  "Career",
  "Learning",
  "UI/UX",
  "Backend",
  "Frontend",
  "Machine Learning",
  "DevOps",
  "Mobile",
  "Web Development",
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("for-you");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      const { data } = await articlesApi.list();
      setArticles(
        data?.results?.length
          ? data.results
          : (dummyArticles as unknown as Article[]),
      );
      setLoading(false);
    }
    fetchArticles();
  }, []);

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      article.tags.some(tag => selectedTags.includes(tag));
    return matchesSearch && matchesTags;
  });

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (activeTab === "trending") return b.views_count - a.views_count;
    if (activeTab === "latest")
      return (
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
    return b.likes_count - a.likes_count;
  });

  const visibleArticles = sortedArticles.slice(0, visibleCount);
  const hasMore = visibleCount < sortedArticles.length;

  const loadMore = useCallback(() => {
    setLoadingMore(true);
    // Simulate network delay for better UX
    setTimeout(() => {
      setVisibleCount(prev => prev + ARTICLES_PER_PAGE);
      setLoadingMore(false);
    }, 800);
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
    setVisibleCount(ARTICLES_PER_PAGE); // Reset pagination on filter change
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
    setVisibleCount(ARTICLES_PER_PAGE);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getAuthorBadge = (author: any) => {
    if (author.author_type === "platform")
      return <OfficialBadge size="sm" title="Official" />;
    if (author.author_type === "tutor" && author.is_verified)
      return <VerifiedBadge size="sm" title="Verified Tutor" />;
    if (author.author_type === "company" && author.is_verified)
      return <CompanyBadge size="sm" title="Verified Company" />;
    if (author.author_type === "sponsor")
      return <GoldVerifiedBadge size="sm" title="Sponsor" />;
    return null;
  };

  // Get popular tags from articles
  const popularTags = Array.from(new Set(articles.flatMap(a => a.tags))).slice(
    0,
    8,
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Articles</h1>
        <p className="text-lg text-muted-foreground">
          Discover insights from the community
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-12 h-11 rounded-full border-muted-foreground/20"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setVisibleCount(ARTICLES_PER_PAGE);
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          className="rounded-full px-4"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {selectedTags.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 h-5 w-5 p-0 justify-center rounded-full text-xs"
            >
              {selectedTags.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Tags/Categories Filter */}
      {showFilters && (
        <Card className="p-4 mb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Filter by topics</span>
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {(popularTags.length > 0 ? popularTags : ALL_TAGS.slice(0, 8)).map(
              tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                >
                  {tag}
                </button>
              ),
            )}
          </div>
        </Card>
      )}

      {/* Active Filters Display */}
      {selectedTags.length > 0 && !showFilters && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-sm text-muted-foreground">Filtered by:</span>
          {selectedTags.map(tag => (
            <Badge key={tag} variant="secondary" className="gap-1 pr-1">
              {tag}
              <button
                onClick={() => toggleTag(tag)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={v => {
          setActiveTab(v);
          setVisibleCount(ARTICLES_PER_PAGE);
        }}
        className="mb-6"
      >
        <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 gap-6">
          <TabsTrigger
            value="for-you"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            For You
          </TabsTrigger>
          <TabsTrigger
            value="trending"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
          </TabsTrigger>
          <TabsTrigger
            value="latest"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3"
          >
            <Clock className="h-4 w-4 mr-2" />
            Latest
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Results Count */}
      {!loading && (searchQuery || selectedTags.length > 0) && (
        <p className="text-sm text-muted-foreground mb-4">
          {sortedArticles.length} article
          {sortedArticles.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Article Skeleton */}
      {loading ? (
        <div className="space-y-0">
          {[1, 2, 3, 4].map(i => (
            <article key={i} className="py-6 first:pt-0 border-b last:border-0">
              <div className="flex gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="h-6 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex items-center gap-3 pt-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                </div>
                <Skeleton className="w-28 h-28 rounded-lg flex-shrink-0 hidden sm:block" />
              </div>
            </article>
          ))}
        </div>
      ) : visibleArticles.length > 0 ? (
        <div className="space-y-0">
          {visibleArticles.map((article, index) => (
            <article
              key={article.id}
              className="group py-6 first:pt-0 border-b last:border-0"
            >
              <Link href={`/articles/${article.slug}`} className="block">
                <div className="flex gap-6">
                  <div className="flex-1 min-w-0">
                    {/* Author */}
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          (article.author as any).author_type === "platform"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {(article.author?.first_name || "A").charAt(0)}
                      </div>
                      <span className="text-sm font-medium flex items-center gap-1">
                        {article.author.first_name} {article.author.last_name}
                        {getAuthorBadge(article.author)}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-muted-foreground line-clamp-2 text-sm mb-3">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{formatDate(article.published_at)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {article.read_time} min
                      </span>
                      {article.tags.slice(0, 1).map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                      <div className="flex-1" />
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex-shrink-0 hidden sm:flex items-center justify-center">
                    <span className="text-2xl">
                      {["📚", "💡", "🚀", "✨", "🎯", "💻"][index % 6]}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}

          {/* Load More Skeleton */}
          {loadingMore && (
            <>
              {[1, 2, 3].map(i => (
                <article
                  key={`loading-${i}`}
                  className="py-6 border-b animate-pulse"
                >
                  <div className="flex gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                      <Skeleton className="h-6 w-4/5" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    <Skeleton className="w-28 h-28 rounded-lg flex-shrink-0 hidden sm:block" />
                  </div>
                </article>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="h-16 w-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No articles found</h3>
          <p className="text-muted-foreground max-w-sm mx-auto mb-4">
            {searchQuery || selectedTags.length > 0
              ? "Try different filters or search terms"
              : "Check back soon for new content"}
          </p>
          {(searchQuery || selectedTags.length > 0) && (
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      )}

      {/* Load More Button */}
      {!loading && hasMore && !loadingMore && (
        <div className="text-center pt-8">
          <Button
            variant="outline"
            className="rounded-full px-8"
            onClick={loadMore}
          >
            Load more articles
          </Button>
        </div>
      )}
    </div>
  );
}
