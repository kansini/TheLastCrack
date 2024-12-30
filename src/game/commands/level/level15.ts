import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";


const ssh_exploitCommand: Command = {
    name: "ssh_exploit",
    description: "SSH漏洞利用工具",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 15) {
            return "ssh_exploit: 命令不可用";
        }

        if (!args.length) {
            return "Usage: ssh_exploit <target> [--check|--exploit]";
        }

        const target = args[0];
        const option = args[1] || "--check";

        if (option === "--check") {
            if (!gameStore.completedTasks.includes("analyze_vuln")) {
                return "你需要先分析漏洞报告！";
            }
            gameStore.completeTask("check_service");
            return `[*] 检查目标系统: ${target}
[+] 发现OpenSSH 8.9p1
[+] 确认存在CVE-2024-9999漏洞
[*] 使用 --exploit 参数进行漏洞利用`;
        }

        if (option === "--exploit") {
            if (!gameStore.completedTasks.includes("check_service")) {
                return "你需要先检查服务是否存在漏洞！";
            }
            gameStore.completeTask("exploit_vuln");
            gameStore.completeTask("get_root");
            return `[*] 开始漏洞利用...
[+] 构建ROP链
[+] 注入Shellcode
[+] 发送Payload
[!] 获得root权限！
[+] 系统信息：
    - 主机名: vulnserver
    - 系统版本: Ubuntu 20.04.3
    - SSH端口: 22
[*] 漏洞利用成功，请使用格式：CVE编号_操作系统版本_端口号 解锁下一关`;
        }

        return "无效的参数，使用 --check 或 --exploit";
    }
};
export const level15Commands: { [key: string]: Command } = {
    ssh_exploit: ssh_exploitCommand
};