import React, { useState, useEffect } from 'react';
import { Language, FishItem } from '../../types';
import { translations } from '../../utils/translations';
import { playPopSound, playSplashSound, playSuccessSound, triggerConfetti, speakText } from '../../utils/audio';
import { ArrowLeft, Sparkles, Volume2, CheckCircle2, RefreshCw } from 'lucide-react';

interface MathFishingGameProps {
  language: Language;
  onBack: () => void;
  onReward: (coins: number, stars: number) => void;
}

const FISH_COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'];

export const MathFishingGame: React.FC<MathFishingGameProps> = ({
  language,
  onBack,
  onReward,
}) => {
  const t = translations[language];
  const [mode, setMode] = useState<'fishing' | 'numbers' | 'counting'>('fishing');

  // Fishing State
  const [targetNumber, setTargetNumber] = useState(4);
  const [caughtCount, setCaughtCount] = useState(0);
  const [fishes, setFishes] = useState<FishItem[]>([]);

  // Numbers Cards State
  const [selectedNumber, setSelectedNumber] = useState(7);

  // Counting state
  const [countIndex, setCountIndex] = useState(0);
  const COUNT_ITEMS = [
    { target: 1, icon: '🐒', label: 'Monkey' },
    { target: 2, icon: '🐑', label: 'Sheep' },
    { target: 3, icon: '🐄', label: 'Cow' },
    { target: 4, icon: '🐯', label: 'Tiger' },
    { target: 5, icon: '🐶', label: 'Dog' },
  ];

  // Spawn fish for fishing game
  useEffect(() => {
    if (mode === 'fishing') {
      spawnFish();
    }
  }, [mode, targetNumber]);

  const spawnFish = () => {
    const newFishes: FishItem[] = [];
    const nums = [targetNumber, (targetNumber + 2) % 10 + 1, (targetNumber + 5) % 10 + 1, (targetNumber + 7) % 10 + 1];
    nums.forEach((num, idx) => {
      newFishes.push({
        id: idx,
        number: num,
        color: FISH_COLORS[idx % FISH_COLORS.length],
        x: 10 + idx * 22,
        y: 45 + (idx % 2) * 20,
        speed: 0.5 + Math.random() * 0.5,
        direction: 1,
      });
    });
    setFishes(newFishes);
  };

  const handleCatchFish = (fish: FishItem) => {
    playSplashSound();
    speakText(`Number ${fish.number}`, language);

    if (fish.number === targetNumber) {
      playSuccessSound();
      triggerConfetti();
      onReward(4, 2);
      setCaughtCount((prev) => prev + 1);

      // Generate new target number
      const nextTarget = (targetNumber % 9) + 1;
      setTargetNumber(nextTarget);
    } else {
      playPopSound();
    }
  };

  const handleSelectNumber = (num: number) => {
    setSelectedNumber(num);
    playPopSound();
    speakText(String(num), language);
  };

  const handleCountAnswer = (num: number) => {
    playPopSound();
    const current = COUNT_ITEMS[countIndex];
    if (num === current.target) {
      playSuccessSound();
      triggerConfetti();
      onReward(3, 2);
      if (countIndex < COUNT_ITEMS.length - 1) {
        setCountIndex((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col gap-6 animate-fadeIn">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 dark:bg-slate-800/80 p-4 rounded-3xl shadow-lg border-2 border-amber-300/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.backToMenu}</span>
        </button>

        <h2 className="text-xl sm:text-2xl font-black text-amber-900 dark:text-amber-300 flex items-center gap-2">
          <span>{t.categories.math_fishing.title}</span>
        </h2>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-700 p-1.5 rounded-2xl gap-2">
          <button
            onClick={() => setMode('fishing')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              mode === 'fishing'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            🐻 {t.mathGame.modeFishing}
          </button>
          <button
            onClick={() => setMode('numbers')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              mode === 'numbers'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            🔢 {t.mathGame.modeNumbers}
          </button>
          <button
            onClick={() => setMode('counting')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              mode === 'counting'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            🦁 {t.mathGame.modeCounting}
          </button>
        </div>
      </div>

      {/* MODE 1: BEAR FISHING GAME */}
      {mode === 'fishing' && (
        <div className="bg-gradient-to-b from-sky-200 via-sky-300 to-blue-500 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 shadow-2xl border-4 border-sky-400 flex flex-col items-center gap-4 relative overflow-hidden min-h-[440px]">
          {/* Top Banner Target Instruction */}
          <div className="flex flex-wrap items-center justify-between w-full bg-white/90 dark:bg-slate-800/90 px-6 py-3 rounded-2xl border-2 border-sky-300 shadow-md z-10">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {t.mathGame.fishingTarget}
              </span>
              <span className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 font-black text-xl flex items-center justify-center shadow-md animate-bounce-short">
                {targetNumber}
              </span>
            </div>
            <div className="text-xs font-extrabold text-sky-900 dark:text-sky-200">
              {t.mathGame.caughtFish} <span className="text-emerald-600">{caughtCount}</span> 🐟
            </div>
          </div>

          {/* Boat & Bear Illustration Area */}
          <div className="relative w-full h-80 bg-gradient-to-b from-sky-200 to-blue-400 rounded-3xl border-4 border-white/60 shadow-inner overflow-hidden flex flex-col justify-between">
            {/* Sun & Clouds background */}
            <div className="absolute top-4 left-6 text-4xl">☀️</div>
            <div className="absolute top-6 right-10 text-3xl opacity-80">☁️</div>

            {/* Bear in Wooden Boat */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
              <div className="text-6xl animate-bounce-slow">🐻</div>
              <div className="w-36 h-8 bg-amber-800 rounded-b-full border-2 border-amber-950 shadow-lg flex items-center justify-center text-[10px] text-amber-200 font-bold">
                ⛵ Bärenboot
              </div>
            </div>

            {/* Animated Waves & Swimming Fishes */}
            <div className="absolute bottom-0 w-full h-44 bg-blue-500/60 backdrop-blur-xs flex items-center justify-around p-4 border-t-2 border-white/40">
              {fishes.map((fish) => (
                <button
                  key={fish.id}
                  onClick={() => handleCatchFish(fish)}
                  style={{ backgroundColor: fish.color }}
                  className="w-16 h-12 rounded-full text-white font-black text-lg shadow-lg border-2 border-white flex items-center justify-center gap-1 transition-transform hover:scale-110 active:scale-90 animate-bounce-slow cursor-pointer"
                >
                  <span>🐟</span>
                  <span>{fish.number}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: NUMBERS CARDS 1-10 */}
      {mode === 'numbers' && (
        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 flex flex-col items-center gap-6">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
            Tippe auf eine Zahl, um ihren Namen zu hören!
          </p>

          {/* Big Selected Number Banner */}
          <div 
            onClick={() => speakText(String(selectedNumber), language)}
            className="w-44 h-44 rounded-3xl bg-white dark:bg-slate-800 border-4 border-amber-400 shadow-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <span className="text-7xl font-black text-amber-500 drop-shadow-md">
              {selectedNumber}
            </span>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-slate-700 text-amber-900 dark:text-amber-200 font-bold text-xs">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Anhören</span>
            </div>
          </div>

          {/* Numbers 1-10 Selector Grid */}
          <div className="grid grid-cols-5 gap-3 max-w-lg w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => handleSelectNumber(num)}
                className={`h-16 rounded-2xl font-black text-2xl shadow-md transition-all border-2 ${
                  selectedNumber === num
                    ? 'bg-amber-400 text-amber-950 border-amber-600 scale-105 ring-4 ring-amber-300'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-amber-100'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MODE 3: ANIMAL COUNTING GAME */}
      {mode === 'counting' && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-emerald-300 flex flex-col items-center gap-6">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
            {t.mathGame.countAnimals}
          </p>

          {/* Count Container */}
          <div className="w-full max-w-lg bg-white dark:bg-slate-800 p-8 rounded-3xl border-4 border-emerald-400 shadow-xl flex flex-wrap items-center justify-center gap-4 min-h-[160px]">
            {Array.from({ length: COUNT_ITEMS[countIndex].target }).map((_, idx) => (
              <span key={idx} className="text-6xl animate-bounce-short">
                {COUNT_ITEMS[countIndex].icon}
              </span>
            ))}
          </div>

          {/* Options Buttons */}
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => handleCountAnswer(num)}
                className="w-14 h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-2xl shadow-lg border-2 border-white transition-all"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
