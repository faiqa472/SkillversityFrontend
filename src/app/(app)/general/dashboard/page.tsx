import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, TrendingUp, ArrowRight, Zap, Compass } from "lucide-react";
import Link from "next/link";

export default function GeneralDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome to SkillVersity</h1>
        <p className="text-muted-foreground">
          Explore courses, outlines, and discover your path
        </p>
      </div>

      {/* Complete Profile Banner */}
      <Card className="border-2 border-primary bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Complete Your Profile</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Set up your profile to access courses, build your portfolio, or start teaching
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/profile/complete">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10K+</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">200+</div>
            <p className="text-xs text-muted-foreground">Available to browse</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Member satisfaction</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>Explore what SkillVersity offers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/learning-paths">
                <Compass className="mr-2 h-4 w-4" />
                Explore Learning Hub
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/general/courses">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Available Courses
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/community">
                <Users className="mr-2 h-4 w-4" />
                Join Community
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Choose Your Path</CardTitle>
            <CardDescription>What would you like to do?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <p className="font-medium text-sm">Learn & Build</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Access courses, build portfolio, get hired
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <p className="font-medium text-sm">Teach & Mentor</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Create courses, verify skills, earn revenue
              </p>
            </div>
            <Button className="w-full" asChild>
              <Link href="/profile/complete">
                Complete Profile to Start
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
