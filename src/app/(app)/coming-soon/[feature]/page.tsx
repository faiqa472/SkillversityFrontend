"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Rocket, ArrowLeft, Bell, Sparkles, Clock, CheckCircle,
    Layers, Code, Users, Lock, Award, MessageSquare, GitBranch
} from "lucide-react";

// Feature Data Configuration
const FEATURE_CONFIG: Record<string, any> = {
    "learning-path": {
        title: "Open Source Curriculum",
        description: "Contribute to community-driven learning paths or build your own roadmap.",
        icon: GitBranch,
        color: "text-slate-500",
        bgColor: "bg-slate-500/10",
        features: [
            "Fork & Customize Paths",
            "Submit Pull Requests",
            "Track Progress via Commits",
            "Community Issues & Discussions"
        ]
    },
    "course-series": {
        title: "Professional Course Series",
        description: "Comprehensive multi-course programs designed to take you from beginner to job-ready expert.",
        icon: Layers,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        features: [
            "Structured Learning Paths",
            "Hands-on Capstone Projects",
            "Industry Recognized Certificates",
            "Career Support & Mentorship"
        ]
    },
    "interactive-project": {
        title: "Interactive Projects",
        description: "Build real-world applications directly in your browser with our cloud-based IDE.",
        icon: Code,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        features: [
            "No Setup Required",
            "Automated Code Grading",
            "Step-by-step Instructions",
            "Portfolio-ready Output"
        ]
    },
    "capstone": {
        title: "Capstone Projects",
        description: "The ultimate test of your skills. Build a complete product from scratch to earn your certification.",
        icon: Award,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        features: [
            "Real-world Scenarios",
            "Peer and Mentor Review",
            "Portfolio Showcase",
            "Final Certification Step"
        ]
    },
    "assessment": {
        title: "Skill Assessments",
        description: "Validate your knowledge with adaptive quizzes and coding challenges.",
        icon: CheckCircle,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        features: [
            "Adaptive Difficulty",
            "Detailed Performance Analysis",
            "Skill Badge Unlocks",
            "Recommendation Engine"
        ]
    },
    "community": {
        title: "Learning Community",
        description: "Connect, collaborate, and grow with fellow learners and mentors.",
        icon: Users,
        color: "text-indigo-500",
        bgColor: "bg-indigo-500/10",
        features: [
            "Discussion Forums",
            "Study Groups",
            "Peer Review System",
            "Event Calendar"
        ]
    },
    "feedback": {
        title: "Mentor Feedback",
        description: "Get personalized, code-level feedback from industry experts.",
        icon: MessageSquare,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
        features: [
            "Line-by-line Code Review",
            "Video Feedback",
            "Improvement Tips",
            "Best Practices"
        ]
    },
    "default": {
        title: "New Feature Coming Soon",
        description: "We are building something amazing to enhance your learning experience.",
        icon: Rocket,
        color: "text-primary",
        bgColor: "bg-primary/10",
        features: [
            "Enhanced User Experience",
            "New Learning Tools",
            "Performance Improvements",
            "Mobile Optimization"
        ]
    }
};

export default function DynamicComingSoonPage() {
    const params = useParams();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isNotified, setIsNotified] = useState(false);

    const featureKey = typeof params.feature === "string" ? params.feature : "default";
    const config = FEATURE_CONFIG[featureKey] || FEATURE_CONFIG["default"];
    const Icon = config.icon;

    const handleNotify = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        // Simulate API call
        setTimeout(() => {
            setIsNotified(true);
            setEmail("");
        }, 800);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Navigation */}
            <div className="container mx-auto px-4 py-6">
                <Button variant="ghost" onClick={() => router.back()} className="hover:bg-muted/50">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Learning
                </Button>
            </div>

            <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center max-w-4xl">
                {/* Hero Section */}
                <div className="text-center space-y-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="relative inline-block">
                        <div className={`h-24 w-24 rounded-2xl ${config.bgColor} flex items-center justify-center mx-auto mb-6 transform rotate-3`}>
                            <Icon className={`h-12 w-12 ${config.color}`} />
                        </div>
                        <div className="absolute -top-3 -right-3">
                            <Badge className="px-3 py-1 text-sm animate-pulse">
                                <Clock className="w-3 h-3 mr-1" /> In Development
                            </Badge>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        {config.title}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {config.description}
                    </p>
                </div>

                {/* Feature Preview Grid */}
                <div className="grid md:grid-cols-2 gap-8 w-full mb-16">
                    {/* Left: Interactive Preview (Mockup) */}
                    <Card className="overflow-hidden border-2 border-muted bg-muted/20 relative group">
                        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
                        <div className="p-8 h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-full max-w-xs bg-background rounded-lg shadow-xl p-4 border border-border/50 transform group-hover:scale-105 transition-transform duration-500">
                                <div className="space-y-3">
                                    <div className="h-4 bg-muted rounded w-3/4" />
                                    <div className="h-24 bg-muted/50 rounded w-full" />
                                    <div className="h-4 bg-muted/80 rounded w-1/2" />
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[1px]">
                                <div className="bg-background/80 backdrop-blur-md px-6 py-2 rounded-full border shadow-sm flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Preview Locked</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Right: What to Expect */}
                    <Card className="border-none shadow-none bg-transparent">
                        <CardHeader className="px-0 pt-0">
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-500" />
                                What to Expect
                            </CardTitle>
                            <CardDescription>
                                Here is a sneak peek at what we are building for you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-0 space-y-4">
                            {config.features.map((feature: string, i: number) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/50 hover:border-primary/20 transition-colors">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Notification CTA */}
                <div className="w-full max-w-md mx-auto">
                    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />

                        <CardContent className="p-6 text-center space-y-6">
                            <div className="space-y-2">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Bell className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">Get Early Access</h3>
                                <p className="text-muted-foreground text-sm">
                                    Be the first to know when {config.title} launches.
                                </p>
                            </div>

                            {isNotified ? (
                                <div className="bg-green-500/10 text-green-600 dark:text-green-400 p-4 rounded-lg flex items-center justify-center gap-2 animate-in zoom-in-95">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">You're on the list!</span>
                                </div>
                            ) : (
                                <form onSubmit={handleNotify} className="space-y-3">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="text-center"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Button type="submit" className="w-full font-semibold">
                                        Notify Me When Ready
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
