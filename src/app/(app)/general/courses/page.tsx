import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockCourses } from "@/lib/mock-data";
import { Search, Clock, Users, Star, Lock } from "lucide-react";
import Link from "next/link";

export default function GeneralCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Browse Courses</h1>
        <p className="text-muted-foreground">Explore our catalog of professional courses</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search courses..." className="pl-9" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge variant="secondary">{course.difficulty}</Badge>
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="line-clamp-2">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{course.enrolledCount} students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating} rating</span>
                </div>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/profile/complete">
                  <Lock className="mr-2 h-4 w-4" />
                  Complete Profile to Enroll
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h3 className="text-lg font-semibold">Ready to start learning?</h3>
            <p className="text-sm text-muted-foreground">
              Complete your profile to enroll in courses and build your portfolio
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/profile/complete">Complete Profile</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
