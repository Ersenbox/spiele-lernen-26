export type Language = 'DE' | 'TR' | 'EN' | 'FR';

export type ThemeMode = 'light' | 'dark';

export type ThemePreset = 'playground' | 'pastel' | 'sunset' | 'ocean' | 'neon';

export interface ColorThemeConfig {
  mode: ThemeMode;
  preset: ThemePreset;
  customPrimary: string;
  customBackground: string;
}

export type GameCategory = 
  | 'menu'
  | 'spelling'
  | 'tracing_coloring'
  | 'shapes'
  | 'math_fishing'
  | 'surprises';

export interface LetterTracingData {
  letter: string;
  word: string;
  image: string;
  strokes: { x: number; y: number }[][];
  guideDots: { id: number; x: number; y: number }[];
}

export interface ColoringTemplate {
  id: string;
  title: string;
  letter: string;
  paths: { id: string; d: string; defaultColor: string }[];
}

export interface ToyItem {
  id: string;
  name: { [key in Language]: string };
  icon: string;
  unlocked: boolean;
  cost: number;
  category: 'vehicles' | 'animals' | 'music' | 'toys';
  soundFreq?: number;
}

export interface FishItem {
  id: number;
  number: number;
  color: string;
  x: number;
  y: number;
  speed: number;
  direction: 1 | -1;
}
