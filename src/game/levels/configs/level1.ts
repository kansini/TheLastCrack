import type { LevelData } from '@/types/game';

export const level1: LevelData = {
  id: 1,
  title: '初识终端',
  description: '【第1关】欢迎来到黑客模拟器。在这一关，你将学习基本的终端命令操作。',
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
    'intro.md': '# 终端使用指南\n\n在这个世界中，使用命令来探索和解决问题。\n\n常用命令：\n- ls：列出文件\n- cd：切换目录\n- cat：查看文件内容',
    'guide.txt': '记住，在终端中，以 . 开头的文件通常是隐藏文件。\n使用 ls -a 可以查看所有文件，包括隐藏文件。',
    'day1.txt': '今天是我的第一天，还在适应这个系统。\n导师说要特别注意隐藏文件...',
    'reminder.txt': '备忘：\n1. 检查所有可能的位置\n2. 留意文件中的特殊提示\n3. 记录找到的密码',
    'basic_commands.md': '# 基础命令使用\n\nls：列出文件和目录\n  -a：显示所有文件（包括隐藏文件）\n  -l：显示详细信息\n\ncd：切换目录\n  cd ..：返回上级目录\n  cd ~：返回主目录',
    'tips.txt': '小技巧：\n- 命令区分大小写\n- 使用 Tab 键可以自动补全命令和文件名\n- 使用方向键可以查看历史命令\n- 使用unlock <密码> 解锁下一关'
  },
  hints: [
    '试试使用 ls -a 命令来查看所有文件，包括隐藏文件',
    '文件名以 . 开头的通常是隐藏文件'
  ]
}; 