"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Plus, X, GraduationCap } from "lucide-react";
import type { StepProps } from "../RoleBasedOnboarding";

export function EducationStep({ data, updateData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addEducation = () => {
    const newEdu = {
      degree: "",
      institution: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      grade: "",
    };
    updateData({
      education: [...(data.education || []), newEdu],
    });
  };

  const removeEducation = (index: number) => {
    const updated = [...(data.education || [])];
    updated.splice(index, 1);
    updateData({ education: updated });
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = [...(data.education || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ education: updated });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate each education entry
    data.education?.forEach((edu, index) => {
      if (edu.degree || edu.institution) {
        if (!edu.degree) newErrors[`edu-${index}-degree`] = "Degree is required";
        if (!edu.institution) newErrors[`edu-${index}-institution`] = "Institution is required";
        if (!edu.fieldOfStudy) newErrors[`edu-${index}-fieldOfStudy`] = "Field of study is required";
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
          <GraduationCap className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">Education (Optional)</Label>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addEducation}>
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Add your educational background. This helps others understand your qualifications.
      </p>

      {(!data.education || data.education.length === 0) ? (
        <Card className="p-8 text-center border-dashed">
          <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">No education added</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add your educational qualifications or skip this step
          </p>
          <Button onClick={addEducation}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Education #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Degree *</Label>
                    <Input
                      placeholder="Bachelor of Science"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      className={errors[`edu-${index}-degree`] ? "border-destructive" : ""}
                    />
                    {errors[`edu-${index}-degree`] && (
                      <p className="text-sm text-destructive">{errors[`edu-${index}-degree`]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Field of Study *</Label>
                    <Input
                      placeholder="Computer Science"
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)}
                      className={errors[`edu-${index}-fieldOfStudy`] ? "border-destructive" : ""}
                    />
                    {errors[`edu-${index}-fieldOfStudy`] && (
                      <p className="text-sm text-destructive">{errors[`edu-${index}-fieldOfStudy`]}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    placeholder="University of Karachi"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    className={errors[`edu-${index}-institution`] ? "border-destructive" : ""}
                  />
                  {errors[`edu-${index}-institution`] && (
                    <p className="text-sm text-destructive">{errors[`edu-${index}-institution`]}</p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Start Year</Label>
                    <Input
                      placeholder="2018"
                      value={edu.startYear}
                      onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>End Year</Label>
                    <Input
                      placeholder="2022"
                      value={edu.endYear}
                      onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Grade/CGPA</Label>
                    <Input
                      placeholder="3.8/4.0"
                      value={edu.grade}
                      onChange={(e) => updateEducation(index, "grade", e.target.value)}
                    />
                  </div>
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
