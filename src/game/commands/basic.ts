import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
import {getCurrentLevelData} from "@/game/levels";
import {useTerminalStore} from "@/stores/terminal";
import {useSaveStore} from "@/stores/save";

const helpCommand: Command = {
    name: "help",
    description: "显示所有可用命令",
    execute: () => {
        const gameStore = useGameStore();
        let baseCommands = `可用命令：
  help - 显示此帮助信息
  ls - 列出当前目录文件
  cd <目录> - 切换目录
  cat <文件> - 查看文件内容
  clear - 清除终端屏幕
  decode <text> - 解密文本
  unlock <密码> - 使用密码解锁下一关
  save <名称> - 保存游戏进度
  load [ID] - 查看或加载存档
  deletesave <ID> - 删除存档
  level - 显示当前关卡信息
  exit - 返回主菜单`;

        // 根据当前关卡添加特定命令
        if (gameStore.currentLevel === 6) {
            baseCommands += `\n
网络分析命令：
  tcpdump <过滤器> - 捕获网络数据包
  analyze <文件名> - 分析数据包内容`;
        }

        if (gameStore.currentLevel === 9) {
            baseCommands += `\n
内存分析命令：
  volatility <文件名> - 分析内存镜像
  strings <文件名> - 提取内存字符串
  timeline <事件ID> - 分析事件时间线`;
        }

        return baseCommands;
    }
};

const lsCommand: Command = {
    name: "ls",
    description: "列出当前目录文件",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        const levelData = getCurrentLevelData(gameStore.currentLevel);
        const currentDir = gameStore.currentDirectory;

        // 确保目录存在
        const dirToCheck = currentDir === "~" ? "~" : `${currentDir}`;
        if (!levelData.fileSystem[dirToCheck]) {
            return `ls: 无法访问 '${currentDir}': 目录不存在`;
        }

        const files = levelData.fileSystem[dirToCheck];

        // 检查是否使用了 -a 参数
        const showHidden = args.includes("-a");

        // 过滤文件列表
        const filteredFiles = files.filter(file => {
            if (showHidden) {
                return true;
            }
            return !file.startsWith(".");
        });

        return filteredFiles.join("\n");
    }
};

const cdCommand: Command = {
    name: "cd",
    description: "切换目录",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        const path = args[0] || "~";
        const currentDir = gameStore.currentDirectory;
        const levelData = getCurrentLevelData(gameStore.currentLevel);

        // 处理特殊路径
        if (path === "~") {
            gameStore.setCurrentDirectory("~");
            return "";
        }

        if (path === "..") {
            if (currentDir === "~") {
                return "已经在根目录了";
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

        // 处理绝对路径（以 ~ 开头）
        if (path.startsWith("~/")) {
            const targetPath = path;
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

        return `cd: ${path}: 目录不存在`;
    }
};

const catCommand: Command = {
    name: "cat",
    description: "查看文件内容",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: cat <filename>";
        }

        const gameStore = useGameStore();
        const levelData = getCurrentLevelData(gameStore.currentLevel);
        const filename = args[0];

        const fileContent = levelData.fileContents[filename];
        if (!fileContent) {
            return `cat: ${filename}: 文件不存在`;
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
    execute: (args: string[]) => {
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
                if (!gameStore.completedTasks.includes('decode_plan')) {
                    return "你需要先破解加密的信息！";
                }
                if (password === "WUCHAJI_2024") {
                    gameStore.completeLevel();
                    return showLevelInfo();
                }
                break;

            case 11:
                if (!gameStore.completedTasks.includes("extract_info")) {
                    return "你需要先完成内存分析！";
                }
                if (password === "BACKDOOR_2024") {
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
                    return `恭喜你通关了！

你已经完成了所有关卡，成为了一名真正的黑客！
感谢你的游玩，未来还会有更多关卡加入...

输入 exit 返回主菜单`;
                }
                break;

            default:
                if (level >= 12) {
                    return "恭喜你已经通关了所有关卡！";
                }
                return "关卡 " + level + " 正在紧张开发中...";
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

        // 直接返回当前关卡的提示信息
        return `提示：\n${levelData.hints.map((hint, index) => `${index + 1}. ${hint}`).join('\n')}`;
    }
};

const decodeCommand: Command = {
    name: "decode",
    description: "解密文本",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: decode <text>";
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
            return `解密成功！解密结果：${decrypted}\n恭喜你发了密码`;
        }

        return `解密结果：${decrypted}`;
    }
};

const saveCommand: Command = {
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

const loadCommand: Command = {
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

const deleteSaveCommand: Command = {
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

const scanCommand: Command = {
    name: "scan",
    description: "扫描分析文件",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: scan <filename>";
        }

        const gameStore = useGameStore();
        const levelData = getCurrentLevelData(gameStore.currentLevel);
        const filename = args[0];

        if (!levelData.fileContents[filename]) {
            return `scan: ${filename}: 件不存在`;
        }

        if (filename === "corrupted_data.db") {
            gameStore.completeTask("analyze_corrupt");
            return `扫描结果：
1. 文件状态：已损坏
2. 损坏时间：2024-04-01 23:59:59
3. 损坏部分：字符替换
4. 建议操作：使用正确的备份文件修复
5. 备份时间：在损坏发生之前`;
        }

        return `扫描结果：文件完整，无需修复`;
    }
};

const repairCommand: Command = {
    name: "repair",
    description: "修复损坏的文件",
    execute: (args: string[]) => {
        if (args.length !== 2) {
            return "Usage: repair <源文件> <备份文件>";
        }

        const gameStore = useGameStore();
        const levelData = getCurrentLevelData(gameStore.currentLevel);
        const [sourceFile, backupFile] = args;

        if (!levelData.fileContents[sourceFile] || !levelData.fileContents[backupFile]) {
            return "指定的文件不存在";
        }

        if (sourceFile === "corrupted_data.db" && backupFile === "backup_0401.bak") {
            gameStore.completeTask("repair_data");
            return `修复成功！
原始数据已恢复：D@t@B@se_2024
这就是你需要的密码！`;
        }

        return "修复失败：备份文件不匹配或已损���";
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

const psCommand: Command = {
    name: "ps",
    description: "查看进程列表",
    execute: () => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 4) {
            return "ps: 命令不可用";
        }

        return `PID    名称          CPU    内存   状态
1234   sysservice   85%   45%    运行中
2345   normal.exe   2%    5%     运行中
3456   update.exe   1%    3%     运行中`;
    }
};

const topCommand: Command = {
    name: "top",
    description: "实时监控系统资源",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 4) {
            return "top: 命令不可用";
        }

        // 如果输入是 q，则返回退出消息
        if (args[0] === "q") {
            return "已退出 top";
        }

        return `系统监控 - 每3秒更新一次
进程总数：3    运行中：3    已停止：0

CPU 使用率：88%
内存使用率：53%

  PID 名称          CPU    内存   状态     启动时间
 1234 sysservice   85%    45%    运行中   23:59:59
 2345 normal.exe    2%     5%    运行中   00:00:01
 3456 update.exe    1%     3%    运行中   00:00:02

提示：输入 "top q" 退出监控`;
    }
};

const analyzeCommand: Command = {
    name: "analyze",
    description: "分析数据包内容",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 6) {
            return "analyze: 命令不可用";
        }

        if (!args.length) {
            return "Usage: analyze <文件名>";
        }

        if (args[0] === "network.pcap") {
            if (!gameStore.completedTasks.includes("analyze_traffic")) {
                return "提示：请先使用 tcpdump SYN 命令捕获可疑的扫描包";
            }
            gameStore.completeTask("find_vulnerability");
            return `分析报告：
1. 攻击类型：SYN Flood 扫描
2. 攻击源：192.168.1.100
3. 目标端口：80, 443, 22
4. 漏洞位置：防火墙规则配置
5. 建议操作：更新防火墙规则

[提示] 系统需要恢复，请使用命令进行系统恢复`;
        }

        return `analyze: ${args[0]}: 文件不存在`;
    }
};

const killCommand: Command = {
    name: "kill",
    description: "终止进程",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: kill <PID>";
        }

        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 4) {
            return "kill: 命令不可用";
        }

        const pid = args[0];
        if (pid === "1234") {
            gameStore.completeTask("kill_malware");
            return `进程已终止。
系统状态开始恢复正常...

发现通关密码：D@t@B@se_2024`;
        }

        if (pid === "1") {
            return "错误：无法终止系统核心进程";
        }

        return `kill: 进程 ${pid} 不存在`;
    }
};

const restoreCommand: Command = {
    name: "restore",
    description: "恢复系统状态",
    execute: () => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 6) {
            return "restore: 命令不可用";
        }

        if (!gameStore.completedTasks.includes("kill_malware")) {
            return "错误：请先终止恶意进程";
        }

        gameStore.completeTask("system_restore");
        return `系统恢复完成
1. 已清理恶意程序残留
2. 已恢复系统服务
3. 已更新安全策略
4. 系统状态：正常

恢复密码：OlDHong_2077`;
    }
};

const whoamiCommand: Command = {
    name: "whoami",
    description: "显示当前用户",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 7) {
            return "whoami: 命令不可用";
        }

        // 简化的漏洞检测逻辑
        if (args[0] === "--debug=OVERFLOW") {
            gameStore.completeTask("get_root");
            return `[漏洞触发成功]
权限提升：user -> root
当前用户：root
用户组：root wheel admin`;
        }

        return "user";  // 默认显示普通用户
    }
};

const sudoCommand: Command = {
    name: "sudo",
    description: "以管理员权限执行命令",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 7) {
            return "sudo: 命令不可用";
        }

        if (!args.length) {
            return "Usage: sudo <command>";
        }

        if (!gameStore.completedTasks.includes("get_root")) {
            return "错误：用户不在 sudoers 文件中。此事将被报告。";
        }

        const command = args.join(" ");
        if (command === "cat etc/shadow" || command === "cat ~/etc/shadow"  || command === "cat shadow") {
            gameStore.completeTask("read_shadow");
            return `root:$6$xyz$hash:19000:0:99999:7:::
user:$6$abc$hash:19000:0:99999:7:::
guest:$6$def$hash:19000:0:99999:7:::

解密后的 root 密码：Pr1v1l3ge_2024`;
        }

        return `sudo: ${args[0]}: 命令未找到`;
    }
};

const chmodCommand: Command = {
    name: "chmod",
    description: "修改文件权限",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 7) {
            return "chmod: 命令不可用";
        }

        if (args.length !== 2) {
            return "Usage: chmod <权限> <文件>";
        }

        return "权限不足：需 root 权限";
    }
};

const tcpdumpCommand: Command = {
    name: "tcpdump",
    description: "捕获网络数据包",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 6 && gameStore.currentLevel !== 8) {
            return "tcpdump: 命令不可用";
        }

        if (!args.length) {
            return "Usage: tcpdump <过滤器>";
        }

        if (gameStore.currentLevel === 6) {
            if (args.includes("SYN")) {
                gameStore.completeTask("analyze_traffic");
                return `开始捕获数据包...

[21:00:01] TCP 192.168.1.100:12345 > 10.0.0.1:80 SYN
[21:00:02] TCP 192.168.1.100:12346 > 10.0.0.1:443 SYN
[21:00:03] TCP 192.168.1.100:12347 > 10.0.0.1:22 SYN

[分析] 发现可疑的扫描行为：
1. 源IP: 192.168.1.100
2. 目标端口: 80, 443, 22
3. 攻击类型: SYN扫描

[提示] 使用 analyze network.pcap 分析完整的攻击数据`;
            }
            return "提示：使用 SYN 作为过滤器来捕获可疑的扫描包";
        }

        // 第八关的逻辑保持不变
        if (args.includes("port") && args.includes("31337")) {
            gameStore.completeTask("start_capture");
            return `开始捕获数据包...
[21:00:01] IP 10.0.0.100.31337 > 10.0.0.1.31337: TCP
[21:00:02] IP 10.0.0.1.31337 > 10.0.0.100.31337: TCP
[21:00:03] IP 10.0.0.100.31337 > 10.0.0.1.31337: TCP PSH


捕获完成！可疑数据包已保存到 packets.pcap`;
        }

        return "未发现可疑数据包";
    }
};

const wiresharkCommand: Command = {
    name: "wireshark",
    description: "分析数据包内容",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 8) {
            return "wireshark: 命令不可用";
        }

        if (!args.length) {
            return "Usage: wireshark <文件名>";
        }

        if (args[0] === "packets.pcap") {
            if (!gameStore.completedTasks.includes("start_capture")) {
                return "错误：文件为空，请先使用 tcpdump 捕获数据包";
            }
            gameStore.completeTask("analyze_packet");
            return `分析结果：
1. 协议：TCP
2. 源地址：10.0.0.100:31337
3. 目标地址：10.0.0.1:31337
4. 警告检测到密码泄露！
5. 阻止方法: iptables -A OUTPUT -d <目标地址> -j DROP`;
        }

        return `wireshark: ${args[0]}: 文件不存在`;
    }
};

const iptablesCommand: Command = {
    name: "iptables",
    description: "配置防火墙规则",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 8) {
            return "iptables: 命令不可用";
        }

        if (!args.length) {
            return "Usage: iptables <规则>";
        }

        // 检查是否是正确的阻止规则
        const command = args.join(" ");
        if (command === "-A OUTPUT -d 10.0.0.1 -j DROP") {
            gameStore.completeTask("block_leak");
            return `防火墙规则已添加：
1. 阻止所有到 10.0.0.1 的连接
2. 数据泄露已被阻止
3. 系统安全状态：已恢复

发现通关密码：5CHaJ1_2024`;
        }

        return "规则格式错误或目标IP无效";
    }
};

const mailCommand: Command = {
    name: "mail",
    description: "查看用户邮箱",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 9) {
            return "mail: 命令不可用";
        }

        if (!args.length) {
            return "Usage: mail <用户名>";
        }

        const user = args[0].toLowerCase();
        const validUsers = ["alice", "bob", "charlie"];

        if (!validUsers.includes(user)) {
            return "用户不存在";
        }

        // 当查看了 bob 的邮件时，标任务开始
        if (user === "bob") {
            gameStore.completeTask("access_mail");
        }

        return gameStore.currentLevelData.fileContents[`${user}.mbox`];
    }
};

const searchCommand: Command = {
    name: "search",
    description: "搜索邮件内容",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 9) {
            return "search: 命令不可用";
        }

        if (!args.length) {
            return "Usage: search <关键词>";
        }

        const keyword = args[0].toLowerCase();
        if (keyword === "chess" || keyword === "棋盘" || keyword === "加密") {
            gameStore.completeTask("find_secret");
            return `搜索结果：
1. 发现邮件提到国际象棋加密案
2. 发现关于棋移动的记录
3. 找到隐藏的棋盘布局文件

[重要] 发现一个隐藏文件：.chess_notes
建议使用 cat .chess_notes 查看详细信息`;
        }

        return "未找到相关邮件";
    }
};

const draftCommand: Command = {
    name: "draft",
    description: "查看邮件草稿",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 9) {
            return "draft: 命令不可用";
        }

        if (!args.length) {
            return "Usage: draft <用户名>";
        }

        const user = args[0].toLowerCase();
        if (user === "charlie") {
            // 当查了 Charlie 的草稿时，标记发现秘密
            gameStore.completeTask("find_secret");
            return gameStore.currentLevelData.fileContents[".charlie_draft"];
        }

        return "未找到草稿";
    }
};

const chatCommand: Command = {
    name: "chat",
    description: "查看公共聊天",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 10) {
            return "chat: 命令不可";
        }

        if (!args.length) {
            return "Usage: chat <房间>";
        }

        if (args[0] === "room1") {
            gameStore.completeTask("access_chat");
            return gameStore.currentLevelData.fileContents["public/room1.txt"];
        }

        return "房间不存在或已关闭";
    }
};

const privateCommand: Command = {
    name: "private",
    description: "查看私聊记录",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 10) {
            return "private: 命令不可用";
        }

        if (!args.length) {
            return "Usage: private <用户>";
        }

        const user = args[0].toLowerCase();
        if (["david", "eve"].includes(user)) {
            gameStore.completeTask("find_evidence");
            return `${gameStore.currentLevelData.fileContents[`private/${user}.txt`]}

[提示] 发现可疑的历史记录
建议使用 history 2024-04-01 查看详细信息`;
        }

        return "用户不存在";
    }
};

const historyCommand: Command = {
    name: "history",
    description: "查看历史记录",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 10) {
            return "history: 命令不可用";
        }

        if (!args.length) {
            return "Usage: history <日期> (格式：YYYY-MM-DD)";
        }

        if (args[0] === "2024-04-01") {
            gameStore.completeTask("decode_plan");
            return gameStore.currentLevelData.fileContents[".deleted"];
        }

        return "没有找到指定日期的记录";
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
        // 退出游戏状态
        gameStore.exitGame();

        return "";  // 返回空字符串，不显示任何提示
    }
};

const loganalyzerCommand: Command = {
    name: "loganalyzer",
    description: "分析日志文件中的异常模式",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 12) {
            return "loganalyzer: 命令不可用";
        }

        if (!args.length) {
            return "Usage: loganalyzer <日志文件>";
        }

        const logFile = args[0];
        const validLogs = ["auth.log", "system.log", "access.log", "error.log"];

        if (!validLogs.includes(logFile)) {
            return `loganalyzer: ${logFile}: 不是有效的日志文件`;
        }

        gameStore.completeTask("analyze_logs");

        if (logFile === "auth.log") {
            return `分析结果：
1. 检测到暴力破解尝试
   - 目标账户: admin, root, administrator
   - 来源IP: 192.168.1.100
   - 时间范围: 02:13:45 - 02:14:01
2. 成功登录
   - 用户: guest
   - 时间: 02:14:30
3. 权限提升尝试
   - 命令: sudo su
   - 结果: 失败
4. 可疑行为
   - 尝试访问 /root 目录
   - 权限被拒绝`;
        }

        if (logFile === "system.log") {
            return `分析结果：
1. 系统异常
   - CPU 使用率异常（02:15:00）
   - 多次访问敏感目录（02:15:30）
   - 网络流量异常（02:16:00）
2. 会话信息
   - 开始时间: 02:14:30
   - 结束时间: 02:16:10
3. 连接信息
   - IP: 192.168.1.100
   - 持续时间: 约2分35秒

[提示] 发现多个可疑事件，建议使用 timeline 命令生成完整的攻击过程时间线`;
        }

        if (logFile === "access.log") {
            return `分析结果：
1. 攻击模式
   - 初始探测: login.php
   - 提权尝试: admin/config.php
   - 数据窃取: backup/db.sql, data/users.csv
   - 路径穿越: ../../../etc/passwd
2. 成功获取
   - users.csv (15360 bytes)
3. 攻击时间线
   - 开始: 02:13:45
   - 结束: 02:16:00
4. 攻击特征
   - 目录遍历
   - 权限绕过
   - 敏感信息泄露

[提示] 发现两种不同类型的攻击事件：
- 系统层面的入侵尝试(system)
- Web应用层面的攻击行为(web)`;
        }

        if (logFile === "error.log") {
            return `分析结果：
1. 安全警告
   - 未授权访问管理区域
   - 目录遍历攻击
   - 路径穿越尝试
2. 数据泄露
   - 文件: users.csv
   - 大小: 较大
3. 攻击手法
   - Web应用漏洞利
   - 参数篡改
   - 访问控制绕过`;
        }

        return "分析完成。";
    }
};

const timelineCommand: Command = {
    name: "timeline",
    description: "分析事件时间线",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 9) {
            return "timeline: 命令不可用";
        }

        if (!args.length) {
            return "Usage: timeline <事件ID>";
        }

        const eventId = args[0];
        if (eventId === "666") {
            gameStore.completeTask("analyze_timeline");
            return `进程创建事件分析：
时间：02:15:00
进程：svchost.exe (PID 666)
详情：
1. 异常特征
   - 系统进程被替换
   - 内存占用异常（45MB）
   - CPU使用率过高（85%）
2. 行为分析
   - 尝试建立网络连接
   - 加载未知模块
   - 创建加密通道
3. 风险等级：高

[提示] 使用 timeline 888 分析相关的网络连接`;
        }

        if (eventId === "888") {
            return `网络连接事件分析：
时间：02:15:30
连接详情：
1. 本地端口：445
2. 远程地址：185.192.69.69
3. 连接状态：ESTABLISHED
4. 关联进程：svchost.exe
5. 数据传输：
   - 发现加密数据：QkFDS0RPT1JfMjAyNA==
   
[提示] 这些数据需要解码 最终密码为：解码@YYYY-MM-DD`;
        }

        return "未找到指定的事件ID";
    }
};

const traceCommand: Command = {
    name: "trace",
    description: "追踪IP地址活动",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 12) {
            return "trace: 命令不可用";
        }

        if (!args.length) {
            return "Usage: trace <IP地址>";
        }

        const ip = args[0];
        if (ip === "192.168.1.100") {
            return `IP追踪结果：
来源: 192.168.1.100
提示：这是一个伪装的内网IP地址无法进行追踪`;
        }

        if (ip === "185.192.69.69") {
            gameStore.completeTask("find_data");
            return `IP追踪结果：
来源: 185.192.69.69 (真实攻击源)
活动摘要：
1. 连接信息
   - 首次连接：02:13:40
   - 最后活动：02:16:15
   - 总连接时间：2分35秒

2. 行为特征
   - 使用IP伪装技术
   - 多次失败的登录尝试
   - 成功获取普通用户权限
   - 尝试提升权限
   - 访问敏感目录和文件
   - 成功窃取数据：users.csv

3. 攻击特征
   - 使用自动化工具
   - 目标明确
   - 熟悉系统结构
   - 专业的渗透测试手法

4. 威胁等级：高
   - 成功窃取敏感数据
   - 可能会再次尝试入侵
   - 建议立即修改所有密码
   - 更新访问控制策略

解锁密码：L0G_H4CK_2024`;
        }

        return `trace: ${ip}: 未找到相关活动记录`;
    }
};

const memdumpCommand: Command = {
    name: "memdump",
    description: "分析内存快照",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 11) {
            return "memdump: 命令不可用";
        }

        if (!args.length) {
            return "Usage: memdump <文件名>";
        }

        if (args[0] === "snapshot.raw") {
            gameStore.completeTask("analyze_memory");
            return `内存分析报告：
1. 可疑进程
   - PID: 666 (svchost.exe)
     异常：系统进程占用内存过高
   - PID: 888 (backdoor.exe)
     异常：可疑的文件位置和命名
2. 网络连接
   - 发现可疑的外连通信
   - 目标：malicious.server
3. 加密通信
   - 发现Base64编码的命令
   - ENCRYPTED_COMMAND=QkFDS0RPT1JfMjAyNA==
4. 建议
   - 进一步分析进程 666 和 888
   - 解码加密的命令字符串`;
        }

        return `memdump: ${args[0]}: 文件不存在`;
    }
};

const stringsCommand: Command = {
    name: "strings",
    description: "提取内存中的可读字符串",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 11) {
            return "strings: 命令不可用";
        }

        if (!args.length) {
            return "Usage: strings <文件名>";
        }

        if (args[0] === "snapshot.raw") {
            gameStore.completeTask("find_malware");
            return `字符串提取结果：
1. 系统路径
   C:\\Windows\\System32
   C:\\Users\\Admin\\AppData\\Local\\Temp

2. 网络通信
   http://malicious.server/beacon
   POST /data HTTP/1.1
   User-Agent: Mozilla/5.0

3. 加密数据
   ENCRYPTED_COMMAND=QkFDS0RPT1JfMjAyNA==
   [提示：这是Base64编码，解码后可能是密码]

4. 其他
   backdoor.exe
   svchost.exe
   explorer.exe`;
        }

        return `strings: ${args[0]}: 文件不存在`;
    }
};

const volatilityCommand: Command = {
    name: "volatility",
    description: "高级内存取证分析",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 9) {
            return "volatility: 命令不可用";
        }

        if (!args.length) {
            return "Usage: volatility <文件名>";
        }

        if (args[0] === "snapshot.raw") {
            gameStore.completeTask("extract_info");
            return `深度分析结果：
1. 进程分析
   - PID 666 (svchost.exe)
     注入了可疑代码
     正在进行网络通信
   - PID 888 (backdoor.exe)
     来自临时目录
     具有持久化机制

2. 网络连接
   - 外连 IP: 185.192.69.69
   - 使用加密通信
   - 数据外泄迹象

3. 内存字符串
   - 发现多个加密字符串
   - 使用 timeline 构建事件时间线
 `;
        }

        return `volatility: ${args[0]}: 文件不存在`;
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

const netstatCommand: Command = {
    name: "netstat",
    description: "显示网络连接信息",
    execute: () => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 12) {
            return "netstat: 命令不可用";
        }

        return `活动的网络连接：
协议   本地地址            远程地址              状态
TCP    0.0.0.0:80         192.168.1.100:52981   已建立
TCP    0.0.0.0:80         185.192.69.69:52982   已建立
TCP    0.0.0.0:443        192.168.1.100:52983   已建立
TCP    0.0.0.0:443        185.192.69.69:52984   已建立

[分析] 发现可疑连接：
- 伪装IP (192.168.1.100) 使用了常见端口
- 真实IP (185.192.69.69) 同时建立了多个连接
建议使用 trace 185.192.69.69 追踪真实攻击源`;
    }
};

export {
    helpCommand,
    lsCommand,
    cdCommand,
    catCommand,
    clearCommand,
    unlockCommand,
    decodeCommand,
    saveCommand,
    loadCommand,
    deleteSaveCommand,
    scanCommand,
    repairCommand,
    pingCommand,
    connectCommand,
    downloadCommand,
    psCommand,
    topCommand,
    analyzeCommand,
    killCommand,
    restoreCommand,
    whoamiCommand,
    sudoCommand,
    chmodCommand,
    tcpdumpCommand,
    wiresharkCommand,
    iptablesCommand,
    mailCommand,
    searchCommand,
    draftCommand,
    chatCommand,
    privateCommand,
    historyCommand,
    exitCommand,
    loganalyzerCommand,
    timelineCommand,
    traceCommand,
    memdumpCommand,
    stringsCommand,
    volatilityCommand,
    levelCommand,
    netstatCommand,
    hintCommand
}; 