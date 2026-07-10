import { useState, useEffect } from "react";
import { GitHubProject } from "@/types";
import { GITHUB_USERNAME } from "@/lib/constants";

/**
 * Custom hook to fetch GitHub projects for a user
 * Handles loading, error, and data states
 */
export function useGitHubProjects() {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub projects");
        }

        const data: GitHubProject[] = await response.json();

        // Filter out archived repositories
        const activeProjects = data.filter((project) => !project.archived);

        setProjects(activeProjects);
      } catch (err) {
        console.error("Error fetching GitHub projects:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}
