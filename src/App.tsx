import React, { useState, useEffect } from 'react';
import { GameCategory, Language, ColorThemeConfig } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ThemeModal, PRESET_THEMES } from './components/ThemeModal';
import { MainDashboard } from './components/MainDashboard';
import { SpellingGame } from './components/games/SpellingGame';
import { ColoringTracingGame } from './components/games/ColoringTracingGame';
import { ShapesColorsGame } from './components/games/ShapesColorsGame';
import { MathFishingGame } from './components/games/MathFishingGame';
import { SurpriseToyRoom } from './components/games/SurpriseToyRoom';

export default function App() {
  const [language, setLanguage] = useState<Language>('DE');
  const [activeCategory, setActiveCategory] = useState<GameCategory>('menu');

  // Theme configuration state - EKLE 2
  const [themeConfig, setThemeConfig] = useState<ColorThemeConfig>({
    mode: 'light',
    preset: 'playground',
    customPrimary: '#3B82F6',
    customBackground: '#F0F9FF',
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  // Rewards state
  const [coins, setCoins] = useState(25);
  const [stars, setStars] = useState(18);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleUpdateThemeConfig = (newPartial: Partial<ColorThemeConfig>) => {
    setThemeConfig((prev) => {
      const updated = { ...prev, ...newPartial };
      // If mode toggled without preset change, set default bg
      if (newPartial.mode && !newPartial.customBackground) {
        const found = PRESET_THEMES.find((pt) => pt.id === updated.preset);
        if (found) {
          updated.customBackground = newPartial.mode === 'dark' ? found.bgDark : found.bgLight;
        }
      }
      return updated;
    });
  };

  const handleReward = (addCoins: number, addStars: number) => {
    setCoins((prev) => prev + addCoins);
    setStars((prev) => prev + addStars);
  };

  const handleSpendCoins = (amount: number): boolean => {
    if (coins >= amount) {
      setCoins((prev) => prev - amount);
      return true;
    }
    return false;
  };

  // Sync html dark mode class
  useEffect(() => {
    const root = document.documentElement;
    if (themeConfig.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeConfig.mode]);

  return (
    <div
      className="min-h-screen flex flex-col font-sans transition-colors duration-300 select-none"
      style={{
        backgroundColor: themeConfig.customBackground,
      }}
    >
      {/* EKLE 4: Persistent Header with Title „Ersenbox -SPIELE LERNEN 26“, Scanner Logo, Flag Switcher, Theme Icon */}
      <Header
        language={language}
        onSelectLanguage={setLanguage}
        themeConfig={themeConfig}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        coins={coins}
        stars={stars}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-6">
        {activeCategory === 'menu' && (
          <MainDashboard
            language={language}
            onSelectCategory={(cat) => setActiveCategory(cat)}
          />
        )}

        {activeCategory === 'spelling' && (
          <SpellingGame
            language={language}
            onBack={() => setActiveCategory('menu')}
            onReward={handleReward}
          />
        )}

        {activeCategory === 'tracing_coloring' && (
          <ColoringTracingGame
            language={language}
            onBack={() => setActiveCategory('menu')}
            onReward={handleReward}
          />
        )}

        {activeCategory === 'shapes' && (
          <ShapesColorsGame
            language={language}
            onBack={() => setActiveCategory('menu')}
            onReward={handleReward}
          />
        )}

        {activeCategory === 'math_fishing' && (
          <MathFishingGame
            language={language}
            onBack={() => setActiveCategory('menu')}
            onReward={handleReward}
          />
        )}

        {activeCategory === 'surprises' && (
          <SurpriseToyRoom
            language={language}
            onBack={() => setActiveCategory('menu')}
            coins={coins}
            onSpendCoins={handleSpendCoins}
          />
        )}
      </main>

      {/* EKLE 5: Persistent Footer with Copyright notice © 2026 ErsenBox — Ersen Bakıcı */}
      <Footer language={language} />

      {/* EKLE 1 & EKLE 2: Theme & Color Customizer Modal */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        config={themeConfig}
        onUpdateConfig={handleUpdateThemeConfig}
        language={language}
      />
    </div>
  );
}
