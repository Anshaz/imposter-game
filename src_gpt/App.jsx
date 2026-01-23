import React from 'react'
import AppShell from './components/AppShell'
import Modal from './components/Modal'
import { PHASE, useImposterGame } from './hooks/useImposterGame'
import SetupScreen from './screens/SetupScreen'
import WordScreen from './screens/WordScreen'
import PassScreen from './screens/PassScreen'
import RevealScreen from './screens/RevealScreen'
import DoneScreen from './screens/DoneScreen'

export default function App() {
  const { state, derived, actions } = useImposterGame()

  const onReset = () => {
    actions.openDialog({
      title: 'Reset game?',
      message: 'This will clear the current round and go back to setup.',
      actions: [
        { label: 'Cancel', variant: 'ghost', onClick: actions.closeDialog },
        {
          label: 'Reset',
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
      {state.phase === PHASE.DONE && <DoneScreen derived={derived} actions={actions} />}

      <Modal
        open={!!state.ui.dialog}
        title={state.ui.dialog?.title || ''}
        message={state.ui.dialog?.message || ''}
        actions={state.ui.dialog?.actions || []}
        onClose={actions.closeDialog}
      />
    </AppShell>
  )
}
