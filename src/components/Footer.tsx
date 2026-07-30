import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="sticky bottom-0 z-40 w-full shadow-inner bg-amber-400/95 dark:bg-slate-900/95 text-slate-900 dark:text-slate-200 border-t-4 border-amber-500/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold">
        {/* Mandate 5 (EKLE 5): Copyright notice */}
        <div className="flex items-center gap-2 text-amber-950 dark:text-amber-200">
          <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400 animate-spin-slow" />
          <span className="tracking-wide font-bold">{t.copyright}</span>
        </div>

        {/* Subtitle / Encouragement */}
        <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300 text-[11px]">
          <span>Lernen mit Freude und Spiel</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
        </div>
      </div>
    </footer>
  );
};
