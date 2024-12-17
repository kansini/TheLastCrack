import type { LevelData } from '@/types/game';

export const levelConfigs: Record<number, LevelData> = {
  1: {
    id: 1,
    title: '初识终端',
    description: '欢迎来到黑客模拟器。在这一关，你将学习基本的终端命令操作。',
    objectives: [
      '使用 ls 命令查看当前目录下的文件',
      '使用 cat 命令读取 welcome.txt 的内容',
      '找到隐藏的 .secret 文件并查看其内容'
    ],
    requiredTasks: ['read_welcome', 'find_secret'],
    fileSystem: {
      '~': ['welcome.txt', 'documents', '.secret', 'notes', 'tutorial'],
      '~/documents': ['intro.md', 'guide.txt'],
      '~/notes': ['day1.txt', 'reminder.txt'],
      '~/tutorial': ['basic_commands.md', 'tips.txt']
    },
    fileContents: {
      'welcome.txt': '欢迎来到终端世界！\n你的第一个任务是找到隐藏在某处的秘密文件。\n提示：并不是所有文件都会直接显示...',
      '.secret': '恭喜你找到了隐藏文件！\n这是你的第一步，接下来的挑战会更加有趣。\n密码提示：MOON_LIGHT',
      'intro.md': '# 终端使用指南\n\n在这个世界中，需要使用各种命令来探索和解决问题。\n\n常用命令：\n- ls：列出文件\n- cd：切换目录\n- cat：查看文件内容',
      'guide.txt': '记住，在终端中，以 . 开头的文件通常是隐藏文件。\n使用 ls -a 可以查看所有文件，包括隐藏文件。',
      'day1.txt': '今天是我的第一天，还在适应这个系统。\n导师说要特别注意隐藏文件...',
      'reminder.txt': '备忘：\n1. 检查所有可能的位置\n2. 留意文件中的特殊提示\n3. 记录找到的密码',
      'basic_commands.md': '# 基础命令使用\n\nls：列出文件和目录\n  -a：显示所有文件（包括隐藏文件）\n  -l：显示详细信息\n\ncd：切换目录\n  cd ..：返回上级目录\n  cd ~：返回主目录',
      'tips.txt': '小技巧：\n- 命令区分大小写\n- 使用 Tab 键可以自动补全命令和文件名\n- 使用方向键可以查看历史命令'
    },
    hints: [
      '试试使用 ls -a 命令来查看所有文件，包括隐藏文件',
      '文件名以 . 开头的通常是隐藏文件'
    ]
  },

  2: {
    id: 2,
    title: '密码破解',
    description: '在这一关，你需要学会破解简单的加密信息。',
    objectives: [
      '找到加密的信息',
      '使用解密工具破解密码',
      '使用解密后的密码访问加密文件夹'
    ],
    requiredTasks: ['decode_text'],
    fileSystem: {
      '~': ['encrypted.txt', 'tools', 'notes'],
      '~/tools': ['decoder.exe', 'readme.md', 'examples.txt'],
      '~/notes': ['crypto_basics.txt', 'hints.md']
    },
    fileContents: {
      'encrypted.txt': 'Uif!Dpef!Xpsme!\n这段文字被简单加密了，每个字母都被移动了一位...\n解密这段文字，用解密后的内容作为密码来解锁下一关。',
      'readme.md': '解密工具使用说明：\n使用 decode <text> 命令来尝试解密文本',
      'examples.txt': '加密示例：\nHello -> Ifmmp\nWorld -> Xpsme\n\n发现规律了吗？',
      'crypto_basics.txt': '凯撒密码是最基本的加密方式之一，\n它将每个字母移动固定的位数来实现加密。\n比如：将每个字母向后移动1位。',
      'hints.md': '解密技巧：\n1. 观察字母的变化规律\n2. 尝试移动字母位置\n3. 注意标点符号的变化',
      'decoder.exe': '[系统提示] 这是一个可执行文件，使用 run decoder 来运行它',
      'secret.txt': '需要密码才能访问此文件。\n提示：解密 encrypted.txt 中的文本'
    },
    hints: [
      '观察加密文本的规律',
      '尝试使用不同的解密方法',
      '密码就在加密文本中'
    ]
  },

  3: {
    id: 3,
    title: '权限与密钥',
    description: '这一关你将学习如何处理文件权限，并找到隐藏的密钥。',
    objectives: [
      '理解文件权限系统',
      '找到权限密钥',
      '访问受保护的文件'
    ],
    requiredTasks: ['find_key', 'access_protected'],
    fileSystem: {
      '~': ['readme.txt', 'system', 'personal', '.keys'],
      '~/system': ['permissions.md', 'access_log.txt', 'protected_data.enc'],
      '~/personal': ['diary.txt', 'notes.md', '.private'],
      '~/.keys': ['key_fragment_1', 'key_fragment_2']
    },
    fileContents: {
      'readme.txt': '系统安全级别已提升。\n所有重要文件都需要proper_key才能访问。\n提示：密钥被分成了两部分...',
      'permissions.md': '文件权限说明：\n- r: 读取权限\n- w: 写入权限\n- x: 执行权限\n\n使用 chmod 命令修改权限',
      'access_log.txt': '访问记录：\n[警告] 未授权访问尝试\n[提示] 密钥格式：XXXX-XXXX',
      'protected_data.enc': '此文件已加密。\n需要完整的密钥才能访问。',
      'diary.txt': '今天学习了权限系统...\n看来要找到那两个密钥碎片才行。\n第一个在某个隐藏目录里。',
      'notes.md': '备忘：\n1. 密钥分两部分\n2. 第二部分和日期有关\n3. 检查隐藏目录',
      '.private': '这是一个隐藏文件。\n提示：第二个密钥与今天的日期有关。\n格式：MMDD',
      'key_fragment_1': 'HACK',
      'key_fragment_2': '0401'
    },
    hints: [
      '密钥被分成了两部分，都藏在隐藏目录中',
      '第二部分与日期有关',
      '尝试合并两个密钥碎片'
    ]
  },

  4: {
    id: 4,
    title: '数据恢复',
    description: '这一关你需要恢复被删除的重要数据。',
    objectives: [
      '找到数据备份',
      '修复损坏的文件',
      '重建完整数据'
    ],
    requiredTasks: ['find_backup', 'repair_data'],
    fileSystem: {
      '~': ['corrupted_data.db', 'backup', 'tools', 'logs'],
      '~/backup': ['backup_0401.bak', 'backup_0402.bak', 'readme.txt'],
      '~/tools': ['repair.exe', 'scanner.exe', 'manual.pdf'],
      '~/logs': ['error_log.txt', 'system_log.txt', 'backup_log.txt']
    },
    // ... 待续
  }
}; 