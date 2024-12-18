import type { Command } from "@/types/terminal";
import { useGameStore } from "@/stores/game";
import { getCurrentLevelData } from "@/game/levels";

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