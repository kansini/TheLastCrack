import { level13Locales } from '../locales/level13';
import { createLevelConfig } from '../utils/levelHelper';

export const level13 = createLevelConfig(13, level13Locales, {
  requiredTasks: ["server_access", "trojan_planted", "intel_gathered"],
  fileSystem: {
    "~": ["readme.txt", "server_info.txt", "emails", "tools"],
    "~/emails": ["admin_notice.eml", "tech_report.eml", "maintenance.eml"],
    "~/tools": ["remote.exe", "trojan.exe", "decoder.exe"]
  }
}); 