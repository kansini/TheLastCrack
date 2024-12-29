import { level4Locales } from '../locales/level4';
import { createLevelConfig } from '../utils/levelHelper';

export const level4 = createLevelConfig(4, level4Locales, {
  requiredTasks: ['analyze_process', 'kill_malware'],
  fileSystem: {
    '~': ['readme.txt', 'processes.txt', 'system_info.log'],
    '~/proc': ['1234.pid', 'status.log', 'network.log'],
    '~/logs': ['system.log', 'error.log', 'access.log']
  }
}); 