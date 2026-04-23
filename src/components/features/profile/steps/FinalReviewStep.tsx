"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  CheckCircle,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Target,
  Building2,
  Loader2,
  Sparkles,
} from "lucide-react";
import type { StepProps } from "../RoleBasedOnboarding";

export function FinalReviewStep({ data, onBack, role }: StepProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!agreedToTerms) {
      setError("Please agree to the terms to continue");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.replace("/auth/login");
        return;
      }

      // Prepare profile data based on role
      const profileData: Record<string, unknown> = {
        headline: data.headline,
        bio: data.summary,
        location: data.location,
        phone: data.phone,
        linkedin_url: data.linkedinUrl,
        website_url: data.websiteUrl,
      };

      // Add role-specific data
      if (role === "learner") {
        profileData.learning_goals = data.learningGoals;
        profileData.preferred_learning_style = data.preferredLearningStyle;
        profileData.available_hours_per_week = data.availableHoursPerWeek;
      } else if (role === "tutor") {
        profileData.teaching_experience = data.teachingExperience;
        profileData.teaching_philosophy = data.teachingPhilosophy;
        profileData.hourly_rate = data.hourlyRate;
        profileData.available_for_mentoring = data.availableForMentoring;
      } else if (role === "company") {
        profileData.company_name = data.companyName;
        profileData.company_type = data.companyType;
        profileData.industry = data.industry;
        profileData.company_size = data.companySize;
        profileData.hiring_needs = data.hiringNeeds;
      }

      // Submit profile
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/users/profile/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // Submit work experience if any
      if (data.workExperience && data.workExperience.length > 0) {
        for (const exp of data.workExperience) {
          if (exp.title && exp.company) {
            await fetch(`${apiUrl}/api/users/work-experience/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                job_title: exp.title,
                company_name: exp.company,
                location: exp.location,
                start_date: exp.startDate || null,
                end_date: exp.isCurrent ? null : exp.endDate || null,
                is_current: exp.isCurrent,
                description: exp.description,
              }),
            });
          }
        }
      }

      // Submit education if any
      if (data.education && data.education.length > 0) {
        for (const edu of data.education) {
          if (edu.degree && edu.institution) {
            await fetch(`${apiUrl}/api/users/education/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                degree: edu.degree,
                institution: edu.institution,
                field_of_study: edu.fieldOfStudy,
                start_year: edu.startYear ? parseInt(edu.startYear) : null,
                end_year: edu.endYear ? parseInt(edu.endYear) : null,
                grade: edu.grade,
              }),
            });
          }
        }
      }

      // Submit skills if any
      if (data.skills && data.skills.length > 0) {
        for (const skill of data.skills) {
          await fetch(`${apiUrl}/api/users/user-skills/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              skill_name: skill.name,
              proficiency_level: skill.level,
              years_of_experience: skill.yearsOfExperience,
            }),
          });
        }
      }

      // Update local storage
      const userData = localStorage.getItem("user_data");
      if (userData) {
        const user = JSON.parse(userData);
        user.profile_completed = true;
        user.headline = data.headline;
        localStorage.setItem("user_data", JSON.stringify(user));
      }

      // Redirect based on role
      if (role === "tutor") {
        router.push("/tutor/apply");
      } else if (role === "company") {
        router.push("/company/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Profile submission error:", err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = (
    title: string,
    icon: React.ReactNode,
    content: React.ReactNode,
    isEmpty: boolean
  ) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        {title}
      </div>
      {isEmpty ? (
        <p className="text-sm text-muted-foreground italic">Not provided</p>
      ) : (
        content
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-primary" />
        <Label className="text-lg font-semibold">Review Your Profile</Label>
      </div>

      <p className="text-sm text-muted-foreground">
        Review your information before completing your profile setup.
      </p>

      <Card className="p-6 space-y-6">
        {/* Basic Info */}
        {renderSection(
          "Basic Information",
          <User className="h-4 w-4 text-primary" />,
          <div className="grid gap-2 text-sm">
            {data.headline && <p><span className="text-muted-foreground">Headline:</span> {data.headline}</p>}
            {data.location && <p><span className="text-muted-foreground">Location:</span> {data.location}</p>}
            {data.summary && <p><span className="text-muted-foreground">Summary:</span> {data.summary}</p>}
          </div>,
          !data.headline && !data.location && !data.summary
        )}

        <Separator />

        {/* Role-specific sections */}
        {role === "learner" && (
          <>
            {renderSection(
              "Learning Goals",
              <Target className="h-4 w-4 text-primary" />,
              <div className="flex flex-wrap gap-2">
                {data.learningGoals?.map((goal, i) => (
                  <Badge key={i} variant="secondary">{goal}</Badge>
                ))}
              </div>,
              !data.learningGoals || data.learningGoals.length === 0
            )}
            <Separator />
          </>
        )}

        {role === "tutor" && (
          <>
            {renderSection(
              "Teaching Expertise",
              <GraduationCap className="h-4 w-4 text-primary" />,
              <div className="text-sm space-y-1">
                {data.teachingExperience && <p><span className="text-muted-foreground">Experience:</span> {data.teachingExperience}</p>}
                {data.hourlyRate && <p><span className="text-muted-foreground">Hourly Rate:</span> ${data.hourlyRate}</p>}
                {data.expertiseAreas && data.expertiseAreas.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.expertiseAreas.map((area, i) => (
                      <Badge key={i} variant="secondary">{area.subject}</Badge>
                    ))}
                  </div>
                )}
              </div>,
              !data.teachingExperience && (!data.expertiseAreas || data.expertiseAreas.length === 0)
            )}
            <Separator />
          </>
        )}

        {role === "company" && (
          <>
            {renderSection(
              "Company Details",
              <Building2 className="h-4 w-4 text-primary" />,
              <div className="text-sm space-y-1">
                {data.companyName && <p><span className="text-muted-foreground">Company:</span> {data.companyName}</p>}
                {data.industry && <p><span className="text-muted-foreground">Industry:</span> {data.industry}</p>}
                {data.companySize && <p><span className="text-muted-foreground">Size:</span> {data.companySize}</p>}
              </div>,
              !data.companyName && !data.industry
            )}
            <Separator />
          </>
        )}

        {/* Work Experience */}
        {(role === "learner" || role === "tutor") && (
          <>
            {renderSection(
              "Work Experience",
              <Briefcase className="h-4 w-4 text-primary" />,
              <div className="space-y-2">
                {data.workExperience?.map((exp, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-medium">{exp.title} at {exp.company}</p>
                    <p className="text-muted-foreground">{exp.location}</p>
                  </div>
                ))}
              </div>,
              !data.workExperience || data.workExperience.length === 0
            )}
            <Separator />
          </>
        )}

        {/* Education */}
        {(role === "learner" || role === "tutor") && (
          <>
            {renderSection(
              "Education",
              <GraduationCap className="h-4 w-4 text-primary" />,
              <div className="space-y-2">
                {data.education?.map((edu, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-medium">{edu.degree} in {edu.fieldOfStudy}</p>
                    <p className="text-muted-foreground">{edu.institution}</p>
                  </div>
                ))}
              </div>,
              !data.education || data.education.length === 0
            )}
            <Separator />
          </>
        )}

        {/* Skills */}
        {(role === "learner" || role === "tutor") && (
          renderSection(
            "Skills",
            <Code className="h-4 w-4 text-primary" />,
            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill, i) => (
                <Badge key={i} variant="outline">
                  {skill.name} • {skill.level}
                </Badge>
              ))}
            </div>,
            !data.skills || data.skills.length === 0
          )
        )}
      </Card>

      {/* Terms Agreement */}
      <div className="flex items-start space-x-3">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="terms" className="text-sm cursor-pointer">
            I agree to the Terms of Service and Privacy Policy
          </Label>
          <p className="text-xs text-muted-foreground">
            By completing your profile, you agree to our terms and conditions.
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting || !agreedToTerms}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Complete Profile
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
