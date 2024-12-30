import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
import {useLanguageStore} from "@/stores/language";
import {level4Locales} from "../locales/level4";

export const psCommand: Command = {
    name: "ps",
    description: level4Locales.zh.ps.description,
    execute: () => {
        const {currentLanguage} = useLanguageStore();
        const t = level4Locales[currentLanguage].ps;
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 4) {
            return `ps: ${t.failed}`;
        }

        return `${t.processList}
${t.header}
1234   sysservice   85%   45%    ${t.process.status}
2345   normal.exe   2%    5%     ${t.process.status}
3456   update.exe   1%    3%     ${t.process.status}`;
    }
}; // level4

export const killCommand: Command = {
    name: "kill",
    description: level4Locales.zh.kill.description,
    execute: (args: string[]) => {
        const {currentLanguage} = useLanguageStore();
        const t = level4Locales[currentLanguage].kill;
        if (!args.length) {
            return t.usage;
        }

        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 4) {
            return `kill: ${t.failed}`;
        }

        const pid = args[0];
        if (pid === "1234") {
            gameStore.completeTask("kill_malware");
            return t.terminated;
        }

        if (pid === "1") {
            return t.invalidPid;
        }

        return t.notFound.replace('%s', pid);
    }
}; // level4

export const level4Commands: { [key: string]: Command } = {
    ps: psCommand,
    kill: killCommand
};