/**
 * Professional authentication provider with React Query integration
 * Provides authentication context and handles app-wide auth state
 */

'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore, initializeAuth } from '@/store/auth-store';
import { AuthContextType } from '@/types/auth';

// Create React Query client with professional configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 401/403 errors
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});

// Create authentication context
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication provider component
 * Wraps the app with authentication context and React Query
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const authStore = useAuthStore();

  // Initialize authentication on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  // Handle authentication errors globally
  useEffect(() => {
    if (authStore.error) {
      // Suppress expected errors for unauthenticated users
      const suppressedErrors = [
        'No refresh token',
        'Network error',
        'Request failed',
      ];
      
      const shouldSuppress = suppressedErrors.some(msg => 
        authStore.error?.includes(msg)
      );
      
      // Only log unexpected errors
      if (!shouldSuppress) {
        console.error('Authentication error:', authStore.error);
      }
      
      // Handle specific error types - only redirect for session expiry
      if (authStore.error.includes('Session expired')) {
        if (typeof window !== 'undefined' && window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login?reason=session_expired';
        }
      }
    }
  }, [authStore.error]);

  // Provide authentication context value
  const contextValue: AuthContextType = {
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    error: authStore.error,
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    refreshToken: authStore.refreshToken,
    activateAccount: authStore.activateAccount,
    resendActivation: authStore.resendActivation,
    resetPassword: authStore.resetPassword,
    confirmPasswordReset: authStore.confirmPasswordReset,
    changePassword: authStore.changePassword,
    updateProfile: authStore.updateProfile,
    fetchUser: authStore.fetchUser,
    clearError: authStore.clearError,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

/**
 * Hook to use authentication context
 * Throws error if used outside AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

/**
 * Authentication status hook with loading states
 */
export function useAuthStatus() {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  return {
    isAuthenticated,
    isLoading,
    isGuest: !isAuthenticated && !isLoading,
    hasUser: !!user,
  };
}

/**
 * Hook for authentication actions with loading states
 */
export function useAuthActions() {
  const {
    login,
    register,
    logout,
    activateAccount,
    resendActivation,
    resetPassword,
    confirmPasswordReset,
    changePassword,
    updateProfile,
    clearError,
    isLoading,
    error,
  } = useAuth();

  return {
    // Actions
    login,
    register,
    logout,
    activateAccount,
    resendActivation,
    resetPassword,
    confirmPasswordReset,
    changePassword,
    updateProfile,
    clearError,
    
    // States
    isLoading,
    error,
  };
}

/**
 * Hook for user profile data with computed values
 */
export function useUserProfile() {
  const { user } = useAuth();
  
  if (!user) {
    return {
      user: null,
      displayName: 'Guest',
      initials: 'G',
      avatarUrl: null,
      isProfileComplete: false,
      completionPercentage: 0,
    };
  }

  const displayName = user.full_name || `${user.first_name} ${user.last_name}`.trim() || user.email;
  const initials = `${user.first_name?.charAt(0) || ''}${user.last_name?.charAt(0) || ''}`.toUpperCase() || user.email.charAt(0).toUpperCase();
  
  // Calculate profile completion
  const requiredFields = ['first_name', 'last_name', 'email'];
  const optionalFields = ['phone_number', 'bio', 'location', 'profile_picture'];
  const allFields = [...requiredFields, ...optionalFields];
  
  const completedFields = allFields.filter(field => {
    const value = user[field as keyof typeof user];
    return value && value !== '';
  });
  
  const completionPercentage = Math.round((completedFields.length / allFields.length) * 100);
  const isProfileComplete = requiredFields.every(field => user[field as keyof typeof user]);

  return {
    user,
    displayName,
    initials,
    avatarUrl: user.profile_picture,
    isProfileComplete,
    completionPercentage,
  };
}

/**
 * Hook for role-based permissions
 */
export function usePermissions() {
  const { user } = useAuth();
  
  const hasRole = (role: string) => user?.user_type === role;
  
  const hasPermission = (permission: string) => {
    if (!user) return false;
    
    // Define role-based permissions
    const rolePermissions = {
      admin: ['*'], // Admin has all permissions
      tutor: ['create_course', 'edit_course', 'view_analytics', 'manage_students'],
      industry_partner: ['post_jobs', 'manage_applications', 'view_talent', 'host_events'],
      learner: ['enroll_courses', 'submit_assignments', 'view_progress'],
    };
    
    const userPermissions = rolePermissions[user.user_type as keyof typeof rolePermissions] || [];
    return userPermissions.includes('*') || userPermissions.includes(permission);
  };
  
  const canAccessRoute = (requiredRole?: string) => {
    if (!requiredRole) return true;
    if (!user) return false;
    
    // Role hierarchy for route access
    const roleHierarchy = {
      admin: 4,
      industry_partner: 3,
      tutor: 2,
      learner: 1,
    };
    
    const userLevel = roleHierarchy[user.user_type as keyof typeof roleHierarchy] || 0;
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;
    
    return userLevel >= requiredLevel;
  };

  return {
    hasRole,
    hasPermission,
    canAccessRoute,
    isAdmin: () => hasRole('admin'),
    isTutor: () => hasRole('tutor'),
    isIndustryPartner: () => hasRole('industry_partner'),
    isLearner: () => hasRole('learner'),
  };
}

/**
 * Development-only authentication debug hook
 */
export function useAuthDebug() {
  const auth = useAuth();
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return {
    authState: {
      user: auth.user,
      isAuthenticated: auth.isAuthenticated,
      isLoading: auth.isLoading,
      error: auth.error,
    },
    actions: {
      clearError: auth.clearError,
      fetchUser: auth.fetchUser,
    },
  };
}