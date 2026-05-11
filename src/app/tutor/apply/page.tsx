"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TutorApplicationForm } from "@/components/features/tutor/TutorApplicationForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  UserCheck,
  Award,
  Users,
  TrendingUp,
  ArrowLeft,
  Home,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/common/ThemeToggle";

// Skeleton Media for tutor profiles
function SkeletonMedia() {
  return (
    <div className="relative overflow-hidden rounded-full bg-muted aspect-square">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <UserCheck className="w-6 h-6 text-muted-foreground/30" />
      </div>
    </div>
  );
}

// Featured tutors showcase
const featuredTutors = [
  { name: "Ahmed K.", expertise: "Python & ML", students: 1250, rating: 4.9 },
  { name: "Sarah A.", expertise: "React & Node", students: 890, rating: 4.8 },
  { name: "Ali H.", expertise: "Data Science", students: 2100, rating: 4.9 },
  {
    name: "Fatima M.",
    expertise: "Cloud & DevOps",
    students: 670,
    rating: 4.7,
  },
];

export default function TutorApplicationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <div className="hidden sm:flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold">
                Skill<span className="text-primary">Versity</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <UserCheck className="mr-2 h-3 w-3" />
              Tutor Application
            </Badge>
            <h1 className="text-3xl font-bold mb-2">Apply to Become a Tutor</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your expertise, mentor the next generation, and build your
              professional reputation while earning revenue from your knowledge.
            </p>
          </div>

          {/* Featured Tutors Showcase */}
          <Card className="border-2 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-lg">Join Our Expert Tutors</CardTitle>
              <CardDescription>
                Meet some of our top-rated tutors making an impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featuredTutors.map((tutor, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-background rounded-lg border"
                  >
                    <div className="w-16 h-16 mx-auto mb-3">
                      <SkeletonMedia />
                    </div>
                    <h4 className="font-semibold text-sm">{tutor.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {tutor.expertise}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <span className="text-muted-foreground">
                        {tutor.students} students
                      </span>
                      <span className="text-yellow-500">★ {tutor.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Impact Students</CardTitle>
                    <CardDescription className="text-sm">
                      Mentor and guide students
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Earn Revenue</CardTitle>
                    <CardDescription className="text-sm">
                      Monetize your expertise
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                    <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      Build Reputation
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Establish thought leadership
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Requirements Check */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Application Requirements</CardTitle>
              <CardDescription>
                Make sure you meet these requirements before applying
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">
                      Complete professional profile
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">
                      Minimum 2 years relevant experience
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Verified work history</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">
                      Professional references available
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Strong communication skills</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">
                      Commitment to quality education
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Process */}
          <Card className="border-2 bg-muted/30">
            <CardHeader>
              <CardTitle>Application Process</CardTitle>
              <CardDescription>
                Here's what happens after you submit your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mx-auto mb-2">
                    <span className="text-primary-foreground font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-sm">Submit Application</h4>
                  <p className="text-xs text-muted-foreground">
                    Complete the form below
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto mb-2">
                    <span className="font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-sm">Profile Review</h4>
                  <p className="text-xs text-muted-foreground">
                    We review your background
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto mb-2">
                    <span className="font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-sm">Skills Assessment</h4>
                  <p className="text-xs text-muted-foreground">
                    Technical evaluation
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto mb-2">
                    <span className="font-bold">4</span>
                  </div>
                  <h4 className="font-semibold text-sm">
                    Approval & Onboarding
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Welcome to tutoring!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Form */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Tutor Application Form</CardTitle>
              <CardDescription>
                Tell us about your expertise and teaching interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TutorApplicationForm />
            </CardContent>
          </Card>

          {/* Footer Links */}
          <div className="text-center space-y-2 text-sm text-muted-foreground">
            <p>
              Already a tutor?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in to your dashboard
              </Link>
            </p>
            <p>
              Questions?{" "}
              <a
                href="mailto:tutors@skillversity.com"
                className="text-primary hover:underline"
              >
                Contact our tutor support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
