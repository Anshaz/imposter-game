import React from 'react'

export default function SelectField({ label, value, onChange, options, hint, right, className = '' }) {
  return (
    <div className={'input selectInput ' + className}>
      <div className="labelRow">
        <label>{label}</label>
        {right ? <div className="labelRight">{right}</div> : null}
      </div>

      <div className="selectWrap">
        <select className="selectField" value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="selectCaret" aria-hidden="true">▾</span>
      </div>

      {hint ? <div className="hint">{hint}</div> : null}
    </div>
  )
}
