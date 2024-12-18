import type { LevelData } from '@/types/game';

export const level8: LevelData = {
  id: 8,
  title: '网络嗅探',
  description: '【第8关】系统检测到可疑的网络量。你需要使用网络分析工具找出数据泄露的证据。',
  objectives: [
    '启动网络监听',
    '捕获可疑数据包',
    '分析数据包内容',
    '阻止数据泄露'
  ],
  requiredTasks: ['start_capture', 'find_packet', 'analyze_packet', 'block_leak'],
  fileSystem: {
    '~': ['readme.txt', 'network', 'capture', 'tools'],
    '~/network': ['interfaces.conf', 'traffic.log', 'connections.list'],
    '~/capture': ['packets.pcap', 'filters.txt', '.secret_data'],
    '~/tools': ['tcpdump.exe', 'wireshark.exe', 'iptables.exe']
  },
  fileContents: {
    'readme.txt': '网络分析指南：\n1. 使用 tcpdump 捕获网络数据包\n2. 使用 wireshark 分析数据包内容\n3. 使用 iptables 阻止可疑连接\n\n注意：某些数据包可能包含敏感信息',
    
    'interfaces.conf': '网卡配置：\neth0: 192.168.1.100\neth1: 10.0.0.100\n\n可疑流量主要现在 eth1',
    'traffic.log': '流量记录：\n[警告] 检测到大量对外连接\n[警告] 端口 31337 有异常流量\n[提示] 使用 tcpdump port 31337 捕获可疑数据包',
    'connections.list': '当前连接：\n192.168.1.100:80 -> 192.168.1.1:80 (HTTP)\n10.0.0.100:31337 -> 10.0.0.1:31337 (未授权协议)',
    
    'packets.pcap': '[二进制数据包文件]\n需要使用 wireshark 分析',
    'filters.txt': '常用过滤器：\n1. port 31337\n2. host 10.0.0.1\n3. tcp[13] = 0x02\n\n提示：使用这些过滤器可以找到可疑数据包',
    '.secret_data': '发现数据泄露：\n1. 目标IP: 10.0.0.1\n2. 目标端口: 31337\n3. 泄露内容: 系统密码\n4. 阻止方法: iptables -A OUTPUT -d 10.0.0.1 -j DROP',
    
    'tcpdump.exe': '[系统提示] 这是一个数据包捕获工具。使用方法：tcpdump <过滤器>',
    'wireshark.exe': '[系统提示] 这是一个数据包分析工具。使用方法：wireshark <文件名>',
    'iptables.exe': '[系统提示] 这是一个防火墙配置工具。使用方法：iptables <规则>'
  },
  hints: [
    '使用 tcpdump 监听端口 31337',
    '查看 traffic.log 了解可疑流量特征',
    '使用 wireshark 分析捕获的数据包',
    '在可疑数据包中寻找密码信息',
    '使用 iptables 阻止数据泄露'
  ]
}; 