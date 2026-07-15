import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-[hsl(var(--primary))] text-white hover:brightness-110",
      secondary: "bg-[hsl(var(--surface-hover))] text-[hsl(var(--text-main))] hover:bg-[hsl(var(--border))]",
      outline: "border border-[hsl(var(--border))] text-[hsl(var(--text-main))] hover:bg-[hsl(var(--surface-hover))]",
      ghost: "text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-main))] hover:bg-[hsl(var(--surface-hover))]",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';