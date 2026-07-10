import { useState, useMemo } from "react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Skeleton } from "@/components/Skeleton";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { Github, ExternalLink, Star, GitFork, Calendar } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Projects section with dynamically fetched GitHub projects
 */
export function Projects() {
  const { projects, loading, error } = useGitHubProjects();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique languages from projects
  const languages = useMemo(() => {
    const langs = Array.from(new Set(projects.map((p) => p.language).filter(Boolean))) as string[];
    return ["All", ...langs];
  }, [projects]);

  // Filter projects based on language and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesLanguage =
        selectedLanguage === "All" || project.language === selectedLanguage;
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description &&
          project.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesLanguage && matchesSearch;
    });
  }, [projects, selectedLanguage, searchQuery]);

  if (error) {
    return (
      <Section id="projects" className="bg-slate-50 dark:bg-slate-900/50">
        <div className="text-center py-20">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </Section>
    );
  }

  return (
    <Section id="projects" className="bg-slate-50 dark:bg-slate-900/50">
      <div className="text-center mb-12">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            GitHub Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full mb-8" />
        </Reveal>

        {/* Search and Filter */}
        <div className="max-w-2xl mx-auto space-y-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-wrap justify-center gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedLanguage === lang
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Skeleton loaders
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-6" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))
        ) : filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              No projects found matching your criteria.
            </p>
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05}>
              <motion.a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, scale: 1.02 }}
                className="block bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {project.name}
                  </h3>
                  <Github size={20} className="text-slate-400" />
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                  {project.description || "No description available"}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.language && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                      {project.language}
                    </span>
                  )}
                  {project.topics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Star size={16} />
                    <span>{project.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={16} />
                    <span>{project.forks_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>
                      {new Date(project.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {project.homepage && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </motion.a>
            </Reveal>
          ))
        )}
      </div>
    </Section>
  );
}
