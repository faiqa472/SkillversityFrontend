"use client";

import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Mail, ArrowRight, Home, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function ApplicationSubmittedPage() {
  const { syncFromLocalStorage } = useUserStore();

  // Sync store with localStorage to reflect tutor_pending status
  useEffect(() => {
    syncFromLocalStorage();
  }, [syncFromLocalStorage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold">
              Skill<span className="text-primary">Versity</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
        <div className="max-w-2xl w-full space-y-6">
          {/* Success Card */}
          <Card className="border-2 border-green-500/50 bg-green-50/50 dark:bg-green-900/10">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <Badge variant="secondary" className="mx-auto mb-2">
                Application Received
              </Badge>
              <CardTitle className="text-2xl">Thank You for Applying!</CardTitle>
              <CardDescription className="text-base">
                Your tutor application has been successfully submitted
              </CardDescription>
            </CardHeader>
          </Card>

          {/* What's Next Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Application Review</h4>
                  <p className="text-sm text-muted-foreground">
                    Our team will review your application within 2-3 business days
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Reference Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    We may contact your references to verify your background
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Skills Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    You may be invited for a brief technical assessment
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Approval & Onboarding</h4>
                  <p className="text-sm text-muted-foreground">
                    Once approved, you'll receive onboarding materials to start teaching
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Notification */}
          <Card className="bg-muted/50">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Check Your Email</h4>
                <p className="text-sm text-muted-foreground">
                  We've sent a confirmation email with your application details
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1">
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/learn">
                Browse Courses
              </Link>
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Questions? Contact us at{" "}
            <a href="mailto:support@skillversity.com" className="text-primary hover:underline">
              support@skillversity.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
