import React from 'react'

export default function DiscussScreen({ derived, actions }) {
  return (
    <div className="stage">
      <div className="card">
        <div className="cardTitle">All set!</div>

        <div className="big" style={{ marginTop: 8 }}>
          Put the phone down.
        </div>

        <div className="muted" style={{ marginTop: 10 }}>
          Revealing is complete. Now discuss together and find the imposter(s).
        </div>

        <div
          style={{
            marginTop: 14,
            padding: '12px 12px',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          <div style={{ fontWeight: 800 }}>Quick reminder</div>
          <div className="muted" style={{ marginTop: 6 }}>
            Don’t say the secret word out loud. Ask questions and listen for bluffing.
          </div>
        </div>

        <div className="row" style={{ marginTop: 16 }}>
          <button className="btn primary" type="button" onClick={actions.viewResults}>
            View results
          </button>
          <button className="btn ghost" type="button" onClick={actions.goSetup}>
            Back to setup
          </button>
        </div>

        <div className="muted" style={{ marginTop: 12 }}>
          Players: <b>{derived.total}</b>
        </div>
      </div>
    </div>
  )
}
