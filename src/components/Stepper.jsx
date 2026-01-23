import React from 'react'
import { PHASE } from '../hooks/useImposterGame'

const steps = [
  { id: PHASE.SETUP, label: 'Setup' },
  { id: PHASE.WORD, label: 'Word' },
  { id: PHASE.PASS, label: 'Pass' },
  { id: PHASE.REVEAL, label: 'Reveal' },
  { id: PHASE.DONE, label: 'Done' },
]

export default function Stepper({ phase }) {
  const activeIndex = Math.max(0, steps.findIndex((s) => s.id === phase))

  return (
    <div className="stepper" aria-label="Progress">
      {steps.map((s, i) => {
        const isActive = i === activeIndex
        const isDone = i < activeIndex
        return (
          <div key={s.id} className="step">
            <div
              className={
                'dot ' + (isActive ? 'active' : isDone ? 'done' : '')
              }
              aria-hidden="true"
            />
            <div className={'stepLabel ' + (isActive ? 'active' : '')}>{s.label}</div>
          </div>
        )
      })}
    </div>
  )
}
