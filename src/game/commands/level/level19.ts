import type { Command } from "@/types/terminal";
import { useGameStore } from "@/stores/game";
import { useLanguageStore } from "@/stores/language";
import { level19CommandLocales } from "../locales/level19";

const checkLevel = (gameStore: any, level: number) => {
    return gameStore.currentLevel === level;
};



export const compareCommand: Command = {
    name: "compare",
    description: level19CommandLocales.zh.compare.description,
    execute: async (args: string[]) => {
        const { currentLanguage } = useLanguageStore();
        const t = level19CommandLocales[currentLanguage].compare;
        const gameStore = useGameStore();

        if (!checkLevel(gameStore, 19)) {
            return `compare: ${t.failed.replace("%s", t.notAvailable)}`;
        }

        if (args.length < 2) {
            return t.usage;
        }

        const [file1, file2] = args;
        if ((file1 === "file.jpg" && file2 === "manuscript.jpg") ||
            (file1 === "manuscript.jpg" && file2 === "file.jpg")) {
            
            // if (!gameStore.completedTasks.includes("analyze_file")) {
            //     return t.failed.replace("%s", t.needAnalyze);
            // }
            //
            // if (!gameStore.completedTasks.includes("decode_manuscript")) {
            //     return t.failed.replace("%s", t.needDecode);
            // }

            await new Promise(resolve => setTimeout(resolve, 2000));
            gameStore.completeTask("find_connection");
            return `${t.comparing}\n\n${t.result}\n\n${t.success}`;
        }

        return t.notFound.replace("%s", `${file1}, ${file2}`);
    }
};

export const level19Commands: { [key: string]: Command } = {
    compare: compareCommand
}; 