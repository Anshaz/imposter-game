// src/lib/game.js

// Fisher–Yates shuffle (non-mutating)
export function shuffle(list) {
  const a = list.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function clampInt(n, min, max) {
  const x = Number.isFinite(n) ? Math.trunc(n) : min
  return Math.max(min, Math.min(max, x))
}

export function validateSetup({ players, imposters, names }) {
  if (players < 2) return 'Players must be at least 2.'
  if (imposters < 1) return 'Imposters must be at least 1.'
  if (imposters >= players) return 'Imposters must be less than players.'

  const used = names.slice(0, players).map((n) => n.trim())
  if (used.some((n) => !n)) return 'Please enter all player names.'

  // Optional: warn for duplicate names (still allow)
  const lower = used.map((n) => n.toLowerCase())
  const hasDup = new Set(lower).size !== lower.length
  if (hasDup) return 'Some player names are duplicates. Please make them unique.'

  return null
}

export function pickWord({ customWord, words }) {
  const w = (customWord || '').trim()
  if (w) return w
  return words[Math.floor(Math.random() * words.length)]
}

export function buildDeck({ players, imposters, names, word }) {
  // Create roles (word for citizens, 'Imposter' for imposters)
  const roles = []
  for (let i = 0; i < players - imposters; i++) roles.push({ role: word, isImposter: false })
  for (let i = 0; i < imposters; i++) roles.push({ role: 'Imposter', isImposter: true })

  const shuffledRoles = shuffle(roles)
  const assignments = names.slice(0, players).map((name, i) => ({
    name: name.trim(),
    ...shuffledRoles[i],
  }))

  const revealOrder = shuffle([...Array(players).keys()])

  return {
    word,
    assignments,
    revealOrder,
    cursor: 0,
  }
}

export function getResults(deck) {
  if (!deck) return null
  const imposters = deck.assignments.filter((p) => p.isImposter).map((p) => p.name)
  return {
    word: deck.word,
    imposters,
    players: deck.assignments.map((p) => p.name),
  }
}
