import { level2Locales } from '../locales/level2';
import { createLevelConfig } from '../utils/levelHelper';

export const level2 = createLevelConfig(2, level2Locales, {
  requiredTasks: ['find_password'],
  fileSystem: {
    '~': ['readme.txt', 'documents', 'downloads'],
    '~/documents': ['note.txt', 'temp'],
    '~/documents/temp': ['secret.pass'],
    '~/downloads': ['misc', 'backup'],
    '~/downloads/misc': ['old.txt'],
    '~/downloads/backup': ['data.bak']
  }
}); 