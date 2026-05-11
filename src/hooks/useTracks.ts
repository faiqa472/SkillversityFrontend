/**
 * React Hooks for Learning Tracks
 */

import { useState, useEffect, useCallback } from "react";
import {
  categoriesApi,
  technologiesApi,
  tracksApi,
  trackProvidersApi,
  trackEndorsementsApi,
} from "@/lib/tracks-api";
import {
  TechnologyCategory,
  Technology,
  LearningTrack,
  TrackFollower,
  TrackServiceProvider,
  TrackEndorsement,
  TrackSearchParams,
  TrackStats,
} from "@/types/tracks";

// =============================================================================
// TECHNOLOGY HOOKS
// =============================================================================

export function useCategories() {
  const [categories, setCategories] = useState<TechnologyCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoriesApi.list();
        setCategories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load categories",
        );
        setCategories([]); // Ensure categories is always an array
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export function useTechnologies(params?: {
  category?: string;
  type?: string;
  trending?: boolean;
  featured?: boolean;
  search?: string;
}) {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setLoading(true);
        const data = await technologiesApi.list(params);
        setTechnologies(data.results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load technologies",
        );
        setTechnologies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, [
    params?.category,
    params?.type,
    params?.trending,
    params?.featured,
    params?.search,
  ]);

  return { technologies, loading, error };
}

export function useTechnology(slug: string) {
  const [technology, setTechnology] = useState<Technology | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchTechnology = async () => {
      try {
        setLoading(true);
        const data = await technologiesApi.get(slug);
        setTechnology(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load technology",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTechnology();
  }, [slug]);

  const followTechnology = useCallback(async () => {
    if (!slug) return;
    try {
      const result = await technologiesApi.follow(slug);
      if (technology) {
        setTechnology({
          ...technology,
          is_following: result.status === "following",
          followers_count:
            technology.followers_count +
            (result.status === "following" ? 1 : -1),
        });
      }
      return result;
    } catch (err) {
      throw err;
    }
  }, [slug, technology]);

  return { technology, loading, error, followTechnology };
}

// =============================================================================
// TRACK HOOKS
// =============================================================================

export function useTracks(params?: TrackSearchParams) {
  const [tracks, setTracks] = useState<LearningTrack[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const data = await tracksApi.list(params);
        setTracks(data.results);
        setTotalCount(data.count || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tracks");
        setTracks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [
    params?.search,
    params?.technology,
    params?.track_type,
    params?.difficulty,
    params?.open_only,
    params?.verified_only,
    params?.ordering,
    params?.page,
  ]);

  return { tracks, totalCount, loading, error };
}

export function useTrack(slug: string) {
  const [track, setTrack] = useState<LearningTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchTrack = async () => {
      try {
        setLoading(true);
        const data = await tracksApi.get(slug);
        setTrack(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load track");
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
  }, [slug]);

  const followTrack = useCallback(async () => {
    if (!slug) return;
    try {
      const result = await tracksApi.follow(slug);
      if (track) {
        setTrack({
          ...track,
          is_following: result.status === "following",
          followers_count:
            track.followers_count + (result.status === "following" ? 1 : -1),
        });
      }
      return result;
    } catch (err) {
      throw err;
    }
  }, [slug, track]);

  const completeModule = useCallback(
    async (moduleId: string) => {
      if (!slug) return;
      try {
        const result = await tracksApi.completeModule(slug, moduleId);
        if (track) {
          setTrack({
            ...track,
            user_progress: {
              progress_percentage: result.progress_percentage,
              completed_modules: result.completed_modules,
              started_at:
                track.user_progress?.started_at || new Date().toISOString(),
              completed_at:
                result.progress_percentage >= 100
                  ? new Date().toISOString()
                  : null,
            },
          });
        }
        return result;
      } catch (err) {
        throw err;
      }
    },
    [slug, track],
  );

  return { track, loading, error, followTrack, completeModule };
}

export function useMyTracks() {
  const [tracks, setTracks] = useState<LearningTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const data = await tracksApi.myTracks();
        setTracks(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load your tracks",
        );
        setTracks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return { tracks, loading, error };
}

export function useFollowingTracks() {
  const [following, setFollowing] = useState<TrackFollower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        setLoading(true);
        const data = await tracksApi.following();
        setFollowing(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load following tracks",
        );
        setFollowing([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, []);

  return { following, loading, error };
}

export function useTrackStats(slug: string) {
  const [stats, setStats] = useState<TrackStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await tracksApi.getStats(slug);
        setStats(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load track stats",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [slug]);

  return { stats, loading, error };
}

// =============================================================================
// SERVICE PROVIDER HOOKS
// =============================================================================

export function useTrackProviders(trackSlug?: string) {
  const [providers, setProviders] = useState<TrackServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const data = await trackProvidersApi.list({ track: trackSlug });
        setProviders(data.results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load providers",
        );
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [trackSlug]);

  return { providers, loading, error };
}

// =============================================================================
// ENDORSEMENT HOOKS
// =============================================================================

export function useTrackEndorsements(trackSlug?: string) {
  const [endorsements, setEndorsements] = useState<TrackEndorsement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEndorsements = async () => {
      try {
        setLoading(true);
        const data = await trackEndorsementsApi.list({ track: trackSlug });
        // Handle both array and paginated response
        const results = Array.isArray(data) ? data : data?.results || [];
        setEndorsements(results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load endorsements",
        );
        setEndorsements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEndorsements();
  }, [trackSlug]);

  return { endorsements, loading, error };
}
