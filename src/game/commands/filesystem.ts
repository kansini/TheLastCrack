import type { Command } from "@/types/terminal";
import { useGameStore } from "@/stores/game";
import { getCurrentLevelData } from "@/game/levels";
import {useLanguageStore} from "@/stores/language";

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

        // 如果查看了15关的关键文件，标记相应任务完成
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
export const filesystemCommands: { [key: string]: Command } = {
    ls: lsCommand,
    cd: cdCommand,
    cat: catCommand,
};