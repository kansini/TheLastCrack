import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
import {getCurrentLevelData} from "@/game/levels";
import {useTerminalStore} from "@/stores/terminal";
import {useLanguageStore} from "@/stores/language";
import {basicLocales} from "./locales/basic";
import {showGameComplete} from "./gameComplete";

const helpCommand: Command = {
    name: "help",
    description: "显示所有可用命令",
    execute: () => {
        const {currentLanguage} = useLanguageStore();
        const t = basicLocales[currentLanguage].help;
        // const gameStore = useGameStore();
        return `${t.availableCommands}
  help - ${t.helpDesc}
  ls - ${t.lsDesc}
  cd <${t.directory}> - ${t.cdDesc}
  cat <${t.file}> - ${t.catDesc}
  clear - ${t.clearDesc}
  decode <text> - ${t.decodeDesc}
  unlock <${t.password}> - ${t.unlockDesc}
  save <${t.saveName}> - ${t.saveDesc}
  load [ID] - ${t.loadDesc}
  deletesave <ID> - ${t.deleteDesc}`;
    }
};

const clearCommand: Command = {
    name: "clear",
    description: basicLocales.zh.clear.description,
    execute: () => {
        const store = useTerminalStore();
        store.clearHistory();
        return "";
    }
};

const unlockCommand: Command = {
    name: "unlock",
    description: basicLocales.zh.unlock.description,
    execute: async (args: string[]) => {
        if (!args.length) {
            return "Usage: unlock <password>";
        }

        const gameStore = useGameStore();
        const terminalStore = useTerminalStore();
        const { currentLanguage } = useLanguageStore();
        const t = basicLocales[currentLanguage].unlock;
        const level = gameStore.currentLevel;
        const password = args.join(" ");

        const showLevelInfo = () => {
            const nextLevel = level + 1;
            const levelData = getCurrentLevelData(nextLevel);
            terminalStore.setCurrentDirectory("~");
            return `${t.welcome}

${t.level.replace('%s', nextLevel.toString())}${levelData.title}
${levelData.description}

${t.objectives}
${levelData.objectives.map(obj => "- " + obj).join("\n")}`;
        };

        switch (level) {
            case 1:
                if (!gameStore.completedTasks.includes("find_secret")) {
                    return t.needClue;
                }
                if (password.toUpperCase() === "MOON_LIGHT") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 2:
                if (!gameStore.completedTasks.includes("decode_text")) {
                    return t.needDecode;
                }
                if (password === "Old Flood") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 3:
                if (!gameStore.completedTasks.includes("find_key")) {
                    return "你需要先查看相关文件获取密码线索！";
                }
                if (password === "HACK-0401") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 4:
                if (!gameStore.completedTasks.includes("kill_malware")) {
                    return "你需要先终止恶意进程！";
                }
                if (password === "D@t@B@se_2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 5:
                if (!gameStore.completedTasks.includes("get_data")) {
                    return "你需要先从服务器下载数据！";
                }
                if (password === "C0nnected@2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 6:
                if (!gameStore.completedTasks.includes("system_restore")) {
                    return t.needRestore;
                }
                if (password === "OlDHong_2077") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 7:
                if (!gameStore.completedTasks.includes("read_shadow")) {
                    return t.needShadow;
                }
                if (password === "Pr1v1l3ge_2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 8:
                if (!gameStore.completedTasks.includes("block_leak")) {
                    return t.needBlockLeak;
                }
                if (password === "5CHaJ1_2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 9:
                if (!gameStore.completedTasks.includes("find_secret")) {
                    return t.needFindSecret;
                }
                if (password === "PjECR0QOS1IeLi@xM@==@2024-12-19") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 10:
                if (!gameStore.completedTasks.includes("decode_plan")) {
                    return t.needDecodePlan;
                }
                if (password === "WUCHAJI_2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 11:
                if (!gameStore.completedTasks.includes("decode_secret")) {
                    return t.needDecodeSecret;
                }
                if (password === "KING_ROOK_2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 12:
                if (!gameStore.completedTasks.includes("find_data")) {
                    return t.needFindData;
                }
                if (password === "L0G_H4CK_2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;
            case 13:
                if (!gameStore.completedTasks.includes("trojan_planted")) {
                    return t.needTrojan;
                }
                if (password === "TheLastCrack") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;
            case 14:
                if (!gameStore.completedTasks.includes("find_person") ||
                    !gameStore.completedTasks.includes("check_meeting") ||
                    !gameStore.completedTasks.includes("read_mail")) {
                    return t.needInvestigation;
                }
                if (password === "PHOENIX_LQ_1005") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 15:
                if (!gameStore.completedTasks.includes("analyze_vuln") ||
                    !gameStore.completedTasks.includes("check_service") ||
                    !gameStore.completedTasks.includes("exploit_vuln") ||
                    !gameStore.completedTasks.includes("get_root")) {
                    return t.needExploit;
                }
                if (password === "CVE-2024-9999_20.04.3_22") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 16:
                if (!gameStore.completedTasks.includes("find_command") ||
                    !gameStore.completedTasks.includes("check_files")) {
                    return t.needAnalysis;
                }
                if (password === "P003_42_RJ") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 17:
                if (!gameStore.completedTasks.includes("match_fingerprint") ||
                    !gameStore.completedTasks.includes("match_voice")) {
                    return t.needVoiceprint;
                }
                if (password === "2342_JAMES_WILSON") {
                    gameStore.completeLevel()
                    return showGameComplete()
                }
                break

            default:
                const lastLevel = import.meta.env.VITE_APP_LAST_LEVEL
                if (level > lastLevel) {
                    await showGameComplete();
                    return "";
                }
            // return "关卡 " + level16 + " 正在紧张开发中...";
        }

        return t.wrongPassword;
    }
};

const hintCommand: Command = {
    name: "hint",
    description: basicLocales.zh.hint.description,
    execute: () => {
        const gameStore = useGameStore();
        const { currentLanguage } = useLanguageStore();
        const t = basicLocales[currentLanguage].hint;
        const levelData = getCurrentLevelData(gameStore.currentLevel);

        return `${t.available}\n${levelData.hints.map((hint, index) => `${index + 1}. ${hint}`).join("\n")}`;
    }
};

const decodeCommand: Command = {
    name: "decode",
    description: basicLocales.zh.decode.description,
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: decode <text>";
        }

        const languageStore = useLanguageStore();
        const t = languageStore.t;
        const gameStore = useGameStore();
        const text = args.join(" ");

        // 简单的解密逻辑：每个字向前移动一位
        const decrypted = text.split("").map(char => {
            if (/[A-Za-z]/.test(char)) {
                const code = char.charCodeAt(0);
                return String.fromCharCode(code - 1);
            }
            if (char === "!") return " "; // 处理感叹号
            return char;
        }).join("");

        // 如果解密的是目标文本，标记任务完成
        if (text === "Pme!Gmppe!") {
            gameStore.completeTask("decode_text");
            return `${t("decryptSuccess")}：${decrypted}\n${t("foundPassword")}`;
        }

        return `${t("decryptResult")}：${decrypted}`;
    }
};

const exitCommand: Command = {
    name: "exit",
    description: "Exit the terminal",
    // usage: "exit",
    execute: async () => {
        const gameStore = useGameStore();
        const terminalStore = useTerminalStore();

        // 关闭虚拟键盘并保存状态
        terminalStore.showKeyboard = false;
        localStorage.setItem('terminalSettings', JSON.stringify({ showKeyboard: false }));
        
        // 清空终端历史
        terminalStore.clearHistory();
        // 重置当前目录
        terminalStore.setCurrentDirectory("~");
        // 退出游戏态
        gameStore.exitGame();

        return "Exiting terminal...";
    }
};

const levelCommand: Command = {
    name: "level",
    description: basicLocales.zh.level.description,
    execute: () => {
        const gameStore = useGameStore();
        const { currentLanguage } = useLanguageStore();
        const t = basicLocales[currentLanguage].level;
        const levelData = getCurrentLevelData(gameStore.currentLevel);

        return `${t.currentLevel}[${gameStore.currentLevel}]${levelData.title}
${levelData.description}

${t.objectives}
${levelData.objectives.map(obj => "- " + obj).join("\n")}`;
    }
};

const gotoCommand: Command = {
    name: "goto",
    description: basicLocales.zh.goto.description,
    execute: (args: string[]) => {
        // 检查是否为开发环境
        if (!import.meta.env.DEV) {
            return "goto: 命令仅在开发环境下可用";
        }

        if (!args.length) {
            return "Usage: goto <关卡编号>";
        }

        const level = parseInt(args[0]);
        if (isNaN(level)) {
            return "请输入有效的关卡编号";
        }

        const lastLevel = parseInt(import.meta.env.VITE_APP_LAST_LEVEL?.toString() || "15");
        if (level < 1 || level > lastLevel) {
            return `关卡编号必须在 1-${lastLevel} 之间`;
        }

        const gameStore = useGameStore();
        const terminalStore = useTerminalStore();

        // 重置当前目录到根目录
        terminalStore.setCurrentDirectory("~");
        // 设置新关卡
        gameStore.setLevel(level);

        const { currentLanguage } = useLanguageStore();
        const t = basicLocales[currentLanguage].goto;
        const levelData = getCurrentLevelData(level);

        return `${t.jumpedTo.replace('%s', level.toString())}${levelData.title}

${levelData.description}

${t.objectives}
${levelData.objectives.map(obj => "- " + obj).join("\n")}`;
    }
};

const keyboardCommand: Command = {
    name: "keyboard",
    description: basicLocales.zh.keyboard.description,
    execute: () => {
        const terminalStore = useTerminalStore();
        terminalStore.showKeyboard = true;
        
        const { currentLanguage } = useLanguageStore();
        const t = basicLocales[currentLanguage].keyboard;
        return t.opened;
    }
};

export const basicCommands: { [key: string]: Command } = {
    help: helpCommand,
    clear: clearCommand,
    unlock : unlockCommand,
    decode : decodeCommand,
    exit : exitCommand,
    level : levelCommand,
    hint : hintCommand,
    goto : gotoCommand,
    keyboard: keyboardCommand,
};