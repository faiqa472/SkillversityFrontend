"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

/**
 * Profile Complete Page
 * Redirects to appropriate page based on user state:
 * - If not onboarded → /onboarding
 * - If onboarded but profile incomplete → /settings
 * - If profile complete → /profile/me
 */
export default function ProfileCompletePage() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    
    if (!userData) {
      router.replace("/onboarding");
      return;
    }

    try {
      const parsed = JSON.parse(userData);
      
      // If not onboarded, go to onboarding
      if (!parsed.onboarding_completed && !parsed.selected_role) {
        router.replace("/onboarding");
        return;
      }
      
      // If profile not complete, go to settings to complete it
      if (!parsed.profile_completed) {
        router.replace("/settings");
        return;
      }
      
      // Profile is complete, go to profile view
      router.replace("/profile/me");
    } catch {
      router.replace("/onboarding");
    }
  }, [router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}
