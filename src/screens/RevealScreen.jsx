import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const TOKENS = [
  { id: 'detective', icon: '🕵️', revealToGroup: true },
  { id: 'fox', icon: '🦊', revealToGroup: false },
  { id: 'quietMouse', icon: '🐭', revealToGroup: true },
]

export default function RevealScreen({ derived, actions }) {
  const { t } = useTranslation()
  const p = derived.current
  if (!p) return null

  const isImposter = p.isImposter
  const tokenMode = !!derived.tokenMode

  const token = useMemo(() => {
    if (!tokenMode) return null
    return TOKENS.find((tt) => tt.id === p.tokenRole) || null
  }, [tokenMode, p.tokenRole])

  const tokenText = (id) => ({
    name: t(`reveal.tokens.${id}.name`),
    description: t(`reveal.tokens.${id}.desc`),
    instruction: t(`reveal.tokens.${id}.inst`),
  })

  return (
    <div className="stage">
      <div className={`card fullscreen reveal-animation ${isImposter ? 'dangerGlow' : 'successGlow'}`}>
        <div className="muted">{t('reveal.thisIsFor')}</div>
        <div className="bigName">{p.name}</div>

        <div style={{ height: 14 }} />

        {tokenMode ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {TOKENS.map((tt) => {
              const active = p.tokenRole === tt.id
              const txt = tokenText(tt.id)
              return (
                <span
                  key={tt.id}
                  className="pill"
                  style={{
                    opacity: active ? 1 : 0.35,
                    transform: active ? 'scale(1.02)' : 'none',
                    borderStyle: active ? 'solid' : 'dashed',
                  }}
                >
                  {tt.icon} {txt.name}
                </span>
              )
            })}
          </div>
        ) : null}

        <div className={`big ${isImposter ? 'role-imposter' : 'role-word'}`}>
          {isImposter ? t('reveal.roleImposter') : p.role}
        </div>

        <div className="muted">{isImposter ? t('reveal.tipImposter') : t('reveal.tipCivilian')}</div>

        {tokenMode ? (
          token ? (
            <div
              style={{
                marginTop: 14,
                padding: '12px 12px',
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.16)',
                background: 'rgba(255,255,255,0.06)',
                textAlign: 'left',
              }}
            >
              {(() => {
                const txt = tokenText(token.id)
                return (
                  <>
                    <div style={{ fontWeight: 800 }}>
                      {token.icon} {txt.name}
                    </div>
                    <div className="muted" style={{ marginTop: 6 }}>
                      {txt.description}
                    </div>
                    <div className="muted" style={{ marginTop: 6, fontWeight: 600, color: '#7fff00' }}>
                      {txt.instruction}
                    </div>
                  </>
                )
              })()}
            </div>
          ) : (
            <div className="muted" style={{ marginTop: 12 }}>
              {t('reveal.noToken')}
            </div>
          )
        ) : null}

        <div style={{ height: 20 }} />
        <div className="center">
          <button type="button" className="btn primary" onClick={actions.next}>
            {t('reveal.hidePass')}
          </button>
        </div>

        <div className="muted" style={{ marginTop: 14 }}>
          {t('reveal.hidePassHint')}
        </div>
      </div>
    </div>
  )
}
