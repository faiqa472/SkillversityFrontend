"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Lock,
  Bell,
  Shield,
  Trash2,
  GraduationCap,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Clock,
  Briefcase,
  MapPin,
  Link as LinkIcon,
  Phone,
  Plus,
  X,
  Save,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";

const API_BASE = "http://localhost:8000/api/users";

interface BasicProfile {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  headline: string;
  location: string;
  current_role: string;
  current_company: string;
  experience_level: string;
  phone: string;
}

interface ProfessionalProfile {
  summary: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  twitter_url: string;
  career_goals: string;
  interests: string[];
  is_public: boolean;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  headline?: string;
  [key: string]: string | undefined;
}

export default function SettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const {
    role: storeRole,
    isTutor: storeTutor,
    isLearner: storeLearner,
    isGeneral: storeGeneral,
  } = useRole();

  // Loading states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form data
  const [basicProfile, setBasicProfile] = useState<BasicProfile>({
    first_name: "",
    last_name: "",
    headline: "",
    location: "",
    current_role: "",
    current_company: "",
    experience_level: "",
    phone: "",
  });

  const [professionalProfile, setProfessionalProfile] = useState<ProfessionalProfile>({
    summary: "",
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
    twitter_url: "",
    career_goals: "",
    interests: [],
    is_public: true,
  });

  // UI state
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [activeTab, setActiveTab] = useState("profile");
  const [newSkill, setNewSkill] = useState("");
  const [userData, setUserData] = useState<Record<string, unknown> | null>(null);

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Fetch profile data on mount
  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    
    // First try to load from localStorage
    const localData = localStorage.getItem("user_data");
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        setBasicProfile({
          id: parsed.id,
          first_name: parsed.first_name || "",
          last_name: parsed.last_name || "",
          email: parsed.email || "",
          headline: parsed.headline || "",
          location: parsed.location || "",
          current_role: parsed.current_role || "",
          current_company: parsed.current_company || "",
          experience_level: parsed.experience_level || "",
          phone: parsed.phone || "",
        });
        setProfessionalProfile({
          summary: parsed.summary || "",
          linkedin_url: parsed.linkedin_url || "",
          github_url: parsed.github_url || "",
          portfolio_url: parsed.portfolio_url || "",
          twitter_url: parsed.twitter_url || "",
          career_goals: parsed.career_goals || "",
          interests: parsed.interests || [],
          is_public: parsed.is_public ?? true,
        });
        setUserData(parsed);
      } catch {
        // ignore parse error
      }
    }

    // Try to fetch from API if token exists
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const [basicRes, professionalRes] = await Promise.all([
          fetch(`${API_BASE}/profile/`, { headers }),
          fetch(`${API_BASE}/profile/professional/`, { headers }),
        ]);

        if (basicRes.ok) {
          const basicData = await basicRes.json();
          setBasicProfile({
            id: basicData.id,
            first_name: basicData.first_name || "",
            last_name: basicData.last_name || "",
            email: basicData.email || "",
            headline: basicData.headline || "",
            location: basicData.location || "",
            current_role: basicData.current_role || "",
            current_company: basicData.current_company || "",
            experience_level: basicData.experience_level || "",
            phone: basicData.phone || "",
          });
          setUserData(basicData);
          localStorage.setItem("user_data", JSON.stringify(basicData));
        }

        if (professionalRes.ok) {
          const profData = await professionalRes.json();
          setProfessionalProfile({
            summary: profData.summary || "",
            linkedin_url: profData.linkedin_url || "",
            github_url: profData.github_url || "",
            portfolio_url: profData.portfolio_url || "",
            twitter_url: profData.twitter_url || "",
            career_goals: profData.career_goals || "",
            interests: profData.interests || [],
            is_public: profData.is_public ?? true,
          });
        }
      } catch {
        // API not available, using localStorage data
      }
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!basicProfile.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!basicProfile.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save profile
  const handleSaveProfile = async () => {
    if (!validateForm()) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Try to update via API first
      let apiSuccess = false;
      try {
        const basicRes = await fetch(`${API_BASE}/profile/`, {
          method: "PUT",
          headers,
          body: JSON.stringify({
            first_name: basicProfile.first_name,
            last_name: basicProfile.last_name,
            headline: basicProfile.headline,
            location: basicProfile.location,
            current_role: basicProfile.current_role,
            current_company: basicProfile.current_company,
            experience_level: basicProfile.experience_level,
            phone: basicProfile.phone,
          }),
        });

        if (basicRes.ok) {
          const updatedBasic = await basicRes.json();
          localStorage.setItem("user_data", JSON.stringify(updatedBasic));
          setUserData(updatedBasic);
          apiSuccess = true;

          // Also try to update professional profile
          await fetch(`${API_BASE}/profile/professional/`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
              summary: professionalProfile.summary,
              linkedin_url: professionalProfile.linkedin_url,
              github_url: professionalProfile.github_url,
              portfolio_url: professionalProfile.portfolio_url,
              twitter_url: professionalProfile.twitter_url,
              career_goals: professionalProfile.career_goals,
              interests: professionalProfile.interests,
              is_public: professionalProfile.is_public,
            }),
          });
        }
      } catch {
        // API not available, fall back to localStorage
      }

      // If API failed, save to localStorage only
      if (!apiSuccess) {
        const existingData = localStorage.getItem("user_data");
        const currentData = existingData ? JSON.parse(existingData) : {};
        const updatedData = {
          ...currentData,
          ...basicProfile,
          summary: professionalProfile.summary,
          linkedin_url: professionalProfile.linkedin_url,
          github_url: professionalProfile.github_url,
          portfolio_url: professionalProfile.portfolio_url,
          interests: professionalProfile.interests,
        };
        localStorage.setItem("user_data", JSON.stringify(updatedData));
        setUserData(updatedData);
      }

      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update profile";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      await fetch(`${API_BASE}/profile/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      logout();
      router.push("/");
    } catch {
      setMessage({ type: "error", text: "Failed to delete account. Please try again." });
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !professionalProfile.interests.includes(newSkill.trim())) {
      setProfessionalProfile({
        ...professionalProfile,
        interests: [...professionalProfile.interests, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfessionalProfile({
      ...professionalProfile,
      interests: professionalProfile.interests.filter((s) => s !== skillToRemove),
    });
  };

  // Role status calculations
  const effectiveRole = storeRole || (userData as Record<string, unknown>)?.role || 
    (userData as Record<string, unknown>)?.selected_role || (userData as Record<string, unknown>)?.user_type;
  const hasSelectedRole = !!(
    (userData as Record<string, unknown>)?.onboarding_completed ||
    (userData as Record<string, unknown>)?.selected_role ||
    effectiveRole
  );
  const isTutorApproved = (userData as Record<string, unknown>)?.tutor_approved === true;
  const isTutorPending =
    (userData as Record<string, unknown>)?.tutor_pending === true ||
    ((userData as Record<string, unknown>)?.selected_role === "tutor" && !isTutorApproved);
  const hasTutorRole = storeTutor || isTutorApproved;
  const hasLearnerRole =
    storeLearner ||
    (userData as Record<string, unknown>)?.selected_role === "learner" ||
    (hasSelectedRole && !hasTutorRole && effectiveRole !== "company" && effectiveRole !== "sponsor");
  const isGeneralUser = storeGeneral || (!hasSelectedRole && !hasTutorRole);

  // Calculate profile completion
  const profileFields = [
    basicProfile.first_name,
    basicProfile.last_name,
    basicProfile.headline,
    professionalProfile.summary,
    basicProfile.location,
    professionalProfile.interests.length > 0,
  ];
  const completedFields = profileFields.filter(Boolean).length;
  const profileCompletion = Math.round((completedFields / profileFields.length) * 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and account preferences</p>
      </div>

      {message && (
        <Alert variant={message.type === "error" ? "destructive" : "default"}>
          {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Roles</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          {/* Profile Completion Card */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Profile Completion</h3>
                  <p className="text-sm text-muted-foreground">Complete your profile to stand out</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">{profileCompletion}%</span>
                </div>
              </div>
              <Progress value={profileCompletion} className="h-2" />
              {profileCompletion < 100 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Add your {!basicProfile.headline && "headline, "}
                  {!professionalProfile.summary && "summary, "}
                  {!basicProfile.location && "location, "}
                  {professionalProfile.interests.length === 0 && "interests "}
                  to complete your profile
                </p>
              )}
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={basicProfile.first_name}
                    onChange={(e) => setBasicProfile({ ...basicProfile, first_name: e.target.value })}
                    placeholder="John"
                    className={errors.first_name ? "border-destructive" : ""}
                  />
                  {errors.first_name && <p className="text-xs text-destructive">{errors.first_name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={basicProfile.last_name}
                    onChange={(e) => setBasicProfile({ ...basicProfile, last_name: e.target.value })}
                    placeholder="Doe"
                    className={errors.last_name ? "border-destructive" : ""}
                  />
                  {errors.last_name && <p className="text-xs text-destructive">{errors.last_name}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={basicProfile.email || ""} disabled />
                <p className="text-xs text-muted-foreground">Contact support to change your email</p>
              </div>
            </CardContent>
          </Card>

          {/* Professional Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Professional Profile
              </CardTitle>
              <CardDescription>Make a great first impression</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="headline">Professional Headline</Label>
                <Input
                  id="headline"
                  value={basicProfile.headline}
                  onChange={(e) => setBasicProfile({ ...basicProfile, headline: e.target.value })}
                  placeholder="e.g., Full-Stack Developer | React & Node.js Expert"
                />
                <p className="text-xs text-muted-foreground">A brief tagline that describes what you do</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">About Me</Label>
                <Textarea
                  id="summary"
                  value={professionalProfile.summary}
                  onChange={(e) => setProfessionalProfile({ ...professionalProfile, summary: e.target.value })}
                  placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currentRole">Current Role</Label>
                  <Input
                    id="currentRole"
                    value={basicProfile.current_role}
                    onChange={(e) => setBasicProfile({ ...basicProfile, current_role: e.target.value })}
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentCompany">Current Company</Label>
                  <Input
                    id="currentCompany"
                    value={basicProfile.current_company}
                    onChange={(e) => setBasicProfile({ ...basicProfile, current_company: e.target.value })}
                    placeholder="e.g., Tech Corp"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={basicProfile.location}
                    onChange={(e) => setBasicProfile({ ...basicProfile, location: e.target.value })}
                    placeholder="e.g., Lahore, Pakistan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={basicProfile.phone}
                    onChange={(e) => setBasicProfile({ ...basicProfile, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Social Links
              </CardTitle>
              <CardDescription>Connect your online presence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    value={professionalProfile.linkedin_url}
                    onChange={(e) => setProfessionalProfile({ ...professionalProfile, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input
                    id="github"
                    value={professionalProfile.github_url}
                    onChange={(e) => setProfessionalProfile({ ...professionalProfile, github_url: e.target.value })}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio / Website</Label>
                  <Input
                    id="portfolio"
                    value={professionalProfile.portfolio_url}
                    onChange={(e) => setProfessionalProfile({ ...professionalProfile, portfolio_url: e.target.value })}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input
                    id="twitter"
                    value={professionalProfile.twitter_url}
                    onChange={(e) => setProfessionalProfile({ ...professionalProfile, twitter_url: e.target.value })}
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests/Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Interests & Skills
              </CardTitle>
              <CardDescription>Showcase your expertise and interests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add an interest or skill (e.g., React, Python, UI Design)"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" variant="secondary" onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {professionalProfile.interests.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {professionalProfile.interests.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1 pr-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              {professionalProfile.interests.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No interests added yet. Add interests to help others find you.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your profile visibility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Public Profile</p>
                  <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
                </div>
                <Switch
                  checked={professionalProfile.is_public}
                  onCheckedChange={(checked) => setProfessionalProfile({ ...professionalProfile, is_public: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSaveProfile} disabled={saving} size="lg">
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Your Roles
              </CardTitle>
              <CardDescription>
                {isGeneralUser ? "Select a role to unlock platform features" : "You can learn and teach on SkillVersity"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isGeneralUser && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You haven&apos;t selected a role yet. Choose a role to access all platform features.
                    <Button variant="link" className="p-0 h-auto ml-1" onClick={() => router.push("/onboarding")}>
                      Select your role →
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {/* Member Role */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${hasLearnerRole ? "bg-blue-100 dark:bg-blue-900/20" : "bg-muted"}`}>
                    <BookOpen className={`h-5 w-5 ${hasLearnerRole ? "text-blue-600" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="font-medium">Member</p>
                    <p className="text-sm text-muted-foreground">Access courses, outlines, and build your portfolio</p>
                  </div>
                </div>
                {hasLearnerRole ? (
                  <Badge variant="default">Active</Badge>
                ) : isGeneralUser ? (
                  <Button variant="outline" size="sm" onClick={() => router.push("/onboarding")}>
                    Select Role
                  </Button>
                ) : (
                  <Badge variant="outline">Inactive</Badge>
                )}
              </div>

              {/* Tutor Role */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      hasTutorRole
                        ? "bg-green-100 dark:bg-green-900/20"
                        : isTutorPending
                        ? "bg-yellow-100 dark:bg-yellow-900/20"
                        : "bg-muted"
                    }`}
                  >
                    <GraduationCap
                      className={`h-5 w-5 ${
                        hasTutorRole ? "text-green-600" : isTutorPending ? "text-yellow-600" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-medium">Tutor</p>
                    <p className="text-sm text-muted-foreground">Create courses and verify skills</p>
                    {isTutorPending && !hasTutorRole && (
                      <p className="text-xs text-yellow-600 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        Application pending review
                      </p>
                    )}
                  </div>
                </div>
                {hasTutorRole ? (
                  <Badge variant="default">Active</Badge>
                ) : isTutorPending ? (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Pending
                  </Badge>
                ) : hasSelectedRole ? (
                  <Button variant="outline" size="sm" onClick={() => router.push("/tutor/apply")}>
                    Apply
                  </Button>
                ) : (
                  <Badge variant="outline">Not Available</Badge>
                )}
              </div>

              {hasSelectedRole && <Separator className="my-4" />}

              {hasSelectedRole && (
                <Button variant="outline" className="w-full" onClick={() => router.push("/onboarding")}>
                  Change Role Selection
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what updates you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Course Updates</p>
                  <p className="text-sm text-muted-foreground">Get notified about enrolled course updates</p>
                </div>
                <Switch checked={courseUpdates} onCheckedChange={setCourseUpdates} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">Receive promotional content and offers</p>
                </div>
                <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Password & Security
              </CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={() => router.push("/auth/forgot-password")}>
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                This will permanently delete your account and all associated data.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
