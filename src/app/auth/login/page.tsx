"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoginForm } from "@/components/features/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in with valid data
    const token = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user_data");
    
    if (token && userData) {
      try {
        JSON.parse(userData); // Validate JSON
        router.replace("/dashboard");
      } catch {
        // Invalid data, clear it
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_data");
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container flex min-h-screen items-center justify-center py-8">
        <div className="w-full max-w-md">
          <Card className="border-2">
            <CardHeader className="pb-4" />
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
