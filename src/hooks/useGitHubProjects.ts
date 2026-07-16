import { useState, useEffect } from "react";
import { GitHubProject } from "@/types";
import { GITHUB_USERNAME } from "@/lib/constants";
import { FEATURED_PROJECT_FALLBACKS } from "@/lib/featuredProjects";

/**
 * Custom hook to fetch FEATURED GitHub projects for a user
 * Priority:
 * 1. GitHub PINNED repositories (using GraphQL API)
 * 2. Fallback: Repos from FEATURED_PROJECT_FALLBACKS list
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

        // --------------------------
        // STEP 1: Try to fetch PINNED repos using GitHub GraphQL API
        // --------------------------
        const pinnedRepos = await fetchPinnedRepos();

        if (pinnedRepos.length > 0) {
          setProjects(pinnedRepos);
          return;
        }

        // --------------------------
        // STEP 2: If no pinned repos, fetch all repos and filter using fallback list
        // --------------------------
        const allRepos = await fetchAllRepos();
        const fallbackProjects = allRepos.filter((repo) =>
          FEATURED_PROJECT_FALLBACKS.includes(repo.name)
        );

        setProjects(fallbackProjects);
      } catch (err) {
        console.error("Error fetching GitHub projects:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  /**
   * Fetch pinned repositories using GitHub GraphQL API
   * Note: GitHub REST API doesn't have a direct pinned repos endpoint
   */
  async function fetchPinnedRepos(): Promise<GitHubProject[]> {
    try {
      const graphqlQuery = `
        query {
          user(login: "${GITHUB_USERNAME}") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  id
                  name
                  description
                  html_url
                  homepage
                  language
                  stargazers_count: stargazerCount
                  forks_count: forkCount
                  updated_at: updatedAt
                  topics: repositoryTopics(first: 10) {
                    nodes {
                      topic {
                        name
                      }
                    }
                  }
                  archived
                }
              }
            }
          }
        }
      `;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: graphqlQuery }),
      });

      if (!response.ok) {
        throw new Error("GraphQL API request failed");
      }

      const result = await response.json();

      if (result.errors) {
        console.error("GraphQL Errors:", result.errors);
        return [];
      }

      // Transform GraphQL data to match our GitHubProject type
      return (result.data?.user?.pinnedItems?.nodes || [])
        .filter((repo: any) => !repo.archived) // Filter out archived repos
        .map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          updated_at: repo.updated_at,
          topics: repo.topics?.nodes?.map((t: any) => t.topic.name) || [],
          archived: repo.archived,
        }));
    } catch (err) {
      console.error("Failed to fetch pinned repos:", err);
      return []; // Fallback to next method
    }
  }

  /**
   * Fetch all public repositories using GitHub REST API
   * Used as a fallback for when pinned repos can't be fetched
   */
  async function fetchAllRepos(): Promise<GitHubProject[]> {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories");
    }

    return await response.json();
  }

  return { projects, loading, error };
}
