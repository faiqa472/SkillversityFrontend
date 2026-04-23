"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Plus, X, GraduationCap, DollarSign, Calendar } from "lucide-react";
import type { StepProps } from "../RoleBasedOnboarding";

const proficiencyLevels = [
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

const teachLevels = ["Beginner", "Intermediate", "Advanced"];

const scheduleOptions = [
  "Weekday Mornings",
  "Weekday Afternoons",
  "Weekday Evenings",
  "Weekend Mornings",
  "Weekend Afternoons",
  "Weekend Evenings",
  "Flexible",
];

const subjectSuggestions = [
  "Web Development", "React", "Node.js", "Python", "JavaScript",
  "Data Science", "Machine Learning", "AWS", "DevOps", "Mobile Development",
  "UI/UX Design", "Database Design", "System Design", "DSA",
];

export function TutorExpertiseStep({ data, updateData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newSubject, setNewSubject] = useState("");

  const addExpertise = () => {
    if (!newSubject.trim()) return;
    
    const newExpertise = {
      subject: newSubject,
      proficiencyLevel: "advanced",
      yearsOfExperience: 0,
      canTeachLevels: ["Beginner"],
    };
    
    updateData({
      expertiseAreas: [...(data.expertiseAreas || []), newExpertise],
    });
    setNewSubject("");
  };

  const removeExpertise = (index: number) => {
    const updated = [...(data.expertiseAreas || [])];
    updated.splice(index, 1);
    updateData({ expertiseAreas: updated });
  };

  const updateExpertise = (index: number, field: string, value: any) => {
    const updated = [...(data.expertiseAreas || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ expertiseAreas: updated });
  };

  const toggleTeachLevel = (index: number, level: string) => {
    const current = data.expertiseAreas?.[index]?.canTeachLevels || [];
    const updated = current.includes(level)
      ? current.filter(l => l !== level)
      : [...current, level];
    updateExpertise(index, "canTeachLevels", updated);
  };

  const toggleSchedule = (schedule: string) => {
    const current = data.preferredSchedule || [];
    const updated = current.includes(schedule)
      ? current.filter(s => s !== schedule)
      : [...current, schedule];
    updateData({ preferredSchedule: updated });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.teachingExperience || data.teachingExperience.length < 50) {
      newErrors.teachingExperience = "Teaching experience must be at least 50 characters";
    }
    if (!data.expertiseAreas || data.expertiseAreas.length === 0) {
      newErrors.expertiseAreas = "Add at least one area of expertise";
    }
    if (!data.teachingPhilosophy || data.teachingPhilosophy.length < 30) {
      newErrors.teachingPhilosophy = "Teaching philosophy must be at least 30 characters";
    }
    if (!data.hourlyRate) {
      newErrors.hourlyRate = "Please specify your hourly rate";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      {/* Teaching Experience */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">Teaching Experience *</Label>
        </div>
        <Textarea
          placeholder="I have been teaching programming for 5 years, starting with tutoring university students and later conducting corporate training sessions. I've helped over 100 students transition into tech careers..."
          value={data.teachingExperience}
          onChange={(e) => updateData({ teachingExperience: e.target.value })}
          rows={4}
          className={errors.teachingExperience ? "border-destructive" : ""}
        />
        <p className="text-xs text-muted-foreground">
          Describe your teaching background, experience, and achievements (minimum 50 characters)
        </p>
        {errors.teachingExperience && (
          <p className="text-sm text-destructive">{errors.teachingExperience}</p>
        )}
      </div>

      {/* Expertise Areas */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Areas of Expertise *</Label>
        <p className="text-sm text-muted-foreground">
          Add subjects you can teach and specify your proficiency level
        </p>

        {/* Quick Add Suggestions */}
        <div className="flex flex-wrap gap-2">
          {subjectSuggestions
            .filter(s => !data.expertiseAreas?.some(e => e.subject === s))
            .slice(0, 8)
            .map((subject) => (
              <Badge
                key={subject}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => {
                  setNewSubject(subject);
                  setTimeout(addExpertise, 0);
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                {subject}
              </Badge>
            ))}
        </div>

        {/* Add Custom Subject */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a subject (e.g., React, Python, Data Science)"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addExpertise()}
          />
          <Button type="button" onClick={addExpertise} variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Expertise List */}
        <div className="space-y-4">
          {data.expertiseAreas?.map((expertise, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{expertise.subject}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExpertise(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Proficiency Level</Label>
                    <Select
                      value={expertise.proficiencyLevel}
                      onValueChange={(value) => updateExpertise(index, "proficiencyLevel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map((level) => (
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
                      type="number"
                      min="0"
                      value={expertise.yearsOfExperience}
                      onChange={(e) => updateExpertise(index, "yearsOfExperience", parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Can teach at levels:</Label>
                  <div className="flex gap-4">
                    {teachLevels.map((level) => (
                      <div key={level} className="flex items-center gap-2">
                        <Checkbox
                          id={`${index}-${level}`}
                          checked={expertise.canTeachLevels?.includes(level)}
                          onCheckedChange={() => toggleTeachLevel(index, level)}
                        />
                        <Label htmlFor={`${index}-${level}`} className="text-sm">
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {errors.expertiseAreas && (
          <p className="text-sm text-destructive">{errors.expertiseAreas}</p>
        )}
      </div>

      {/* Teaching Philosophy */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Teaching Philosophy *</Label>
        <Textarea
          placeholder="I believe in hands-on learning with real-world projects. My approach focuses on building strong fundamentals while keeping students engaged with practical applications..."
          value={data.teachingPhilosophy}
          onChange={(e) => updateData({ teachingPhilosophy: e.target.value })}
          rows={3}
          className={errors.teachingPhilosophy ? "border-destructive" : ""}
        />
        {errors.teachingPhilosophy && (
          <p className="text-sm text-destructive">{errors.teachingPhilosophy}</p>
        )}
      </div>

      {/* Hourly Rate */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">Expected Hourly Rate (PKR) *</Label>
        </div>
        <Input
          type="number"
          placeholder="2500"
          value={data.hourlyRate}
          onChange={(e) => updateData({ hourlyRate: e.target.value })}
          className={errors.hourlyRate ? "border-destructive" : ""}
        />
        <p className="text-xs text-muted-foreground">
          Your expected rate per hour for 1-on-1 sessions
        </p>
        {errors.hourlyRate && (
          <p className="text-sm text-destructive">{errors.hourlyRate}</p>
        )}
      </div>

      {/* Preferred Schedule */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">Preferred Teaching Schedule</Label>
        </div>
        <div className="flex flex-wrap gap-2">
          {scheduleOptions.map((schedule) => {
            const isSelected = data.preferredSchedule?.includes(schedule);
            return (
              <Badge
                key={schedule}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleSchedule(schedule)}
              >
                {schedule}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Mentoring */}
      <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
        <Checkbox
          id="mentoring"
          checked={data.availableForMentoring}
          onCheckedChange={(checked) => updateData({ availableForMentoring: !!checked })}
        />
        <Label htmlFor="mentoring" className="cursor-pointer">
          I'm available for long-term mentorship (3+ months commitment)
        </Label>
      </div>

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
