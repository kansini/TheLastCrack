import { level12Locales } from '../locales/level12';
import { createLevelConfig } from '../utils/levelHelper';

export const level12 = createLevelConfig(12, level12Locales, {
  requiredTasks: ['analyze_logs', 'find_intrusion', 'track_source'],
  fileSystem: {
    '~': ['readme.txt', 'status.log', 'warning.txt', 'logs'],
    '~/logs': ['auth.log', 'system.log', 'access.log', 'error.log']
  }
}); 