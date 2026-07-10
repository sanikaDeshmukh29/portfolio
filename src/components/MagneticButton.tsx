import { motion, useMotionValue, useSpring, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "style"> {
  children: React.ReactNode;
}

/**
 * Magnetic button component with hover effects using Framer Motion
 */
export function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 50 });
  const springY = useSpring(y, { stiffness: 500, damping: 50 });

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    x.set(deltaX / 5);
    y.set(deltaY / 5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn(
        "relative px-8 py-3 rounded-xl font-semibold transition-all duration-300",
        "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
