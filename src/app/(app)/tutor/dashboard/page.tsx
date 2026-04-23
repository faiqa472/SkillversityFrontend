import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockCourses, mockProjects } from "@/lib/mock-data";
import { BookOpen, CheckCircle, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function TutorDashboardPage() {
  const pendingSubmissions = mockProjects.filter((p) => p.status === "pending");
  const myCourses = mockCourses;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
        <p className="text-muted-foreground">Manage your courses and review student submissions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myCourses.length}</div>
            <p className="text-xs text-muted-foreground">Active courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingSubmissions.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting validation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Projects</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Average completion</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Submissions to Review</CardTitle>
            <CardDescription>Recent project submissions from students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingSubmissions.map((project) => (
              <div key={project.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="flex-1">
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-muted-foreground">Submitted 2 hours ago</p>
                </div>
                <Button size="sm" asChild>
                  <Link href="/tutor/validation">Review</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Your active courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="flex-1">
                  <p className="font-medium">{course.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">{course.enrolledCount} students</Badge>
                    <span className="text-sm text-muted-foreground">⭐ {course.rating}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/tutor/courses">Manage</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
