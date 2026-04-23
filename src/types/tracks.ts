/**
 * Learning Tracks Type Definitions
 * Comprehensive skill/technology-based learning paths system
 */

import { User } from './index';

// =============================================================================
// ENUMS AND CONSTANTS
// =============================================================================

export type TechType = 'language' | 'framework' | 'library' | 'tool' | 'platform' | 'database' | 'concept' | 'role' | 'other';
export type TrackType = 'official' | 'tutor' | 'community' | 'skillversity';
export type TrackDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'all';
export type TrackStatus = 'draft' | 'pending_review' | 'published' | 'archived';
export type ModuleType = 'learning' | 'project' | 'assessment' | 'resource' | 'milestone';
export type ResourceType = 'documentation' | 'tutorial' | 'video' | 'article' | 'book' | 'github' | 'tool' | 'community' | 'certification' | 'other';
export type AuthenticityLevel = 'official' | 'verified' | 'community' | 'unverified';
export type ServiceType = 'tutoring' | 'course' | 'mentorship' | 'bootcamp' | 'hiring' | 'consulting';
export type EndorserType = 'company' | 'tutor' | 'learner' | 'expert';
export type ChangeRequestType = 'fix' | 'update' | 'add_resource' | 'remove_resource' | 'restructure' | 'other';
export type ChangeRequestStatus = 'open' | 'under_review' | 'approved' | 'rejected' | 'merged';

// =============================================================================
// TECHNOLOGY TYPES
// =============================================================================

export interface TechnologyCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  technologies_count: number;
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  category: TechnologyCategory;
  tech_type: TechType;
  description: string;
  icon_url: string;
  official_url?: string;
  tracks_count: number;
  followers_count: number;
  related_technologies?: Technology[];
  is_trending: boolean;
  is_featured: boolean;
  is_following?: boolean;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// TRACK TYPES
// =============================================================================

export interface TrackResource {
  id: string;
  title: string;
  description: string;
  url: string;
  resource_type: ResourceType;
  authenticity: AuthenticityLevel;
  is_free: boolean;
  quality_score: number;
  upvotes: number;
  downvotes: number;
  provider_name: string;
  added_by?: User;
  order: number;
  created_at: string;
}

export interface TrackModule {
  id: string;
  title: string;
  description: string;
  module_type: ModuleType;
  order: number;
  content: Record<string, any>;
  learning_objectives: string[];
  estimated_duration_minutes: number;
  resources: TrackResource[];
  external_links: string[];
  linked_course_id?: string;
  linked_outline_id?: string;
  is_optional: boolean;
  created_at: string;
  updated_at: string;
}

export interface LearningTrack {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  primary_technology: Technology;
  technologies: Technology[];
  skill_tags: string[];
  track_type: TrackType;
  difficulty_level: TrackDifficulty;
  author: User;
  organization_name: string;
  is_verified_source: boolean;
  estimated_duration_hours: number;
  estimated_duration_weeks: number;
  modules_count: number;
  status: TrackStatus;
  is_open_path: boolean;
  published_at: string | null;
  view_count: number;
  followers_count: number;
  completions_count: number;
  rating: number;
  rating_count: number;
  tutors_offering_count: number;
  companies_hiring_count: number;
  version: string;
  last_updated_content: string | null;
  prerequisites?: LearningTrack[];
  prerequisite_description: string;
  modules?: TrackModule[];
  resources?: TrackResource[];
  is_following?: boolean;
  user_progress?: TrackProgress | null;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// USER ENGAGEMENT TYPES
// =============================================================================

export interface TrackProgress {
  progress_percentage: number;
  completed_modules: string[];
  started_at: string;
  completed_at: string | null;
}

export interface TrackFollower {
  id: string;
  track: LearningTrack;
  started_at: string;
  completed_modules: string[];
  progress_percentage: number;
  completed_at: string | null;
  is_bookmarked: boolean;
  notes: string;
  created_at: string;
}

export interface TechnologyFollower {
  id: string;
  technology: Technology;
  created_at: string;
}

// =============================================================================
// SERVICE PROVIDER TYPES
// =============================================================================

export interface TrackServiceProvider {
  id: string;
  track: LearningTrack;
  provider: User;
  service_type: ServiceType;
  title: string;
  description: string;
  price_min: number | null;
  price_max: number | null;
  currency: string;
  is_available: boolean;
  availability_notes: string;
  students_count: number;
  rating: number;
  reviews_count: number;
  is_verified: boolean;
  created_at: string;
}

// =============================================================================
// ENDORSEMENT TYPES
// =============================================================================

export interface TrackEndorsement {
  id: string;
  endorser: User;
  endorser_type: EndorserType;
  title: string;
  content: string;
  rating: number;
  pros: string[];
  cons: string[];
  is_verified: boolean;
  helpful_count: number;
  created_at: string;
}

// =============================================================================
// CHANGE REQUEST TYPES
// =============================================================================

export interface TrackChangeRequest {
  id: string;
  track: string;
  requester: User;
  request_type: ChangeRequestType;
  title: string;
  description: string;
  proposed_changes: Record<string, any>;
  status: ChangeRequestStatus;
  reviewed_by?: User;
  review_notes: string;
  reviewed_at: string | null;
  created_at: string;
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

export interface TrackCreateRequest {
  title: string;
  description: string;
  short_description?: string;
  primary_technology: string;
  technology_ids?: string[];
  skill_tags?: string[];
  track_type?: TrackType;
  difficulty_level?: TrackDifficulty;
  organization_name?: string;
  estimated_duration_hours?: number;
  estimated_duration_weeks?: number;
  is_open_path?: boolean;
  prerequisite_ids?: string[];
  prerequisite_description?: string;
  modules?: Omit<TrackModule, 'id' | 'created_at' | 'updated_at' | 'resources'>[];
}

export interface TrackUpdateRequest {
  title?: string;
  description?: string;
  short_description?: string;
  technology_ids?: string[];
  skill_tags?: string[];
  difficulty_level?: TrackDifficulty;
  estimated_duration_hours?: number;
  estimated_duration_weeks?: number;
  is_open_path?: boolean;
  prerequisite_ids?: string[];
  prerequisite_description?: string;
}

export interface TrackSearchParams {
  search?: string;
  technology?: string;
  track_type?: TrackType;
  difficulty?: TrackDifficulty;
  open_only?: boolean;
  verified_only?: boolean;
  ordering?: string;
  page?: number;
}

export interface TrackStats {
  view_count: number;
  followers_count: number;
  completions_count: number;
  rating: number;
  rating_count: number;
  tutors_offering_count: number;
  companies_hiring_count: number;
  modules_count: number;
  resources_count: number;
  endorsements_count: number;
}
