"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Real-time field validation
  const validateField = useCallback((field: string, value: string) => {
    const errors: Record<string, string> = { ...fieldErrors };

    switch (field) {
      case "email":
        if (!value.trim()) {
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
        } else {
          delete errors.password;
        }
        break;
    }

    setFieldErrors(errors);
  }, [fieldErrors]);

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, field === "email" ? email : password);
  };

  const handleChange = (field: string, value: string) => {
    if (field === "email") setEmail(value);
    else setPassword(value);
    
    if (touched[field]) {
      validateField(field, value);
    }
    // Clear general error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validate all fields
    const errors: Record<string, string> = {};
    if (!email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouched({ email: true, password: true });
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const loginUrl = `${API_URL}/api/users/auth/login/`;
      
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ 
          email: email.trim().toLowerCase(), 
          password 
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid response from server");
      }

      if (!response.ok || data.error) {
        // Handle different error formats from backend
        const errorMessage = 
          data.details?.non_field_errors?.[0] ||
          data.non_field_errors?.[0] || 
          data.detail || 
          data.message ||
          data.error ||
          "Invalid email or password";
        throw new Error(errorMessage);
      }

      // Success - store tokens
      if (data.tokens) {
        localStorage.setItem("access_token", data.tokens.access);
        localStorage.setItem("refresh_token", data.tokens.refresh);
      }
      
      if (data.user) {
        localStorage.setItem("user_data", JSON.stringify(data.user));
      }

      // Determine redirect based on user state
      const user = data.user || {};
      const hasCompletedOnboarding = user.onboarding_completed || user.profile_completed;

      // Use window.location for more reliable redirect
      let redirectUrl = "/onboarding";
      
      if (user.user_type === "company") {
        redirectUrl = "/company/dashboard";
      } else if (user.tutor_approved) {
        redirectUrl = "/tutor/dashboard";
      } else if (user.user_type === "sponsor" || user.user_type === "partner") {
        redirectUrl = "/partner/dashboard";
      } else if (hasCompletedOnboarding) {
        redirectUrl = "/dashboard";
      }
      
      // Force navigation
      window.location.href = redirectUrl;
      
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError("Cannot connect to server. Please ensure the backend is running on port 8000.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const fillTestCredentials = () => {
    setEmail("test@skillversity.pk");
    setPassword("Test@123");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
        </div>
        <p className="text-muted-foreground">Sign in to your SkillVersity account</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
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
              autoComplete="current-password"
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
          {touched.password && fieldErrors.password && (
            <p className="text-sm text-destructive">{fieldErrors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline font-medium">
            Create Account
          </Link>
        </p>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Company or organization?</p>
          <Link href="/company/register" className="text-sm text-primary hover:underline font-medium">
            Register Your Company
          </Link>
        </div>
      </div>

      {/* Test Account */}
      <div className="border-t pt-4">
        <p className="text-xs text-muted-foreground text-center mb-3">Test Account:</p>
        <div className="flex justify-between items-center p-2 bg-muted/50 rounded text-xs">
          <span className="font-mono">test@skillversity.pk / Test@123</span>
          <Button type="button" variant="outline" size="sm" className="h-6 px-2 text-xs" onClick={fillTestCredentials}>
            Fill
          </Button>
        </div>
      </div>
    </div>
  );
}
