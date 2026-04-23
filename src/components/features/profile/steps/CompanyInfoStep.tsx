"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Building2, Users, Briefcase } from "lucide-react";
import type { StepProps } from "../RoleBasedOnboarding";

const companyTypes = [
  { value: "startup", label: "Startup" },
  { value: "sme", label: "Small/Medium Enterprise" },
  { value: "corporation", label: "Corporation" },
  { value: "agency", label: "Agency" },
  { value: "nonprofit", label: "Non-Profit" },
  { value: "government", label: "Government" },
];

const industries = [
  "Information Technology",
  "Software Development",
  "E-commerce",
  "FinTech",
  "EdTech",
  "HealthTech",
  "Manufacturing",
  "Consulting",
  "Marketing & Advertising",
  "Telecommunications",
  "Banking & Finance",
  "Other",
];

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

const hiringNeedOptions = [
  "Software Engineers",
  "Data Scientists",
  "DevOps Engineers",
  "UI/UX Designers",
  "Product Managers",
  "QA Engineers",
  "Mobile Developers",
  "Cloud Architects",
  "Cybersecurity Specialists",
  "AI/ML Engineers",
  "Full-Stack Developers",
  "Frontend Developers",
  "Backend Developers",
];

const partnershipOptions = [
  "Hire verified talent",
  "Sponsor learners",
  "Create custom courses",
  "Corporate training",
  "Internship programs",
  "Campus recruitment",
  "Skill assessments",
  "Talent pipeline",
];

export function CompanyInfoStep({ data, updateData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleHiringNeed = (need: string) => {
    const current = data.hiringNeeds || [];
    const updated = current.includes(need)
      ? current.filter(n => n !== need)
      : [...current, need];
    updateData({ hiringNeeds: updated });
  };

  const togglePartnership = (interest: string) => {
    const current = data.partnershipInterests || [];
    const updated = current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest];
    updateData({ partnershipInterests: updated });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.companyName) {
      newErrors.companyName = "Company name is required";
    }
    if (!data.companyType) {
      newErrors.companyType = "Company type is required";
    }
    if (!data.industry) {
      newErrors.industry = "Industry is required";
    }
    if (!data.companySize) {
      newErrors.companySize = "Company size is required";
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
      {/* Company Basic Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">Company Information</Label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              placeholder="TechCorp Pakistan"
              value={data.companyName}
              onChange={(e) => updateData({ companyName: e.target.value })}
              className={errors.companyName ? "border-destructive" : ""}
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">{errors.companyName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Company Type *</Label>
            <Select
              value={data.companyType}
              onValueChange={(value) => updateData({ companyType: value })}
            >
              <SelectTrigger className={errors.companyType ? "border-destructive" : ""}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {companyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.companyType && (
              <p className="text-sm text-destructive">{errors.companyType}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Industry *</Label>
            <Select
              value={data.industry}
              onValueChange={(value) => updateData({ industry: value })}
            >
              <SelectTrigger className={errors.industry ? "border-destructive" : ""}>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className="text-sm text-destructive">{errors.industry}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Company Size *</Label>
            <Select
              value={data.companySize}
              onValueChange={(value) => updateData({ companySize: value })}
            >
              <SelectTrigger className={errors.companySize ? "border-destructive" : ""}>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.companySize && (
              <p className="text-sm text-destructive">{errors.companySize}</p>
            )}
          </div>
        </div>
      </div>

      {/* Hiring Needs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">Hiring Needs</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          What roles are you looking to fill? (Select all that apply)
        </p>
        
        <div className="flex flex-wrap gap-2">
          {hiringNeedOptions.map((need) => {
            const isSelected = data.hiringNeeds?.includes(need);
            return (
              <Badge
                key={need}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleHiringNeed(need)}
              >
                {need}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Partnership Interests */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <Label className="text-lg font-semibold">Partnership Interests</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          How would you like to engage with SkillVersity?
        </p>
        
        <div className="flex flex-wrap gap-2">
          {partnershipOptions.map((interest) => {
            const isSelected = data.partnershipInterests?.includes(interest);
            return (
              <Badge
                key={interest}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => togglePartnership(interest)}
              >
                {interest}
              </Badge>
            );
          })}
        </div>
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
