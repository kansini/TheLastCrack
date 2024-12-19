import type { LevelData } from '@/types/game';

export const level12: LevelData = {
  id: 12,
  title: '日志分析',
  description: '【第12关】系统遭受了复杂的攻击，需要你运用所有掌握的技能来解决问题。',
  objectives: [
    '分析系统当前状态',
    '寻找入侵痕迹',
    '追踪攻击源',
    '恢复系统安全'
  ],
  requiredTasks: ['analyze_logs', 'track_intruder', 'find_data'],
  fileSystem: {
    '~': ['readme.txt', 'status.log', 'warning.txt', 'logs'],
    '~/logs': ['auth.log', 'system.log', 'access.log', 'error.log']
  },
  fileContents: {
    'readme.txt': `最终挑战：
系统遭受了复杂的攻击，需要你运用所有掌握的技能来解决问题。

任务步骤：
1. 分析系统当前状态
2. 寻找入侵痕迹
3. 追踪攻击源
4. 恢复系统安全

可用工具：
- loganalyzer <日志文件> - 分析日志文件
- timeline <事件> - 生成完整的事件时间线

提示：在 logs 目录中有多个需要分析的日志文件`,

    'status.log': `系统状态：
[严重] 多个服务异常
[警告] 发现未知进程
[错误] 检测到数据外泄（来自IP：192.168.1.xxx）
[警告] 网络连接异常
`,

    'warning.txt': `安全警告：
1. 系统核心文件被修改
2. 发现多个后门程序
3. 管理员密码可能泄露
4. 防火墙规则被改变


建议：
使用 loganalyzer <日志文件> 命令分析 查看检查认证记录和系统状态`,

    'auth.log': `认证日志分析将显示登录尝试和权限提升记录。
使用 loganalyzer auth.log 查看详细信息。`,

    'system.log': `系统日志包含了系统状态和进程信息。
使用 loganalyzer system.log 查看详细信息。

分析完成后，建议使用 timeline 命令查看完整的攻击过程。`,

    'access.log': `访问日志记录了所有HTTP请求和文件访问。
使用 loganalyzer access.log 查看详细信息。`,

    'error.log': `错误日志包含了所有错误和警告信息。
使用 loganalyzer error.log 查看详细信息。`
  },
  hints: [
    '先使用 cd logs 进入日志目录',
    '使用 loganalyzer auth.log 分析认证日志',
    '使用 loganalyzer system.log 分析系统日志',
    '完成日志分析后使用 timeline 命令',
    '最后使用 trace 命令追踪IP'
  ]
}; 