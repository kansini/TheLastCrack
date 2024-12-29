import { LevelLocales } from "./index";

export const level8Locales: LevelLocales = {
  zh: {
    title: '网络嗅探',
    description: '系统检测到可疑的网络流量。你需要使用网络分析工具找出数据泄露的证据。',
    objectives: [
      '启动网络监听',
      '捕获可疑数据包',
      '分析数据包内容',
      '阻止数据泄露'
    ],
    hints: [
      '使用 tcpdump 监听端口 31337',
      '查看 traffic.log 了解可疑流量特征',
      '使用 wireshark 分析捕获的数据包',
      '在可疑数据包中寻找密码信息',
      '使用 iptables 阻止数据泄露'
    ],
    fileContents: {
      'readme.txt': '网络分析指南：\n1. 使用 tcpdump 捕获网络数据包\n2. 使用 wireshark 分析数据包内容\n3. 使用 iptables 阻止可疑连接\n\n注意：某些数据包可能包含敏感信息',
      'interfaces.conf': '网卡配置：\neth0: 192.168.1.100\neth1: 10.0.0.100\n\n可疑流量主要现在 eth1',
      'traffic.log': '流量记录：\n[警告] 检测到大量对外连接\n[警告] 端口 31337 有异常流量\n[提示] 使用 tcpdump port 31337 捕获可疑数据包',
      'connections.list': '当前连接：\n192.168.1.100:80 -> 192.168.1.1:80 (HTTP)\n10.0.0.100:31337 -> 10.0.0.1:31337 (未授权协议)',
      'packets.pcap': '[二进制数据包文件]\n需要使用 wireshark 分析',
      'filters.txt': '常用过滤器：\n1. host 10.0.0.1\n2. port 31337\n3. tcp[13] = 0x02\n\n提示：使用tcpdump 捕捉这些过滤器中可疑数据包',
      '.secret_data': '发现数据泄露：\n1. 目标IP: 10.0.0.1\n2. 目标端口: 31337\n3. 泄露内容: 系统密码\n4. 阻止方法: iptables -A OUTPUT -d <目标地址> -j DROP',
      'tcpdump.exe': '[系统工具] 这是一个数据包捕获工具。使用方法：tcpdump <过滤器>',
      'wireshark.exe': '[系统工具] 这是一个数据包分析工具。使用方法：wireshark <文件名>',
      'iptables.exe': '[系统工具] 这是一个防火墙配置工具。使用方法：iptables <规则>'
    }
  },
  en: {
    title: 'Network Sniffing',
    description: 'Suspicious network traffic detected. You need to use network analysis tools to find evidence of data leakage.',
    objectives: [
      'Start network monitoring',
      'Capture suspicious packets',
      'Analyze packet contents',
      'Prevent data leakage'
    ],
    hints: [
      'Use tcpdump to monitor port 31337',
      'Check traffic.log for suspicious traffic patterns',
      'Use wireshark to analyze captured packets',
      'Look for password information in suspicious packets',
      'Use iptables to prevent data leakage'
    ],
    fileContents: {
      'readme.txt': 'Network Analysis Guide:\n1. Use tcpdump to capture network packets\n2. Use wireshark to analyze packet contents\n3. Use iptables to block suspicious connections\n\nNote: Some packets may contain sensitive information',
      'interfaces.conf': 'Network Interface Config:\neth0: 192.168.1.100\neth1: 10.0.0.100\n\nSuspicious traffic mainly on eth1',
      'traffic.log': 'Traffic Log:\n[WARNING] High volume of outbound connections detected\n[WARNING] Abnormal traffic on port 31337\n[HINT] Use tcpdump port 31337 to capture suspicious packets',
      'connections.list': 'Current Connections:\n192.168.1.100:80 -> 192.168.1.1:80 (HTTP)\n10.0.0.100:31337 -> 10.0.0.1:31337 (Unauthorized Protocol)',
      'packets.pcap': '[BINARY PACKET FILE]\nUse wireshark to analyze',
      'filters.txt': 'Common Filters:\n1. host 10.0.0.1\n2. port 31337\n3. tcp[13] = 0x02\n\nHint: Use tcpdump to capture packets matching these filters',
      '.secret_data': 'Data Leak Found:\n1. Target IP: 10.0.0.1\n2. Target Port: 31337\n3. Leaked Content: System Password\n4. Block Method: iptables -A OUTPUT -d <target_ip> -j DROP',
      'tcpdump.exe': '[SYSTEM TOOL] This is a packet capture tool. Usage: tcpdump <filter>',
      'wireshark.exe': '[SYSTEM TOOL] This is a packet analysis tool. Usage: wireshark <filename>',
      'iptables.exe': '[SYSTEM TOOL] This is a firewall configuration tool. Usage: iptables <rule>'
    }
  }
}; 