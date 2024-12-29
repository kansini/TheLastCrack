import { level15Locales } from '../locales/level15';
import { createLevelConfig } from '../utils/levelHelper';

export const level15 = createLevelConfig(15, level15Locales, {
  requiredTasks: ["analyze_vuln", "check_service", "exploit_vuln", "get_root"],
  fileSystem: {
    "~": ["readme.txt", "reports" ], // , "services","exploits","root"
    "~/reports": ["vuln_report.txt", "service_scan.txt", "system_info.txt"],
    "~/services": ["running_services.txt", "config", "logs"],
    "~/services/config": ["sshd_config", "apache2.conf", "mysql.cnf"],
    "~/services/logs": ["auth.log", "error.log", "access.log"],
    "~/exploits": ["poc.py", "exploit.py", "payload.txt"],
    "~/root": [".ssh", ".bash_history", ".profile"],
    "~/root/.ssh": ["id_rsa", "id_rsa.pub", "authorized_keys"]
  }
}); 