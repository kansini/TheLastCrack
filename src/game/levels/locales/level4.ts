import { LevelLocales } from "./index";

export const level4Locales: LevelLocales = {
  zh: {
    title: '进程追踪',
    description: '系统中运行着一个可疑进程，你需要追踪并分析它的行为。',
    objectives: [
      '查看系统进程',
      '分析可疑进程',
      '追踪进程行为',
      '终止恶意进程'
    ],
    hints: [
      '使用 ps 命令查看进程列表',
      '注意CPU使用率异常的进程',
      '检查进程的网络连接',
      '分析日志文件中的异常行为',
      '使用 kill 命令终止可疑进程'
    ],
    fileContents: {
      'readme.txt': '系统监控报告：\n发现可疑进程正在运行\n使用 ps 命令查看进程列表\n使用 kill <PID> 终止进程',
      'processes.txt': '进程列表：\nPID    NAME         CPU   MEM\n1234   sysservice   85%   45%\n2345   normal.exe   2%    5%\n3456   update.exe   1%    3%\n\n可疑特征：\n1. CPU使用率异常\n2. 内存占用过高',
      'system_info.log': '系统信息：\n- 操作系统：Linux 5.4\n- 内存：8GB\n- CPU：4核\n\n异常警告：\n- CPU使用率超过80%\n- 网络连接异常',
      'proc/1234.pid': '进程详细信息：\n启动时间：2024-01-01 00:00:00\n父进程：init\n状态：运行中\n\n可疑行为：\n- 高频访问网络\n- 修改系统文件',
      'proc/status.log': '进程状态：\n[警告] PID 1234 行为异常\n[错误] 未经授权的系统调用\n[警告] 可疑的网络连接\n\n处理建议：\n1. 分析进程行为\n2. 确认是否为恶意程序\n3. 必要时终止进程',
      'proc/network.log': '网络连接记录：\nPID 1234 -> 192.168.1.100:8080\nPID 1234 -> 10.0.0.1:443\n\n特征：\n- 高频率连接\n- 未知目标地址',
      'logs/system.log': '系统日志：\n1. 进程创建时间异常\n2. 系统资源占用过高\n3. 需要立即处理',
      'logs/error.log': '错误日志：\n[ERROR] 未授权的系统调用\n[ERROR] 文件访问被拒绝\n[ERROR] 内存使用超限',
      'logs/access.log': '访问记录：\n- /etc/passwd（读取）\n- /var/log（写入）\n- /tmp（执行）\n\n所有操作均由 PID 1234 执行'
    }
  },
  en: {
    title: 'Process Tracking',
    description: 'A suspicious process is running in the system, you need to track and analyze its behavior.',
    objectives: [
      'View system processes',
      'Analyze suspicious process',
      'Track process behavior',
      'Terminate malicious process'
    ],
    hints: [
      'Use ps command to view process list',
      'Notice processes with abnormal CPU usage',
      'Check process network connections',
      'Analyze abnormal behavior in log files',
      'Use kill command to terminate suspicious process'
    ],
    fileContents: {
      'readme.txt': 'System monitoring report:\nSuspicious process detected\nUse ps command to view process list\nUse kill <PID> to terminate process',
      'processes.txt': 'Process list:\nPID    NAME         CPU   MEM\n1234   sysservice   85%   45%\n2345   normal.exe   2%    5%\n3456   update.exe   1%    3%\n\nSuspicious traits:\n1. Abnormal CPU usage\n2. High memory consumption',
      'system_info.log': 'System info:\n- OS: Linux 5.4\n- Memory: 8GB\n- CPU: 4 cores\n\nWarnings:\n- CPU usage over 80%\n- Network connection anomalies',
      'proc/1234.pid': 'Process details:\nStart time: 2024-01-01 00:00:00\nParent: init\nStatus: Running\n\nSuspicious behavior:\n- High frequency network access\n- System file modifications',
      'proc/status.log': 'Process status:\n[WARNING] PID 1234 abnormal behavior\n[ERROR] Unauthorized system calls\n[WARNING] Suspicious network connections\n\nRecommendations:\n1. Analyze process behavior\n2. Confirm if malicious\n3. Terminate if necessary',
      'proc/network.log': 'Network connection records:\nPID 1234 -> 192.168.1.100:8080\nPID 1234 -> 10.0.0.1:443\n\nCharacteristics:\n- High frequency connections\n- Unknown target addresses',
      'logs/system.log': 'System log:\n1. Abnormal process creation time\n2. High system resource usage\n3. Immediate action required',
      'logs/error.log': 'Error log:\n[ERROR] Unauthorized system call\n[ERROR] File access denied\n[ERROR] Memory usage exceeded',
      'logs/access.log': 'Access records:\n- /etc/passwd (read)\n- /var/log (write)\n- /tmp (execute)\n\nAll operations by PID 1234'
    }
  }
}; 