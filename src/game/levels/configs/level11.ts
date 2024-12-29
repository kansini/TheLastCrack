import { level11Locales } from '../locales/level11';
import { createLevelConfig } from '../utils/levelHelper';

export const level11 = createLevelConfig(11, level11Locales, {
  requiredTasks: ['check_mail', 'find_clues', 'decode_message'],
  fileSystem: {
    '~': ['readme.txt'], // , 'mailbox', 'trash', 'drafts'
    '~/mailbox': ['alex.mbox', 'sarah.mbox', 'mike.mbox'],
    '~/trash': ['.deleted_mail', 'temp.txt'],
    '~/drafts': ['draft1.txt', 'notes.md']
  }
}); 