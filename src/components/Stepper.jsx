import React from "react";
import { PHASE } from "../hooks/useImposterGame";
import { useTranslation } from "react-i18next";

// Keep original classNames from index.css: dot + (active|done), stepLabel + active
export default function Stepper({ phase }) {
  const { t } = useTranslation();

  const steps = [
    { id: PHASE.SETUP, label: t("steps.setup") },
    { id: PHASE.WORD, label: t("steps.word") },
    { id: PHASE.PASS, label: t("steps.pass") },
    { id: PHASE.REVEAL, label: t("steps.reveal") },
    { id: PHASE.DISCUSS, label: t("steps.discuss") },
    { id: PHASE.DONE, label: t("steps.done") }
  ];

  const activeIndex = Math.max(0, steps.findIndex((s) => s.id === phase));

  return (
    <div className="stepper" aria-label="Progress">
      {steps.map((s, i) => {
        const isActive = i === activeIndex;
        const isDone = i < activeIndex;

        return (
          <div key={s.id} className="step">
            <div
              className={"dot " + (isActive ? "active" : isDone ? "done" : "")}
              aria-hidden="true"
            />
            <div className={"stepLabel " + (isActive ? "active" : "")}>
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
