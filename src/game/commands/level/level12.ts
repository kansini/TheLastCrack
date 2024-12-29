import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
const loganalyzerCommand: Command = {
    name: "loganalyzer",
    description: "分析日志文件中的异常模式",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 12) {
            return "loganalyzer: 命令不可用";
        }

        if (!args.length) {
            return "Usage: loganalyzer <日志文件>";
        }

        const logFile = args[0];
        const validLogs = ["auth.log", "system.log", "access.log", "error.log"];

        if (!validLogs.includes(logFile)) {
            return `loganalyzer: ${logFile}: 不是有效的日志文件`;
        }

        gameStore.completeTask("analyze_logs");

        if (logFile === "auth.log") {
            return `分析结果：
1. 检测到暴力破解试
   - 目标账户: admin, root, administrator
   - 来源IP: 192.168.1.100
   - 时间范围: 02:13:45 - 02:14:01
2. 成功登录
   - 用户: guest
   - 时间: 02:14:30
3. 权限提升尝试
   - 命令: sudo su
   - 结果: 失败
4. 可疑行为
   - 尝试访问 /root 目录
   - 权限被拒绝
   `;
        }

        if (logFile === "system.log") {
            return `分析结果：
1. 系统异常
   - CPU 使用率异常（02:15:00）
   - 多次访问敏感目录（02:15:30）
   - 网络流量异常（02:16:00）
2. 会话信息
   - 开始时间: 02:14:30
   - 结束时间: 02:16:10
3. 连接信息
   - IP: 192.168.1.100
   - 持续时间: 约2分35秒

[提示] 发现多个可疑事件，建议使用 timeline 命令生成完整的攻击过程时间线`;
        }

        if (logFile === "access.log") {
            return `分析结果：
1. 攻击模式
   - 初始探测: login.php
   - 提权尝试: admin/config.php
   - 数据窃取: backup/db.sql, data/users.csv
   - 路径穿越: ../../../etc/passwd
2. 成功获取
   - users.csv (15360 bytes)
3. 攻击时间线
   - 开始: 02:13:45
   - 结束: 02:16:00
4. 攻击特征
   - 目录遍历
   - 权限绕过
   - 敏感信息泄露

[提示] 发现两种不同类型的攻击事件：
- 系统层面的入侵尝试(system)
- Web应用层面的攻击行为(web)
- 事件ID:666
`;
        }

        if (logFile === "error.log") {
            return `分析结果：
1. 安全警告
   - 未授权访问管理区域
   - 目录遍历攻击
   - 路径穿越尝试
2. 数据泄露
   - 文件: users.csv
   - 大小: 较大
3. 攻击手法
   - Web应用漏洞利
   - 参数篡改
   - 访问控制绕过`;
        }

        return "分析完成。";
    }
};


const traceCommand: Command = {
    name: "trace",
    description: "追踪IP地址活动",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 12) {
            return "trace: 命令不可用";
        }

        if (!args.length) {
            return "Usage: trace <IP地址>";
        }

        const ip = args[0];
        if (ip === "192.168.1.100") {
            return `IP追踪结果：
来源: 192.168.1.100
提示：这是一个伪装的内网IP地址无法进行追踪`;
        }

        if (ip === "185.192.69.69") {
            gameStore.completeTask("find_data");
            return `IP追踪结果：
来源: 185.192.69.69 (真实攻击源)
活动摘要：
1. 连接信息
   - 首次连接：02:13:40
   - 最后活动：02:16:15
   - 总连接时间：2分35秒

2. 行为特征
   - 使用IP伪装技术
   - 多次失败的登录尝试
   - 成功获取普通用户权限
   - 尝试提升权限
   - 访问敏感目录和文件
   - 成功窃取数据：users.csv

3. 攻击特征
   - 使用自动化工具
   - 目标明确
   - 熟悉系统结构
   - 专业的渗透测试手法

4. 威胁等级：高
   - 成功窃取敏感数据
   - 可能会再次尝试入侵
   - 建议立即修改所有密码
   - 更新访问控制策略

解锁密码：L0G_H4CK_2024`;
        }

        return `trace: ${ip}: 未找到相关活动记录`;
    }
};
export const level12Commands: { [key: string]: Command } = {
    loganalyzer: loganalyzerCommand,
    trace: traceCommand,
};