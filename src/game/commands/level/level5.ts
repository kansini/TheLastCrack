import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
import {useLanguageStore} from "@/stores/language";
import {level5Locales} from "../locales/level5";

export const pingCommand: Command = {
    name: "ping",
    description: level5Locales.zh.ping.description,
    execute: async (args: string[]) => {
        const {currentLanguage} = useLanguageStore();
        const t = level5Locales[currentLanguage].ping;

        if (!args.length) {
            return t.usage;
        }

        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 5) {
            return `ping: ${t.failed}`;
        }

        const ip = args[0];
        if (ip === "192.168.1.200") {
            await new Promise(resolve => setTimeout(resolve, 1000));
            gameStore.completeTask("ping_server");
            return `${t.detail.pinging.replace("%s", ip)}
${t.detail.reply.replace("%s", ip)}
${t.detail.reply.replace("%s", ip)}
${t.detail.reply.replace("%s", ip)}

${t.detail.stats.title.replace("%s", ip)}
${t.detail.stats.packets}
${t.detail.stats.times}

${t.detail.hint}`;
        }

        return t.failed.replace("%s", ip);
    }
};

export const connectCommand: Command = {
    name: "connect",
    description: level5Locales.zh.connect.description,
    execute: async (args: string[]) => {
        const {currentLanguage} = useLanguageStore();
        const t = level5Locales[currentLanguage].connect;

        if (args.length < 2) {
            return t.usage;
        }

        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 5) {
            return `connect: ${t.failed}`;
        }

        if (!gameStore.completedTasks.includes("ping_server")) {
            return t.needPing;
        }

        const [IP, username, password] = args;
        if (IP === "192.168.1.200" && username === "kansini" && password === "Netw0rk@2024") {
            await new Promise(resolve => setTimeout(resolve, 1000));
            gameStore.completeTask("connect_server");
            return t.success;
        }

        return t.wrongPassword;
    }
};

export const downloadCommand: Command = {
    name: "download",
    description: level5Locales.zh.download.description,
    execute: async (args: string[]) => {
        const {currentLanguage} = useLanguageStore();
        const t = level5Locales[currentLanguage].download;

        if (!args.length) {
            return t.usage;
        }

        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 5) {
            return `download: ${t.failed}`;
        }

        if (!gameStore.completedTasks.includes("connect_server")) {
            return t.needConnect;
        }

        const filename = args[0];
        if (filename === "secret_data") {
            await new Promise(resolve => setTimeout(resolve, 1500));
            gameStore.completeTask("get_data");
            return t.downloadComplete;
        }

        return t.failed.replace("%s", filename);
    }
};

export const level5Commands: { [key: string]: Command } = {
    ping: pingCommand,
    connect: connectCommand,
    download: downloadCommand
};