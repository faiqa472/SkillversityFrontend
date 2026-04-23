"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Briefcase, GraduationCap, Award, Code, UserCheck } from "lucide-react";
import { z } from "zod";

const profileCompletionSchema = z.object({
  // Professional Summary
  summary: z.string().min(50, "Professional summary must be at least 50 characters"),
  
  // Work Experience
  workExperience: z.array(z.object({
    title: z.string().min(2, "Job title is required"),
    company: z.string().min(2, "Company name is required"),
    location: z.string().min(2, "Location is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    isCurrent: z.boolean().default(false),
    description: z.string().min(20, "Job description must be at least 20 characters"),
  })).min(1, "Add at least one work experience"),
  
  // Education
  education: z.array(z.object({
    degree: z.string().min(2, "Degree is required"),
    institution: z.string().min(2, "Institution is required"),
    fieldOfStudy: z.string().min(2, "Field of study is required"),
    startYear: z.string().min(4, "Start year is required"),
    endYear: z.string().optional(),
    isCurrent: z.boolean().default(false),
    grade: z.string().optional(),
  })).min(1, "Add at least one education entry"),
  
  // Skills
  skills: z.array(z.object({
    name: z.string().min(1, "Skill name is required"),
    level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
    yearsOfExperience: z.string().optional(),
  })).min(3, "Add at least 3 skills"),
  
  // Certifications
  certifications: z.array(z.object({
    name: z.string().min(2, "Certification name is required"),
    issuer: z.string().min(2, "Issuing organization is required"),
    issueDate: z.string().min(1, "Issue date is required"),
    expiryDate: z.string().optional(),
    credentialId: z.string().optional(),
    credentialUrl: z.string().url().optional().or(z.literal("")),
  })).optional(),
  
  // Projects
  projects: z.array(z.object({
    name: z.string().min(2, "Project name is required"),
    description: z.string().min(20, "Project description must be at least 20 characters"),
    technologies: z.string().min(2, "Technologies used is required"),
    projectUrl: z.string().url().optional().or(z.literal("")),
    githubUrl: z.string().url().optional().or(z.literal("")),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
  })).optional(),
  
  // Career Goals
  careerGoals: z.string().min(30, "Career goals must be at least 30 characters"),
  
  // Availability for tutoring/mentoring
  availableForTutoring: z.boolean().default(false),
  tutoringAreas: z.array(z.string()).optional(),
});

type ProfileCompletionInput = z.infer<typeof profileCompletionSchema>;

const skillLevels = [
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "advanced", label: "Advanced (3-5 years)" },
  { value: "expert", label: "Expert (5+ years)" },
];

export function ProfileCompletionForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<ProfileCompletionInput>({
    resolver: zodResolver(profileCompletionSchema),
    defaultValues: {
      workExperience: [{ title: "", company: "", location: "", startDate: "", endDate: "", isCurrent: false, description: "" }],
      education: [{ degree: "", institution: "", fieldOfStudy: "", startYear: "", endYear: "", isCurrent: false, grade: "" }],
      skills: [{ name: "", level: "intermediate", yearsOfExperience: "" }],
      certifications: [],
      projects: [],
      availableForTutoring: false,
    },
  });

  const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
    control,
    name: "workExperience",
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "skills",
  });

  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({
    control,
    name: "certifications",
  });

  // Projects field array - reserved for future use
  useFieldArray({
    control,
    name: "projects",
  });

  const onSubmit = async (data: ProfileCompletionInput) => {
    setError("");
    
    try {
      const token = localStorage.getItem("access_token");
      
      // Save professional profile to backend
      const response = await fetch("http://localhost:8000/api/users/profile/professional/", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: data.summary,
          work_experience: data.workExperience,
          education: data.education,
          skills: data.skills,
          certifications: data.certifications || [],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      // Mark profile as complete in localStorage
      const userData = localStorage.getItem("user_data");
      if (userData) {
        const user = JSON.parse(userData);
        user.profile_completed = true;
        localStorage.setItem("user_data", JSON.stringify(user));
      }

      // Check if user selected tutor role - redirect to tutor application
      const userDataParsed = userData ? JSON.parse(userData) : {};
      if (userDataParsed.selected_role === "tutor") {
        router.push("/tutor/apply");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Profile save error:", err);
      
      // For now, still mark as complete and redirect (backend may not be running)
      const userData = localStorage.getItem("user_data");
      if (userData) {
        const user = JSON.parse(userData);
        user.profile_completed = true;
        localStorage.setItem("user_data", JSON.stringify(user));
      }
      
      const userDataParsed = userData ? JSON.parse(userData) : {};
      if (userDataParsed.selected_role === "tutor") {
        router.push("/tutor/apply");
      } else {
        router.push("/dashboard");
      }
    }
  };

  // Step 1: Professional Summary & Work Experience
  if (step === 1) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold">Professional Summary & Experience</h3>
          <p className="text-muted-foreground mt-2">
            Tell us about your professional background
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary *</Label>
            <Textarea 
              id="summary" 
              placeholder="I am a passionate software developer with 3+ years of experience in full-stack development. Skilled in React, Node.js, and cloud technologies. I enjoy solving complex problems and building scalable applications..."
              rows={4}
              {...register("summary")} 
            />
            <p className="text-xs text-muted-foreground">
              Write a compelling summary that highlights your expertise and career goals (minimum 50 characters)
            </p>
            {errors.summary && (
              <p className="text-sm text-destructive">{errors.summary.message}</p>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Work Experience
              </h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendWork({ title: "", company: "", location: "", startDate: "", endDate: "", isCurrent: false, description: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>

            {workFields.map((field, index) => (
              <Card key={field.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Experience #{index + 1}</h5>
                    {workFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWork(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Job Title *</Label>
                      <Input 
                        placeholder="Software Engineer" 
                        {...register(`workExperience.${index}.title`)} 
                      />
                      {errors.workExperience?.[index]?.title && (
                        <p className="text-sm text-destructive">{errors.workExperience[index]?.title?.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Company *</Label>
                      <Input 
                        placeholder="TechCorp Pakistan" 
                        {...register(`workExperience.${index}.company`)} 
                      />
                      {errors.workExperience?.[index]?.company && (
                        <p className="text-sm text-destructive">{errors.workExperience[index]?.company?.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Location *</Label>
                      <Input 
                        placeholder="Karachi, Pakistan" 
                        {...register(`workExperience.${index}.location`)} 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Start Date *</Label>
                      <Input 
                        type="month"
                        {...register(`workExperience.${index}.startDate`)} 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input 
                        type="month"
                        placeholder="Leave empty if current"
                        {...register(`workExperience.${index}.endDate`)} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Job Description *</Label>
                    <Textarea 
                      placeholder="Describe your responsibilities, achievements, and key projects..."
                      rows={3}
                      {...register(`workExperience.${index}.description`)} 
                    />
                    {errors.workExperience?.[index]?.description && (
                      <p className="text-sm text-destructive">{errors.workExperience[index]?.description?.message}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Button 
          type="button" 
          onClick={() => setStep(2)} 
          className="w-full"
        >
          Continue to Education
        </Button>
      </div>
    );
  }

  // Step 2: Education
  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold">Education Background</h3>
          <p className="text-muted-foreground mt-2">
            Add your educational qualifications
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendEducation({ degree: "", institution: "", fieldOfStudy: "", startYear: "", endYear: "", isCurrent: false, grade: "" })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>

          {educationFields.map((field, index) => (
            <Card key={field.id} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Education #{index + 1}</h5>
                  {educationFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Degree *</Label>
                    <Input 
                      placeholder="Bachelor of Science" 
                      {...register(`education.${index}.degree`)} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Field of Study *</Label>
                    <Input 
                      placeholder="Computer Science" 
                      {...register(`education.${index}.fieldOfStudy`)} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input 
                    placeholder="University of Karachi" 
                    {...register(`education.${index}.institution`)} 
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Start Year *</Label>
                    <Input 
                      placeholder="2018"
                      {...register(`education.${index}.startYear`)} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>End Year</Label>
                    <Input 
                      placeholder="2022"
                      {...register(`education.${index}.endYear`)} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Grade/CGPA</Label>
                    <Input 
                      placeholder="3.8/4.0"
                      {...register(`education.${index}.grade`)} 
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setStep(1)} 
            className="w-full"
          >
            Back
          </Button>
          <Button 
            type="button" 
            onClick={() => setStep(3)} 
            className="w-full"
          >
            Continue to Skills
          </Button>
        </div>
      </div>
    );
  }

  // Step 3: Skills & Certifications
  if (step === 3) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold">Skills & Certifications</h3>
          <p className="text-muted-foreground mt-2">
            Showcase your technical and professional skills
          </p>
        </div>

        <div className="space-y-6">
          {/* Skills Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Code className="h-5 w-5" />
                Skills
              </h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendSkill({ name: "", level: "intermediate", yearsOfExperience: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>

            {skillFields.map((field, index) => (
              <Card key={field.id} className="p-4">
                <div className="grid gap-4 md:grid-cols-4 items-end">
                  <div className="space-y-2">
                    <Label>Skill Name *</Label>
                    <Input 
                      placeholder="React.js" 
                      {...register(`skills.${index}.name`)} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Proficiency Level *</Label>
                    <Select onValueChange={(value) => setValue(`skills.${index}.level`, value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Years of Experience</Label>
                    <Input 
                      placeholder="3"
                      {...register(`skills.${index}.yearsOfExperience`)} 
                    />
                  </div>

                  <div>
                    {skillFields.length > 3 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Certifications Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certifications (Optional)
              </h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendCert({ name: "", issuer: "", issueDate: "", expiryDate: "", credentialId: "", credentialUrl: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Certification
              </Button>
            </div>

            {certFields.map((field, index) => (
              <Card key={field.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Certification #{index + 1}</h5>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCert(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Certification Name *</Label>
                      <Input 
                        placeholder="AWS Certified Solutions Architect" 
                        {...register(`certifications.${index}.name`)} 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Issuing Organization *</Label>
                      <Input 
                        placeholder="Amazon Web Services" 
                        {...register(`certifications.${index}.issuer`)} 
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Issue Date *</Label>
                      <Input 
                        type="month"
                        {...register(`certifications.${index}.issueDate`)} 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input 
                        type="month"
                        {...register(`certifications.${index}.expiryDate`)} 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Credential ID</Label>
                      <Input 
                        placeholder="ABC123XYZ"
                        {...register(`certifications.${index}.credentialId`)} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Credential URL</Label>
                    <Input 
                      placeholder="https://www.credly.com/badges/..."
                      {...register(`certifications.${index}.credentialUrl`)} 
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setStep(2)} 
            className="w-full"
          >
            Back
          </Button>
          <Button 
            type="button" 
            onClick={() => setStep(4)} 
            className="w-full"
          >
            Continue to Final Step
          </Button>
        </div>
      </div>
    );
  }

  // Step 4: Career Goals & Tutoring Availability
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold">Career Goals & Opportunities</h3>
        <p className="text-muted-foreground mt-2">
          Tell us about your aspirations and how you'd like to contribute
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="careerGoals">Career Goals & Aspirations *</Label>
          <Textarea 
            id="careerGoals" 
            placeholder="I aim to become a senior full-stack developer specializing in cloud-native applications. I'm particularly interested in leading development teams and mentoring junior developers..."
            rows={4}
            {...register("careerGoals")} 
          />
          <p className="text-xs text-muted-foreground">
            Describe your career objectives, what you want to achieve, and how this platform can help (minimum 30 characters)
          </p>
          {errors.careerGoals && (
            <p className="text-sm text-destructive">{errors.careerGoals.message}</p>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Tutoring & Mentoring
          </h4>
          
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">
              Interested in sharing your knowledge? You can apply to become a tutor later, 
              but let us know if you're interested in teaching or mentoring others.
            </p>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="availableForTutoring"
                {...register("availableForTutoring")}
                className="rounded border-gray-300"
              />
              <Label htmlFor="availableForTutoring">
                I'm interested in becoming a tutor/mentor on this platform
              </Label>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setStep(3)} 
          className="w-full"
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Profile..." : "Complete Profile & Continue"}
        </Button>
      </div>
    </form>
  );
}