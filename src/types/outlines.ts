/**
 * Learning Outlines Type Definitions
 * VCS-like collaborative learning path management
 */

import { User } from './index';

// =============================================================================
// ENUMS AND CONSTANTS
// =============================================================================

export type AuthorType = 'company' | 'tutor' | 'skillversity' | 'collaborative';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type CollaboratorRole = 'owner' | 'editor' | 'reviewer';
export type ChangeRequestStatus = 'open' | 'under_review' | 'changes_requested' | 'approved' | 'merged' | 'rejected' | 'closed';
export type ReviewStatus = 'pending' | 'approved' | 'changes_requested' | 'rejected';

// =============================================================================
// CORE OUTLINE TYPES
// =============================================================================

export interface LearningOutline {
  id: string;
  title: string;
  slug: string;
  description: string;
  author_type: AuthorType;
  primary_author: User;
  current_version: number;
  is_published: boolean;
  published_at: string | null;
  difficulty_level: DifficultyLevel;
  estimated_duration: string;
  skill_tags: string[];
  prerequisites?: LearningOutline[];
  view_count: number;
  enrollment_count: number;
  rating: number;
  min_approvals_required: number;
  modules?: OutlineModule[];
  collaborators?: OutlineCollaborator[];
  is_bookmarked?: boolean;
  user_progress?: LearnerProgress | null;
  created_at: string;
  updated_at: string;
}

export interface OutlineModule {
  id: string;
  title: string;
  description: string;
  content: Record<string, any>;
  order: number;
  duration_estimate: string;
  learning_objectives: string[];
  created_at: string;
  updated_at: string;
}

export interface OutlineVersion {
  id: string;
  version_number: number;
  snapshot: Record<string, any>;
  author: User;
  change_description: string;
  created_at: string;
}

export interface OutlineCollaborator {
  id: string;
  user: User;
  role: CollaboratorRole;
  invited_by: User;
  accepted_at: string | null;
  created_at: string;
}

// =============================================================================
// CHANGE REQUEST TYPES
// =============================================================================

export interface ChangeRequest {
  id: string;
  outline: string;
  title: string;
  description: string;
  contributor: User;
  base_version: OutlineVersion;
  proposed_changes: ProposedChanges;
  status: ChangeRequestStatus;
  merged_version?: OutlineVersion | null;
  merged_by?: User | null;
  merged_at?: string | null;
  rejection_reason?: string;
  rejected_by?: User | null;
  rejected_at?: string | null;
  reviews?: ChangeRequestReview[];
  comments?: ReviewComment[];
  is_ready_for_merge?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProposedChanges {
  title?: string;
  description?: string;
  difficulty_level?: DifficultyLevel;
  skill_tags?: string[];
  modules?: {
    add?: Partial<OutlineModule>[];
    update?: Partial<OutlineModule>[];
    delete?: string[];
  };
}

export interface ChangeRequestReview {
  id: string;
  reviewer: User;
  status: ReviewStatus;
  feedback: string;
  inline_comments: InlineComment[];
  created_at: string;
  updated_at: string;
}

export interface InlineComment {
  section_path: string;
  content: string;
}

export interface ReviewComment {
  id: string;
  author: User;
  content: string;
  parent?: string | null;
  section_path?: string;
  replies_count?: number;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// CAREER PATH TYPES
// =============================================================================

export interface JobRole {
  id: string;
  title: string;
  description: string;
  company?: User | null;
  required_skills: SkillRequirement[];
  optional_skills: SkillRequirement[];
  outlines_count?: number;
  created_at: string;
  updated_at: string;
}

export interface SkillRequirement {
  skill: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  target_job_role: JobRole;
  created_by: User;
  steps: CareerPathStep[];
  created_at: string;
  updated_at: string;
}

export interface CareerPathStep {
  id: string;
  outline: LearningOutline;
  order: number;
  is_required: boolean;
}

export interface OutlineJobRoleMapping {
  id: string;
  outline: LearningOutline;
  job_role: JobRole;
  relevance_score: number;
  created_at: string;
}

// =============================================================================
// PROGRESS TYPES
// =============================================================================

export interface LearnerProgress {
  id?: string;
  outline?: LearningOutline;
  completed_modules: string[];
  progress_percentage: number;
  started_at: string;
  completed_at: string | null;
}

export interface CareerPathProgress {
  career_path_id: string;
  total_steps: number;
  completed_steps: number;
  overall_percentage: number;
  steps: CareerPathStepProgress[];
}

export interface CareerPathStepProgress {
  order: number;
  outline_id: string;
  outline_title: string;
  is_required: boolean;
  progress_percentage: number;
  completed: boolean;
}

// =============================================================================
// ANALYTICS TYPES
// =============================================================================

export interface OutlineAnalytics {
  total_views: number;
  total_enrollments: number;
  total_completions: number;
  average_completion_time: string | null;
  average_rating: number;
  module_completion_rates: Record<string, number>;
  last_updated: string;
}

// =============================================================================
// VERSION DIFF TYPES
// =============================================================================

export interface VersionDiff {
  additions: DiffItem[];
  deletions: DiffItem[];
  modifications: DiffModification[];
}

export interface DiffItem {
  type: 'module' | 'field';
  data: Record<string, any>;
}

export interface DiffModification {
  type?: 'module';
  field?: string;
  id?: string;
  old: any;
  new: any;
}

// =============================================================================
// API REQUEST/RESPONSE TYPES
// =============================================================================

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface OutlineCreateRequest {
  title: string;
  description: string;
  author_type?: AuthorType;
  difficulty_level?: DifficultyLevel;
  estimated_duration: string;
  skill_tags?: string[];
  min_approvals_required?: number;
  modules?: Omit<OutlineModule, 'id' | 'created_at' | 'updated_at'>[];
  prerequisite_ids?: string[];
}

export interface OutlineUpdateRequest {
  title?: string;
  description?: string;
  difficulty_level?: DifficultyLevel;
  estimated_duration?: string;
  skill_tags?: string[];
  min_approvals_required?: number;
  prerequisite_ids?: string[];
}

export interface ChangeRequestCreateRequest {
  outline: string;
  title: string;
  description: string;
  proposed_changes: ProposedChanges;
}

export interface OutlineSearchParams {
  search?: string;
  author_type?: AuthorType;
  difficulty_level?: DifficultyLevel;
  is_published?: boolean;
  ordering?: string;
  page?: number;
  skill_tags?: string[];
  job_role?: string;
}
