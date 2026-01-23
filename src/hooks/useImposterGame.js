import { useMemo, useReducer } from 'react'
import { getWordsForPack } from '../wordPacks'
import { buildDeck, clampInt, getResults, pickWord, validateSetup } from '../lib/game'

export const PHASE = {
  SETUP: 'setup',
  WORD: 'word',
  PASS: 'pass',
  REVEAL: 'reveal',
  DONE: 'done',
}

const initialState = {
  phase: PHASE.SETUP,
  players: 2,
  imposters: 1,
  names: ['', ''],
  customWord: '',
  packId: 'all',
  deck: null,
  ui: {
    dialog: null, // { title, message, actions?: [{label, variant, onClickId}] }
    setupError: null,
  },
}

function ensureNamesLength(names, len) {
  const next = names.slice(0, len)
  while (next.length < len) next.push('')
  return next
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYERS': {
      const players = clampInt(action.value, 2, 20)
      const names = ensureNamesLength(state.names, players)
      const imposters = clampInt(state.imposters, 1, players - 1)
      return {
        ...state,
        players,
        imposters,
        names,
        ui: { ...state.ui, setupError: null },
      }
    }

    case 'SET_IMPOSTERS': {
      const imposters = clampInt(action.value, 1, Math.max(1, state.players - 1))
      return { ...state, imposters, ui: { ...state.ui, setupError: null } }
    }

    case 'SET_NAME': {
      const names = state.names.slice()
      names[action.index] = action.value
      return { ...state, names, ui: { ...state.ui, setupError: null } }
    }

    case 'SET_CUSTOM_WORD':
      return { ...state, customWord: action.value }

    case 'SET_PACK':
      return { ...state, packId: action.value }

    case 'GO_WORD':
      return { ...state, phase: PHASE.WORD, ui: { ...state.ui, setupError: null } }

    case 'GO_SETUP':
      return { ...state, phase: PHASE.SETUP, deck: null, ui: { ...state.ui, setupError: null } }

    case 'START_GAME': {
      const err = validateSetup({ players: state.players, imposters: state.imposters, names: state.names })
      if (err) return { ...state, ui: { ...state.ui, setupError: err } }

      const word = pickWord({ customWord: action.customWord ?? '', words: getWordsForPack(state.packId) })
      const deck = buildDeck({
        players: state.players,
        imposters: state.imposters,
        names: state.names,
        word,
      })

      return {
        ...state,
        deck,
        phase: PHASE.PASS,
        ui: { ...state.ui, setupError: null },
      }
    }

    case 'REVEAL':
      return { ...state, phase: PHASE.REVEAL }

    case 'NEXT': {
      if (!state.deck) return state
      const cursor = state.deck.cursor + 1
      if (cursor >= state.deck.revealOrder.length) {
        return { ...state, phase: PHASE.DONE, deck: { ...state.deck, cursor } }
      }
      return { ...state, phase: PHASE.PASS, deck: { ...state.deck, cursor } }
    }

    case 'REPLAY_DECK': {
      if (!state.deck) return state
      return { ...state, phase: PHASE.PASS, deck: { ...state.deck, cursor: 0 } }
    }

    case 'NEW_ROUND':
      return { ...state, phase: PHASE.WORD, deck: null }

    case 'OPEN_DIALOG':
      return { ...state, ui: { ...state.ui, dialog: action.payload } }

    case 'CLOSE_DIALOG':
      return { ...state, ui: { ...state.ui, dialog: null } }

    default:
      return state
  }
}

export function useImposterGame() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const derived = useMemo(() => {
    const deck = state.deck
    const orderIdx = deck ? deck.revealOrder[deck.cursor] : null
    const current = deck && orderIdx != null ? deck.assignments[orderIdx] : null
    const remaining = deck ? Math.max(0, deck.revealOrder.length - deck.cursor) : 0
    const total = deck ? deck.revealOrder.length : 0

    return {
      current,
      remaining,
      total,
      results: getResults(deck),
    }
  }, [state.deck])

  const actions = useMemo(
    () => ({
      setPlayers: (value) => dispatch({ type: 'SET_PLAYERS', value }),
      setImposters: (value) => dispatch({ type: 'SET_IMPOSTERS', value }),
      setName: (index, value) => dispatch({ type: 'SET_NAME', index, value }),
      setCustomWord: (value) => dispatch({ type: 'SET_CUSTOM_WORD', value }),
      setPack: (value) => dispatch({ type: 'SET_PACK', value }),
      goWord: () => dispatch({ type: 'GO_WORD' }),
      goSetup: () => dispatch({ type: 'GO_SETUP' }),
      startRandom: () => dispatch({ type: 'START_GAME', customWord: '' }),
      startCustom: (customWord) => dispatch({ type: 'START_GAME', customWord }),
      reveal: () => dispatch({ type: 'REVEAL' }),
      next: () => dispatch({ type: 'NEXT' }),
      replayDeck: () => dispatch({ type: 'REPLAY_DECK' }),
      newRound: () => dispatch({ type: 'NEW_ROUND' }),
      openDialog: (payload) => dispatch({ type: 'OPEN_DIALOG', payload }),
      closeDialog: () => dispatch({ type: 'CLOSE_DIALOG' }),
    }),
    [],
  )

  return { state, derived, actions }
}
