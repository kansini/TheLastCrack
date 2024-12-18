import type { LevelData } from '@/types/game';

export const level10: LevelData = {
  id: 10,
  title: '聊天记录调查',
  description: '【第10关】你发现了一个可疑的聊天服务器。通过调查用户之间的对话你可能会发现一个正在进行的密谋。',
  objectives: [
    '访问聊天系统',
    '查看历史记录',
    '破解加密对话',
    '阻止密谋事件'
  ],
  requiredTasks: ['access_chat', 'find_evidence', 'decode_plan'],
  fileSystem: {
    '~': ['readme.txt', 'chat_rooms.txt', 'users.txt', 'logs'],
    '~/logs': ['access.log', 'system.log', '.deleted']
  },
  fileContents: {
    'readme.txt': '聊天系统调查指南：\n1. 使用 chat <房间> 查看公共聊天\n2. 使用 private <用户> 查看私聊记录\n3. 使用 history <日期> 查看历史记录\n\n提示：查看 chat_rooms.txt 了解可用的聊天室',
    
    'chat_rooms.txt': '可用聊天室列表：\n- room1: 主聊天室\n- room2: 休闲聊天室（已关闭）\n- room3: 技术讨论室（已关闭）\n\n注意：目前只有 room1 处于开放状态',
    
    'users.txt': '在线用户列表：\n- David (管理员)\n- Eve (版主)\n- Frank (普通用户)\n\n可以使用 private <用户名> 查看与用户的私聊记录',
    
    'system.log': '系统日志：\n1. 检测到可疑的文件操作\n2. 加密类型：凯撒密码\n3. 每个字母都向后移动了一位\n4. 例如：A->B, B->C, ..., Z->A\n5. 使用 decode <文本> 可以还原\n\n提示：使用 history <日期> 可以查看历史记录，日期格式：YYYY-MM-DD',
    
    '.deleted': '已删除的系统日志：\n[WARN] 发现可疑进程\n[INFO] 尝试解密 XVDIBKJ\n[DEBUG] 清理完成',
    
    'public/room1.txt': `[公共聊天室 #1]
David: 服务器安全检查完成了吗？
Eve: 是的，按照清单都检查过了。
Frank: 防火墙规则也已经更新。
David: 很好，记得用之前说的方式加密重要内容。
Eve: 收到，我已经把配置文件加密好了。
Frank: 我这边的日志也都处理完了。`,

    'private/david.txt': `[私聊记录 - David]
To Eve: 2024-04-01的配置文件里有几处要改动
From Eve: 好的，我马上看看加密文件
To Frank: 记得清理那天的日志记录
From Frank: 明白，我会处理好的
To Eve: 用老方法加密，别用新的方式`,

    'private/eve.txt': `[私聊记录 - Eve]
From David: 你看到今天的行动计划了吗？
To David: 我发现一个加密文件，正在分析
To Frank: 今天的系统日志很可疑，你看到了吗？
From Frank: 是的，我会尽快清理掉`
  },
  hints: [
    '查看 chat_rooms.txt 了解可用的聊天室',
    '使用 chat room1 查看公共聊天',
    '注意聊天中提到的加密方式',
    '在系统日志中找到加密说明',
    '使用 decode 命令尝试解密文本'
  ]
}; 