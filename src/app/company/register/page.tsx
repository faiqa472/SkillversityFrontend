"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompanyRegistrationForm } from "@/components/features/auth/CompanyRegistrationForm";
import {
  Building2,
  Shield,
  Users,
  ArrowLeft,
  Home,
  GraduationCap,
  Globe,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";

// Skeleton Media for company logos
function SkeletonLogo() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted aspect-square">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Building2 className="w-6 h-6 text-muted-foreground/30" />
      </div>
    </div>
  );
}

// Featured companies showcase
const featuredCompanies = [
  { name: "TechCorp", industry: "Software", employees: "500+", hires: 45 },
  { name: "DataFlow", industry: "Analytics", employees: "200+", hires: 28 },
  { name: "CloudNine", industry: "Cloud Services", employees: "1000+", hires: 67 },
  { name: "InnovatePK", industry: "Fintech", employees: "150+", hires: 32 },
];

export default function CompanyRegisterPage() {
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

      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
        <div className="w-full max-w-3xl space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="h-10 w-10 text-primary" />
              <h1 className="text-3xl font-bold">
                Skill<span className="text-primary">Versity</span>
              </h1>
            </div>
            <Badge variant="secondary" className="mb-2">
              <Shield className="mr-2 h-3 w-3" />
              Verified Organizations Only
            </Badge>
            <p className="text-muted-foreground">
              Register your company to access talent, create learning programs,
              and build partnerships
            </p>
          </div>

          {/* Featured Companies Showcase */}
          <Card className="border-2 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20">
            <CardHeader>
              <CardTitle className="text-lg">
                Trusted by Leading Companies
              </CardTitle>
              <CardDescription>
                Join organizations already hiring through SkillVersity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featuredCompanies.map((company, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-background rounded-lg border"
                  >
                    <div className="w-14 h-14 mx-auto mb-3">
                      <SkeletonLogo />
                    </div>
                    <h4 className="font-semibold text-sm">{company.name}</h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      {company.industry}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <span>{company.employees}</span>
                      <span>•</span>
                      <span className="text-green-600 dark:text-green-400">
                        {company.hires} hires
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">Company Registration</CardTitle>
              <CardDescription>
                Only verified companies and organizations can register.
                Individual professionals should use regular signup.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Access Talent Pool</h4>
                  <p className="text-sm text-muted-foreground">
                    Search verified professionals
                  </p>
                </div>
                <div className="text-center">
                  <Briefcase className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Post Opportunities</h4>
                  <p className="text-sm text-muted-foreground">
                    Find skilled candidates
                  </p>
                </div>
                <div className="text-center">
                  <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Build Brand</h4>
                  <p className="text-sm text-muted-foreground">
                    Showcase company culture
                  </p>
                </div>
              </div>

              <CompanyRegistrationForm />

              <Separator />

              <div className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  Individual professional?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-primary hover:underline font-medium"
                  >
                    Create Personal Profile
                  </Link>
                </p>

                <p className="text-center text-sm text-muted-foreground">
                  Want to become a tutor?{" "}
                  <Link
                    href="/tutor/apply"
                    className="text-primary hover:underline font-medium"
                  >
                    Apply as Tutor
                  </Link>
                </p>

                <p className="text-center text-sm text-muted-foreground">
                  Already registered?{" "}
                  <Link
                    href="/auth/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
