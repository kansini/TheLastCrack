import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
import {useLanguageStore} from "@/stores/language";
import {getCurrentLevelData} from "@/game/levels";

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
const scanCommand: Command = {
    name: "scan",
    description: "扫描分析文件",
    execute: (args: string[]) => {
        const languageStore = useLanguageStore();
        const t = languageStore.t;
        if (!args.length) {
            return `${t('invalidUsage')}: scan <${t('file')}>`;
        }

        const gameStore = useGameStore();
        const levelData = getCurrentLevelData(gameStore.currentLevel);
        const filename = args[0];

        if (!levelData.fileContents[filename]) {
            return `scan: ${filename}: ${t('scanFileNotExist')}`;
        }

        if (filename === "corrupted_data.db") {
            gameStore.completeTask("analyze_corrupt");
            return `${t('scanResults')}：
1. ${t('fileStatus')}：${t('corrupted')}
2. ${t('damageTime')}：2024-04-01 23:59:59
3. ${t('damagePart')}：${t('charReplacement')}
4. ${t('suggestedAction')}：${t('useBackup')}
5. ${t('backupTime')}：${t('beforeDamage')}`;
        }

        return `${t('scanResults')}：${t('fileIntact')}`;
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

        return "修复失败：备份文件不匹配或已损坏";
    }
};

const chmodCommand: Command = {
    name: "chmod",
    description: "修改文件权限",  // 保持静态描述
    execute: (args: string[]) => {
        const languageStore = useLanguageStore();
        const t = languageStore.t;


        if (args.length !== 2) {
            return `${t('invalidUsage')}: chmod <${t('permissions')}> <${t('file')}>`;
        }

        return `${t('permissionDenied')}: ${t('needRoot')}`;
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
export const otherCommands: { [key: string]: Command } = {
    strings: stringsCommand,
    memdump: memdumpCommand,
    scan: scanCommand,
    repair: repairCommand,
    chmod: chmodCommand,
    netstat: netstatCommand,
};

