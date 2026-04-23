import LearnCategories from "@/components/learn/LearnCategories";
import CourseSeriesCard, {
  CourseSeriesProps,
} from "@/components/learn/CourseSeriesCard";
import ContentUnitCard, {
  ContentUnitType,
} from "@/components/learn/ContentUnitCard";
import { Trophy, Code, PlaySquare, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Learn | SkillVersity",
  description:
    "Explore our comprehensive learning paths including skill-based, role-based, and degree programs.",
};

// Ecosystem Data
const ECOSYSTEM_SERIES: CourseSeriesProps[] = [
  {
    id: "fs-01",
    title: "Full Stack Engineer Career Path",
    provider: { name: "SkillVersity", type: "platform" },
    courseCount: 8,
    duration: "6 Months",
    level: "Intermediate",
    skills: ["React", "Node.js", "PostgreSQL", "System Design"],
    includes: [
      "video",
      "reading",
      "sandbox",
      "project",
      "capstone",
      "feedback",
    ],
  },
  {
    id: "ai-02",
    title: "AI Engineer: LLMs & Agents",
    provider: { name: "TechCorp", type: "company" },
    courseCount: 6,
    duration: "5 Months",
    level: "Advanced",
    skills: ["Python", "LangChain", "OpenAI API", "Vector DBs"],
    includes: ["video", "sandbox", "project", "quiz", "community"],
  },
  {
    id: "ui-03",
    title: "Product Design & UX Research",
    provider: { name: "CreativeStudio", type: "company" },
    courseCount: 5,
    duration: "4 Months",
    level: "Beginner",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    includes: ["video", "reading", "project", "feedback", "capstone"],
  },
  {
    id: "ui-04",
    title: "SEO & Digital Marketing Mastery",
    provider: { name: "CreativeStudio", type: "company" },
    courseCount: 5,
    duration: "4 Months",
    level: "Beginner",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    includes: ["video", "reading", "project", "feedback", "capstone"],
  },
  {
    id: "ui-05",
    title: "SEO & Digital Marketing Mastery",
    provider: { name: "CreativeStudio", type: "company" },
    courseCount: 5,
    duration: "4 Months",
    level: "Beginner",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    includes: ["video", "reading", "project", "feedback", "capstone"],
  },
  {
    id: "ui-04",
    title: "SEO & Digital Marketing Mastery",
    provider: { name: "CreativeStudio", type: "company" },
    courseCount: 5,
    duration: "4 Months",
    level: "Beginner",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    includes: ["video", "reading", "project", "feedback", "capstone"],
  },
];

const QUICK_PRACTICE_UNITS = [
  {
    id: "p1",
    type: "project" as ContentUnitType,
    title: "Build a Netflix Clone",
    level: "Intermediate" as const,
    duration: "2h",
  },
  {
    id: "s1",
    type: "sandbox" as ContentUnitType,
    title: "React Hooks Playground",
    level: "Beginner" as const,
    duration: "1h",
  },
  {
    id: "v1",
    type: "video" as ContentUnitType,
    title: "System Design: Scaling to 1M Users",
    level: "Advanced" as const,
    duration: "45m",
  },
  {
    id: "a1",
    type: "article" as ContentUnitType,
    title: "The Future of AI Agents in 2025",
    level: "All Levels" as const,
    duration: "5m",
  },
];

const LearnPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Decorative Background Elements */}
      <div className=" inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 lefixedft-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <main className="relative container mx-auto px-4 py-12 md:py-20 lg:py-24 space-y-24">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center justify-center p-1.5 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <Zap className="w-4 h-4 mr-2" />
            New: Interactive Career Paths
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            A Complete{" "}
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Learning Ecosystem
            </span>
          </h1>

          <p className="text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Not just videos. Learn with sandboxes, projects, quizzes, and mentor
            feedback all in one place.
          </p>
        </div>

        {/* Feature Highlights (Ecosystem View) */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Comprehensive Career Paths
              </h2>
              <p className="text-muted-foreground mt-1">
                Integrated programs that include everything you need to master a
                skill.
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex">
              Browse All Paths <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ECOSYSTEM_SERIES.map(series => (
              <div key={series.id} className="h-[420px]">
                <CourseSeriesCard {...series} />
              </div>
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          <div className="flex items-center gap-2 mb-6">
            <PlaySquare className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Explore by Topic</h2>
          </div>
          <LearnCategories />
        </section>

        {/* Quick Practice / Labs */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4 lg:col-span-3 space-y-5">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Code className="w-6 h-6 text-green-500" />
                Skill Labs
              </h2>
              <p className="text-muted-foreground">
                Short on time? Practice a specific skill with our isolated
                sandboxes and micro-projects.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Code className="w-4 h-4" /> Browser-based IDE
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4" /> Instant Feedback
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Trophy className="w-4 h-4" /> Skill Badges
                </div>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link href="/coming-soon/interactive-project">Open Lab</Link>
              </Button>
            </div>

            <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUICK_PRACTICE_UNITS.map(unit => (
                <ContentUnitCard key={unit.id} {...unit} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LearnPage;
