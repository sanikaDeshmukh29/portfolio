import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Github, Linkedin, ExternalLink, Mail, Download } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { PERSONAL_INFO, SOCIAL_LINKS, RESUME_URL } from "@/lib/constants";
import { db } from "@/lib/firebase";
import { doc, getDoc, increment, setDoc } from "firebase/firestore";
import gsap from "gsap";

/**
 * Hero section with animated elements and magnetic buttons
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [displayCount, setDisplayCount] = useState(0);
  const [countLoading, setCountLoading] = useState(true);

  // Global Visitor Counter using Firebase Firestore
  useEffect(() => {
    const fetchAndUpdateCount = async () => {
      try {
        const counterDocRef = doc(db, "portfolio", "visitorCounter");
        const counterDoc = await getDoc(counterDocRef);

        let currentCount = 40;

        if (counterDoc.exists()) {
          currentCount = counterDoc.data().count || 40;
        } else {
          // Initialize document if it doesn't exist
          await setDoc(counterDocRef, { count: 40 });
        }

        // Increment only once per session
        const hasVisited = sessionStorage.getItem("hasVisited");
        if (!hasVisited) {
          await setDoc(
            counterDocRef,
            { count: increment(1) },
            { merge: true }
          );
          sessionStorage.setItem("hasVisited", "true");
          currentCount += 1;
        }

        // Animate the count
        let currentAnim = 0;
        const incrementVal = Math.ceil(currentCount / 50);
        const timer = setInterval(() => {
          currentAnim += incrementVal;
          if (currentAnim >= currentCount) {
            setDisplayCount(currentCount);
            clearInterval(timer);
          } else {
            setDisplayCount(currentAnim);
          }
        }, 20);

        setCountLoading(false);
        return () => clearInterval(timer);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
        setCountLoading(false);
      }
    };

    fetchAndUpdateCount();
  }, []);

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

    // Orbit animations for hero visual
    gsap.to(".orbit-1", { rotation: 360, duration: 20, repeat: -1, ease: "none", transformOrigin: "center" });
    gsap.to(".orbit-2", { rotation: -360, duration: 25, repeat: -1, ease: "none", transformOrigin: "center", delay: 0.5 });
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

          {/* Visitor Counter */}
          <div className="hero-text">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 text-sm">
              <span>👁️ Visitor Count:</span>
              {countLoading ? (
                <span className="font-bold text-blue-600 dark:text-blue-400 animate-pulse">...</span>
              ) : (
                <span className="font-bold text-blue-600 dark:text-blue-400">{displayCount}</span>
              )}
            </div>
          </div>
        </div>

        {/* Visual Element */}
        <div className="relative hidden md:block">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
            className="relative aspect-square"
          >
            {/* Outer Orbit 1 */}
            <div className="absolute inset-0 orbit-1">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full shadow-lg shadow-blue-500/30" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full shadow-lg shadow-purple-500/30" />
            </div>

            {/* Outer Orbit 2 */}
            <div className="absolute inset-8 orbit-2">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full shadow-lg shadow-green-500/30" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-yellow-500 to-orange-400 rounded-full shadow-lg shadow-yellow-500/30" />
            </div>

            {/* Main Card */}
            <motion.div
              animate={{
                rotateY: [0, 5, -5, 0],
                rotateX: [0, -5, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-12 z-10"
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl p-1 shadow-2xl shadow-blue-500/20">
                <div className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-9xl mb-4">👩‍💻</div>
                    <div className="flex justify-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="w-3 h-3 rounded-full bg-yellow-400" />
                      <span className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
