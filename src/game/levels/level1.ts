import type { LevelData } from '@/types/game';

const level1: LevelData = {
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
    '~': ['welcome.txt', 'documents', '.secret'],
    '~/documents': ['notes.txt', 'tutorial.md']
  },
  fileContents: {
    'welcome.txt': '欢迎来到终端世界！\n你的第一个任务是找到隐藏在某处的秘密文件。\n提示：并不是所有文件都会直接显示...',
    '.secret': '恭喜你找到了隐藏文件！\n这是你的第一步，接下来的挑战会更加有趣。\n密码提示：MOON_LIGHT',
    'notes.txt': '记得查看所有可能的地方...',
    'tutorial.md': '基本命令：\nls - 列出文件\ncat - 查看文件内容\ncd - 切换目录'
  },
  hints: [
    '试试使用 ls -a 命令来查看所有文件，包括隐藏文件',
    '文件名以 . 开头的通常是隐藏文件'
  ]
};

export default level1; 