"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SignupForm } from "@/components/features/auth/SignupForm";
import { Users, Building2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container flex min-h-screen items-center justify-center py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-10 w-10 text-primary" />
              <h1 className="text-3xl font-bold">Skill<span className="text-primary">Versity</span></h1>
            </div>
            <p className="text-muted-foreground">Build Your Professional Network in Pakistan</p>
          </div>

          <Card className="border-2">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">Join the Platform</CardTitle>
              <CardDescription>
                Create your account to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SignupForm />

              <Separator />

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Representing a company or organization?
                </p>
                <Link 
                  href="/company/register" 
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                >
                  <Building2 className="h-4 w-4" />
                  Register Your Company
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
