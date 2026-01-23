// src/wordPacks.js
// Word packs for the "Random word" option.
// You can add your own packs by appending to WORD_PACKS.

import general from './words.json'

export const WORD_PACKS = [
  {
    id: 'general',
    name: 'General',
    description: 'A little bit of everything.',
    words: general,
  },
  {
    id: 'food',
    name: 'Food & Drinks',
    description: 'Tasty, casual, and easy to clue.',
    words: ["Pizza", "Burger", "Sushi", "Tacos", "Pasta", "Ice Cream", "Chocolate", "Coffee", "Tea", "Boba", "Avocado", "Pancakes", "Dumplings", "Ramen", "Curry", "BBQ", "Salad", "Steak", "Cheesecake", "Donut", "Fries", "Nachos", "Falafel", "Kebab", "Paella", "Croissant", "Waffles", "Smoothie", "Lemonade", "Wine"],
  },
  {
    id: 'places',
    name: 'Places',
    description: 'Cities, landmarks, and famous locations.',
    words: ["Berlin", "Paris", "London", "New York", "Tokyo", "Seoul", "Rome", "Barcelona", "Istanbul", "Dubai", "Rio de Janeiro", "Sydney", "Cape Town", "Reykjavík", "Bangkok", "Singapore", "San Francisco", "Prague", "Athens", "Cairo", "Mount Everest", "Sahara Desert", "Amazon Rainforest", "Grand Canyon", "Niagara Falls", "Great Wall", "Eiffel Tower", "Colosseum", "Pyramids", "Swiss Alps"],
  },
  {
    id: 'movies',
    name: 'Movies & TV',
    description: 'Pop culture — great for groups.',
    words: ["Star Wars", "Harry Potter", "The Office", "Stranger Things", "Breaking Bad", "Game of Thrones", "The Simpsons", "Friends", "Marvel", "Batman", "Spiderman", "The Matrix", "Titanic", "Inception", "Toy Story", "Frozen", "The Lion King", "Shrek", "Naruto", "One Piece", "Avengers", "Lord of the Rings", "Pirates", "Jurassic Park", "The Witcher", "The Mandalorian", "Wednesday", "Squid Game", "Black Mirror", "Sherlock"],
  },
  {
    id: 'animals',
    name: 'Animals',
    description: 'Classic & beginner-friendly.',
    words: ["Cat", "Dog", "Dolphin", "Shark", "Octopus", "Penguin", "Elephant", "Lion", "Tiger", "Giraffe", "Panda", "Koala", "Kangaroo", "Wolf", "Bear", "Fox", "Owl", "Eagle", "Snake", "Crocodile", "Whale", "Horse", "Rabbit", "Frog", "Butterfly", "Bee", "Spider", "Turtle", "Camel", "Monkey"],
  },
  {
    id: 'party',
    name: 'Party Mode',
    description: 'Fun prompts for louder rounds.',
    words: ["Karaoke", "Dance floor", "Truth or Dare", "Charades", "Board game", "House party", "Festival", "Birthday cake", "Confetti", "Fireworks", "DJ", "Playlist", "Photo booth", "Costume", "Glow sticks", "Cards", "Chips", "Punch bowl", "Balloon", "Piñata", "Midnight", "Cheers", "Toast", "Handshake", "Secret", "Whisper", "Challenge", "Dare", "Laugh", "Vibe"],
  },
]

// Derived "All packs" option (deduped)
export function getAllPackWords() {
  const map = new Map()
  for (const pack of WORD_PACKS) {
    for (const w of pack.words) {
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

export function getWordsForPack(id) {
  if (id === 'all') return getAllPackWords()
  return getPackById(id).words
}

export const PACK_OPTIONS = [
  {
    value: 'all',
    label: 'All packs',
    sublabel: 'Max variety',
  },
  ...WORD_PACKS.map((p) => ({ value: p.id, label: p.name, sublabel: p.description })),
]
