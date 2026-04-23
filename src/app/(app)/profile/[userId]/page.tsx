"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Github,
  Linkedin,
  Globe,
  Award,
  Code,
  BookOpen,
  MessageSquare,
  UserPlus,
  Lock,
  Sparkles,
  Target,
  Heart,
  Edit,
  FileText,
  Clock,
  Eye,
  ArrowRight,
  Compass,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedBadge, CompanyBadge, OfficialBadge, GoldVerifiedBadge } from "@/components/ui/verified-badge";
import Link from "next/link";
import { useRole } from "@/hooks/useRole";
import { RoleBadge } from "@/components/auth/RoleBadge";
import { ROLE_DISPLAY_NAMES } from "@/lib/role-config";
import type { UserRole } from "@/types";

// Skeleton Media Component for article thumbnails
function SkeletonMedia({ variant = "image" }: { variant?: "image" | "video" }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted aspect-video">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        {variant === "video" ? (
          <div className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[10px] border-l-muted-foreground/40 border-y-[6px] border-y-transparent ml-1" />
          </div>
        ) : (
          <svg className="w-8 h-8 text-muted-foreground/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zm0 2v10h16V7H4zm8 2a3 3 0 110 6 3 3 0 010-6z" />
          </svg>
        )}
      </div>
    </div>
  );
}

// Dummy published articles for profile display
const dummyPublishedArticles = [
  {
    id: "1",
    title: "Getting Started with Machine Learning",
    excerpt: "A comprehensive guide to understanding the fundamentals of machine learning and how to apply them in real-world projects.",
    read_time: 8,
    views_count: 1250,
    likes_count: 89,
    published_at: "2024-11-15",
    tags: ["Machine Learning", "Python", "AI"],
    author_type: "tutor",
  },
  {
    id: "2",
    title: "Best Practices for React Development",
    excerpt: "Learn the industry-standard practices for building scalable and maintainable React applications.",
    read_time: 6,
    views_count: 890,
    likes_count: 67,
    published_at: "2024-10-28",
    tags: ["React", "JavaScript", "Frontend"],
    author_type: "community",
  },
  {
    id: "3",
    title: "Introduction to Cloud Architecture",
    excerpt: "Understanding cloud infrastructure and how to design systems that scale effectively.",
    read_time: 10,
    views_count: 2100,
    likes_count: 156,
    published_at: "2024-09-20",
    tags: ["Cloud", "AWS", "Architecture"],
    author_type: "platform",
  },
];

interface WorkExperience {
  id: number;
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  skills_used: string[];
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  field_of_study: string;
  start_year: number;
  end_year: number | null;
  grade: string;
}

interface Skill {
  name: string;
  proficiency: string;
  years: number;
}

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  github_url?: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  issue_date: string;
}

interface ProfileData {
  id: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    headline: string;
    location: string;
    current_role: string;
    current_company: string;
    experience_level: string;
    profile_completed: boolean;
    is_tutor: boolean;
    tutor_approved: boolean;
    user_type: string;
    selected_role?: string;
    onboarding_completed?: boolean;
    company_verified?: boolean;
    is_sponsor?: boolean;
    is_platform_official?: boolean;
    profile_picture?: string;
  };
  summary: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  career_goals: string;
  interests: string[];
  available_for_tutoring: boolean;
  available_for_mentoring: boolean;
  is_public: boolean;
  completeness_score: number;
  work_experiences: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [canView, setCanView] = useState(true);
  useRole(); // Hook for role context

  useEffect(() => {
    // Check if viewing own profile
    const userData = localStorage.getItem("user_data");
    let currentUserId: string | null = null;
    let currentUserData: Record<string, unknown> | null = null;

    if (userData) {
      try {
        currentUserData = JSON.parse(userData);
        currentUserId = currentUserData?.id as string;
        setIsOwnProfile(currentUserId === userId || userId === "me");
      } catch {
        // ignore
      }
    }

    // Fetch profile data
    async function fetchProfile() {
      setLoading(true);

      // If viewing own profile ("me"), use localStorage data
      if (userId === "me" && currentUserData) {
        const ownProfile: ProfileData = {
          id: currentUserId || "me",
          user: {
            id: currentUserId || "me",
            first_name: (currentUserData.first_name as string) || "",
            last_name: (currentUserData.last_name as string) || "",
            email: (currentUserData.email as string) || "",
            headline: (currentUserData.headline as string) || "",
            location: (currentUserData.location as string) || "",
            current_role: (currentUserData.current_role as string) || "",
            current_company: (currentUserData.current_company as string) || "",
            experience_level: (currentUserData.experience_level as string) || "",
            profile_completed: (currentUserData.profile_completed as boolean) || false,
            is_tutor: (currentUserData.is_tutor as boolean) || false,
            tutor_approved: (currentUserData.tutor_approved as boolean) || false,
            user_type: (currentUserData.user_type as string) || "individual",
            selected_role: currentUserData.selected_role as string,
            onboarding_completed: currentUserData.onboarding_completed as boolean,
            company_verified: currentUserData.company_verified as boolean,
          },
          summary: "",
          linkedin_url: "",
          github_url: "",
          portfolio_url: "",
          career_goals: "",
          interests: [],
          available_for_tutoring: false,
          available_for_mentoring: false,
          is_public: true,
          completeness_score: 0,
          work_experiences: [],
          education: [],
          skills: [],
          projects: [],
          certifications: [],
        };

        setProfile(ownProfile);
        setCanView(true);
        setIsOwnProfile(true);
        setLoading(false);
        return;
      }

      // Fetch other user's profile from API
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`http://localhost:8000/api/users/public-profiles/${userId}/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setCanView(data.is_public || isOwnProfile);
        } else {
          // API failed, try dummy data
          const { dummyProfiles } = await import("@/lib/dummy-data");
          const dummyProfile = dummyProfiles.find(p => p.user.id === userId || p.id === userId);
          if (dummyProfile) {
            setProfile(dummyProfile as unknown as ProfileData);
            setCanView(dummyProfile.is_public);
          } else {
            setProfile(null);
          }
        }
      } catch {
        // If API fails, try to use dummy data for demo
        try {
          const { dummyProfiles } = await import("@/lib/dummy-data");
          const dummyProfile = dummyProfiles.find(p => p.user.id === userId || p.id === userId);
          if (dummyProfile) {
            setProfile(dummyProfile as unknown as ProfileData);
            setCanView(dummyProfile.is_public);
          } else {
            setProfile(null);
          }
        } catch {
          setProfile(null);
        }
      }
      setLoading(false);
    }

    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in-50 duration-500">
        {/* Profile Header Skeleton */}
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-48" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-5 w-72" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-10 w-full rounded-lg" />

          {/* Content Cards Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <Card className="p-12 text-center">
        <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
        <p className="text-muted-foreground mb-4">
          This profile doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/community">Browse Profiles</Link>
        </Button>
      </Card>
    );
  }

  if (!canView) {
    return (
      <Card className="p-12 text-center">
        <Lock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Private Profile</h2>
        <p className="text-muted-foreground mb-4">
          This profile is private. Connect with the user to view their full profile.
        </p>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Send Connection Request
        </Button>
      </Card>
    );
  }

  const { user } = profile;
  const initials = user.first_name && user.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`
    : user.email?.[0]?.toUpperCase() || "U";

  // Determine the user's role for display
  const getUserRole = (): UserRole => {
    if (user.tutor_approved) return "tutor";
    if (user.user_type === "company") return "company";
    if (user.selected_role === "sponsor") return "sponsor";
    if (user.onboarding_completed || user.selected_role === "learner" || user.selected_role === "member") return "learner";
    return "general";
  };

  const profileRole = getUserRole();
  const displayName = user.first_name && user.last_name
    ? `${user.first_name} ${user.last_name}`
    : user.email || "User";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={user.profile_picture || ""} />
              <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-3xl font-bold">
                      {displayName}
                    </h1>
                    {/* Role Badge */}
                    <RoleBadge role={profileRole} size="md" />

                    {/* Verified Badges - Different for each type */}
                    {user.tutor_approved && (
                      <VerifiedBadge size="md" title="Verified Tutor" />
                    )}
                    {user.user_type === "company" && user.company_verified && (
                      <CompanyBadge size="md" title="Verified Company" />
                    )}
                    {user.is_sponsor && (
                      <GoldVerifiedBadge size="md" title="Sponsor" />
                    )}
                    {user.is_platform_official && (
                      <OfficialBadge size="md" title="Official SkillVersity" />
                    )}

                    {/* Tutor Pending Badge */}
                    {user.is_tutor && !user.tutor_approved && (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                        Tutor Pending
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground mt-1">
                    {user.headline || `${ROLE_DISPLAY_NAMES[profileRole]} on SkillVersity`}
                  </p>
                </div>

                {isOwnProfile ? (
                  <div className="flex gap-2">
                    <Button asChild>
                      <Link href="/settings">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/profile/${user.id || "me"}/public`} target="_blank">
                        <Globe className="mr-2 h-4 w-4" />
                        View Public
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                {user.current_role && user.current_company && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {user.current_role} at {user.current_company}
                  </span>
                )}
                {user.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {profile.linkedin_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-1" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {profile.github_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />
                      GitHub
                    </a>
                  </Button>
                )}
                {profile.portfolio_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-1" />
                      Portfolio
                    </a>
                  </Button>
                )}
              </div>

              {/* Availability Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {profile.available_for_tutoring && (
                  <Badge variant="secondary">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    Available for Tutoring
                  </Badge>
                )}
                {profile.available_for_mentoring && (
                  <Badge variant="secondary">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Open to Mentoring
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content Tabs */}
      <Tabs defaultValue="about" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="outlines">Paths</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-300">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.summary ? (
                <p className="text-muted-foreground whitespace-pre-line">
                  {profile.summary}
                </p>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="h-12 w-12 rounded-full bg-muted mx-auto flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    {isOwnProfile
                      ? "Tell others about yourself, your background, and what makes you unique."
                      : "This user hasn't added a bio yet."}
                  </p>
                  {isOwnProfile && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/settings">
                        <Edit className="h-4 w-4 mr-2" />
                        Add Bio
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Career Goals Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Career Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.career_goals ? (
                <p className="text-muted-foreground">{profile.career_goals}</p>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="h-12 w-12 rounded-full bg-muted mx-auto flex items-center justify-center">
                    <Target className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    {isOwnProfile
                      ? "Share your career aspirations and where you see yourself in the future."
                      : "No career goals shared yet."}
                  </p>
                  {isOwnProfile && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/settings">
                        <Edit className="h-4 w-4 mr-2" />
                        Add Goals
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interests Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.interests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="animate-in fade-in-50 duration-300">
                      {interest}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="h-12 w-12 rounded-full bg-muted mx-auto flex items-center justify-center">
                    <Heart className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    {isOwnProfile
                      ? "Add your interests to connect with like-minded professionals."
                      : "No interests added yet."}
                  </p>
                  {isOwnProfile && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/settings">
                        <Edit className="h-4 w-4 mr-2" />
                        Add Interests
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats for own profile */}
          {isOwnProfile && (
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Profile Completeness</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete your profile to attract more connections
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">
                      {profile.completeness_score || 0}%
                    </span>
                  </div>
                </div>
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${profile.completeness_score || 0}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Articles Tab */}
        <TabsContent value="articles" className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-300">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Published Articles
                </CardTitle>
                {isOwnProfile && (
                  <Button size="sm" asChild>
                    <Link href="/articles/new">
                      Write Article
                    </Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {dummyPublishedArticles.length > 0 ? (
                <div className="space-y-4">
                  {dummyPublishedArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className="flex gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors"
                    >
                      {/* Article Thumbnail - Skeleton Media */}
                      <div className="w-32 md:w-40 flex-shrink-0">
                        <SkeletonMedia variant={index % 2 === 1 ? "video" : "image"} />
                      </div>

                      {/* Article Content */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/articles/${article.id}`}>
                          <h3 className="font-semibold hover:text-primary cursor-pointer line-clamp-1">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.read_time} min read
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {article.views_count} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {article.likes_count}
                          </span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {article.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Read More */}
                      <div className="hidden md:flex items-center">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/articles/${article.id}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="h-12 w-12 rounded-full bg-muted mx-auto flex items-center justify-center">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    {isOwnProfile
                      ? "Share your knowledge by writing articles for the community."
                      : "No articles published yet."}
                  </p>
                  {isOwnProfile && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/articles/new">
                        <Edit className="h-4 w-4 mr-2" />
                        Write Your First Article
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Community Articles Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                From the Community
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Articles from tutors, companies, and the platform
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Community Article Cards with Skeleton Media */}
                {[
                  { title: "Advanced TypeScript Patterns", author: "Platform Team", type: "platform", views: 3200 },
                  { title: "Building Scalable APIs", author: "Tech Corp", type: "company", views: 1800 },
                  { title: "Career Growth in Tech", author: "Sarah M.", type: "tutor", views: 2400 },
                  { title: "Open Source Contributions", author: "Community", type: "community", views: 950 },
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
                    <div className="mb-3">
                      <SkeletonMedia variant={index % 3 === 0 ? "video" : "image"} />
                    </div>
                    <h4 className="font-medium line-clamp-1">{item.title}</h4>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {item.type === "platform" && <Badge variant="default" className="text-xs">Official</Badge>}
                        {item.type === "company" && <Badge variant="secondary" className="text-xs">Company</Badge>}
                        {item.type === "tutor" && <Badge variant="outline" className="text-xs">Tutor</Badge>}
                        {item.type === "community" && <Badge variant="outline" className="text-xs">Community</Badge>}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {item.views}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/articles">
                    Browse All Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Outlines/Learning Paths Tab */}
        <TabsContent value="outlines" className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-300">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Compass className="h-5 w-5" />
                  My Learning Paths
                </CardTitle>
                {isOwnProfile && (
                  <Button size="sm" asChild>
                    <Link href="/learning-paths/create">
                      Create Path
                    </Link>
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {isOwnProfile ? "Learning paths you've created or contributed to" : "Learning paths created by this user"}
              </p>
            </CardHeader>
            <CardContent>
              {/* Placeholder for user's outlines - will be fetched from API */}
              <div className="text-center py-8 space-y-3">
                <div className="h-12 w-12 rounded-full bg-muted mx-auto flex items-center justify-center">
                  <Compass className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  {isOwnProfile
                    ? "Create learning paths to share your expertise with the community."
                    : "No learning paths created yet."}
                </p>
                {isOwnProfile && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/learning-paths/create">
                      <Edit className="h-4 w-4 mr-2" />
                      Create Your First Path
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stats Card for own profile */}
          {isOwnProfile && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Paths Created</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Contributors</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Total Stars</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {profile.work_experiences.length > 0 ? (
                profile.work_experiences.map((exp, index) => (
                  <div key={exp.id}>
                    {index > 0 && <Separator className="my-6" />}
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">
                          {exp.location} • {new Date(exp.start_date).getFullYear()} -{" "}
                          {exp.is_current ? "Present" : exp.end_date ? new Date(exp.end_date).getFullYear() : ""}
                        </p>
                        <p className="mt-2 text-sm">{exp.description}</p>
                        {exp.skills_used.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {exp.skills_used.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No work experience added yet
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Skills & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.skills.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {profile.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div>
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {skill.years} years experience
                        </p>
                      </div>
                      <Badge
                        variant={
                          skill.proficiency === "expert"
                            ? "default"
                            : skill.proficiency === "advanced"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {skill.proficiency}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No skills added yet
                </p>
              )}
            </CardContent>
          </Card>

          {profile.certifications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                      <Award className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} • {new Date(cert.issue_date).getFullYear()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-300">
          {/* Add Project CTA for own profile */}
          {isOwnProfile && (
            <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200 dark:border-violet-800">
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-violet-900 dark:text-violet-100">Showcase Your Work</h3>
                    <p className="text-sm text-violet-700 dark:text-violet-300">
                      Add projects from SkillVersity courses, GitHub, or local files to build your portfolio
                    </p>
                  </div>
                  <Button className="bg-violet-600 hover:bg-violet-700" asChild>
                    <Link href="/projects/new">
                      <Code className="mr-2 h-4 w-4" />
                      Add Project
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Featured Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Projects
                </CardTitle>
                {profile.projects.length > 0 && (
                  <Badge variant="secondary">{profile.projects.length} projects</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {profile.projects.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {profile.projects.map((project, index) => (
                    <div key={project.id} className="group p-4 rounded-lg border hover:border-primary/50 hover:shadow-md transition-all">
                      {/* Project Thumbnail */}
                      <div className="mb-3">
                        <SkeletonMedia variant={index % 2 === 0 ? "image" : "video"} />
                      </div>

                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            {project.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        {project.github_url && (
                          <Button variant="ghost" size="icon" className="shrink-0 ml-2" asChild>
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="h-16 w-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                    <Code className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">No projects yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {isOwnProfile
                      ? "Showcase your best work! Add projects from courses, GitHub, or upload your own."
                      : "This user hasn't added any projects yet."}
                  </p>
                  {isOwnProfile && (
                    <Button variant="outline" asChild>
                      <Link href="/projects/new">
                        <Code className="mr-2 h-4 w-4" />
                        Add Your First Project
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Project Sources Info */}
          {isOwnProfile && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">Import Projects From</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-background">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">SkillVersity Courses</p>
                      <p className="text-xs text-muted-foreground">Projects from completed courses</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-background">
                    <div className="h-10 w-10 rounded-lg bg-gray-900 dark:bg-gray-100 flex items-center justify-center shrink-0">
                      <Github className="h-5 w-5 text-white dark:text-gray-900" />
                    </div>
                    <div>
                      <p className="font-medium">GitHub / GitLab</p>
                      <p className="text-xs text-muted-foreground">Import from your repositories</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-background">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                      <Globe className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Manual Upload</p>
                      <p className="text-xs text-muted-foreground">Add any project with details</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {profile.education.length > 0 ? (
                profile.education.map((edu, index) => (
                  <div key={edu.id}>
                    {index > 0 && <Separator className="my-6" />}
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">
                          {edu.field_of_study} • {edu.start_year} - {edu.end_year || "Present"}
                        </p>
                        {edu.grade && (
                          <p className="text-sm mt-1">Grade: {edu.grade}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No education added yet
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
