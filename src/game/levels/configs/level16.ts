import { level16Locales } from '../locales/level16';
import { createLevelConfig } from '../utils/levelHelper';

export const level16 = createLevelConfig(16, level16Locales, {
  requiredTasks: ["read_readme", "find_command", "check_files", "verify_password"],
  fileSystem: {
    "~": ["readme.txt", "notes.txt", "encrypted", "analysis"],
    "~/encrypted": ["memo.txt", "chat_log.txt", "system.log", "hidden"],
    "~/encrypted/hidden": [".secret"],
    "~/analysis": ["report.txt", "timeline.txt", "connections.txt"]
  }
}); 