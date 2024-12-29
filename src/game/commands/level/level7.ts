import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";

const whoamiCommand: Command = {
    name: "whoami",
    description: "显示当前用户",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 7) {
            return "whoami: 命令不可用";
        }

        // 简化的漏洞检测逻辑
        if (args[0] === "--debug=OVERFLOW") {
            gameStore.completeTask("get_root");
            return `[漏洞触发成功]
权限提升：user -> root
当前用户：root
用户组：root wheel admin`;
        }

        return "user";  // 默认显示普通用户
    }
};

const sudoCommand: Command = {
    name: "sudo",
    description: "以管理员权限执行命令",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 7) {
            return "sudo: 命令不可用";
        }

        if (!args.length) {
            return "Usage: sudo <command>";
        }

        if (!gameStore.completedTasks.includes("get_root")) {
            return "错误：用户不在 sudoers 文件中。此事将被报告。";
        }

        const command = args.join(" ");
        if (command === "cat etc/shadow" || command === "cat ~/etc/shadow" || command === "cat shadow") {
            gameStore.completeTask("read_shadow");
            return `root:$6$xyz$hash:19000:0:99999:7:::
user:$6$abc$hash:19000:0:99999:7:::
guest:$6$def$hash:19000:0:99999:7:::

解密后的 root 密：Pr1v1l3ge_2024`;
        }

        return `sudo: ${args[0]}: 命令未找到`;
    }
};

export const level7Commands: { [key: string]: Command } = {
    whoami: whoamiCommand,
    sudo: sudoCommand,

};