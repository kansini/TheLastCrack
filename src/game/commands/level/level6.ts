import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
import {useLanguageStore} from "@/stores/language";

const analyzeCommand: Command = {
    name: "analyze",
    description: "分析数据包内容",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 6) {
            return "analyze: 命令不可用";
        }

        if (!args.length) {
            return "Usage: analyze <文件名>";
        }

        if (args[0] === "network.pcap") {
            if (!gameStore.completedTasks.includes("analyze_traffic")) {
                return "提示：请先使用 tcpdump SYN 命令捕获可疑的扫描包";
            }
            gameStore.completeTask("find_vulnerability");
            return `分析报告：
1. 攻击类型：SYN Flood 扫描
2. 攻击源：192.168.1.100
3. 目标端口：80, 443, 22
4. 漏洞位置：防火墙规则配置
5. 建议操作：更新防火墙规则

[提示] 系统需要恢复，请使用命令进行系统恢复`;
        }

        return `analyze: ${args[0]}: 文件不存在`;
    }
};

const restoreCommand: Command = {
    name: "restore",
    description: "恢复系统状态",
    execute: () => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 6) {
            return "restore: 命令不可用";
        }

        if (!gameStore.completedTasks.includes("find_vulnerability")) {
            return "错误：请分析可疑数据包";
        }

        gameStore.completeTask("system_restore");
        return `系统恢复完成
1. 已清理恶意程序残留
2. 已恢复系统服务
3. 已更新安全策略
4. 系统状态：正常

恢复密码：OlDHong_2077`;
    }
};
const tcpdumpCommand: Command = {
    name: "tcpdump",
    description: "捕获网络数据包",  // 保持静态描述
    execute: (args: string[]) => {
        const languageStore = useLanguageStore();
        const t = languageStore.t;
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 6 && gameStore.currentLevel !== 8) {
            return `tcpdump: ${t("invalidCommand")}`;
        }

        if (!args.length) {
            return `${t("invalidUsage")}: tcpdump <${t("filter")}>`;
        }

        if (gameStore.currentLevel === 6) {
            if (args.includes("SYN")) {
                gameStore.completeTask("analyze_traffic");
                return `${t("captureStart")}

[21:00:01] TCP 192.168.1.100:12345 > 10.0.0.1:80 SYN
[21:00:02] TCP 192.168.1.100:12346 > 10.0.0.1:443 SYN
[21:00:03] TCP 192.168.1.100:12347 > 10.0.0.1:22 SYN

[${t("analysis")}] ${t("suspiciousScan")}：
1. ${t("sourceIP")}: 192.168.1.100
2. ${t("targetPorts")}: 80, 443, 22
3. ${t("attackType")}: ${t("synScan")}

[${t("hints")}] ${t("analyzeHint")}`;
            }
            return t("filterHint");
        }

        if (args.includes("port") && args.includes("31337")) {
            gameStore.completeTask("start_capture");
            return `开始捕获数据包...
[21:00:01] IP 10.0.0.100.31337 > 10.0.0.1.31337: TCP
[21:00:02] IP 10.0.0.1.31337 > 10.0.0.100.31337: TCP
[21:00:03] IP 10.0.0.100.31337 > 10.0.0.1.31337: TCP PSH


捕获完成！可疑数据包已保存到 packets.pcap`;
        }

        return "未发现可疑数据包";
    }
};
export const level6Commands: { [key: string]: Command } = {
    analyze: analyzeCommand,
    restore: restoreCommand,
    tcpdump: tcpdumpCommand,

};