import { useUserStore } from "@/store/useUserStore";
import { useMemo } from "react";
import { determineUserRole, canAccessRoute, getDashboardRoute, ROLE_DISPLAY_NAMES, ROLE_BADGE_COLORS } from "@/lib/role-config";

/**
 * Custom hook for role-based access control
 * Single source of truth for role determination
 */
export function useRole() {
  const user = useUserStore((state) => state.user);
  
  const roleStatus = useMemo(() => {
    // Determine the effective role using centralized logic
    const effectiveRole = determineUserRole(user);
    
    // Determine if user has completed role selection
    const hasSelectedRole = !!(
      user?.onboarding_completed || 
      user?.selected_role || 
      (user?.role && user.role !== "general" && user.role !== "guest")
    );
    
    // Tutor pending status
    const isTutorPending = user?.is_tutor === true && user?.tutor_approved !== true;
    
    return {
      // The computed effective role
      role: effectiveRole,
      rawRole: user?.role, // Original role from store (for debugging)
      
      // Role boolean flags
      isGuest: effectiveRole === "guest",
      isGeneral: effectiveRole === "general",
      isLearner: effectiveRole === "learner",
      isTutor: effectiveRole === "tutor",
      isCompany: effectiveRole === "company",
      isSponsor: effectiveRole === "sponsor",
      isAdmin: effectiveRole === "admin",
      
      // Status flags
      hasSelectedRole,
      isTutorPending,
      isProfileComplete: user?.profile_completed === true,
      isOnboardingComplete: user?.onboarding_completed === true,
      isAuthenticated: effectiveRole !== "guest",
      
      // User data
      userId: user?.id,
      userType: user?.user_type,
      
      // Utility functions
      canAccess: (route: string) => canAccessRoute(effectiveRole, route),
      getDashboard: () => getDashboardRoute(effectiveRole),
      getDisplayName: () => ROLE_DISPLAY_NAMES[effectiveRole],
      getBadgeColor: () => ROLE_BADGE_COLORS[effectiveRole],
    };
  }, [user]);

  return roleStatus;
}

/**
 * Hook to check if current user can access a specific route
 */
export function useCanAccess(route: string): boolean {
  const { canAccess } = useRole();
  return canAccess(route);
}

/**
 * Hook to get role-specific dashboard URL
 */
export function useDashboardRoute(): string {
  const { getDashboard } = useRole();
  return getDashboard();
}
