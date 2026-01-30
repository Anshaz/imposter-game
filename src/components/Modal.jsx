import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Keep original classNames from index.css: dialog-content/header/title/close/message/footer
export default function Modal({ open, title, message, actions = [], onClose }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="dialog-overlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={onClose}
    >
      <div className="dialog-content" onMouseDown={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <div className="dialog-title">{title}</div>

          <button
            type="button"
            className="dialog-close"
            onClick={onClose}
            aria-label={t("dialog.close")}
            title={t("dialog.close")}
          >
            ✕
          </button>
        </div>

        <div className="dialog-message">{message}</div>

        <div className="dialog-footer">
          {actions.length > 0 ? (
            actions.map((a, i) => (
              <button
                key={i}
                type="button"
                className={a.variant === "primary" ? "btn primary" : "btn ghost"}
                onClick={a.onClick}
              >
                {a.label}
              </button>
            ))
          ) : (
            <button type="button" className="btn primary" onClick={onClose}>
              {t("dialog.close")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
