"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  GraduationCap,
  Building2,
  CheckCircle,
  User,
  Briefcase,
  Code,
  Target,
  Sparkles,
} from "lucide-react";

// Import step components
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { LearnerGoalsStep } from "./steps/LearnerGoalsStep";
import { TutorExpertiseStep } from "./steps/TutorExpertiseStep";
import { CompanyInfoStep } from "./steps/CompanyInfoStep";
import { WorkExperienceStep } from "./steps/WorkExperienceStep";
import { EducationStep } from "./steps/EducationStep";
import { SkillsStep } from "./steps/SkillsStep";
import { FinalReviewStep } from "./steps/FinalReviewStep";

export type UserRole = "learner" | "tutor" | "company" | "sponsor";

export interface OnboardingData {
  // Basic Info (all roles)
  headline: string;
  summary: string;
  location: string;
  phone: string;
  linkedinUrl: string;
  websiteUrl: string;
  
  // Learner specific
  learningGoals: string[];
  preferredLearningStyle: string;
  availableHoursPerWeek: string;
  budgetRange: string;
  interestedTopics: string[];
  
  // Tutor specific
  teachingExperience: string;
  expertiseAreas: Array<{
    subject: string;
    proficiencyLevel: string;
    yearsOfExperience: number;
    canTeachLevels: string[];
  }>;
  teachingPhilosophy: string;
  availableForMentoring: boolean;
  hourlyRate: string;
  preferredSchedule: string[];
  
  // Company specific
  companyName: string;
  companyType: string;
  industry: string;
  companySize: string;
  hiringNeeds: string[];
  partnershipInterests: string[];
  
  // Work Experience (learner/tutor)
  workExperience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description: string;
  }>;
  
  // Education (learner/tutor)
  education: Array<{
    degree: string;
    institution: string;
    fieldOfStudy: string;
    startYear: string;
    endYear: string;
    grade: string;
  }>;
  
  // Skills (all individual roles)
  skills: Array<{
    name: string;
    level: string;
    yearsOfExperience: string;
  }>;
}

const initialData: OnboardingData = {
  headline: "",
  summary: "",
  location: "",
  phone: "",
  linkedinUrl: "",
  websiteUrl: "",
  learningGoals: [],
  preferredLearningStyle: "",
  availableHoursPerWeek: "",
  budgetRange: "",
  interestedTopics: [],
  teachingExperience: "",
  expertiseAreas: [],
  teachingPhilosophy: "",
  availableForMentoring: false,
  hourlyRate: "",
  preferredSchedule: [],
  companyName: "",
  companyType: "",
  industry: "",
  companySize: "",
  hiringNeeds: [],
  partnershipInterests: [],
  workExperience: [],
  education: [],
  skills: [],
};

interface StepConfig {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  component: React.ComponentType<StepProps>;
  roles: UserRole[];
}

export interface StepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
  role: UserRole;
}

const allSteps: StepConfig[] = [
  {
    id: "basic-info",
    title: "Basic Information",
    description: "Tell us about yourself",
    icon: User,
    component: BasicInfoStep,
    roles: ["learner", "tutor", "company", "sponsor"],
  },
  {
    id: "learner-goals",
    title: "Learning Goals",
    description: "What do you want to achieve?",
    icon: Target,
    component: LearnerGoalsStep,
    roles: ["learner"],
  },
  {
    id: "tutor-expertise",
    title: "Teaching Expertise",
    description: "Share your teaching experience",
    icon: GraduationCap,
    component: TutorExpertiseStep,
    roles: ["tutor"],
  },
  {
    id: "company-info",
    title: "Company Details",
    description: "Tell us about your organization",
    icon: Building2,
    component: CompanyInfoStep,
    roles: ["company"],
  },
  {
    id: "work-experience",
    title: "Work Experience",
    description: "Your professional background",
    icon: Briefcase,
    component: WorkExperienceStep,
    roles: ["learner", "tutor"],
  },
  {
    id: "education",
    title: "Education",
    description: "Your academic background",
    icon: BookOpen,
    component: EducationStep,
    roles: ["learner", "tutor"],
  },
  {
    id: "skills",
    title: "Skills & Expertise",
    description: "Showcase your abilities",
    icon: Code,
    component: SkillsStep,
    roles: ["learner", "tutor"],
  },
  {
    id: "review",
    title: "Review & Complete",
    description: "Finalize your profile",
    icon: CheckCircle,
    component: FinalReviewStep,
    roles: ["learner", "tutor", "company", "sponsor"],
  },
];

export function RoleBasedOnboarding() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  // Get user role from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        const selectedRole = user.selected_role || user.role;
        
        if (user.user_type === "company") {
          setRole("company");
        } else if (selectedRole === "tutor") {
          setRole("tutor");
        } else if (selectedRole === "sponsor") {
          setRole("sponsor");
        } else {
          setRole("learner");
        }
        
        // Pre-fill data from user
        setData(prev => ({
          ...prev,
          headline: user.headline || "",
          location: user.location || "",
          phone: user.phone || "",
        }));
      } catch {
        setRole("learner");
      }
    } else {
      router.replace("/onboarding");
    }
    setIsLoading(false);
  }, [router]);

  // Filter steps based on role
  const steps = role ? allSteps.filter(step => step.roles.includes(role)) : [];
  const currentStep = steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading || !role || !currentStep) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-8 w-8 animate-pulse mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">Preparing your profile setup...</p>
        </div>
      </div>
    );
  }

  const StepComponent = currentStep.component;
  const StepIcon = currentStep.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mb-2">
              {role === "learner" && "Learner Profile"}
              {role === "tutor" && "Tutor Application"}
              {role === "company" && "Company Profile"}
              {role === "sponsor" && "Sponsor Profile"}
            </Badge>
            <h1 className="text-2xl font-bold">Complete Your Profile</h1>
            <p className="text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Progress</p>
            <p className="text-2xl font-bold text-primary">{Math.round(progress)}%</p>
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        {/* Step Indicators */}
        <div className="flex justify-between overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;
            
            return (
              <div
                key={step.id}
                className={`flex flex-col items-center min-w-[80px] ${
                  isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isCompleted
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-muted"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span className="text-xs text-center hidden sm:block">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <StepIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>{currentStep.title}</CardTitle>
              <CardDescription>{currentStep.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <StepComponent
            data={data}
            updateData={updateData}
            onNext={handleNext}
            onBack={handleBack}
            isFirst={currentStepIndex === 0}
            isLast={currentStepIndex === steps.length - 1}
            role={role}
          />
        </CardContent>
      </Card>
    </div>
  );
}
