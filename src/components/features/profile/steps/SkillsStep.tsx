"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Plus, X, Code, Sparkles } from "lucide-react";
import type { StepProps } from "../RoleBasedOnboarding";

const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner", description: "Learning the basics" },
  { value: "intermediate", label: "Intermediate", description: "Can work independently" },
  { value: "advanced", label: "Advanced", description: "Deep expertise" },
  { value: "expert", label: "Expert", description: "Industry leader" },
];

const POPULAR_SKILLS = [
  "JavaScript", "Python", "React", "Node.js", "TypeScript",
  "Java", "SQL", "AWS", "Docker", "Git",
  "Machine Learning", "Data Analysis", "UI/UX Design", "Project Management",
  "Communication", "Leadership", "Problem Solving", "Agile/Scrum",
];

export function SkillsStep({ data, updateData, onNext, onBack, role }: StepProps) {
  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addSkill = (skillName?: string) => {
    const name = skillName || newSkill.trim();
    if (!name) return;
    
    // Check if skill already exists
    if (data.skills?.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      setErrors({ newSkill: "Skill already added" });
      return;
    }

    const skill = {
      name,
      level: "intermediate",
      yearsOfExperience: "1",
    };
    updateData({
      skills: [...(data.skills || []), skill],
    });
    setNewSkill("");
    setErrors({});
  };

  const removeSkill = (index: number) => {
    const updated = [...(data.skills || [])];
    updated.splice(index, 1);
    updateData({ skills: updated });
  };

  const updateSkill = (index: number, field: string, value: string) => {
    const updated = [...(data.skills || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ skills: updated });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleNext = () => {
    onNext();
  };

  const availableSuggestions = POPULAR_SKILLS.filter(
    skill => !data.skills?.some(s => s.name.toLowerCase() === skill.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Code className="h-5 w-5 text-primary" />
        <Label className="text-lg font-semibold">Skills & Expertise</Label>
      </div>

      <p className="text-sm text-muted-foreground">
        {role === "tutor" 
          ? "Add skills you can teach. This helps learners find you for the right topics."
          : "Add your skills to showcase your expertise and get matched with relevant opportunities."}
      </p>

      {/* Add Skill Input */}
      <div className="space-y-2">
        <Label>Add a Skill</Label>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., JavaScript, Project Management, Data Analysis"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className={errors.newSkill ? "border-destructive" : ""}
          />
          <Button type="button" onClick={() => addSkill()}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
        {errors.newSkill && (
          <p className="text-sm text-destructive">{errors.newSkill}</p>
        )}
      </div>

      {/* Popular Skills Suggestions */}
      {availableSuggestions.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Popular Skills
          </Label>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 10).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => addSkill(skill)}
              >
                <Plus className="h-3 w-3 mr-1" />
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Added Skills */}
      {data.skills && data.skills.length > 0 ? (
        <div className="space-y-3">
          <Label>Your Skills ({data.skills.length})</Label>
          {data.skills.map((skill, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 grid gap-4 md:grid-cols-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Skill</Label>
                    <p className="font-medium">{skill.name}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Proficiency</Label>
                    <Select
                      value={skill.level}
                      onValueChange={(value) => updateSkill(index, "level", value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SKILL_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Years of Experience</Label>
                    <Select
                      value={skill.yearsOfExperience}
                      onValueChange={(value) => updateSkill(index, "yearsOfExperience", value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<1">&lt; 1 year</SelectItem>
                        <SelectItem value="1">1 year</SelectItem>
                        <SelectItem value="2">2 years</SelectItem>
                        <SelectItem value="3">3 years</SelectItem>
                        <SelectItem value="4">4 years</SelectItem>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="5+">5+ years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center border-dashed">
          <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">No skills added yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add skills to showcase your expertise
          </p>
        </Card>
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
