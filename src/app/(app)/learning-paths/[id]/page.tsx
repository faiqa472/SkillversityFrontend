"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useOutline, useModules } from "@/hooks/useOutlines";
import { useRole } from "@/hooks/useRole";
import { outlinesApi, modulesApi } from "@/lib/outlines-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Eye,
  Star,
  Users,
  Bookmark,
  BookmarkCheck,
  FileText,
  History,
  Play,
  CheckCircle,
  Loader2,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Copy,
  Download,
  Share2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface OutlineDetailPageProps {
  params: Promise<{ id: string }>;
}

const difficultyColors: Record<string, string> = {
  beginner:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  intermediate:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  expert: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

// Simplified version control timeline
const versionTimeline = [
  {
    version: "2.1.0",
    date: "Dec 10, 2024",
    changes: "Added new module on testing",
    author: "Ahmed K.",
  },
  {
    version: "2.0.0",
    date: "Dec 5, 2024",
    changes: "Major restructure, added projects",
    author: "Ahmed K.",
  },
  {
    version: "1.2.0",
    date: "Nov 28, 2024",
    changes: "Updated resources and links",
    author: "Sarah A.",
  },
  {
    version: "1.1.0",
    date: "Nov 20, 2024",
    changes: "Fixed typos, improved examples",
    author: "Ahmed K.",
  },
  {
    version: "1.0.0",
    date: "Nov 15, 2024",
    changes: "Initial release",
    author: "Ahmed K.",
  },
];

export default function OutlineDetailPage({ params }: OutlineDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { outline, loading, error, refetch } = useOutline(id);
  const { modules, loading: modulesLoading } = useModules(id);
  const { isLearner } = useRole();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("readme");

  const handleBookmark = async () => {
    setBookmarkLoading(true);
    try {
      await outlinesApi.bookmark(id);
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error("Failed to toggle bookmark:", err);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleCompleteModule = async (moduleId: string) => {
    try {
      await modulesApi.complete(id, moduleId);
      refetch();
    } catch (err) {
      console.error("Failed to complete module:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !outline) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">Outline not found</h3>
          <p className="text-muted-foreground">
            {error || "The outline you're looking for doesn't exist."}
          </p>
          <Button
            className="mt-4"
            onClick={() => router.push("/learning-paths")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Outlines
          </Button>
        </CardContent>
      </Card>
    );
  }

  const progress = outline.user_progress?.progress_percentage || 0;
  const completedModules = outline.user_progress?.completed_modules || [];

  return (
    <div className="space-y-4">
      {/* Repository-style Header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/learning-paths")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Outlines
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">{outline.title}</span>
      </div>

      {/* Main Header - Repository Style */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{outline.title}</h1>
                  <p className="text-sm text-muted-foreground">
                    by{" "}
                    {outline.primary_author?.name ||
                      outline.primary_author?.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className={difficultyColors[outline.difficulty_level]}>
                  {outline.difficulty_level}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <GitBranch className="h-3 w-3" />v{outline.current_version}
                </Badge>
                {outline.is_published ? (
                  <Badge variant="default">Published</Badge>
                ) : (
                  <Badge variant="secondary">Draft</Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
                disabled={bookmarkLoading}
              >
                {isBookmarked || outline.is_bookmarked ? (
                  <BookmarkCheck className="h-4 w-4 mr-1 text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4 mr-1" />
                )}
                {isBookmarked || outline.is_bookmarked ? "Saved" : "Save"}
              </Button>
              {isLearner && (
                <Button size="sm" onClick={() => router.push("/coming-soon")}>
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Quick Stats Bar */}
        <div className="border-t px-6 py-3 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5">
            <GitCommit className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{versionTimeline.length}</span>
            <span className="text-muted-foreground">versions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{modules.length}</span>
            <span className="text-muted-foreground">modules</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{outline.view_count}</span>
            <span className="text-muted-foreground">views</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{outline.enrollment_count}</span>
            <span className="text-muted-foreground">enrolled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">
              {parseFloat(String(outline.rating || 0)).toFixed(1)}
            </span>
          </div>
        </div>
      </Card>

      {/* Progress Bar (if enrolled) */}
      {isLearner && progress > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Your Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedModules.length}/{modules.length} modules • {progress}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Main Content - Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Tab Navigation - File Browser Style */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 border-b px-4 py-2 flex items-center gap-4">
              <button
                onClick={() => setActiveTab("readme")}
                className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === "readme"
                    ? "bg-background shadow-sm font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="h-4 w-4 inline mr-1.5" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("modules")}
                className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === "modules"
                    ? "bg-background shadow-sm font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="h-4 w-4 inline mr-1.5" />
                Modules
                <Badge variant="secondary" className="ml-2 text-xs">
                  {modules.length}
                </Badge>
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === "history"
                    ? "bg-background shadow-sm font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <History className="h-4 w-4 inline mr-1.5" />
                History
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "readme" && (
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      About this Outline
                    </h2>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {outline.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Skills */}
                  {outline.skill_tags && outline.skill_tags.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-3">Skills You'll Learn</h3>
                      <div className="flex flex-wrap gap-2">
                        {outline.skill_tags.map(tag => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="px-3 py-1"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Start */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Quick Start</h3>
                    <ol className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                          1
                        </span>
                        <span>Review the outline structure and modules</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                          2
                        </span>
                        <span>
                          Start with Module 1 and progress sequentially
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                          3
                        </span>
                        <span>Complete exercises and mark modules as done</span>
                      </li>
                    </ol>
                  </div>
                </div>
              )}

              {activeTab === "modules" && (
                <div className="space-y-3">
                  {modulesLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : modules.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold">No modules yet</h3>
                      <p className="text-muted-foreground text-sm">
                        This outline doesn't have any modules yet.
                      </p>
                    </div>
                  ) : (
                    modules.map((module, index) => {
                      const isCompleted = completedModules.includes(module.id);
                      return (
                        <div
                          key={module.id}
                          className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                            isCompleted
                              ? "bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold flex-shrink-0 ${
                              isCompleted
                                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h4 className="font-medium">{module.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {module.description}
                                </p>
                                {module.learning_objectives &&
                                  module.learning_objectives.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                      {module.learning_objectives
                                        .slice(0, 3)
                                        .map((obj, i) => (
                                          <Badge
                                            key={i}
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            {obj}
                                          </Badge>
                                        ))}
                                    </div>
                                  )}
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-xs text-muted-foreground">
                                  {module.duration_estimate}
                                </span>
                                {isLearner && !isCompleted && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleCompleteModule(module.id)
                                    }
                                  >
                                    Complete
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {activeTab === "history" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Version History</h3>
                    <Badge variant="outline" className="gap-1">
                      <GitBranch className="h-3 w-3" />
                      {versionTimeline.length} versions
                    </Badge>
                  </div>

                  {/* Timeline */}
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                    <div className="space-y-4">
                      {versionTimeline.map((item, index) => (
                        <div
                          key={item.version}
                          className="relative flex gap-4 pl-10"
                        >
                          <div
                            className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${
                              index === 0
                                ? "bg-primary border-primary"
                                : "bg-background border-muted-foreground"
                            }`}
                          />
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={index === 0 ? "default" : "outline"}
                                className="font-mono"
                              >
                                v{item.version}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {item.date}
                              </span>
                            </div>
                            <p className="text-sm mt-1">{item.changes}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              by {item.author}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* About Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{outline.estimated_duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>{modules.length} modules</span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                <span>Version {outline.current_version}</span>
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{outline.enrollment_count} enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>
                  {parseFloat(String(outline.rating || 0)).toFixed(1)} rating
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Collaborators */}
          {outline.collaborators && outline.collaborators.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {outline.collaborators.map(collab => (
                  <div
                    key={collab.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                        {(collab.user.name ||
                          collab.user.email)[0].toUpperCase()}
                      </div>
                      <span className="truncate">
                        {collab.user.name || collab.user.email}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {collab.role}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Copy className="h-4 w-4 mr-2" />
                Fork Outline
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <GitPullRequest className="h-4 w-4 mr-2" />
                Suggest Changes
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </CardContent>
          </Card>

          {/* Related Outlines */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Related Outlines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Advanced Topics", "Practical Projects", "Interview Prep"].map(
                (title, i) => (
                  <button
                    key={i}
                    onClick={() => router.push("/coming-soon")}
                    className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors text-sm"
                  >
                    <span className="font-medium">{title}</span>
                    <p className="text-xs text-muted-foreground">Coming soon</p>
                  </button>
                ),
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
