import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface CourseOutline {
  id: string;
  title: string;
  description: string;
  version: string;
  status: "draft" | "under_review" | "active" | "archived";
  company: {
    id: string;
    name: string;
    logo?: string;
  };
  difficultyLevel: string;
  estimatedDurationWeeks: number;
  technologies: string[];
  contributorsCount: number;
  tutorApplicationsCount: number;
  learnerRequestsCount: number;
  branches: OutlineBranch[];
  lastUpdated: string;
}

export interface OutlineBranch {
  id: string;
  name: string;
  type: "main" | "feature" | "hotfix" | "experimental";
  lastCommit: string;
  createdBy: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  type: "pre_made" | "custom" | "live";
  instructor: {
    id: string;
    name: string;
    headline: string;
    avatar?: string;
  };
  price: number;
  currency: string;
  rating: number;
  studentsCount: number;
  duration: string;
  level: string;
  tags: string[];
  thumbnail?: string;
}

export interface LearningRequest {
  id: string;
  title: string;
  description: string;
  technologiesWanted: string[];
  skillLevel: string;
  budgetMin?: number;
  budgetMax?: number;
  preferredDurationWeeks: number;
  urgency: string;
  status: string;
  tutorResponsesCount: number;
  createdAt: string;
}

interface PlatformState {
  // Course Outlines
  outlines: CourseOutline[];
  selectedOutline: CourseOutline | null;
  outlinesLoading: boolean;

  // Courses
  courses: Course[];
  selectedCourse: Course | null;
  coursesLoading: boolean;

  // Learning Requests
  learningRequests: LearningRequest[];
  selectedRequest: LearningRequest | null;
  requestsLoading: boolean;

  // Filters and Search
  searchQuery: string;
  categoryFilter: string;
  levelFilter: string;
  typeFilter: string;

  // UI State
  sidebarOpen: boolean;
  theme: "light" | "dark";
}

interface PlatformActions {
  // Course Outlines
  fetchOutlines: () => Promise<void>;
  selectOutline: (outline: CourseOutline | null) => void;
  createOutline: (outlineData: any) => Promise<void>;
  updateOutline: (id: string, updates: Partial<CourseOutline>) => Promise<void>;

  // Courses
  fetchCourses: () => Promise<void>;
  selectCourse: (course: Course | null) => void;

  // Learning Requests
  fetchLearningRequests: () => Promise<void>;
  createLearningRequest: (requestData: any) => Promise<void>;

  // Filters and Search
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setLevelFilter: (level: string) => void;
  setTypeFilter: (type: string) => void;
  clearFilters: () => void;

  // UI Actions
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

type PlatformStore = PlatformState & PlatformActions;

export const usePlatformStore = create<PlatformStore>()(
  immer(set => ({
    // Initial state
    outlines: [],
    selectedOutline: null,
    outlinesLoading: false,

    courses: [],
    selectedCourse: null,
    coursesLoading: false,

    learningRequests: [],
    selectedRequest: null,
    requestsLoading: false,

    searchQuery: "",
    categoryFilter: "",
    levelFilter: "",
    typeFilter: "",

    sidebarOpen: false,
    theme: "light",

    // Actions
    fetchOutlines: async () => {
      set(state => {
        state.outlinesLoading = true;
      });

      try {
        const response = await fetch("/api/courses/outlines/");
        const data = await response.json();

        set(state => {
          state.outlines = data.results || data;
          state.outlinesLoading = false;
        });
      } catch (error) {
        set(state => {
          state.outlinesLoading = false;
        });
        console.error("Failed to fetch outlines:", error);
      }
    },

    selectOutline: outline => {
      set(state => {
        state.selectedOutline = outline;
      });
    },

    createOutline: async outlineData => {
      try {
        const response = await fetch("/api/courses/outlines/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(outlineData),
        });

        if (!response.ok) {
          throw new Error("Failed to create outline");
        }

        const newOutline = await response.json();

        set(state => {
          state.outlines.unshift(newOutline);
        });
      } catch (error) {
        console.error("Failed to create outline:", error);
        throw error;
      }
    },

    updateOutline: async (id, updates) => {
      try {
        const response = await fetch(`/api/courses/outlines/${id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          throw new Error("Failed to update outline");
        }

        const updatedOutline = await response.json();

        set(state => {
          const index = state.outlines.findIndex(
            (o: CourseOutline) => o.id === id,
          );
          if (index !== -1) {
            state.outlines[index] = updatedOutline;
          }
        });
      } catch (error) {
        console.error("Failed to update outline:", error);
        throw error;
      }
    },

    fetchCourses: async () => {
      set(state => {
        state.coursesLoading = true;
      });

      try {
        const response = await fetch("/api/courses/");
        const data = await response.json();

        set(state => {
          state.courses = data.results || data;
          state.coursesLoading = false;
        });
      } catch (error) {
        set(state => {
          state.coursesLoading = false;
        });
        console.error("Failed to fetch courses:", error);
      }
    },

    selectCourse: course => {
      set(state => {
        state.selectedCourse = course;
      });
    },

    fetchLearningRequests: async () => {
      set(state => {
        state.requestsLoading = true;
      });

      try {
        const response = await fetch("/api/courses/learning-requests/");
        const data = await response.json();

        set(state => {
          state.learningRequests = data.results || data;
          state.requestsLoading = false;
        });
      } catch (error) {
        set(state => {
          state.requestsLoading = false;
        });
        console.error("Failed to fetch learning requests:", error);
      }
    },

    createLearningRequest: async requestData => {
      try {
        const response = await fetch("/api/courses/learning-requests/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error("Failed to create learning request");
        }

        const newRequest = await response.json();

        set(state => {
          state.learningRequests.unshift(newRequest);
        });
      } catch (error) {
        console.error("Failed to create learning request:", error);
        throw error;
      }
    },

    setSearchQuery: query => {
      set(state => {
        state.searchQuery = query;
      });
    },

    setCategoryFilter: category => {
      set(state => {
        state.categoryFilter = category;
      });
    },

    setLevelFilter: level => {
      set(state => {
        state.levelFilter = level;
      });
    },

    setTypeFilter: type => {
      set(state => {
        state.typeFilter = type;
      });
    },

    clearFilters: () => {
      set(state => {
        state.searchQuery = "";
        state.categoryFilter = "";
        state.levelFilter = "";
        state.typeFilter = "";
      });
    },

    toggleSidebar: () => {
      set(state => {
        state.sidebarOpen = !state.sidebarOpen;
      });
    },

    setTheme: theme => {
      set(state => {
        state.theme = theme;
      });
    },
  })),
);
