import React from 'react'

export default function TextField({ label, value, onChange, placeholder, right, autoFocus }) {
  return (
    <div className="input">
      <div className="labelRow">
        <label>{label}</label>
        {right ? <div className="labelRight">{right}</div> : null}
      </div>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
      />
    </div>
  )
}
