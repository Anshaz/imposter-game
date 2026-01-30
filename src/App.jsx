import React from 'react'
import AppShell from './components/AppShell'
import Modal from './components/Modal'
import { PHASE, useImposterGame } from './hooks/useImposterGame'
import SetupScreen from './screens/SetupScreen'
import WordScreen from './screens/WordScreen'
import PassScreen from './screens/PassScreen'
import RevealScreen from './screens/RevealScreen'
import DoneScreen from './screens/DoneScreen'
import DiscussScreen from './screens/DiscussScreen'
import { useTranslation } from 'react-i18next'

export default function App() {
  const { t } = useTranslation()
  const { state, derived, actions } = useImposterGame()

  const onReset = () => {
    actions.openDialog({
      title: t('dialog.resetTitle'),
      message: t('dialog.resetMsg'),
      actions: [
        { label: t('dialog.cancel'), variant: 'ghost', onClick: actions.closeDialog },
        {
          label: t('dialog.confirmReset'),
          variant: 'primary',
          onClick: () => {
            actions.closeDialog()
            actions.goSetup()
          },
        },
      ],
    })
  }

  return (
    <AppShell phase={state.phase} onReset={state.phase === PHASE.SETUP ? null : onReset}>
      {state.phase === PHASE.SETUP && <SetupScreen state={state} actions={actions} />}
      {state.phase === PHASE.WORD && <WordScreen state={state} actions={actions} />}
      {state.phase === PHASE.PASS && <PassScreen derived={derived} actions={actions} />}
      {state.phase === PHASE.REVEAL && <RevealScreen derived={derived} actions={actions} />}
      {state.phase === PHASE.DISCUSS && <DiscussScreen derived={derived} actions={actions} />}
      {state.phase === PHASE.DONE && <DoneScreen derived={derived} actions={actions} />}

      <Modal
        open={!!state.ui.dialog}
        title={state.ui.dialog?.title || ''}
        message={state.ui.dialog?.message || ''}
        actions={(state.ui.dialog?.actions || []).map((a) => ({
          ...a,
          onClick: a.onClickId ? () => actions.runDialogAction(a.onClickId) : a.onClick,
        }))}
        onClose={actions.closeDialog}
      />
    </AppShell>
  )
}
