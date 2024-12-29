import { level11Locales } from '../locales/level11';
import { createLevelConfig } from '../utils/levelHelper';

export const level11 = createLevelConfig(11, level11Locales, {
  requiredTasks: ["access_mail", "find_evidence", "decode_secret"],
  fileSystem: {
    "~": ["readme.txt"], // , "mail_server", "notes.txt"
    "~/mail_server": ["inbox", "sent", "draft", "trash"],
    "~/mail_server/inbox": ["alex.mbox", "sarah.mbox", "mike.mbox"],
    "~/mail_server/sent": ["outbox.log"],
    "~/mail_server/draft": [".secret_draft"],
    "~/mail_server/trash": ["deleted.mbox"]
  }
}); 