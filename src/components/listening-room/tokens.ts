// A small, deliberate palette. Every value below is named for the
// material it represents in the room — nothing here is decorative.
export const ROOM_TOKENS = `
  :root{
    --ink:#0B0704;        /* void behind the glass, deepest shadow */
    --walnut:#2E1D10;     /* wall & desk timber */
    --walnut-lt:#4A2F18;  /* lit edge of the timber */
    --brass:#B8935C;      /* hardware: hinges, tonearm, rims */
    --brass-hi:#E4C68A;   /* brass catching direct light */
    --parchment:#EDE3CE;  /* paper, labels, ceramic */
    --ash:#8A7A68;        /* muted mid-tone, secondary ink */
    --ember:#E2883A;      /* the one warm accent — lamp + sunlight only */
    --forest-far:#1B2A1D; /* tree line, deep */
    --forest-near:#2E4430;/* tree line, closer */
    --fog:#EDE6D6;
  }
`;

export const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Space+Grotesk:wght@400;500&display=swap');";

export const DISPLAY_FONT = "'Fraunces', serif";
export const UTILITY_FONT = "'Space Grotesk', sans-serif";

// Parallax travel distance per layer, in px, at full pointer excursion —
// per the brief this stays almost imperceptible.
export const DEPTH = {
  window: 2,
  bookshelf: 3,
  plant: 4,
  desk: 2,
  foreground: 5,
  player: 0,
} as const;
