import { LevelLocales } from "./index";

export const level13Locales: LevelLocales = {
  zh: {
    title: "木马渗透",
    description: "我们发现了一个可疑的远程服务器，需要你通过社会工程学和技术手段获取访问权限，植入木马程序并收集情报。",
    objectives: [
      "分析服务器信息",
      "获取访问权限",
      "植入木马程序",
      "收集情报信息",
      "获取通关密码"
    ],
    hints: [
      "仔细阅读邮件中的信息，特别是关于密码策略的部分",
      "注意Robert的生日信息",
      "密码格式是UserMMDD",
      "成功登录后，使用trojan植入木马",
      "使用decoder解码收集到的信息",
      "最终密码由解码后的数据片段组成"
    ],
    fileContents: {
      "readme.txt": "进入远程服务器，并成功植入木马。\n任务步骤：\n1. 获取远程服务器密码\n1. 进入远程服务器\n2. 植入木马\n4. 解码木马程序收集的加密数据",
      "server_info.txt": "目标服务器信息：\n\nIP: 10.0.13.37\n管理员: Robert Johnson\n系统: CentOS 7\n\n备注：服务器最近进行了安全升级，但管理员习惯使用简单密码。",
      "admin_notice.eml": "From: admin@company.local\nTo: all@company.local\nSubject: 系统维护通知\n\n各位同事：\n\n本周五将进行例行系统维护。维护期间(15:00-17:00)系统将暂时无法访问。\n请提前做好相关工作安排。\n\nPS: Robert记得把你的密码改掉，用生日作密码太不安全了。\n\n系统管理员",
      "tech_report.eml": "From: tech@company.local\nTo: admin@company.local\nSubject: 安全审计报告\n\n管理员：\n\n本月的安全审计发现以下问题：\n1. 部分用户密码过于简单\n2. 系统日志显示多次失败的登录尝试\n3. Robert的账号仍在使用默认密码格式(用户名生日MMDD)\n\n请尽快处理。",
      "maintenance.eml": "From: robert.j@company.local\nTo: tech@company.local\nSubject: Re: 生日会\n\n谢谢大家记得我的生日！\n\n是的，3月15号确实是我的生日，欢迎大家来参加派对！\n\nRobert",
      "remote.exe": "[远程工具]\n用法: remote <IP> <username> <password>  \n\n说明：登录远程服务器。",
      "trojan.exe": "[木马程序]\n用法: trojan \n说明：该程序会在目标系统创建一个后门，并每隔5分钟发送一次系统信息。",
      "decoder.exe": "[解码工具]\n用法: decoder [数据文件]\n\n说明：用于解码木马程序收集的加密数据。"
    }
  },
  en: {
    title: "Trojan Infiltration",
    description: "We found a suspicious remote server. You need to gain access through social engineering and technical means, plant a trojan program and gather intelligence.",
    objectives: [
      "Analyze server information",
      "Gain access privileges",
      "Plant trojan program",
      "Gather intelligence",
      "Get the password"
    ],
    hints: [
      "Carefully read information in emails, especially about password policy",
      "Pay attention to Robert's birthday",
      "Password format is UserMMDD",
      "After login, use trojan to plant the malware",
      "Use decoder to decode collected information",
      "Final password consists of decoded data fragments"
    ],
    fileContents: {
      "readme.txt": "Access remote server and successfully plant the trojan.\nTask steps:\n1. Get remote server password\n2. Access remote server\n3. Plant trojan\n4. Decode encrypted data collected by trojan",
      "server_info.txt": "Target Server Info:\n\nIP: 10.0.13.37\nAdmin: Robert Johnson\nSystem: CentOS 7\n\nNote: Server recently had security upgrade, but admin tends to use simple passwords.",
      "admin_notice.eml": "From: admin@company.local\nTo: all@company.local\nSubject: System Maintenance Notice\n\nDear colleagues:\n\nRoutine system maintenance will be performed this Friday. System will be unavailable during maintenance (15:00-17:00).\nPlease plan your work accordingly.\n\nPS: Robert remember to change your password, using birthday is not secure.\n\nSystem Admin",
      "tech_report.eml": "From: tech@company.local\nTo: admin@company.local\nSubject: Security Audit Report\n\nAdmin:\n\nThis month's security audit found following issues:\n1. Some user passwords too simple\n2. System logs show multiple failed login attempts\n3. Robert's account still using default password format (username birthday MMDD)\n\nPlease address ASAP.",
      "maintenance.eml": "From: robert.j@company.local\nTo: tech@company.local\nSubject: Re: Birthday Party\n\nThanks everyone for remembering my birthday!\n\nYes, March 15th is indeed my birthday, welcome to the party!\n\nRobert",
      "remote.exe": "[REMOTE TOOL]\nUsage: remote <IP> <username> <password>\n\nDescription: Login to remote server.",
      "trojan.exe": "[TROJAN PROGRAM]\nUsage: trojan\nDescription: This program creates a backdoor on target system and sends system info every 5 minutes.",
      "decoder.exe": "[DECODER TOOL]\nUsage: decoder [datafile]\n\nDescription: Used to decode encrypted data collected by trojan program."
    }
  }
}; 