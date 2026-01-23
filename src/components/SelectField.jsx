import React from 'react'

export default function SelectField({ label, value, onChange, options, hint, right }) {
  return (
    <div className="input">
      <div className="labelRow">
        <label>{label}</label>
        {right ? <div className="labelRight">{right}</div> : null}
      </div>
      <select className="selectField" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option className="selectField" key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint ? <div className="hint">{hint}</div> : null}
    </div>
  )
}
