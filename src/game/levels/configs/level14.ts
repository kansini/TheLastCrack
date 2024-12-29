import { level14Locales } from '../locales/level14';
import { createLevelConfig } from '../utils/levelHelper';

export const level14 = createLevelConfig(14, level14Locales, {
  requiredTasks: ["find_person", "check_meeting", "read_mail"],
  fileSystem: {
    "~": ["readme.txt", "staff", "meetings", "mails"],
    "~/staff": ["employees.csv", "departments.txt", "access_logs.txt"],
    "~/meetings": ["meeting_2024_01.md", "meeting_2024_02.md", ".private_notes.txt"],
    "~/mails": ["inbox", "sent", "drafts"],
    "~/mails/inbox": ["project_update.eml", "security_alert.eml", "team_notice.eml"],
    "~/mails/sent": ["meeting_summary.eml", "project_plan.eml"],
    "~/mails/drafts": [".secret_memo.txt"]
  }
}); 