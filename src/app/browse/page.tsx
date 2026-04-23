import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Users, 
  Clock, 
  Star,
  Code,
  Database,
  Smartphone,
  Globe,
  Palette,
  BarChart,
  Plus
} from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "web-dev", name: "Web Development", icon: Globe, count: 45 },
  { id: "mobile", name: "Mobile Development", icon: Smartphone, count: 28 },
  { id: "data-science", name: "Data Science", icon: BarChart, count: 32 },
  { id: "programming", name: "Programming", icon: Code, count: 67 },
  { id: "database", name: "Database", icon: Database, count: 23 },
  { id: "design", name: "UI/UX Design", icon: Palette, count: 19 },
];

const courses = [
  {
    id: 1,
    title: "Complete React.js Bootcamp",
    description: "Master React from basics to advanced concepts with real-world projects",
    instructor: "Ahmed Khan",
    instructorTitle: "Senior Frontend Developer at TechCorp",
    rating: 4.8,
    students: 1247,
    duration: "12 weeks",
    level: "Intermediate",
    price: "PKR 25,000",
    category: "Web Development",
    tags: ["React", "JavaScript", "Frontend"],
    type: "Pre-made Course"
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Learn Python programming specifically for data analysis and machine learning",
    instructor: "Dr. Sarah Ahmed",
    instructorTitle: "Data Scientist at Analytics Pro",
    rating: 4.9,
    students: 892,
    duration: "10 weeks",
    level: "Beginner",
    price: "PKR 20,000",
    category: "Data Science",
    tags: ["Python", "Data Analysis", "ML"],
    type: "Pre-made Course"
  },
  {
    id: 3,
    title: "Custom Mobile App Development",
    description: "Personalized learning path for building your specific mobile app idea",
    instructor: "Multiple Tutors Available",
    instructorTitle: "Expert Mobile Developers",
    rating: 4.7,
    students: 156,
    duration: "Flexible",
    level: "All Levels",
    price: "From PKR 15,000",
    category: "Mobile Development",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    type: "Custom Learning"
  },
  {
    id: 4,
    title: "Live DevOps Masterclass",
    description: "Interactive live sessions on Docker, Kubernetes, and CI/CD pipelines",
    instructor: "Usman Ali",
    instructorTitle: "DevOps Engineer at CloudTech",
    rating: 4.6,
    students: 234,
    duration: "6 weeks",
    level: "Advanced",
    price: "PKR 30,000",
    category: "Programming",
    tags: ["Docker", "Kubernetes", "DevOps"],
    type: "Live Course"
  },
  {
    id: 5,
    title: "Full-Stack JavaScript Path",
    description: "Complete journey from frontend to backend with Node.js and React",
    instructor: "Fatima Sheikh",
    instructorTitle: "Full-Stack Developer at StartupHub",
    rating: 4.8,
    students: 567,
    duration: "16 weeks",
    level: "Intermediate",
    price: "PKR 35,000",
    category: "Web Development",
    tags: ["JavaScript", "Node.js", "React", "MongoDB"],
    type: "Pre-made Course"
  },
  {
    id: 6,
    title: "UI/UX Design Fundamentals",
    description: "Learn design principles, Figma, and user research methods",
    instructor: "Hassan Malik",
    instructorTitle: "Senior UX Designer at DesignStudio",
    rating: 4.7,
    students: 423,
    duration: "8 weeks",
    level: "Beginner",
    price: "PKR 18,000",
    category: "UI/UX Design",
    tags: ["Figma", "Design", "UX Research"],
    type: "Pre-made Course"
  },
];

export default function BrowsePage() {
  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Explore Learning Resources</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover courses, find tutors, and request custom learning paths. 
          All taught by industry professionals from Pakistan's top companies.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search courses, technologies, or tutors..." 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pre-made">Pre-made</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-bold mb-4">Browse by Category</h2>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold text-sm">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} courses</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Course Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Available Courses</h2>
          <Button variant="outline" asChild>
            <Link href="/request-learning">
              <Plus className="h-4 w-4 mr-2" />
              Request Custom Learning
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={
                    course.type === "Live Course" ? "default" :
                    course.type === "Custom Learning" ? "secondary" : "outline"
                  }>
                    {course.type}
                  </Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                <CardDescription className="text-sm">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.students} students</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-sm">{course.instructor}</p>
                  <p className="text-xs text-muted-foreground">{course.instructorTitle}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold text-lg text-primary">{course.price}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Preview
                    </Button>
                    <Button size="sm">
                      {course.type === "Custom Learning" ? "Request" : "Enroll"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Can't Find What You're Looking For?</h3>
          <p className="text-muted-foreground mb-4">
            Request custom learning for any technology or skill. Our expert tutors will create 
            a personalized curriculum just for you.
          </p>
          <div className="flex gap-2 justify-center">
            <Button asChild>
              <Link href="/request-learning">Request Custom Learning</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/tutors">Browse Tutors</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}