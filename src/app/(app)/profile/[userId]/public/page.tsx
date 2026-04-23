"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Briefcase, GraduationCap, Github, Linkedin, Globe, Code, BookOpen, Eye, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedBadge, CompanyBadge, OfficialBadge, GoldVerifiedBadge } from "@/components/ui/verified-badge";
import Link from "next/link";
import { RoleBadge } from "@/components/auth/RoleBadge";
import { ROLE_DISPLAY_NAMES } from "@/lib/role-config";
import type { UserRole } from "@/types";

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
    tutor_approved: boolean;
    is_tutor: boolean;
    user_type: string;
    selected_role?: string;
    onboarding_completed?: boolean;
  };
  summary: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  interests: string[];
  available_for_tutoring: boolean;
  available_for_mentoring: boolean;
  skills: { name: string; proficiency: string; years: number }[];
}

export default function PublicProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      const userData = localStorage.getItem("user_data");
      
      if (userId === "me" && userData) {
        try {
          const parsed = JSON.parse(userData);
          setProfile({
            id: parsed.id || "me",
            user: {
              id: parsed.id || "me",
              first_name: parsed.first_name || "",
              last_name: parsed.last_name || "",
              email: parsed.email || "",
              headline: parsed.headline || "",
              location: parsed.location || "",
              current_role: parsed.current_role || "",
              current_company: parsed.current_company || "",
              tutor_approved: parsed.tutor_approved || false,
              is_tutor: parsed.is_tutor || false,
              user_type: parsed.user_type || "individual",
              selected_role: parsed.selected_role,
              onboarding_completed: parsed.onboarding_completed,
            },
            summary: parsed.summary || "",
            linkedin_url: parsed.linkedin_url || "",
            github_url: parsed.github_url || "",
            portfolio_url: parsed.portfolio_url || "",
            interests: parsed.interests || [],
            available_for_tutoring: false,
            available_for_mentoring: false,
            skills: [],
          });
        } catch { /* ignore */ }
      } else {
        // Try dummy data
        try {
          const { dummyProfiles } = await import("@/lib/dummy-data");
          const found = dummyProfiles.find(p => p.user.id === userId || p.id === userId);
          if (found) setProfile(found as unknown as ProfileData);
        } catch { /* ignore */ }
      }
      setLoading(false);
    }
    fetchProfile();
  }, [userId]);

  const getUserRole = (user: ProfileData["user"]): UserRole => {
    if (user.tutor_approved) return "tutor";
    if (user.user_type === "company") return "company";
    if (user.selected_role === "sponsor") return "sponsor";
    if (user.onboarding_completed || user.selected_role === "learner") return "learner";
    return "general";
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 py-8">
        <Card><CardContent className="p-8"><div className="flex gap-6"><Skeleton className="h-24 w-24 rounded-full" /><div className="flex-1 space-y-3"><Skeleton className="h-8 w-48" /><Skeleton className="h-5 w-64" /></div></div></CardContent></Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <Card className="p-12 text-center">
          <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
          <Button asChild><Link href="/community">Browse Profiles</Link></Button>
        </Card>
      </div>
    );
  }

  const { user } = profile;
  const initials = user.first_name && user.last_name ? `${user.first_name[0]}${user.last_name[0]}` : "U";
  const profileRole = getUserRole(user);
  const displayName = user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : "User";

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-8">
      {/* Public View Banner */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium">Public Profile Preview</span>
            <span className="text-sm text-blue-600 dark:text-blue-400">— This is how others see your profile</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/profile/${userId === "me" ? "me" : userId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">{displayName}</h1>
                <RoleBadge role={profileRole} size="md" />
                {user.tutor_approved && (
                  <VerifiedBadge size="md" title="Verified Tutor" />
                )}
                {user.user_type === "company" && (user as any).company_verified && (
                  <CompanyBadge size="md" title="Verified Company" />
                )}
                {(user as any).is_sponsor && (
                  <GoldVerifiedBadge size="md" title="Sponsor" />
                )}
                {(user as any).is_platform_official && (
                  <OfficialBadge size="md" title="Official SkillVersity" />
                )}
              </div>
              <p className="text-muted-foreground mt-1">{user.headline || `${ROLE_DISPLAY_NAMES[profileRole]} on SkillVersity`}</p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                {user.current_role && user.current_company && (
                  <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{user.current_role} at {user.current_company}</span>
                )}
                {user.location && (
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{user.location}</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {profile.linkedin_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4 mr-1" />LinkedIn</a>
                  </Button>
                )}
                {profile.github_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4 mr-1" />GitHub</a>
                  </Button>
                )}
                {profile.portfolio_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer"><Globe className="h-4 w-4 mr-1" />Portfolio</a>
                  </Button>
                )}
              </div>

              {(profile.available_for_tutoring || profile.available_for_mentoring) && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {profile.available_for_tutoring && <Badge variant="secondary"><GraduationCap className="h-3 w-3 mr-1" />Available for Tutoring</Badge>}
                  {profile.available_for_mentoring && <Badge variant="secondary"><BookOpen className="h-3 w-3 mr-1" />Open to Mentoring</Badge>}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      {profile.summary && (
        <Card>
          <CardHeader><CardTitle>About</CardTitle></CardHeader>
          <CardContent><p className="text-muted-foreground whitespace-pre-line">{profile.summary}</p></CardContent>
        </Card>
      )}

      {/* Interests */}
      {profile.interests.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Interests</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => <Badge key={interest} variant="secondary">{interest}</Badge>)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {profile.skills.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Code className="h-5 w-5" />Skills</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {profile.skills.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-sm text-muted-foreground">{skill.years} years</p>
                  </div>
                  <Badge variant={skill.proficiency === "expert" ? "default" : "secondary"}>{skill.proficiency}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!profile.summary && profile.interests.length === 0 && profile.skills.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">This profile doesn't have much information yet.</p>
        </Card>
      )}
    </div>
  );
}
