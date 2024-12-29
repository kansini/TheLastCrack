import { LevelLocales } from "./index";

export const level11Locales: LevelLocales = {
  zh: {
    title: "邮件追踪",
    description: "我们获取了几个可疑用户的邮箱访问权限，需要分析他们之间的通信来找出重要线索。",
    objectives: [
      "访问邮箱系统",
      "分析邮件内容", 
      "追踪可疑对话",
      "破解隐藏信息"
    ],
    hints: [
      "使用 mail list 查看所有邮箱用户",
      "仔细阅读 Sarah 的邮件中提到的密码规则",
      "注意 Mike 提到的象棋术语以及清理垃圾箱(trash)",
      "使用 mail trash 命令检查垃圾箱中的邮件，其中提到search命令即将作废",
      "使用 mail search chess 或 mail search 象棋 命令提到查找草稿箱(draft)",
      "使用 mail draft 命令将发现的线索组合成正确的密码格式"
    ],
    fileContents: {
      "readme.txt": "邮件服务器分析指南：\n1. 使用 mail list 查看用户列表\n2. 使用 mail read <用户> 阅读邮件\n3. 使用 mail search <关键词> 搜索内容\n4. 注意检查草稿箱和已删除邮件\n\n[提示] 先查看 alex 的邮件",
      
      "notes.txt": "调查笔记：\n- Alice 最近行为异常\n- Sarah 似乎知道一些内幕\n- Mike 可能参与了计划\n- 注意检查已删除的邮件\n\n[提示] 使用 mail trash 查看回收站",
      
      "alex.mbox": `发件人: sarah@company.com
主题: 关于项目进展
时间: 2024-01-15 10:30

Alex,
按照之前说的，资料已经准备好了。
密码我会通过其他方式告诉你。
记得用我们之前说好的方式处理。

Sarah

-------------------

发件人: mike@company.com
主题: Re: 安排
时间: 2024-01-15 14:20

明白了，我会在15号之前完成。
另外，别忘了之前说的暗号：
"旧的大门需要新的钥匙"
我发现了一个隐藏命令 countdown 这个命令很危险,千万不要使用！！！切记！！

Mike`,

      "sarah.mbox": `发件人: mike@company.com
主题: 特殊安排
时间: 2024-01-14 09:15

Sarah,
计划有变，新的密码规则：
1. 使用象棋术语
2. 年份放在最后
3. 全部大写
4. 中间用下划线连接

另外，别通过邮件发送真正的密码。

Mike

-------------------

发件人: alex@company.com
主题: 确认
时间: 2024-01-14 16:45

收到文件了，但是解不开。
是不是用了新的加密方式？

Alex`,

      "mike.mbox": `发件人: sarah@company.com
主题: 新的安排
时间: 2024-01-13 11:20

Mike,
记住新的暗号：
"车马相交，王车易位"
这是最后的行动代号。

注意：请及时删除邮件，定期清除垃圾箱(trash)
Sarah

-------------------

发件人: system@company.com
主题: 系统提醒
时间: 2024-01-15 00:01

您的密码将在24小时后过期，
请及时修改。新密码需要包含：
- 至少8个字符
- 大写字母
- 数字
- 特殊符号`,

      ".secret_draft": `[草稿]
主题: 最终确认

行动代号已定：
KING_ROOK_2024

请销毁这个草稿。
[此邮件未发送]`,

      "deleted.mbox": `[已删除]
发件人: sarah@company.com
主题: 紧急！
时间: 2024-01-15 15:30

销毁所有相关文件！
记住最后的行动代号！
按照象棋术语修改。

**search命令即将作废
[此邮件已标记为删除]`,

      "outbox.log": "邮件发送日志：\n2024-01-13 - 5封\n2024-01-14 - 8封\n2024-01-15 - 12封\n\n异常：15日邮件数量激增\n建议检查15日的邮件内容"
    }
  },
  en: {
    title: "Email Tracking",
    description: "We have gained access to several suspicious users' mailboxes and need to analyze their communications to find important clues.",
    objectives: [
      "Access email system",
      "Analyze email contents",
      "Track suspicious conversations", 
      "Decode hidden information"
    ],
    hints: [
      "Use mail list to view all mailbox users",
      "Carefully read password rules mentioned in Sarah's email",
      "Note chess terms and trash cleanup mentioned by Mike",
      "Use mail trash command to check emails in trash, which mentions search command will be deprecated",
      "Use mail search chess to find drafts",
      "Use mail draft command to combine clues into correct password format"
    ],
    fileContents: {
      "readme.txt": "Mail Server Analysis Guide:\n1. Use mail list to view user list\n2. Use mail read <user> to read emails\n3. Use mail search <keyword> to search content\n4. Check drafts and deleted emails\n\n[HINT] Start by checking alex's emails",
      
      "notes.txt": "Investigation Notes:\n- Alice's recent behavior is unusual\n- Sarah seems to know inside information\n- Mike might be involved in the plan\n- Check deleted emails\n\n[HINT] Use mail trash to view recycle bin",
      
      "alex.mbox": `From: sarah@company.com
Subject: About Project Progress
Time: 2024-01-15 10:30

Alex,
As discussed, the materials are ready.
I'll send you the password through other means.
Remember to handle it as we agreed.

Sarah

-------------------

From: mike@company.com
Subject: Re: Arrangement
Time: 2024-01-15 14:20

Understood, I'll complete it before the 15th.
Also, don't forget the previously mentioned code:
"Old gate needs new key"
I found a hidden command countdown, this command is dangerous, DO NOT USE IT!!! Remember!!!

Mike`,

      "sarah.mbox": `From: mike@company.com
Subject: Special Arrangement
Time: 2024-01-14 09:15

Sarah,
Plans have changed, new password rules:
1. Use chess terms
2. Year at the end
3. All uppercase
4. Connect with underscores

Also, don't send the real password via email.

Mike

-------------------

From: alex@company.com
Subject: Confirmation
Time: 2024-01-14 16:45

Got the file but can't decrypt it.
Did you use a new encryption method?

Alex`,

      "mike.mbox": `From: sarah@company.com
Subject: New Arrangement
Time: 2024-01-13 11:20

Mike,
Remember the new code:
"Rook meets knight, king castles"
This is the final operation code.

Note: Delete emails promptly, regularly clear trash
Sarah

-------------------

From: system@company.com
Subject: System Reminder
Time: 2024-01-15 00:01

Your password will expire in 24 hours,
Please change it timely. New password must include:
- At least 8 characters
- Uppercase letters
- Numbers
- Special symbols`,

      ".secret_draft": `[Draft]
Subject: Final Confirmation

Operation code confirmed:
KING_ROOK_2024

Please destroy this draft.
[Email not sent]`,

      "deleted.mbox": `[Deleted]
From: sarah@company.com
Subject: Urgent!
Time: 2024-01-15 15:30

Destroy all related files!
Remember the final operation code!
Modify according to chess terms.

**search command will be deprecated
[This email has been marked for deletion]`,

      "outbox.log": "Email Send Log:\n2024-01-13 - 5 emails\n2024-01-14 - 8 emails\n2024-01-15 - 12 emails\n\nAnomaly: Email volume surge on the 15th\nRecommend checking emails from the 15th"
    }
  }
}; 