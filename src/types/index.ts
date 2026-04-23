/**
 * Core Type Definitions for SkillVersity Platform
 * All domain models and shared types are defined here.
 */

/**
 * User roles in the platform
 * - guest: No account, browse only
 * - general: Explorer - free account to browse platform
 * - learner: Member - full access to courses, outlines, and portfolio
 * - tutor: Industry expert/teacher who can create courses and verify skills
 * - company: Recruiter/HR
 * - sponsor: NGO/Corporate partner
 */
export type UserRole = "guest" | "general" | "learner" | "tutor" | "company" | "sponsor" | "admin";

/**
 * User authentication status
 */
export type AuthStatus = "authenticated" | "unauthenticated" | "loading";

/**
 * Core User interface
 * Matches the backend UserSerializer response
 */
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  name?: string; // Computed field for backwards compatibility
  headline?: string;
  location?: string;
  current_role?: string;
  current_company?: string;
  experience_level?: string;
  phone?: string;
  user_type?: UserRole;
  role?: UserRole; // Alias for user_type
  profile_completed?: boolean;
  is_tutor?: boolean;
  tutor_approved?: boolean;
  is_verified?: boolean;
  avatar?: string;
  bio?: string;
  created_at?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Course difficulty levels
 */
export type CourseDifficulty = "beginner" | "intermediate" | "advanced";

/**
 * Course interface
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  difficulty: CourseDifficulty;
  tutorId: string;
  tutor?: User;
  modules: Module[];
  enrolledCount: number;
  rating: number;
  duration: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Module interface (part of a course)
 */
export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  videoUrl?: string;
  documentation?: string; // Markdown content
  duration: number; // in minutes
  isCompleted?: boolean;
}

/**
 * Project verification status
 */
export type ProjectStatus = "pending" | "verified" | "rejected";

/**
 * Verified Project interface (for TPP)
 */
export interface VerifiedProject {
  id: string;
  userId: string;
  title: string;
  description: string;
  technologies: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  status: ProjectStatus;
  verifiedBy?: string; // Tutor ID
  verifiedAt?: Date;
  createdAt: Date;
}

/**
 * Article interface (Professional Article Engine)
 */
export interface Article {
  id: string;
  title: string;
  content: string; // Markdown
  authorId: string;
  author?: User;
  coAuthors?: User[];
  tags: string[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Job posting interface
 */
export interface JobPosting {
  id: string;
  companyId: string;
  company?: User;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedAt: Date;
  expiresAt?: Date;
}

/**
 * Scholarship interface
 */
export interface Scholarship {
  id: string;
  partnerId: string;
  partner?: User;
  title: string;
  description: string;
  amount: number;
  currency: string;
  eligibilityCriteria: string[];
  applicationDeadline: Date;
  createdAt: Date;
}

/**
 * Career path step interface
 */
export interface CareerPathStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  order: number;
}

/**
 * Notification interface
 */
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: Date;
}

// Re-export track types
export * from './tracks';
