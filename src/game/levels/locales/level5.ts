import {LevelLocales} from "./index";

export const level5Locales: LevelLocales = {
    zh: {
        title: "远程连接",
        description: "我们发现了一个可疑的远程服务器，需要你尝试连接并获取其中的数据。",
        objectives: [
            "测试服务器连接",
            "建立远程连接",
            "下载服务器数据",
            "获取通关密码"
        ],
        hints: [
            "使用 ping 命令测试服务器连接状态",
            "服务器IP地址是 192.168.1.200",
            "尝试使用默认用户名 kansini",
            "密码是 Network 的变形版本，把字母 o 换成数字 0",
            "连接成功后使用 download secret_data 获取数据"
        ],
        fileContents: {
            "readme.txt": "远程服务器信息：\nIP: 192.168.1.200\n用户名: kansini\n\n请尝试连接这台服务器并获取其中的数据。\n\n[注意] 服务器上有一个名为 secret_data 的重要文件。",
            "network_config.txt": "网络配置：\n1. 默认网关：192.168.1.1\n2. 子网掩码：255.255.255.0\n3. 目标服务器：192.168.1.200\n\n[提示] 这是一个网络安全测试服务器，使用 ping 命令。",
            "connection.log": "最近的连接记录：\n[失败] 密码格式：8位以上，包含大小写字母和特殊字符\n[提示] 密码以 '@2024' 结尾\n[提示] 密码与 Network 相关，但使用了一些常见的密码变形技巧",
            ".notes.txt":
                "我发现了一个隐藏的命令 <matrix>\n" +
                "安全备忘：\n密码提示：\n   - 与 Network 有关\n   - 把字母 'o' 替换成数字 '0'\n   - 首字母大写"

        }
    },
    en: {
        title: "Remote Connection",
        description: "We found a suspicious remote server, you need to try connecting to it and retrieve the data.",
        objectives: [
            "Test server connection",
            "Establish remote connection",
            "Download server data",
            "Get the password"
        ],
        hints: [
            "Use ping command to test server connection status",
            "Server IP address is 192.168.1.200",
            "Try using default username kansini",
            "Password is a variation of Network, replace letter o with number 0",
            "After connecting, use download secret_data to get the data"
        ],
        fileContents: {
            "readme.txt": "Remote server information:\nIP: 192.168.1.200\nUsername: kansini\n\nPlease try to connect to this server and retrieve the data.\n\n[NOTE] There is an important file named secret_data on the server.",
            "network_config.txt": "Network configuration:\n1. Default gateway: 192.168.1.1\n2. Subnet mask: 255.255.255.0\n3. Target server: 192.168.1.200\n\n[HINT] This is a network security test server, use ping command.",
            "connection.log": "Recent connection records:\n[FAILED] Password format: 8+ chars, includes upper/lower case and special chars\n[HINT] Password ends with '@2024'\n[HINT] Password is related to Network but uses common password modification tricks",
            ".notes.txt":
                "I found a hidden command <matrix>\n" +
                "Security memo:\nPassword hints:\n   - Related to Network\n   - Replace letter 'o' with number '0'\n   - Capitalize first letter"
        }
    }
}; 