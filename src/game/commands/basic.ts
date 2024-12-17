import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
import {getCurrentLevelData} from "@/game/levels";
import {useTerminalStore} from "@/stores/terminal";
import {useSaveStore} from "@/stores/save";

export const helpCommand: Command = {
    name: "help",
    description: "显示所有可用命令",
    execute: () => {
        return `可用命令：
  help - 显示此帮助信息
  ls - 列出当前目录文件
  cd <目录> - 切换目录
  cat <文件> - 查看文件内容
  clear - 清除终端屏幕
  decode <text> - 解密文本
  unlock <密码> - 使用密码解锁下一关
  scan <文件> - 扫描分析文件
  repair <源文件> <备份文件> - 修复损坏的文件
  ping <IP> - 测试网络连接
  connect <IP> <用户名> <密码> - 连接服务器
  download <文件名> - 下载服务器文件
  save <名称> - 保存游戏进度
  load [ID] - 查看或加载存档
  deletesave <ID> - 删除存档`;
    }
};

export const lsCommand: Command = {
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

export const cdCommand: Command = {
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

export const catCommand: Command = {
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

export const clearCommand: Command = {
    name: "clear",
    description: "清除终端屏幕",
    execute: () => {
        const store = useTerminalStore();
        store.clearHistory();
        return "";
    }
};

export const unlockCommand: Command = {
    name: "unlock",
    description: "使用密码解锁下一关",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: unlock <password>";
        }

        const gameStore = useGameStore();
        const level = gameStore.currentLevel;
        const password = args.join(" ");

        switch (level) {
            case 1:
                // 第一关的逻辑
                if (!gameStore.completedTasks.includes("find_secret")) {
                    return "你还没有找到必要的线索！";
                }
                if (password.toUpperCase() === "MOON_LIGHT") {
                    gameStore.completeLevel();
                    return "密码正确！欢迎进入下一关...";
                }
                break;

            case 2:
                // 第二关的逻辑
                if (!gameStore.completedTasks.includes("decode_text")) {
                    return "你需要先使用 decode 命令解密文本！";
                }
                if (password === "Old Flood") {
                    gameStore.completeLevel();
                    return "密码正确！欢迎进入下一关...";
                }
                break;

            case 3:
                // 第三关的逻辑
                if (!gameStore.completedTasks.includes("find_key")) {
                    return "你需要先查看相关文件获取密码线索！";
                }
                if (password === "HACK-0401") {
                    gameStore.completeLevel();
                    return "密码正确！欢迎进入下一关...";
                }
                break;

            case 4:
                if (!gameStore.completedTasks.includes("repair_data")) {
                    return "你需要先修复损坏的数据文件！";
                }
                if (password === "D@t@B@se_2024") {
                    gameStore.completeLevel();
                    return "密码正确！欢迎进入下一关...";
                }
                break;

            case 5:
                if (!gameStore.completedTasks.includes("get_data")) {
                    return "你需要先从服务器下载数据！";
                }
                if (password === "C0nnected@2024") {
                    gameStore.completeLevel();
                    return "密码正确！欢迎进入下一关...";
                }
                break;

            case 6:
                if (!gameStore.completedTasks.includes("system_restore")) {
                    return "你需要先恢复系统状态！";
                }
                if (password === "OlDHong_2077") {
                    gameStore.completeLevel();
                    return "密码正确！欢迎进入下一关...";
                }
                break;

            // ... 其他关卡的逻辑
        }

        return "密码错误，请继续寻找线索。";
    }
};

export const hintCommand: Command = {
    name: "hint",
    description: "获取当前关卡的提示（隐藏命令）",
    execute: () => {
        const gameStore = useGameStore();
        const level = gameStore.currentLevel;

        switch (level) {
            case 1:
                return "提示：使用 ls -a 命令可以查看隐藏文件";
            case 2:
                return `提示：
1. 加密文本 "Pme!Gmppe!" 中的每个字母都被向后移动了一位
2. 例如：'T' 变成了 'U', 'h' 变成了 'i'
3. 解密后的文本 "Old Flood"
4. 试试在工具目录中找解密工具`;
            case 3:
                return `提示：
1. 使用 cd <目录名> 进入目录，使用 cd .. 返回上级目录
2. 密钥被分成了两个部分（XXXX-XXXX 格式）
3. 第一部分在 .keys 目录中的 key_fragment_1 文件里
4. 第二部分在 .keys 目录中的 key_fragment_2 文件里
5. 使用 ls -a 可以看到隐藏的 .keys 目录
6. 进入目录后使用 cat 命令查看文件内容
7. 将两个密钥碎片按 XXXX-XXXX 格式组合
8. 最后使用 unlock 命令输入完整密钥`;
            case 4:
                return `提示：
1. 使用 scan corrupted_data.db 分析损坏的文件
2. 检查 logs 目录下的日志文件，找出数据库损坏的具体时间
3. 在 backup 目录中找到损坏时间之前的最后一个备份
4. 使用 repair 命令修复文件：repair corrupted_data.db backup_0401.bak
5. 修复后的数据就是解锁密码`;
            case 5:
                return `提示：
1. 先检查 network 目录下的网络配置文件
2. 使用 ping 命令测试服务器连通性：ping 192.168.1.200
3. 在 config 目录中寻找登录凭据（注意隐藏文件）
4. 使用 connect 命令连接服务器：connect 192.168.1.200 kansini <密码>
5. 连接成功后使用 download 命令下载 secret_data 文件
6. 下载的数据就是通关密码`;
            case 6:
                return `提示：
1. 使用 ps 或 top 命令查看进程列表
2. 找出 CPU 和内存占用异常的进程
3. 使用 analyze 666 分析可疑进程
4. 确认是恶意进程后使用 kill 666 终止它
5. 最后使用 restore 命令恢复系统
6. 系统恢复后会显示通关密码`;
            case 7:
                return `提示：
1. 先用 whoami 命令查看当前用户权限
2. 检查 whoami.exe 的版本信息
3. 使用 ls -a 在 usr 目录中寻找隐藏文件
4. 按照隐藏文件中的说明利用漏洞
5. 获得 root 权限后使用 sudo cat shadow
6. shadow 文件中包含通关密码`;
            default:
                return "当前关卡暂无提示";
        }
    }
};

export const decodeCommand: Command = {
    name: "decode",
    description: "解密文本",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: decode <text>";
        }

        const gameStore = useGameStore();
        const text = args.join(" ");

        // 简单的解密逻辑：每个字母向前移动一位
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
            return `解密成功！解密结果：${decrypted}\n恭喜你发现了密码！`;
        }

        return `解密结果：${decrypted}`;
    }
};

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

        return `游戏已保存到存档 #${saveId}: ${saveName}`;
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
            return `可用存档：\n${saves.map(s =>
                `#${s.id}: ${s.name} (${new Date(s.save.timestamp).toLocaleString()})`
            ).join("\n")}\n\n请用 load <存档ID> 来加载存档`;
        }

        const saveId = parseInt(args[0]);
        if (isNaN(saveId)) {
            return "请输入有效的存档ID";
        }

        const saveStore = useSaveStore();
        if (saveStore.loadSave(saveId)) {
            return "存档加载成功！";
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

export const scanCommand: Command = {
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
            return `scan: ${filename}: 文件不存在`;
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

export const repairCommand: Command = {
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

        return "修复失败：备份文件不匹配或已损坏";
    }
};

export const pingCommand: Command = {
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
    数包: 已发送 = 3，已接收 = 3，丢失 = 0 (0% 丢失)
往返行程的估计时间(以毫秒为单位):
    最短 = 0ms，最长 = 1ms，平均 = 0ms`;
        }

        return `Ping 请求找不到主机 ${ip}。请检查该名称，然后重试。`;
    }
};

export const connectCommand: Command = {
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
            return "连接成功！服务器已就绪。\n可以使用 download 命令下载数据。";
        }

        return "连接失败：认证错误。请检查 IP、用户名和密码。";
    }
};

export const downloadCommand: Command = {
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
文件内容：C0nnected@2024
这是通关密码！`;
        }

        return `错误：文件 '${filename}' 不存在或无法访问。`;
    }
};

export const psCommand: Command = {
    name: "ps",
    description: "查看进程列表",
    execute: () => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 6) {
            return "ps: 命令不可用";
        }

        return `PID   名称          CPU    内存   状态
1     systemd        0.1%   1.2MB  运行中
666   malware.exe   99.9%  512MB  运行中
888   backdoor.exe  45.2%  128MB  运行中
999   monitor.exe    0.5%   4.8MB  运行中`;
    }
};

export const topCommand: Command = {
    name: "top",
    description: "实时监控系统资源",
    execute: (args: string[]) => {
        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 6) {
            return "top: 命令不可用";
        }

        // 如果输入是 q，则返回退出消息
        if (args[0] === "q") {
            return "已退出 top";
        }

        return `系统监控 - 每3秒更新一次
进程总数：4    运行中：4    已停止：0

CPU 使用率：145.7%
内存使用率：89.2%

  PID 名称          CPU    内存   状态     启动时间
  666 malware.exe   99.9%  512MB  运行中   23:59:59
  888 backdoor.exe  45.2%  128MB  运行中   23:59:58
  999 monitor.exe    0.5%   4.8MB  运行中   00:00:01
    1 systemd        0.1%   1.2MB  运行中   00:00:00

提示：输入 "top q" 退出监控`;
    }
};

export const analyzeCommand: Command = {
    name: "analyze",
    description: "分析进程",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: analyze <PID>";
        }

        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 6) {
            return "analyze: 命令不可用";
        }

        const pid = args[0];
        if (pid === "666") {
            gameStore.completeTask("analyze_process");
            return `分析报告 - PID 666 (malware.exe)
危险等级：高
特征：
1. CPU 使用率异常
2. 可疑的网络连接
3. 未知的文件操作
4. 自动启动项修改

建议：
立即终止此进程（使用 kill 666）`;
        }

        return `分析报告 - PID ${pid}
进程状态：正常
无可疑行为`;
    }
};

export const killCommand: Command = {
    name: "kill",
    description: "终止进程",
    execute: (args: string[]) => {
        if (!args.length) {
            return "Usage: kill <PID>";
        }

        const gameStore = useGameStore();
        if (gameStore.currentLevel !== 6) {
            return "kill: 命令不可用";
        }

        const pid = args[0];
        if (pid === "666") {
            gameStore.completeTask("kill_malware");
            return "进程已终止。\n系统状态开始恢复正常...";
        }

        if (pid === "1") {
            return "错误：无法终止系统核心进程";
        }

        return `kill: 进程 ${pid} 不存在`;
    }
};

export const restoreCommand: Command = {
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
        return `系统恢复完成：
1. 已清理恶意程序残留
2. 已恢复系统服务
3. 已更新安全策略
4. 系统状态：正常

恢复密码：OlDHong_2077`;
    }
};

export const whoamiCommand: Command = {
  name: 'whoami',
  description: '显示当前用户',
  execute: (args: string[]) => {
    const gameStore = useGameStore();
    if (gameStore.currentLevel !== 7) {
      return 'whoami: 命令不可用';
    }

    // 检查是否是漏洞利用参数
    if (args[0] && args[0].startsWith('--debug=')) {
      const payload = args[0].substring(8);  // 去掉 '--debug=' 前缀
      if (payload.includes('A'.repeat(128) + '\\x90'.repeat(32))) {
        gameStore.completeTask('get_root');
        return `[漏洞触发成功]
权限提升：user -> root
当前用户：root
用户组：root wheel admin`;
      }
    }

    return 'user';  // 默认显示普通用户
  }
};

export const sudoCommand: Command = {
  name: 'sudo',
  description: '以管理员权限执行命令',
  execute: (args: string[]) => {
    const gameStore = useGameStore();
    if (gameStore.currentLevel !== 7) {
      return 'sudo: 命令不可用';
    }

    if (!args.length) {
      return 'Usage: sudo <command>';
    }

    if (!gameStore.completedTasks.includes('get_root')) {
      return '错误：用户不在 sudoers 文件中。此事将被报告。';
    }

    const command = args.join(' ');
    if (command === 'cat shadow') {
      gameStore.completeTask('read_shadow');
      return `root:$6$xyz$hash:19000:0:99999:7:::
user:$6$abc$hash:19000:0:99999:7:::
guest:$6$def$hash:19000:0:99999:7:::

解密后的 root 密码：Pr1v1l3ge_2024`;
    }

    return `sudo: ${args[0]}: 命令未找到`;
  }
};

export const chmodCommand: Command = {
  name: 'chmod',
  description: '修改文件权限',
  execute: (args: string[]) => {
    const gameStore = useGameStore();
    if (gameStore.currentLevel !== 7) {
      return 'chmod: 命令不可用';
    }

    if (args.length !== 2) {
      return 'Usage: chmod <权限> <文件>';
    }

    return '权限不足：需要 root 权限';
  }
}; 