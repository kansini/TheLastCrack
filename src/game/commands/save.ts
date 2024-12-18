import type { Command } from "@/types/terminal";
import { useSaveStore } from "@/stores/save";
import { getCurrentLevelData } from "@/game/levels";

export const saveCommand: Command = {
    name: "save",
    description: "保存游戏进度",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: save <存档名称>";
        }

        const saveStore = useSaveStore();
        const saveName = args.join(" ");
        const saveId = saveStore.createSave(saveName);

        return `游戏保存到存档 #${saveId}: ${saveName}`;
    }
};

export const loadCommand: Command = {
    name: "load",
    description: "加载游戏存档",
    execute: (args: string[]) => {
        if (!args.length) {
            const saveStore = useSaveStore();
            const saves = saveStore.getSaves();
            if (saves.length === 0) {
                return "没有找到任何存档";
            }
            return `可用存档：\n${saves.map(s => {
                const levelData = getCurrentLevelData(s.save.currentLevel);
                return `#${s.id}: ${s.name} (第${s.save.currentLevel}关 - ${levelData.title}) [${new Date(s.save.timestamp).toLocaleString()}]`;
            }).join("\n")}\n\n请用 load <存档ID> 来加载存档`;
        }

        const saveId = parseInt(args[0]);
        if (isNaN(saveId)) {
            return "请输入有效的存档ID";
        }

        const saveStore = useSaveStore();
        if (saveStore.loadSave(saveId)) {
            const saveData = saveStore.getSaveData(saveId);
            if (saveData) {
                const levelData = getCurrentLevelData(saveData.currentLevel);
                return `存档读取成功！\n当前位于第${saveData.currentLevel}关 - ${levelData.title}`;
            }
            return "存档读取成功！";
        } else {
            return `未找到存档 #${saveId}`;
        }
    }
};

export const deleteSaveCommand: Command = {
    name: "deletesave",
    description: "删除游戏存档",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: deletesave <存档ID>";
        }

        const saveId = parseInt(args[0]);
        if (isNaN(saveId)) {
            return "请输入有效的存档ID";
        }

        const saveStore = useSaveStore();
        saveStore.deleteSave(saveId);
        return `存档 #${saveId} 已删除`;
    }
}; 