import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";

const timelineCommand: Command = {
    name: "timeline",
    description: "分析事件时间线",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 9 && gameStore.currentLevel !== 12) {
            return "timeline: 命令不可用";
        }

        if (!args.length) {
            return "Usage: timeline <PID>";
        }

        const eventId = args[0];
        if (eventId === "666") {
            gameStore.completeTask("analyze_timeline");
            return `进程创建事件分析：
时间：02:15:00
进程：svchost.exe (PID 666)
详情：
1. 异常特征
   - 系统进程被替换
   - 内存占用异常（45MB）
   - CPU使用率过高（85%）
2. 行为分析
   - 尝试建立网络连接
   - 加载未知模块
   - 创建加密通道
3. 风险等级：高

[提示] 使用 timeline 888 分析相关的网络连接`;
        }

        if (gameStore.currentLevel === 9 && eventId === "888") {
            return `网络连接事件分析：
时间：02:15:30
连接详情：
1. 本地端口：445
2. 远程地址：185.192.69.69
3. 连接状态：ESTABLISHED
4. 关联进程：svchost.exe
5. 数据传输：
   - 发现加密数据：QkFDS0RPT1JfMjAyNA==
   
[提示] 这些数据需要解码 最终密码为：解码@YYYY-MM-DD`;
        }
        if (gameStore.currentLevel === 12 && eventId === "888") {
            return `网络连接事件分析：
时间：02:15:30
连接详情：
1. 本地端口：445
2. 远程地址：185.192.69.69
3. 连接状态：ESTABLISHED
4. 关联进程：svchost.exe`;
        }

        return "未找到指定���事件ID";
    }
};

const volatilityCommand: Command = {
    name: "volatility",
    description: "高级内存取证分析",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 9) {
            return "volatility: 命令不可用";
        }

        if (!args.length) {
            return "Usage: volatility <文件名>";
        }

        if (args[0] === "snapshot.raw") {
            gameStore.completeTask("extract_info");
            return `深度分析结果：
1. 进程分析
   - PID 666 (svchost.exe)
     注入了可疑代码
     正在进行网络通信
   - PID 888 (backdoor.exe)
     来自临时目录
     具有持久化机制

2. 网络连接
   - 外连 IP: 185.192.69.69
   - 使用加密通信
   - 数据外泄迹象

3. 内存字符串
   - 发现多个加密字符串
   - 使用 timeline 构建事件时间线
 `;
        }

        return `volatility: ${args[0]}: 文件不存在`;
    }
};


export const level9Commands: { [key: string]: Command } = {
    timeline: timelineCommand,
    volatility: volatilityCommand,

};