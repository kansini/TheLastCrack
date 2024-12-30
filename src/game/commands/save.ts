import type {Command} from "@/types/terminal";
import {useSaveStore} from "@/stores/save";
import {getCurrentLevelData} from "@/game/levels";
import {useGameStore} from "@/stores/game";
import {useLanguageStore} from "@/stores/language";
import {saveLocales} from "./locales/save";

export const saveCommand: Command = {
    name: "save",
    description: saveLocales.zh.save.description,
    execute: (args: string[]) => {
        const {currentLanguage} = useLanguageStore();
        const t = saveLocales[currentLanguage].save;

        if (!args.length) {
            return t.usage;
        }

        const saveStore = useSaveStore();
        const saveName = args.join(" ");
        const saveId = saveStore.createSave(saveName);

        return t.success.replace('%s', saveId.toString()).replace('%s', saveName);
    }
};

export const loadCommand: Command = {
    name: "load",
    description: saveLocales.zh.load.description,
    execute: (args: string[]) => {
        const {currentLanguage} = useLanguageStore();
        const t = saveLocales[currentLanguage].load;

        if (!args.length) {
            const saveStore = useSaveStore();
            const saves = saveStore.getSaves();
            if (saves.length === 0) {
                return t.noSaves;
            }
            return `${t.availableSaves}\n${saves.map(s => {
                const levelData = getCurrentLevelData(s.save.currentLevel);
                const levelText = t.level.replace('%s', s.save.currentLevel.toString()).replace('%s', levelData.title);
                return `#${s.id}: ${s.name} (${levelText}) [${new Date(s.save.timestamp).toLocaleString()}]`;
            }).join("\n")}${t.loadPrompt}`;
        }

        const saveId = parseInt(args[0]);
        if (isNaN(saveId)) {
            return t.invalidId;
        }

        const saveStore = useSaveStore();
        const gameStore = useGameStore();

        if (saveStore.loadSave(saveId)) {
            const saveData = saveStore.getSaveData(saveId);
            if (saveData) {
                const levelData = getCurrentLevelData(saveData.currentLevel);
                gameStore.loadSavedGame(saveData);
                return t.loadSuccess
                    .replace('%s', saveData.currentLevel.toString())
                    .replace('%s', levelData.title);
            }
            return t.loadSuccess.replace('%s', '').replace('%s', '');
        } else {
            return t.saveNotFound.replace('%s', saveId.toString());
        }
    }
};

export const deleteSaveCommand: Command = {
    name: "deletesave",
    description: saveLocales.zh.delete.description,
    execute: (args: string[]) => {
        const {currentLanguage} = useLanguageStore();
        const t = saveLocales[currentLanguage].delete;

        if (!args.length) {
            return t.usage;
        }

        const saveId = parseInt(args[0]);
        if (isNaN(saveId)) {
            return t.invalidId;
        }

        const saveStore = useSaveStore();
        saveStore.deleteSave(saveId);
        return t.success.replace('%s', saveId.toString());
    }
};

export const saveCommands: { [key: string]: Command } = {
    save: saveCommand,
    load: loadCommand,
    deleteSave: deleteSaveCommand,
};