"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MarketingHeader } from "@/components/common/MarketingHeader";
import { Footer } from "@/components/common/Footer";
import { determineUserRole, getDashboardRoute } from "@/lib/role-config";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const hasChecked = useRef(false);

  useEffect(() => {
    // Prevent multiple checks
    if (hasChecked.current) return;
    hasChecked.current = true;

    // Check if user is logged in
    const token = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        
        // Use centralized role determination
        const role = determineUserRole(user);
        const dashboardRoute = getDashboardRoute(role);
        
        // Redirect to appropriate dashboard
        router.replace(dashboardRoute);
        return;
      } catch {
        // Invalid data, clear it
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_data");
      }
    }
    
    setIsChecking(false);
  }, [router]);

  // Show nothing while checking auth to prevent flash
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
