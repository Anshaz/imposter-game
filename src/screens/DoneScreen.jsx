import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

function badge(text) {
  return (
    <span
      className="pill"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.14)',
        background: 'rgba(255,255,255,0.06)',
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  )
}

export default function DoneScreen({ derived, actions }) {
  const { t } = useTranslation()
  const results = derived.results
  if (!results) return null

  const tokenChip = (tokenId) => {
    if (!tokenId) return null
    const icon = tokenId === 'detective' ? '🕵️' : tokenId === 'fox' ? '🦊' : tokenId === 'quietMouse' ? '🐭' : '🎭'
    const label =
      tokenId === 'detective'
        ? t('reveal.tokens.detective.name')
        : tokenId === 'fox'
          ? t('reveal.tokens.fox.name')
          : tokenId === 'quietMouse'
            ? t('reveal.tokens.quietMouse.name')
            : tokenId
    return badge(`${icon} ${label}`)
  }

  const sorted = useMemo(() => {
    // Put imposters first, then token holders, then everyone else (nice readability)
    const score = (r) => (r.isImposter ? 2 : 0) + (r.tokenId ? 1 : 0)
    return [...results.rows].sort((a, b) => score(b) - score(a) || a.name.localeCompare(b.name))
  }, [results.rows])

  return (
    <div className="stage">
      <div className="card">
        <div className="cardTitle">{t('done.title')}</div>

        <div className="muted" style={{ marginTop: -6 }}>
          {t('done.secretWord')} <b>{results.word}</b>
        </div>

        <div style={{ height: 14 }} />

        {/* Table */}
        <div
          style={{
            overflow: 'hidden',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.3fr 1fr',
              gap: 10,
              padding: '10px 12px',
              borderBottom: '1px solid rgba(255,255,255,0.10)',
              fontSize: 12,
              opacity: 0.8,
              fontWeight: 700,
            }}
          >
            <div>{t('done.tablePlayer')}</div>
            <div>{t('done.tableRole')}</div>
          </div>

          <div style={{ display: 'grid' }}>
            {sorted.map((r) => (
              <div
                key={r.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.3fr 1fr',
                  gap: 10,
                  padding: '12px 12px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontWeight: 800 }}>{r.name}</div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-start' }}>
                  {r.isImposter ? badge(t('done.badgeImposter')) : badge(t('done.badgeCivilian'))}
                  {results.tokenMode ? tokenChip(r.tokenId) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {results.tokenMode ? (
          <div className="muted" style={{ marginTop: 12 }}>
            {t('done.tokenReminders')}
          </div>
        ) : null}

        <div className="row" style={{ marginTop: 16 }}>
          <button className="btn primary" type="button" onClick={actions.newRound}>
            {t('done.newRound')}
          </button>
          <button className="btn ghost" type="button" onClick={actions.goSetup}>
            {t('done.backSetup')}
          </button>
        </div>
      </div>
    </div>
  )
}
