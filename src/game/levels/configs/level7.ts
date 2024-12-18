import type { LevelData } from '@/types/game';

export const level7: LevelData = {
  id: 7,
  title: '密码破解',
  description: '【第7关】你需要破解一个加密的密码数据库，里面可能包含重要信息。',
  objectives: [
    '分析加密算法',
    '收集密码特征',
    '尝试破解方法',
    '获取数据库内容'
  ],
  requiredTasks: ['analyze_encryption', 'crack_password'],
  fileSystem: {
    '~': ['readme.txt', 'password.db', 'hints.txt'],
    '~/tools': ['cracker.exe', 'wordlist.txt', 'rainbow.txt'],
    '~/analysis': ['algorithm.md', 'patterns.log', 'stats.txt']
  },
  fileContents: {
    'readme.txt': '密码破解指南：\n1. 分析加密算法\n2. 使用字典攻击\n3. 尝试彩虹表\n4. 观察密码模式',
    
    'password.db': '[加密数据]\n使用 analyze 命令查看加密特征\n使用 crack 命令尝试破解',
    
    'hints.txt': '密码特征：\n- 长度：8-12位\n- 包含数字和字母\n- 可能使用常见单词\n- 可能包含年份',
    
    'cracker.exe': '[工具说明]\n支持以下破解方式：\n1. 字典攻击\n2. 暴力破解\n3. 彩虹表查询',
    
    'wordlist.txt': '常用密码字典：\npassword123\nadmin123\nqwerty123\n...\n包含10000个常见密码',
    
    'rainbow.txt': '彩虹表：\n[哈希值] -> [明文]\n7c6a180b36896a0a -> password123\n6c569aabbf7775ef -> admin123\n...',
    
    'algorithm.md': '加密算法分析：\n## 特征\n- 使用MD5哈希\n- 可能有加盐处理\n- 迭代次数：1000\n\n## 弱点\n1. 没有使用随机盐\n2. 迭代次数较低',
    
    'patterns.log': '密码模式分析：\n1. 90%包含数字\n2. 60%以字母开头\n3. 30%使用特殊字符\n4. 20%包含年份',
    
    'stats.txt': '统计信息：\n- 总密码数：100\n- 平均长度：9.5\n- 包含数字：90%\n- 包含大写：40%\n- 包含特殊字符：30%'
  },
  hints: [
    '先分析加密算法的特征',
    '使用 wordlist.txt 进行字典攻击',
    '注意密码中的数字和年份',
    '尝试使用彩虹表快速查找',
    '观察密码的统计特征'
  ]
}; 