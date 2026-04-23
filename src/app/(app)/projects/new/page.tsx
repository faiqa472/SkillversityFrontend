"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Github, 
  Globe, 
  GraduationCap, 
  ArrowLeft, 
  Upload, 
  Link as LinkIcon,
  Sparkles,
  Clock,
  Bell
} from "lucide-react";
import Link from "next/link";

// Skeleton Media Component
function SkeletonMedia({ variant = "project" }: { variant?: "project" | "course" | "repo" }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted aspect-video">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        {variant === "course" ? (
          <GraduationCap className="w-10 h-10 text-muted-foreground/30" />
        ) : variant === "repo" ? (
          <Github className="w-10 h-10 text-muted-foreground/30" />
        ) : (
          <Code className="w-10 h-10 text-muted-foreground/30" />
        )}
      </div>
    </div>
  );
}

// Dummy course projects
const courseProjects = [
  { id: 1, name: "E-commerce Dashboard", course: "Full-Stack Web Development", status: "completed", tech: ["React", "Node.js", "PostgreSQL"] },
  { id: 2, name: "ML Image Classifier", course: "Python for Data Science", status: "in_progress", tech: ["Python", "TensorFlow", "OpenCV"] },
  { id: 3, name: "Mobile Weather App", course: "React Native Bootcamp", status: "completed", tech: ["React Native", "Expo", "API"] },
];

// Dummy GitHub repos
const githubRepos = [
  { id: 1, name: "portfolio-website", description: "Personal portfolio built with Next.js", stars: 12, language: "TypeScript" },
  { id: 2, name: "task-manager-api", description: "RESTful API for task management", stars: 8, language: "Python" },
  { id: 3, name: "react-components", description: "Reusable React component library", stars: 24, language: "JavaScript" },
];

export default function NewProjectPage() {
  const [activeTab, setActiveTab] = useState("skillversity");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile/me">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add Project</h1>
          <p className="text-muted-foreground">Showcase your work to the community</p>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                Coming Soon
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground flex-1 text-center sm:text-left">
              Project showcase feature is under development. Get notified when it launches!
            </p>
            <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
              <Bell className="mr-2 h-4 w-4" />
              Notify Me
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Import Sources */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="skillversity" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            SkillVersity
          </TabsTrigger>
          <TabsTrigger value="github" className="gap-2">
            <Github className="h-4 w-4" />
            GitHub
          </TabsTrigger>
          <TabsTrigger value="manual" className="gap-2">
            <Upload className="h-4 w-4" />
            Manual
          </TabsTrigger>
        </TabsList>

        {/* SkillVersity Projects */}
        <TabsContent value="skillversity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Course Projects
              </CardTitle>
              <CardDescription>
                Import projects you've built during SkillVersity courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {courseProjects.map((project) => (
                  <div key={project.id} className="group p-4 rounded-lg border hover:border-primary/50 transition-all opacity-60 cursor-not-allowed">
                    <div className="mb-3">
                      <SkeletonMedia variant="course" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.course}</p>
                      </div>
                      <Badge variant={project.status === "completed" ? "default" : "secondary"}>
                        {project.status === "completed" ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tech.map((t) => (
                        <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GitHub Import */}
        <TabsContent value="github" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                GitHub Repositories
              </CardTitle>
              <CardDescription>
                Connect your GitHub account to import repositories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Connect GitHub Button */}
              <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                <div className="text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-gray-900 dark:bg-gray-100 mx-auto flex items-center justify-center">
                    <Github className="h-6 w-6 text-white dark:text-gray-900" />
                  </div>
                  <p className="text-muted-foreground">Connect your GitHub account to import repositories</p>
                  <Button disabled className="opacity-60">
                    <Github className="mr-2 h-4 w-4" />
                    Connect GitHub
                  </Button>
                </div>
              </div>

              {/* Preview Repos */}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3 text-muted-foreground">Preview: Your repositories will appear like this</p>
                <div className="grid gap-3">
                  {githubRepos.map((repo) => (
                    <div key={repo.id} className="flex items-center gap-4 p-3 rounded-lg border opacity-60">
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                        <Code className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{repo.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{repo.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{repo.language}</Badge>
                        <span>⭐ {repo.stars}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manual Upload */}
        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Add Project Manually
              </CardTitle>
              <CardDescription>
                Add any project with custom details, screenshots, and links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Create Project Entry</h3>
                <p className="text-muted-foreground text-center max-w-md mb-4">
                  Add project name, description, technologies used, screenshots, and links to live demo or source code.
                </p>
                <Button disabled className="opacity-60">
                  <Upload className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              </div>

              {/* What you can add */}
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Project Details</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Project name & description</li>
                    <li>• Technologies & frameworks used</li>
                    <li>• Your role in the project</li>
                    <li>• Key features & achievements</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Media & Links</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Screenshots & demo videos</li>
                    <li>• Live demo URL</li>
                    <li>• Source code repository</li>
                    <li>• Documentation links</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Feature Preview */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Upcoming Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-3 rounded-lg bg-background border">
              <p className="font-medium text-sm">Auto-Import</p>
              <p className="text-xs text-muted-foreground">Automatically sync projects from GitHub</p>
            </div>
            <div className="p-3 rounded-lg bg-background border">
              <p className="font-medium text-sm">Project Analytics</p>
              <p className="text-xs text-muted-foreground">Track views and engagement</p>
            </div>
            <div className="p-3 rounded-lg bg-background border">
              <p className="font-medium text-sm">Skill Verification</p>
              <p className="text-xs text-muted-foreground">Get skills verified through projects</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
