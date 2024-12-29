import { level6Locales } from '../locales/level6';
import { createLevelConfig } from '../utils/levelHelper';

export const level6 = createLevelConfig(6, level6Locales, {
  requiredTasks: ['analyze_traffic', 'find_vulnerability'],
  fileSystem: {
    '~': ['readme.txt', 'network.pcap', 'alerts.log', 'tools'],
    '~/tools': ['restore.exe']
  }
}); 