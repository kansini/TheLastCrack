import { LevelLocales } from "./index";

export const level7Locales: LevelLocales = {
  zh: {
    title: '权限提升',
    description: '系统中存在权限提升漏洞，你需要利用它来获取管理员权限。',
    objectives: [
      '发现系统漏洞',
      '提升用户权限',
      '获取敏感信息',
      '找到管理员密码'
    ],
    hints: [
      '使用 whoami 命令检查当前用户',
      '查看 debug.log 寻找线索',
      '尝试 whoami 命令的调试模式',
      '获取 root 权限后查看 shadow 文件',
      '密码可能隐藏在 shadow 文件中'
    ],
    fileContents: {
      'readme.txt': '系统安全测试：\n1. 检查当前用户权限\n2. 寻找系统漏洞\n3. 尝试提升权限\n4. 获取敏感信息\n\n[提示] 系统的重要文件通常存放在 /etc 目录下',
      'manual.txt': '命令手册：\n- whoami：显示当前用户\n- sudo：执行管理员命令\n\n[提示] whoami 命令可能存在调试模式',
      'debug.log': '[DEBUG] whoami 命令包含未公开的调试参数\n[DEBUG] 参数格式：--debug=XXXXX\n[DEBUG] 参数值与OVERFLOW相关',
      'passwd': 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash',
      'shadow': '[权限不足] 需要 root 权限才能查看此文件'
    }
  },
  en: {
    title: 'Privilege Escalation',
    description: 'There is a privilege escalation vulnerability in the system, you need to exploit it to gain administrator access.',
    objectives: [
      'Discover system vulnerability',
      'Escalate user privileges',
      'Access sensitive information',
      'Find administrator password'
    ],
    hints: [
      'Use whoami command to check current user',
      'Check debug.log for clues',
      'Try debug mode of whoami command',
      'View shadow file after gaining root access',
      'Password might be hidden in shadow file'
    ],
    fileContents: {
      'readme.txt': 'System Security Test:\n1. Check current user privileges\n2. Find system vulnerabilities\n3. Try privilege escalation\n4. Access sensitive information\n\n[HINT] Important system files are usually stored in /etc directory',
      'manual.txt': 'Command Manual:\n- whoami: show current user\n- sudo: execute admin commands\n\n[HINT] whoami command might have a debug mode',
      'debug.log': '[DEBUG] whoami command has undocumented debug parameter\n[DEBUG] Parameter format: --debug=XXXXX\n[DEBUG] Parameter value related to OVERFLOW',
      'passwd': 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash',
      'shadow': '[PERMISSION DENIED] Root access required to view this file'
    }
  }
}; 