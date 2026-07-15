import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: number;
  max?: number;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, max = 100, ...props }, ref) => {
    // Calculate the percentage to fill the background linearly
    const percentage = (value / max) * 100;

    return (
      <input
        type="range"
        ref={ref}
        value={value}
        max={max}
        className={cn(
          "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[hsl(var(--surface-hover))] transition-all",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
          // Custom webkit thumb styling
          "[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:transition-opacity hover:[&::-webkit-slider-thumb]:opacity-100",
          className
        )}
        style={{
          background: `linear-gradient(to right, hsl(var(--text-main)) ${percentage}%, hsl(var(--surface-hover)) ${percentage}%)`,
        }}
        {...props}
      />
    );
  }
);

Slider.displayName = 'Slider';