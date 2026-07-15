import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode; 
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-4 text-[hsl(var(--text-muted))]">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "h-12 w-full rounded-full bg-[hsl(var(--surface))] px-4 text-sm text-[hsl(var(--text-main))] outline-none placeholder:text-[hsl(var(--text-muted))] transition-all border border-transparent",
            "focus:bg-[hsl(var(--surface-hover))] focus:border-[hsl(var(--border))]",
            icon && "pl-12", 
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';