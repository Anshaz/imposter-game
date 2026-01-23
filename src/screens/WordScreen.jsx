import React, { useMemo } from 'react'
import TextField from '../components/TextField'
import SelectField from '../components/SelectField'
import { PACK_OPTIONS, getPackById, WORD_PACKS, getAllPackWords } from '../wordPacks'

function packMeta(packId) {
  if (packId === 'all') {
    const total = getAllPackWords().length
    return { name: 'All packs', description: 'Maximum variety across every pack.', count: total }
  }
  const p = getPackById(packId)
  return { name: p.name, description: p.description, count: p.words.length }
}

export default function WordScreen({ state, actions }) {
  const custom = state.customWord
  const canUseCustom = useMemo(() => custom.trim().length > 0, [custom])

  const meta = useMemo(() => packMeta(state.packId), [state.packId])

  return (
    <div className="card">
      <div className="cardTitle">Choose the word</div>

      <div className="choiceGrid">
        <div className="choiceCard" style={{ cursor: 'default' }}>
          <div className="choiceTitle">Random word</div>
          <div className="muted" style={{ marginBottom: 12 }}>
            Pick a pack for the vibe — then start.
          </div>

          <SelectField
            label="Word pack"
            value={state.packId}
            onChange={actions.setPack}
            options={PACK_OPTIONS}
            hint={`${meta.description}  •  ${meta.count} words`}
            right={
              <span className="pill">
                {state.packId === 'all' ? `${WORD_PACKS.length + 1} packs` : '1 pack'}
              </span>
            }
          />

          <button type="button" className="btn primary" onClick={actions.startRandom}>
            Start with random word
          </button>

          <div className="muted" style={{ marginTop: 10 }}>
            Tip: packs keep rounds fresh. “All packs” is great for mixed groups.
          </div>
        </div>

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

          <button type="button" className="btn primary" onClick={() => actions.startCustom(custom)} disabled={!canUseCustom}>
            Start with custom word
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
