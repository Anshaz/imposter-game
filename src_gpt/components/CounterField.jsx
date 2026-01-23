import React from 'react'

export default function CounterField({ label, value, min = 0, max = 999, onChange, hint }) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))

  return (
    <div className="input">
      <label>{label}</label>
      <div className="counter">
        <button type="button" className="iconBtn" onClick={dec} aria-label={`Decrease ${label}`} disabled={value <= min}>
          −
        </button>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
        />
        <button type="button" className="iconBtn" onClick={inc} aria-label={`Increase ${label}`} disabled={value >= max}>
          +
        </button>
      </div>
      {hint ? <div className="hint">{hint}</div> : null}
    </div>
  )
}
