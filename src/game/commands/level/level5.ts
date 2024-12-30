import type {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";

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
export const level5Commands: { [key: string]: Command } = {
    ping: pingCommand,
    connect: connectCommand,
    download: downloadCommand
};