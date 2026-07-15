import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  max?: number;
}

export function Slider({ value, onChange, max = 100, className, ...props }: SliderProps) {
  const percentage = (value / max) * 100;

  return (
    <input
      type="range"
      value={value}
      onChange={onChange}
      max={max}
      className={cn(
        "h-1 w-full cursor-pointer appearance-none rounded-full outline-none transition-all duration-300",
        // The elegant thumb
        "[&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--text-main)] [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:ease-out",
        // Hover & Active States
        "hover:[&::-webkit-slider-thumb]:scale-125",
        "active:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(200,168,107,0.7)]",
        className
      )}
      style={{
        background: `linear-gradient(to right, var(--accent-gold) ${percentage}%, var(--surface-oak) ${percentage}%)`,
      }}
      {...props}
    />
  );
}