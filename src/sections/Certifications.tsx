import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { CERTIFICATIONS } from "@/lib/data";
import { Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Certifications section
 */
export function Certifications() {
  return (
    <Section id="certifications">
      <div className="text-center mb-12">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {CERTIFICATIONS.map((cert, index) => (
          <Reveal key={cert.id} delay={index * 0.1}>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {cert.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-2">
                {cert.organization}
              </p>
              {cert.issueDate && (
                <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">
                  {cert.issueDate}
                </p>
              )}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-medium flex items-center justify-center gap-1 hover:underline"
                >
                  View Credential <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
