import { LevelLocales } from "./index";

export const level3Locales: LevelLocales = {
  zh: {
    title: '权限密钥',
    description: '这一关将学习如何处理文件权限，并找到隐藏的密钥。系统管理员在不同目录中留下了线索。',
    objectives: [
      '探索系统目录结构',
      '收集分散的线索',
      '找到完整密钥',
      '访问受保护的文件'
    ],
    hints: [
      '第一步：浏览所有目录收集线索',
      '系统目录(system)中的文件说明了密钥格式',
      '个人目录(personal)中的文件暗示了密钥的内容',
      '日记中明确提到第一部分是"HACK"',
      '访问日志中记录了系统安装日期0401',
      '使用 ls -a 可以看到隐藏文件',
      '按 XXXX-XXXX 格式组合密钥（HACK-0401）'
    ],
    fileContents: {
      'readme.txt': '系统安全级别已提升。\n所有重要文件都需要proper_key才能访问。\n提示：\n1. 检查系统日志获取密钥格式\n2. 查看个人笔记了解密钥内容\n3. 注意隐藏文件',
      'permissions.md': '文件权限说明：\n- r: 读取权限\n- w: 写入权限\n- x: 执行权限\n\n重要提示：\n1. 密钥的第一部分是一个常见的黑客术语\n2. 使用 ls -a 命令可以查看隐藏文件',
      'access_log.txt': '访问记录：\n[警告] 未授权访问尝试\n[提示] 密钥格式：XXXX-XXXX\n[提示] 第二部分是一个4位数字，看起来像日期格式\n[记录] 系统安装日期：04/01',
      'protected_data.enc': '此件已密。\n要完整钥才能访问。\n提示：密钥的两个部分分别代表：\n1. 一个黑客行为（在日记中提到）\n2. 系统安装日期（在日志中记录）',
      'diary.txt': '今天学习了权限系统...\n管理员说密钥的第一部分是一个单词，全大写\n这个词真形象，就是黑客的行为。\n第二部分好像是某个日期...',
      'notes.md': '备忘：\n1. 系统目录下的日志提到了密钥格式\n2. 第一部分是 HACK\n3. 第二部分在访问日志中提到了',
      '.private': '这是一个隐藏文件。\n重要提示：\n- 第一部分已经在日记中写明：HACK\n- 第二部分是系统安装日期\n- 格式：XXXX-XXXX'
    }
  },
  en: {
    title: 'Permission Key',
    description: 'In this level16, you will learn how to handle file permissions and find hidden keys. The system administrator has left clues in different directories.',
    objectives: [
      'Explore system directory structure',
      'Collect scattered clues',
      'Find the complete key',
      'Access protected files'
    ],
    hints: [
      'First step: Browse all directories to collect clues',
      'Files in system directory explain the key format',
      'Files in personal directory hint at key content',
      'Diary explicitly mentions first part is "HACK"',
      'Access log shows system installation date 0401',
      'Use ls -a to see hidden files',
      'Combine key in XXXX-XXXX format (HACK-0401)'
    ],
    fileContents: {
      'readme.txt': 'System security level16 has been increased.\nAll important files require proper_key to access.\nHints:\n1. Check system logs for key format\n2. Read personal notes for key content\n3. Pay attention to hidden files',
      'permissions.md': 'File permissions explanation:\n- r: read permission\n- w: write permission\n- x: execute permission\n\nImportant note:\n1. First part of the key is a common hacker term\n2. Use ls -a command to view hidden files',
      'access_log.txt': 'Access records:\n[WARNING] Unauthorized access attempt\n[HINT] Key format: XXXX-XXXX\n[HINT] Second part is a 4-digit number, looks like a date\n[LOG] System installation date: 04/01',
      'protected_data.enc': 'File encrypted.\nNeeds complete key to access.\nHint: The two parts of the key represent:\n1. A hacker action (mentioned in diary)\n2. System installation date (in logs)',
      'diary.txt': 'Today I learned about permission systems...\nAdmin said the first part of the key is a word in uppercase\nThis word is very descriptive, it\'s what hackers do.\nThe second part seems to be some date...',
      'notes.md': 'Notes:\n1. System logs mention key format\n2. First part is HACK\n3. Second part is in access log',
      '.private': 'This is a hidden file.\nImportant hints:\n- First part is written in diary: HACK\n- Second part is system installation date\n- Format: XXXX-XXXX'
    }
  }
}; 