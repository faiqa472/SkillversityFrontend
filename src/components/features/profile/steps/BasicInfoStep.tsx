"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, MapPin, Phone, Linkedin, Globe } from "lucide-react";
import type { StepProps } from "../RoleBasedOnboarding";

export function BasicInfoStep({ data, updateData, onNext, role }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.headline || data.headline.length < 10) {
      newErrors.headline = "Professional headline must be at least 10 characters";
    }
    if (!data.summary || data.summary.length < 50) {
      newErrors.summary = "Summary must be at least 50 characters";
    }
    if (!data.location) {
      newErrors.location = "Location is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const getHeadlinePlaceholder = () => {
    switch (role) {
      case "learner":
        return "Aspiring Full-Stack Developer | Computer Science Student";
      case "tutor":
        return "Senior Software Engineer | 10+ Years Teaching Experience";
      case "company":
        return "HR Manager at TechCorp | Building Great Teams";
      default:
        return "Your professional headline";
    }
  };

  const getSummaryPlaceholder = () => {
    switch (role) {
      case "learner":
        return "I'm a passionate learner looking to transition into tech. Currently studying computer science and eager to build practical skills in web development and cloud technologies...";
      case "tutor":
        return "Experienced software engineer with 10+ years in the industry. I've mentored dozens of developers and love breaking down complex concepts into digestible lessons...";
      case "company":
        return "We're a growing tech company focused on building innovative solutions. Looking to connect with talented individuals who share our passion for technology...";
      default:
        return "Tell us about yourself...";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Headline */}
        <div className="space-y-2">
          <Label htmlFor="headline">Professional Headline *</Label>
          <Input
            id="headline"
            placeholder={getHeadlinePlaceholder()}
            value={data.headline}
            onChange={(e) => updateData({ headline: e.target.value })}
            className={errors.headline ? "border-destructive" : ""}
          />
          <p className="text-xs text-muted-foreground">
            A brief tagline that appears below your name (like LinkedIn)
          </p>
          {errors.headline && (
            <p className="text-sm text-destructive">{errors.headline}</p>
          )}
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <Label htmlFor="summary">About You *</Label>
          <Textarea
            id="summary"
            placeholder={getSummaryPlaceholder()}
            value={data.summary}
            onChange={(e) => updateData({ summary: e.target.value })}
            rows={5}
            className={errors.summary ? "border-destructive" : ""}
          />
          <p className="text-xs text-muted-foreground">
            Write a compelling summary about your background and goals (minimum 50 characters)
          </p>
          {errors.summary && (
            <p className="text-sm text-destructive">{errors.summary}</p>
          )}
        </div>

        {/* Location & Phone */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Karachi, Pakistan"
                value={data.location}
                onChange={(e) => updateData({ location: e.target.value })}
                className={`pl-10 ${errors.location ? "border-destructive" : ""}`}
              />
            </div>
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                placeholder="+92 300 1234567"
                value={data.phone}
                onChange={(e) => updateData({ phone: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                value={data.linkedinUrl}
                onChange={(e) => updateData({ linkedinUrl: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Personal Website / Portfolio</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="website"
                placeholder="https://yourportfolio.com"
                value={data.websiteUrl}
                onChange={(e) => updateData({ websiteUrl: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
