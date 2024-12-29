import { level7Locales } from '../locales/level7';
import { createLevelConfig } from '../utils/levelHelper';

export const level7 = createLevelConfig(7, level7Locales, {
  requiredTasks: ['get_root', 'read_shadow'],
  fileSystem: {
    '~': ['readme.txt', 'manual.txt', 'debug.log', 'etc'],
    '~/etc': ['passwd', 'shadow']
  }
}); 