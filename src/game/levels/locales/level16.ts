import { LevelLocales } from "./index";

export const level16Locales: LevelLocales = {
  zh: {
    title: "可疑人员档案",
    description: "我们在一个加密的文件系统中发现了一些可疑人员的档案，需要你通过分析各种文件中的线索来找出关键信息。",
    objectives: [
      "阅读 readme.txt 了解基本信息",
      "在文件中找到查看档案的命令",
      "分析可疑人员档案",
      "找出并输入正确的密码"
    ],
    hints: [
      "使用 ls 和 cd 命令浏览所有文件和目录",
      "仔细阅读 system.log 中的密码格式说明",
      "使用 personnel 和 view 命令查看所有档案",
      "注意分析可疑人员的活动规律",
      "对比不同文件中的信息，寻找关键线索",
      "重点关注年龄信息与实际行为不符的人员"
    ],
    fileContents: {
      "readme.txt": "欢迎来到档案分析系统\n------------------------\n1. 使用 ls 命令查看当前目录下的文件\n2. 使用 cd 命令进入子目录\n3. 使用 cat 命令查看文件内容\n\n[提示] 在某些文件中隐藏着查看档案的特殊命令",
      "notes.txt": "调查笔记：\n-----------------\n1. 发现多个可疑人员，需要进一步调查\n2. 他们使用了某种特殊的命令系统\n3. 注意：personnel 命令可能会很有用\n4. 重点关注最近一周内的异常活动",
      "memo.txt": "备忘录：\n-----------------\n- 检查 chat_log.txt 中的可疑对话\n- 留意 system.log 中的异常记录\n- 命令格式：view <档案编号>\n- 重要：所有档案编号都以 P 开头\n- 注意：有些人员可能使用了假身份",
      "chat_log.txt": "[2023-12-15 10:30] User1: 你看到那个可疑的人了吗？\n[2023-12-15 10:31] User2: 对，就是那个40来岁的，看起来很危险\n[2023-12-15 10:32] User1: 他好像和一些黑客组织有联系\n[2023-12-15 10:33] User2: 我们应该用 suspect 命令标记他\n[2023-12-15 10:34] User1: 记得先用 personnel 命令查看完整列表\n[2023-12-15 10:35] User3: 别被表面年龄迷惑，P007那个25岁的也很可疑\n[2023-12-15 10:36] User1: P012的行为也很奇怪，虽然他声称是35岁\n[2023-12-15 10:37] User2: 还有P003，最近总是深夜活动",
      "system.log": "系统日志：\n-----------------\n[警告] 检测到多个可疑人员活动\n[警告] P003, P007, P012 最近行为异常\n[警告] P015, P009 出现在敏感区域\n[错误] 访问限制：需要正确的密码\n[提示] 密码格式：<档案编号>_<年龄>_<姓名首字母缩写>\n[示例] P001_35_RJ",
      ".secret": "隐藏命令列表：\n-----------------\npersonnel - 查看可疑人员列表\nview <档案编号> - 查看详细档案\nsuspect <档案编号> - 标记嫌疑人\n\n[注意] 在标记嫌疑人之前，请仔细分析所有档案信息",
      "report.txt": "调查报告：\n-----------------\n1. P003 - 多次出现在数据中心附近\n2. P007 - 与已知黑客组织有联系\n3. P012 - 身份信息疑似伪造\n4. P015 - 经常与可疑人员接触\n5. P009 - 最近行为模式改变\n\n重点关注：年龄与声称不符的人员",
      "timeline.txt": "可疑活动时间线：\n-----------------\n12/10 - P015在机房逗留\n12/11 - P007与外部联系\n12/12 - P009异常登录\n12/13 - P012身份异常\n12/14 - P003深夜活动\n12/15 - 系统异常",
      "connections.txt": "人员关系分析：\n-----------------\n- P003与P012有频繁接触\n- P007独立行动\n- P015与P009形成小组\n- P012声称的背景存疑\n- P003的年龄信息最可疑\n\n[分析结果]\n最危险人物特征：\n- 年龄与记录不符\n- 深夜活动频繁\n- 出现在敏感区域"
    }
  },
  en: {
    title: "Suspicious Personnel Files",
    description: "We found some suspicious personnel files in an encrypted file system. You need to analyze various files to find key information.",
    objectives: [
      "Read readme.txt for basic information",
      "Find commands to view personnel files",
      "Analyze suspicious personnel files",
      "Find and enter correct password"
    ],
    hints: [
      "Use ls and cd commands to browse all files and directories",
      "Carefully read password format in system.log",
      "Use personnel and view commands to check all files",
      "Pay attention to suspicious personnel activity patterns",
      "Compare information from different files to find key clues",
      "Focus on personnel whose age doesn't match their behavior"
    ],
    fileContents: {
      "readme.txt": "Welcome to the Personnel File Analysis System\n------------------------\n1. Use ls command to view files in the current directory\n2. Use cd command to enter subdirectories\n3. Use cat command to view file contents\n\n[Hint] Special commands to view personnel files are hidden in some files",
      "notes.txt": "Investigation Notes:\n-----------------\n1. Multiple suspicious personnel found, further investigation required\n2. They use a special command system\n3. Note: personnel command may be useful\n4. Focus on unusual activity in the past week",
      "memo.txt": "Memo:\n-----------------\n- Check suspicious conversations in chat_log.txt\n- Pay attention to unusual records in system.log\n- Command format: view <file number>\n- Important: All file numbers start with P\n- Note: Some personnel may be using fake identities",
      "chat_log.txt": "[2023-12-15 10:30] User1: Have you seen the suspicious person?\n[2023-12-15 10:31] User2: Yes, the one in his 40s, looks dangerous\n[2023-12-15 10:32] User1: He seems to be in contact with some hacker groups\n[2023-12-15 10:33] User2: We should mark him with the suspect command\n[2023-12-15 10:34] User1: Remember to use personnel command to view the complete list first\n[2023-12-15 10:35] User3: Don't be fooled by age, P007 the 25-year-old is also suspicious\n[2023-12-15 10:36] User1: P012's behavior is also strange, although he claims to be 35\n[2023-12-15 10:37] User2: And P003, who's always active late at night",
      "system.log": "System Log:\n-----------------\n[Warning] Multiple suspicious personnel activity detected\n[Warning] P003, P007, P012 recently behaved unusually\n[Warning] P015, P009 appeared in sensitive areas\n[Error] Access restricted: Correct password required\n[Hint] Password format: <file number>_<age>_<initials>\n[Example] P001_35_RJ",
      ".secret": "Hidden Commands:\n-----------------\npersonnel - View suspicious personnel list\nview <file number> - View detailed file\nsuspect <file number> - Mark suspect\n\n[Note] Before marking a suspect, please thoroughly analyze all file information",
      "report.txt": "Investigation Report:\n-----------------\n1. P003 - Frequently appeared near the data center\n2. P007 - In contact with known hacker groups\n3. P012 - Identity information suspected to be falsified\n4. P015 - Frequently in contact with suspicious personnel\n5. P009 - Recent behavioral pattern change\n\nFocus on personnel whose age doesn't match their claims",
      "timeline.txt": "Suspicious Activity Timeline:\n-----------------\n12/10 - P015 stayed in the server room\n12/11 - P007 contacted externally\n12/12 - P009 logged in abnormally\n12/13 - P012 identity anomaly\n12/14 - P003 late-night activity\n12/15 - System anomaly",
      "connections.txt": "Personnel Relationship Analysis:\n-----------------\n- P003 and P012 have frequent contact\n- P007 acts independently\n- P015 and P009 form a group\n- P012's background claimed to be suspicious\n- P003's age information most suspicious\n\n[Analysis Result]\nMost Dangerous Characteristics:\n- Age doesn't match records\n- Late-night activity frequent\n- Appears in sensitive areas"
    }
  }
}; 