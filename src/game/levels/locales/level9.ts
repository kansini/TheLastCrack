import { LevelLocales } from "./index";

export const level9Locales: LevelLocales = {
  zh: {
    title: '内存取证',
    description: '系统内存中可能存在重要的证据，你需要进行内存取证分析。',
    objectives: [
      '获取内存镜像',
      '分析进程信息',
      '提取关键数据',
      '还原事件过程'
    ],
    hints: [
      '查看 analysis.txt 了解内存镜像文件名',
      '使用 volatility snapshot.raw 分析内存镜像',
      '注意分析结果中的加密通信',
      '使用 timeline 命令分析可疑事件ID',
      '解码发现的加密字符串'
    ],
    fileContents: {
      'readme.txt': '内存取证指南：\n1. 使用 volatility 分析内存镜像\n2. 提取进程列表和网络连接\n3. 搜索关键字符串',
      'memory.dump': '[二进制数据] 使用 volatility 命令分析内存内容',
      'analysis.txt': '初步分析结果：\n1. 发现可疑进程\n2. 检测到加密通信\n3. 内存中存在敏感数据\n4. 时间戳异常\n\n[提示] 内存镜像文件已重命名为 snapshot.raw',
      'process.txt': '进程列表：\nPID    NAME         CPU   MEM   TIME\n666    svchost.exe  85%   45MB  02:15:00\n888    backdoor.exe 15%   20MB  02:15:30\n999    cmd.exe      1%    1MB   02:16:00',
      'network.txt': '网络连接：\nLOCAL           REMOTE          STATE\n0.0.0.0:445     185.192.69.69   ESTABLISHED\n0.0.0.0:3389    192.168.1.101   LISTENING',
      'timeline.txt': '事件时间线：\n02:15:00 - [事件666] 可疑进程创建 (svchost.exe)\n02:15:10 - 建立加密通信通道\n02:15:30 - [事件888] 检测到异常网络连接\n02:15:45 - 发现加密数据传输\n02:16:00 - 进程终止',
      'volatility.exe': '[工具说明]\n支持以下功能：\n1. 进程列表分析\n2. 网络连接检查\n3. 字符串提取\n4. 时间线构建\n\n使用方法：volatility <文件名>',
      'strings.txt': '内存字符串：\n- admin:password123\n- connect 192.168.1.100\n- download secret.zip\n- delete logs\n...',
      'decoder.exe': '解码工具说明：\n在分析过程中，我们发现攻击者使用了多层加密方式：\n1. Base64 编码\n2. 可能包含混淆字符\n\n使用 decode <加密字符串> 命令进行解码',
      'timeline.exe': '[工具说明]\n用于分析系统事件时间线\n使用方法：timeline <PID>\n\n可用的事件ID：\n- 666: 进程创建事件\n- 888: 网络连接事件'
    }
  },
  en: {
    title: 'Memory Forensics',
    description: 'Important evidence may exist in system memory, you need to perform memory forensics analysis.',
    objectives: [
      'Acquire memory image',
      'Analyze process information',
      'Extract key data',
      'Reconstruct event timeline'
    ],
    hints: [
      'Check analysis.txt for memory image filename',
      'Use volatility snapshot.raw to analyze memory image',
      'Pay attention to encrypted communications in analysis results',
      'Use timeline command to analyze suspicious event IDs',
      'Decode discovered encrypted strings'
    ],
    fileContents: {
      'readme.txt': 'Memory Forensics Guide:\n1. Use volatility to analyze memory image\n2. Extract process list and network connections\n3. Search for key strings',
      'memory.dump': '[BINARY DATA] Use volatility command to analyze memory contents',
      'analysis.txt': 'Initial Analysis Results:\n1. Suspicious process found\n2. Encrypted communication detected\n3. Sensitive data present in memory\n4. Timestamp anomalies\n\n[HINT] Memory image file renamed to snapshot.raw',
      'process.txt': 'Process List:\nPID    NAME         CPU   MEM   TIME\n666    svchost.exe  85%   45MB  02:15:00\n888    backdoor.exe 15%   20MB  02:15:30\n999    cmd.exe      1%    1MB   02:16:00',
      'network.txt': 'Network Connections:\nLOCAL           REMOTE          STATE\n0.0.0.0:445     185.192.69.69   ESTABLISHED\n0.0.0.0:3389    192.168.1.101   LISTENING',
      'timeline.txt': 'Event Timeline:\n02:15:00 - [Event666] Suspicious process created (svchost.exe)\n02:15:10 - Encrypted communication channel established\n02:15:30 - [Event888] Abnormal network connection detected\n02:15:45 - Encrypted data transfer discovered\n02:16:00 - Process terminated',
      'volatility.exe': '[TOOL INFO]\nSupported features:\n1. Process list analysis\n2. Network connection check\n3. String extraction\n4. Timeline construction\n\nUsage: volatility <filename>',
      'strings.txt': 'Memory strings:\n- admin:password123\n- connect 192.168.1.100\n- download secret.zip\n- delete logs\n...',
      'decoder.exe': 'Decoder tool info:\nDuring analysis, we found the attacker used multi-layer encryption:\n1. Base64 encoding\n2. Possible obfuscated characters\n\nUse decode <encrypted_string> command to decode',
      'timeline.exe': '[TOOL INFO]\nUsed for analyzing system event timeline\nUsage: timeline <PID>\n\nAvailable event IDs:\n- 666: Process creation event\n- 888: Network connection event'
    }
  }
}; 