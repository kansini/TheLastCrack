import type { Language } from '@/stores/language';

export interface LevelLocale {
  title: string;
  description: string;
  objectives: string[];
  hints: string[];
  fileContents: Record<string, string>;
}

export type LevelLocales = Record<Language, LevelLocale>; 