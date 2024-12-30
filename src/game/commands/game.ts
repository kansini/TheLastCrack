import type { Command } from "@/types/terminal";
import { useGameStore } from "@/stores/game";
import { getCurrentLevelData } from "@/game/levels";

export const unlockCommand: Command = {
    name: "unlock",
    description: "使用密码解锁下一关",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: unlock <password>";
        }

        const gameStore = useGameStore();
        const level = gameStore.currentLevel;
        const password = args.join(" ");

        const showLevelInfo = () => {
            const nextLevel = level + 1;
            const levelData = getCurrentLevelData(nextLevel);
            return `密码正确！欢迎进入下一关...

【第${nextLevel}关】${levelData.title}
${levelData.description}

目标：
${levelData.objectives.map(obj => "- " + obj).join("\n")}

输入 help 查看可用命令`;
        };

        switch (level) {
            case 1:
                if (!gameStore.completedTasks.includes("find_secret")) {
                    return "你还没有找到必要的线索！";
                }
                if (password.toUpperCase() === "MOON_LIGHT") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 2:
                if (!gameStore.completedTasks.includes("decode_text")) {
                    return "你需要先使用 decode 命令解密文本！";
                }
                if (password === "Old Flood") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            // ... 其他关卡的判断逻辑 ...

            default:
                // return "关卡 " + level16 + " 正在紧张开发中...";
        }

        return "密码错误，请继续寻找线索。";
    }
};

export const hintCommand: Command = {
    name: "hint",
    description: "获取当前关卡的提示",
    execute: () => {
        const gameStore = useGameStore();
        const level = gameStore.currentLevel;

        switch (level) {
            case 1:
                return "提示：使用 ls -a 命令可以查看隐藏文件";
            case 2:
                return "提示：尝试解密文本，每个字母都被移动了一位";
            // ... 其他关卡的提示 ...
            default:
                return "当前关卡暂无提示";
        }
    }
}; 