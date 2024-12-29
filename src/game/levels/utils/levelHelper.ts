import { useLanguageStore } from '@/stores/language';
import type { LevelLocales } from '../locales';
import type { LevelData } from '@/types/game';

export function createLevelConfig(
  id: number,
  locales: LevelLocales,
  config: Omit<LevelData, 'id' | 'title' | 'description' | 'objectives' | 'hints' | 'fileContents'>
): LevelData {
  return {
    id,
    get title() {
      const { currentLanguage } = useLanguageStore();
      return locales[currentLanguage].title;
    },
    get description() {
      const { currentLanguage } = useLanguageStore();
      return locales[currentLanguage].description;
    },
    get objectives() {
      const { currentLanguage } = useLanguageStore();
      return locales[currentLanguage].objectives;
    },
    get hints() {
      const { currentLanguage } = useLanguageStore();
      return locales[currentLanguage].hints;
    },
    get fileContents() {
      const { currentLanguage } = useLanguageStore();
      return locales[currentLanguage].fileContents;
    },
    ...config
  };
} 