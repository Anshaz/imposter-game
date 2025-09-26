import React, { useEffect, useState, useRef } from 'react'
import words from './words.json'
import './index.css'

// Shuffle helper
function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [players, setPlayers] = useState(2)
  const [imposters, setImposters] = useState(1)
  const [names, setNames] = useState(Array(2).fill(''))
  const [assignments, setAssignments] = useState(null) // array of { name, role }
  const [revealOrder, setRevealOrder] = useState([])
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('config') // config | countdown | reveal | done
  const [countdown, setCountdown] = useState(3)
  const countdownRef = useRef(null)
const [errorMessage, setErrorMessage] = useState('')
const [showError, setShowError] = useState(false)

  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [])

  function handleNameChange(i, value) {
    const updated = [...names]
    updated[i] = value
    setNames(updated)
  }

function prepareGame() {
  if (players < 2) {
    setErrorMessage('Players must be at least 2')
    setShowError(true)
    return
  }
  if (imposters < 1) {
    setErrorMessage('Imposters must be at least 1')
    setShowError(true)
    return
  }
  if (imposters >= players) {
    setErrorMessage('Imposters must be less than players')
    setShowError(true)
    return
  }
  if (names.slice(0, players).some((n) => !n.trim())) {
    setErrorMessage('Player names cannot be empty')
    setShowError(true)
    return
  }

    // Pick one random word
    const chosen = words[Math.floor(Math.random() * words.length)]

    // Create roles array
    const roles = []
    for (let i = 0; i < players - imposters; i++) roles.push(chosen)
    for (let i = 0; i < imposters; i++) roles.push('Imposter')
    const shuffledRoles = shuffle(roles)

    // Assign roles to names
    const playerAssignments = names.slice(0, players).map((name, i) => ({
      name,
      role: shuffledRoles[i],
    }))

    // Create a reveal order separate from assignments
    const order = shuffle([...Array(players).keys()]) // array of indices
    setAssignments(playerAssignments)
    setRevealOrder(order)
    setIndex(0)
    setPhase('countdown')
    setCountdown(5)
    // startCountdown()
  }

  // function startCountdown() {
  //   if (countdownRef.current) clearInterval(countdownRef.current)
  //   setCountdown(5)
  //   let t = 5
  //   countdownRef.current = setInterval(() => {
  //     t -= 1
  //     if (t <= 0) {
  //       clearInterval(countdownRef.current)
  //       setPhase('reveal')
  //     } else {
  //       setCountdown(t)
  //     }
  //   }, 1000)
  // }

  function nextPlayer() {
    if (index + 1 >= revealOrder.length) {
      setPhase('done')
      return
    }
    setIndex(index + 1)
    setPhase('countdown')
    setCountdown(3)
    startCountdown()
  }

  function restart() {
    setAssignments(null)
    setRevealOrder([])
    setIndex(0)
    setPhase('config')
  }

  return (
    <div className="app">
      <div className="header">
        <div>
          <div className="h1">Imposter — pass the phone</div>
        </div>
      </div>

      {phase === 'config' && (
        <div className="card">
          <div className="input">
            <label>Number of players</label>
            <input
              type="number"
              min="2"
              value={players}
              onChange={(e) => {
                const val = Number(e.target.value)
                setPlayers(val)
                setNames((prev) => {
                  const arr = [...prev]
                  while (arr.length < val) arr.push('')
                  return arr
                })
              }}
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

          <div style={{ marginTop: 8 }}>
            {Array.from({ length: players }, (_, i) => (
              <div key={i} className="input">
                <label>Player {i + 1} name</label>
                <input
                  type="text"
                  value={names[i] || ''}
                  onChange={(e) => handleNameChange(i, e.target.value)}
                />
              </div>
            ))}
          </div>
{showError && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
    }}
  >
    <div
      style={{
        background: '#0b1220',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '300px',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>Error</div>
      <div style={{ marginBottom: '16px' }}>{errorMessage}</div>
      <button
        className="btn primary"
        onClick={() => setShowError(false)}
      >
        OK
      </button>
    </div>
  </div>
)}
          <div style={{ marginTop: 8 }} className="row">
            <button className="btn primary" onClick={prepareGame}>
              Start Game
            </button>
            <button
              className="btn ghost"
              onClick={() => {
                setPlayers(2)
                setImposters(1)
                setNames(Array(2).fill(''))
              }}
            >
              Reset Defaults
            </button>
          </div>

          <div style={{ marginTop: 12 }} className="muted">
            Words loaded. The app picks one random word per round and
            places imposters among players.
          </div>
        </div>
      )}

      {phase === 'countdown' && assignments && (
        <div className="stage">
          <div className="card fullscreen">
            <div className="muted">
              {assignments[revealOrder[index]].name} — Get ready
            </div>
            <div style={{ height: 12 }} />
            <div className="center">
              <button
                className="btn primary"
                onClick={() => {
                  // if (countdownRef.current) clearInterval(countdownRef.current)
                  setPhase('reveal')
                }}
              >
                Reveal Now
              </button>
            </div>
            <div style={{ height: 18 }} />
            <div className="muted">Click on Reveal Now to find out</div>
          </div>

          <div className="footer">
            <div className="muted">
              Cards left: {revealOrder.length - index}
            </div>
            {/* <div className="center">
              <button
                className="btn ghost"
                onClick={() => {
                  // if (countdownRef.current) clearInterval(countdownRef.current)
                  setPhase('reveal')
                }}
              >
                Reveal Now
              </button>
            </div> */}
          </div>
        </div>
      )}

      {phase === 'reveal' && assignments && (
        <div className="stage">
          <div className="card fullscreen">
            <div className="muted">
              {assignments[revealOrder[index]].name}
            </div>
            <div style={{ height: 16 }} />
            <div className="big">{assignments[revealOrder[index]].role}</div>
            <div style={{ height: 8 }} />
            <div className="muted">
              {assignments[revealOrder[index]].role === 'Imposter'
                ? 'You are the imposter'
                : 'You are not the imposter'}
            </div>
            <div style={{ height: 18 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn primary" onClick={nextPlayer}>
                Next Player
              </button>
            </div>
            <div className="muted">Click to hide and pass on to the next player</div>
          </div>

          <div className="footer">
            <div className="muted">
              Reveal {index + 1}/{revealOrder.length}
            </div>
            <div />
          </div>
        </div>
      )}

{phase === 'done' && assignments && (
  <div className="card">
    <div className="big">All done 🎉</div>
    <div className="muted">Everyone has seen their card.</div>
      <div className="muted">Now put the phone down and find the imposter</div>
    <div style={{ height: 12 }} />

    <div className="row">
      <button className="btn primary" onClick={restart}>
        Play again
      </button>
      <button
        className="btn ghost"
        onClick={() => {
          setIndex(0)
          setPhase('countdown')
          setCountdown(3)
          startCountdown()
        }}
      >
        Replay same deck
      </button>
    </div>

    <div style={{ marginTop: 12 }}>
      <button
        className="btn ghost"
        onClick={() => {
          const impostersList = assignments
            .filter((p) => p.role === 'Imposter')
            .map((p) => p.name)
          const word = assignments.find((p) => p.role !== 'Imposter')?.role
          alert(
            `Imposters: ${impostersList.join(', ')}\nWord: ${word || 'Unknown'}`
          )
        }}
      >
        Show Results
      </button>
    </div>
  </div>
)}

    </div>
  )
}
