import type { LevelData } from '@/types/game';
import { level1Locales } from '../locales/level1';
import { useLanguageStore } from '@/stores/language';

export const level1: LevelData = {
  id: 1,
  get title() {
    const { currentLanguage } = useLanguageStore();
    return level1Locales[currentLanguage].title;
  },
  get description() {
    const { currentLanguage } = useLanguageStore();
    return level1Locales[currentLanguage].description;
  },
  get objectives() {
    const { currentLanguage } = useLanguageStore();
    return level1Locales[currentLanguage].objectives;
  },
  get hints() {
    const { currentLanguage } = useLanguageStore();
    return level1Locales[currentLanguage].hints;
  },
  requiredTasks: ['read_welcome', 'find_secret'],
  fileSystem: {
    '~': ['welcome.txt', 'documents', '.secret', 'notes', 'tutorial'],
    '~/documents': ['intro.md', 'guide.txt'],
    '~/notes': ['day1.txt', 'reminder.txt'],
    '~/tutorial': ['basic_commands.md', 'tips.txt']
  },
  get fileContents() {
    const { currentLanguage } = useLanguageStore();
    return level1Locales[currentLanguage].fileContents;
  }
}; 