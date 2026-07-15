import { createContext, useContext, useState} from 'react';
import type { ReactNode } from 'react';
import type { Season } from '../components/environment/types';

interface ThemeContextType {
  season: Season;
  setSeason: (season: Season) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // We default to summer!
  const [season, setSeason] = useState<Season>('summer');

  return (
    <ThemeContext.Provider value={{ season, setSeason }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}