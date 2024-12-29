import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";

const psCommand: Command = {
    name: "ps",
    description: "查看进程列表",
    execute: () => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 4) {
            return "ps: 命令不可用";
        }

        return `PID    名称          CPU    内存   状态
1234   sysservice   85%   45%    运行中
2345   normal.exe   2%    5%     运行中
3456   update.exe   1%    3%     运行中`;
    }
}; // level4


const killCommand: Command = {
    name: "kill",
    description: "终止进程",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: kill <PID>";
        }

        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 4) {
            return "kill: 命令不可用";
        }

        const pid = args[0];
        if (pid === "1234") {
            gameStore.completeTask("kill_malware");
            return `进程已终止。
系统状态开始恢复正常...

发现通关密码：D@t@B@se_2024`;
        }

        if (pid === "1") {
            return "错误：无法终止系统核心进程";
        }

        return `kill: 进程 ${pid} 不存在`;
    }
}; // level4
export const level4Commands: { [key: string]: Command } = {
    ps: psCommand,
    kill: killCommand
};