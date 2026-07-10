import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Github, Linkedin, ExternalLink, Mail, Download } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { PERSONAL_INFO, SOCIAL_LINKS, RESUME_URL } from "@/lib/constants";
import gsap from "gsap";

/**
 * Hero section with animated elements and magnetic buttons
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP animations for hero elements
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current.querySelectorAll(".hero-text"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      0.2
    );

    tl.fromTo(
      containerRef.current.querySelectorAll(".blob"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.6, duration: 1.2, stagger: 0.2, ease: "elastic.out(1, 0.5)" },
      0.4
    );

    // Subtle floating animation for blobs
    gsap.to(".blob-1", { y: -20, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".blob-2", { y: 20, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
    gsap.to(".blob-3", { x: -20, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-20 pb-12 relative overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl blob blob-1" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl blob blob-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl blob blob-3" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <div className="hero-text">
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Hello, I'm
            </p>
          </div>

          <div className="hero-text">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white">
              {PERSONAL_INFO.name}
            </h1>
          </div>

          <div className="hero-text">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-600 dark:text-slate-300">
              {PERSONAL_INFO.role}
            </h2>
          </div>

          <div className="hero-text">
            <p className="text-lg text-slate-500 dark:text-slate-400">
              {PERSONAL_INFO.tagline}
            </p>
          </div>

          <div className="hero-text">
            <p className="text-slate-600 dark:text-slate-300 max-w-xl">
              {PERSONAL_INFO.description}
            </p>
          </div>

          <div className="hero-text flex flex-wrap gap-4">
            <MagneticButton onClick={() => window.open(RESUME_URL, "_blank")} className="flex items-center gap-2">
              <Download size={18} />
              Download Resume
            </MagneticButton>
            <a
              href="#projects"
              className="px-8 py-3 rounded-xl font-semibold border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all flex items-center gap-2"
            >
              View Projects
              <ExternalLink size={18} />
            </a>
          </div>

          <div className="hero-text flex gap-4">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#contact"
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all"
              aria-label="Contact"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Visual Element */}
        <div className="relative hidden md:block">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "elastic.out(1, 0.5)", delay: 0.5 }}
            className="relative"
          >
            <div className="w-full aspect-square bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl p-1">
              <div className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-3xl flex items-center justify-center">
                <div className="text-9xl">👩‍💻</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
