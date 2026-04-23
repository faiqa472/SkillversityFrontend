/**
 * Professional authentication type definitions
 * Matches backend Djoser + JWT implementation
 */

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  user_type: UserType;
  phone_number?: string;
  profile_picture?: string;
  bio?: string;
  location?: string;
  date_of_birth?: string;
  is_email_verified: boolean;
  is_profile_complete: boolean;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  preferences?: UserPreferences;
}

export type UserType = 'learner' | 'tutor' | 'industry_partner' | 'admin';

export interface UserPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  marketing_emails: boolean;
  dark_mode: boolean;
  language: string;
  timezone: string;
}

// Authentication Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user?: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  re_password: string;
  first_name: string;
  last_name: string;
  user_type: UserType;
  phone_number?: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: UserType;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface TokenRefreshResponse {
  access: string;
  refresh?: string;
}

export interface PasswordChangeRequest {
  new_password: string;
  re_new_password: string;
  current_password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}

export interface ActivationRequest {
  uid: string;
  token: string;
}

export interface ResendActivationRequest {
  email: string;
}

// Authentication State Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterRequest) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  activateAccount: (data: ActivationRequest) => Promise<{ success: boolean; error?: string }>;
  resendActivation: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  confirmPasswordReset: (data: PasswordResetConfirmRequest) => Promise<{ success: boolean; error?: string }>;
  changePassword: (data: PasswordChangeRequest) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  fetchUser: () => Promise<void>;
  clearError: () => void;
}

// Form Validation Types
export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  phoneNumber?: string;
  agreeToTerms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// API Error Types
export interface AuthError {
  message: string;
  field?: string;
  code?: string;
}

export interface ValidationErrors {
  [key: string]: string[];
}

// Route Protection Types
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserType;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

// Authentication Context Types
export interface AuthContextType extends AuthState, AuthActions {}

// Hook Return Types
export interface UseAuthReturn extends AuthContextType {}

export interface UseLoginReturn {
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
}

export interface UseRegisterReturn {
  register: (userData: RegisterRequest) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
}

// Permission Types
export type Permission = 
  | 'create_course'
  | 'edit_course'
  | 'delete_course'
  | 'manage_users'
  | 'view_analytics'
  | 'post_jobs'
  | 'manage_applications'
  | 'moderate_content';

export type RolePermissions = {
  [key in UserType]: Permission[];
};

// Session Types
export interface SessionInfo {
  user: User;
  permissions: Permission[];
  lastActivity: string;
  expiresAt: string;
}

// OAuth Types (for future social login)
export interface OAuthProvider {
  name: string;
  clientId: string;
  redirectUri: string;
  scope: string[];
}

export interface OAuthResponse {
  access_token: string;
  refresh_token?: string;
  user: User;
}