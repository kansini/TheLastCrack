import type { LevelData } from '@/types/game';

export const level6: LevelData = {
  id: 6,
  title: '网络入侵',
  description: '【第6关】发现系统遭受网络入侵，需要分析入侵痕迹并找出漏洞。',
  objectives: [
    '分析网络流量',
    '识别攻击特征',
    '定位漏洞位置',
    '加固系统防御'
  ],
  requiredTasks: ['analyze_traffic', 'find_vulnerability'],
  fileSystem: {
    '~': ['readme.txt', 'network.pcap', 'alerts.log'],
    '~/logs': ['access.log', 'error.log', 'firewall.log'],
    '~/analysis': ['traffic.txt', 'patterns.txt', 'report.md']
  },
  fileContents: {
    'readme.txt': '网络安全分析：\n1. 使用 tcpdump 分析网络流量\n2. 检查防火墙日志\n3. 寻找可疑的网络连接\n4. 分析攻击模式',
    
    'network.pcap': '[二进制数据] 使用 analyze 命令查看内容',
    
    'alerts.log': '安全警报：\n[警告] 检测到大量 SYN 包\n[警告] 可疑的 SQL 注入尝试\n[严重] 未授权的远程访问\n\n建议：\n1. 检查防火墙规则\n2. 更新入侵检测系统',
    
    'access.log': '访问记录：\n192.168.1.100 - - [15/Jan/2024:10:00:01] "GET /admin.php?id=1\' OR \'1\'=\'1" 403\n192.168.1.100 - - [15/Jan/2024:10:00:02] "POST /login.php" 200\n192.168.1.100 - - [15/Jan/2024:10:00:03] "GET /config.php" 404',
    
    'error.log': '错误日志：\n[ERROR] SQL syntax error in \'SELECT * FROM users WHERE id=1 OR 1=1\'\n[ERROR] Failed login attempt from 192.168.1.100\n[ERROR] File not found: config.php',
    
    'firewall.log': '防火墙日志：\nDROP TCP 192.168.1.100:12345 -> 10.0.0.1:80 (SYN flood)\nDROP TCP 192.168.1.100:12346 -> 10.0.0.1:443 (Invalid packet)\nACCEPT TCP 192.168.1.200:54321 -> 10.0.0.1:22 (SSH)',
    
    'traffic.txt': '流量分析：\n1. 发现大量 SYN 包\n2. SQL 注入特征\n3. 目标：管理页面\n4. 攻击源：192.168.1.100',
    
    'patterns.txt': '攻击模式：\n1. 端口扫描\n2. SQL 注入\n3. 暴力破解\n4. DoS 攻击',
    
    'report.md': '分析报告：\n## 攻击特征\n- SYN flood\n- SQL 注入\n- 未授权访问\n\n## 建议\n1. 更新防火墙规则\n2. 修补 SQL 注入漏洞\n3. 限制访问频率'
  },
  hints: [
    '使用 tcpdump 分析可疑的网络流量',
    '检查 access.log 中的异常请求',
    '注意 SQL 注入的特征',
    '分析防火墙日志中的 DROP 记录',
    '查看攻击模式和特征'
  ]
}; 