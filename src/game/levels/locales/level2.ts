import { LevelLocales } from "./index";

export const level2Locales: LevelLocales = {
  zh: {
    title: '密码破解',
    description: '在这一关，你需要学会破解简单的加密信息。',
    objectives: [
      '找到加密的信息',
      '使用解密工具破解密码',
      '使用解密的密问文'
    ],
    hints: [
      '观察加密文本的规律',
      '尝试使用不同的解密方法',
      '密码就在加密文本中'
    ],
    fileContents: {
      'encrypted.txt': 'Pme!Gmppe!\n这段文字被简单加密了，每个字母都被移动了一位...\n解密这段文字，用解密后的内容作为密码来解锁下一关。',
      'readme.md': '解密工具使用说明：\n使用 decode <text> 命令来尝试解密文本',
      'examples.txt': '加密示例：\nHello -> Ifmmp\nWorld -> Xpsme\n\n发现规律了吗？',
      'crypto_basics.txt': '凯撒密码是最基本的加密方式之一，\n它将每个字母移动固定的位数来实现加密。\n比如：将每个字母向后移动1位。',
      'hints.md': '解密技巧：\n1. 观察字母的变化规律\n2. 尝试移动字母位置\n3. 注意标点符号的变化',
      'decoder.exe': '[系统提示] 这是一个可执行文件，使用 decode 命令来运行它',
      'secret.txt': '需要密码才能访问此文件。\n提示：解密 encrypted.txt 中的文本'
    }
  },
  en: {
    title: 'Password Cracking',
    description: 'In this level, you need to learn how to crack simple encrypted messages.',
    objectives: [
      'Find the encrypted message',
      'Use decryption tool to crack the password',
      'Use the decrypted text'
    ],
    hints: [
      'Observe the pattern in encrypted text',
      'Try different decryption methods',
      'The password is in the encrypted text'
    ],
    fileContents: {
      'encrypted.txt': 'Pme!Gmppe!\nThis text has been simply encrypted, each letter shifted by one position...\nDecrypt this text and use the result as password to unlock next level.',
      'readme.md': 'Decryption tool instructions:\nUse decode <text> command to try decrypting text',
      'examples.txt': 'Encryption examples:\nHello -> Ifmmp\nWorld -> Xpsme\n\nSee the pattern?',
      'crypto_basics.txt': 'Caesar cipher is one of the most basic encryption methods,\nit shifts each letter by a fixed number of positions.\nFor example: shift each letter forward by 1 position.',
      'hints.md': 'Decryption tips:\n1. Observe letter change patterns\n2. Try shifting letter positions\n3. Pay attention to punctuation marks',
      'decoder.exe': '[SYSTEM] This is an executable file, use decode command to run it',
      'secret.txt': 'Password required to access this file.\nHint: Decrypt the text in encrypted.txt'
    }
  }
}; 