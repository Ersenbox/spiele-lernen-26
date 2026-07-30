import React from 'react';
import { GameCategory, Language } from '../types';
import { translations } from '../utils/translations';
import { playPopSound } from '../utils/audio';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

interface MainDashboardProps {
  language: Language;
  onSelectCategory: (cat: GameCategory) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  language,
  onSelectCategory,
}) => {
  const t = translations[language];

  const CARDS: {
    id: GameCategory;
    title: string;
    subtitle: string;
    desc: string;
    icon: string;
    bgGradient: string;
    borderColor: string;
  }[] = [
    {
      id: 'spelling',
      title: t.categories.spelling.title,
      subtitle: t.categories.spelling.subtitle,
      desc: t.categories.spelling.desc,
      icon: '🔤',
      bgGradient: 'from-amber-400 via-orange-400 to-amber-500',
      borderColor: 'border-amber-300',
    },
    {
      id: 'tracing_coloring',
      title: t.categories.tracing_coloring.title,
      subtitle: t.categories.tracing_coloring.subtitle,
      desc: t.categories.tracing_coloring.desc,
      icon: '🎨',
      bgGradient: 'from-emerald-400 via-teal-400 to-emerald-500',
      borderColor: 'border-emerald-300',
    },
    {
      id: 'shapes',
      title: t.categories.shapes.title,
      subtitle: t.categories.shapes.subtitle,
      desc: t.categories.shapes.desc,
      icon: '🧩',
      bgGradient: 'from-purple-400 via-pink-400 to-purple-500',
      borderColor: 'border-purple-300',
    },
    {
      id: 'math_fishing',
      title: t.categories.math_fishing.title,
      subtitle: t.categories.math_fishing.subtitle,
      desc: t.categories.math_fishing.desc,
      icon: '🐻',
      bgGradient: 'from-sky-400 via-blue-500 to-indigo-500',
      borderColor: 'border-sky-300',
    },
    {
      id: 'surprises',
      title: t.categories.surprises.title,
      subtitle: t.categories.surprises.subtitle,
      desc: t.categories.surprises.desc,
      icon: '🎁',
      bgGradient: 'from-pink-400 via-rose-400 to-red-500',
      borderColor: 'border-pink-300',
    },
  ];

  const handleCardClick = (cat: GameCategory) => {
    playPopSound();
    onSelectCategory(cat);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 flex flex-col gap-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 p-6 sm:p-10 shadow-xl border-4 border-amber-300 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center sm:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/40 backdrop-blur-md text-xs font-black uppercase tracking-wider w-fit mx-auto sm:mx-0">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>Vorschul-Welt 2026</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
            Ersenbox - SPIELE LERNEN 26
          </h2>
          <p className="text-sm sm:text-base font-bold text-amber-900 max-w-xl">
            Entdecke ABC Buchstaben, Zahlen, Formen, Malbücher, das Bären-Angelspiel und sammle tolle Spielzeuge!
          </p>
        </div>

        <div className="flex items-center gap-4 text-7xl sm:text-8xl animate-bounce-slow">
          <span>🦊</span>
          <span>🐻</span>
        </div>
      </div>

      {/* 5 Games Grid (Direct replica of Google Play App menu categories) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARDS.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.bgGradient} p-6 text-white shadow-xl border-4 ${card.borderColor} cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl active:scale-98 flex flex-col justify-between min-h-[220px]`}
          >
            {/* Top row icon & play button */}
            <div className="flex items-center justify-between">
              <span className="text-5xl sm:text-6xl drop-shadow-md group-hover:scale-110 transition-transform">
                {card.icon}
              </span>
              <div className="w-10 h-10 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-amber-950 transition-colors shadow-sm">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            </div>

            {/* Text details */}
            <div className="mt-4">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-black/20 px-2.5 py-1 rounded-md inline-block mb-1 backdrop-blur-xs">
                {card.subtitle}
              </span>
              <h3 className="text-xl font-black tracking-tight group-hover:underline decoration-2">
                {card.title}
              </h3>
              <p className="text-xs text-white/90 font-medium mt-1 line-clamp-2">
                {card.desc}
              </p>
            </div>

            {/* Bottom action bar */}
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold">
              <span>Jetzt Spielen</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
