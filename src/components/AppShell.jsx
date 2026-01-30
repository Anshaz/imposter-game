import React from 'react'
import Stepper from './Stepper'
import { useTranslation } from 'react-i18next'
import LanguageMenu from "./LanguageMenu";

export default function AppShell({ phase, children, onReset }) {
  const { t, i18n } = useTranslation()
  const value = i18n.language?.startsWith('de') ? 'de' : 'en'

  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="h1">{t('app.title')}</div>
          <div className="subtitle">{t('app.subtitle')}</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <LanguageMenu />
        </div>
      </header>

      <div className="topRow">
        <Stepper phase={phase} />
        {onReset && (
          <button className="link" type="button" onClick={onReset}>
            {t('app.reset')}
          </button>
        )}
      </div>

      <main>{children}</main>
      <footer className="tiny">© 2026 Anshaj Upadhyaya</footer>
    </div>
  )
}
