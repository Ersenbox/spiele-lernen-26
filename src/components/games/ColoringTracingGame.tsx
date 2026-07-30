import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../../types';
import { translations } from '../../utils/translations';
import { playPopSound, playSuccessSound, triggerConfetti, speakText } from '../../utils/audio';
import { ArrowLeft, RotateCcw, Paintbrush, Eraser, PaintBucket, Sparkles, ChevronLeft, ChevronRight, Volume2, Check } from 'lucide-react';

interface ColoringTracingGameProps {
  language: Language;
  onBack: () => void;
  onReward: (coins: number, stars: number) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const CRAYON_COLORS = [
  '#EF4444', // Red
  '#F97316', // Orange
  '#F59E0B', // Yellow
  '#10B981', // Green
  '#06B6D4', // Cyan
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#78350F', // Brown
  '#000000', // Black
];

export const ColoringTracingGame: React.FC<ColoringTracingGameProps> = ({
  language,
  onBack,
  onReward,
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'tracing' | 'coloring'>('tracing');

  // Tracing State
  const [letterIndex, setLetterIndex] = useState(0);
  const currentLetter = ALPHABET[letterIndex];
  const [tracedScore, setTracedScore] = useState(0);

  // Coloring State
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [selectedTool, setSelectedTool] = useState<'brush' | 'bucket' | 'eraser'>('brush');
  const [brushSize, setBrushSize] = useState(16);

  // Canvas Refs
  const traceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const colorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // History for Undo/Redo in coloring
  const [coloringHistory, setColoringHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);

  // Speech on letter change
  useEffect(() => {
    speakText(`Letter ${currentLetter}`, language);
    resetTraceCanvas();
  }, [currentLetter, activeTab]);

  const resetTraceCanvas = () => {
    const canvas = traceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lined paper background
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    for (let y = 40; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw dashed letter guide
    ctx.font = 'bold 220px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 6;
    ctx.setLineDash([12, 12]);
    ctx.strokeText(currentLetter, canvas.width / 2, canvas.height / 2 + 10);
    ctx.setLineDash([]);
  };

  const handleStartTrace = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const canvas = traceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const handleDrawTrace = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = traceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const handleEndTrace = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      playPopSound();
    }
  };

  const handleFinishTracingLetter = () => {
    playSuccessSound();
    triggerConfetti();
    setTracedScore((prev) => prev + 1);
    onReward(4, 3);
    speakText(`Great job tracing letter ${currentLetter}`, language);
    if (letterIndex < ALPHABET.length - 1) {
      setLetterIndex((prev) => prev + 1);
    }
  };

  // COLORING CANVAS HANDLERS
  const initColoringCanvas = () => {
    const canvas = colorCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw outline cartoon drawing (e.g. Letter + Cute Apple character)
    ctx.font = 'bold 160px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1E293B';
    ctx.fillText(currentLetter, 180, 200);

    // Draw cute smiling fruit outline next to letter
    ctx.beginPath();
    ctx.arc(360, 200, 80, 0, Math.PI * 2);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#1E293B';
    ctx.stroke();

    // Eyes and smile
    ctx.beginPath();
    ctx.arc(335, 180, 8, 0, Math.PI * 2);
    ctx.arc(385, 180, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#1E293B';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(360, 210, 25, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();

    // Save initial state for history
    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setColoringHistory([initialData]);
    setHistoryStep(0);
  };

  useEffect(() => {
    if (activeTab === 'coloring') {
      initColoringCanvas();
    }
  }, [activeTab, currentLetter]);

  const handleColoringStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = colorCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    if (selectedTool === 'bucket') {
      // Paint bucket fill
      ctx.fillStyle = selectedColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Redraw line outline on top
      ctx.font = 'bold 160px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 8;
      ctx.strokeText(currentLetter, 180, 200);

      ctx.beginPath();
      ctx.arc(360, 200, 80, 0, Math.PI * 2);
      ctx.stroke();

      playPopSound();
      saveHistory();
      return;
    }

    isDrawingRef.current = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleColoringMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || selectedTool === 'bucket') return;
    const canvas = colorCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = selectedTool === 'eraser' ? '#FFFFFF' : selectedColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const handleColoringEnd = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      saveHistory();
    }
  };

  const saveHistory = () => {
    const canvas = colorCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = coloringHistory.slice(0, historyStep + 1);
    newHistory.push(currentData);
    setColoringHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyStep > 0) {
      const prevStep = historyStep - 1;
      setHistoryStep(prevStep);
      const canvas = colorCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.putImageData(coloringHistory[prevStep], 0, 0);
      playPopSound();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col gap-6 animate-fadeIn">
      {/* Navigation & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 dark:bg-slate-800/80 p-4 rounded-3xl shadow-lg border-2 border-amber-300/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.backToMenu}</span>
        </button>

        {/* Tab Selector */}
        <div className="flex bg-slate-100 dark:bg-slate-700 p-1.5 rounded-2xl gap-2">
          <button
            onClick={() => setActiveTab('tracing')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'tracing'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <span>✏️ {t.tracingColoring.modeTracing}</span>
          </button>
          <button
            onClick={() => setActiveTab('coloring')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'coloring'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <span>🎨 {t.tracingColoring.modeColoring}</span>
          </button>
        </div>

        {/* Letter Selector Navigator */}
        <div className="flex items-center gap-2 bg-amber-100 dark:bg-slate-700 px-3 py-1.5 rounded-2xl border border-amber-300/60">
          <button
            onClick={() => setLetterIndex((prev) => (prev > 0 ? prev - 1 : ALPHABET.length - 1))}
            className="p-1 rounded-xl hover:bg-amber-200 dark:hover:bg-slate-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-black text-lg text-amber-950 dark:text-amber-200 w-8 text-center">
            {currentLetter}
          </span>
          <button
            onClick={() => setLetterIndex((prev) => (prev < ALPHABET.length - 1 ? prev + 1 : 0))}
            className="p-1 rounded-xl hover:bg-amber-200 dark:hover:bg-slate-600 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Mode Content */}
      {activeTab === 'tracing' ? (
        <div className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300/60 flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-between w-full gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => speakText(`Letter ${currentLetter}`, language)}
                className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 font-black text-xl flex items-center justify-center shadow-md hover:scale-105 active:scale-95"
              >
                <Volume2 className="w-6 h-6" />
              </button>
              <div>
                <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">
                  Write the letter '{currentLetter}'
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.tracingColoring.traceInstruction}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={resetTraceCanvas}
                className="px-4 py-2 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-300"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.clear}</span>
              </button>

              <button
                onClick={handleFinishTracingLetter}
                className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg flex items-center gap-2 active:scale-95"
              >
                <Check className="w-5 h-5" />
                <span>{t.completed}</span>
              </button>
            </div>
          </div>

          {/* Canvas Tracing Area */}
          <div className="relative w-full max-w-lg h-80 bg-white rounded-3xl shadow-xl border-4 border-amber-300 overflow-hidden flex items-center justify-center">
            {/* Guide Step Dots Animation Overlay */}
            <div className="absolute top-4 left-6 flex items-center gap-2 bg-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 animate-bounce-short">
              <span>Nokta 1 ➔ 2 ➔ 3 ➔ 4</span>
            </div>

            <canvas
              ref={traceCanvasRef}
              width={500}
              height={320}
              onMouseDown={handleStartTrace}
              onMouseMove={handleDrawTrace}
              onMouseUp={handleEndTrace}
              onTouchStart={handleStartTrace}
              onTouchMove={handleDrawTrace}
              onTouchEnd={handleEndTrace}
              className="cursor-crosshair touch-none w-full h-full"
            />
          </div>
        </div>
      ) : (
        /* COLORING BOOK MODE */
        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 shadow-2xl border-4 border-emerald-300/60 flex flex-col sm:flex-row gap-6">
          {/* Crayon Color Palette Bar (Left) */}
          <div className="flex sm:flex-col flex-wrap gap-2.5 justify-center bg-white/90 dark:bg-slate-800/90 p-3 rounded-2xl shadow-md border-2 border-emerald-200 dark:border-slate-700">
            {CRAYON_COLORS.map((color) => {
              const isSelected = selectedColor === color && selectedTool !== 'eraser';
              return (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedTool('brush');
                    playPopSound();
                  }}
                  style={{ backgroundColor: color }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl transition-transform border-2 border-white shadow-md flex items-center justify-center ${
                    isSelected ? 'scale-125 ring-4 ring-emerald-400' : 'hover:scale-110'
                  }`}
                >
                  {isSelected && <Check className="w-5 h-5 text-white drop-shadow" />}
                </button>
              );
            })}
          </div>

          {/* Canvas & Tools Center */}
          <div className="flex-1 flex flex-col items-center gap-4">
            <div className="relative w-full max-w-lg h-80 bg-white rounded-3xl shadow-xl border-4 border-emerald-300 overflow-hidden">
              <canvas
                ref={colorCanvasRef}
                width={500}
                height={320}
                onMouseDown={handleColoringStart}
                onMouseMove={handleColoringMove}
                onMouseUp={handleColoringEnd}
                onTouchStart={handleColoringStart}
                onTouchMove={handleColoringMove}
                onTouchEnd={handleColoringEnd}
                className="cursor-crosshair touch-none w-full h-full"
              />
            </div>

            {/* Bottom Toolbar */}
            <div className="flex flex-wrap items-center justify-center gap-3 bg-white/90 dark:bg-slate-800/90 p-3 rounded-2xl shadow-md border-2 border-emerald-200">
              <button
                onClick={() => setSelectedTool('brush')}
                className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  selectedTool === 'brush'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Paintbrush className="w-4 h-4" />
                <span>{t.tracingColoring.crayons}</span>
              </button>

              <button
                onClick={() => setSelectedTool('bucket')}
                className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  selectedTool === 'bucket'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                <PaintBucket className="w-4 h-4" />
                <span>{t.tracingColoring.fillTool}</span>
              </button>

              <button
                onClick={() => setSelectedTool('eraser')}
                className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  selectedTool === 'eraser'
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Eraser className="w-4 h-4" />
                <span>{t.tracingColoring.eraser}</span>
              </button>

              <button
                onClick={handleUndo}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1 hover:bg-slate-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.undo}</span>
              </button>

              {/* Brush size slider */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-300 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-500">Größe</span>
                <input
                  type="range"
                  min={8}
                  max={36}
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-20 accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
