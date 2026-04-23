import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockCourses } from "@/lib/mock-data";
import { TrendingUp, Users, BookOpen, DollarSign, Star } from "lucide-react";

export default function AnalyticsPage() {
  const courses = mockCourses;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your teaching performance and student progress</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce((sum, c) => sum + c.enrolledCount, 0)}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span>Out of 5.0</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PKR 245K</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+18% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Student engagement by course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{course.title}</span>
                  <span className="text-muted-foreground">{course.enrolledCount} students</span>
                </div>
                <Progress value={Math.random() * 100} />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Completion: {Math.floor(Math.random() * 30 + 70)}%</span>
                  <span>Rating: {course.rating}/5.0</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
            <CardDescription>Recent activity and milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Ahmed Khan", course: "Full-Stack Web Development", progress: 85, status: "on-track" },
              { name: "Sara Ahmed", course: "Python for Data Science", progress: 92, status: "ahead" },
              { name: "Ali Hassan", course: "Advanced React Patterns", progress: 45, status: "at-risk" },
              { name: "Fatima Ali", course: "Full-Stack Web Development", progress: 78, status: "on-track" },
            ].map((student, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-sm">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.course}</p>
                  <div className="mt-2">
                    <Progress value={student.progress} className="h-2" />
                  </div>
                </div>
                <Badge
                  variant={
                    student.status === "ahead"
                      ? "default"
                      : student.status === "at-risk"
                      ? "destructive"
                      : "secondary"
                  }
                  className="ml-4"
                >
                  {student.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Video Watch Time</span>
              <span className="font-medium">1,234 hrs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Discussion Posts</span>
              <span className="font-medium">456</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Assignments Submitted</span>
              <span className="font-medium">789</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Avg Session Duration</span>
              <span className="font-medium">45 min</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verification Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Projects Verified</span>
              <span className="font-medium">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending Reviews</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Avg Review Time</span>
              <span className="font-medium">2.5 hrs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Approval Rate</span>
              <span className="font-medium">89%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Course Sales</span>
              <span className="font-medium">PKR 180K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Mentoring Sessions</span>
              <span className="font-medium">PKR 45K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Custom Training</span>
              <span className="font-medium">PKR 20K</span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <span className="text-sm font-medium">Total</span>
              <span className="font-bold">PKR 245K</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
