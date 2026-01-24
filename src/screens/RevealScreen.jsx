import React, { useMemo } from 'react'

const TOKENS = [
  {
    id: 'detective',
    name: 'The Detective',
    icon: '🕵️',
    revealToGroup: true,
    description: 'At the end of the round, you may question one player (1 extra question).',
    instruction: 'Announce this role to the group now.',
  },
  {
    id: 'fox',
    name: 'The Fox',
    icon: '🦊',
    revealToGroup: false,
    description: 'You win if you get voted out.',
    instruction: 'Keep this role secret.',
  },
  {
    id: 'quietMouse',
    name: 'The Quiet Mouse',
    icon: '🐭',
    revealToGroup: true,
    description: 'Once during the first discussion round, you may silently pass your turn.',
    instruction: 'Announce this role to the group now.',
  },
]

export default function RevealScreen({ derived, actions }) {
  const p = derived.current
  if (!p) return null

  const isImposter = p.isImposter
  const tokenMode = !!derived.tokenMode

  const token = useMemo(() => {
    if (!tokenMode) return null
    return TOKENS.find((t) => t.id === p.tokenRole) || null
  }, [tokenMode, p.tokenRole])

  return (
    <div className="stage">
      <div className={`card fullscreen reveal-animation ${isImposter ? 'dangerGlow' : 'successGlow'}`}>
        <div className="muted">This is for</div>
        <div className="bigName">{p.name}</div>

        <div style={{ height: 14 }} />

        {tokenMode ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {TOKENS.map((t) => {
              const active = p.tokenRole === t.id
              return (
                <span
                  key={t.id}
                  className="pill"
                  style={{
                    opacity: active ? 1 : 0.35,
                    transform: active ? 'scale(1.02)' : 'none',
                    borderStyle: active ? 'solid' : 'dashed',
                  }}
                >
                  {t.icon} {t.name}
                </span>
              )
            })}
          </div>
        ) : null}

        <div className={`big ${isImposter ? 'role-imposter' : 'role-word'}`}>
          {isImposter ? 'Imposter' : p.role}
        </div>

        <div className="muted">
          {isImposter ? 'Blend in. Ask questions. Don’t get caught.' : 'Describe it... without saying it.'}
        </div>

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
              <div style={{ fontWeight: 800 }}>
                {token.icon} {token.name}
              </div>
              <div className="muted" style={{ marginTop: 6 }}>
                {token.description}
              </div>
              <div className="muted" style={{ marginTop: 6, fontWeight: 600, color: '#7fff00' }}>
                {token.instruction}
              </div>
            </div>
          ) : (
            <div className="muted" style={{ marginTop: 12 }}>
              No token for you this round.
            </div>
          )
        ) : null}

        <div style={{ height: 20 }} />
        <div className="center">
          <button type="button" className="btn primary" onClick={actions.next}>
            Hide & pass
          </button>
        </div>

        <div className="muted" style={{ marginTop: 14 }}>
          Tap “Hide & pass” before handing the phone to the next player.
        </div>
      </div>
    </div>
  )
}
