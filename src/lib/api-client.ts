/**
 * API Client for SkillVersity Backend
 * Centralized API communication layer
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Get auth token from localStorage
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

// Base fetch wrapper with auth
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ============ COURSES API ============

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  course_type: "pre_made" | "custom" | "live";
  instructor: {
    id: string;
    first_name: string;
    last_name: string;
  };
  price: string;
  currency: string;
  enrolled_count: number;
  rating_average: string;
  rating_count: number;
  status: string;
  created_at: string;
}

export interface CourseOutline {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty_level: string;
  estimated_duration_weeks: number;
  technologies: string[];
  prerequisites: string[];
  version: string;
  status: string;
  contributors_count: number;
}

export const coursesApi = {
  list: () => apiFetch<PaginatedResponse<Course>>("/api/courses/"),
  getOutlines: () => apiFetch<PaginatedResponse<CourseOutline>>("/api/courses/outlines/"),
  getStats: () => apiFetch<{ total_courses: number; total_enrollments: number }>("/api/courses/stats/"),
};

// ============ ARTICLES API ============

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    first_name: string;
    last_name: string;
  };
  tags: string[];
  read_time: number;
  views_count: number;
  likes_count: number;
  published_at: string;
}

export const articlesApi = {
  list: () => apiFetch<PaginatedResponse<Article>>("/api/articles/articles/"),
  get: (id: number) => apiFetch<Article>(`/api/articles/articles/${id}/`),
  getTags: () => apiFetch<{ id: number; name: string }[]>("/api/articles/tags/"),
};

// ============ USER API ============

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  headline: string;
  location: string;
  current_role: string;
  current_company: string;
  experience_level: string;
  profile_completed: boolean;
  is_tutor: boolean;
  tutor_approved: boolean;
}

export interface ProfessionalProfile {
  summary: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  career_goals: string;
  interests: string[];
  available_for_tutoring: boolean;
  available_for_mentoring: boolean;
  is_public: boolean;
  completeness_score: number;
}

export const userApi = {
  getProfile: () => apiFetch<UserProfile>("/api/users/profile/"),
  updateProfile: (data: Partial<UserProfile>) =>
    apiFetch<UserProfile>("/api/users/profile/", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  getProfessionalProfile: () => apiFetch<ProfessionalProfile>("/api/users/profile/professional/"),
  completeProfile: () =>
    apiFetch<{ success: boolean }>("/api/users/profile/complete/", { method: "POST" }),
};

// ============ STATS API ============

export interface PlatformStats {
  total_users: number;
  total_tutors: number;
  total_companies: number;
  total_courses: number;
  total_enrollments: number;
}

export const statsApi = {
  getPlatformStats: () => apiFetch<PlatformStats>("/api/users/stats/"),
};

// ============ JOBS API ============

export interface Job {
  id: number;
  title: string;
  company: {
    id: number;
    company_name: string;
  };
  location: string;
  job_type: string;
  experience_level: string;
  salary_min: number;
  salary_max: number;
  skills_required: string[];
  posted_at: string;
  deadline: string;
}

export const jobsApi = {
  list: () => apiFetch<PaginatedResponse<Job>>("/api/industry/jobs/"),
};

// ============ LEARNING REQUESTS API ============

export interface LearningRequest {
  id: number;
  title: string;
  description: string;
  technologies_wanted: string[];
  skill_level: string;
  budget_min: string;
  budget_max: string;
  preferred_duration_weeks: number;
  urgency: string;
  status: string;
  tutor_responses_count: number;
  created_at: string;
}

export const learningRequestsApi = {
  list: () => apiFetch<PaginatedResponse<LearningRequest>>("/api/courses/learning-requests/"),
  create: (data: Partial<LearningRequest>) =>
    apiFetch<LearningRequest>("/api/courses/learning-requests/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ============ PROJECTS API ============

export interface Project {
  id: string;
  title: string;
  description: string;
  project_url: string;
  repo_url: string;
  technologies: string[];
  image: string | null;
  created_at: string;
}

export const projectsApi = {
  list: () => apiFetch<PaginatedResponse<Project>>("/api/users/projects/"),
  create: (data: Partial<Project>) =>
    apiFetch<Project>("/api/users/projects/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  get: (id: string) => apiFetch<Project>(`/api/users/projects/${id}/`),
  delete: (id: string) => apiFetch<{ success: boolean }>(`/api/users/projects/${id}/`, { method: "DELETE" }),
};
