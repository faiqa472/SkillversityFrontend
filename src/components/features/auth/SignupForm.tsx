"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Eye, EyeOff, AlertCircle, Loader2, Check, X } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Common passwords list (subset for client-side check)
const COMMON_PASSWORDS = [
  "password", "123456", "12345678", "qwerty", "abc123", "monkey", "1234567",
  "letmein", "trustno1", "dragon", "baseball", "iloveyou", "master", "sunshine",
  "ashley", "bailey", "shadow", "123123", "654321", "superman", "qazwsx",
  "michael", "football", "password1", "password123", "welcome", "welcome1"
];

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export function SignupForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Password requirements state
  const [passwordChecks, setPasswordChecks] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
    notCommon: true,
  });

  // Calculate password strength
  const getPasswordStrength = useCallback((): PasswordStrength => {
    const checks = Object.values(passwordChecks).filter(Boolean).length;
    if (checks <= 2) return { score: 1, label: "Weak", color: "bg-red-500" };
    if (checks <= 4) return { score: 2, label: "Medium", color: "bg-yellow-500" };
    return { score: 3, label: "Strong", color: "bg-green-500" };
  }, [passwordChecks]);

  // Real-time password validation
  useEffect(() => {
    const lowerPassword = password.toLowerCase();
    setPasswordChecks({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      notCommon: !COMMON_PASSWORDS.includes(lowerPassword) && 
                 !lowerPassword.includes("password") &&
                 !lowerPassword.includes("123456"),
    });
  }, [password]);

  // Real-time field validation
  const validateField = useCallback((field: string, value: string) => {
    const errors: Record<string, string> = { ...fieldErrors };

    switch (field) {
      case "firstName":
        if (!value || value.length < 2) {
          errors.firstName = "First name must be at least 2 characters";
        } else {
          delete errors.firstName;
        }
        break;
      case "lastName":
        if (!value || value.length < 2) {
          errors.lastName = "Last name must be at least 2 characters";
        } else {
          delete errors.lastName;
        }
        break;
      case "email":
        if (!value) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Please enter a valid email address";
        } else {
          delete errors.email;
        }
        break;
      case "password":
        if (!value) {
          errors.password = "Password is required";
        } else if (value.length < 8) {
          errors.password = "Password must be at least 8 characters";
        } else if (!passwordChecks.notCommon) {
          errors.password = "This password is too common. Please choose a stronger one.";
        } else if (getPasswordStrength().score < 2) {
          errors.password = "Password is too weak. Add uppercase, numbers, or special characters.";
        } else {
          delete errors.password;
        }
        break;
      case "confirmPassword":
        if (value !== password) {
          errors.confirmPassword = "Passwords don't match";
        } else {
          delete errors.confirmPassword;
        }
        break;
    }

    setFieldErrors(errors);
  }, [fieldErrors, password, passwordChecks.notCommon, getPasswordStrength]);

  // Handle field blur for validation
  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const values: Record<string, string> = { firstName, lastName, email, password, confirmPassword };
    validateField(field, values[field]);
  };

  // Handle field change with real-time validation
  const handleChange = (field: string, value: string) => {
    switch (field) {
      case "firstName": setFirstName(value); break;
      case "lastName": setLastName(value); break;
      case "email": setEmail(value); break;
      case "password": setPassword(value); break;
      case "confirmPassword": setConfirmPassword(value); break;
    }
    
    // Validate on change if field was already touched
    if (touched[field]) {
      validateField(field, value);
    }
  };

  // Full form validation before submit
  const validateAll = () => {
    const errors: Record<string, string> = {};

    if (!firstName || firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }
    if (!lastName || lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!password || password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!passwordChecks.notCommon) {
      errors.password = "This password is too common";
    } else if (getPasswordStrength().score < 2) {
      errors.password = "Password is too weak";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }
    if (!agreeToTerms) {
      errors.terms = "You must agree to the terms";
    }

    setFieldErrors(errors);
    setTouched({ firstName: true, lastName: true, email: true, password: true, confirmPassword: true });
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errors = data.details || data;
        if (errors.email) throw new Error(Array.isArray(errors.email) ? errors.email[0] : errors.email);
        if (errors.password) throw new Error(Array.isArray(errors.password) ? errors.password[0] : errors.password);
        if (errors.first_name) throw new Error(Array.isArray(errors.first_name) ? errors.first_name[0] : errors.first_name);
        if (errors.last_name) throw new Error(Array.isArray(errors.last_name) ? errors.last_name[0] : errors.last_name);
        if (errors.non_field_errors) throw new Error(Array.isArray(errors.non_field_errors) ? errors.non_field_errors[0] : errors.non_field_errors);
        throw new Error(data.message || data.detail || "Registration failed");
      }

      if (data.tokens) {
        localStorage.setItem("access_token", data.tokens.access);
        localStorage.setItem("refresh_token", data.tokens.refresh);
      }
      if (data.user) {
        localStorage.setItem("user_data", JSON.stringify(data.user));
      }

      router.push("/onboarding");
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError("Cannot connect to server. Please ensure the backend is running.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const strength = getPasswordStrength();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Create Account</h1>
        </div>
        <p className="text-muted-foreground">Join SkillVersity and start your journey</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Ahmed"
              value={firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              onBlur={() => handleBlur("firstName")}
              disabled={isLoading}
              className={touched.firstName && fieldErrors.firstName ? "border-destructive" : ""}
            />
            {touched.firstName && fieldErrors.firstName && (
              <p className="text-sm text-destructive">{fieldErrors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Khan"
              value={lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              onBlur={() => handleBlur("lastName")}
              disabled={isLoading}
              className={touched.lastName && fieldErrors.lastName ? "border-destructive" : ""}
            />
            {touched.lastName && fieldErrors.lastName && (
              <p className="text-sm text-destructive">{fieldErrors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="ahmed.khan@example.com"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            disabled={isLoading}
            autoComplete="email"
            className={touched.email && fieldErrors.email ? "border-destructive" : ""}
          />
          {touched.email && fieldErrors.email && (
            <p className="text-sm text-destructive">{fieldErrors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              disabled={isLoading}
              autoComplete="new-password"
              className={touched.password && fieldErrors.password ? "border-destructive" : ""}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Password strength indicator */}
          {password && (
            <div className="space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded ${level <= strength.score ? strength.color : "bg-muted"}`}
                  />
                ))}
              </div>
              <p className={`text-xs ${strength.score === 1 ? "text-red-500" : strength.score === 2 ? "text-yellow-600" : "text-green-600"}`}>
                Password strength: {strength.label}
              </p>
              
              {/* Password requirements checklist */}
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className={`flex items-center gap-1 ${passwordChecks.minLength ? "text-green-600" : "text-muted-foreground"}`}>
                  {passwordChecks.minLength ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  8+ characters
                </div>
                <div className={`flex items-center gap-1 ${passwordChecks.hasUppercase ? "text-green-600" : "text-muted-foreground"}`}>
                  {passwordChecks.hasUppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  Uppercase letter
                </div>
                <div className={`flex items-center gap-1 ${passwordChecks.hasLowercase ? "text-green-600" : "text-muted-foreground"}`}>
                  {passwordChecks.hasLowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  Lowercase letter
                </div>
                <div className={`flex items-center gap-1 ${passwordChecks.hasNumber ? "text-green-600" : "text-muted-foreground"}`}>
                  {passwordChecks.hasNumber ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  Number
                </div>
                <div className={`flex items-center gap-1 ${passwordChecks.hasSpecial ? "text-green-600" : "text-muted-foreground"}`}>
                  {passwordChecks.hasSpecial ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  Special character
                </div>
                <div className={`flex items-center gap-1 ${passwordChecks.notCommon ? "text-green-600" : "text-red-500"}`}>
                  {passwordChecks.notCommon ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  Not common
                </div>
              </div>
            </div>
          )}
          
          {touched.password && fieldErrors.password && (
            <p className="text-sm text-destructive">{fieldErrors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            disabled={isLoading}
            autoComplete="new-password"
            className={touched.confirmPassword && fieldErrors.confirmPassword ? "border-destructive" : ""}
          />
          {confirmPassword && password === confirmPassword && (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <Check className="h-3 w-3" /> Passwords match
            </p>
          )}
          {touched.confirmPassword && fieldErrors.confirmPassword && (
            <p className="text-sm text-destructive">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={(checked) => setAgreeToTerms(!!checked)} />
          <Label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </Label>
        </div>
        {fieldErrors.terms && <p className="text-sm text-destructive">{fieldErrors.terms}</p>}

        <Button type="submit" className="w-full" disabled={isLoading || Object.keys(fieldErrors).length > 0}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
