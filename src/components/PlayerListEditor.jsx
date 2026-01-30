import React from 'react'
import { useTranslation } from 'react-i18next'

function initials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '🙂'
  const a = parts[0]?.[0] || ''
  const b = parts[1]?.[0] || ''
  return (a + b).toUpperCase()
}

export default function PlayerListEditor({ players, names, onChangeName }) {
  const { t } = useTranslation()

  return (
    <div className="playerList">
      {Array.from({ length: players }, (_, i) => {
        const n = names[i] || ''
        return (
          <div key={i} className="playerItem">
            <div className="playerAvatar" aria-hidden="true">
              {initials(n)}
            </div>
            <div className="playerInput">
              <div className="playerMeta">
                <div className="playerLabel">{t('player.label', { n: i + 1 })}</div>
              </div>
              <input type="text" value={n} onChange={(e) => onChangeName(i, e.target.value)} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
