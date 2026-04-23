"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/hooks/useRole";
import type { UserRole } from "@/types";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackUrl?: string;
  showLoading?: boolean;
}

/**
 * Role-based route protection component
 * Redirects users who don't have the required role
 */
export function RoleGuard({
  children,
  allowedRoles,
  fallbackUrl,
  showLoading = true,
}: RoleGuardProps) {
  const router = useRouter();
  const { role, isAuthenticated, getDashboard } = useRole();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user has required role
    if (allowedRoles.includes(role)) {
      setIsAuthorized(true);
      setIsChecking(false);
      return;
    }

    // Not authorized - redirect
    const redirectUrl = fallbackUrl || (isAuthenticated ? getDashboard() : "/auth/login");
    router.replace(redirectUrl);
  }, [role, allowedRoles, fallbackUrl, isAuthenticated, getDashboard, router]);

  if (isChecking && showLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-muted-foreground">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

/**
 * HOC for role-based page protection
 */
export function withRoleGuard<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: UserRole[],
  fallbackUrl?: string
) {
  return function GuardedComponent(props: P) {
    return (
      <RoleGuard allowedRoles={allowedRoles} fallbackUrl={fallbackUrl}>
        <Component {...props} />
      </RoleGuard>
    );
  };
}
