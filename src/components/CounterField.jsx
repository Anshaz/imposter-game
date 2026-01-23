import React from 'react'

export default function CounterField({
  label,
  value,
  displayValue, // <- NEW (string/number)
  min = 0,
  max = 999,
  onChange,
  hint,
  disabled = false,
}) {
  const dec = () => !disabled && onChange(Math.max(min, Number(value) - 1))
  const inc = () => !disabled && onChange(Math.min(max, Number(value) + 1))

  const shown = displayValue ?? value

  return (
    <div className={'counterField' + (disabled ? ' counterField--locked' : '')}>
      <div className="counterField__labelRow">
        <label className="counterField__label">{label}</label>
      </div>

      <div className="counterField__row" aria-disabled={disabled}>
        <button
          className="counterField__btn"
          type="button"
          onClick={dec}
          disabled={disabled || value <= min}
        >
          −
        </button>

        <div className="counterField__valueWrap">
          <div className="counterField__value">{shown}</div>
          {disabled ? <div className="counterField__sub">🔒</div> : null}
        </div>

        <button
          className="counterField__btn"
          type="button"
          onClick={inc}
          disabled={disabled || value >= max}
        >
          +
        </button>
      </div>

      {hint ? <div className="counterField__hint">{hint}</div> : null}
    </div>
  )
}
