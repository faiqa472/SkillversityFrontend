import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  headline?: string
  location?: string
  currentRole?: string
  currentCompany?: string
  experienceLevel?: string
  userType: 'individual' | 'company'
  profileCompleted: boolean
  isTutor: boolean
  tutorApproved: boolean
  isVerified: boolean
  createdAt: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  clearError: () => void
  setLoading: (loading: boolean) => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    immer((set) => ({
      // Initial state
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set((state) => {
          state.isLoading = true
          state.error = null
        })

        try {
          const response = await fetch('http://localhost:8000/api/users/auth/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          })

          if (!response.ok) {
            throw new Error('Login failed')
          }

          const data = await response.json()

          set((state) => {
            state.user = data.user
            state.tokens = data.tokens
            state.isAuthenticated = true
            state.isLoading = false
          })
        } catch (error) {
          set((state) => {
            state.error = error instanceof Error ? error.message : 'Login failed'
            state.isLoading = false
          })
          throw error
        }
      },

      register: async (userData: any) => {
        set((state) => {
          state.isLoading = true
          state.error = null
        })

        try {
          const response = await fetch('http://localhost:8000/api/users/auth/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          })

          if (!response.ok) {
            throw new Error('Registration failed')
          }

          const data = await response.json()

          set((state) => {
            state.user = data.user
            state.tokens = data.tokens
            state.isAuthenticated = true
            state.isLoading = false
          })
        } catch (error) {
          set((state) => {
            state.error = error instanceof Error ? error.message : 'Registration failed'
            state.isLoading = false
          })
          throw error
        }
      },

      logout: () => {
        set((state) => {
          state.user = null
          state.tokens = null
          state.isAuthenticated = false
          state.error = null
        })
      },

      updateUser: (userData: Partial<User>) => {
        set((state) => {
          if (state.user) {
            Object.assign(state.user, userData)
          }
        })
      },

      clearError: () => {
        set((state) => {
          state.error = null
        })
      },

      setLoading: (loading: boolean) => {
        set((state) => {
          state.isLoading = loading
        })
      },
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)