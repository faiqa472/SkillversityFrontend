/**
 * React Hooks for Learning Outlines
 * Provides data fetching and state management for outlines
 */

import { useState, useEffect, useCallback } from 'react';
import {
  outlinesApi,
  versionsApi,
  modulesApi,
  changeRequestsApi,
  jobRolesApi,
  careerPathsApi,
} from '@/lib/outlines-api';
import {
  LearningOutline,
  OutlineModule,
  OutlineVersion,
  ChangeRequest,
  JobRole,
  CareerPath,
  OutlineSearchParams,
  VersionDiff,
  CareerPathProgress,
  OutlineAnalytics,
} from '@/types/outlines';

// =============================================================================
// OUTLINE HOOKS
// =============================================================================

export function useOutlines(params?: OutlineSearchParams) {
  const [outlines, setOutlines] = useState<LearningOutline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchOutlines = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await outlinesApi.list(params);
      setOutlines(response.results);
      setTotalCount(response.count);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch outlines');
    } finally {
      setLoading(false);
    }
  }, [params?.search, params?.author_type, params?.difficulty_level, params?.ordering, params?.page]);

  useEffect(() => {
    fetchOutlines();
  }, [fetchOutlines]);

  return { outlines, loading, error, totalCount, refetch: fetchOutlines };
}

export function useOutline(id: string | null) {
  const [outline, setOutline] = useState<LearningOutline | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOutline = useCallback(async () => {
    if (!id) {
      setOutline(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await outlinesApi.get(id);
      setOutline(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch outline');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOutline();
  }, [fetchOutline]);

  return { outline, loading, error, refetch: fetchOutline };
}

export function useMyOutlines() {
  const [outlines, setOutlines] = useState<LearningOutline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOutlines = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await outlinesApi.myOutlines();
      setOutlines(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch outlines');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOutlines();
  }, [fetchOutlines]);

  return { outlines, loading, error, refetch: fetchOutlines };
}

export function useBookmarkedOutlines() {
  const [outlines, setOutlines] = useState<LearningOutline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOutlines = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await outlinesApi.myBookmarks();
      setOutlines(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOutlines();
  }, [fetchOutlines]);

  return { outlines, loading, error, refetch: fetchOutlines };
}

// =============================================================================
// VERSION HOOKS
// =============================================================================

export function useVersionHistory(outlineId: string | null) {
  const [versions, setVersions] = useState<OutlineVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVersions = useCallback(async () => {
    if (!outlineId) {
      setVersions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await versionsApi.list(outlineId);
      setVersions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch versions');
    } finally {
      setLoading(false);
    }
  }, [outlineId]);

  useEffect(() => {
    fetchVersions();
  }, [fetchVersions]);

  return { versions, loading, error, refetch: fetchVersions };
}

export function useVersionDiff(outlineId: string | null, versionAId: string | null, versionBId: string | null) {
  const [diff, setDiff] = useState<VersionDiff | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDiff = useCallback(async () => {
    if (!outlineId || !versionAId || !versionBId) {
      setDiff(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await versionsApi.compare(outlineId, versionAId, versionBId);
      setDiff(data);
    } catch (err: any) {
      setError(err.message || 'Failed to compare versions');
    } finally {
      setLoading(false);
    }
  }, [outlineId, versionAId, versionBId]);

  useEffect(() => {
    fetchDiff();
  }, [fetchDiff]);

  return { diff, loading, error, refetch: fetchDiff };
}

// =============================================================================
// MODULE HOOKS
// =============================================================================

export function useModules(outlineId: string | null) {
  const [modules, setModules] = useState<OutlineModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = useCallback(async () => {
    if (!outlineId) {
      setModules([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await modulesApi.list(outlineId);
      setModules(response.results);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch modules');
    } finally {
      setLoading(false);
    }
  }, [outlineId]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return { modules, loading, error, refetch: fetchModules };
}

// =============================================================================
// CHANGE REQUEST HOOKS
// =============================================================================

export function useChangeRequests(params?: { status?: string; outline?: string }) {
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChangeRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await changeRequestsApi.list(params);
      setChangeRequests(response.results);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch change requests');
    } finally {
      setLoading(false);
    }
  }, [params?.status, params?.outline]);

  useEffect(() => {
    fetchChangeRequests();
  }, [fetchChangeRequests]);

  return { changeRequests, loading, error, refetch: fetchChangeRequests };
}

export function useChangeRequest(id: string | null) {
  const [changeRequest, setChangeRequest] = useState<ChangeRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChangeRequest = useCallback(async () => {
    if (!id) {
      setChangeRequest(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await changeRequestsApi.get(id);
      setChangeRequest(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch change request');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchChangeRequest();
  }, [fetchChangeRequest]);

  return { changeRequest, loading, error, refetch: fetchChangeRequest };
}

// =============================================================================
// JOB ROLE HOOKS
// =============================================================================

export function useJobRoles(search?: string) {
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobRolesApi.list({ search });
      setJobRoles(response.results);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch job roles');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchJobRoles();
  }, [fetchJobRoles]);

  return { jobRoles, loading, error, refetch: fetchJobRoles };
}

// =============================================================================
// CAREER PATH HOOKS
// =============================================================================

export function useCareerPaths(params?: { target_job_role?: string; search?: string }) {
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCareerPaths = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await careerPathsApi.list(params);
      setCareerPaths(response.results);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch career paths');
    } finally {
      setLoading(false);
    }
  }, [params?.target_job_role, params?.search]);

  useEffect(() => {
    fetchCareerPaths();
  }, [fetchCareerPaths]);

  return { careerPaths, loading, error, refetch: fetchCareerPaths };
}

export function useCareerPath(id: string | null) {
  const [careerPath, setCareerPath] = useState<CareerPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCareerPath = useCallback(async () => {
    if (!id) {
      setCareerPath(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await careerPathsApi.get(id);
      setCareerPath(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch career path');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCareerPath();
  }, [fetchCareerPath]);

  return { careerPath, loading, error, refetch: fetchCareerPath };
}

export function useCareerPathProgress(id: string | null) {
  const [progress, setProgress] = useState<CareerPathProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!id) {
      setProgress(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await careerPathsApi.getProgress(id);
      setProgress(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return { progress, loading, error, refetch: fetchProgress };
}

// =============================================================================
// ANALYTICS HOOKS
// =============================================================================

export function useOutlineAnalytics(outlineId: string | null) {
  const [analytics, setAnalytics] = useState<OutlineAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    if (!outlineId) {
      setAnalytics(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await outlinesApi.analytics(outlineId);
      setAnalytics(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  }, [outlineId]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { analytics, loading, error, refetch: fetchAnalytics };
}
