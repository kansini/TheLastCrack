import { LevelLocales } from "./index";

export const level11Locales: LevelLocales = {
  zh: {
    title: '邮件追踪',
    description: '我们获取了几个可疑用户的邮箱访问权限，需要分析他们之间的通信来找出重要线索。',
    objectives: [
      '访问邮箱系统',
      '分析邮件内容',
      '追踪可疑对话',
      '破解隐藏信息'
    ],
    hints: [
      '使用 mail list 查看所有邮箱用户',
      '仔细阅读 Sarah 的邮件中提到的密码规则',
      '注意 Mike 提到的象棋术语以及清理垃圾箱(trash)',
      '使用 mail trash 命令检查垃圾箱中的邮件',
      '使用 mail search chess 或 mail search 象棋 命令查找草稿箱(draft)',
      '使用 mail draft 命令将发现的线索组合成正确的密码格式'
    ],
    fileContents: {
      'readme.txt': '邮件服务器分析指南：\n1. 使用 mail list 查看用户列表\n2. 使用 mail read <用户> 阅读邮件\n3. 使用 mail search <关键词> 搜索内容\n4. 注意检查草稿箱和已删除邮件\n\n[提示] 先查看 alex 的邮件',
      'alex.mbox': '发件人: sarah@company.com\n主题: 关于项目进展\n时间: 2024-01-15 10:30\n\nAlex,\n按照之前说的，资料已经准备好了。\n密码我会通过其他方式告诉你。\n记得用我们之前说好的方式处理。\n\nSarah',
      // ... 其他邮件内容保持不变
    }
  },
  en: {
    title: 'Email Tracking',
    description: 'We have gained access to several suspicious users\' mailboxes, need to analyze their communications to find important clues.',
    objectives: [
      'Access email system',
      'Analyze email contents',
      'Track suspicious conversations',
      'Decode hidden information'
    ],
    hints: [
      'Use mail list to view all mailbox users',
      'Carefully read password rules mentioned in Sarah\'s email',
      'Note chess terms and trash cleanup mentioned by Mike',
      'Use mail trash command to check emails in trash',
      'Use mail search chess to find drafts',
      'Use mail draft command to combine clues into correct password format'
    ],
    fileContents: {
      'readme.txt': 'Mail Server Analysis Guide:\n1. Use mail list to view user list\n2. Use mail read <user> to read emails\n3. Use mail search <keyword> to search content\n4. Check drafts and deleted emails\n\n[HINT] Start by checking alex\'s emails',
      'alex.mbox': 'From: sarah@company.com\nSubject: About Project Progress\nTime: 2024-01-15 10:30\n\nAlex,\nAs discussed, the materials are ready.\nI\'ll send you the password through other means.\nRemember to handle it as we agreed.\n\nSarah',
      // ... 其他邮件内容保持不变
    }
  }
}; 