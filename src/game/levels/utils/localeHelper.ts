import { useLanguageStore } from '@/stores/language';
import type { LevelLocales } from '../locales';

export function getLocalizedContent<T extends keyof LevelLocales[keyof LevelLocales]>(
  locales: LevelLocales,
  key: T
): LevelLocales[keyof LevelLocales][T] {
  const { currentLanguage } = useLanguageStore();
  return locales[currentLanguage as keyof LevelLocales][key];
} 