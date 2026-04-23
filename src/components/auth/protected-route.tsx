/**
 * Professional protected route component with role-based access control
 * Handles authentication, authorization, and loading states
 */

'use client';

import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, usePermissions } from '@/components/providers/auth-provider';
import { UserType } from '@/types/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserType;
  requiredPermission?: string;
  fallback?: ReactNode;
  redirectTo?: string;
  showLoading?: boolean;
}

/**
 * Loading component for protected routes
 */
function AuthLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Verifying authentication...</p>
      </div>
    </div>
  );
}

/**
 * Unauthorized access component
 */
function UnauthorizedAccess({ requiredRole, requiredPermission }: { 
  requiredRole?: UserType; 
  requiredPermission?: string; 
}) {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        
        <p className="text-gray-600 mb-6">
          {requiredRole 
            ? `This page requires ${requiredRole} access level.`
            : requiredPermission
            ? `You don't have the required permission: ${requiredPermission}`
            : 'You don\'t have permission to access this page.'
          }
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => router.back()}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Go Back
          </button>
          
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Protected route component with comprehensive access control
 */
export function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  fallback,
  redirectTo = '/auth/login',
  showLoading = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasPermission, canAccessRoute } = usePermissions();
  const router = useRouter();

  // Handle authentication check
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store the current path for redirect after login
      const currentPath = window.location.pathname + window.location.search;
      const loginUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`;
      router.push(loginUrl);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  // Show loading state
  if (isLoading) {
    return showLoading ? <AuthLoadingSpinner /> : null;
  }

  // Not authenticated
  if (!isAuthenticated) {
    return fallback || null;
  }

  // Check role-based access
  if (requiredRole && !canAccessRoute(requiredRole)) {
    return <UnauthorizedAccess requiredRole={requiredRole} />;
  }

  // Check permission-based access
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <UnauthorizedAccess requiredPermission={requiredPermission} />;
  }

  // All checks passed, render children
  return <>{children}</>;
}

/**
 * Higher-order component for protecting pages
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, 'children'>
) {
  const WrappedComponent = (props: P) => {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * Role-specific protected route components
 */
export function AdminRoute({ children, ...props }: Omit<ProtectedRouteProps, 'requiredRole'>) {
  return (
    <ProtectedRoute requiredRole="admin" {...props}>
      {children}
    </ProtectedRoute>
  );
}

export function TutorRoute({ children, ...props }: Omit<ProtectedRouteProps, 'requiredRole'>) {
  return (
    <ProtectedRoute requiredRole="tutor" {...props}>
      {children}
    </ProtectedRoute>
  );
}

export function IndustryRoute({ children, ...props }: Omit<ProtectedRouteProps, 'requiredRole'>) {
  return (
    <ProtectedRoute requiredRole="industry_partner" {...props}>
      {children}
    </ProtectedRoute>
  );
}

export function LearnerRoute({ children, ...props }: Omit<ProtectedRouteProps, 'requiredRole'>) {
  return (
    <ProtectedRoute requiredRole="learner" {...props}>
      {children}
    </ProtectedRoute>
  );
}

/**
 * Conditional rendering based on authentication status
 */
interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
  requireGuest?: boolean;
}

export function AuthGuard({ 
  children, 
  fallback = null, 
  requireAuth = false, 
  requireGuest = false 
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <AuthLoadingSpinner />;
  }

  if (requireAuth && !isAuthenticated) {
    return <>{fallback}</>;
  }

  if (requireGuest && isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Permission-based conditional rendering
 */
interface PermissionGuardProps {
  children: ReactNode;
  permission: string;
  fallback?: ReactNode;
}

export function PermissionGuard({ children, permission, fallback = null }: PermissionGuardProps) {
  const { hasPermission } = usePermissions();

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Role-based conditional rendering
 */
interface RoleGuardProps {
  children: ReactNode;
  role: UserType;
  fallback?: ReactNode;
}

export function RoleGuard({ children, role, fallback = null }: RoleGuardProps) {
  const { canAccessRoute } = usePermissions();

  if (!canAccessRoute(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}