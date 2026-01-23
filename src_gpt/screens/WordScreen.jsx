import React, { useMemo } from 'react'
import TextField from '../components/TextField'

export default function WordScreen({ state, actions }) {
  const custom = state.customWord
  const canUseCustom = useMemo(() => custom.trim().length > 0, [custom])

  return (
    <div className="card">
      <div className="cardTitle">Choose the word</div>

      <div className="choiceGrid">
        <button
          type="button"
          className="choiceCard"
          onClick={actions.startRandom}
        >
          <div className="choiceTitle">Random word</div>
          <div className="muted">Fastest option — the app picks one from its list.</div>
        </button>

        <div className="choiceCard" style={{ cursor: 'default' }}>
          <div className="choiceTitle">Custom word</div>
          <div className="muted" style={{ marginBottom: 12 }}>
            Great for inside jokes. Keep it short.
          </div>
          <TextField
            label="Your word"
            value={custom}
            onChange={actions.setCustomWord}
            placeholder="e.g., Pineapple, Tokyo, Guitar"
          />
          <button
            type="button"
            className="btn primary"
            onClick={() => actions.startCustom(custom)}
            disabled={!canUseCustom}
          >
            Use custom word
          </button>
        </div>
      </div>

      <div className="row" style={{ marginTop: 16 }}>
        <button type="button" className="btn ghost" onClick={actions.goSetup}>
          Back
        </button>
      </div>

      <div className="muted" style={{ marginTop: 12 }}>
        Heads up: imposters will only see “Imposter”. Everyone else sees the same word.
      </div>
    </div>
  )
}
