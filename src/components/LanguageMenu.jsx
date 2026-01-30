import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Put these files in: src/assets/flags/en.png and src/assets/flags/de.png
import flagEN from "../assets/flags/en.png";
import flagDE from "../assets/flags/de.png";

export default function LanguageMenu() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const lang = i18n.language?.startsWith("de") ? "de" : "en";
  const currentFlag = lang === "de" ? flagDE : flagEN;

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  const setLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="langWrap">
      <button
        type="button"
        className="btn ghost langButton"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Language"
        title="Language"
      >
        <img className="langFlagImg" src={currentFlag} alt="" aria-hidden="true" />
        <span className="langCaret" aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="langMenu" role="menu" aria-label="Language menu">
          <button
            type="button"
            className={"langOption " + (lang === "en" ? "active" : "")}
            role="menuitemradio"
            aria-checked={lang === "en"}
            onClick={() => setLanguage("en")}
            title="English"
          >
            <img className="langOptionImg" src={flagEN} alt="" aria-hidden="true" />
          </button>

          <button
            type="button"
            className={"langOption " + (lang === "de" ? "active" : "")}
            role="menuitemradio"
            aria-checked={lang === "de"}
            onClick={() => setLanguage("de")}
            title="Deutsch"
          >
            <img className="langOptionImg" src={flagDE} alt="" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
