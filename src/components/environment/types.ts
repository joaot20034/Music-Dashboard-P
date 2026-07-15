export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonalTheme {
  ambientPrimary: string;
  ambientSecondary: string;
  rayColor: string;
  rayOpacity: number;
}

export const seasonThemes: Record<Season, SeasonalTheme> = {
  spring: {
    ambientPrimary: '#4ade80', // Fresh green
    ambientSecondary: '#fef08a', // Soft yellow
    rayColor: '#fef08a',
    rayOpacity: 0.08,
  },
  summer: {
    ambientPrimary: '#fbbf24', // Warm amber
    ambientSecondary: '#f59e0b', // Golden oak
    rayColor: '#fef08a',
    rayOpacity: 0.12,
  },
  autumn: {
    ambientPrimary: '#d97706', // Copper/Orange
    ambientSecondary: '#78350f', // Walnut brown
    rayColor: '#fed7aa',
    rayOpacity: 0.06,
  },
  winter: {
    ambientPrimary: '#94a3b8', // Cool gray
    ambientSecondary: '#0f172a', // Dark walnut
    rayColor: '#e0f2fe',
    rayOpacity: 0.04,
  },
};