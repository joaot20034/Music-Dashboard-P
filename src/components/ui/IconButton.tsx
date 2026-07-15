import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface IconButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'ghost', size = 'md', children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-[hsl(var(--primary))] text-white hover:brightness-110 shadow-lg shadow-[hsl(var(--primary))]/20",
      secondary: "bg-[hsl(var(--surface-hover))] text-[hsl(var(--text-main))] hover:bg-[hsl(var(--border))]",
      ghost: "text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-main))] hover:bg-[hsl(var(--surface-hover))]",
    };

    const sizes = {
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-xl", 
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.9 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';