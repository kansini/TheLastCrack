import type { Command } from "@/types/terminal";
import { useGameStore } from "@/stores/game";
import { useTerminalStore } from "@/stores/terminal";

export const trojanCommand: Command = {
    name: "trojan",
    description: "创建后门",
    execute: async () => {
        const gameStore = useGameStore();
        const terminalStore = useTerminalStore();
        
        if (!gameStore.completedTasks.includes("server_access")) {
            return "你需要先登录远程服务器！";
        }

        // 初始进度显示
        terminalStore.addLine('output', "木马程序植入中！\n[                                    ] 0%");

        // 模拟进度更新
        for (let i = 1; i <= 10; i++) {
            await new Promise(resolve => setTimeout(resolve, 200));
            const progress = i * 10;
            const equals = "=".repeat(Math.floor(progress / 2.5));
            const spaces = " ".repeat(40 - equals.length);
            
            // 更新最后一行
            terminalStore.history[terminalStore.history.length - 1] = {
                type: 'output',
                content: `木马程序植入中！\n[${equals}${spaces}] ${progress}%`,
                timestamp: Date.now(),
                directory: terminalStore.currentDirectory
            };
        }

        // 添加木马运行动画
        const runningStates = [
            "初始化系统服务...",
            "建立远程连接...",
            "获取系统权限...",
            "隐藏程序进程...",
            "开始数据采集...",
        ];

        for (const state of runningStates) {
            await new Promise(resolve => setTimeout(resolve, 300));
            terminalStore.addLine('output', state);
        }

        // 模拟数据接收动画
        const dataLines = [
            "接收数据包: 0x7F3A9B2C",
            "解析系统信息...",
            "发现加密数据..."
        ];

        for (const line of dataLines) {
            await new Promise(resolve => setTimeout(resolve, 250));
            terminalStore.addLine('output', line);
        }

        // 字符翻滚动画
        const target = "UifMbtuDsbdl";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        let current = Array(target.length).fill('_').join('');
        
        terminalStore.addLine('output', `正在解密: ${current}`);
        
        // 为每个位置生成随机字符序列
        for (let i = 0; i < target.length; i++) {
            // 每个字符位置随机翻滚3-5次
            const rolls = 3 + Math.floor(Math.random() * 3);
            for (let j = 0; j < rolls; j++) {
                await new Promise(resolve => setTimeout(resolve, 50));
                const randomChar = chars[Math.floor(Math.random() * chars.length)];
                current = current.substring(0, i) + randomChar + current.substring(i + 1);
                
                // 更新最后一行
                terminalStore.history[terminalStore.history.length - 1] = {
                    type: 'output',
                    content: `正在解密: ${current}`,
                    timestamp: Date.now(),
                    directory: terminalStore.currentDirectory
                };
            }
            // 设置最终字符
            current = current.substring(0, i) + target[i] + current.substring(i + 1);
            terminalStore.history[terminalStore.history.length - 1] = {
                type: 'output',
                content: `正在解密: ${current}`,
                timestamp: Date.now(),
                directory: terminalStore.currentDirectory
            };
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // 完成后更新最终状态
        gameStore.completeTask("trojan_planted");
        return `植入成功！\n\n获取到字符串：${target}\n解码获取真实密码`;
    }
}; 