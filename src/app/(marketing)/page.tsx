import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Rocket, Target, Award, Code, BookOpen, Zap, Building2, UserCheck, GitBranch, Linkedin, GraduationCap, Heart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Unified Platform Introduction */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="container relative flex flex-col items-center justify-center gap-8 py-24 md:py-32 lg:py-40">
          <Badge variant="secondary" className="px-4 py-1.5">
            <Zap className="mr-2 h-3 w-3" />
            Professional Learning Ecosystem for Pakistan
          </Badge>
          <h1 className="max-w-4xl text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Build Your Professional
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"> Career Network</span>
          </h1>
          <p className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl md:text-2xl">
            Create your professional profile, learn from industry experts, teach your skills, 
            or hire verified talent. One platform, endless possibilities.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/auth/signup">
                <Rocket className="mr-2 h-5 w-5" />
                Join Platform
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>50,000+ Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>1,000+ Verified Skills</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>500+ Companies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview - How It Works */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">One Platform, Multiple Opportunities</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Whether you're starting your career, sharing expertise, or building a team - 
              we've created a unified ecosystem where professionals connect, learn, and grow together.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Linkedin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">1. Create Professional Profile</CardTitle>
                <CardDescription className="text-base">
                  Build your LinkedIn-style profile with work experience, education, skills, and projects. 
                  Showcase your professional journey.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">2. Learn & Teach</CardTitle>
                <CardDescription className="text-base">
                  Access learning resources, apply to become a tutor, or create course outlines. 
                  Companies and tutors collaborate on curriculum design.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">3. Connect & Grow</CardTitle>
                <CardDescription className="text-base">
                  Companies find verified talent, members get opportunities, tutors build reputation. 
                  Everyone benefits from the professional network.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="container py-20">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Platform Features</Badge>
          <h2 className="text-3xl font-bold md:text-4xl">Everything You Need in One Place</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Professional networking, skill development, and career growth - all integrated seamlessly
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Professional Profiles</CardTitle>
              <CardDescription className="text-base">
                LinkedIn-style profiles for all users - members, tutors, and companies. 
                Build your professional brand and showcase achievements.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Course Outline System</CardTitle>
              <CardDescription className="text-base">
                VCS-like system for course outlines. Companies create requirements, 
                tutors and members suggest improvements, version control for curriculum.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Tutor Application System</CardTitle>
              <CardDescription className="text-base">
                Apply to become a tutor after building your profile. 
                Demonstrate expertise and get verified by companies for specific skills.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Company Verification</CardTitle>
              <CardDescription className="text-base">
                Only verified organizations can register as companies. 
                Ensures quality partnerships and legitimate opportunities.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Integrated Learning Environment</CardTitle>
              <CardDescription className="text-base">
                Complete learning suite with videos, documentation, coding sandbox, 
                AI assistance, quizzes, and assignments - all in one place.
              </CardDescription>
            </CardHeader>
          </Card>

        </div>
      </section>

      {/* User Journey Paths */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Your Journey</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">Choose Your Path</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Start with a professional profile, then explore opportunities based on your goals
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold">For Members</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>• Create professional profile (like LinkedIn)</p>
                <p>• Browse learning resources and courses</p>
                <p>• Submit requests for specific skills/courses</p>
                <p>• Get offers from tutors and companies</p>
                <p>• Learn with integrated environment</p>
                <p>• Build verified portfolio</p>
                <p>• Get discovered by companies</p>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/auth/signup">Start Learning Journey</Link>
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold">For Tutors</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>• Build comprehensive professional profile</p>
                <p>• Apply to become tutor for specific skills</p>
                <p>• Get verified by companies as expert</p>
                <p>• Respond to student requests with offers</p>
                <p>• Collaborate with companies on course outlines</p>
                <p>• Teach and mentor students</p>
                <p>• Build reputation and earn revenue</p>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/auth/signup">Become a Tutor</Link>
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold">For Companies</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>• Register as verified organization</p>
                <p>• Create company profile and showcase culture</p>
                <p>• List course outlines and requirements</p>
                <p>• Coordinate with tutors on curriculum design</p>
                <p>• Review member requests and make offers</p>
                <p>• Search and hire verified talent</p>
                <p>• Manage learning partnerships</p>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/company/register">Register Company</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">$3.8B</div>
              <div className="mt-2 text-sm text-muted-foreground">Pakistan IT Export Value</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">67%</div>
              <div className="mt-2 text-sm text-muted-foreground">Youth Under 30</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">50,000+</div>
              <div className="mt-2 text-sm text-muted-foreground">Professionals Connected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="mt-2 text-sm text-muted-foreground">Verified Skills & Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t bg-gradient-to-br from-primary/10 to-primary/5 py-20">
        <div className="container flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary" className="px-4 py-1.5">
            <Heart className="mr-2 h-3 w-3" />
            Join the Professional Network
          </Badge>
          <h2 className="max-w-3xl text-3xl font-bold md:text-4xl lg:text-5xl">
            Ready to Build Your Professional Future?
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Join thousands of professionals building careers, sharing knowledge, and creating opportunities together
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/auth/signup">Create Profile</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
              <Link href="/browse">Explore Platform</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}