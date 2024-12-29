import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";

const wiresharkCommand: Command = {
    name: "wireshark",
    description: "分析数据包内容",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 8) {
            return "wireshark: 命令不可用";
        }

        if (!args.length) {
            return "Usage: wireshark <文件名>";
        }

        if (args[0] === "packets.pcap") {
            if (!gameStore.completedTasks.includes("start_capture")) {
                return "错误：文件为空，请先使用 tcpdump 捕获数据包";
            }
            gameStore.completeTask("analyze_packet");
            return `分析结果：
1. 协议：TCP
2. 源地址：10.0.0.100:31337
3. 目标地址：10.0.0.1:31337
4. 警告检到密码泄露
5. 阻止方法: iptables -A OUTPUT -d <目标地址IP> -j DROP`;
        }

        return `wireshark: ${args[0]}: 文件不存在`;
    }
};

const iptablesCommand: Command = {
    name: "iptables",
    description: "配置防火墙规则",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 8) {
            return "iptables: 命令不可用";
        }

        if (!args.length) {
            return "Usage: iptables <规则>";
        }

        // 检查是否是正确的阻止规则
        const command = args.join(" ");
        if (command === "-A OUTPUT -d 10.0.0.1 -j DROP") {
            gameStore.completeTask("block_leak");
            return `防火墙规则已添加：
1. 阻止所有到 10.0.0.1 的连接
2. 数据泄露已被阻止
3. 系统安全状态：已恢复

发现通关密码：5CHaJ1_2024`;
        }

        return "规则格式错误或目标IP无效";
    }
};

export const level8Commands: { [key: string]: Command } = {
    wireshark: wiresharkCommand,
    iptables: iptablesCommand,

};