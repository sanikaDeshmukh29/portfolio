import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable section component with consistent styling
 */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 px-6 md:px-12 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </section>
  );
}
