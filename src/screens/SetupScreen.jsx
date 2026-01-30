import React, { useMemo, useState } from 'react'
import CounterField from '../components/CounterField'
import PlayerListEditor from '../components/PlayerListEditor'
import Modal from '../components/Modal'
import { validateSetup } from '../lib/game'
import { useTranslation } from 'react-i18next'

export default function SetupScreen({ state, actions }) {
  const { t } = useTranslation()
  const maxPlayers = 20
  const [howOpen, setHowOpen] = useState(false)

  const TOKEN_MODE_INFO = (
    <div style={{ display: 'grid', gap: 10, textAlign: 'left' }}>
      <p className="muted" style={{ margin: 0 }}>
        {t('setup.tokenInfo.intro')}
      </p>

      <div style={{ display: 'grid', gap: 8 }}>
        <div>
          <b>{t('setup.tokenInfo.detective')}</b>
          <div className="muted">{t('setup.tokenInfo.detectiveNote')}</div>
        </div>

        <div>
          <b>{t('setup.tokenInfo.mouse')}</b>
          <div className="muted">{t('setup.tokenInfo.mouseNote')}</div>
        </div>

        <div>
          <b>{t('setup.tokenInfo.fox')}</b>
          <div className="muted">{t('setup.tokenInfo.foxNote')}</div>
        </div>
      </div>

      <p className="muted" style={{ margin: 0 }}>
        {t('setup.tokenInfo.tip')}
      </p>
    </div>
  )

  const rawSetupError = useMemo(() => {
    return validateSetup({ players: state.players, imposters: state.imposters, names: state.names })
  }, [state.players, state.imposters, state.names])

  const setupError = useMemo(() => {
    if (!rawSetupError) return null
    const map = {
      'Players must be at least 2.': t('setup.errors.playersMin'),
      'Imposters must be at least 1.': t('setup.errors.impostersMin'),
      'Imposters must not exceed players.': t('setup.errors.impostersMax'),
      'Please enter all player names.': t('setup.errors.namesMissing'),
      'Some player names are duplicates. Please make them unique.': t('setup.errors.namesDup'),
    }
    return map[rawSetupError] || rawSetupError
  }, [rawSetupError, t])

  const canContinue = !setupError

  return (
    <div className="card">
      {/* Title row + How to play */}
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div className="cardTitle" style={{ marginBottom: 0 }}>
          {t('setup.title')}
        </div>

        <button className="link" type="button" onClick={() => setHowOpen(true)}>
          {t('setup.howToPlay')}
        </button>
      </div>

      <CounterField
        label={t('setup.players')}
        value={state.players}
        min={2}
        max={maxPlayers}
        onChange={actions.setPlayers}
        hint={state.tokenMode ? t('setup.tokenHintOn') : []}
      />

      <CounterField
        label={t('setup.imposters')}
        value={state.imposters}
        displayValue={state.surpriseMode ? `` : state.imposters}
        min={1}
        max={Math.max(1, state.players)}
        onChange={actions.setImposters}
        disabled={state.surpriseMode}
        hint={state.surpriseMode ? t('setup.surpriseHintOn') : t('setup.impostersHint')}
      />

      {/* Modes (side-by-side) */}
      <div
        className="modesGrid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          alignItems: 'stretch',
          width: '100%',
        }}
      >
        <div className="input" style={{ marginBottom: 0, width: '100%' }}>
          <div className="toggleRow" style={{ width: '100%' }}>
            <button
              type="button"
              className={'toggle' + (state.surpriseMode ? ' on' : '')}
              onClick={() => actions.setSurpriseMode(!state.surpriseMode)}
              aria-pressed={state.surpriseMode}
              aria-label={t('setup.toggleSurpriseAria')}
            >
              <span className="knob" />
            </button>
            <div className="toggleText">
              <label className="toggleTextSurprise">{t('setup.surpriseMode')}</label>
            </div>
          </div>
        </div>

        <div className="input" style={{ marginBottom: 0, width: '100%' }}>
          <div className="toggleRow" style={{ width: '100%' }}>
            <button
              type="button"
              className={'toggle' + (state.tokenMode ? ' on' : '')}
              onClick={() => {
                const next = !state.tokenMode
                actions.setTokenMode(next)

                if (next) {
                  actions.openDialog({
                    title: t('setup.tokenDialogTitle'),
                    message: TOKEN_MODE_INFO,
                    actions: [
                      {
                        label: t('setup.tokenDialogGotIt'),
                        variant: 'primary',
                        onClick: () => actions.closeDialog(),
                      },
                    ],
                  })
                }
              }}
              aria-pressed={state.tokenMode}
              aria-label={t('setup.toggleTokenAria')}
            >
              <span className="knob" />
            </button>

            <div className="toggleText">
              <label className="toggleTextSurprise">{t('setup.tokenMode')}</label>
            </div>
          </div>
        </div>
      </div>

      <div className="sectionTitle">{t('setup.playerNames')}</div>
      <PlayerListEditor players={state.players} names={state.names} onChangeName={actions.setName} />

      {setupError ? <div className="errorBox">{setupError}</div> : null}

      <div className="row" style={{ marginTop: 16 }}>
        <button
          className="btn primary"
          type="button"
          onClick={actions.goWord}
          disabled={!canContinue}
          title={!canContinue ? t('setup.continueTitleDisabled') : t('setup.continueTitleEnabled')}
        >
          {t('setup.continue')}
        </button>
        <button
          className="btn ghost"
          type="button"
          onClick={() => {
            actions.setPlayers(2)
            actions.setSurpriseMode(false)
            actions.setTokenMode(false)
            actions.setImposters(1)
            actions.setName(0, '')
            actions.setName(1, '')
          }}
        >
          {t('setup.defaults')}
        </button>
      </div>

      <div className="muted" style={{ marginTop: 12 }}>
        {t('setup.nextTip')}
      </div>

      {/* How to play modal */}
      <Modal
        open={howOpen}
        title={t('setup.howModal.title')}
        onClose={() => setHowOpen(false)}
        message={
          <div style={{ display: 'grid', gap: 10, textAlign: 'left' }}>
            <div className="muted" style={{ marginTop: -4 }}>
              {t('setup.howModal.intro')}
            </div>

            <ol style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 10 }}>
              <li>
                <b>{t('setup.howModal.s1Title')}</b> {t('setup.howModal.s1Body')}
                <br />
                <span className="muted">{t('setup.howModal.s1Note')}</span>
              </li>

              <li>
                <b>{t('setup.howModal.s2Title')}</b> {t('setup.howModal.s2Body')}
                <ul style={{ margin: '8px 0 0 0', paddingLeft: 18, display: 'grid', gap: 6 }}>
                  <li>{t('setup.howModal.detective')}</li>
                  <li>{t('setup.howModal.fox')}</li>
                  <li>{t('setup.howModal.mouse')}</li>
                </ul>
              </li>

              <li>
                <b>{t('setup.howModal.s3Title')}</b> {t('setup.howModal.s3Body')}
              </li>

              <li>
                <b>{t('setup.howModal.s4Title')}</b> {t('setup.howModal.s4Body')}
                <br />
                <span className="muted">{t('setup.howModal.s4Note')}</span>
              </li>

              <li>
                <b>{t('setup.howModal.s5Title')}</b> {t('setup.howModal.s5Body')}
              </li>

              <li>
                <b>{t('setup.howModal.s6Title')}</b> {t('setup.howModal.s6Body')}
              </li>
            </ol>

            <div className="muted">
              <b>{t('setup.howModal.houseRules')}</b> {t('setup.howModal.houseRulesBody')}
            </div>
          </div>
        }
      />
    </div>
  )
}
