"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Star,
  Search,
  GraduationCap,
  Lock,
  ArrowRight,
  Play,
  Clock,
  FileText,
  Code,
  Eye,
  GitBranch,
  Sparkles,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

// Skeleton Media Component
function SkeletonMedia({
  variant = "course",
}: {
  variant?: "course" | "video" | "profile" | "project";
}) {
  const icons = {
    course: GraduationCap,
    video: Play,
    profile: Users,
    project: Code,
  };
  const Icon = icons[variant] || GraduationCap;
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted aspect-video">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skeleton-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="w-8 h-8 text-muted-foreground/30" />
      </div>
    </div>
  );
}

// Preview data
const previewCourses = [
  {
    id: "1",
    title: "Full-Stack Web Development",
    instructor: "Ahmed K.",
    rating: 4.8,
    students: 1250,
    price: "7,999",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Data Science & ML Bootcamp",
    instructor: "Sara A.",
    rating: 4.9,
    students: 890,
    price: "12,999",
    level: "Intermediate",
  },
  {
    id: "3",
    title: "Mobile App Development",
    instructor: "Ali H.",
    rating: 4.7,
    students: 670,
    price: "6,999",
    level: "Intermediate",
  },
];

const previewArticles = [
  {
    id: "1",
    title: "Getting Started with React in 2025",
    author: "Ahmed Khan",
    reads: 2340,
    mins: 8,
  },
  {
    id: "2",
    title: "Python Best Practices for Data Science",
    author: "Sara Ahmed",
    reads: 1890,
    mins: 12,
  },
  {
    id: "3",
    title: "Building Scalable APIs with Node.js",
    author: "Ali Hassan",
    reads: 1560,
    mins: 10,
  },
];

const previewProfiles = [
  {
    id: "1",
    name: "Ahmed Khan",
    role: "Senior Developer",
    skills: ["React", "Node.js", "AWS"],
    verified: true,
  },
  {
    id: "2",
    name: "Sara Ahmed",
    role: "Data Scientist",
    skills: ["Python", "ML", "TensorFlow"],
    verified: true,
  },
  {
    id: "3",
    name: "Ali Hassan",
    role: "Full-Stack Engineer",
    skills: ["TypeScript", "PostgreSQL"],
    verified: false,
  },
];

const previewPaths = [
  {
    id: "1",
    title: "Frontend Developer Path",
    author: "SkillVersity",
    stars: 1250,
    forks: 342,
  },
  {
    id: "2",
    title: "Data Science Fundamentals",
    author: "TechCorp",
    stars: 890,
    forks: 234,
  },
  {
    id: "3",
    title: "DevOps Engineering Guide",
    author: "Ahmed K.",
    stars: 670,
    forks: 156,
  },
];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <Badge variant="secondary" className="mb-2">
          <Sparkles className="h-3 w-3 mr-1" />
          Explore SkillVersity
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Discover Courses, Experts & Learning Paths
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse our catalog of professional courses, community articles, and
          expert profiles. Sign in to unlock full access.
        </p>
        <div className="flex justify-center gap-3 pt-4">
          <Button size="lg" asChild>
            <Link href="/auth/signup">
              <UserPlus className="mr-2 h-5 w-5" />
              Get Started Free
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses, articles, profiles..."
            className="pl-12 h-12 text-lg"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
        {[
          { label: "Courses", value: "150+", icon: GraduationCap },
          { label: "Articles", value: "500+", icon: FileText },
          { label: "Experts", value: "200+", icon: Users },
          { label: "Learning Paths", value: "50+", icon: GitBranch },
        ].map(stat => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-6">
              <stat.icon className="h-8 w-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 max-w-lg mx-auto">
          <TabsTrigger value="courses" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="articles" className="gap-2">
            <FileText className="h-4 w-4" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="profiles" className="gap-2">
            <Users className="h-4 w-4" />
            Experts
          </TabsTrigger>
          <TabsTrigger value="paths" className="gap-2">
            <GitBranch className="h-4 w-4" />
            Paths
          </TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {previewCourses.map((course, index) => (
              <Card key={course.id} className="group relative overflow-hidden">
                <div className="p-4 pb-0">
                  <SkeletonMedia
                    variant={index % 2 === 0 ? "video" : "course"}
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{course.level}</Badge>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {course.rating}
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-1">
                    {course.title}
                  </CardTitle>
                  <CardDescription>by {course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students} students
                    </span>
                    <span className="font-bold">PKR {course.price}</span>
                  </div>
                </CardContent>
                {/* Login overlay on hover */}
                <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                  <Lock className="h-8 w-8 text-muted-foreground mb-3" />
                  <p className="text-sm text-center mb-3">
                    Sign in to enroll in this course
                  </p>
                  <Button size="sm" asChild>
                    <Link href="/auth/login">Sign In to View</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center pt-6">
            <Button variant="outline" asChild>
              <Link href="/auth/signup">
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>

        {/* Articles Tab */}
        <TabsContent value="articles">
          <div className="space-y-4">
            {previewArticles.map(article => (
              <Card key={article.id} className="group relative">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-32 flex-shrink-0">
                      <SkeletonMedia variant="video" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        by {article.author}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {article.reads} reads
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.mins} min read
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/auth/login">
                          <Lock className="h-4 w-4 mr-1" />
                          Read
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center pt-6">
            <Button variant="outline" asChild>
              <Link href="/auth/signup">
                Browse All Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>

        {/* Profiles Tab */}
        <TabsContent value="profiles">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {previewProfiles.map(profile => (
              <Card key={profile.id} className="group relative text-center">
                <CardContent className="pt-6">
                  <div className="h-20 w-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {profile.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="font-semibold flex items-center justify-center gap-1">
                    {profile.name}
                    {profile.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {profile.role}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 mt-3">
                    {profile.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    className="w-full mt-4"
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link href="/auth/login">
                      <Lock className="h-4 w-4 mr-1" />
                      View Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center pt-6">
            <Button variant="outline" asChild>
              <Link href="/auth/signup">
                Discover More Experts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>

        {/* Learning Paths Tab */}
        <TabsContent value="paths">
          <div className="space-y-4">
            {previewPaths.map(path => (
              <Card key={path.id} className="group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <GitBranch className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{path.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by {path.author}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {path.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch className="h-4 w-4" />
                        {path.forks}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/auth/login">
                        <Lock className="h-4 w-4 mr-1" />
                        View Path
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center pt-6">
            <Button variant="outline" asChild>
              <Link href="/auth/signup">
                Explore All Paths <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Join thousands of learners building their skills on SkillVersity.
            Create your free account to access courses, articles, and connect
            with experts.
          </p>
          <div className="flex justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
