"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, GraduationCap, CheckCircle, ArrowRight, ArrowLeft, User, MapPin, Briefcase, Loader2, Sparkles } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

type UserRole = "learner" | "tutor";

interface ProfileData {
  first_name: string;
  last_name: string;
  headline: string;
  location: string;
  summary: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    headline: "",
    location: "",
    summary: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed.onboarding_completed && parsed.selected_role) {
          if (parsed.user_type === "company") router.replace("/company/dashboard");
          else if (parsed.user_type === "sponsor") router.replace("/partner/dashboard");
          else if (parsed.tutor_approved) router.replace("/tutor/dashboard");
          else router.replace("/dashboard");
          return;
        }
        setProfileData({
          first_name: parsed.first_name || "",
          last_name: parsed.last_name || "",
          headline: parsed.headline || "",
          location: parsed.location || "",
          summary: parsed.summary || "",
        });
        if (parsed.selected_role) setSelectedRole(parsed.selected_role as UserRole);
      } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, [router]);

  const roles = [
    { id: "learner" as const, title: "I want to Learn", description: "Access courses, build your portfolio, and get hired", icon: BookOpen, color: "blue", features: ["Access all courses and outlines", "Build verified skill portfolio", "Get matched with job opportunities", "Join learning community"] },
    { id: "tutor" as const, title: "I want to Teach", description: "Share expertise, create courses, and mentor others", icon: GraduationCap, color: "green", features: ["Create and publish courses", "Mentor students 1-on-1", "Verify student skills", "Build teaching reputation"], note: "Requires approval" },
  ];

  const handleComplete = async () => {
    if (!selectedRole) return;
    setIsSubmitting(true);
    const userData = localStorage.getItem("user_data");
    const existingData = userData ? JSON.parse(userData) : {};
    const updatedUser = { ...existingData, ...profileData, selected_role: selectedRole, role: selectedRole === "tutor" ? "learner" : selectedRole, onboarding_completed: true, profile_completed: true, tutor_pending: selectedRole === "tutor" };
    localStorage.setItem("user_data", JSON.stringify(updatedUser));
    if (user) setUser({ ...user, ...profileData, role: updatedUser.role, selected_role: selectedRole, onboarding_completed: true, profile_completed: true });
    setTimeout(() => { router.push(selectedRole === "tutor" ? "/tutor/apply" : "/dashboard"); setIsSubmitting(false); }, 500);
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors: Record<string, { bg: string; border: string; icon: string }> = {
      blue: { bg: isSelected ? "bg-blue-50 dark:bg-blue-950/30" : "", border: isSelected ? "border-blue-500" : "border-transparent", icon: "bg-blue-100 dark:bg-blue-900/30 text-blue-600" },
      green: { bg: isSelected ? "bg-green-50 dark:bg-green-950/30" : "", border: isSelected ? "border-green-500" : "border-transparent", icon: "bg-green-100 dark:bg-green-900/30 text-green-600" },
    };
    return colors[color] || colors.blue;
  };

  if (isLoading) return <div className="min-h-[80vh] flex flex-col items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="mt-4 text-muted-foreground">Loading...</p></div>;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of 2</span>
            <span className="text-sm font-medium">{step * 50}%</span>
          </div>
          <Progress value={step * 50} className="h-2" />
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in-50 duration-300">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4"><Sparkles className="h-3 w-3 mr-1" />Choose Your Path</Badge>
              <h1 className="text-3xl font-bold">Welcome to SkillVersity</h1>
              <p className="text-muted-foreground mt-2">How would you like to use the platform?</p>
            </div>
            <div className="grid gap-4">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                const colors = getColorClasses(role.color, isSelected);
                return (
                  <Card key={role.id} className={`cursor-pointer transition-all hover:shadow-lg border-2 ${colors.bg} ${colors.border}`} onClick={() => setSelectedRole(role.id)}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${colors.icon}`}><Icon className="h-6 w-6" /></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div><h3 className="text-lg font-semibold">{role.title}</h3><p className="text-sm text-muted-foreground">{role.description}</p></div>
                            {isSelected && <CheckCircle className="h-6 w-6 text-green-600" />}
                          </div>
                          <ul className="mt-3 space-y-1">{role.features.map((f, i) => <li key={i} className="text-sm text-muted-foreground flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" />{f}</li>)}</ul>
                          {role.note && <Badge variant="outline" className="mt-3">{role.note}</Badge>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="flex justify-end"><Button size="lg" disabled={!selectedRole} onClick={() => setStep(2)}>Continue<ArrowRight className="ml-2 h-4 w-4" /></Button></div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in-50 duration-300">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4"><User className="h-3 w-3 mr-1" />Your Profile</Badge>
              <h1 className="text-3xl font-bold">Complete Your Profile</h1>
              <p className="text-muted-foreground mt-2">Help others know who you are</p>
            </div>
            <Card>
              <CardHeader><CardTitle>Basic Information</CardTitle><CardDescription>This information will be visible on your public profile</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="first_name">First Name <span className="text-destructive">*</span></Label><Input id="first_name" value={profileData.first_name} onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })} placeholder="John" /></div>
                  <div className="space-y-2"><Label htmlFor="last_name">Last Name <span className="text-destructive">*</span></Label><Input id="last_name" value={profileData.last_name} onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })} placeholder="Doe" /></div>
                </div>
                <div className="space-y-2"><Label htmlFor="headline" className="flex items-center gap-2"><Briefcase className="h-4 w-4" />Professional Headline</Label><Input id="headline" value={profileData.headline} onChange={(e) => setProfileData({ ...profileData, headline: e.target.value })} placeholder="e.g., Full-Stack Developer | React & Node.js" /></div>
                <div className="space-y-2"><Label htmlFor="location" className="flex items-center gap-2"><MapPin className="h-4 w-4" />Location</Label><Input id="location" value={profileData.location} onChange={(e) => setProfileData({ ...profileData, location: e.target.value })} placeholder="e.g., Lahore, Pakistan" /></div>
                <div className="space-y-2"><Label htmlFor="summary">About You</Label><Textarea id="summary" value={profileData.summary} onChange={(e) => setProfileData({ ...profileData, summary: e.target.value })} placeholder="Tell us about yourself..." className="min-h-[100px]" /></div>
              </CardContent>
            </Card>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
              <Button size="lg" disabled={!profileData.first_name || !profileData.last_name || isSubmitting} onClick={handleComplete}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Completing...</> : <>Complete Profile<ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
