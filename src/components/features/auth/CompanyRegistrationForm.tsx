"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Shield, Upload } from "lucide-react";
import { z } from "zod";

const companyRegistrationSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyType: z.enum(["corporation", "startup", "ngo", "government", "educational", "other"]),
  registrationNumber: z.string().min(5, "Registration number is required"),
  taxId: z.string().optional(),
  
  // Contact Information
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  
  // Address
  address: z.string().min(10, "Complete address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().default("Pakistan"),
  
  // Company Details
  description: z.string().min(50, "Company description must be at least 50 characters"),
  industry: z.string().min(2, "Industry is required"),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-1000", "1000+"]),
  foundedYear: z.string().min(4, "Founded year is required"),
  
  // Representative Information
  repFirstName: z.string().min(2, "Representative first name is required"),
  repLastName: z.string().min(2, "Representative last name is required"),
  repTitle: z.string().min(2, "Representative title is required"),
  repEmail: z.string().email("Invalid representative email"),
  repPhone: z.string().min(10, "Representative phone is required"),
  
  // Verification Documents
  businessLicense: z.string().optional(), // File upload placeholder
  taxCertificate: z.string().optional(),
  
  // Agreement
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to terms"),
  agreeToVerification: z.boolean().refine(val => val === true, "You must agree to verification process"),
});

type CompanyRegistrationInput = z.infer<typeof companyRegistrationSchema>;

const companyTypes = [
  { value: "corporation", label: "Corporation/Private Limited" },
  { value: "startup", label: "Startup" },
  { value: "ngo", label: "NGO/Non-Profit" },
  { value: "government", label: "Government Agency" },
  { value: "educational", label: "Educational Institution" },
  { value: "other", label: "Other" },
];

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-1000", label: "201-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

const industries = [
  "Information Technology",
  "Software Development",
  "E-commerce",
  "Fintech",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Telecommunications",
  "Banking & Finance",
  "Consulting",
  "Other",
];

export function CompanyRegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CompanyRegistrationInput>({
    resolver: zodResolver(companyRegistrationSchema),
    defaultValues: {
      country: "Pakistan",
    },
  });

  const onSubmit = async (data: CompanyRegistrationInput) => {
    setError("");
    
    // For now, simulate company registration
    console.log("Company registration data:", data);
    
    // Redirect to verification pending page
    router.push("/company/verification-pending");
  };

  // Step 1: Company Information
  if (step === 1) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold">Company Information</h3>
          <p className="text-muted-foreground mt-2">
            Provide your company's basic information
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input 
              id="companyName" 
              placeholder="TechCorp Pakistan (Pvt) Ltd" 
              {...register("companyName")} 
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">{errors.companyName.message}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyType">Company Type *</Label>
              <Select onValueChange={(value) => setValue("companyType", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company type" />
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
                <p className="text-sm text-destructive">{errors.companyType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number *</Label>
              <Input 
                id="registrationNumber" 
                placeholder="0123456-7" 
                {...register("registrationNumber")} 
              />
              {errors.registrationNumber && (
                <p className="text-sm text-destructive">{errors.registrationNumber.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Select onValueChange={(value) => setValue("industry", value)}>
                <SelectTrigger>
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
                <p className="text-sm text-destructive">{errors.industry.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size *</Label>
              <Select onValueChange={(value) => setValue("companySize", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
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
                <p className="text-sm text-destructive">{errors.companySize.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Company Description *</Label>
            <Textarea 
              id="description" 
              placeholder="Describe your company, what you do, your mission, and why you want to join SkillVersity..."
              rows={4}
              {...register("description")} 
            />
            <p className="text-xs text-muted-foreground">
              Minimum 50 characters. This will be visible on your company profile.
            </p>
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>
        </div>

        <Button 
          type="button" 
          onClick={() => setStep(2)} 
          className="w-full"
        >
          Continue to Contact Information
        </Button>
      </div>
    );
  }

  // Step 2: Contact & Address Information
  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold">Contact & Address Information</h3>
          <p className="text-muted-foreground mt-2">
            How can we reach your company?
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Company Email *</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="info@techcorp.com" 
                {...register("email")} 
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Company Phone *</Label>
              <Input 
                id="phone" 
                placeholder="+92 21 1234567" 
                {...register("phone")} 
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="website">Company Website</Label>
              <Input 
                id="website" 
                placeholder="https://www.techcorp.com" 
                {...register("website")} 
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="foundedYear">Founded Year *</Label>
              <Input 
                id="foundedYear" 
                placeholder="2020" 
                {...register("foundedYear")} 
              />
              {errors.foundedYear && (
                <p className="text-sm text-destructive">{errors.foundedYear.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Complete Address *</Label>
            <Textarea 
              id="address" 
              placeholder="Office 123, ABC Tower, Main Boulevard, DHA Phase 2"
              rows={3}
              {...register("address")} 
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input 
                id="city" 
                placeholder="Karachi" 
                {...register("city")} 
              />
              {errors.city && (
                <p className="text-sm text-destructive">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
                value="Pakistan"
                disabled
                {...register("country")} 
              />
            </div>
          </div>
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
            Continue to Representative Info
          </Button>
        </div>
      </div>
    );
  }

  // Step 3: Representative Information & Verification
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold">Authorized Representative</h3>
        <p className="text-muted-foreground mt-2">
          Who will be the main contact for this company account?
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="repFirstName">First Name *</Label>
            <Input 
              id="repFirstName" 
              placeholder="Ahmed" 
              {...register("repFirstName")} 
            />
            {errors.repFirstName && (
              <p className="text-sm text-destructive">{errors.repFirstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="repLastName">Last Name *</Label>
            <Input 
              id="repLastName" 
              placeholder="Khan" 
              {...register("repLastName")} 
            />
            {errors.repLastName && (
              <p className="text-sm text-destructive">{errors.repLastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="repTitle">Job Title *</Label>
          <Input 
            id="repTitle" 
            placeholder="CEO / HR Manager / Authorized Representative" 
            {...register("repTitle")} 
          />
          {errors.repTitle && (
            <p className="text-sm text-destructive">{errors.repTitle.message}</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="repEmail">Email Address *</Label>
            <Input 
              id="repEmail" 
              type="email"
              placeholder="ahmed.khan@techcorp.com" 
              {...register("repEmail")} 
            />
            {errors.repEmail && (
              <p className="text-sm text-destructive">{errors.repEmail.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="repPhone">Phone Number *</Label>
            <Input 
              id="repPhone" 
              placeholder="+92 300 1234567" 
              {...register("repPhone")} 
            />
            {errors.repPhone && (
              <p className="text-sm text-destructive">{errors.repPhone.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-muted/50">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Verification Documents
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Upload documents to verify your company. This helps maintain platform quality and trust.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Business License/Certificate of Incorporation</p>
                <p className="text-sm text-muted-foreground">Required for verification</p>
              </div>
              <Button type="button" variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Tax Registration Certificate</p>
                <p className="text-sm text-muted-foreground">Optional but recommended</p>
              </div>
              <Button type="button" variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="agreeToTerms" 
            {...register("agreeToTerms")}
          />
          <Label htmlFor="agreeToTerms" className="text-sm">
            I agree to the{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>
        )}

        <div className="flex items-start space-x-2">
          <Checkbox 
            id="agreeToVerification" 
            {...register("agreeToVerification")}
          />
          <Label htmlFor="agreeToVerification" className="text-sm">
            I understand that company registration requires manual verification and may take 2-5 business days
          </Label>
        </div>
        {errors.agreeToVerification && (
          <p className="text-sm text-destructive">{errors.agreeToVerification.message}</p>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

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
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting for Verification..." : "Submit for Verification"}
        </Button>
      </div>
    </form>
  );
}