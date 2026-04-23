"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  BookOpen,
  Code,
  MessageSquare,
  ChevronLeft,
  Sparkles,
  Bell,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton Video Player
function SkeletonVideoPlayer() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted aspect-video">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer" />
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-muted-foreground/20 flex items-center justify-center">
          <Play className="h-10 w-10 text-muted-foreground/40 ml-1" />
        </div>
        <Badge variant="secondary">Video Coming Soon</Badge>
      </div>
    </div>
  );
}

export default function ModulePage({
  params,
}: {
  params: { courseId: string; moduleId: string };
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary">Coming Soon</Badge>
            <Badge variant="outline">Module {params.moduleId}</Badge>
          </div>
          <h1 className="text-2xl font-bold">Module Content</h1>
          <p className="text-muted-foreground">
            Interactive learning experience launching soon
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="video">
                <div className="border-b">
                  <TabsList className="w-full justify-start rounded-none h-auto p-0 bg-transparent">
                    <TabsTrigger
                      value="video"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger
                      value="docs"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Docs
                    </TabsTrigger>
                    <TabsTrigger
                      value="sandbox"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                    >
                      <Code className="mr-2 h-4 w-4" />
                      Sandbox
                    </TabsTrigger>
                    <TabsTrigger
                      value="discussion"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Discussion
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="video" className="p-6">
                  <SkeletonVideoPlayer />
                </TabsContent>

                <TabsContent value="docs" className="p-6">
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold">Documentation Coming Soon</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-sm">
                      Comprehensive documentation with examples, best practices,
                      and reference materials will be available here.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="sandbox" className="p-6">
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <Code className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold">Code Sandbox Coming Soon</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-sm">
                      Interactive code editor with live preview and execution
                      environment will be available here.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="discussion" className="p-6">
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <MessageSquare className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold">Discussion Coming Soon</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-sm">
                      Connect with fellow learners and instructors in module
                      discussions.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Coming Soon Notice */}
          <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold">
                    Interactive Learning Experience Coming Soon
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Video lessons, code sandboxes, quizzes, and community
                    discussions are being prepared.
                  </p>
                </div>
                <Button className="flex-shrink-0">
                  <Bell className="mr-2 h-4 w-4" />
                  Notify Me
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href={`/learn/${params.courseId}`}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Link>
            </Button>
            <Button variant="outline" disabled>
              <Lock className="mr-2 h-4 w-4" />
              Complete Module
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                      num.toString() === params.moduleId
                        ? "bg-accent"
                        : "opacity-50"
                    }`}
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {num}
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
                disabled
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Download Slides
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
                disabled
              >
                <Code className="mr-2 h-4 w-4" />
                Source Code
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
                disabled
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask Tutor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
