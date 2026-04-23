"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  BookOpen,
  Users,
  Clock,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Target,
  Award,
  MessageSquare,
} from "lucide-react";

// Step indicator component
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                step < currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : step === currentStep
                  ? "border-primary text-primary bg-primary/10"
                  : "border-muted text-muted-foreground"
              }`}
            >
              {step < currentStep ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <span className="font-semibold">{step}</span>
              )}
            </div>
            {step < totalSteps && (
              <div
                className={`h-1 w-full min-w-[40px] mx-2 rounded ${
                  step < currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Motivation</span>
        <span>Experience</span>
        <span>Availability</span>
        <span>References</span>
      </div>
    </div>
  );
}

// Expertise card component
function ExpertiseCard({
  index,
  onRemove,
  canRemove,
  data,
  onChange,
}: {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
  data: any;
  onChange: (field: string, value: any) => void;
}) {
  const levels = ["beginner", "intermediate", "advanced", "expert"];
  
  return (
    <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="font-normal">
            <BookOpen className="h-3 w-3 mr-1" />
            Expertise #{index + 1}
          </Badge>
          {canRemove && (
            <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm">Subject/Technology</Label>
            <Input
              placeholder="e.g., React.js, Python, Data Science"
              value={data.subject}
              onChange={(e) => onChange("subject", e.target.value)}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Years of Experience</Label>
            <Select value={data.years} onValueChange={(v) => onChange("years", v)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <Label className="text-sm">Levels you can teach</Label>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <Badge
                key={level}
                variant={data.levels?.includes(level) ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => {
                  const current = data.levels || [];
                  const updated = current.includes(level)
                    ? current.filter((l: string) => l !== level)
                    : [...current, level];
                  onChange("levels", updated);
                }}
              >
                {level}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Reference card component
function ReferenceCard({
  index,
  onRemove,
  canRemove,
  data,
  onChange,
}: {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
  data: any;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="font-normal">
            <Users className="h-3 w-3 mr-1" />
            Reference #{index + 1}
          </Badge>
          {canRemove && (
            <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Full Name</Label>
            <Input
              placeholder="Dr. Sarah Ahmed"
              value={data.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="bg-background h-9"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Relationship</Label>
            <Input
              placeholder="Former Manager"
              value={data.relationship}
              onChange={(e) => onChange("relationship", e.target.value)}
              className="bg-background h-9"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Email</Label>
            <Input
              type="email"
              placeholder="sarah@company.com"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              className="bg-background h-9"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Phone</Label>
            <Input
              placeholder="+92 300 1234567"
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className="bg-background h-9"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main form component
export function TutorApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    motivation: "",
    expertiseAreas: [{ subject: "", years: "", levels: [] as string[] }],
    hasTeachingExp: false,
    teachingExpDesc: "",
    courseTypes: [] as string[],
    hoursPerWeek: "",
    schedule: [] as string[],
    hourlyRate: "",
    teachingPhilosophy: "",
    references: [
      { name: "", relationship: "", email: "", phone: "" },
      { name: "", relationship: "", email: "", phone: "" },
    ],
    additionalInfo: "",
    agreeTerms: false,
    agreeBackground: false,
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateExpertise = (index: number, field: string, value: any) => {
    const updated = [...formData.expertiseAreas];
    updated[index] = { ...updated[index], [field]: value };
    updateField("expertiseAreas", updated);
  };

  const updateReference = (index: number, field: string, value: string) => {
    const updated = [...formData.references];
    updated[index] = { ...updated[index], [field]: value };
    updateField("references", updated);
  };

  const addExpertise = () => {
    updateField("expertiseAreas", [
      ...formData.expertiseAreas,
      { subject: "", years: "", levels: [] },
    ]);
  };

  const removeExpertise = (index: number) => {
    updateField(
      "expertiseAreas",
      formData.expertiseAreas.filter((_, i) => i !== index)
    );
  };

  const addReference = () => {
    updateField("references", [
      ...formData.references,
      { name: "", relationship: "", email: "", phone: "" },
    ]);
  };

  const removeReference = (index: number) => {
    updateField(
      "references",
      formData.references.filter((_, i) => i !== index)
    );
  };

  const toggleArrayItem = (field: string, item: string) => {
    const current = formData[field as keyof typeof formData] as string[];
    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    updateField(field, updated);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Update localStorage
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        user.tutor_pending = true;
        localStorage.setItem("user_data", JSON.stringify(user));
      } catch {}
    }
    
    router.push("/tutor/application-submitted");
  };

  const courseTypeOptions = [
    { value: "pre-made", label: "Pre-made Courses", icon: BookOpen },
    { value: "live", label: "Live Sessions", icon: Users },
    { value: "mentoring", label: "1-on-1 Mentoring", icon: MessageSquare },
    { value: "workshops", label: "Workshops", icon: Award },
  ];

  const scheduleOptions = [
    { value: "morning", label: "Morning (6AM-12PM)" },
    { value: "afternoon", label: "Afternoon (12PM-6PM)" },
    { value: "evening", label: "Evening (6PM-10PM)" },
    { value: "weekend", label: "Weekends" },
    { value: "flexible", label: "Flexible" },
  ];

  // Step 1: Motivation & Expertise
  if (step === 1) {
    return (
      <div className="space-y-6">
        <StepIndicator currentStep={1} totalSteps={4} />
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Your Teaching Motivation</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Tell us why you want to teach and share your expertise areas
          </p>
        </div>

        <Card className="bg-muted/30">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Why do you want to become a tutor?
              </Label>
              <Textarea
                placeholder="Share your passion for teaching, what motivates you, and how you want to impact students' careers..."
                rows={4}
                value={formData.motivation}
                onChange={(e) => updateField("motivation", e.target.value)}
                className="bg-background resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {formData.motivation.length}/100 characters minimum
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Areas of Expertise
            </h4>
            <Button type="button" variant="outline" size="sm" onClick={addExpertise}>
              <Plus className="h-4 w-4 mr-1" />
              Add More
            </Button>
          </div>

          <div className="space-y-3">
            {formData.expertiseAreas.map((exp, index) => (
              <ExpertiseCard
                key={index}
                index={index}
                data={exp}
                canRemove={formData.expertiseAreas.length > 1}
                onRemove={() => removeExpertise(index)}
                onChange={(field, value) => updateExpertise(index, field, value)}
              />
            ))}
          </div>
        </div>

        <Button onClick={() => setStep(2)} className="w-full" size="lg">
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Step 2: Experience & Course Types
  if (step === 2) {
    return (
      <div className="space-y-6">
        <StepIndicator currentStep={2} totalSteps={4} />
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-2">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Teaching Experience</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Share your background and course creation interests
          </p>
        </div>

        <Card className="bg-muted/30">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-background">
              <Checkbox
                id="hasExp"
                checked={formData.hasTeachingExp}
                onCheckedChange={(checked) => updateField("hasTeachingExp", !!checked)}
              />
              <Label htmlFor="hasExp" className="cursor-pointer flex-1">
                I have previous teaching, training, or mentoring experience
              </Label>
            </div>

            {formData.hasTeachingExp && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <Label>Describe your teaching experience</Label>
                <Textarea
                  placeholder="Share your teaching roles, organizations, number of students taught, and key achievements..."
                  rows={4}
                  value={formData.teachingExpDesc}
                  onChange={(e) => updateField("teachingExpDesc", e.target.value)}
                  className="bg-background resize-none"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h4 className="font-semibold">What types of courses interest you?</h4>
          <div className="grid gap-3 md:grid-cols-2">
            {courseTypeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = formData.courseTypes.includes(option.value);
              return (
                <div
                  key={option.value}
                  onClick={() => toggleArrayItem("courseTypes", option.value)}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-primary/50"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-primary/10" : "bg-muted"}`}>
                    <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <span className={isSelected ? "font-medium" : ""}>{option.label}</span>
                  {isSelected && <CheckCircle className="h-4 w-4 text-primary ml-auto" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setStep(1)} className="flex-1" size="lg">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => setStep(3)} className="flex-1" size="lg">
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Step 3: Availability & Philosophy
  if (step === 3) {
    return (
      <div className="space-y-6">
        <StepIndicator currentStep={3} totalSteps={4} />
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-2">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Availability & Approach</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Tell us when you're available and your teaching philosophy
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-muted/30">
            <CardContent className="p-4 space-y-3">
              <Label>Hours per week</Label>
              <Select value={formData.hoursPerWeek} onValueChange={(v) => updateField("hoursPerWeek", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-10">5-10 hours</SelectItem>
                  <SelectItem value="10-20">10-20 hours</SelectItem>
                  <SelectItem value="20-30">20-30 hours</SelectItem>
                  <SelectItem value="30+">30+ hours</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-4 space-y-3">
              <Label>Expected hourly rate (PKR)</Label>
              <Input
                placeholder="e.g., 2000"
                value={formData.hourlyRate}
                onChange={(e) => updateField("hourlyRate", e.target.value)}
                className="bg-background"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <Label>Preferred schedule</Label>
          <div className="flex flex-wrap gap-2">
            {scheduleOptions.map((option) => (
              <Badge
                key={option.value}
                variant={formData.schedule.includes(option.value) ? "default" : "outline"}
                className="cursor-pointer px-4 py-2"
                onClick={() => toggleArrayItem("schedule", option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>

        <Card className="bg-muted/30">
          <CardContent className="p-6 space-y-3">
            <Label className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Teaching Philosophy
            </Label>
            <Textarea
              placeholder="Describe your teaching style, how you engage students, and what makes you effective..."
              rows={4}
              value={formData.teachingPhilosophy}
              onChange={(e) => updateField("teachingPhilosophy", e.target.value)}
              className="bg-background resize-none"
            />
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setStep(2)} className="flex-1" size="lg">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => setStep(4)} className="flex-1" size="lg">
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Step 4: References & Submit
  return (
    <div className="space-y-6">
      <StepIndicator currentStep={4} totalSteps={4} />
      
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-2">
          <Award className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold">References & Final Step</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Provide professional references and submit your application
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">Professional References</h4>
            <p className="text-xs text-muted-foreground">Minimum 2 references required</p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addReference}>
            <Plus className="h-4 w-4 mr-1" />
            Add More
          </Button>
        </div>

        <div className="space-y-3">
          {formData.references.map((ref, index) => (
            <ReferenceCard
              key={index}
              index={index}
              data={ref}
              canRemove={formData.references.length > 2}
              onRemove={() => removeReference(index)}
              onChange={(field, value) => updateReference(index, field, value)}
            />
          ))}
        </div>
      </div>

      <Card className="bg-muted/30">
        <CardContent className="p-4 space-y-3">
          <Label>Additional Information (Optional)</Label>
          <Textarea
            placeholder="Anything else you'd like us to know about your background or qualifications..."
            rows={3}
            value={formData.additionalInfo}
            onChange={(e) => updateField("additionalInfo", e.target.value)}
            className="bg-background resize-none"
          />
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 space-y-4">
          <h4 className="font-semibold">Agreements</h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background">
              <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => updateField("agreeTerms", !!checked)}
              />
              <Label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed">
                I agree to the{" "}
                <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="/terms" className="text-primary hover:underline">Tutor Agreement</a>
              </Label>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-background">
              <Checkbox
                id="background"
                checked={formData.agreeBackground}
                onCheckedChange={(checked) => updateField("agreeBackground", !!checked)}
              />
              <Label htmlFor="background" className="cursor-pointer text-sm leading-relaxed">
                I consent to background verification and understand my references may be contacted
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep(3)} className="flex-1" size="lg">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!formData.agreeTerms || !formData.agreeBackground || isSubmitting}
          className="flex-1"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <CheckCircle className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
