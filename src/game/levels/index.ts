import type {LevelData} from "@/types/game";
import {level1} from "./configs/level1";
import {level2} from "./configs/level2";
import {level3} from "./configs/level3";
import {level4} from "./configs/level4";
import {level5} from "./configs/level5";
import {level6} from "./configs/level6";
import {level7} from "./configs/level7";
import {level8} from "./configs/level8";
import {level9} from "./configs/level9";
import {level10} from "./configs/level10";
import {level11} from "./configs/level11";
import {level12} from "./configs/level12";
import {level13} from "./configs/level13";
import {level14} from "./configs/level14";
import {showGameComplete} from "../commands/gameComplete";

// 导入所有关卡配置
const levelConfigs: Record<number, LevelData> = {
    1: level1,
    2: level2,
    3: level3,
    4: level4,
    5: level5,
    6: level6,
    7: level7,
    8: level8,
    9: level9,
    10: level10,
    11: level11,
    12: level12,
    13: level13,
    14: level14
};

export function getCurrentLevelData(level: number): LevelData {
    const lastLevel = import.meta.env.VITE_APP_LAST_LEVEL
    if (level > lastLevel) {
        showGameComplete().then(_r => {
            return {
                id: level,
                title: "游戏通关",
                description: "恭喜你已经完成了所有关卡！",
                objectives: ["享受胜利的喜悦"],
                requiredTasks: [],
                fileSystem: {"~": []},
                fileContents: {},
                hints: ["你已经是一名真正的黑客了！"]
            };
        });
        // 返回一个通关后的虚拟关卡数据
    }

    const levelData = levelConfigs[level];
    if (!levelData) {
        throw (``);
    }
    return levelData;
}

// 获取最大关卡数
export const getMaxLevel = (): number => {
    return Math.max(...Object.keys(levelConfigs).map(Number));
};

// 检查关卡是否存在
export const levelExists = (level: number): boolean => {
    return !!levelConfigs[level];
};

// 获取所有关卡的基本信息（用于显示关卡列表）
export const getAllLevels = (): Array<{ id: number; title: string; description: string }> => {
    return Object.values(levelConfigs).map(({id, title, description}) => ({
        id,
        title,
        description,
    }));
}; 