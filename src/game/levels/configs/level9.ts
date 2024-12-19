import type {LevelData} from "@/types/game";

export const level9: LevelData = {
    id: 9,
    title: "内存取证",
    description: "【第9关】系统内存中可能存在重要的证据，你需要进行内存取证分析。",
    objectives: [
        "获取内存镜像",
        "分析进程信息",
        "提取关键数据",
        "还原事件过程"
    ],
    requiredTasks: ["analyze_memory", "extract_info", "analyze_timeline"],
    fileSystem: {
        "~": ["readme.txt", "memory.dump", "analysis.txt", "tools", "evidence"],
        "~/tools": ["volatility.exe", "strings.txt", "decoder.exe", "timeline.exe"],
        "~/evidence": ["process.txt", "network.txt", "timeline.txt", "report.md"]
    },
    fileContents: {
        "readme.txt": "内存取证指南：\n1. 使用 volatility 分析内存镜像\n2. 提取进程列表和网络连接\n3. 搜索关键字符串",

        "memory.dump": "[二进制数据] 使用 volatility 命令分析内存内容",

        "analysis.txt": "初步分析结果：\n1. 发现可疑进程\n2. 检测到加密通信\n3. 内存中存在敏感数据\n4. 时间戳异常\n\n[提示] 内存镜像文件已重命名为 snapshot.raw",

        "volatility.exe": "[工具说明]\n支持以下功能：\n1. 进程列表分析\n2. 网络连接检查\n3. 字符串提取\n4. 时间线构建\n\n使用方法：volatility <文件名>",

        "decoder.exe": "解码工具说明：\n在分析过程中，我们发现攻击者使用了多层加密方式：\n1. Base64 编码\n2. 可能包含混淆字符\n\n使用 decode <加密字符串> 命令进行解码",

        "timeline.exe": "[工具说明]\n用于分析系统事件时间线\n使用方法：timeline <事件ID>\n\n可用的事件ID：\n- 666: 进程创建事件\n- 888: 网络连接事件",

        "strings.txt": "内存字符串：\n- admin:password123\n- connect 192.168.1.100\n- download secret.zip\n- delete logs\n...",

        "report.md": "分析报告：\n## 可疑行为\n1. 未授权访问\n2. 数据窃取\n3. 日志删除\n\n## 时间线\n2024-12-19\n10:00 系统登录\n10:15 文件下载\n10:30 日志清理",

        "process.txt": "进程列表：\nPID    NAME         CPU   MEM   TIME\n666    svchost.exe  85%   45MB  02:15:00\n888    backdoor.exe 15%   20MB  02:15:30\n999    cmd.exe      1%    1MB   02:16:00",

        "network.txt": "网络连接：\nLOCAL           REMOTE          STATE\n0.0.0.0:445     185.192.69.69   ESTABLISHED\n0.0.0.0:3389    192.168.1.101   LISTENING",

        "timeline.txt": "事件时间线：\n02:15:00 - [事件666] 可疑进程创建 (svchost.exe)\n02:15:10 - 建立加密通信通道\n02:15:30 - [事件888] 检测到异常网络连接\n02:15:45 - 发现加密数据传输\n02:16:00 - 进程终止"
    },
    hints: [
        "查看 analysis.txt 了解内存镜像文件名",
        "使用 volatility snapshot.raw 分析内存镜像",
        "注意分析结果中的加密通信",
        "使用 timeline 命令分析可疑事件ID",
        "解码发现的加密字符串"
    ]
}; 