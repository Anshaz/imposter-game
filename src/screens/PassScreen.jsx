import React from 'react'

export default function PassScreen({ derived, actions }) {
  const p = derived.current
  if (!p) return null

  return (
    <div className="stage">
      <div className="card fullscreen">
        <div className="pill">Player {derived.total - derived.remaining + 1} of {derived.total}</div>
        <div style={{ height: 12 }} />
        <div className="bigName">Hand the phone to</div>
        <div className="big">{p.name}</div>
        <div className="muted">When you’re ready, tap Reveal. Make sure nobody else can see!</div>
        <div style={{ height: 18 }} />
        <div className="center">
          <button type="button" className="btn primary" onClick={actions.reveal}>
            Reveal
          </button>
        </div>
      </div>

      <div className="footer">
      </div>
    </div>
  )
}
