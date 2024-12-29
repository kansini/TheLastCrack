import { level3Locales } from '../locales/level3';
import { createLevelConfig } from '../utils/levelHelper';

export const level3 = createLevelConfig(3, level3Locales, {
  requiredTasks: ['find_key', 'access_protected'],
  fileSystem: {
    '~': ['readme.txt', 'system', 'personal'],
    '~/system': ['permissions.md', 'access_log.txt', 'protected_data.enc'],
    '~/personal': ['diary.txt', '.private']
  }
}); 