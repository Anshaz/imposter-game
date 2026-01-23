import React from 'react'
import Stepper from './Stepper'

export default function AppShell({ phase, children, onReset }) {
  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="h1">Imposter — pass the phone</div>
          <div className="subtitle">Secret roles, one phone. No peeking 👀</div>
        </div>
      </header>

      <div className="topRow">
        <Stepper phase={phase} />
        {onReset && (
          <button className="link" type="button" onClick={onReset}>
            Reset
          </button>
        )}
      </div>

      <main>{children}</main>

      <footer className="tiny">
        Tip: turn the phone brightness down a bit and keep it close to your face while revealing.
      </footer>
    </div>
  )
}
