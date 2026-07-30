import React, { useState } from 'react';
import { Language, ColorThemeConfig } from '../types';
import { translations } from '../utils/translations';
import { Volume2, VolumeX, Star, Coins, Scan, Globe, ChevronDown } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  themeConfig: ColorThemeConfig;
  onOpenThemeModal: () => void;
  coins: number;
  stars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const FLAGS: { code: Language; flag: string; label: string }[] = [
  { code: 'DE', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'TR', flag: '🇹🇷', label: 'Türkçe' },
  { code: 'EN', flag: '🇬🇧', label: 'English' },
  { code: 'FR', flag: '🇫🇷', label: 'Français' },
];

export const Header: React.FC<HeaderProps> = ({
  language,
  onSelectLanguage,
  onOpenThemeModal,
  coins,
  stars,
  soundEnabled,
  onToggleSound,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = translations[language];
  const currentFlag = FLAGS.find((f) => f.code === language) || FLAGS[0];

  return (
    <header className="sticky top-0 z-40 w-full shadow-lg backdrop-blur-md bg-amber-400/95 dark:bg-slate-900/95 text-slate-900 dark:text-white border-b-4 border-amber-500/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Left: App Logo & Persistent Title - EKLE 4 */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-amber-500 text-white shadow-md border-2 border-white/60 animate-bounce-short">
            <Scan className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-950 to-orange-900 dark:from-amber-200 dark:to-orange-400 bg-clip-text text-transparent flex items-center gap-1.5">
              <span>Ersenbox -SPIELE LERNEN 26</span>
            </h1>
            <p className="hidden sm:block text-[11px] font-semibold text-amber-900/80 dark:text-amber-200/80 -mt-0.5">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right Controls: Stats, Theme, Language, Sound */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Star & Coin Counters */}
          <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-2xl border-2 border-amber-300/60 dark:border-slate-700 shadow-sm text-xs sm:text-sm font-bold">
            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Coins className="w-4 h-4 fill-amber-400" />
              <span>{coins}</span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span>{stars}</span>
            </div>
          </div>

          {/* EKLE 1 & EKLE 2: Theme / Farben Icon Palette button (🎨) */}
          <button
            onClick={onOpenThemeModal}
            className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 text-white shadow-md hover:scale-105 active:scale-95 transition-all border-2 border-white/50"
            title={t.themeCustomizer}
          >
            <span className="text-xl">🎨</span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={onToggleSound}
            className={`flex items-center justify-center w-10 h-10 rounded-2xl shadow-md border-2 border-white/50 transition-all ${
              soundEnabled
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-rose-500 text-white hover:bg-rose-600'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* EKLE 3: Mehrsprachigkeit (DE / TR / EN / FR) Dropdown Flag button */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:bg-white transition-all text-xs font-bold"
            >
              <span className="text-lg leading-none">{currentFlag.flag}</span>
              <span className="hidden xs:inline">{currentFlag.code}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-fadeIn">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                  <Globe className="w-3 h-3 inline mr-1" />
                  {t.selectLanguage}
                </div>
                {FLAGS.map((f) => (
                  <button
                    key={f.code}
                    onClick={() => {
                      onSelectLanguage(f.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                      language === f.code
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{f.flag}</span>
                      <span>{f.label}</span>
                    </span>
                    {language === f.code && <span className="text-amber-600">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
