"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Play,
  TrendingUp,
  Zap,
  Map,
  Code,
  GitBranch,
  Activity
} from "lucide-react";
import Link from "next/link";
import { useRole } from "@/hooks/useRole";
import SkeletonMedia from "@/components/ui/skeleton-media";
import { userApi, projectsApi } from "@/lib/api-client";

// Mock Activity Data (Heatmap-ish)
const ACTIVITY_DAYS = Array.from({ length: 14 }, (_, i) => ({
  day: i,
  level: Math.floor(Math.random() * 4), // 0-3
}));

export default function DashboardHub() {
  const [userName, setUserName] = useState("");
  const { hasSelectedRole, isProfileComplete, isTutorPending } = useRole();
  // const [loading, setLoading] = useState(true);


  const [projectCount, setProjectCount] = useState(0);
  // const [contributionCount, setContributionCount] = useState(0); // Future API
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // 1. Get User Profile for latest name
        const { data: profile } = await userApi.getProfile();
        if (profile) {
          setUserName(profile.first_name || "there");
        } else {
          // Fallback to local storage if API fails or plain "there"
          const userData = localStorage.getItem("user_data");
          if (userData) {
            const parsed = JSON.parse(userData);
            setUserName(parsed.first_name || "there");
          }
        }

        // 2. Get User Projects for real count
        const { data: projects } = await projectsApi.list();
        if (projects) {
          setProjectCount(projects.count || 0);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (hasSelectedRole) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [hasSelectedRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* 1. Hub Header / Command Center */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Welcome & Pulse */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          <Card className="border-none shadow-md bg-gradient-to-r from-primary/5 via-background to-background relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
            <CardContent className="p-8 relative z-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Activity className="w-4 h-4" />
                  <span>System Status: Online</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Welcome to your <span className="text-primary">Creator Hub</span>, {userName}.
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  You have <span className="text-foreground font-semibold">{projectCount} Active Projects</span> and are exploring Open Curricula.
                </p>

                <div className="flex flex-wrap gap-3 mt-2">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/learning-paths">
                      <GitBranch className="mr-2 h-4 w-4" /> Learning Paths
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full bg-background/60">
                    <Link href="/projects">
                      <Code className="mr-2 h-4 w-4" /> My Projects
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Graph (GitHub Style) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold text-muted-foreground">Contribution Activity</h3>
              <span className="text-xs text-muted-foreground">Last 14 Days</span>
            </div>
            <div className="flex gap-2">
              {ACTIVITY_DAYS.map((d, i) => (
                <div
                  key={i}
                  className={`
flex - 1 h - 24 rounded - lg transition - all hover: scale - 105 cursor - pointer
                           ${d.level === 0 ? "bg-muted" : ""}
                           ${d.level === 1 ? "bg-green-200 dark:bg-green-900/40" : ""}
                           ${d.level === 2 ? "bg-green-400 dark:bg-green-700/60" : ""}
                           ${d.level === 3 ? "bg-green-600 dark:bg-green-500" : ""}
`}
                  title={`${d.level} contributions`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="md:col-span-4 lg:col-span-3 space-y-4">

          {/* Streak / Stats */}
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-200 dark:border-orange-900/30">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-background rounded-full shadow-sm mb-3">
                <Zap className="w-6 h-6 text-orange-500 fill-orange-500" />
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-bold font-mono">12</span>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Day Streak</p>
              </div>
            </CardContent>
          </Card>

          {/* Trending in Ecosystem */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Trending Now
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Link href="/learning-paths" className="block group">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <GitBranch className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">Rust for WebDevs</p>
                      <p className="text-xs text-muted-foreground">New Path • 1.2k Stars</p>
                    </div>
                  </div>
                </Link>
                <Link href="/learn" className="block group">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">AI Agents Module</p>
                      <p className="text-xs text-muted-foreground">New Course • 450 Enrolled</p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* 2. Platform Sections Link */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/learn" className="group">
          <Card className="h-full hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                <GraduationCap className="w-5 h-5" /> Academy
              </CardTitle>
              <CardDescription>Structured courses and certifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <SkeletonMedia variant="series" className="h-32 rounded-md" />
              <div className="mt-4 flex gap-2">
                <Badge variant="outline">Video</Badge>
                <Badge variant="outline">Quiz</Badge>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/learning-paths" className="group">
          <Card className="h-full hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                <Map className="w-5 h-5" /> Learning Paths
              </CardTitle>
              <CardDescription>Community-driven learning roadmaps.</CardDescription>
            </CardHeader>
            <CardContent>
              <SkeletonMedia variant="code" className="h-32 rounded-md" />
              <div className="mt-4 flex gap-2">
                <Badge variant="outline">Open Source</Badge>
                <Badge variant="outline">Docs</Badge>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/projects" className="group">
          <Card className="h-full hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                <Code className="w-5 h-5" /> Project Lab
              </CardTitle>
              <CardDescription>Hands-on practice to build your portfolio.</CardDescription>
            </CardHeader>
            <CardContent>
              <SkeletonMedia variant="image" className="h-32 rounded-md" />
              <div className="mt-4 flex gap-2">
                <Badge variant="outline">IDE</Badge>
                <Badge variant="outline">Deploy</Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

    </div>
  );
}
