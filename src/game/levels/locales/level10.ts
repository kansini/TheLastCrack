import { LevelLocales } from "./index";

export const level10Locales: LevelLocales = {
  zh: {
    title: "聊天记录调查",
    description: "你发现了一个可疑的聊天服务器。通过调查用户之间的对话你可能会发现一个正在进行的密谋。",
    objectives: [
      "访问聊天系统",
      "查看历史记录",
      "破解加密对话",
      "阻止密谋事件"
    ],
    hints: [
      "查看 chat_rooms.txt 了解可用的聊天室",
      "使用 chat room1 查看公共聊天",
      "注意聊天中提到的加密方式",
      "在系统日志中找到加密说明",
      "使用 decode 命令尝试解密文本"
    ],
    fileContents: {
      "readme.txt": "聊天系统调查指南：\n1. 使用 chat <房间> 查看公共聊天\n2. 使用 private <用户> 查看私聊记录\n3. 使用 history <日期> 查看历史记录\n\n提示：查看 chat_rooms.txt 了解可用的聊天室",
      "chat_rooms.txt": "可用聊天室列表：\n- room1: 主聊天室\n- room2: 休闲聊天室（已关闭）\n- room3: 技术讨论室（已关闭）\n\n注意：目前只有 room1 处于开放状态",
      "users.txt": "在线用户列表：\n- David (管理员)\n- Eve (版主)\n- Frank (普通用户)\n\n可以使用 private <用户名> 查看与用户的私聊记录",
      "system.log": "系统日志：\n1. 检测到可疑的文件操作\n2. 加密类型：凯撒密码\n3. 每个字母都向后移动了一位\n4. 例如：A->B, B->C, ..., Z->A\n5. 使用 decode <文本> 可以还原\n\n提示：使用 history <日期> 可以查看历史记录，日期格式：YYYY-MM-DD",
      ".deleted": "已删除的系统日志：\n[WARN] 发现可疑进程\n[INFO] 尝试解密 XVDIBKJ\n[DEBUG] 清理完成",
      "public/room1.txt": "[公共聊天室 #1]\nDavid: 服务器安全检查完成了吗？\nEve: 是的，按照清单都检查过了。\nFrank: 防火墙规则也已经更新。\nDavid: 很好，记得用之前说的方式加密重要内容。\nEve: 收到，我已经把配置文件加密好了。\nFrank: 我这边的日志也都处理完了。",
      "private/david.txt": "[私聊记录 - David]\nTo Eve: 2024-04-01 的配置文件里有几处要改动\nFrom Eve: 好的，我马上看看加密文件\nTo Frank: 记得清理那天的日志记录\nFrom Frank: 明白，我会处理好的\nTo Eve: 用老方法加密，后缀_YYYY,别用新的方式",
      "private/eve.txt": "[私聊记录 - Eve]\nFrom David: 你看到今天的行动计划了吗？\nTo David: 我发现一个加密文件，正在分析\nTo Frank: 今天的系统日志很可疑，你看到了吗？\nFrom Frank: 是的，我会尽快清理掉"
    }
  },
  en: {
    title: "Chat Log Investigation",
    description: "You've discovered a suspicious chat server. By investigating conversations between users, you might uncover an ongoing conspiracy.",
    objectives: [
      "Access chat system",
      "View history records",
      "Decrypt encrypted conversations",
      "Stop conspiracy event"
    ],
    hints: [
      "Check chat_rooms.txt for available chat rooms",
      "Use chat room1 to view public chat",
      "Note encryption method mentioned in chat",
      "Find encryption instructions in system log",
      "Use decode command to decrypt text"
    ],
    fileContents: {
      "readme.txt": "Chat System Investigation Guide:\n1. Use chat <room> to view public chat\n2. Use private <user> to view private messages\n3. Use history <date> to view history\n\nHint: Check chat_rooms.txt for available chat rooms",
      "chat_rooms.txt": "Available Chat Rooms:\n- room1: Main Chat Room\n- room2: Casual Chat Room (Closed)\n- room3: Technical Discussion Room (Closed)\n\nNote: Currently only room1 is open",
      "users.txt": "Online Users List:\n- David (Admin)\n- Eve (Moderator)\n- Frank (Regular User)\n\nUse private <username> to view private messages with users",
      "system.log": "System Log:\n1. Suspicious file operation detected\n2. Encryption type: Caesar cipher\n3. Each letter shifted forward by one\n4. Example: A->B, B->C, ..., Z->A\n5. Use decode <text> to decrypt\n\nHint: Use history <date> to view history records, date format: YYYY-MM-DD",
      ".deleted": "Deleted System Log:\n[WARN] Suspicious process found\n[INFO] Attempting to decrypt XVDIBKJ\n[DEBUG] Cleanup complete",
      "public/room1.txt": "[Public Chat Room #1]\nDavid: Is the server security check complete?\nEve: Yes, checked everything according to the list.\nFrank: Firewall rules have been updated too.\nDavid: Good, remember to encrypt important content as discussed.\nEve: Got it, I've encrypted the config file.\nFrank: I've handled the logs on my end.",
      "private/david.txt": "[Private Messages - David]\nTo Eve: Config file for 2024-04-01 needs some changes\nFrom Eve: OK, I'll check the encrypted file now\nTo Frank: Remember to clean up that day's logs\nFrom Frank: Understood, I'll handle it\nTo Eve: Use the old method, suffix_YYYY, don't use the new way",
      "private/eve.txt": "[Private Messages - Eve]\nFrom David: Have you seen today's action plan?\nTo David: I found an encrypted file, analyzing it\nTo Frank: Today's system logs look suspicious, did you see?\nFrom Frank: Yes, I'll clean them up soon"
    }
  }
}; 