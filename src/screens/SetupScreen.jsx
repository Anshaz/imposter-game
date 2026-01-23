import React, { useMemo } from 'react'
import CounterField from '../components/CounterField'
import PlayerListEditor from '../components/PlayerListEditor'
import { validateSetup } from '../lib/game'

export default function SetupScreen({ state, actions }) {
  const maxPlayers = 20

  const setupError = useMemo(() => {
    return validateSetup({ players: state.players, imposters: state.imposters, names: state.names })
  }, [state.players, state.imposters, state.names])

  const canContinue = !setupError

  return (
    <div className="card">
      <div className="cardTitle">Game setup</div>

      <CounterField
        label="Players"
        value={state.players}
        min={2}
        max={maxPlayers}
        onChange={actions.setPlayers}
        hint="2–20 players works well on one phone."
      />

      <CounterField
        label="Imposters"
        value={state.imposters}
        min={1}
        max={Math.max(1, state.players)}
        onChange={actions.setImposters}
        disabled={state.surpriseMode}
        hint={
          state.surpriseMode
            ? `Surprise mode: randomized each round (1–${state.players}).`
            : "Pick how many imposters are in the round."
        }
        
      />
      <div className="input">
        <label className="surpriseMode">Surprise mode: {state.surpriseMode ? "ON" : "OFF"}</label>
        <div className="toggleRow">
          <button
            type="button"
            className={"toggle" + (state.surpriseMode ? " on" : "")}
            onClick={() => actions.setSurpriseMode(!state.surpriseMode)}
            aria-pressed={state.surpriseMode}
          >
            <span className="knob" />
          </button>
          <div className="toggleText">
            Randomize imposters each round (1–{state.players}). The imposter input will be locked.
          </div>
        </div>
      </div>

      <div className="sectionTitle">Player names</div>
      <PlayerListEditor players={state.players} names={state.names} onChangeName={actions.setName} />

      {setupError ? <div className="errorBox">{setupError}</div> : null}

      <div className="row" style={{ marginTop: 16 }}>
        <button
          className="btn primary"
          type="button"
          onClick={actions.goWord}
          disabled={!canContinue}
          title={!canContinue ? 'Fill all names and check numbers' : 'Continue'}
        >
          Continue
        </button>
        <button
          className="btn ghost"
          type="button"
          onClick={() => {
            actions.setPlayers(2)
            actions.setSurpriseMode(false)
            actions.setImposters(1)
            actions.setName(0, '')
            actions.setName(1, '')
          }}
        >
          Defaults
        </button>
      </div>

      <div className="muted" style={{ marginTop: 12 }}>
        Next: choose a random word or set your own (e.g., “Pizza”, “Beach”, “Shark”).
      </div>
    </div>
  )
}
