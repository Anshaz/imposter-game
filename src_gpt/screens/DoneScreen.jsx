import React from 'react'

export default function DoneScreen({ derived, actions }) {
  const results = derived.results
  const imposters = results?.imposters || []
  const word = results?.word || ''

  return (
    <div className="card">
      <div className="big">All set 🎉</div>
      <div className="muted">Everyone has seen their card. Put the phone down and start questioning.</div>

      <div className="row" style={{ marginTop: 16 }}>
        <button type="button" className="btn primary" onClick={actions.newRound}>
          New round
        </button>
        <button type="button" className="btn ghost" onClick={actions.replayDeck}>
          Replay same roles
        </button>
      </div>

      <div style={{ marginTop: 14 }}>
        <button
          type="button"
          className="btn ghost"
          onClick={() => {
            actions.openDialog({
              title: 'Game results',
              message: `Imposters: ${imposters.join(', ') || 'None'}\nWord: ${word || 'Unknown'}`,
            })
          }}
        >
          Show results
        </button>
      </div>

      <div className="muted" style={{ marginTop: 12 }}>
        Want it harder? Use 2 imposters for 7–10 players.
      </div>
    </div>
  )
}
