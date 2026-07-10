import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

/**
 * About section with personal background
 */
export function About() {
  return (
    <Section id="about" className="bg-slate-50 dark:bg-slate-900/50">
      <div className="text-center mb-12">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
        </Reveal>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <Reveal delay={0.1}>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            I completed Full Stack Java Development training from SPRK Technologies, followed by a 4-month Application Development Internship at Arridae Infosec.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            In March 2026, I joined Arridae Infosec as a Junior Developer and currently work as a Full Stack Developer building enterprise web applications.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            I enjoy solving real-world problems, learning modern technologies, and continuously improving my software engineering skills.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
