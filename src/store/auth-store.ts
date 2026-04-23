/**
 * Professional Zustand authentication store
 * Implements enterprise-grade state management with persistence and error handling
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthService, AuthUtils } from '@/lib/auth-service';
import { TokenManager } from '@/lib/api';
import {
  User,
  AuthState,
  AuthActions,
  LoginRequest,
  RegisterRequest,
  PasswordChangeRequest,
  PasswordResetConfirmRequest,
  ActivationRequest,
} from '@/types/auth';

interface AuthStore extends AuthState, AuthActions {}

/**
 * Authentication store with comprehensive state management
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await AuthService.login(credentials);
          
          // Store tokens securely
          TokenManager.setTokens(response.access, response.refresh);
          
          // Fetch user profile
          const user = await AuthService.getCurrentUser();
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // Log successful login for analytics
          if (typeof window !== 'undefined') {
            console.log('Login successful:', user.email);
          }

          return { success: true };
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Login failed',
            isAuthenticated: false,
            user: null,
          });

          return { success: false, error: error.message || 'Login failed' };
        }
      },

      register: async (userData: RegisterRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          await AuthService.register(userData);
          
          set({
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Registration failed',
          });

          return { success: false, error: error.message || 'Registration failed' };
        }
      },

      logout: async () => {
        set({ isLoading: true });
        
        try {
          const refreshToken = TokenManager.getRefreshToken();
          
          // Call logout API to blacklist token
          await AuthService.logout(refreshToken || undefined);
          
          // Clear tokens and state
          TokenManager.clearTokens();
          
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          // Redirect to login page
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
        } catch (error: any) {
          // Even if API call fails, clear local state
          TokenManager.clearTokens();
          
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
        }
      },

      refreshToken: async () => {
        const refreshToken = TokenManager.getRefreshToken();
        
        if (!refreshToken) {
          // No error - this is expected for unauthenticated users
          set({
            user: null,
            isAuthenticated: false,
          });
          return false;
        }

        try {
          const response = await AuthService.refreshToken(refreshToken);
          
          // Update stored tokens
          TokenManager.setTokens(response.access, refreshToken);
          
          return true;
        } catch (error: any) {
          // Refresh failed, clear everything
          TokenManager.clearTokens();
          
          set({
            user: null,
            isAuthenticated: false,
            error: 'Session expired',
          });

          return false;
        }
      },

      activateAccount: async (data: ActivationRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          await AuthService.activateAccount(data);
          
          set({
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Account activation failed',
          });

          return { success: false, error: error.message || 'Account activation failed' };
        }
      },

      resendActivation: async (email: string) => {
        set({ isLoading: true, error: null });
        
        try {
          await AuthService.resendActivation(email);
          
          set({
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Failed to resend activation email',
          });

          return { success: false, error: error.message || 'Failed to resend activation email' };
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        
        try {
          await AuthService.resetPassword(email);
          
          set({
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Password reset request failed',
          });

          return { success: false, error: error.message || 'Password reset request failed' };
        }
      },

      confirmPasswordReset: async (data: PasswordResetConfirmRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          await AuthService.confirmPasswordReset(data);
          
          set({
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Password reset confirmation failed',
          });

          return { success: false, error: error.message || 'Password reset confirmation failed' };
        }
      },

      changePassword: async (data: PasswordChangeRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          await AuthService.changePassword(data);
          
          set({
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Password change failed',
          });

          return { success: false, error: error.message || 'Password change failed' };
        }
      },

      updateProfile: async (userData: Partial<User>) => {
        set({ isLoading: true, error: null });
        
        try {
          const updatedUser = await AuthService.updateProfile(userData);
          
          set({
            user: updatedUser,
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Profile update failed',
          });

          return { success: false, error: error.message || 'Profile update failed' };
        }
      },

      fetchUser: async () => {
        const token = TokenManager.getAccessToken();
        
        if (!token) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return;
        }

        set({ isLoading: true });
        
        try {
          const user = await AuthService.getCurrentUser();
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          // Token might be invalid, try to refresh
          const refreshSuccess = await get().refreshToken();
          
          if (refreshSuccess) {
            try {
              const user = await AuthService.getCurrentUser();
              
              set({
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
            } catch (retryError: any) {
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: retryError.message,
              });
            }
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: error.message,
            });
          }
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'skillversity-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist user data, not loading states or errors
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/**
 * Authentication store selectors for optimized re-renders
 */
export const useAuth = () => useAuthStore();

export const useUser = () => useAuthStore((state) => state.user);

export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);

export const useAuthLoading = () => useAuthStore((state) => state.isLoading);

export const useAuthError = () => useAuthStore((state) => state.error);

/**
 * Authentication utility hooks
 */
export const usePermissions = () => {
  const user = useUser();
  
  return {
    hasPermission: (permission: string) => AuthUtils.hasPermission(user, permission),
    canAccessRoute: (requiredRole?: string) => AuthUtils.canAccessRoute(user, requiredRole),
    isAdmin: () => user?.user_type === 'admin',
    isTutor: () => user?.user_type === 'tutor',
    isIndustryPartner: () => user?.user_type === 'industry_partner',
    isLearner: () => user?.user_type === 'learner',
  };
};

export const useUserProfile = () => {
  const user = useUser();
  
  return {
    displayName: AuthUtils.getDisplayName(user),
    initials: AuthUtils.getUserInitials(user),
    avatarUrl: AuthUtils.getAvatarUrl(user),
    formattedRole: AuthUtils.formatUserRole(user?.user_type || ''),
    isProfileComplete: AuthUtils.isProfileComplete(user),
    completionPercentage: AuthUtils.getProfileCompletionPercentage(user),
  };
};

/**
 * Initialize authentication on app start
 */
export const initializeAuth = () => {
  const { fetchUser } = useAuthStore.getState();
  
  // Check if we have tokens and fetch user data
  if (typeof window !== 'undefined') {
    const token = TokenManager.getAccessToken();
    if (token) {
      fetchUser();
    }
  }
};