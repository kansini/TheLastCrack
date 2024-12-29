import { level10Locales } from '../locales/level10';
import { createLevelConfig } from '../utils/levelHelper';

export const level10 = createLevelConfig(10, level10Locales, {
  requiredTasks: ['access_chat', 'find_evidence', 'decode_plan'],
  fileSystem: {
    '~': ['readme.txt', 'chat_rooms.txt', 'users.txt', 'logs'],
    '~/logs': ['access.log', 'system.log'] // , '.deleted'
  }
}); 