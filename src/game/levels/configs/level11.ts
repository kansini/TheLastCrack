import type { LevelData } from '@/types/game';

export const level11: LevelData = {
    id: 11,
    title: '邮件追踪',
    description: '【第11关】我们获取了几个可疑用户的邮箱访问权限，需要分析他们之间的通信来找出重要线索。',
    objectives: [
        '访问邮箱系统',
        '分析邮件内容',
        '追踪可疑对话',
        '破解隐藏信息'
    ],
    requiredTasks: ['access_mail', 'find_evidence', 'decode_secret','mail_server'],
    fileSystem: {
        '~': ['readme.txt', 'mail_server', 'notes.txt'],
        '~/mail_server': ['inbox', 'sent', 'draft', 'trash'],
        '~/mail_server/inbox': ['alex.mbox', 'sarah.mbox', 'mike.mbox'],
        '~/mail_server/sent': ['outbox.log'],
        '~/mail_server/draft': ['.secret_draft'],
        '~/mail_server/trash': ['deleted.mbox']
    },
    fileContents: {
        'readme.txt': '邮件服务器分析指南：\n1. 使用 mail list 查看用户列表\n2. 使用 mail read <用户> 阅读邮件\n3. 使用 mail search <关键词> 搜索内容\n4. 注意检查草稿箱和已删除邮件\n\n[提示] 先查看 alex 的邮件',

        'notes.txt': '调查笔记：\n- Alex 最近行为异常\n- Sarah 似乎知道一些内幕\n- Mike 可能参与了计划\n- 注意检查已删除的邮件\n\n[提示] 使用 mail trash 查看回收站',

        'alex.mbox': `发件人: sarah@company.com
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

Mike`,

        'sarah.mbox': `发件人: mike@company.com
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

        'mike.mbox': `发件人: sarah@company.com
主题: 新的安排
时间: 2024-01-13 11:20

Mike,
记住新的暗号：
"车马相交，王车易位"
这是最后的行动代号。

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

        '.secret_draft': `[草稿]
主题: 最终确认

行动代号已定：
KING_ROOK_2024

请销毁这个草稿。
[此邮件未发送]`,

        'deleted.mbox': `[已删除]
发件人: sarah@company.com
主题: 紧急！
时间: 2024-01-15 15:30

销毁所有相关文件！
记住最后的行动代号！
按照象棋术语修改。

[此邮件已标记为删除]`,

        'outbox.log': '邮件发送日志：\n2024-01-13 - 5封\n2024-01-14 - 8封\n2024-01-15 - 12封\n\n异常：15日邮件数量激增\n建议检查15日的邮件内容'
    },
    hints: [
        '使用 mail list 查看所有邮箱用户',
        '仔细阅读 Sarah 的邮件中提到的密码规则',
        '注意 Mike 提到的象棋术语',
        '检查草稿箱中的未发送邮件',
        '将发现的线索组合成正确的密码格式'
    ]
}; 