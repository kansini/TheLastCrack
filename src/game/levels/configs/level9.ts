import type { LevelData } from '@/types/game';

export const level9: LevelData = {
  id: 9,
  title: '内存取证',
  description: '【第9关】系统内存中可能存在重要的证据，你需要进行内存取证分析。',
  objectives: [
    '获取内存镜像',
    '分析进程信息',
    '提取关键数据',
    '还原事件过程'
  ],
  requiredTasks: ['analyze_memory', 'extract_evidence'],
  fileSystem: {
    '~': ['readme.txt', 'memory.dump', 'analysis.txt'],
    '~/tools': ['volatility.exe', 'strings.txt', 'report.md'],
    '~/evidence': ['process.txt', 'network.txt', 'timeline.txt']
  },
  fileContents: {
    'readme.txt': '内存取证指南：\n1. 使用 volatility 分析内存镜像\n2. 提取进程列表和网络连接\n3. 搜索关键字符串\n4. 构建事件时间线',
    
    'memory.dump': '[二进制数据] 使用 analyze 命令查看内存内容',
    
    'analysis.txt': '初步分析结果：\n1. 发现可疑进程\n2. 检测到加密通信\n3. 内存中存在敏感数据\n4. 时间戳异常',
    
    'volatility.exe': '[工具说明]\n支持以下功能：\n1. 进程列表分析\n2. 网络连接检查\n3. 字符串提取\n4. 时间线构建',
    
    'strings.txt': '内存字符串：\n- admin:password123\n- connect 192.168.1.100\n- download secret.zip\n- delete logs\n...',
    
    'report.md': '分析报告：\n## 可疑行为\n1. 未授权访问\n2. 数据窃取\n3. 日志删除\n\n## 时间线\n10:00 系统登录\n10:15 文件下载\n10:30 日志清理',
    
    'process.txt': '进程列表：\nPID    NAME         CPU   MEM   TIME\n1234   cmd.exe      0%    1MB   10:00\n2345   nc.exe       5%    2MB   10:15\n3456   del.exe      1%    1MB   10:30',
    
    'network.txt': '网络连接：\nLOCAL           REMOTE          STATE\n0.0.0.0:445     192.168.1.100   ESTABLISHED\n0.0.0.0:3389    192.168.1.101   LISTENING',
    
    'timeline.txt': '事件时间线：\n10:00:00 系统启动\n10:00:05 用户登录\n10:15:00 建立网络连接\n10:15:30 文件传输\n10:30:00 日志删除'
  },
  hints: [
    '使用 volatility 工具分析内存镜像',
    '注意进程列表中的可疑程序',
    '检查网络连接的目标地址',
    '分析字符串中的敏感信息',
    '根据时间线还原事件过程'
  ]
}; 