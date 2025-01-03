import { LevelLocales } from "./index";

export const level6Locales: LevelLocales = {
  zh: {
    title: '网络入侵',
    description: '发现系统遭受网络入侵，需要分析入侵痕迹并找出漏洞。',
    objectives: [
      '分析网络流量',
      '识别攻击特征',
      '定位漏洞位置',
      '加固系统防御'
    ],
    hints: [
      '使用 tcpdump 命令监控网络流量',
      '注意观察可疑的 SYN 包',
      '分析 network.pcap 文件中的攻击特征',
      '查看 alerts.log 了解报警信息',
      '找出攻击源IP和目标端口',
      '使用 tools/restore.exe 恢复系统'
    ],
    fileContents: {
      'readme.txt': '网络安全分析：\n1. 使用 tcpdump 分析网络流量\n2. 检查防火墙日志\n3. 寻找可疑的网络连接\n4. 分析攻击模式',
      'network.pcap': '[二进制数据] 使用 analyze 命令查看内容',
      'alerts.log': '安全警报：\n[警告] 检测到大量 SYN 包\n[警告] 可疑的端口扫描\n[严重] 未授权的访问尝试\n\n建议：\n1. 使用 tcpdump 命令监控流量\n2. 使用 analyze 分析数据包\n3. 更新防火墙规则阻止攻击',
      'restore.exe': '[系统工具] 这是一个系统恢复工具。使用方法：restore'
    }
  },
  en: {
    title: 'Network Intrusion',
    description: 'System has been compromised by network intrusion, analyze the traces and identify vulnerabilities.',
    objectives: [
      'Analyze network traffic',
      'Identify attack patterns',
      'Locate vulnerabilities',
      'Strengthen system defenses'
    ],
    hints: [
      'Use tcpdump command to monitor network traffic',
      'Watch for suspicious SYN packets',
      'Analyze attack patterns in network.pcap file',
      'Check alerts.log for warning information',
      'Identify attack source IP and target ports',
      'Use tools/restore.exe to recover system'
    ],
    fileContents: {
      'readme.txt': 'Network Security Analysis:\n1. Use tcpdump to analyze network traffic\n2. Check firewall logs\n3. Look for suspicious network connections\n4. Analyze attack patterns',
      'network.pcap': '[BINARY DATA] Use analyze command to view contents',
      'alerts.log': 'Security Alerts:\n[WARNING] Large number of SYN packets detected\n[WARNING] Suspicious port scanning\n[CRITICAL] Unauthorized access attempt\n\nRecommendations:\n1. Use tcpdump command to monitor traffic\n2. Use analyze to examine packets\n3. Update firewall rules to block attack',
      'restore.exe': '[SYSTEM TOOL] This is a system recovery tool. Usage: restore'
    }
  }
}; 