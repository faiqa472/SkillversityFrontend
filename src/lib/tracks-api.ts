/**
 * Learning Tracks API Service
 * Handles all API calls for the learning tracks/paths system
 */

import { apiClient } from './api';
import {
  TechnologyCategory,
  Technology,
  LearningTrack,
  TrackModule,
  TrackResource,
  TrackFollower,
  TechnologyFollower,
  TrackServiceProvider,
  TrackEndorsement,
  TrackChangeRequest,
  TrackStats,
  PaginatedResponse,
  TrackCreateRequest,
  TrackUpdateRequest,
  TrackSearchParams,
} from '@/types/tracks';

const BASE_URL = '/api/learning';

// =============================================================================
// TECHNOLOGY CATEGORY API
// =============================================================================

export const categoriesApi = {
  list: async (): Promise<TechnologyCategory[]> => {
    return apiClient.get(`${BASE_URL}/categories/`);
  },

  get: async (id: string): Promise<TechnologyCategory> => {
    return apiClient.get(`${BASE_URL}/categories/${id}/`);
  },

  getTechnologies: async (id: string): Promise<Technology[]> => {
    return apiClient.get(`${BASE_URL}/categories/${id}/technologies/`);
  },
};

// =============================================================================
// TECHNOLOGY API
// =============================================================================

export const technologiesApi = {
  list: async (params?: {
    category?: string;
    type?: string;
    trending?: boolean;
    featured?: boolean;
    search?: string;
  }): Promise<PaginatedResponse<Technology>> => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.type) queryParams.append('type', params.type);
    if (params?.trending) queryParams.append('trending', 'true');
    if (params?.featured) queryParams.append('featured', 'true');
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return apiClient.get(`${BASE_URL}/technologies/${query ? `?${query}` : ''}`);
  },

  get: async (slug: string): Promise<Technology> => {
    return apiClient.get(`${BASE_URL}/technologies/${slug}/`);
  },

  follow: async (slug: string): Promise<{ status: string }> => {
    return apiClient.post(`${BASE_URL}/technologies/${slug}/follow/`);
  },

  getTracks: async (slug: string): Promise<LearningTrack[]> => {
    return apiClient.get(`${BASE_URL}/technologies/${slug}/tracks/`);
  },
};

// =============================================================================
// LEARNING TRACK API
// =============================================================================

export const tracksApi = {
  list: async (params?: TrackSearchParams): Promise<PaginatedResponse<LearningTrack>> => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.technology) queryParams.append('technology', params.technology);
    if (params?.track_type) queryParams.append('track_type', params.track_type);
    if (params?.difficulty) queryParams.append('difficulty', params.difficulty);
    if (params?.open_only) queryParams.append('open_only', 'true');
    if (params?.verified_only) queryParams.append('verified_only', 'true');
    if (params?.ordering) queryParams.append('ordering', params.ordering);
    if (params?.page) queryParams.append('page', String(params.page));
    
    const query = queryParams.toString();
    return apiClient.get(`${BASE_URL}/tracks/${query ? `?${query}` : ''}`);
  },

  get: async (slug: string): Promise<LearningTrack> => {
    return apiClient.get(`${BASE_URL}/tracks/${slug}/`);
  },

  create: async (data: TrackCreateRequest): Promise<LearningTrack> => {
    return apiClient.post(`${BASE_URL}/tracks/`, data);
  },

  update: async (slug: string, data: TrackUpdateRequest): Promise<LearningTrack> => {
    return apiClient.patch(`${BASE_URL}/tracks/${slug}/`, data);
  },

  delete: async (slug: string): Promise<void> => {
    return apiClient.delete(`${BASE_URL}/tracks/${slug}/`);
  },

  follow: async (slug: string): Promise<{ status: string }> => {
    return apiClient.post(`${BASE_URL}/tracks/${slug}/follow/`);
  },

  publish: async (slug: string): Promise<{ status: string; published_at: string }> => {
    return apiClient.post(`${BASE_URL}/tracks/${slug}/publish/`);
  },

  completeModule: async (slug: string, moduleId: string): Promise<{
    progress_percentage: number;
    completed_modules: string[];
  }> => {
    return apiClient.post(`${BASE_URL}/tracks/${slug}/complete_module/`, {
      module_id: moduleId,
    });
  },

  myTracks: async (): Promise<LearningTrack[]> => {
    return apiClient.get(`${BASE_URL}/tracks/my_tracks/`);
  },

  following: async (): Promise<TrackFollower[]> => {
    return apiClient.get(`${BASE_URL}/tracks/following/`);
  },

  getProviders: async (slug: string): Promise<TrackServiceProvider[]> => {
    return apiClient.get(`${BASE_URL}/tracks/${slug}/providers/`);
  },

  getEndorsements: async (slug: string): Promise<TrackEndorsement[]> => {
    return apiClient.get(`${BASE_URL}/tracks/${slug}/endorsements/`);
  },

  getStats: async (slug: string): Promise<TrackStats> => {
    return apiClient.get(`${BASE_URL}/tracks/${slug}/stats/`);
  },
};

// =============================================================================
// TRACK MODULE API
// =============================================================================

export const trackModulesApi = {
  list: async (trackSlug: string): Promise<PaginatedResponse<TrackModule>> => {
    return apiClient.get(`${BASE_URL}/tracks/${trackSlug}/modules/`);
  },

  get: async (trackSlug: string, moduleId: string): Promise<TrackModule> => {
    return apiClient.get(`${BASE_URL}/tracks/${trackSlug}/modules/${moduleId}/`);
  },

  create: async (trackSlug: string, data: Partial<TrackModule>): Promise<TrackModule> => {
    return apiClient.post(`${BASE_URL}/tracks/${trackSlug}/modules/`, data);
  },

  update: async (trackSlug: string, moduleId: string, data: Partial<TrackModule>): Promise<TrackModule> => {
    return apiClient.patch(`${BASE_URL}/tracks/${trackSlug}/modules/${moduleId}/`, data);
  },

  delete: async (trackSlug: string, moduleId: string): Promise<void> => {
    return apiClient.delete(`${BASE_URL}/tracks/${trackSlug}/modules/${moduleId}/`);
  },
};

// =============================================================================
// SERVICE PROVIDER API
// =============================================================================

export const trackProvidersApi = {
  list: async (params?: {
    track?: string;
    service_type?: string;
    my_services?: boolean;
  }): Promise<PaginatedResponse<TrackServiceProvider>> => {
    const queryParams = new URLSearchParams();
    if (params?.track) queryParams.append('track', params.track);
    if (params?.service_type) queryParams.append('service_type', params.service_type);
    if (params?.my_services) queryParams.append('my_services', 'true');
    
    const query = queryParams.toString();
    return apiClient.get(`${BASE_URL}/track-providers/${query ? `?${query}` : ''}`);
  },

  create: async (data: {
    track: string;
    service_type: string;
    title: string;
    description: string;
    price_min?: number;
    price_max?: number;
    currency?: string;
    availability_notes?: string;
  }): Promise<TrackServiceProvider> => {
    return apiClient.post(`${BASE_URL}/track-providers/`, data);
  },

  update: async (id: string, data: Partial<TrackServiceProvider>): Promise<TrackServiceProvider> => {
    return apiClient.patch(`${BASE_URL}/track-providers/${id}/`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete(`${BASE_URL}/track-providers/${id}/`);
  },
};

// =============================================================================
// ENDORSEMENT API
// =============================================================================

export const trackEndorsementsApi = {
  list: async (params?: {
    track?: string;
    endorser_type?: string;
  }): Promise<PaginatedResponse<TrackEndorsement>> => {
    const queryParams = new URLSearchParams();
    if (params?.track) queryParams.append('track', params.track);
    if (params?.endorser_type) queryParams.append('endorser_type', params.endorser_type);
    
    const query = queryParams.toString();
    return apiClient.get(`${BASE_URL}/track-endorsements/${query ? `?${query}` : ''}`);
  },

  create: async (data: {
    track: string;
    endorser_type: string;
    title?: string;
    content: string;
    rating: number;
    pros?: string[];
    cons?: string[];
  }): Promise<TrackEndorsement> => {
    return apiClient.post(`${BASE_URL}/track-endorsements/`, data);
  },

  markHelpful: async (id: string): Promise<{ helpful_count: number }> => {
    return apiClient.post(`${BASE_URL}/track-endorsements/${id}/helpful/`);
  },
};

// =============================================================================
// CHANGE REQUEST API
// =============================================================================

export const trackChangesApi = {
  list: async (params?: {
    track?: string;
    status?: string;
  }): Promise<PaginatedResponse<TrackChangeRequest>> => {
    const queryParams = new URLSearchParams();
    if (params?.track) queryParams.append('track', params.track);
    if (params?.status) queryParams.append('status', params.status);
    
    const query = queryParams.toString();
    return apiClient.get(`${BASE_URL}/track-changes/${query ? `?${query}` : ''}`);
  },

  create: async (data: {
    track: string;
    request_type: string;
    title: string;
    description: string;
    proposed_changes?: Record<string, any>;
  }): Promise<TrackChangeRequest> => {
    return apiClient.post(`${BASE_URL}/track-changes/`, data);
  },

  approve: async (id: string): Promise<{ status: string }> => {
    return apiClient.post(`${BASE_URL}/track-changes/${id}/approve/`);
  },

  reject: async (id: string, reason?: string): Promise<{ status: string }> => {
    return apiClient.post(`${BASE_URL}/track-changes/${id}/reject/`, { reason });
  },
};
