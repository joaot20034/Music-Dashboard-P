import { AmbientLight } from './AmbientLight';
import { LightRays } from './LightRays';
import { DustParticles } from './DustParticles';
import { Smoke } from './Smoke';
import { FilmGrain } from './FilmGrain';
import { SeasonalOverlay } from './SeasonalOverlay';
import { Vignette } from './Vignette';
import { type Season} from './types';

interface EnvironmentProps {
  season?: Season; // Defaults to summer for the warm studio feel
}

export function Environment({ season = 'summer' }: EnvironmentProps) {
  return (
    // Fixed positioning ensures it covers the viewport perfectly.
    // z-0 pushes it behind the UI.
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* 1. Base Lighting */}
      <AmbientLight season={season} />
      <LightRays season={season} />

      {/* 2. Atmospheric Particles */}
      <DustParticles />
      <Smoke />
      <SeasonalOverlay season={season} />

      {/* 3. Post-Processing & Grading (Highest z-index within the environment) */}
      <Vignette />
      <FilmGrain />
      
    </div>
  );
}