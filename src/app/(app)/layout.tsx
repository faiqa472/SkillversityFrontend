"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppSidebar } from "@/components/common/AppSidebar";
import { AppHeader } from "@/components/common/AppHeader";
import { useUserStore } from "@/store/useUserStore";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const hasInitialized = useRef(false);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    // Prevent multiple initializations
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Check localStorage for auth data and sync with store
    const token = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        
        // Sync user data to store
        setUser(parsedUser);
        
        const currentPath = window.location.pathname;
        
        // Pages that don't require onboarding or profile completion
        const allowedWithoutOnboarding = [
          "/onboarding",
          "/profile/complete",
          "/settings",
          "/tutor/apply",
          "/general",
        ];
        
        const isAllowedPage = allowedWithoutOnboarding.some(p => currentPath.startsWith(p));
        
        // Check if user needs onboarding (role selection)
        const needsOnboarding = !parsedUser.onboarding_completed && !parsedUser.selected_role && !parsedUser.role;
        
        // Protected pages that require onboarding completion
        const protectedPages = [
          "/dashboard",
          "/learn",
          "/tutor/dashboard",
          "/tutor/courses",
          "/tutor/validation",
          "/tutor/analytics",
          "/company/dashboard",
          "/company/jobs",
          "/company/talent",
          "/partner/dashboard",
          "/partner/fund",
          "/partner/scholarships",
          "/partner/reports",
          "/requests",
          "/articles",
          "/community",
          "/profile/me",
        ];
        
        const isProtectedPage = protectedPages.some(p => 
          currentPath === p || currentPath.startsWith(p + "/")
        );
        
        // Redirect to onboarding if user hasn't selected a role and is on a protected page
        if (needsOnboarding && isProtectedPage) {
          router.replace("/onboarding");
          return;
        }
        
        // Check if user needs to complete profile (after onboarding, before dashboard)
        const needsProfileCompletion = parsedUser.onboarding_completed && !parsedUser.profile_completed;
        
        if (needsProfileCompletion && isProtectedPage && !isAllowedPage) {
          router.replace("/profile/complete");
          return;
        }
        
        setIsChecking(false);
      } catch {
        // Invalid data, clear and redirect
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_data");
        router.replace("/auth/login");
      }
    } else {
      // No token, redirect to login
      router.replace("/auth/login");
    }
  }, [router, setUser]);

  // Re-check on pathname change to handle navigation
  useEffect(() => {
    if (!hasInitialized.current) return;
    
    const userData = localStorage.getItem("user_data");
    if (!userData) return;
    
    try {
      const parsedUser = JSON.parse(userData);
      const needsOnboarding = !parsedUser.onboarding_completed && !parsedUser.selected_role && !parsedUser.role;
      
      const protectedPages = [
        "/dashboard",
        "/learn",
        "/tutor/dashboard",
        "/tutor/courses",
        "/company/dashboard",
        "/partner/dashboard",
        "/requests",
        "/articles",
        "/community",
      ];
      
      const isProtectedPage = protectedPages.some(p => 
        pathname === p || pathname.startsWith(p + "/")
      );
      
      if (needsOnboarding && isProtectedPage) {
        router.replace("/onboarding");
      }
    } catch {
      // ignore
    }
  }, [pathname, router]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col pl-64">
        <AppHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
