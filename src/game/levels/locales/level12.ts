import { LevelLocales } from "./index";

export const level12Locales: LevelLocales = {
  zh: {
    title: '日志分析',
    description: '系统遭受了复杂的攻击，需要你运用所有掌握的技能来解决问题。',
    objectives: [
      '分析系统当前状态',
      '寻找入侵痕迹',
      '追踪攻击源',
      '恢复系统安全'
    ],
    hints: [
      '先使用 cd logs 进入日志目录',
      '使用 loganalyzer auth.log 分析认证日志',
      '使用 loganalyzer system.log 分析系统日志',
      '完成日志分析后使用 timeline 命令',
      '最后使用 trace 命令追踪IP'
    ],
    fileContents: {
      'readme.txt': '最终挑战：\n系统遭受了复杂的攻击，需要你运用所有掌握的技能来解决问题。\n\n任务步骤：\n1. 分析系统当前状态\n2. 寻找入侵痕迹\n3. 追踪攻击源\n4. 恢复系统安全\n\n可用工具：\n- loganalyzer <日志文件> - 分析日志文件\n- timeline <PID> - 生成完整的事件时间线\n- trace <IP> - 追踪IP\n\n提示：在 logs 目录中有多个需要分析的日志文件',
      'status.log': '系统状态：\n[严重] 多个服务异常\n[警告] 发现未知进程\n[错误] 检测到数据外泄（来自IP：192.168.1.xxx）\n[警告] 网络连接异常',
      'warning.txt': '安全警告：\n1. 系统核心文件被修改\n2. 发现多个后门程序\n3. 管理员密码可能泄露\n4. 防火墙规则被改变',
      'auth.log': '认证日志分析将显示登录尝试和权限提升记录。\n使用 loganalyzer auth.log 查看详细信息。',
      'system.log': '系统日志包含了系统状态和进程信息。\n使用 loganalyzer system.log 查看详细信息。',
      'access.log': '访问日志记录了所有HTTP请求和文件访问。\n使用 loganalyzer access.log 查看详细信息。',
      'error.log': '错误日志包含了所有错误和警告信息。\n使用 loganalyzer error.log 查看详细信息。'
    }
  },
  en: {
    title: 'Log Analysis',
    description: 'The system has suffered a complex attack, you need to use all your skills to solve the problem.',
    objectives: [
      'Analyze current system status',
      'Find intrusion traces',
      'Track attack source',
      'Restore system security'
    ],
    hints: [
      'First use cd logs to enter log directory',
      'Use loganalyzer auth.log to analyze authentication logs',
      'Use loganalyzer system.log to analyze system logs',
      'Use timeline command after log analysis',
      'Finally use trace command to track IP'
    ],
    fileContents: {
      'readme.txt': 'Final Challenge:\nThe system has suffered a complex attack, you need to use all your skills to solve the problem.\n\nTask Steps:\n1. Analyze current system status\n2. Find intrusion traces\n3. Track attack source\n4. Restore system security\n\nAvailable Tools:\n- loganalyzer <logfile> - Analyze log files\n- timeline <PID> - Generate complete event timeline\n- trace <IP> - Track IP\n\nHint: Multiple log files need to be analyzed in logs directory',
      'status.log': 'System Status:\n[CRITICAL] Multiple services abnormal\n[WARNING] Unknown process found\n[ERROR] Data leak detected (from IP: 192.168.1.xxx)\n[WARNING] Network connection anomaly',
      'warning.txt': 'Security Warning:\n1. System core files modified\n2. Multiple backdoors found\n3. Admin password possibly leaked\n4. Firewall rules changed',
      'auth.log': 'Authentication log analysis will show login attempts and privilege escalations.\nUse loganalyzer auth.log to view details.',
      'system.log': 'System log contains system status and process information.\nUse loganalyzer system.log to view details.',
      'access.log': 'Access log records all HTTP requests and file accesses.\nUse loganalyzer access.log to view details.',
      'error.log': 'Error log contains all errors and warnings.\nUse loganalyzer error.log to view details.'
    }
  }
}; 