"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  Github,
  Search,
  Plus,
  Star,
  Eye,
  Clock,
  Bell,
  Filter,
  TrendingUp,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

// Skeleton Media Component
function SkeletonMedia() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted aspect-video">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Code className="w-8 h-8 text-muted-foreground/30" />
      </div>
    </div>
  );
}

// Dummy featured projects
const featuredProjects = [
  {
    id: "1",
    name: "AI-Powered Resume Builder",
    description:
      "A smart resume builder that uses AI to optimize your resume for ATS systems and job descriptions.",
    author: { name: "Ahmed Hassan", avatar: "AH", is_verified: true },
    technologies: ["React", "OpenAI", "Node.js", "PostgreSQL"],
    stars: 156,
    views: 2340,
    demo_url: "#",
    github_url: "#",
  },
  {
    id: "2",
    name: "E-commerce Platform",
    description:
      "Full-stack e-commerce solution with payment integration, inventory management, and analytics dashboard.",
    author: { name: "Sara Khan", avatar: "SK", is_verified: false },
    technologies: ["Next.js", "Stripe", "Prisma", "TailwindCSS"],
    stars: 89,
    views: 1560,
    demo_url: "#",
    github_url: "#",
  },
  {
    id: "3",
    name: "Real-time Chat Application",
    description:
      "Scalable chat application with real-time messaging, file sharing, and video calls.",
    author: { name: "Ali Raza", avatar: "AR", is_verified: true },
    technologies: ["Socket.io", "React", "Express", "MongoDB"],
    stars: 234,
    views: 3890,
    demo_url: "#",
    github_url: "#",
  },
  {
    id: "4",
    name: "Task Management Dashboard",
    description:
      "Kanban-style task management with team collaboration, deadlines, and progress tracking.",
    author: { name: "Fatima Malik", avatar: "FM", is_verified: false },
    technologies: ["Vue.js", "Firebase", "Vuetify"],
    stars: 67,
    views: 980,
    demo_url: "#",
    github_url: "#",
  },
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("featured");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Code className="h-8 w-8 text-primary" />
            Project Showcase
          </h1>
          <p className="text-muted-foreground">
            Discover and share amazing projects built by the community
          </p>
        </div>
        <Button asChild>
          <Link href="/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      {/* Coming Soon Banner */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Badge
              variant="secondary"
              className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
            >
              Coming Soon
            </Badge>
            <p className="text-sm text-muted-foreground flex-1 text-center sm:text-left">
              Project showcase is under development. Browse the preview below
              and get notified when it launches!
            </p>
            <Button size="sm" variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Notify Me
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search projects by name, technology, or author..."
            className="pl-12 h-11"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 gap-6">
          <TabsTrigger
            value="featured"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Featured
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

        <TabsContent value="featured" className="space-y-6">
          {/* Project Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map(project => (
              <Card
                key={project.id}
                className="group overflow-hidden hover:shadow-lg transition-all opacity-80"
              >
                {/* Project Thumbnail */}
                <div className="p-4 pb-0">
                  <SkeletonMedia />
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                          {project.author.avatar}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {project.author.name}
                        </span>
                        {project.author.is_verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats & Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {project.views}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {project.github_url && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                      {project.demo_url && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Trending Projects</h3>
            <p className="text-muted-foreground">
              Coming soon - see what's popular in the community
            </p>
          </div>
        </TabsContent>

        <TabsContent value="latest">
          <div className="text-center py-12">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Latest Projects</h3>
            <p className="text-muted-foreground">
              Coming soon - discover newly added projects
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200 dark:border-violet-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">
                Ready to showcase your work?
              </h3>
              <p className="text-muted-foreground">
                Add your projects to build your portfolio and get discovered by
                companies
              </p>
            </div>
            <Button asChild>
              <Link href="/projects/new">Add Your Project</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
