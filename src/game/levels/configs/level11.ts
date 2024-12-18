import type { LevelData } from '@/types/game';

export const level11: LevelData = {
  id: 11,
  title: '系统后门',
  description: '【第11关】系统中被植入了后门程序，你需要找到并清除它。',
  objectives: [
    '定位后门程序',
    '分析后门行为',
    '追踪数据流向',
    '清除后门威胁'
  ],
  requiredTasks: ['analyze_memory', 'find_malware', 'extract_info'],
  fileSystem: {
    '~': ['readme.txt', 'system.log', 'netstat.txt', 'memory'],
    '~/proc': ['services.txt', 'startup.txt', 'scheduled.txt'],
    '~/analysis': ['behavior.log', 'connections.txt', 'report.md'],
    '~/memory': ['snapshot.raw', 'dump.txt', 'analysis_guide.md']
  },
  fileContents: {
    'readme.txt': '后门分析指南：\n1. 检查异常进程\n2. 分析网络连接\n3. 查看启动项\n4. 清理恶意程序\n\n提示：使用内存分析工具查看 snapshot.raw',
    
    'system.log': '系统日志：\n[警告] 发现异常进程\n[警告] 未知网络连接\n[错误] 系统文件被修改\n\n建议：\n1. 检查启动项\n2. 分析网络流量\n3. 分析内存快照',
    
    'netstat.txt': '网络连接：\nPROTO  LOCAL           REMOTE          STATE\nTCP    0.0.0.0:31337    *:*             LISTENING\nTCP    127.0.0.1:31337   192.168.1.100    ESTABLISHED',
    
    'services.txt': '服务列表：\nNAME           STATUS    START   TYPE\nsysservice     Running   Auto    System\nupdate_sys     Running   Auto    System\nbackdoor_srv   Running   Auto    User',
    
    'startup.txt': '启动项：\n1. C:\\Windows\\System32\\svchost.exe\n2. C:\\Program Files\\Startup\\update.exe\n3. C:\\Users\\Admin\\AppData\\Roaming\\service.exe',
    
    'scheduled.txt': '计划任务：\nNAME          SCHEDULE    COMMAND\nSystemUpdate   Daily       C:\\update.exe\nMaintenance   Weekly      C:\\maintenance.exe\nBackup        Monthly     C:\\backup.exe',
    
    'behavior.log': '行为分析：\n1. 定期连接远程服务器\n2. 发送加密数据包\n3. 修改系统文件\n4. 自动重启服务',
    
    'connections.txt': '连接记录：\nTIME            SOURCE          DESTINATION     PORT\n10:00:00        127.0.0.1        192.168.1.100   31337\n10:15:00        127.0.0.1        192.168.1.101   31337\n10:30:00        127.0.0.1        192.168.1.102   31337',
    
    'report.md': '分析报告：\n## 发现\n1. 可疑端口：31337\n2. 异常服务：backdoor_srv\n3. 可疑文件：service.exe\n\n## 建议\n1. 终止可疑进程\n2. 删除启动项\n3. 清理计划任务',

    'analysis_guide.md': '内存分析指南：\n1. 使用 memdump 命令分析内存快照\n2. 使用 strings 命令提取可读字符串\n3. 使用 volatility 命令进行深入分析\n\n注意：snapshot.raw 文件包含了系统的完整内存状态',

    'dump.txt': '内存转储说明：\n1. 快照时间：2024-04-01 10:00:00\n2. 系统状态：运行中\n3. 可疑进程：已发现\n4. 建议使用专业工具分析'
  },
  hints: [
    '检查系统中的异常端口号',
    '留意可疑的服务名称',
    '分析可疑进程的网络连接',
    '查看启动项和计划任务',
    '注意服务的自启动属性',
    '使用内存分析工具检查 snapshot.raw'
  ]
}; 