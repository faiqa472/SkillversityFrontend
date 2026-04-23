"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Target, Clock, Wallet, BookOpen, Check } from "lucide-react";
import type { StepProps } from "../RoleBasedOnboarding";

const learningGoalOptions = [
  { id: "career-switch", label: "Switch to a new career in tech", icon: "🚀" },
  { id: "skill-upgrade", label: "Upgrade existing skills", icon: "📈" },
  { id: "get-certified", label: "Get industry certifications", icon: "🏆" },
  { id: "build-portfolio", label: "Build a strong portfolio", icon: "💼" },
  { id: "get-hired", label: "Get hired by top companies", icon: "🎯" },
  { id: "freelance", label: "Start freelancing", icon: "💻" },
  { id: "entrepreneurship", label: "Build my own startup", icon: "🌟" },
  { id: "academic", label: "Academic/Research purposes", icon: "📚" },
];

const learningStyleOptions = [
  { value: "self-paced", label: "Self-paced courses", description: "Learn at your own speed with recorded content" },
  { value: "live", label: "Live classes", description: "Interactive sessions with real-time instruction" },
  { value: "mentorship", label: "1-on-1 Mentorship", description: "Personalized guidance from an expert" },
  { value: "mixed", label: "Mixed approach", description: "Combination of all learning styles" },
];

const hoursOptions = [
  { value: "1-5", label: "1-5 hours/week", description: "Casual learning" },
  { value: "5-10", label: "5-10 hours/week", description: "Part-time commitment" },
  { value: "10-20", label: "10-20 hours/week", description: "Serious learner" },
  { value: "20+", label: "20+ hours/week", description: "Full-time dedication" },
];

const budgetOptions = [
  { value: "free", label: "Free courses only" },
  { value: "low", label: "PKR 5,000 - 15,000/month" },
  { value: "medium", label: "PKR 15,000 - 30,000/month" },
  { value: "high", label: "PKR 30,000+/month" },
  { value: "flexible", label: "Flexible budget" },
];

const topicOptions = [
  "Web Development", "Mobile Development", "Data Science", "Machine Learning",
  "Cloud Computing", "DevOps", "Cybersecurity", "UI/UX Design",
  "Digital Marketing", "Project Management", "Blockchain", "Game Development",
  "Python", "JavaScript", "React", "Node.js", "AWS", "Docker",
];

export function LearnerGoalsStep({ data, updateData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleGoal = (goalId: string) => {
    const current = data.learningGoals || [];
    const updated = current.includes(goalId)
      ? current.filter(g => g !== goalId)
      : [...current, goalId];
    updateData({ learningGoals: updated });
  };

  const toggleTopic = (topic: string) => {
    const current = data.interestedTopics || [];
    const updated = current.includes(topic)
      ? current.filter(t => t !== topic)
      : [...current, topic];
    updateData({ interestedTopics: updated });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.learningGoals || data.learningGoals.length === 0) {
      newErrors.learningGoals = "Select at least one learning goal";
    }
    if (!data.preferredLearningStyle) {
      newErrors.preferredLearningStyle = "Select your preferred learning style";
    }
    if (!data.interestedTopics || data.interestedTopics.length < 3) {
      newErrors.interestedTopics = "Select at least 3 topics you're interested in";
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
      {/* Learning Goals */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">What are your learning goals? *</Label>
        </div>
        <p className="text-sm text-muted-foreground">Select all that apply</p>
        
        <div className="grid gap-3 md:grid-cols-2">
          {learningGoalOptions.map((goal) => {
            const isSelected = data.learningGoals?.includes(goal.id);
            return (
              <Card
                key={goal.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => toggleGoal(goal.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{goal.icon}</span>
                    <span className="font-medium">{goal.label}</span>
                  </div>
                  {isSelected && <Check className="h-5 w-5 text-primary" />}
                </div>
              </Card>
            );
          })}
        </div>
        {errors.learningGoals && (
          <p className="text-sm text-destructive">{errors.learningGoals}</p>
        )}
      </div>

      {/* Learning Style */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">Preferred learning style *</Label>
        </div>
        
        <RadioGroup
          value={data.preferredLearningStyle}
          onValueChange={(value) => updateData({ preferredLearningStyle: value })}
          className="grid gap-3 md:grid-cols-2"
        >
          {learningStyleOptions.map((style) => (
            <Label
              key={style.value}
              htmlFor={style.value}
              className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                data.preferredLearningStyle === style.value ? "border-primary bg-primary/5" : ""
              }`}
            >
              <RadioGroupItem value={style.value} id={style.value} className="mt-1" />
              <div>
                <p className="font-medium">{style.label}</p>
                <p className="text-sm text-muted-foreground">{style.description}</p>
              </div>
            </Label>
          ))}
        </RadioGroup>
        {errors.preferredLearningStyle && (
          <p className="text-sm text-destructive">{errors.preferredLearningStyle}</p>
        )}
      </div>

      {/* Time Commitment */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">Time commitment</Label>
        </div>
        
        <RadioGroup
          value={data.availableHoursPerWeek}
          onValueChange={(value) => updateData({ availableHoursPerWeek: value })}
          className="grid gap-3 md:grid-cols-4"
        >
          {hoursOptions.map((option) => (
            <Label
              key={option.value}
              htmlFor={`hours-${option.value}`}
              className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md text-center ${
                data.availableHoursPerWeek === option.value ? "border-primary bg-primary/5" : ""
              }`}
            >
              <RadioGroupItem value={option.value} id={`hours-${option.value}`} className="sr-only" />
              <p className="font-medium">{option.label}</p>
              <p className="text-xs text-muted-foreground">{option.description}</p>
            </Label>
          ))}
        </RadioGroup>
      </div>

      {/* Budget */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">Learning budget</Label>
        </div>
        
        <RadioGroup
          value={data.budgetRange}
          onValueChange={(value) => updateData({ budgetRange: value })}
          className="flex flex-wrap gap-2"
        >
          {budgetOptions.map((option) => (
            <Label
              key={option.value}
              htmlFor={`budget-${option.value}`}
              className={`px-4 py-2 border rounded-full cursor-pointer transition-all hover:shadow-md ${
                data.budgetRange === option.value ? "border-primary bg-primary text-primary-foreground" : ""
              }`}
            >
              <RadioGroupItem value={option.value} id={`budget-${option.value}`} className="sr-only" />
              {option.label}
            </Label>
          ))}
        </RadioGroup>
      </div>

      {/* Interested Topics */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Topics you're interested in *</Label>
        <p className="text-sm text-muted-foreground">Select at least 3 topics</p>
        
        <div className="flex flex-wrap gap-2">
          {topicOptions.map((topic) => {
            const isSelected = data.interestedTopics?.includes(topic);
            return (
              <Badge
                key={topic}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer text-sm py-1.5 px-3"
                onClick={() => toggleTopic(topic)}
              >
                {topic}
              </Badge>
            );
          })}
        </div>
        {errors.interestedTopics && (
          <p className="text-sm text-destructive">{errors.interestedTopics}</p>
        )}
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
