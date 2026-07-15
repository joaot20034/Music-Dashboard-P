import { memo } from 'react';

/**
 * Every illustration in this file shares one visual language:
 * a single ink outline weight, fills from the room's token palette,
 * flat shading (no gradients pretending to be 3D), and a small
 * imperfection or two so nothing looks machine-arranged.
 *
 * They're intentionally sized by viewBox only — the parent controls
 * final size via a wrapping element with a width class.
 */

export const CoffeeIllustration = memo(() => (
  <svg viewBox="0 0 120 110" className="w-full h-auto" aria-hidden="true">
    <path d="M 20 40 h 56 v 30 a 28 28 0 0 1 -56 0 z" fill="var(--parchment)" stroke="var(--ink)" strokeOpacity="0.15" strokeWidth="1.5" />
    <path d="M 76 48 q 22 0 22 16 t -22 16" fill="none" stroke="var(--parchment)" strokeWidth="8" strokeLinecap="round" />
    <path d="M 28 50 h 40 v 20 a 20 20 0 0 1 -40 0 z" fill="var(--walnut)" />
    {/* coffee stain ring, slightly off-center — nothing is perfectly placed */}
    <ellipse cx="60" cy="95" rx="17" ry="4" fill="none" stroke="var(--brass)" strokeOpacity="0.3" strokeWidth="2" />
    {/* steam, two independent gentle curls */}
    <path d="M 40 32 q -6 -14 2 -22 q 6 -8 0 -18" stroke="var(--ash)" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M 56 32 q 6 -12 0 -20 q -5 -8 2 -20" stroke="var(--ash)" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
));
CoffeeIllustration.displayName = 'CoffeeIllustration';

export const NotebookIllustration = memo(() => (
  <svg viewBox="0 0 220 150" className="w-full h-auto" aria-hidden="true">
    <g transform="rotate(-2 110 75)">
      <rect x="14" y="14" width="192" height="120" rx="5" fill="var(--parchment)" stroke="var(--ink)" strokeOpacity="0.15" strokeWidth="1.5" />
      <rect x="14" y="14" width="14" height="120" rx="3" fill="var(--walnut-lt)" />
      <g stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M 46 38 Q 64 33 82 39" strokeWidth="2.5" />
        <path d="M 46 56 Q 78 59 112 53 T 168 58" />
        <path d="M 46 72 Q 80 68 118 74" />
        {/* crossed-out line */}
        <path d="M 46 88 Q 76 91 110 86" />
        <path d="M 44 90 L 112 84" stroke="#8B3A3A" strokeOpacity="0.7" />
        <path d="M 46 104 Q 78 107 112 102 T 168 106" />
      </g>
      {/* faint coffee ring left behind on the page */}
      <circle cx="150" cy="92" r="18" fill="none" stroke="var(--brass)" strokeOpacity="0.25" strokeWidth="2.5" />
    </g>
    {/* mechanical pencil, resting diagonally across the spread */}
    <g transform="translate(120,108) rotate(24)">
      <rect x="0" y="0" width="76" height="6" rx="3" fill="var(--walnut-lt)" />
      <polygon points="76,0 76,6 87,3" fill="var(--ash)" />
      <rect x="-7" y="0" width="9" height="6" rx="2" fill="var(--ink)" />
    </g>
  </svg>
));
NotebookIllustration.displayName = 'NotebookIllustration';

export const PlantIllustration = memo(() => (
  <svg viewBox="0 0 100 140" className="w-full h-auto" aria-hidden="true">
    <path d="M 30 110 h 40 l -5 24 h -30 z" fill="var(--walnut-lt)" />
    <rect x="28" y="104" width="44" height="10" rx="2" fill="var(--walnut)" />
    <g fill="var(--forest-near)">
      <path d="M 50 108 C 40 80, 30 55, 44 20 C 50 55, 50 85, 50 108 Z" />
      <path d="M 50 108 C 60 82, 74 60, 66 26 C 58 58, 52 86, 50 108 Z" opacity="0.9" />
      <path d="M 50 108 C 34 92, 18 80, 20 56 C 34 72, 44 90, 50 108 Z" opacity="0.85" />
      <path d="M 50 108 C 66 94, 82 84, 82 60 C 68 76, 56 92, 50 108 Z" opacity="0.85" />
    </g>
  </svg>
));
PlantIllustration.displayName = 'PlantIllustration';

export const LampIllustration = memo(() => (
  <svg viewBox="0 0 160 320" className="w-full h-auto" aria-hidden="true">
    <ellipse cx="80" cy="305" rx="46" ry="11" fill="var(--walnut-lt)" />
    <path d="M 80 298 L 80 130 L 40 65" fill="none" stroke="var(--brass)" strokeWidth="6" strokeLinecap="round" />
    <circle cx="80" cy="130" r="7" fill="var(--ink)" />
    <path d="M 22 55 L 96 30 L 112 78 L 8 100 Z" fill="var(--ink)" />
    <polygon points="8,100 112,78 114,83 6,105" fill="var(--brass)" />
  </svg>
));
LampIllustration.displayName = 'LampIllustration';

export const CameraIllustration = memo(() => (
  <svg viewBox="0 0 160 110" className="w-full h-auto" aria-hidden="true">
    <rect x="10" y="26" width="140" height="70" rx="8" fill="var(--walnut)" stroke="var(--ink)" strokeOpacity="0.2" strokeWidth="1.5" />
    <rect x="26" y="10" width="34" height="20" rx="4" fill="var(--walnut)" />
    <circle cx="80" cy="62" r="30" fill="var(--ink)" />
    <circle cx="80" cy="62" r="21" fill="var(--walnut-lt)" />
    <circle cx="80" cy="62" r="12" fill="var(--ink)" />
    <circle cx="72" cy="54" r="3" fill="var(--brass-hi)" opacity="0.6" />
    <circle cx="128" cy="42" r="7" fill="var(--brass)" />
    <rect x="18" y="34" width="14" height="8" rx="2" fill="var(--brass)" />
  </svg>
));
CameraIllustration.displayName = 'CameraIllustration';

export const CassetteIllustration = memo(() => (
  <svg viewBox="0 0 220 140" className="w-full h-auto" aria-hidden="true">
    {/* case, left behind as the tape slides out of it */}
    <rect x="4" y="18" width="150" height="104" rx="8" fill="none" stroke="var(--ash)" strokeOpacity="0.35" strokeWidth="2" transform="rotate(-3 79 70)" />
    <g transform="translate(28,6) rotate(4 105 65)">
      <rect x="0" y="0" width="190" height="112" rx="10" fill="var(--ink)" stroke="var(--walnut-lt)" strokeWidth="1.5" />
      <rect x="18" y="18" width="154" height="52" rx="4" fill="var(--parchment)" />
      <rect x="18" y="18" width="154" height="14" fill="var(--brass)" />
      <circle cx="52" cy="44" r="15" fill="var(--ink)" />
      <circle cx="138" cy="44" r="15" fill="var(--ink)" />
      <circle cx="52" cy="44" r="5" fill="var(--parchment)" />
      <circle cx="138" cy="44" r="5" fill="var(--parchment)" />
      <path d="M 35 56 Q 55 51 80 57 T 130 55" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
      <polygon points="24,86 166,86 176,100 14,100" fill="var(--walnut)" />
    </g>
  </svg>
));
CassetteIllustration.displayName = 'CassetteIllustration';

export const BooksIllustration = memo(() => (
  <svg viewBox="0 0 200 120" className="w-full h-auto" aria-hidden="true">
    <g transform="rotate(-1 100 100)">
      <rect x="10" y="70" width="180" height="20" fill="var(--walnut)" />
    </g>
    <g transform="rotate(-4 40 60)">
      <rect x="14" y="20" width="26" height="70" rx="2" fill="var(--brass)" />
    </g>
    <g transform="rotate(2 70 60)">
      <rect x="48" y="14" width="24" height="76" rx="2" fill="var(--ash)" />
    </g>
    <g transform="rotate(-2 105 60)">
      <rect x="82" y="24" width="22" height="66" rx="2" fill="var(--parchment)" />
    </g>
    <g transform="rotate(6 150 55)">
      <rect x="118" y="30" width="28" height="60" rx="2" fill="var(--walnut-lt)" />
    </g>
    {/* one book leaning, not stacked */}
    <g transform="translate(160,90) rotate(-58)">
      <rect x="0" y="0" width="20" height="64" rx="2" fill="var(--brass-hi)" />
    </g>
  </svg>
));
BooksIllustration.displayName = 'BooksIllustration';

export const HeadphonesIllustration = memo(() => (
  <svg viewBox="0 0 260 220" className="w-full h-auto" aria-hidden="true">
    {/* cable, loose, not coiled — just resting where it fell */}
    <path d="M 40 150 C 20 190, 90 205, 120 185 C 150 165, 170 200, 200 195" fill="none" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
    <g transform="rotate(-8 130 110)">
      <path d="M 40 100 C 40 25, 220 25, 220 100" fill="none" stroke="var(--ink)" strokeWidth="16" strokeLinecap="round" />
      <path d="M 40 100 C 40 25, 220 25, 220 100" fill="none" stroke="var(--walnut-lt)" strokeWidth="10" strokeLinecap="round" />
      <rect x="32" y="92" width="16" height="26" rx="4" fill="var(--brass)" />
      <rect x="212" y="92" width="16" height="26" rx="4" fill="var(--brass)" />
      <ellipse cx="40" cy="140" rx="26" ry="38" fill="var(--ink)" />
      <ellipse cx="40" cy="140" rx="18" ry="30" fill="var(--parchment)" opacity="0.85" />
      <ellipse cx="220" cy="140" rx="26" ry="38" fill="var(--ink)" />
      <circle cx="220" cy="140" r="10" fill="var(--brass)" />
    </g>
  </svg>
));
HeadphonesIllustration.displayName = 'HeadphonesIllustration';

export const VinylSleeveIllustration = memo(() => (
  <svg viewBox="0 0 140 160" className="w-full h-auto" aria-hidden="true">
    {/* leaning against the console, not upright */}
    <g transform="rotate(-9 70 90)">
      <rect x="10" y="6" width="120" height="120" rx="3" fill="var(--walnut-lt)" stroke="var(--ink)" strokeOpacity="0.2" strokeWidth="1.5" />
      <circle cx="70" cy="66" r="42" fill="var(--parchment)" opacity="0.9" />
      <circle cx="70" cy="66" r="8" fill="var(--ink)" />
    </g>
    <g transform="translate(96,18) rotate(-2)">
      <circle cx="34" cy="34" r="34" fill="var(--ink)" />
      {Array.from({ length: 5 }).map((_, i) => (
        <circle key={i} cx="34" cy="34" r={28 - i * 5} fill="none" stroke="var(--ash)" strokeOpacity="0.25" strokeWidth="1" />
      ))}
      <circle cx="34" cy="34" r="4" fill="var(--brass)" />
    </g>
  </svg>
));
VinylSleeveIllustration.displayName = 'VinylSleeveIllustration';
