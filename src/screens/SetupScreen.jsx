import React, { useMemo, useState } from 'react'
import CounterField from '../components/CounterField'
import PlayerListEditor from '../components/PlayerListEditor'
import Modal from '../components/Modal'
import { validateSetup } from '../lib/game'

export default function SetupScreen({ state, actions }) {
  const maxPlayers = 20
  const [howOpen, setHowOpen] = useState(false)

  const setupError = useMemo(() => {
    return validateSetup({ players: state.players, imposters: state.imposters, names: state.names })
  }, [state.players, state.imposters, state.names])

  const canContinue = !setupError

  return (
    <div className="card">
      {/* Title row + How to play */}
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div className="cardTitle" style={{ marginBottom: 0 }}>
          Game setup
        </div>

        <button className="link" type="button" onClick={() => setHowOpen(true)}>
          How to play
        </button>
      </div>

      <CounterField
        label="Players"
        value={state.players}
        min={2}
        max={maxPlayers}
        onChange={actions.setPlayers}
      // hint="2–20 players works well on one phone."
      />

      <CounterField
        label="Imposters"
        value={state.imposters}
        displayValue={state.surpriseMode ? `` : state.imposters}
        min={1}
        max={Math.max(1, state.players)}
        onChange={actions.setImposters}
        disabled={state.surpriseMode}
        hint={
          state.surpriseMode
            ? `Surprise mode ON: Imposters will be random`
            : 'Pick how many imposters are in the round.'
        }
      />


      <div className="input">
        
        <div className="toggleRow">
          <button
            type="button"
            className={'toggle' + (state.surpriseMode ? ' on' : '')}
            onClick={() => actions.setSurpriseMode(!state.surpriseMode)}
            aria-pressed={state.surpriseMode}
          >
            <span className="knob" />
          </button>
          <div className="toggleText">
            <label>Surprise mode: Imposter Count Random</label>
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

      {/* How to play modal */}
      <Modal
        open={howOpen}
        title="How to play"
        onClose={() => setHowOpen(false)}
        message={
          <div style={{ display: 'grid', gap: 10, textAlign: 'left' }}>
            <div className="muted" style={{ marginTop: -4 }}>
              A quick party game: most players share the same secret word. Imposters don’t.
            </div>

            <ol style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 10 }}>
              <li>
                <b>Set up the round:</b> choose <b>Players</b>, enter names, and pick how many <b>Imposters</b>.
                <br />
                <span className="muted">
                  If <b>Surprise mode</b> is ON, the game randomizes imposters each round (1 to many).
                </span>
              </li>

              <li>
                <b>Choose the word:</b> on the next screen pick a <b>word pack</b> (or “All packs”), then choose a
                random word (or enter your own).
              </li>

              <li>
                <b>Pass the phone:</b> the app will tell you who to hand the phone to. Each player taps <b>Reveal</b>,
                looks quickly, then taps <b>Hide</b> and passes it on.
                <br />
                <span className="muted">
                  Civilians see the word. Imposters see “IMPOSTER”.
                </span>
              </li>

              <li>
                <b>Discuss:</b> serially talk as a group to find the imposter(s). Describe the word without saying it directly.
                Ask each other questions to spot who’s bluffing.
              </li>

              <li>
                <b>Vote:</b> when ready, agree on who the imposter is and reveal the results.
              </li>
            </ol>

            <div className="muted">
              <b>Fun house rules:</b> everyone must speak once • no spelling/letter questions • no exact synonyms.
            </div>
          </div>
        }
      />
    </div>
  )
}
