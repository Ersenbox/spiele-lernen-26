import React from 'react';
import { ColorThemeConfig, ThemePreset, Language } from '../types';
import { translations } from '../utils/translations';
import { X, Sun, Moon, Palette, Check } from 'lucide-react';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ColorThemeConfig;
  onUpdateConfig: (newConfig: Partial<ColorThemeConfig>) => void;
  language: Language;
}

export const PRESET_THEMES: { id: ThemePreset; name: string; primary: string; bgLight: string; bgDark: string }[] = [
  { id: 'playground', name: 'Playground', primary: '#3B82F6', bgLight: '#F0F9FF', bgDark: '#0F172A' },
  { id: 'pastel', name: 'Pastel Dream', primary: '#EC4899', bgLight: '#FDF2F8', bgDark: '#1F121B' },
  { id: 'sunset', name: 'Sunset Warm', primary: '#F97316', bgLight: '#FFF7ED', bgDark: '#1C1917' },
  { id: 'ocean', name: 'Ocean Breeze', primary: '#10B981', bgLight: '#ECFDF5', bgDark: '#064E3B' },
  { id: 'neon', name: 'Neon Fun', primary: '#8B5CF6', bgLight: '#F5F3FF', bgDark: '#1E1B4B' },
];

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  language,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md rounded-3xl p-6 shadow-2xl transition-colors duration-300 border-4 border-amber-300/40"
        style={{
          backgroundColor: config.mode === 'dark' ? '#1E293B' : '#FFFFFF',
          color: config.mode === 'dark' ? '#F8FAFC' : '#0F172A',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎨</span>
            <h2 className="text-xl font-bold tracking-tight">{t.themeCustomizer}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* EKLE 2: Dunkel-/Hellmodus */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
              Modus (Hell / Dunkel)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onUpdateConfig({ mode: 'light' })}
                className={`flex items-center justify-center gap-2 rounded-2xl py-3 px-4 font-medium transition-all border-2 ${
                  config.mode === 'light'
                    ? 'border-amber-400 bg-amber-50 text-amber-900 font-bold shadow-md'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                }`}
              >
                <Sun className="w-5 h-5 text-amber-500" />
                <span>{t.lightMode}</span>
              </button>

              <button
                onClick={() => onUpdateConfig({ mode: 'dark' })}
                className={`flex items-center justify-center gap-2 rounded-2xl py-3 px-4 font-medium transition-all border-2 ${
                  config.mode === 'dark'
                    ? 'border-purple-400 bg-purple-950 text-purple-200 font-bold shadow-md'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                }`}
              >
                <Moon className="w-5 h-5 text-purple-400" />
                <span>{t.darkMode}</span>
              </button>
            </div>
          </div>

          {/* EKLE 2: Preset Color Schemes */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
              {t.presetThemes}
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_THEMES.map((preset) => {
                const isSelected = config.preset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() =>
                      onUpdateConfig({
                        preset: preset.id,
                        customPrimary: preset.primary,
                        customBackground: config.mode === 'dark' ? preset.bgDark : preset.bgLight,
                      })
                    }
                    className={`flex flex-col items-center p-2 rounded-2xl border-2 transition-transform active:scale-95 ${
                      isSelected
                        ? 'border-emerald-500 scale-105 shadow-md bg-emerald-50 dark:bg-emerald-950/40'
                        : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shadow-inner"
                      style={{ backgroundColor: preset.primary }}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </div>
                    <span className="text-[10px] font-semibold mt-1 text-center truncate w-full">
                      {preset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* EKLE 2: Custom Hex Color Code Picker */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
              {t.customHexColor}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-medium block mb-1">{t.primaryColor}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.customPrimary}
                    onChange={(e) => onUpdateConfig({ customPrimary: e.target.value })}
                    className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={config.customPrimary}
                    onChange={(e) => onUpdateConfig({ customPrimary: e.target.value })}
                    className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-medium block mb-1">{t.bgColor}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.customBackground}
                    onChange={(e) => onUpdateConfig({ customBackground: e.target.value })}
                    className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={config.customBackground}
                    onChange={(e) => onUpdateConfig({ customBackground: e.target.value })}
                    className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Palette className="w-5 h-5" />
            <span>{t.apply}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
