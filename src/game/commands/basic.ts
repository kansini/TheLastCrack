import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
import {getCurrentLevelData} from "@/game/levels";
import {useTerminalStore} from "@/stores/terminal";
import {useLanguageStore} from "@/stores/language";
import {showGameComplete} from "./gameComplete";

const helpCommand: Command = {
    name: "help",
    description: "显示所有可用命令",
    execute: () => {
        const languageStore = useLanguageStore();
        const t = languageStore.t;
        const gameStore = useGameStore();
        let baseCommands = `${t("availableCommands")}
  help - ${t("helpDesc")}
  ls - ${t("lsDesc")}
  cd <${t("directory")}> - ${t("cdDesc")}
  cat <${t("file")}> - ${t("catDesc")}
  clear - ${t("clearDesc")}
  decode <text> - ${t("decodeDesc")}
  unlock <${t("password")}> - ${t("unlockDesc")}
  save <${t("saveName")}> - ${t("saveDesc")}
  load [ID] - ${t("loadDesc")}
  deletesave <ID> - ${t("deleteDesc")}
  level - ${t("levelDesc")}
  exit - ${t("exitDesc")}`;

        // 根据当前关卡添加特定命令
        if (gameStore.currentLevel === 6) {
            baseCommands += `\n
- ${t("networkAnalysis")}：
  tcpdump <${t("filter")}> - ${t("tcpdumpDesc")}
  analyze <${t("file")}> - ${t("analyzeDesc")}`;
        }

        if (gameStore.currentLevel === 9) {
            baseCommands += `\n
- ${t("memoryAnalysis")}：
  volatility <${t("file")}> - ${t("volatilityDesc")}
  strings <${t("file")}> - ${t("stringsDesc")}
  timeline <PID> - ${t("timelineDesc")}`;
        }

        if (gameStore.currentLevel === 11) {
            baseCommands += `\n
- ${t("mailAnalysis")}：
  mail list - ${t("mailListDesc")}
  mail read <${t("user")}> - ${t("mailReadDesc")}
  mail search <${t("keyword")}> - ${t("mailSearchDesc")}
  mail trash - ${t("mailTrashDesc")}`;
        }

        if (gameStore.currentLevel === 17) {
            baseCommands += `\n
- ${t("voiceprintAnalysis")}：
  voiceprint <${t("targetAudio")}> <${t("sampleAudio")}> - ${t("voiceprintDesc")}`;
        }

        return baseCommands;
    }
};
const clearCommand: Command = {
    name: "clear",
    description: "清除终端屏幕",
    execute: () => {
        const store = useTerminalStore();
        store.clearHistory();
        return "";
    }
};
const unlockCommand: Command = {
    name: "unlock",
    description: "使用密码解锁下一关",
    execute: async (args: string[]) => {
        if (!args.length) {
            return "Usage: unlock <password>";
        }

        const gameStore = useGameStore();
        const terminalStore = useTerminalStore();
        const level = gameStore.currentLevel;
        const password = args.join(" ");

        const showLevelInfo = () => {
            const nextLevel = level + 1;
            const levelData = getCurrentLevelData(nextLevel);
            // 重置当前目录到根目录
            terminalStore.setCurrentDirectory("~");
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
                    return "你需要先恢复系统状态！";
                }
                if (password === "OlDHong_2077") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 7:
                if (!gameStore.completedTasks.includes("read_shadow")) {
                    return "你需要先获取 shadow 文件中的密码！";
                }
                if (password === "Pr1v1l3ge_2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 8:
                if (!gameStore.completedTasks.includes("block_leak")) {
                    return "你需要先阻止数据泄露！";
                }
                if (password === "5CHaJ1_2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 9:
                if (!gameStore.completedTasks.includes("find_secret")) {
                    return "需要先找到隐藏在件中的秘密";
                }
                if (password === "PjECR0QOS1IeLi@xM@==@2024-12-19") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 10:
                if (!gameStore.completedTasks.includes("decode_plan")) {
                    return "你需要先破解加密的信息！";
                }
                if (password === "WUCHAJI_2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 11:
                if (!gameStore.completedTasks.includes("decode_secret")) {
                    return "你需要先破解隐藏的信息！";
                }
                if (password === "KING_ROOK_2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 12:
                if (!gameStore.completedTasks.includes("find_data")) {
                    return "你需要先找到被窃取的数据！";
                }
                if (password === "L0G_H4CK_2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;
            case 13:
                if (!gameStore.completedTasks.includes("trojan_planted")) {
                    return "你需要先植入木马程序！";
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
                    return "你需要先完成所有调查任务！";
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
                    return "你需要先完成所有漏洞利用任务！";
                }
                if (password === "CVE-2024-9999_20.04.3_22") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 16:
                if (!gameStore.completedTasks.includes("find_command") ||
                    !gameStore.completedTasks.includes("check_files")) {
                    return "你需要先完成所有档案分析任务！";
                }   //  || !gameStore.completedTasks.includes("verify_password")
                if (password === "P003_42_RJ") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 17:
                if (!gameStore.completedTasks.includes("match_fingerprint") ||
                    !gameStore.completedTasks.includes("match_voice")) {
                    return "需要完成所有声纹分析任务！"
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

        return "密码错误，请继续寻找线索。";
    }
};
const hintCommand: Command = {
    name: "hint",
    description: "获取当前关卡的提示（隐藏命令）",
    execute: () => {
        const gameStore = useGameStore();
        const level = gameStore.currentLevel;
        const levelData = getCurrentLevelData(level);
        const languageStore = useLanguageStore();
        const t = languageStore.t;

        return `${t("hints")}：\n${levelData.hints.map((hint, index) => `${index + 1}. ${hint}`).join("\n")}`;
    }
};
const decodeCommand: Command = {
    name: "decode",
    description: "解密文本",
    execute: (args: string[]) => {
        const languageStore = useLanguageStore();
        const t = languageStore.t;
        if (!args.length) {
            return `${t("invalidUsage")}: decode <text>`;
        }

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
    description: "返回主菜单",
    execute: () => {
        const gameStore = useGameStore();
        const terminalStore = useTerminalStore();

        // 清空终端历史
        terminalStore.clearHistory();
        // 重置当前目录
        terminalStore.setCurrentDirectory("~");
        // 退出游戏态
        gameStore.exitGame();

        return "";  // 返回空字符串，不显示任何提示
    }
};
const levelCommand: Command = {
    name: "level",
    description: "显示当前关卡信息",
    execute: () => {
        const gameStore = useGameStore();
        const levelData = getCurrentLevelData(gameStore.currentLevel);

        return `【第${gameStore.currentLevel}关】${levelData.title}
${levelData.description}

目标：
${levelData.objectives.map(obj => "- " + obj).join("\n")}

输入 help 查看可用命令`;
    }
};
const gotoCommand: Command = {
    name: "goto",
    description: "跳转到指定关卡（仅开发环境可用）",
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

        const levelData = getCurrentLevelData(level);
        return `已跳转到第${level}关：${levelData.title}

${levelData.description}

目标：
${levelData.objectives.map(obj => "- " + obj).join("\n")}

输入 help 查看可用命令`;
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
};