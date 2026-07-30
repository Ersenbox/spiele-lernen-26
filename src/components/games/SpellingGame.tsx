import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';
import { playPopSound, playSuccessSound, triggerConfetti, speakText } from '../../utils/audio';
import { ArrowLeft, CheckCircle2, RefreshCw, Sparkles, Volume2 } from 'lucide-react';

interface SpellingGameProps {
  language: Language;
  onBack: () => void;
  onReward: (coins: number, stars: number) => void;
}

const SPELLING_WORDS = [
  { word: 'BEE', icon: '🐝', name: { DE: 'Biene', TR: 'Arı', EN: 'Bee', FR: 'Abeille' } },
  { word: 'CAT', icon: '🐱', name: { DE: 'Katze', TR: 'Kedi', EN: 'Cat', FR: 'Chat' } },
  { word: 'DOG', icon: '🐶', name: { DE: 'Hund', TR: 'Köpek', EN: 'Dog', FR: 'Chien' } },
  { word: 'BEAR', icon: '🐻', name: { DE: 'Bär', TR: 'Ayı', EN: 'Bear', FR: 'Ours' } },
  { word: 'FOX', icon: '🦊', name: { DE: 'Fuchs', TR: 'Tilki', EN: 'Fox', FR: 'Renard' } },
  { word: 'MONKEY', icon: '🐒', name: { DE: 'Affe', TR: 'Maymun', EN: 'Monkey', FR: 'Singe' } },
];

const LETTER_PAIRS = [
  { left: 'A', right: 'a', id: 'a' },
  { left: 'B', right: 'b', id: 'b' },
  { left: 'C', right: 'c', id: 'c' },
  { left: 'D', right: 'd', id: 'd' },
];

export const SpellingGame: React.FC<SpellingGameProps> = ({
  language,
  onBack,
  onReward,
}) => {
  const t = translations[language];
  const [subMode, setSubMode] = useState<'matching' | 'spelling' | 'puzzle'>('spelling');

  // Spelling state
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const currentWordObj = SPELLING_WORDS[currentWordIdx];
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [shuffledTiles, setShuffledTiles] = useState<string[]>(() => {
    return currentWordObj.word.split('').sort(() => Math.random() - 0.5);
  });
  const [isSpelledComplete, setIsSpelledComplete] = useState(false);

  // Line matching state
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [connectedPairs, setConnectedPairs] = useState<string[]>([]);

  // Puzzle state
  const [puzzlePlaced, setPuzzlePlaced] = useState<boolean[]>([false, false, false]);

  const loadWord = (idx: number) => {
    setCurrentWordIdx(idx);
    const target = SPELLING_WORDS[idx].word;
    setPlacedLetters([]);
    setShuffledTiles(target.split('').sort(() => Math.random() - 0.5));
    setIsSpelledComplete(false);
  };

  const handleTileClick = (letter: string, index: number) => {
    if (isSpelledComplete) return;
    playPopSound();
    speakText(letter, language);

    const newPlaced = [...placedLetters, letter];
    setPlacedLetters(newPlaced);
    const newTiles = [...shuffledTiles];
    newTiles.splice(index, 1);
    setShuffledTiles(newTiles);

    const targetWord = currentWordObj.word;
    if (newPlaced.join('') === targetWord) {
      setIsSpelledComplete(true);
      playSuccessSound();
      triggerConfetti();
      speakText(currentWordObj.name[language], language);
      onReward(3, 2);
    }
  };

  const handleResetSpelling = () => {
    loadWord(currentWordIdx);
  };

  const handleNextWord = () => {
    const nextIdx = (currentWordIdx + 1) % SPELLING_WORDS.length;
    loadWord(nextIdx);
  };

  // Line matching handler
  const handleLeftSelect = (letter: string) => {
    playPopSound();
    speakText(letter, language);
    setSelectedLeft(letter);
  };

  const handleRightSelect = (letter: string, pairId: string) => {
    playPopSound();
    speakText(letter, language);
    if (selectedLeft && selectedLeft.toLowerCase() === pairId) {
      if (!connectedPairs.includes(pairId)) {
        const updated = [...connectedPairs, pairId];
        setConnectedPairs(updated);
        setSelectedLeft(null);
        playSuccessSound();
        if (updated.length === LETTER_PAIRS.length) {
          triggerConfetti();
          onReward(5, 3);
        }
      }
    } else {
      setSelectedLeft(null);
    }
  };

  // Puzzle piece placement
  const handlePlacePuzzlePiece = (idx: number) => {
    playPopSound();
    const newPieces = [...puzzlePlaced];
    newPieces[idx] = true;
    setPuzzlePlaced(newPieces);
    if (newPieces.every(Boolean)) {
      playSuccessSound();
      triggerConfetti();
      speakText('Monkey Puzzle', language);
      onReward(5, 3);
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
          <span>{t.spellingGame.title}</span>
        </h2>

        {/* Submode Switcher Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-700 p-1.5 rounded-2xl gap-1">
          <button
            onClick={() => setSubMode('spelling')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              subMode === 'spelling'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {t.spellingGame.spellTheWord}
          </button>
          <button
            onClick={() => setSubMode('matching')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              subMode === 'matching'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {t.spellingGame.matchLetters}
          </button>
          <button
            onClick={() => setSubMode('puzzle')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              subMode === 'puzzle'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            Puzzle
          </button>
        </div>
      </div>

      {/* Main Game Card */}
      <div className="bg-gradient-to-b from-sky-100 to-emerald-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-300/60 relative overflow-hidden min-h-[420px] flex flex-col items-center justify-center">

        {/* MODE 1: SPELL THE WORD */}
        {subMode === 'spelling' && (
          <div className="w-full flex flex-col items-center gap-6">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              {t.spellingGame.arrangeLettersInstruction}
            </p>

            {/* Animal Card & Speech */}
            <div className="relative group flex flex-col items-center">
              <div 
                onClick={() => speakText(currentWordObj.name[language], language)}
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-white dark:bg-slate-800 border-4 border-amber-400 shadow-xl flex items-center justify-center text-7xl sm:text-8xl cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <span>{currentWordObj.icon}</span>
              </div>
              <button
                onClick={() => speakText(currentWordObj.name[language], language)}
                className="mt-3 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 text-amber-950 font-bold text-sm shadow-md hover:bg-amber-500"
              >
                <Volume2 className="w-4 h-4" />
                <span>{currentWordObj.name[language]}</span>
              </button>
            </div>

            {/* Placed Word Slot Boxes */}
            <div className="flex items-center justify-center gap-3">
              {currentWordObj.word.split('').map((_, idx) => {
                const char = placedLetters[idx];
                return (
                  <div
                    key={idx}
                    className={`w-14 h-16 sm:w-16 sm:h-20 rounded-2xl border-4 flex items-center justify-center text-3xl font-black shadow-inner transition-all ${
                      char
                        ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 animate-scaleUp'
                        : 'border-dashed border-amber-300 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60'
                    }`}
                  >
                    {char || ''}
                  </div>
                );
              })}
            </div>

            {/* Tile Selection */}
            {!isSpelledComplete ? (
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                {shuffledTiles.map((letter, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTileClick(letter, idx)}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-black text-2xl shadow-lg border-2 border-white transition-all transform hover:-translate-y-1"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 mt-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-white/90 dark:bg-slate-800 px-6 py-3 rounded-2xl border-2 border-emerald-400 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>{t.spellingGame.spelledSuccess} (+3 Münzen)</span>
                </div>
                <button
                  onClick={handleNextWord}
                  className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg shadow-xl transition-all active:scale-95 flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Nächstes Wort!</span>
                </button>
              </div>
            )}

            {/* Reset Button */}
            {!isSpelledComplete && placedLetters.length > 0 && (
              <button
                onClick={handleResetSpelling}
                className="mt-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Neu anfangen</span>
              </button>
            )}
          </div>
        )}

        {/* MODE 2: MATCH LETTERS (Line Connecting) */}
        {subMode === 'matching' && (
          <div className="w-full max-w-lg flex flex-col items-center gap-6">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 text-center">
              {t.spellingGame.connectDotsInstruction}
            </p>

            <div className="w-full grid grid-cols-2 gap-8 bg-white/90 dark:bg-slate-800/90 p-6 rounded-3xl border-4 border-amber-300/70 shadow-xl">
              {/* Left Column (Uppercase) */}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase text-slate-400 text-center">Großbuchstaben</span>
                {LETTER_PAIRS.map((pair) => {
                  const isDone = connectedPairs.includes(pair.id);
                  const isSelected = selectedLeft === pair.left;
                  return (
                    <button
                      key={pair.left}
                      onClick={() => !isDone && handleLeftSelect(pair.left)}
                      disabled={isDone}
                      className={`h-14 rounded-2xl font-black text-2xl flex items-center justify-center transition-all shadow-md border-2 ${
                        isDone
                          ? 'bg-emerald-400 text-white border-emerald-500 opacity-60'
                          : isSelected
                          ? 'bg-amber-400 text-amber-950 border-amber-600 scale-105 ring-4 ring-amber-300/50'
                          : 'bg-sky-100 dark:bg-slate-700 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-slate-600 hover:bg-sky-200'
                      }`}
                    >
                      {pair.left}
                    </button>
                  );
                })}
              </div>

              {/* Right Column (Lowercase) */}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase text-slate-400 text-center">Kleinbuchstaben</span>
                {LETTER_PAIRS.slice().reverse().map((pair) => {
                  const isDone = connectedPairs.includes(pair.id);
                  return (
                    <button
                      key={pair.right}
                      onClick={() => handleRightSelect(pair.right, pair.id)}
                      disabled={isDone}
                      className={`h-14 rounded-2xl font-black text-2xl flex items-center justify-center transition-all shadow-md border-2 ${
                        isDone
                          ? 'bg-emerald-400 text-white border-emerald-500 opacity-60'
                          : 'bg-purple-100 dark:bg-slate-700 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-slate-600 hover:bg-purple-200'
                      }`}
                    >
                      {pair.right}
                    </button>
                  );
                })}
              </div>
            </div>

            {connectedPairs.length === LETTER_PAIRS.length && (
              <div className="animate-bounce-short text-emerald-600 font-extrabold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>{t.completed} (+5 Münzen)</span>
              </div>
            )}
          </div>
        )}

        {/* MODE 3: WOODEN ANIMAL PUZZLE */}
        {subMode === 'puzzle' && (
          <div className="w-full max-w-md flex flex-col items-center gap-6">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 text-center">
              Füge die 3 Teile des Affen-Puzzles zusammen!
            </p>

            <div className="w-full bg-amber-950 p-6 rounded-3xl border-8 border-amber-800 shadow-2xl flex flex-col items-center gap-3">
              <span className="text-amber-200 font-black text-xl tracking-wide uppercase">Letter 'M' Monkey</span>

              {/* Wooden Frame Slots */}
              <div className="w-full h-64 bg-amber-900/60 rounded-2xl border-4 border-dashed border-amber-700 p-2 flex flex-col gap-2">
                {[0, 1, 2].map((idx) => (
                  <div
                    key={idx}
                    onClick={() => !puzzlePlaced[idx] && handlePlacePuzzlePiece(idx)}
                    className={`flex-1 rounded-xl flex items-center justify-center font-extrabold text-2xl transition-all cursor-pointer border-2 ${
                      puzzlePlaced[idx]
                        ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 border-amber-300 shadow-md'
                        : 'bg-amber-950/40 border-amber-700 text-amber-500/50 hover:bg-amber-800/40'
                    }`}
                  >
                    {puzzlePlaced[idx] ? (
                      idx === 0 ? '🐵 MONKEY TOP' : idx === 1 ? '🍌 MIDDLE LETTER M' : '🌴 BOTTOM PUZZLE'
                    ) : (
                      `Teil ${idx + 1} hier einsetzen`
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Available Pieces */}
            <div className="flex gap-3">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  disabled={puzzlePlaced[idx]}
                  onClick={() => handlePlacePuzzlePiece(idx)}
                  className={`px-4 py-3 rounded-2xl font-extrabold text-xs shadow-lg border-2 transition-all ${
                    puzzlePlaced[idx]
                      ? 'bg-slate-300 text-slate-500 border-slate-400 opacity-50 cursor-not-allowed'
                      : 'bg-amber-400 text-amber-950 border-amber-300 hover:bg-amber-300 active:scale-95'
                  }`}
                >
                  Puzzleteil {idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
