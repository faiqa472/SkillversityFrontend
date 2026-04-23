/**
 * Learning Outlines API Service
 * Handles all API calls for the collaborative learning outlines system
 */

import { apiClient } from './api';
import {
  LearningOutline,
  OutlineModule,
  OutlineVersion,
  OutlineCollaborator,
  ChangeRequest,
  ReviewComment,
  JobRole,
  CareerPath,
  CareerPathProgress,
  OutlineAnalytics,
  VersionDiff,
  PaginatedResponse,
  OutlineCreateRequest,
  OutlineUpdateRequest,
  ChangeRequestCreateRequest,
  OutlineSearchParams,
  OutlineJobRoleMapping,
  LearnerProgress,
} from '@/types/outlines';

const BASE_URL = '/api/learning';

// =============================================================================
// OUTLINE API
// =============================================================================

export const outlinesApi = {
  // List outlines with optional filters
  list: async (params?: OutlineSearchParams): Promise<PaginatedResponse<LearningOutline>> => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.author_type) queryParams.append('author_type', params.author_type);
    if (params?.difficulty_level) queryParams.append('difficulty_level', params.difficulty_level);
    if (params?.is_published !== undefined) queryParams.append('is_published', String(params.is_published));
    if (params?.ordering) queryParams.append('ordering', params.ordering);
    if (params?.page) queryParams.append('page', String(params.page));
    
    const query = queryParams.toString();
    return apiClient.get(`${BASE_URL}/outlines/${query ? `?${query}` : ''}`);
  },

  // Get single outline
  get: async (id: string): Promise<LearningOutline> => {
    return apiClient.get(`${BASE_URL}/outlines/${id}/`);
  },

  // Create outline
  create: async (data: OutlineCreateRequest): Promise<LearningOutline> => {
    return apiClient.post(`${BASE_URL}/outlines/`, data);
  },

  // Update outline
  update: async (id: string, data: OutlineUpdateRequest): Promise<LearningOutline> => {
    return apiClient.patch(`${BASE_URL}/outlines/${id}/`, data);
  },

  // Delete outline
  delete: async (id: string): Promise<void> => {
    return apiClient.delete(`${BASE_URL}/outlines/${id}/`);
  },

  // Publish outline
  publish: async (id: string): Promise<{ status: string; version: number; published_at: string }> => {
    return apiClient.post(`${BASE_URL}/outlines/${id}/publish/`);
  },

  // Toggle bookmark
  bookmark: async (id: string): Promise<{ message: string }> => {
    return apiClient.post(`${BASE_URL}/outlines/${id}/bookmark/`);
  },

  // Get my outlines
  myOutlines: async (): Promise<LearningOutline[]> => {
    return apiClient.get(`${BASE_URL}/outlines/my_outlines/`);
  },

  // Get my bookmarks
  myBookmarks: async (): Promise<LearningOutline[]> => {
    return apiClient.get(`${BASE_URL}/outlines/my_bookmarks/`);
  },

  // Get analytics
  analytics: async (id: string): Promise<OutlineAnalytics> => {
    return apiClient.get(`${BASE_URL}/outlines/${id}/analytics/`);
  },
};

// =============================================================================
// VERSION API
// =============================================================================

export const versionsApi = {
  // Get version history
  list: async (outlineId: string): Promise<OutlineVersion[]> => {
    return apiClient.get(`${BASE_URL}/outlines/${outlineId}/versions/`);
  },

  // Compare two versions
  compare: async (outlineId: string, versionAId: string, versionBId: string): Promise<VersionDiff> => {
    return apiClient.post(`${BASE_URL}/outlines/${outlineId}/compare_versions/`, {
      version_a: versionAId,
      version_b: versionBId,
    });
  },

  // Revert to version
  revert: async (outlineId: string, versionId: string): Promise<{ message: string; new_version: number }> => {
    return apiClient.post(`${BASE_URL}/outlines/${outlineId}/revert_version/`, {
      version_id: versionId,
    });
  },
};

// =============================================================================
// COLLABORATOR API
// =============================================================================

export const collaboratorsApi = {
  // List collaborators
  list: async (outlineId: string): Promise<OutlineCollaborator[]> => {
    return apiClient.get(`${BASE_URL}/outlines/${outlineId}/collaborators/`);
  },

  // Add collaborator
  add: async (outlineId: string, userId: string, role: 'editor' | 'reviewer'): Promise<OutlineCollaborator> => {
    return apiClient.post(`${BASE_URL}/outlines/${outlineId}/collaborators/`, {
      user_id: userId,
      role,
    });
  },

  // Remove collaborator
  remove: async (outlineId: string, collaboratorId: string): Promise<void> => {
    return apiClient.delete(`${BASE_URL}/outlines/${outlineId}/collaborators/${collaboratorId}/`);
  },
};

// =============================================================================
// MODULE API
// =============================================================================

export const modulesApi = {
  // List modules
  list: async (outlineId: string): Promise<PaginatedResponse<OutlineModule>> => {
    return apiClient.get(`${BASE_URL}/outlines/${outlineId}/modules/`);
  },

  // Get module
  get: async (outlineId: string, moduleId: string): Promise<OutlineModule> => {
    return apiClient.get(`${BASE_URL}/outlines/${outlineId}/modules/${moduleId}/`);
  },

  // Create module
  create: async (outlineId: string, data: Partial<OutlineModule>): Promise<OutlineModule> => {
    return apiClient.post(`${BASE_URL}/outlines/${outlineId}/modules/`, data);
  },

  // Update module
  update: async (outlineId: string, moduleId: string, data: Partial<OutlineModule>): Promise<OutlineModule> => {
    return apiClient.patch(`${BASE_URL}/outlines/${outlineId}/modules/${moduleId}/`, data);
  },

  // Delete module
  delete: async (outlineId: string, moduleId: string): Promise<void> => {
    return apiClient.delete(`${BASE_URL}/outlines/${outlineId}/modules/${moduleId}/`);
  },

  // Reorder modules
  reorder: async (outlineId: string, order: { id: string; order: number }[]): Promise<OutlineModule[]> => {
    return apiClient.post(`${BASE_URL}/outlines/${outlineId}/modules/reorder/`, { order });
  },

  // Mark module complete
  complete: async (outlineId: string, moduleId: string): Promise<{ progress_percentage: number; completed_modules: string[] }> => {
    return apiClient.post(`${BASE_URL}/outlines/${outlineId}/modules/${moduleId}/complete/`);
  },
};

// =============================================================================
// CHANGE REQUEST API
// =============================================================================

export const changeRequestsApi = {
  // List change requests
  list: async (params?: { status?: string; outline?: string }): Promise<PaginatedResponse<ChangeRequest>> => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.outline) queryParams.append('outline', params.outline);
    
    const query = queryParams.toString();
    return apiClient.get(`${BASE_URL}/change-requests/${query ? `?${query}` : ''}`);
  },

  // Get change request
  get: async (id: string): Promise<ChangeRequest> => {
    return apiClient.get(`${BASE_URL}/change-requests/${id}/`);
  },

  // Create change request
  create: async (data: ChangeRequestCreateRequest): Promise<ChangeRequest> => {
    return apiClient.post(`${BASE_URL}/change-requests/`, data);
  },

  // Update change request
  update: async (id: string, data: Partial<ChangeRequestCreateRequest>): Promise<ChangeRequest> => {
    return apiClient.patch(`${BASE_URL}/change-requests/${id}/`, data);
  },

  // Approve change request
  approve: async (id: string): Promise<{ status: string; is_ready_for_merge: boolean }> => {
    return apiClient.post(`${BASE_URL}/change-requests/${id}/approve/`);
  },

  // Reject change request
  reject: async (id: string, reason: string): Promise<{ status: string }> => {
    return apiClient.post(`${BASE_URL}/change-requests/${id}/reject/`, { reason });
  },

  // Merge change request
  merge: async (id: string): Promise<{ status: string; new_version: number }> => {
    return apiClient.post(`${BASE_URL}/change-requests/${id}/merge/`);
  },

  // Request changes
  requestChanges: async (id: string, feedback: string): Promise<{ status: string }> => {
    return apiClient.post(`${BASE_URL}/change-requests/${id}/request_changes/`, { feedback });
  },

  // Get comments
  getComments: async (id: string): Promise<ReviewComment[]> => {
    return apiClient.get(`${BASE_URL}/change-requests/${id}/comments/`);
  },

  // Add comment
  addComment: async (id: string, content: string, parentId?: string, sectionPath?: string): Promise<ReviewComment> => {
    return apiClient.post(`${BASE_URL}/change-requests/${id}/comments/`, {
      content,
      parent: parentId,
      section_path: sectionPath,
    });
  },

  // Get conflicts for outline
  getConflicts: async (outlineId: string): Promise<{ conflicts: any[] }> => {
    return apiClient.get(`${BASE_URL}/change-requests/outline/${outlineId}/conflicts/`);
  },
};

// =============================================================================
// JOB ROLE API
// =============================================================================

export const jobRolesApi = {
  // List job roles
  list: async (params?: { search?: string }): Promise<PaginatedResponse<JobRole>> => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return apiClient.get(`${BASE_URL}/job-roles/${query ? `?${query}` : ''}`);
  },

  // Get job role
  get: async (id: string): Promise<JobRole> => {
    return apiClient.get(`${BASE_URL}/job-roles/${id}/`);
  },

  // Create job role
  create: async (data: Partial<JobRole>): Promise<JobRole> => {
    return apiClient.post(`${BASE_URL}/job-roles/`, data);
  },

  // Update job role
  update: async (id: string, data: Partial<JobRole>): Promise<JobRole> => {
    return apiClient.patch(`${BASE_URL}/job-roles/${id}/`, data);
  },

  // Get outlines for job role
  getOutlines: async (id: string): Promise<LearningOutline[]> => {
    return apiClient.get(`${BASE_URL}/job-roles/${id}/outlines/`);
  },

  // Link outline to job role
  linkOutline: async (outlineId: string, jobRoleId: string, relevanceScore?: number): Promise<OutlineJobRoleMapping> => {
    return apiClient.post(`${BASE_URL}/outlines/${outlineId}/job_roles/`, {
      job_role_id: jobRoleId,
      relevance_score: relevanceScore ?? 50,
    });
  },
};

// =============================================================================
// CAREER PATH API
// =============================================================================

export const careerPathsApi = {
  // List career paths
  list: async (params?: { target_job_role?: string; search?: string }): Promise<PaginatedResponse<CareerPath>> => {
    const queryParams = new URLSearchParams();
    if (params?.target_job_role) queryParams.append('target_job_role', params.target_job_role);
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return apiClient.get(`${BASE_URL}/career-paths/${query ? `?${query}` : ''}`);
  },

  // Get career path
  get: async (id: string): Promise<CareerPath> => {
    return apiClient.get(`${BASE_URL}/career-paths/${id}/`);
  },

  // Create career path
  create: async (data: {
    title: string;
    description: string;
    target_job_role: string;
    steps?: { outline_id: string; order?: number; is_required?: boolean }[];
  }): Promise<CareerPath> => {
    return apiClient.post(`${BASE_URL}/career-paths/`, data);
  },

  // Get progress
  getProgress: async (id: string): Promise<CareerPathProgress> => {
    return apiClient.get(`${BASE_URL}/career-paths/${id}/progress/`);
  },

  // Add step
  addStep: async (id: string, outlineId: string, order?: number, isRequired?: boolean): Promise<any> => {
    return apiClient.post(`${BASE_URL}/career-paths/${id}/add_step/`, {
      outline_id: outlineId,
      order,
      is_required: isRequired ?? true,
    });
  },
};

// =============================================================================
// PROGRESS API
// =============================================================================

export const progressApi = {
  // Get all progress
  list: async (): Promise<PaginatedResponse<LearnerProgress>> => {
    return apiClient.get(`${BASE_URL}/progress/`);
  },

  // Get progress for outline
  get: async (id: string): Promise<LearnerProgress> => {
    return apiClient.get(`${BASE_URL}/progress/${id}/`);
  },
};
