"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Sparkles,
  Bell,
  BookOpen,
  Clock,
  Users,
  Award,
  Play,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton Media for course preview
function SkeletonMedia() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted aspect-video">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-muted-foreground/20 flex items-center justify-center">
          <Play className="h-7 w-7 text-muted-foreground/40 ml-1" />
        </div>
      </div>
    </div>
  );
}

export default function CourseDetailPage() {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild>
        <Link href="/learn">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Course Preview Card */}
          <Card>
            <CardContent className="p-6">
              <SkeletonMedia />
            </CardContent>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Coming Soon</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>--</span>
                </div>
              </div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3 mt-1" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon Notice */}
          <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Course Details Coming Soon</h2>
                <p className="text-muted-foreground max-w-md">
                  We're preparing detailed course content including video lessons, 
                  documentation, code sandboxes, and interactive exercises.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button>
                    <Bell className="mr-2 h-4 w-4" />
                    Notify When Available
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/learn">Browse Other Courses</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Module List Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
              <p className="text-sm text-muted-foreground">Content structure preview</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className="flex items-center justify-between p-3 rounded-lg border opacity-60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                        {num}
                      </div>
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Instructor Card */}
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>

          {/* What You'll Learn */}
          <Card>
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5 opacity-50">✓</Badge>
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Course Features */}
          <Card>
            <CardHeader>
              <CardTitle>Course Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Lifetime access</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4" />
                <span>Certificate of completion</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Community support</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
