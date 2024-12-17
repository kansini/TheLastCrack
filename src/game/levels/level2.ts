import { LevelData } from '@/types/game';

const level2: LevelData = {
  id: 2,
  title: '密码破解',
  description: '这一关你需要破解一个简单的密码。',
  objectives: [
    '找到加密的信息',
    '使用密码破解工具',
    '输入正确的密码'
  ],
  requiredTasks: ['find_encrypted', 'crack_password'],
  fileSystem: {
    '~': ['encrypted.txt', 'tools'],
    '~/tools': ['decoder.exe', 'readme.md']
  },
  fileContents: {
    'encrypted.txt': 'Pme!Gmppe!\n这段文字被简单加密了，每个字母都被移动了一位...',
    'readme.md': '解密工具使用说明：\n使用 decode <text> 命令来尝试解密文本',
    'decoder.exe': '[系统提示] 这是一个可执行文件，使用 run decoder 来运行它'
  },
  hints: [
    '观察加密文本的规律',
    '尝试使用不同的解密方法'
  ]
};

export default level2; 