import React from 'react'

export default function RevealScreen({ derived, actions }) {
  const p = derived.current
  if (!p) return null

  const isImposter = p.isImposter

  return (
    <div className="stage">
      <div className={`card fullscreen reveal-animation ${isImposter ? 'dangerGlow' : 'successGlow'}`}>
        <div className="muted">This is for</div>
        <div className="bigName">{p.name}</div>

        <div style={{ height: 14 }} />

        <div className={`big ${isImposter ? 'role-imposter' : 'role-word'}`}>
          {isImposter ? 'Imposter' : p.role}
        </div>
        <div className="muted">
          {isImposter ? 'Blend in. Ask questions. Don’t get caught.' : 'Describe it... without saying it.'}
        </div>

        <div style={{ height: 20 }} />
        <div className="center">
          <button type="button" className="btn primary" onClick={actions.next}>
            Hide & pass
          </button>
        </div>

        <div className="muted" style={{ marginTop: 14 }}>
          Tap “Hide & pass” before handing the phone to the next player.
        </div>
      </div>

      <div className="footer">
        <div className="muted">Reveal {derived.total - derived.remaining + 1}/{derived.total}</div>
        <div />
      </div>
    </div>
  )
}
