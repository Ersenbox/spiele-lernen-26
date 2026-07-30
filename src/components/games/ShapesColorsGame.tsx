import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';
import { playPopSound, playSuccessSound, triggerConfetti, speakText } from '../../utils/audio';
import { ArrowLeft, Sparkles, Volume2, CheckCircle2, RefreshCw } from 'lucide-react';

interface ShapesColorsGameProps {
  language: Language;
  onBack: () => void;
  onReward: (coins: number, stars: number) => void;
}

interface ShapeDef {
  id: string;
  nameKey: keyof typeof translations.DE.shapesGame.shapes;
  icon: string;
  color: string;
  bgGradient: string;
}

const SHAPES_LIST: ShapeDef[] = [
  { id: 'circle', nameKey: 'circle', icon: '🔴', color: '#EF4444', bgGradient: 'from-rose-400 to-red-500' },
  { id: 'star', nameKey: 'star', icon: '⭐', color: '#F59E0B', bgGradient: 'from-amber-300 to-yellow-400' },
  { id: 'oval', nameKey: 'oval', icon: '🟣', color: '#A855F7', bgGradient: 'from-purple-400 to-indigo-500' },
  { id: 'square', nameKey: 'square', icon: '🟦', color: '#3B82F6', bgGradient: 'from-sky-400 to-blue-500' },
  { id: 'triangle', nameKey: 'triangle', icon: '🔺', color: '#10B981', bgGradient: 'from-emerald-400 to-green-500' },
  { id: 'diamond', nameKey: 'diamond', icon: '🔷', color: '#EC4899', bgGradient: 'from-pink-400 to-rose-500' },
];

export const ShapesColorsGame: React.FC<ShapesColorsGameProps> = ({
  language,
  onBack,
  onReward,
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'matching' | 'sandbox'>('matching');

  // Wooden matching state
  const [placedShapes, setPlacedShapes] = useState<Record<string, boolean>>({});
  const [activeDragShape, setActiveDragShape] = useState<string | null>(null);

  // Sandbox bounce states
  const [shapeBounces, setShapeBounces] = useState<Record<string, boolean>>({});

  const handleShapeClick = (shape: ShapeDef) => {
    playPopSound();
    const nameStr = t.shapesGame.shapes[shape.nameKey];
    speakText(nameStr, language);

    // Trigger bounce animation in sandbox
    setShapeBounces((prev) => ({ ...prev, [shape.id]: true }));
    setTimeout(() => {
      setShapeBounces((prev) => ({ ...prev, [shape.id]: false }));
    }, 600);
  };

  const handlePlaceShapeInFrame = (shapeId: string) => {
    if (placedShapes[shapeId]) return;

    playPopSound();
    const shapeObj = SHAPES_LIST.find((s) => s.id === shapeId);
    if (shapeObj) {
      speakText(t.shapesGame.shapes[shapeObj.nameKey], language);
    }

    const updated = { ...placedShapes, [shapeId]: true };
    setPlacedShapes(updated);

    if (Object.keys(updated).length === SHAPES_LIST.length) {
      playSuccessSound();
      triggerConfetti();
      onReward(6, 4);
    }
  };

  const handleResetMatching = () => {
    setPlacedShapes({});
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col gap-6 animate-fadeIn">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 dark:bg-slate-800/80 p-4 rounded-3xl shadow-lg border-2 border-amber-300/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.backToMenu}</span>
        </button>

        <h2 className="text-xl sm:text-2xl font-black text-amber-900 dark:text-amber-300 flex items-center gap-2">
          <span>{t.categories.shapes.title}</span>
        </h2>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-700 p-1.5 rounded-2xl gap-2">
          <button
            onClick={() => setActiveTab('matching')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              activeTab === 'matching'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            🧩 {t.shapesGame.modeMatching}
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              activeTab === 'sandbox'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            🎈 {t.shapesGame.modeSandbox}
          </button>
        </div>
      </div>

      {/* Main Mode View */}
      {activeTab === 'matching' ? (
        <div className="bg-gradient-to-b from-amber-100 to-yellow-200 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400/80 flex flex-col items-center gap-6">
          <p className="text-sm font-bold text-amber-950 dark:text-amber-200 text-center">
            {t.shapesGame.matchShapesInstruction}
          </p>

          {/* Wooden Board Frame Grid */}
          <div className="w-full max-w-3xl bg-amber-900 p-6 sm:p-8 rounded-3xl border-8 border-amber-950 shadow-2xl grid grid-cols-2 sm:grid-cols-3 gap-6">
            {SHAPES_LIST.map((shape) => {
              const isPlaced = placedShapes[shape.id];
              return (
                <div
                  key={shape.id}
                  onClick={() => handlePlaceShapeInFrame(shape.id)}
                  className={`h-32 rounded-2xl border-4 border-dashed border-amber-700/80 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer relative overflow-hidden ${
                    isPlaced
                      ? 'bg-gradient-to-br from-amber-200 to-yellow-300 border-solid border-white shadow-lg animate-scaleUp'
                      : 'bg-amber-950/60 hover:bg-amber-800/40'
                  }`}
                >
                  {isPlaced ? (
                    <>
                      <span className="text-5xl animate-bounce-short">{shape.icon}</span>
                      <span className="text-xs font-black text-amber-950 uppercase tracking-wider">
                        {t.shapesGame.shapes[shape.nameKey]}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl opacity-30 filter grayscale">{shape.icon}</span>
                      <span className="text-[11px] font-bold text-amber-500/80">
                        {t.shapesGame.shapes[shape.nameKey]}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Shape Selector Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 bg-white/90 dark:bg-slate-800/90 p-4 rounded-3xl shadow-xl border-2 border-amber-300">
            {SHAPES_LIST.map((shape) => {
              const isPlaced = placedShapes[shape.id];
              return (
                <button
                  key={shape.id}
                  disabled={isPlaced}
                  onClick={() => handlePlaceShapeInFrame(shape.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-sm shadow-md transition-all border-2 ${
                    isPlaced
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 border-slate-300 opacity-50 cursor-not-allowed'
                      : `bg-gradient-to-r ${shape.bgGradient} text-white border-white hover:scale-105 active:scale-95`
                  }`}
                >
                  <span className="text-xl">{shape.icon}</span>
                  <span>{t.shapesGame.shapes[shape.nameKey]}</span>
                </button>
              );
            })}
          </div>

          {Object.keys(placedShapes).length === SHAPES_LIST.length && (
            <div className="flex flex-col items-center gap-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-extrabold text-xl bg-white/90 dark:bg-slate-800 px-6 py-3 rounded-2xl border-2 border-emerald-400 shadow-lg">
                <CheckCircle2 className="w-6 h-6" />
                <span>{t.wellDone} (+6 Münzen)</span>
              </div>
              <button
                onClick={handleResetMatching}
                className="px-5 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm shadow-md flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Nochmal spielen</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* INTERACTIVE SANDBOX MODE */
        <div className="bg-gradient-to-b from-sky-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-sky-300/60 flex flex-col items-center gap-6 min-h-[440px] relative overflow-hidden">
          <p className="text-sm font-bold text-sky-900 dark:text-sky-200 text-center">
            {t.shapesGame.sandboxInstruction}
          </p>

          {/* Interactive Shape Cards Grid with Smiling Faces */}
          <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-3 gap-6">
            {SHAPES_LIST.map((shape) => {
              const isBouncing = shapeBounces[shape.id];
              return (
                <div
                  key={shape.id}
                  onClick={() => handleShapeClick(shape)}
                  className={`h-40 rounded-3xl bg-gradient-to-br ${shape.bgGradient} p-4 shadow-xl border-4 border-white text-white flex flex-col items-center justify-between cursor-pointer transition-all transform hover:scale-105 active:scale-95 ${
                    isBouncing ? 'animate-bounce-short ring-4 ring-yellow-300' : ''
                  }`}
                >
                  <div className="w-full flex justify-end">
                    <Volume2 className="w-5 h-5 opacity-80" />
                  </div>

                  <div className="relative flex flex-col items-center">
                    <span className="text-6xl drop-shadow-md">{shape.icon}</span>
                    <span className="text-sm font-black tracking-wide mt-1 uppercase text-white drop-shadow">
                      {t.shapesGame.shapes[shape.nameKey]}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold bg-white/30 px-3 py-0.5 rounded-full backdrop-blur-sm">
                    Tippen für Sound
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
