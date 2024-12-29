import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
const mailListCommand: Command = {
    name: "mail",
    description: "邮箱操作命令",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 11) {
            return "mail: 命令不可用";
        }

        if (!args.length) {
            return "Usage: mail <list|read|search|trash|draft> [参数]";
        }

        const subCommand = args[0];

        if (subCommand === "list") {
            return `可用邮列表：
- alex@company.com
- sarah@company.com
- mike@company.com`;
        }

        if (subCommand === "read") {
            if (args.length < 2) {
                return "Usage: mail read <用户名>";
            }
            const user = args[1].toLowerCase();
            if (!["alex", "sarah", "mike"].includes(user)) {
                return "用户不存在";
            }
            gameStore.completeTask("access_mail");
            return gameStore.currentLevelData.fileContents[`${user}.mbox`];
        }

        if (subCommand === "search") {
            if (args.length < 2) {
                return "Usage: mail search <关键词>";
            }
            const keyword = args[1].toLowerCase();
            if (keyword === "密码" || keyword === "暗号" || keyword === "象棋" || keyword === "chess") {
                gameStore.completeTask("find_evidence");
                return `搜索结果：
1. Sarah 提到了新的密码规则
2. Mike 提到了象棋术语
3. 发现了一个关于"王车易位"的暗号

[提示] 检查草稿箱(draft)可能有更多线索`;
            }
            return "未找到相关邮件";
        }

        if (subCommand === "trash") {
            // gameStore.completeTask("decode_secret");
            return gameStore.currentLevelData.fileContents["deleted.mbox"];
        }
        if (subCommand === "draft") {
            gameStore.completeTask("decode_secret");
            return gameStore.currentLevelData.fileContents[".secret_draft"];
        }

        return "无效的邮件命令";
    }
};
export const level11Commands: { [key: string]: Command } = {
    mail: mailListCommand
};