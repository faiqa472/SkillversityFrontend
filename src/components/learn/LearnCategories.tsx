"use client";

import React, { useState, useEffect } from "react";
import { Code2, Palette, Database, LineChart, Briefcase, GraduationCap, Layout, Globe, Cpu, ShieldCheck } from "lucide-react";
import CategoryCard, { CategoryItem } from "./CategoryCard";
import SkeletonLoader from "./SkeletonLoader";

type CategoryType = "skill" | "role" | "program";

// Dummy Data
const SKILL_DATA: CategoryItem[] = [
    {
        id: "s1",
        title: "Full Stack Development",
        description: "Master both frontend and backend technologies including React, Node.js, and Databases.",
        icon: <Code2 className="w-6 h-6" />,
        studentCount: "12k+",
        courseCount: "25",
        isPopular: true,
        tags: ["React", "Node", "MongoDB"]
    },
    {
        id: "s2",
        title: "UI/UX Design",
        description: "Learn to create beautiful user interfaces and seamless user experiences using Figma.",
        icon: <Palette className="w-6 h-6" />,
        studentCount: "8k+",
        courseCount: "18",
        tags: ["Figma", "Design Systems"]
    },
    {
        id: "s3",
        title: "Data Science",
        description: "Analyze data and build machine learning models with Python and modern libraries.",
        icon: <Database className="w-6 h-6" />,
        studentCount: "15k+",
        courseCount: "30",
        isNew: true,
        tags: ["Python", "ML", "AI"]
    },
    {
        id: "s4",
        title: "Digital Marketing",
        description: "Master SEO, social media marketing, and content strategy to grow businesses.",
        icon: <LineChart className="w-6 h-6" />,
        studentCount: "5k+",
        courseCount: "12",
        tags: ["SEO", "Marketing"]
    },
    {
        id: "s5",
        title: "Cyber Security",
        description: "Protect systems and networks from digital attacks. Learn ethical hacking.",
        icon: <ShieldCheck className="w-6 h-6" />,
        studentCount: "7k+",
        courseCount: "15",
        isPopular: true,
        tags: ["Security", "Network"]
    },
    {
        id: "s6",
        title: "Cloud Computing",
        description: "Deploy and manage applications on AWS, Azure, and Google Cloud Platform.",
        icon: <Globe className="w-6 h-6" />,
        studentCount: "9k+",
        courseCount: "20",
        tags: ["AWS", "Azure"]
    }
];

const ROLE_DATA: CategoryItem[] = [
    {
        id: "r1",
        title: "Frontend Developer",
        description: "Specialize in building the client-side of web applications.",
        icon: <Layout className="w-6 h-6" />,
        studentCount: "10k+",
        courseCount: "14",
        isPopular: true,
        tags: ["career-path"]
    },
    {
        id: "r2",
        title: "Backend Engineer",
        description: "Focus on server-side logic, databases, and API architecture.",
        icon: <Cpu className="w-6 h-6" />,
        studentCount: "8.5k+",
        courseCount: "16",
        tags: ["career-path"]
    },
    {
        id: "r3",
        title: "Product Manager",
        description: "Learn to lead product teams and define roadmap strategies.",
        icon: <Briefcase className="w-6 h-6" />,
        studentCount: "4k+",
        courseCount: "8",
        isNew: true,
        tags: ["management"]
    }
];

const PROGRAM_DATA: CategoryItem[] = [
    {
        id: "p1",
        title: "Degree Programs",
        description: "Earn a recognized degree in Computer Science or Business Administration.",
        icon: <GraduationCap className="w-6 h-6" />,
        duration: "3-4 Years",
        studentCount: "2k+",
        isPopular: true,
        tags: ["degree"]
    },
    {
        id: "p2",
        title: "Professional Certificates",
        description: "Short-term intensive programs to get you job-ready in 6 months.",
        icon: <AwardIcon />,
        duration: "6 Months",
        studentCount: "5k+",
        isNew: true,
        tags: ["certificate"]
    }
];

function AwardIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award w-6 h-6"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
    )
}


const LearnCategories: React.FC = () => {
    const [activeTab, setActiveTab] = useState<CategoryType>("skill");
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState<CategoryItem[]>([]);

    useEffect(() => {
        setIsLoading(true);
        // Simulate API delay for skeleton demo
        const timer = setTimeout(() => {
            switch (activeTab) {
                case "skill":
                    setItems(SKILL_DATA);
                    break;
                case "role":
                    setItems(ROLE_DATA);
                    break;
                case "program":
                    setItems(PROGRAM_DATA);
                    break;
            }
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [activeTab]);

    return (
        <div className="w-full space-y-8">
            {/* Tab Navigation */}
            <div className="flex justify-center">
                <div className="inline-flex items-center p-1 rounded-xl bg-muted/50 border border-border">
                    {(["skill", "role", "program"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 capitalize
                ${activeTab === tab
                                    ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"}
              `}
                        >
                            {tab.replace("-", " ")} Based
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    // Skeleton Loading State
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-[320px]">
                            <SkeletonLoader />
                        </div>
                    ))
                ) : (
                    // Actual Content
                    items.map((item, index) => (
                        <div
                            key={item.id}
                            className="h-[320px] animate-in fade-in slide-in-from-bottom-4 duration-500"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CategoryCard item={item} />
                        </div>
                    ))
                )}
            </div>

            {/* Empty State Fallback (Safety) */}
            {!isLoading && items.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                    No categories found for this selection.
                </div>
            )}
        </div>
    );
};

export default LearnCategories;
