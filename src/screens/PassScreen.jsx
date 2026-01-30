import React from 'react'
import { useTranslation } from 'react-i18next'

export default function PassScreen({ derived, actions }) {
  const { t } = useTranslation()
  const p = derived.current
  if (!p) return null

  const current = derived.total - derived.remaining + 1

  return (
    <div className="stage">
      <div className="card fullscreen">
        <div className="pill">{t('pass.pill', { current, total: derived.total })}</div>
        <div style={{ height: 12 }} />
        <div className="bigName">{t('pass.handTo')}</div>
        <div className="big">{p.name}</div>
        <div className="muted">{t('pass.ready')}</div>
        <div style={{ height: 18 }} />
        <div className="center">
          <button type="button" className="btn primary" onClick={actions.reveal}>
            {t('pass.reveal')}
          </button>
        </div>
      </div>

      <div className="footer"></div>
    </div>
  )
}
