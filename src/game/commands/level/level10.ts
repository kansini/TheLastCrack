import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";



const chatCommand: Command = {
    name: "chat",
    description: "查看公共聊天",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 10) {
            return "chat: 命令不可";
        }

        if (!args.length) {
            return "Usage: chat <房间>";
        }

        if (args[0] === "room1") {
            gameStore.completeTask("access_chat");
            return gameStore.currentLevelData.fileContents["public/room1.txt"];
        }

        return "房间不存在或已关闭";
    }
};

const privateCommand: Command = {
    name: "private",
    description: "查看私聊记录",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 10) {
            return "private: 命令不可用";
        }

        if (!args.length) {
            return "Usage: private <用户>";
        }

        const user = args[0].toLowerCase();
        if (["david", "eve"].includes(user)) {
            gameStore.completeTask("find_evidence");
            return `${gameStore.currentLevelData.fileContents[`private/${user}.txt`]}

[提示] 发现可疑的历史记录(2024-04-01)查看详细信息`;
        }

        return "用户不存在";
    }
};

const historyCommand: Command = {
    name: "history",
    description: "查看历史记录",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 10) {
            return "history: 命令不可用";
        }

        if (!args.length) {
            return "Usage: history <日期> (格式：YYYY-MM-DD)";
        }

        if (args[0] === "2024-04-01") {
            gameStore.completeTask("decode_plan");
            return gameStore.currentLevelData.fileContents[".deleted"];
        }

        return "没有找到指定日期的记录";
    }
};

export const level10Commands: { [key: string]: Command } = {
    chat: chatCommand,
    private: privateCommand,
    history: historyCommand,
};