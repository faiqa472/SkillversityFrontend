"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Redirect from old /learning-paths to new /tracks route
 * The Learning Tracks feature replaces the old Learning Paths
 */
export default function LearningPathsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/tracks");
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-muted-foreground">Redirecting to Learning Tracks...</p>
    </div>
  );
}
