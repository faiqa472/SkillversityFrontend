import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthStatus, UserRole } from "@/types";
import { determineUserRole } from "@/lib/role-config";

/**
 * Extended User interface with additional profile fields
 */
interface ExtendedUser extends Omit<User, 'role'> {
  role: UserRole;
  first_name?: string;
  last_name?: string;
  selected_role?: string;
  user_type?: string;
  is_tutor?: boolean;
  tutor_approved?: boolean;
  tutor_pending?: boolean;
  profile_completed?: boolean;
  onboarding_completed?: boolean;
  company_verified?: boolean;
}

/**
 * User Store Interface
 * Manages global authentication state and user profile
 */
interface UserStore {
  user: ExtendedUser | null;
  authStatus: AuthStatus;
  setUser: (user: ExtendedUser | null) => void;
  setAuthStatus: (status: AuthStatus) => void;
  updateUserRole: (role: UserRole) => void;
  syncFromLocalStorage: () => void;
  logout: () => void;
}

/**
 * Clear all auth data from localStorage
 */
function clearAuthData() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("skillversity-user-storage");
  }
}

/**
 * Global User Store using Zustand
 * Persisted to localStorage for session management
 */
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      authStatus: "unauthenticated",
      
      setUser: (user) => {
        if (user) {
          // Use centralized role determination
          const effectiveRole = determineUserRole(user);
          const normalizedUser = { ...user, role: effectiveRole };
          set({ user: normalizedUser, authStatus: "authenticated" });
          
          // Sync to localStorage for consistency
          if (typeof window !== "undefined") {
            const existingData = localStorage.getItem("user_data");
            if (existingData) {
              try {
                const parsed = JSON.parse(existingData);
                parsed.role = effectiveRole;
                localStorage.setItem("user_data", JSON.stringify(parsed));
              } catch {
                // ignore
              }
            }
          }
        } else {
          set({ user: null, authStatus: "unauthenticated" });
        }
      },
      
      setAuthStatus: (authStatus) => set({ authStatus }),
      
      updateUserRole: (role: UserRole) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, role };
          set({ user: updatedUser });
          
          // Also update localStorage
          if (typeof window !== "undefined") {
            const userData = localStorage.getItem("user_data");
            if (userData) {
              try {
                const parsed = JSON.parse(userData);
                parsed.role = role;
                localStorage.setItem("user_data", JSON.stringify(parsed));
              } catch {
                // ignore
              }
            }
          }
        }
      },
      
      syncFromLocalStorage: () => {
        if (typeof window !== "undefined") {
          const userData = localStorage.getItem("user_data");
          if (userData) {
            try {
              const parsed = JSON.parse(userData);
              const effectiveRole = determineUserRole(parsed);
              const normalizedUser = { ...parsed, role: effectiveRole };
              set({ user: normalizedUser, authStatus: "authenticated" });
            } catch {
              // ignore
            }
          }
        }
      },
      
      logout: () => {
        clearAuthData();
        set({ user: null, authStatus: "unauthenticated" });
      },
    }),
    {
      name: "skillversity-user-storage",
    }
  )
);
