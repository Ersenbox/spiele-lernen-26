import React, { useState } from 'react';
import { Language, ToyItem } from '../../types';
import { translations } from '../../utils/translations';
import { playPopSound, playUnboxSound, playToySound, triggerConfetti, speakText } from '../../utils/audio';
import { ArrowLeft, Gift, Sparkles, Lock, Volume2, Coins } from 'lucide-react';

interface SurpriseToyRoomProps {
  language: Language;
  onBack: () => void;
  coins: number;
  onSpendCoins: (amount: number) => boolean;
}

const INITIAL_TOYS: ToyItem[] = [
  { id: 'duck', name: { DE: 'Quietscheente', TR: 'Ördek', EN: 'Rubber Duck', FR: 'Canard' }, icon: '🦆', unlocked: true, cost: 5, category: 'toys', soundFreq: 520 },
  { id: 'bear', name: { DE: 'Teddybär', TR: 'Oyuncak Ayı', EN: 'Teddy Bear', FR: 'Ours en Peluche' }, icon: '🧸', unlocked: true, cost: 5, category: 'toys', soundFreq: 330 },
  { id: 'chicken', name: { DE: 'Kükense', TR: 'Tavuk', EN: 'Toy Chicken', FR: 'Poulet' }, icon: '🐔', unlocked: true, cost: 5, category: 'animals', soundFreq: 640 },
  { id: 'boat', name: { DE: 'Segelboot', TR: 'Yelkenli', EN: 'Sailboat', FR: 'Voilier' }, icon: '⛵', unlocked: false, cost: 5, category: 'vehicles', soundFreq: 400 },
  { id: 'bucket', name: { DE: 'Strandeimer', TR: 'Plaj Kovası', EN: 'Beach Bucket', FR: 'Seau' }, icon: '🪣', unlocked: false, cost: 5, category: 'toys', soundFreq: 480 },
  { id: 'turtle', name: { DE: 'Schildkröte', TR: 'Kaplumbağa', EN: 'Turtle', FR: 'Tortue' }, icon: '🐢', unlocked: false, cost: 5, category: 'animals', soundFreq: 360 },
  { id: 'car', name: { DE: 'Spielzeugauto', TR: 'Araba', EN: 'Toy Car', FR: 'Voiture' }, icon: '🚗', unlocked: false, cost: 5, category: 'vehicles', soundFreq: 580 },
  { id: 'drum', name: { DE: 'Trommel', TR: 'Davul', EN: 'Toy Drum', FR: 'Tambour' }, icon: '🥁', unlocked: false, cost: 5, category: 'music', soundFreq: 220 },
  { id: 'rocket', name: { DE: 'Rakete', TR: 'Roket', EN: 'Rocket', FR: 'Fusée' }, icon: '🚀', unlocked: false, cost: 5, category: 'vehicles', soundFreq: 880 },
  { id: 'ufo', name: { DE: 'UFO', TR: 'UFO', EN: 'UFO', FR: 'OVNI' }, icon: '🛸', unlocked: false, cost: 5, category: 'vehicles', soundFreq: 950 },
  { id: 'robot', name: { DE: 'Roboter', TR: 'Robot', EN: 'Robot', FR: 'Robot' }, icon: '🤖', unlocked: false, cost: 5, category: 'toys', soundFreq: 750 },
  { id: 'horse', name: { DE: 'Schaukelpferd', TR: 'Sallanan At', EN: 'Rocking Horse', FR: 'Cheval à Bascule' }, icon: '🎠', unlocked: false, cost: 5, category: 'toys', soundFreq: 440 },
];

export const SurpriseToyRoom: React.FC<SurpriseToyRoomProps> = ({
  language,
  onBack,
  coins,
  onSpendCoins,
}) => {
  const t = translations[language];
  const [toys, setToys] = useState<ToyItem[]>(INITIAL_TOYS);
  const [isUnboxing, setIsUnboxing] = useState(false);
  const [newlyUnlockedToy, setNewlyUnlockedToy] = useState<ToyItem | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleOpenGiftBox = () => {
    const lockedToys = toys.filter((t) => !t.unlocked);
    if (lockedToys.length === 0) {
      setMessage('Du hast bereits alle Spielzeuge gesammelt! Super!');
      return;
    }

    const success = onSpendCoins(5);
    if (!success) {
      setMessage(t.surprisesRoom.needMoreCoins);
      playPopSound();
      return;
    }

    setMessage(null);
    setIsUnboxing(true);
    playUnboxSound();

    setTimeout(() => {
      // Select random locked toy
      const randomToy = lockedToys[Math.floor(Math.random() * lockedToys.length)];
      const updated = toys.map((t) => (t.id === randomToy.id ? { ...t, unlocked: true } : t));

      setToys(updated);
      setNewlyUnlockedToy(randomToy);
      setIsUnboxing(false);
      triggerConfetti();
      playToySound(randomToy.soundFreq || 500);
      speakText(randomToy.name[language], language);
    }, 1800);
  };

  const handleToyClick = (toy: ToyItem) => {
    if (!toy.unlocked) return;
    playPopSound();
    playToySound(toy.soundFreq || 440);
    speakText(toy.name[language], language);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col gap-6 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 dark:bg-slate-800/80 p-4 rounded-3xl shadow-lg border-2 border-amber-300/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.backToMenu}</span>
        </button>

        <h2 className="text-xl sm:text-2xl font-black text-amber-900 dark:text-amber-300 flex items-center gap-2">
          <span>🎁 {t.surprisesRoom.title}</span>
        </h2>

        {/* Gift Box Button */}
        <button
          onClick={handleOpenGiftBox}
          disabled={isUnboxing}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm shadow-xl transition-all active:scale-95 ${
            isUnboxing
              ? 'bg-amber-300 text-amber-900 animate-pulse'
              : 'bg-gradient-to-r from-amber-400 to-orange-500 text-amber-950 border-2 border-white hover:scale-105'
          }`}
        >
          <Gift className="w-5 h-5 text-amber-950" />
          <span>{t.surprisesRoom.openGift}</span>
        </button>
      </div>

      {message && (
        <div className="bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 p-3 rounded-2xl text-center text-xs font-bold border border-rose-300">
          {message}
        </div>
      )}

      {/* Unboxing Modal Overlay */}
      {isUnboxing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="flex flex-col items-center gap-4 text-white">
            <div className="text-9xl animate-bounce-short">🎁</div>
            <span className="text-2xl font-black tracking-wider text-yellow-300 animate-pulse">
              Geschenk wird geöffnet...
            </span>
          </div>
        </div>
      )}

      {/* Newly Unlocked Modal */}
      {newlyUnlockedToy && !isUnboxing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-4 border-amber-400 shadow-2xl flex flex-col items-center gap-4 max-w-xs text-center">
            <Sparkles className="w-10 h-10 text-yellow-500 animate-spin-slow" />
            <span className="text-8xl animate-bounce-short">{newlyUnlockedToy.icon}</span>
            <h3 className="text-xl font-black text-amber-900 dark:text-amber-300">
              {newlyUnlockedToy.name[language]}
            </h3>
            <p className="text-xs font-semibold text-slate-500">Neues Spielzeug freigeschaltet!</p>
            <button
              onClick={() => setNewlyUnlockedToy(null)}
              className="mt-2 w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm shadow-md"
            >
              Aufs Regal stellen!
            </button>
          </div>
        </div>
      )}

      {/* 3-Tier Wooden Shelf Display (Screenshot 5 visual replica) */}
      <div className="w-full bg-gradient-to-b from-amber-900 via-amber-950 to-amber-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-8 border-amber-950 flex flex-col gap-8">
        <div className="text-center text-amber-200 font-black text-lg sm:text-xl tracking-wider uppercase border-b-2 border-amber-700/60 pb-3 flex items-center justify-center gap-2">
          <span>🏆 {t.surprisesRoom.shelfTitle}</span>
          <span className="text-xs bg-amber-800 px-3 py-1 rounded-full text-amber-100">
            {toys.filter((t) => t.unlocked).length} / {toys.length}
          </span>
        </div>

        {/* 3 Shelves Rows */}
        {[0, 1, 2].map((shelfIdx) => {
          const shelfToys = toys.slice(shelfIdx * 4, shelfIdx * 4 + 4);
          return (
            <div key={shelfIdx} className="relative flex flex-col gap-2">
              {/* Toys placed on shelf */}
              <div className="grid grid-cols-4 gap-4 px-4 min-h-[90px] items-end">
                {shelfToys.map((toy) => (
                  <div
                    key={toy.id}
                    onClick={() => handleToyClick(toy)}
                    className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
                      toy.unlocked
                        ? 'bg-amber-900/60 hover:bg-amber-800/80 border-2 border-amber-500/50 hover:scale-110 shadow-lg'
                        : 'bg-amber-950/80 border border-amber-900/40 opacity-50'
                    }`}
                  >
                    {toy.unlocked ? (
                      <>
                        <span className="text-4xl sm:text-5xl filter drop-shadow">{toy.icon}</span>
                        <span className="text-[10px] font-bold text-amber-200 mt-1 truncate max-w-full">
                          {toy.name[language]}
                        </span>
                      </>
                    ) : (
                      <div className="flex flex-col items-center py-2 text-amber-600">
                        <Lock className="w-6 h-6 mb-1 opacity-70" />
                        <span className="text-[10px] font-bold">5 Münzen</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Wooden Plank Shelf Bar */}
              <div className="w-full h-5 bg-amber-800 rounded-lg border-2 border-amber-900 shadow-xl flex items-center justify-between px-4">
                <div className="w-3 h-3 rounded-full bg-amber-950 border border-amber-700" />
                <div className="w-3 h-3 rounded-full bg-amber-950 border border-amber-700" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
