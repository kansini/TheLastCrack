import { level5Locales } from '../locales/level5';
import { createLevelConfig } from '../utils/levelHelper';

export const level5 = createLevelConfig(5, level5Locales, {
  requiredTasks: ['connect_server', 'get_data'],
  fileSystem: {
    '~': ['readme.txt', 'network_config.txt', 'connection.log', '.notes.txt']
  }
}); 