import type { LevelData } from '@/types/game';

export const level2: LevelData = {
  id: 2,
  title: '密码破解',
  description: '【第2关】在这一关，你需要学会破解简单的加密信息。',
  objectives: [
    '找到加密的信息',
    '使用解密工具破解密码',
    '使用解密的密问文'
  ],
  requiredTasks: ['decode_text'],
  fileSystem: {
    '~': ['encrypted.txt', 'tools', 'notes'],
    '~/tools': ['decoder.exe', 'readme.md', 'examples.txt'],
    '~/notes': ['crypto_basics.txt', 'hints.md']
  },
  fileContents: {
    'encrypted.txt': 'Pme!Gmppe!\n这段文字被简单加密了，每个字母都被移动了一位...\n解密这段文字，用解密后的内容作为密码来解锁下一关。',
    'readme.md': '解密工具使用说明：\n使用 decode <text> 命令来尝试解密文本',
    'examples.txt': '加密示例：\nHello -> Ifmmp\nWorld -> Xpsme\n\n发现规律了吗？',
    'crypto_basics.txt': '凯撒密码是最基本的加密方式之一，\n它将每个字母移动固定的位数来实现加密。\n比如：将每个字母向后移动1位。',
    'hints.md': '解密技巧：\n1. 观察字母的变化规律\n2. 尝试移动字母位置\n3. 注意标点符号的变化',
    'decoder.exe': '[系统提示] 这是一个可执行文件，使用 decode 命令来运行它',
    'secret.txt': '需要密码才能访问此文件。\n提示：解密 encrypted.txt 中的文本'
  },
  hints: [
    '观察加密文本的规律',
    '尝试使用不同的解密方法',
    '密码就在加密文本中'
  ]
}; 