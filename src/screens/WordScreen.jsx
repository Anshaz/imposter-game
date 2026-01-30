import React, { useMemo } from 'react'
import TextField from '../components/TextField'
import SelectField from '../components/SelectField'
import { useTranslation } from 'react-i18next'
import { WORD_PACKS, getPackById, getAllPackWords, getPackDescription, getPackLabel, getPackOptions } from '../wordPacks'

function packMeta(packId, lang, t) {
  if (packId === 'all') {
    const total = getAllPackWords(lang).length
    return { name: t('packs.allName'), description: t('packs.allDesc'), count: total }
  }
  const p = getPackById(packId)
  const words = p.words?.[lang] || p.words?.en || []
  return { name: getPackLabel(p, lang), description: getPackDescription(p, lang), count: words.length }
}

export default function WordScreen({ state, actions }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('de') ? 'de' : 'en'

  const custom = state.customWord
  const canUseCustom = useMemo(() => custom.trim().length > 0, [custom])

  const meta = useMemo(() => packMeta(state.packId, lang, t), [state.packId, lang, t])
  const options = useMemo(() => getPackOptions(lang, t), [lang, t])

  return (
    <div className="card">
      <div className="cardTitle">{t('word.title')}</div>

      <div className="choiceGrid">
        <div className="choiceCard choiceCard--random" style={{ cursor: 'default' }}>
          <div className="choiceTitle">{t('word.randomTitle')}</div>
          <div className="muted" style={{ marginBottom: 12 }}>
            {t('word.randomDesc')}
          </div>

          <SelectField
            label={t('word.wordPack')}
            value={state.packId}
            onChange={actions.setPack}
            options={options}
            hint={t('word.meta', { desc: meta.description, count: meta.count })}
            right={
              <span className="pill">
                {state.packId === 'all'
                  ? t('word.packsPillMany', { count: WORD_PACKS.length + 1 })
                  : t('word.packsPillOne')}
              </span>
            }
          />

          <button
            type="button"
            className="btn primary btn--random"
            onClick={actions.startRandom}
          >
            {t('word.startRandom')}
          </button>

          <div className="muted" style={{ marginTop: 10 }}>
            {t('word.randomTip')}
          </div>
        </div>

        <div className="choiceCard choiceCard--custom" style={{ cursor: 'default' }}>
          <div className="choiceTitle">{t('word.customTitle')}</div>
          <div className="muted" style={{ marginBottom: 12 }}>
            {t('word.customDesc')}
          </div>

          <TextField
            label={t('word.yourWord')}
            value={custom}
            onChange={actions.setCustomWord}
            placeholder={t('word.placeholder')}
          />

          <button
            type="button"
            className="btn primary btn--custom"
            onClick={() => actions.startCustom(custom)}
            disabled={!canUseCustom}
          >
            {t('word.startCustom')}
          </button>
        </div>
      </div>

      <div className="row" style={{ marginTop: 16 }}>
        <button type="button" className="btn ghost" onClick={actions.goSetup}>
          {t('word.back')}
        </button>
      </div>

      <div className="muted" style={{ marginTop: 12 }}>
        {t('word.headsUp')}
      </div>
    </div>
  )
}
