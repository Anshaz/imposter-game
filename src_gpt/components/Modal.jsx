import React, { useEffect } from 'react'

export default function Modal({ open, title, message, actions = [], onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="dialog-content" onMouseDown={(e) => e.stopPropagation()}>
        <div className="dialog-title">{title}</div>
        <div className="dialog-message">{message}</div>

        <div className="row" style={{ justifyContent: 'center' }}>
          {actions.length > 0 ? (
            actions.map((a, i) => (
              <button
                key={i}
                type="button"
                className={a.variant === 'primary' ? 'btn primary' : 'btn ghost'}
                onClick={a.onClick}
              >
                {a.label}
              </button>
            ))
          ) : (
            <button type="button" className="btn primary" onClick={onClose}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
