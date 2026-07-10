import { Experience, SkillCategory, Certification } from "@/types";

// Experience data
export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    company: "Arridae Infosec",
    role: "Full Stack Developer",
    duration: "March 2026 – Present",
    technologies: ["Java", "Spring Boot", "Angular", "REST APIs", "Git", "Azure Boards"],
    responsibilities: [
      "Enterprise Application Development",
      "Frontend and Backend Integration",
      "Feature Development",
      "Bug Fixing",
      "Agile Scrum Methodology",
    ],
  },
  {
    id: "2",
    company: "Arridae Infosec",
    role: "Application Development Intern",
    duration: "4 Months",
    technologies: ["Java", "Spring Boot", "Angular", "REST APIs", "SQL", "Git"],
    responsibilities: [
      "Learning and implementing full stack technologies",
      "Contributing to project development",
      "Working in agile team environment",
    ],
  },
];

// Skills data
export const SKILLS: SkillCategory[] = [
  {
    id: "languages",
    name: "Languages",
    skills: ["Java", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"],
  },
  {
    id: "frontend",
    name: "Frontend",
    skills: ["Angular", "React", "Bootstrap", "Responsive Design"],
  },
  {
    id: "backend",
    name: "Backend",
    skills: ["Spring Boot", "REST APIs", "Spring Security", "JPA", "Hibernate", "JWT"],
  },
  {
    id: "database",
    name: "Database",
    skills: ["MySQL"],
  },
  {
    id: "tools",
    name: "Tools",
    skills: ["Git", "GitHub", "Postman", "VS Code", "IntelliJ IDEA", "Maven", "Azure Boards"],
  },
  {
    id: "devops",
    name: "DevOps & Cloud (Learning)",
    skills: ["Docker", "Kubernetes", "AWS"],
  },
  {
    id: "ai",
    name: "AI & Productivity",
    skills: ["Prompt Engineering", "AI Engineering", "ChatGPT", "Claude", "Gemini", "Cursor", "GitHub Copilot"],
  },
  {
    id: "methodologies",
    name: "Methodologies",
    skills: ["Agile Scrum", "REST API Integration", "Enterprise Development", "Version Control"],
  },
];

// Certifications data
export const CERTIFICATIONS: Certification[] = [
  {
    id: "1",
    title: "Full Stack Java Development",
    organization: "SPRK Technologies",
    issueDate: "",
  },
  {
    id: "2",
    title: "Application Development Internship",
    organization: "Arridae Infosec",
    issueDate: "",
  },
];
