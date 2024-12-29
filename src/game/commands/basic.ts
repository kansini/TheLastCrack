import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
import {getCurrentLevelData} from "@/game/levels";
import {useTerminalStore} from "@/stores/terminal";
import {useLanguageStore} from "@/stores/language";
import {showGameComplete} from "./gameComplete";
import {createApp, h} from "vue";
import TrackAnalyzer from "@/components/TrackAnalyzer.vue";
import CCTVViewer from "@/components/CCTVViewer.vue";

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

const lsCommand: Command = {
    name: "ls",
    description: "列出当前目录文件",
    execute: (args: string[]) => {
        const languageStore = useLanguageStore();
        const t = languageStore.t;
        const gameStore = useGameStore();
        const levelData = getCurrentLevelData(gameStore.currentLevel);
        const currentDir = gameStore.currentDirectory;

        // 确保目录存在
        const dirToCheck = currentDir === "~" ? "~" : `${currentDir}`;
        if (!levelData.fileSystem[dirToCheck]) {
            return `ls: ${t("directoryNotFound")} '${currentDir}'`;
        }

        const files = levelData.fileSystem[dirToCheck];

        // 检查是否使用了 -a 参数
        const showHidden = args.includes("-a");

        // 过滤文件列表并添加目录标记
        const filteredFiles = files.filter(file => {
            if (showHidden) {
                return true;
            }
            return !file.startsWith(".");
        }).map(file => {
            // 检查是否是目录
            const fullPath = currentDir === "~" ? `~/${file}` : `${currentDir}/${file}`;
            const isDirectory = levelData.fileSystem[fullPath] !== undefined;
            return isDirectory ? `${file}/` : file;
        });

        return filteredFiles.join("\n");
    }
};

const cdCommand: Command = {
    name: "cd",
    description: "切换目录",
    execute: (args: string[]) => {
        const languageStore = useLanguageStore();
        const t = languageStore.t;
        const gameStore = useGameStore();
        const path = args[0] || "~";
        const currentDir = gameStore.currentDirectory;
        const levelData = getCurrentLevelData(gameStore.currentLevel);

        // 检查是否尝试访问root目录
        if ((path === "root" || path === "/root" || path.includes("/root/")) &&
            gameStore.currentLevel === 15 &&
            !gameStore.completedTasks.includes("get_root")) {
            return `cd: root: ${t("permissionDenied")}`;
        }

        // 处理特殊路径
        if (path === "~") {
            gameStore.setCurrentDirectory("~");
            return "";
        }

        if (path === "..") {
            if (currentDir === "~") {
                return t("alreadyInRoot");
            }
            // 移除最后一个目录
            const parts = currentDir.split("/").filter(p => p && p !== "~");
            if (parts.length === 0) {
                gameStore.setCurrentDirectory("~");
            } else {
                parts.pop();
                const newPath = parts.length === 0 ? "~" : `~/${parts.join("/")}`;
                gameStore.setCurrentDirectory(newPath);
            }
            return "";
        }

        // 处理绝对路径（以 ~ 或 / 开头）
        if (path.startsWith("~/") || path.startsWith("/")) {
            const targetPath = path.startsWith("~/") ? path : path.substring(1);
            const dirToCheck = targetPath === "~" ? "~" : `${targetPath}`;
            if (levelData.fileSystem[dirToCheck]) {
                gameStore.setCurrentDirectory(targetPath);
                return "";
            }
            return `cd: ${path}: 目录不存在`;
        }

        // 处理相对路径
        let targetPath: string;
        if (currentDir === "~") {
            targetPath = `~/${path}`;
        } else {
            targetPath = `${currentDir}/${path}`;
        }

        // 检查目录是否存在
        const dirToCheck = targetPath === "~" ? "~" : `${targetPath}`;
        if (levelData.fileSystem[dirToCheck]) {
            gameStore.setCurrentDirectory(targetPath);
            return "";
        }

        return `cd: ${path}: ${t("directoryNotFound")}`;
    }
};

const catCommand: Command = {
    name: "cat",
    description: "查看文件内容",
    execute: (args: string[]) => {
        const languageStore = useLanguageStore();
        const t = languageStore.t;
        if (!args.length) {
            return `${t("invalidUsage")}: cat <${t("file")}>`;
        }

        const gameStore = useGameStore();
        const levelData = getCurrentLevelData(gameStore.currentLevel);
        const currentDir = gameStore.currentDirectory;
        const filename = args[0];

        // 检查是否尝试访问root目录下的文件
        if ((filename.startsWith("/root/") || currentDir.includes("/root/")) &&
            gameStore.currentLevel === 15 &&
            !gameStore.completedTasks.includes("get_root")) {
            return `cat: ${t("permissionDenied")}`;
        }

        // 检查是否是目录
        const fullPath = currentDir === "~" ? `~/${filename}` : `${currentDir}/${filename}`;
        if (levelData.fileSystem[fullPath] !== undefined) {
            return `cat: ${filename}: ${t("isDirectory")}`;
        }

        const fileContent = levelData.fileContents[filename];
        if (!fileContent) {
            return `cat: ${filename}: ${t("fileNotExist")}`;
        }

        // 如果查看的是 .secret 文件，标记任务完成
        if (filename === ".secret") {
            gameStore.markSecretFound();
        }

        // 如果查看了第三关的关键文件，标记任务完成
        if (gameStore.currentLevel === 3 &&
            (filename === "diary.txt" || filename === "access_log.txt" || filename === ".private")) {
            gameStore.completeTask("find_key");
        }

        // 如果查看了第14关的关键文件，标记任务完成
        if (gameStore.currentLevel === 14) {
            gameStore.completeTask("find_person");
            gameStore.completeTask("check_meeting");
            gameStore.completeTask("read_mail");
        }

        // 如果查看了��15关的关键文件，标记相应任务完成
        if (gameStore.currentLevel === 15) {
            if (filename === "vuln_report.txt" || filename === "service_scan.txt") {
                gameStore.completeTask("analyze_vuln");
            }
            if (filename === "running_services.txt" || filename === "sshd_config") {
                gameStore.completeTask("check_service");
            }
            if (filename === "poc.py" || filename === "exploit.py") {
                gameStore.completeTask("exploit_vuln");
            }
            if (filename === "auth.log" || filename === "error.log") {
                gameStore.completeTask("get_root");
            }
        }

        return fileContent;
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
                    return showLevelInfo()
                }
                break

            default:
                const lastLevel = import.meta.env.VITE_APP_LAST_LEVEL
                if (level > lastLevel) {
                    await showGameComplete();
                    return "";
                }
            // return "关卡 " + level + " 正在紧张开发中...";
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


const pingCommand: Command = {
    name: "ping",
    description: "测试网络连接",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: ping <IP>";
        }

        const ip = args[0];
        if (ip === "192.168.1.200") {
            return `正在 Ping ${ip}...
来自 192.168.1.200 的回复: 时间<1ms
来自 192.168.1.200 的回复: 时间<1ms
来自 192.168.1.200 的回复: 时间<1ms

192.168.1.200 的 Ping 统计信息:
    数据包: 已发送 = 3，已接收 = 3，丢失 = 0 (0% 丢失)
往返行程的估计时间(以毫秒为单位):
    最短 = 0ms，最长 = 1ms，平均 = 0ms

[提示] 服务器在线，可以尝试使用 connect 命令连接`;
        }

        return `Ping 请求找不到主机 ${ip}。请检查该名称，然后重试。`;
    }
};

const connectCommand: Command = {
    name: "connect",
    description: "连接远程服务器",
    execute: (args: string[]) => {
        if (args.length !== 3) {
            return "Usage: connect <IP> <username> <password>";
        }

        const gameStore = useGameStore();
        const [ip, username, password] = args;

        if (ip === "192.168.1.200" && username === "kansini" && password === "Netw0rk@2024") {
            gameStore.completeTask("connect_server");
            return `连接成功！
服务器已就绪。
[提示] 使用 download 命令下载数据`;
        }

        return "连接失败：认证错误。请检查 IP、用户名和密码。";
    }
};

const downloadCommand: Command = {
    name: "download",
    description: "下载服务器数据",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: download <filename>";
        }

        const gameStore = useGameStore();
        if (!gameStore.completedTasks.includes("connect_server")) {
            return "错误：未连接到服务器！请先使用 connect 命令建立连接。";
        }

        const filename = args[0];
        if (filename === "secret_data") {
            gameStore.completeTask("get_data");
            return `正在下载 ${filename}...
下载完成！

[发现] 文件中包含密码：C0nnected@2024
这就是通关密码！`;
        }

        return `错误：文件 '${filename}' 不存在或无法访问。`;
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



// 加新的邮件命令

const remoteCommand: Command = {
    name: "remote",
    description: "连接远程服务器",
    execute: (args: string[]) => {
        if (args.length !== 3) {
            return "Usage: remote <IP> <username> <password>";
        }

        const gameStore = useGameStore();
        const [ip, username, password] = args;

        if (ip === "10.0.13.37" && username === "Robert" && password === "Robert0315") {
            // remote 10.0.13.37 Robert Robert0315
            gameStore.completeTask("server_access");
            return `连接成功！
服务器已就绪。`;
        }

        return "连接失败：认证错误。请检查 IP、用户名和密码。";
    }
};

const ssh_exploitCommand: Command = {
    name: "ssh_exploit",
    description: "SSH漏洞利用工具",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 15) {
            return "ssh_exploit: 命令不可用";
        }

        if (!args.length) {
            return "Usage: ssh_exploit <target> [--check|--exploit]";
        }

        const target = args[0];
        const option = args[1] || "--check";

        if (option === "--check") {
            if (!gameStore.completedTasks.includes("analyze_vuln")) {
                return "你需要先分析漏洞报告！";
            }
            gameStore.completeTask("check_service");
            return `[*] 检查目标系统: ${target}
[+] 发现OpenSSH 8.9p1
[+] 确认存在CVE-2024-9999漏洞
[*] 使用 --exploit 参数进行漏洞利用`;
        }

        if (option === "--exploit") {
            if (!gameStore.completedTasks.includes("check_service")) {
                return "你需要先检查服务是否存在���洞！";
            }
            gameStore.completeTask("exploit_vuln");
            gameStore.completeTask("get_root");
            return `[*] 开始漏洞利用...
[+] 构建ROP链
[+] 注入Shellcode
[+] 发送Payload
[!] 获得root权限！
[+] 系统信息：
    - 主机名: vulnserver
    - 系统版本: Ubuntu 20.04.3
    - SSH端口: 22
[*] 漏洞利用成功，请使用格式：CVE编号_操作系统版本_端口号 解锁下一关`;
        }

        return "无效的参数，使用 --check 或 --exploit";
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


const trackCommand: Command = {
    name: "track",
    description: "在地图上追踪和分析逃犯路线",
    execute: () => {
        const gameStore = useGameStore()

        if (gameStore.currentLevel !== 18) {
            return "track: 命令不可用"
        }

        // 创建分析窗口
        const container = document.createElement("div")
        container.style.position = "fixed"
        container.style.top = "50%"
        container.style.left = "50%"
        container.style.transform = "translate(-50%, -50%)"
        container.style.zIndex = "9999"
        document.body.appendChild(container)

        const app = createApp({
            render() {
                return h(TrackAnalyzer, {
                    onClose: () => {
                        app.unmount()
                        document.body.removeChild(container)
                    }
                })
            }
        })

        app.mount(container)
        return "正在打开路线分析器..."
    }
} // level18

const cctvCommand: Command = {
    name: "cctv",
    description: "查看监控录像记录",
    execute: (args: string[]) => {
        const languageStore = useLanguageStore();
        const t = languageStore.t;
        const gameStore = useGameStore();

        if (gameStore.currentLevel !== 18) {
            return `cctv: ${t("invalidCommand")}`;
        }

        if (args.length !== 1) {
            return `${t("invalidUsage")}: cctv <${t("cameraId")}>`;
        }

        const cameraId = args[0];
        if (!["01", "02", "03", "04"].includes(cameraId)) {
            return t("invalidCamera");
        }

        // 创建查看窗口
        const container = document.createElement("div")
        container.style.position = "fixed"
        container.style.top = "50%"
        container.style.left = "50%"
        container.style.transform = "translate(-50%, -50%)"
        container.style.zIndex = "9999"
        document.body.appendChild(container)

        const app = createApp({
            render() {
                return h(CCTVViewer, {
                    cameraId,
                    onClose: () => {
                        app.unmount()
                        document.body.removeChild(container)
                    }
                })
            }
        })

        app.mount(container)
        return `${t("viewingCamera")} ${cameraId}...`
    }
} // level18

export {
    helpCommand,
    lsCommand,
    cdCommand,
    catCommand,
    clearCommand,
    unlockCommand,
    decodeCommand,
    pingCommand,
    connectCommand,
    downloadCommand,
    exitCommand,
    levelCommand,
    hintCommand,
    remoteCommand,
    ssh_exploitCommand,
    gotoCommand,
    trackCommand,
    cctvCommand
};