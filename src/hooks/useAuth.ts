import { useUserStore } from "@/store/useUserStore";

/**
 * Custom hook for authentication state
 * Provides easy access to user data and auth status
 *
 * @returns Authentication state and user data
 */
export function useAuth() {
  const user = useUserStore((state) => state.user);
  const authStatus = useUserStore((state) => state.authStatus);
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  const isAuthenticated = authStatus === "authenticated";
  const isLoading = authStatus === "loading";

  return {
    user,
    authStatus,
    isAuthenticated,
    isLoading,
    setUser,
    logout,
  };
}
