/**
 * Role-Based Access Control Configuration
 * Centralized role definitions and permissions
 */

import type { UserRole } from "@/types";

/**
 * Role hierarchy - higher number = more permissions
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  guest: 0,
  general: 1,
  learner: 2,
  tutor: 3,
  company: 4,
  sponsor: 5,
  admin: 10,
};

/**
 * Route access configuration
 * Defines which roles can access which routes
 */
export const ROUTE_ACCESS: Record<string, UserRole[]> = {
  // Public routes (no auth required)
  "/": ["guest", "general", "learner", "tutor", "company", "sponsor", "admin"],
  "/auth": ["guest"],
  "/auth/login": ["guest"],
  "/auth/signup": ["guest"],
  
  // General user routes (logged in but no role selected)
  "/general": ["general", "learner", "tutor", "company", "sponsor", "admin"],
  "/general/dashboard": ["general", "learner", "tutor", "company", "sponsor", "admin"],
  "/onboarding": ["general", "learner", "tutor", "company", "sponsor", "admin"],
  
  // Shared routes (all authenticated users)
  "/outlines": ["general", "learner", "tutor", "company", "sponsor", "admin"],
  "/community": ["general", "learner", "tutor", "company", "sponsor", "admin"],
  "/profile": ["general", "learner", "tutor", "company", "sponsor", "admin"],
  
  // Member routes
  "/dashboard": ["learner", "tutor", "admin"],
  "/learn": ["learner", "tutor", "admin"],
  "/requests": ["learner", "tutor", "company", "admin"],
  "/articles": ["learner", "tutor", "company", "sponsor", "admin"],
  
  // Tutor routes
  "/tutor/dashboard": ["tutor", "admin"],
  "/tutor/courses": ["tutor", "admin"],
  "/tutor/validation": ["tutor", "admin"],
  "/tutor/analytics": ["tutor", "admin"],
  "/tutor/apply": ["learner", "admin"], // Only learners can apply
  
  // Company routes
  "/company/dashboard": ["company", "admin"],
  "/company/jobs": ["company", "admin"],
  "/company/talent": ["company", "admin"],
  "/company/register": ["general", "learner"], // Only non-company users can register
  
  // Sponsor routes
  "/partner/dashboard": ["sponsor", "admin"],
  "/partner/fund": ["sponsor", "admin"],
  "/partner/scholarships": ["sponsor", "admin"],
  "/partner/reports": ["sponsor", "admin"],
  
  // Settings (all authenticated users)
  "/settings": ["general", "learner", "tutor", "company", "sponsor", "admin"],
};

/**
 * Role display names
 */
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  guest: "Guest",
  general: "Explorer",
  learner: "Learner",
  tutor: "Tutor",
  company: "Company",
  sponsor: "Sponsor",
  admin: "Administrator",
};

/**
 * Role badge colors for UI
 */
export const ROLE_BADGE_COLORS: Record<UserRole, string> = {
  guest: "bg-gray-100 text-gray-800",
  general: "bg-blue-100 text-blue-800",
  learner: "bg-green-100 text-green-800",
  tutor: "bg-purple-100 text-purple-800",
  company: "bg-orange-100 text-orange-800",
  sponsor: "bg-pink-100 text-pink-800",
  admin: "bg-red-100 text-red-800",
};

/**
 * Determine effective role from user data
 * This is the single source of truth for role determination
 */
export function determineUserRole(userData: {
  user_type?: string;
  tutor_approved?: boolean;
  is_tutor?: boolean;
  company_verified?: boolean;
  selected_role?: string;
  onboarding_completed?: boolean;
  role?: string;
} | null): UserRole {
  if (!userData) return "guest";

  // Admin check (if backend provides this)
  if (userData.role === "admin") return "admin";

  // Company: user_type is 'company' AND verified
  if (userData.user_type === "company") {
    return "company";
  }

  // Tutor: must be explicitly approved
  if (userData.tutor_approved === true) {
    return "tutor";
  }

  // Sponsor check (if backend provides this)
  if (userData.selected_role === "sponsor" || userData.role === "sponsor") {
    return "sponsor";
  }

  // Learner: individual user who has completed onboarding
  if (userData.user_type === "individual") {
    if (userData.onboarding_completed || userData.selected_role === "learner") {
      return "learner";
    }
  }

  // General: logged in but hasn't selected a role or completed onboarding
  if (!userData.onboarding_completed && !userData.selected_role) {
    return "general";
  }

  // Default to learner for individual users with some role selection
  if (userData.selected_role) {
    return "learner";
  }

  return "general";
}

/**
 * Check if a role can access a specific route
 */
export function canAccessRoute(role: UserRole, route: string): boolean {
  // Find the most specific matching route
  const matchingRoutes = Object.keys(ROUTE_ACCESS)
    .filter(r => route.startsWith(r))
    .sort((a, b) => b.length - a.length);

  if (matchingRoutes.length === 0) {
    // No specific rule, allow authenticated users
    return role !== "guest";
  }

  const allowedRoles = ROUTE_ACCESS[matchingRoutes[0]];
  return allowedRoles.includes(role);
}

/**
 * Check if role A has higher or equal permissions than role B
 */
export function hasHigherOrEqualRole(roleA: UserRole, roleB: UserRole): boolean {
  return ROLE_HIERARCHY[roleA] >= ROLE_HIERARCHY[roleB];
}

/**
 * Get dashboard route for a specific role
 */
export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "tutor":
      return "/tutor/dashboard";
    case "company":
      return "/company/dashboard";
    case "sponsor":
      return "/partner/dashboard";
    case "learner":
      return "/dashboard";
    case "general":
      return "/general/dashboard";
    default:
      return "/";
  }
}
