import { level9Locales } from '../locales/level9';
import { createLevelConfig } from '../utils/levelHelper';

export const level9 = createLevelConfig(9, level9Locales, {
  requiredTasks: ['analyze_memory', 'extract_info', 'analyze_timeline'],
  fileSystem: {
    '~': ['readme.txt', 'memory.dump', 'analysis.txt', 'tools', 'evidence'],
    '~/tools': ['volatility.exe', 'strings.txt', 'decoder.exe', 'timeline.exe'],
    '~/evidence': ['process.txt', 'network.txt', 'timeline.txt', 'report.md']
  }
}); 