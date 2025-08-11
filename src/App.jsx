import React, { useEffect, useState, useRef } from 'react'
import words from './words.json'
import './index.css'

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [players, setPlayers] = useState(6)
  const [imposters, setImposters] = useState(2)
  const [deck, setDeck] = useState(null)
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('config') // config | countdown | reveal | done
  const [countdown, setCountdown] = useState(3)
  const countdownRef = useRef(null)

  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [])

  function prepareGame() {
    if (players < 2) return alert('Players must be at least 2')
    if (imposters < 1) return alert('Imposters at least 1')
    if (imposters >= players) return alert('Imposters must be less than players')

    // pick one random word
    const chosen = words[Math.floor(Math.random() * words.length)]
    // build deck: chosen repeated (players - imposters) and 'Imposter' repeated imposters
    const arr = []
    for (let i = 0; i < players - imposters; i++) arr.push(chosen)
    for (let i = 0; i < imposters; i++) arr.push('Imposter')
    const shuffled = shuffle(arr)
    setDeck(shuffled)
    setIndex(0)
    setPhase('countdown')
    setCountdown(3)
    startCountdown()
  }

  function startCountdown() {
    if (countdownRef.current) clearInterval(countdownRef.current)
    setCountdown(3)
    let t = 3
    countdownRef.current = setInterval(() => {
      t -= 1
      if (t <= 0) {
        clearInterval(countdownRef.current)
        setPhase('reveal')
      } else {
        setCountdown(t)
      }
    }, 1000)
  }

  function nextPlayer() {
    if (index + 1 >= (deck?.length || 0)) {
      setPhase('done')
      return
    }
    setIndex(index + 1)
    setPhase('countdown')
    setCountdown(3)
    startCountdown()
  }

  function restart() {
    setDeck(null)
    setIndex(0)
    setPhase('config')
  }

  return (
    <div className="app">
      <div className="header">
        <div>
          <div className="h1">Imposter — pass the phone</div>
          <div className="subtitle">Fast party game — React prototype</div>
        </div>
        <div className="muted">Players: {players} • Imposters: {imposters}</div>
      </div>

      {phase === 'config' && (
        <div className="card">
          <div className="input">
            <label>Number of players</label>
            <input
              type="number"
              min="2"
              value={players}
              onChange={(e) => setPlayers(Number(e.target.value))}
            />
          </div>
          <div className="input">
            <label>Number of imposters</label>
            <input
              type="number"
              min="1"
              value={imposters}
              onChange={(e) => setImposters(Number(e.target.value))}
            />
          </div>

          <div style={{ marginTop: 8 }} className="row">
            <button className="btn primary" onClick={prepareGame}>
              Start Game
            </button>
            <button
              className="btn ghost"
              onClick={() => {
                setPlayers(6)
                setImposters(2)
              }}
            >
              Reset Defaults
            </button>
          </div>

          <div style={{ marginTop: 12 }} className="muted">
            Words loaded: {words.length}. The app picks one random word per round and
            places imposters among players.
          </div>
        </div>
      )}

      {phase === 'countdown' && (
        <div className="stage">
          <div className="card fullscreen">
            <div className="muted">Player {index + 1} — Get ready</div>
            <div style={{ height: 12 }} />
            <div className="countdown">{countdown}</div>
            <div style={{ height: 18 }} />
            <div className="muted">Pass the phone while the counter runs</div>
          </div>

          <div className="footer">
            <div className="muted">Cards left: {deck ? deck.length - index : 0}</div>
            <div className="center">
              <button
                className="btn ghost"
                onClick={() => {
                  // allow skipping the countdown to reveal early (convenience)
                  if (countdownRef.current) clearInterval(countdownRef.current)
                  setPhase('reveal')
                }}
              >
                Reveal Now
              </button>
            </div>
          </div>
        </div>
      )}

      {phase === 'reveal' && (
        <div className="stage">
          <div className="card fullscreen">
            <div className="muted">Player {index + 1}</div>
            <div style={{ height: 16 }} />
            <div className="big">{deck[index]}</div>
            <div style={{ height: 8 }} />
            <div className="muted">
              {deck[index] === 'Imposter' ? 'You are the imposter' : 'You are not the imposter'}
            </div>
            <div style={{ height: 18 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn primary" onClick={nextPlayer}>
                Next Player
              </button>
              <button
                className="btn ghost"
                onClick={() => {
                  // reveal again (convenience)
                }}
              >
                Hold (do nothing)
              </button>
            </div>
          </div>

          <div className="footer">
            <div className="muted">Index: {index + 1}/{deck.length}</div>
            <div />
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div className="card">
          <div className="big">All done 🎉</div>
          <div className="muted">Everyone has seen their card.</div>
          <div style={{ height: 12 }} />
          <div className="row">
            <button
              className="btn primary"
              onClick={() => {
                // allow replay with same deck (reshuffle new deck on restart if needed)
                restart()
              }}
            >
              Play again
            </button>
            <button
              className="btn ghost"
              onClick={() => {
                // keep the same deck and restart order
                setIndex(0)
                setPhase('countdown')
                setCountdown(3)
                startCountdown()
              }}
            >
              Replay same deck
            </button>
          </div>
        </div>
      )}
    </div>
  )
}