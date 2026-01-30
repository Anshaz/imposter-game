import React from 'react'
import { useTranslation } from 'react-i18next'

export default function DiscussScreen({ derived, actions }) {
  const { t } = useTranslation()

  return (
    <div className="stage">
      <div className="card">
        <div className="cardTitle">{t('discuss.title')}</div>

        <div className="big" style={{ marginTop: 8 }}>
          {t('discuss.putDown')}
        </div>

        <div className="muted" style={{ marginTop: 10 }}>
          {t('discuss.desc')}
        </div>

        <div
          style={{
            marginTop: 14,
            padding: '12px 12px',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          <div style={{ fontWeight: 800 }}>{t('discuss.reminderTitle')}</div>
          <div className="muted" style={{ marginTop: 6 }}>
            {t('discuss.reminderText')}
          </div>
        </div>

        <div className="row" style={{ marginTop: 16 }}>
          <button className="btn primary" type="button" onClick={actions.viewResults}>
            {t('discuss.viewResults')}
          </button>
          <button className="btn ghost" type="button" onClick={actions.goSetup}>
            {t('discuss.backSetup')}
          </button>
        </div>

        <div className="muted" style={{ marginTop: 12 }}>
          {t('discuss.players', { total: derived.total })}
        </div>
      </div>
    </div>
  )
}
