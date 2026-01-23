// src/lib/difficulty.js

export const DIFFICULTY = {
  EASY: 'easy',
  NORMAL: 'normal',
  HARD: 'hard',
}

export const DIFFICULTY_OPTIONS = [
  { value: DIFFICULTY.EASY, label: 'Easy' },
  { value: DIFFICULTY.NORMAL, label: 'Normal' },
  { value: DIFFICULTY.HARD, label: 'Hard' },
]

export function difficultyHint(mode) {
  switch (mode) {
    case DIFFICULTY.EASY:
      return 'Fewer imposters. Great for new players.'
    case DIFFICULTY.HARD:
      return 'More imposters. Bluffing gets spicy.'
    case DIFFICULTY.NORMAL:
    default:
      return 'Balanced default for most groups.'
  }
}

/**
 * Recommended imposters by difficulty.
 * Tuned for 5–10 players, but works up to 20.
 */
export function recommendedImposters(players, mode) {
  const p = Math.max(2, Math.min(20, Math.trunc(players)))

  let n = 1
  if (mode === DIFFICULTY.EASY) {
    if (p >= 9 && p <= 14) n = 2
    if (p >= 15) n = 3
  } else if (mode === DIFFICULTY.HARD) {
    if (p <= 4) n = 1
    else if (p <= 7) n = 2
    else if (p <= 10) n = 3
    else if (p <= 13) n = 4
    else if (p <= 16) n = 5
    else n = 6
  } else {
    // Normal
    if (p <= 6) n = 1
    else if (p <= 11) n = 2
    else if (p <= 16) n = 3
    else n = 4
  }

  // Always valid
  return Math.max(1, Math.min(n, p - 1))
}
