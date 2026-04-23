"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Plus, X, Briefcase } from "lucide-react";
import type { StepProps } from "../RoleBasedOnboarding";

export function WorkExperienceStep({ data, updateData, onNext, onBack, role }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addExperience = () => {
    const newExp = {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    };
    updateData({
      workExperience: [...(data.workExperience || []), newExp],
    });
  };

  const removeExperience = (index: number) => {
    const updated = [...(data.workExperience || [])];
    updated.splice(index, 1);
    updateData({ workExperience: updated });
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = [...(data.workExperience || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ workExperience: updated });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // For tutors, work experience is required
    if (role === "tutor" && (!data.workExperience || data.workExperience.length === 0)) {
      newErrors.workExperience = "Add at least one work experience";
    }
    
    // Validate each experience entry
    data.workExperience?.forEach((exp, index) => {
      if (exp.title || exp.company) {
        if (!exp.title) newErrors[`exp-${index}-title`] = "Job title is required";
        if (!exp.company) newErrors[`exp-${index}-company`] = "Company is required";
        if (!exp.startDate) newErrors[`exp-${index}-startDate`] = "Start date is required";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">
            Work Experience {role === "tutor" ? "*" : "(Optional)"}
          </Label>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addExperience}>
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {role === "learner" && (
        <p className="text-sm text-muted-foreground">
          Add your work experience to help tutors and companies understand your background.
          This is optional for learners but recommended.
        </p>
      )}

      {role === "tutor" && (
        <p className="text-sm text-muted-foreground">
          Your professional experience helps establish credibility with learners.
          Add relevant industry experience.
        </p>
      )}

      {errors.workExperience && (
        <p className="text-sm text-destructive">{errors.workExperience}</p>
      )}

      {(!data.workExperience || data.workExperience.length === 0) ? (
        <Card className="p-8 text-center border-dashed">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">No work experience added</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {role === "learner" 
              ? "Add your work experience or skip this step if you're just starting out"
              : "Add your professional experience to build credibility"
            }
          </p>
          <Button onClick={addExperience}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Experience
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.workExperience.map((exp, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Experience #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Job Title *</Label>
                    <Input
                      placeholder="Software Engineer"
                      value={exp.title}
                      onChange={(e) => updateExperience(index, "title", e.target.value)}
                      className={errors[`exp-${index}-title`] ? "border-destructive" : ""}
                    />
                    {errors[`exp-${index}-title`] && (
                      <p className="text-sm text-destructive">{errors[`exp-${index}-title`]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Company *</Label>
                    <Input
                      placeholder="TechCorp Pakistan"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      className={errors[`exp-${index}-company`] ? "border-destructive" : ""}
                    />
                    {errors[`exp-${index}-company`] && (
                      <p className="text-sm text-destructive">{errors[`exp-${index}-company`]}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      placeholder="Karachi, Pakistan"
                      value={exp.location}
                      onChange={(e) => updateExperience(index, "location", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                      className={errors[`exp-${index}-startDate`] ? "border-destructive" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                      disabled={exp.isCurrent}
                      placeholder={exp.isCurrent ? "Present" : ""}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`current-${index}`}
                    checked={exp.isCurrent}
                    onCheckedChange={(checked) => {
                      updateExperience(index, "isCurrent", !!checked);
                      if (checked) updateExperience(index, "endDate", "");
                    }}
                  />
                  <Label htmlFor={`current-${index}`} className="text-sm cursor-pointer">
                    I currently work here
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe your responsibilities, achievements, and key projects..."
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleNext}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
