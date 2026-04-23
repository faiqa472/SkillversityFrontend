/**
 * Professional authentication service
 * Handles all authentication-related API calls with proper error handling
 */

import { apiClient, handleAPIError } from './api';
import {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  TokenRefreshResponse,
} from '@/types/auth';

/**
 * Authentication service class with comprehensive error handling
 */
export class AuthService {
  // Authentication endpoints - using custom backend endpoints
  private static readonly ENDPOINTS = {
    LOGIN: '/api/users/auth/login/',
    REFRESH: '/api/auth/jwt/refresh/',
    VERIFY: '/api/auth/jwt/verify/',
    REGISTER: '/api/users/auth/register/',
    USER_PROFILE: '/api/users/profile/',
    PROFESSIONAL_PROFILE: '/api/users/profile/professional/',
    LOGOUT: '/api/users/auth/logout/',
  } as const;

  /**
   * User login with email and password
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        this.ENDPOINTS.LOGIN,
        credentials
      );
      
      // Log successful login for analytics
      if (typeof window !== 'undefined') {
        console.log('User logged in successfully');
      }
      
      return response;
    } catch (error: any) {
      const apiError = handleAPIError(error);
      throw new Error(apiError.message);
    }
  }

  /**
   * User registration
   */
  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>(
        this.ENDPOINTS.REGISTER,
        userData
      );
      
      // Log successful registration for analytics
      if (typeof window !== 'undefined') {
        console.log('User registered successfully');
      }
      
      return response;
    } catch (error: any) {
      const apiError = handleAPIError(error);
      
      // Handle validation errors specifically
      if (apiError.status === 400 && apiError.details) {
        const validationErrors = apiError.details;
        const errorMessages: string[] = [];
        
        Object.keys(validationErrors).forEach(field => {
          const fieldErrors = validationErrors[field];
          if (Array.isArray(fieldErrors)) {
            errorMessages.push(...fieldErrors);
          } else if (typeof fieldErrors === 'string') {
            errorMessages.push(fieldErrors);
          }
        });
        
        throw new Error(errorMessages.join('. '));
      }
      
      throw new Error(apiError.message);
    }
  }

  /**
   * Refresh JWT token
   */
  static async refreshToken(refreshToken: string): Promise<TokenRefreshResponse> {
    try {
      const response = await apiClient.post<TokenRefreshResponse>(
        this.ENDPOINTS.REFRESH,
        { refresh: refreshToken }
      );
      
      return response;
    } catch (error: any) {
      const apiError = handleAPIError(error);
      throw new Error(apiError.message);
    }
  }

  /**
   * Verify JWT token validity
   */
  static async verifyToken(token: string): Promise<boolean> {
    try {
      await apiClient.post(this.ENDPOINTS.VERIFY, { token });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get current user profile
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<User>(this.ENDPOINTS.USER_PROFILE);
      return response;
    } catch (error: any) {
      const apiError = handleAPIError(error);
      throw new Error(apiError.message);
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.patch<User>(
        this.ENDPOINTS.USER_PROFILE,
        userData
      );
      
      return response;
    } catch (error: any) {
      const apiError = handleAPIError(error);
      throw new Error(apiError.message);
    }
  }

  /**
   * Get professional profile
   */
  static async getProfessionalProfile(): Promise<any> {
    try {
      const response = await apiClient.get(this.ENDPOINTS.PROFESSIONAL_PROFILE);
      return response;
    } catch (error: any) {
      const apiError = handleAPIError(error);
      throw new Error(apiError.message);
    }
  }

  /**
   * Update professional profile
   */
  static async updateProfessionalProfile(data: any): Promise<any> {
    try {
      const response = await apiClient.put(this.ENDPOINTS.PROFESSIONAL_PROFILE, data);
      return response;
    } catch (error: any) {
      const apiError = handleAPIError(error);
      throw new Error(apiError.message);
    }
  }

  /**
   * Logout user (blacklist refresh token)
   */
  static async logout(refreshToken?: string): Promise<void> {
    try {
      if (refreshToken) {
        await apiClient.post(this.ENDPOINTS.LOGOUT, { refresh: refreshToken });
      }
    } catch (error: any) {
      // Don't throw error on logout failure - still clear local tokens
      console.warn('Logout API call failed:', error);
    }
  }
}

/**
 * Utility functions for authentication
 */
export class AuthUtils {
  /**
   * Check if user has specific permission
   */
  static hasPermission(user: User | null, permission: string): boolean {
    if (!user) return false;
    
    // Define role-based permissions
    const rolePermissions = {
      admin: ['*'], // Admin has all permissions
      tutor: ['create_course', 'edit_course', 'view_analytics'],
      industry_partner: ['post_jobs', 'manage_applications', 'view_analytics'],
      learner: ['view_courses', 'enroll_courses'],
    };
    
    const userPermissions = rolePermissions[user.user_type] || [];
    return userPermissions.includes('*') || userPermissions.includes(permission);
  }

  /**
   * Check if user can access specific route
   */
  static canAccessRoute(user: User | null, requiredRole?: string): boolean {
    if (!requiredRole) return true;
    if (!user) return false;
    
    // Role hierarchy: admin > industry_partner > tutor > learner
    const roleHierarchy = {
      admin: 4,
      industry_partner: 3,
      tutor: 2,
      learner: 1,
    };
    
    const userLevel = roleHierarchy[user.user_type] || 0;
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;
    
    return userLevel >= requiredLevel;
  }

  /**
   * Get user display name
   */
  static getDisplayName(user: User | null): string {
    if (!user) return 'Guest';
    return user.full_name || `${user.first_name} ${user.last_name}`.trim() || user.email;
  }

  /**
   * Get user avatar URL or initials
   */
  static getAvatarUrl(user: User | null): string | null {
    return user?.profile_picture || null;
  }

  /**
   * Get user initials for avatar fallback
   */
  static getUserInitials(user: User | null): string {
    if (!user) return 'G';
    
    const firstName = user.first_name?.charAt(0)?.toUpperCase() || '';
    const lastName = user.last_name?.charAt(0)?.toUpperCase() || '';
    
    return firstName + lastName || user.email.charAt(0).toUpperCase();
  }

  /**
   * Format user role for display
   */
  static formatUserRole(role: string): string {
    const roleMap = {
      learner: 'Learner',
      tutor: 'Tutor',
      industry_partner: 'Industry Partner',
      admin: 'Administrator',
    };
    
    return roleMap[role as keyof typeof roleMap] || role;
  }

  /**
   * Check if user profile is complete
   */
  static isProfileComplete(user: User | null): boolean {
    if (!user) return false;
    
    const requiredFields = ['first_name', 'last_name', 'email'];
    return requiredFields.every(field => user[field as keyof User]);
  }

  /**
   * Get profile completion percentage
   */
  static getProfileCompletionPercentage(user: User | null): number {
    if (!user) return 0;
    
    const allFields = [
      'first_name',
      'last_name',
      'email',
      'phone_number',
      'bio',
      'location',
      'profile_picture',
    ];
    
    const completedFields = allFields.filter(field => {
      const value = user[field as keyof User];
      return value && value !== '';
    });
    
    return Math.round((completedFields.length / allFields.length) * 100);
  }
}