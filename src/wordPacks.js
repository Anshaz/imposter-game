// src/wordPacks.js
// Word packs for the "Random word" option.
// You can add your own packs by appending to WORD_PACKS.

import words from './words.json'

const general = words?.en || []
const general_de = words?.de || []

export const WORD_PACKS = [
  {
    id: 'general',
    name: { en: "General", de: "Allgemein" },
    description: { en: "A little bit of everything.", de: "Ein bisschen von allem." },
    words: { en: general, de: general_de },
  },
  {
    id: 'food',
    name: { en: "Food & Drinks", de: "Essen & Getränke" },
    description: { en: "Tasty, casual, and easy to clue.", de: "Lecker, locker und leicht zu umschreiben." },
    words: { en: ["Pizza", "Burger", "Sushi", "Tacos", "Pasta", "Ice Cream", "Chocolate", "Coffee", "Tea", "Boba", "Avocado", "Pancakes", "Dumplings", "Ramen", "Curry", "BBQ", "Salad", "Steak", "Cheesecake", "Donut", "Fries", "Nachos", "Falafel", "Kebab", "Paella", "Croissant", "Waffles", "Smoothie", "Lemonade", "Wine"], de: ["Pizza", "Burger", "Sushi", "Tacos", "Pasta", "Eiscreme", "Schokolade", "Kaffee", "Tee", "Bubble Tea", "Avocado", "Pfannkuchen", "Teigtaschen", "Ramen", "Curry", "Grill", "Salat", "Steak", "Käsekuchen", "Donut", "Pommes", "Nachos", "Falafel", "Kebab", "Paella", "Croissant", "Waffeln", "Smoothie", "Limonade", "Wein"] },
  },
  {
    id: 'places',
    name: { en: "Places", de: "Orte" },
    description: { en: "Cities, landmarks, and famous locations.", de: "Städte, Sehenswürdigkeiten und bekannte Orte." },
    words: { en: ["Berlin", "Paris", "London", "New York", "Tokyo", "Seoul", "Rome", "Barcelona", "Istanbul", "Dubai", "Rio de Janeiro", "Sydney", "Cape Town", "Reykjavík", "Bangkok", "Singapore", "San Francisco", "Prague", "Athens", "Cairo", "Mount Everest", "Sahara Desert", "Amazon Rainforest", "Grand Canyon", "Niagara Falls", "Great Wall", "Eiffel Tower", "Colosseum", "Pyramids", "Swiss Alps"], de: ["Berlin", "Paris", "London", "New York", "Tokyo", "Seoul", "Rome", "Barcelona", "Istanbul", "Dubai", "Rio de Janeiro", "Sydney", "Cape Town", "Reykjavík", "Bangkok", "Singapore", "San Francisco", "Prague", "Athens", "Cairo", "Mount Everest", "Sahara Desert", "Amazon Rainforest", "Grand Canyon", "Niagara Falls", "Great Wall", "Eiffel Tower", "Colosseum", "Pyramids", "Swiss Alps"] },
  },
  {
    id: 'movies',
    name: { en: "Pop Culture", de: "Popkultur" },
    description: { en: "Movies, shows, and iconic references.", de: "Filme, Serien und ikonische Referenzen." },
    words: { en: ["Star Wars", "Harry Potter", "The Office", "Stranger Things", "Breaking Bad", "Game of Thrones", "The Simpsons", "Friends", "Marvel", "Batman", "Spiderman", "The Matrix", "Titanic", "Inception", "Toy Story", "Frozen", "The Lion King", "Shrek", "Naruto", "One Piece", "Avengers", "Lord of the Rings", "Pirates", "Jurassic Park", "The Witcher", "The Mandalorian", "Wednesday", "Squid Game", "Black Mirror", "Sherlock"], de: ["Star Wars", "Harry Potter", "The Office", "Stranger Things", "Breaking Bad", "Game of Thrones", "The Simpsons", "Friends", "Marvel", "Batman", "Spiderman", "The Matrix", "Titanic", "Inception", "Toy Story", "Frozen", "The Lion King", "Shrek", "Naruto", "One Piece", "Avengers", "Lord of the Rings", "Pirates", "Jurassic Park", "The Witcher", "The Mandalorian", "Wednesday", "Squid Game", "Black Mirror", "Sherlock"] },
  },
  {
    id: 'animals',
    name: { en: "Animals", de: "Tiere" },
    description: { en: "Cute, wild, and everything in between.", de: "Süß, wild und alles dazwischen." },
    words: { en: ["Cat", "Dog", "Dolphin", "Shark", "Octopus", "Penguin", "Elephant", "Lion", "Tiger", "Giraffe", "Panda", "Koala", "Kangaroo", "Wolf", "Bear", "Fox", "Owl", "Eagle", "Snake", "Crocodile", "Whale", "Horse", "Rabbit", "Frog", "Butterfly", "Bee", "Spider", "Turtle", "Camel", "Monkey"], de: ["Katze", "Hund", "Delfin", "Hai", "Oktopus", "Pinguin", "Elefant", "Löwe", "Tiger", "Giraffe", "Panda", "Koala", "Kangaroo", "Wolf", "Bär", "Fox", "Eule", "Eagle", "Schlange", "Crocodile", "Wal", "Pferd", "Kaninchen", "Frosch", "Schmetterling", "Biene", "Spider", "Schildkröte", "Camel", "Monkey"] },
  },
  {
    id: 'party',
    name: { en: "Party", de: "Party" },
    description: { en: "Party vibes and social prompts.", de: "Party-Stimmung und soziale Begriffe." },
    words: { en: ["Karaoke", "Dance floor", "Truth or Dare", "Charades", "Board game", "House party", "Festival", "Birthday cake", "Confetti", "Fireworks", "DJ", "Playlist", "Photo booth", "Costume", "Glow sticks", "Cards", "Chips", "Punch bowl", "Balloon", "Piñata", "Midnight", "Cheers", "Toast", "Handshake", "Secret", "Whisper", "Challenge", "Dare", "Laugh", "Vibe"], de: ["Karaoke", "Tanzfläche", "Wahrheit oder Pflicht", "Scharade", "Brettspiel", "Hausparty", "Festival", "Geburtstagskuchen", "Konfetti", "Feuerwerk", "DJ", "Playlist", "Fotobox", "Kostüm", "Leuchtstäbe", "Karten", "Chips", "Bowle", "Luftballon", "Piñata", "Mitternacht", "Prost", "Toast", "Handschlag", "Geheimnis", "Flüstern", "Herausforderung", "Mutprobe", "Lachen", "Stimmung"] },
  },
]

function detectLang() {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = window.localStorage?.getItem('i18nextLng')
    const lang = (saved || window.navigator?.language || 'en').toLowerCase()
    return lang.startsWith('de') ? 'de' : 'en'
  } catch {
    return 'en'
  }
}

export function getAllPackWords(lang) {
  const useLang = lang || detectLang()
  const map = new Map()
  for (const pack of WORD_PACKS) {
    const list = (pack.words?.[useLang] || pack.words?.en || [])
    for (const w of list) {
      const k = String(w).trim().toLowerCase()
      if (!k) continue
      if (!map.has(k)) map.set(k, String(w).trim())
    }
  }
  return Array.from(map.values())
}

export function getPackById(id) {
  return WORD_PACKS.find((p) => p.id === id) || WORD_PACKS[0]
}

export function getPackLabel(pack, lang) {
  const useLang = lang || detectLang()
  return pack.name?.[useLang] || pack.name?.en || ''
}

export function getPackDescription(pack, lang) {
  const useLang = lang || detectLang()
  return pack.description?.[useLang] || pack.description?.en || ''
}

export function getWordsForPack(id, lang) {
  const useLang = lang || detectLang()
  if (id === 'all') return getAllPackWords(useLang)
  const p = getPackById(id)
  return (p.words?.[useLang] || p.words?.en || [])
}

export function getPackOptions(lang, t) {
  const useLang = lang || detectLang()
  const allLabel = t ? t('packs.allName') : 'All packs'
  const allSublabel = t ? t('packs.allSublabel') : 'Max variety'

  return [
    { value: 'all', label: allLabel, sublabel: allSublabel },
    ...WORD_PACKS.map((p) => ({
      value: p.id,
      label: getPackLabel(p, useLang),
      sublabel: getPackDescription(p, useLang),
    })),
  ]
}
