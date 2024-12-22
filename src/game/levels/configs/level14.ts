import type { LevelData } from '@/types/game';

export const level14: LevelData = {
    id: 14,
    title: "人员追踪",
    description: "【第14关】我们发现了一些可疑的人员资料，需要通过分析这些资料找到关键人物，并从他们的会议记录和邮件中获取重要信息。",
    objectives: [
        "分析人员资料",
        "找到关键人物",
        "查看会议记录",
        "检查邮件往来",
        "获取通关密码"
    ],
    requiredTasks: ["find_person", "check_meeting", "read_mail"],
    fileSystem: {
        "~": ["readme.txt", "staff", "meetings", "mails"],
        "~/staff": ["employees.csv", "departments.txt", "access_logs.txt"],
        "~/meetings": ["meeting_2024_01.md", "meeting_2024_02.md", ".private_notes.txt"],
        "~/mails": ["inbox", "sent", "drafts"],
        "~/mails/inbox": ["project_update.eml", "security_alert.eml", "team_notice.eml"],
        "~/mails/sent": ["meeting_summary.eml", "project_plan.eml"],
        "~/mails/drafts": [".secret_memo.txt"]
    },
    fileContents: {
        "readme.txt": `任务简报：
1. 分析员工资料找到可疑人员
2. 查看相关会议记录
3. 检查邮件通信
4. 将收集到的信息组合成密码

提示：注意观察员工的访问记录和异常行为`,

        "employees.csv": `工号,姓名,部门,职位,入职时间
1001,张明,技术部,高级工程师,2020-01-15
1002,李华,人事部,主管,2019-06-20
1003,王芳,财务部,经理,2018-03-10
1004,陈静,技术部,系统架构师,2017-08-05
1005,刘强,安全部,安全专家,2021-02-28
注意：最近发现刘强经常在非工作时间访问系统`,

        "departments.txt": `部门分布：
技术部 - 主要负责系统开发和维护
人事部 - 负责人员管理和招聘
财务部 - 负责公司财务和预算
安全部 - 负责系统安全和审计

备注：安全部最近在进行一个代号为"Phoenix"的机密项目`,

        "access_logs.txt": `系统访问记录：
[2024-02-15 23:45] 刘强(1005) 访问了机密文件服务器
[2024-02-16 02:30] 刘强(1005) 导出了大量数据
[2024-02-16 03:15] 刘强(1005) 删除了访问日志
[2024-02-16 04:00] 系统检测到异常访问

可疑行为：刘强在深夜时段的异常操作`,

        "meeting_2024_01.md": `# 2024年1月项目会议记录

与会人员：张明、陈静、刘强
议题：Phoenix项目进展

1. 项目进度
- 基础架构已完成
- 安全模块待优化
- 预计3月完成

2. 遇到的问题
- 系统性能需要提升
- 安全性有待加强

3. 下一步计划
- 完善安全机制
- 准备部署测试

备注：刘强提出了一些很独特的安全解决方案`,

        "meeting_2024_02.md": `# 2024年2月项目会议记录

与会人员：张明、陈静
议题：系统异常情况

1. 发现问题
- 系统出现异常访问
- 部分日志被删除
- 数据外泄风险

2. 应对措施
- 立即关闭外部访问
- 排查安全漏洞
- 审计所有日志

备注：刘强缺席本次会议`,

        ".private_notes.txt": `私密记录：

刘强最近的行为很可疑：
1. 经常加班到深夜
2. 频繁访问核心服务器
3. 多次尝试清除日志
4. 在项目群里提到"Phoenix"将浴火重生

重要：发现他使用了一个特殊的密码格式
格式：项目代号_姓名缩写_工号（全部大写）
例如：如果项目代号是TEST，姓名缩写是ZS，工号是1001
那么密码就是：TEST_ZS_1001`,

        "project_update.eml": `发件人: zhang.ming@company.com
收件人: team@company.com
主题: 项目进展更新

团队：

Phoenix项目进展顺利，但发现一些安全隐患。
请各位提高警惕，特别注意数据安全。

张明`,

        "security_alert.eml": `发件人: system@company.com
收件人: admin@company.com
主题: 安全警报

检测到以下异常：
- 用户ID：1005
- 行为：大量数据导出
- 时间：2024-02-16 凌晨
- 位置：机密服务器

请立即处理！`,

        "team_notice.eml": `发件人: li.hua@company.com
收件人: all@company.com
主题: 关于近期异常情况的通知

各位同事：

近期发现有人在非工作时间访问系统。
请大家提高警惕，加强安全意识。

李华
人事部`,

        "meeting_summary.eml": `发件人: chen.jing@company.com
收件人: manager@company.com
主题: 会议纪要

今天的会议上讨论了安全问题。
刘强的一些行为值得关注。
建议加强监控和审计。

陈静`,

        "project_plan.eml": `发件人: liu.qiang@company.com
收件人: tech@company.com
主题: Phoenix项目计划

团队：

项目代号：PHOENIX（注意：所有项目相关的密码必须使用大写字母）
执行人：刘强(LQ)
工号：1005
时间：2024年Q1
目标：系统重构

请严格遵守项目安全规范。

刘强`,

        ".secret_memo.txt": `备忘录：

项目代号：Phoenix
执行人：刘强(工号1005)
关键词：浴火重生

注意：这个备忘录不要发给任何人`
    },
    hints: [
        "仔细查看员工资料中的异常记录",
        "注意观察刘强的可疑行为",
        "检查会议记录中的重要信息",
        "查看邮件中提到的项目代号",
        "密码格式：项目代号_姓名缩写_工号（全部大写）",
        "项目代号是Phoenix，刘强的缩写是LQ，工号是1005"
    ]
}; 