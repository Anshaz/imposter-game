import React from 'react'
import { useTranslation } from 'react-i18next'

const AVATARS = [
  '🦊', '🐺', '🐯', '🦁', '🐼', '🐸', '🐵', '🦄', '🐙', '🦖',
  '🤖', '👾', '🧙‍♂️', '🧛‍♀️', '🦸‍♂️', '🥷', '🧞‍♂️', '🧠', '🛰️', '🚀',
  '🌈', '🔥', '⚡', '💎', '🍀', '🎧', '🎮', '🏄‍♂️', '🛼', '🧩',
]

// Small stable hash (fast + good enough for UI)
function hashString(str) {
  let h = 2166136261 // FNV-1a base
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function initials(name) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '🙂'
  const a = parts[0]?.[0] || ''
  const b = parts[1]?.[0] || ''
  return (a + b).toUpperCase()
}

export function avatarForName(name) {
  const clean = (name || '').trim().toLowerCase()
  if (!clean) return '🙂'
  const idx = hashString(clean) % AVATARS.length
  return AVATARS[idx]
}

export default function PlayerListEditor({ players, names, onChangeName }) {
  const { t } = useTranslation()

  return (
    <div className="playerList">
      {Array.from({ length: players }, (_, i) => {
        const n = names[i] || ''
        const avatar = avatarForName(n)
        const init = initials(n)

        return (
          <div key={i} className="playerItem">
            {/* Avatar (randomized by name, stable) */}
            <div className="playerAvatar" aria-hidden="true">
              {avatar}
            </div>

            <div className="playerInput">
              <div className="playerMeta">
                <div className="playerLabel">{t('player.label', { n: i + 1 })}</div>
              </div>
              <input
                type="text"
                value={n}
                onChange={(e) => onChangeName(i, e.target.value)}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
