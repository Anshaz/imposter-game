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
  if (imposters > players) return 'Imposters must not exceed players.'

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

export function buildDeck({ players, imposters, names, word, tokenMode = false }) {
  // Create roles (word for citizens, 'Imposter' for imposters)
  const roles = []
  for (let i = 0; i < players - imposters; i++) roles.push({ role: word, isImposter: false })
  for (let i = 0; i < imposters; i++) roles.push({ role: 'Imposter', isImposter: true })

  const shuffledRoles = shuffle(roles)
  const assignments = names.slice(0, players).map((name, i) => ({
    name: name.trim(),
    tokenRole: null, // 'detective' | 'fox' | 'quietMouse' | null
    ...shuffledRoles[i],
  }))

  // Optional Token Mode: assign special roles to random players.
  // - Detective + Quiet Mouse should reveal themselves during card reveal.
  // - Fox should keep it secret.
  if (tokenMode) {
    const n = players

    // indices by role type
    const allIdx = [...Array(n).keys()]
    const nonImposterIdx = allIdx.filter((i) => !assignments[i].isImposter)

    // Detective + Quiet Mouse can be anyone
    const poolAny = shuffle(allIdx)
    const detectiveIdx = poolAny[0] ?? null
    const quietMouseIdx = poolAny[1] ?? null

    // Fox must NOT be an imposter
    // Prefer someone not already used by other tokens.
    const used = new Set([detectiveIdx, quietMouseIdx].filter((x) => x != null))
    const foxPool = shuffle(nonImposterIdx.filter((i) => !used.has(i)))

    // Fallback: if players are all imposters (possible in Surprise mode),
    // there is no valid non-imposter for Fox — so we simply don't assign a Fox.
    const foxIdx = foxPool[0] ?? null

    if (detectiveIdx != null) assignments[detectiveIdx].tokenRole = 'detective'
    if (foxIdx != null) assignments[foxIdx].tokenRole = 'fox'
    if (quietMouseIdx != null) assignments[quietMouseIdx].tokenRole = 'quietMouse'
  }


  const revealOrder = shuffle([...Array(players).keys()])

  return {
    word,
    assignments,
    revealOrder,
    cursor: 0,
    tokenMode,
  }
}

export function getResults(deck) {
  if (!deck) return null

  const tokenName = (id) => {
    if (id === 'detective') return 'Detective'
    if (id === 'fox') return 'Fox'
    if (id === 'quietMouse') return 'Quiet Mouse'
    return null
  }

  const rows = deck.assignments.map((p) => ({
    name: p.name,
    isImposter: !!p.isImposter,
    tokenId: p.tokenRole || null,
    tokenLabel: tokenName(p.tokenRole),
  }))

  return {
    word: deck.word,
    tokenMode: !!deck.tokenMode,
    rows,
  }
}

