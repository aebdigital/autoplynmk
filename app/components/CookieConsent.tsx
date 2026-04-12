"use client";

import { useState, useEffect } from "react";

type Prefs = {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
};

function Toggle({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <p className="font-semibold text-sm text-gray-900">{label}</p>
        <p className="text-gray-500 text-xs mt-1 leading-relaxed">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors mt-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#08a800] ${
          checked ? "bg-[#08a800]" : "bg-gray-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({
    necessary: true,
    statistics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    if (!saved) {
      // slight delay so it doesn't flash immediately on load
      const t = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(t);
    } else {
      setPrefs(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handler = () => setShowSettings(true);
    window.addEventListener("open-cookie-settings", handler);
    return () => window.removeEventListener("open-cookie-settings", handler);
  }, []);

  const save = (p: Prefs) => {
    localStorage.setItem("cookie-consent", JSON.stringify(p));
    setPrefs(p);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => save({ necessary: true, statistics: true, marketing: true });
  const saveSelected = () => save(prefs);

  return (
    <>
      {/* ── BANNER ── */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#111] text-white shadow-2xl border-t border-white/10 animate-[slideUp_0.3s_ease-out]">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex-1">
              <p
                className="font-black uppercase italic text-lg mb-1"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Táto stránka používa cookies
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Používame nevyhnutné cookies pre základnú funkčnosť stránky. So súhlasom aj
                štatistické a marketingové cookies.{" "}
                <button
                  onClick={() => { setShowBanner(false); setShowSettings(true); }}
                  className="text-[#08a800] underline hover:no-underline focus:outline-none"
                >
                  Nastavenia
                </button>
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => { setShowBanner(false); setShowSettings(true); }}
                className="border border-white/30 text-white px-5 py-2 text-sm font-semibold hover:border-white transition-colors"
              >
                Nastavenia
              </button>
              <button
                onClick={acceptAll}
                className="bg-[#08a800] text-white px-6 py-2 text-sm font-bold hover:bg-green-700 transition-colors"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Prijať všetky
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SETTINGS MODAL ── */}
      {showSettings && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          />
          {/* Panel */}
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 z-10">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors text-lg leading-none focus:outline-none"
              aria-label="Zavrieť"
            >
              ✕
            </button>

            <h2
              className="text-2xl font-black uppercase italic mb-1"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Nastavenia cookies
            </h2>
            <div className="w-10 h-1 bg-[#08a800] mb-6" />

            <Toggle
              label="Nevyhnutné cookies"
              description="Zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie). Nie je možné ich vypnúť."
              checked={true}
              disabled
            />
            <Toggle
              label="Štatistické cookies"
              description="Pomáhajú nám pochopiť, ako návštevníci stránku používajú, aby sme mohli jej obsah zlepšovať."
              checked={prefs.statistics}
              onChange={(v) => setPrefs({ ...prefs, statistics: v })}
            />
            <Toggle
              label="Marketingové cookies"
              description="Slúžia na zobrazovanie relevantnej reklamy a sledovanie účinnosti kampaní."
              checked={prefs.marketing}
              onChange={(v) => setPrefs({ ...prefs, marketing: v })}
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveSelected}
                className="flex-1 border-2 border-black text-black font-black text-sm uppercase italic py-2.5 hover:bg-black hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Uložiť výber
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 bg-[#08a800] text-white font-black text-sm uppercase italic py-2.5 hover:bg-green-700 transition-colors"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Prijať všetky
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
