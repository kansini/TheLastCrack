import type { LevelData } from '@/types/game';

export const level17: LevelData = {
    id: 17,
    title: "声纹追踪",
    description: "【第17关】在一次秘密会议的录音中，发现了一段可疑的声音片段。你需要通过声纹分析找出说话人的身份。",
    objectives: [
        "分析录音文件",
        "比对声纹样本",
        "确认可疑人员",
        "找出隐藏信息"
    ],
    requiredTasks: ["analyze_audio", "match_voice", "identify_suspect"],
    fileSystem: {
        "~": ["readme.txt", "audio", "samples", "analysis"],
        "~/audio": ["meeting.wav", "suspicious.wav", "background.wav"],
        "~/samples": ["sample_A.wav", "sample_B.wav", "sample_C.wav", "sample_D.wav"],
        "~/analysis": ["voice_patterns.txt", "meeting_notes.txt", "suspects.txt"]
    },
    fileContents: {
        "readme.txt": `声纹分析任务：

我们截获了一段秘密会议的录音，其中有一段可疑的声音需要分析。
使用 voiceprint <音频文件> <样本文件> 命令来比对声纹。

已知信息：
1. 嫌疑人使用了变声器
2. 背景音中可能隐藏了重要信息
3. 需要找出真实说话人

[提示] 使用 analyze 命令查看音频文件的基本信息`,

        "voice_patterns.txt": `声纹特征分析：

Sample_A: 男性，年龄45-50，无口音
Sample_B: 男性，年龄30-35，轻微南方口音
Sample_C: 女性，年龄40-45，标准口音
Sample_D: 男性，年龄35-40，带有电子处理痕迹

[注意] 留意声音的频率特征和语气习惯`,

        "meeting_notes.txt": `会议记录：

时间：2024-03-15 23:30
地点：未知
参与人数：4人

关键时间点：
23:35 - 讨论项目进展
23:42 - [可疑声音片段]
23:47 - 提到密码箱
23:55 - 会议结束

[重要] 23:42的声音与Sample_D极其相似`,

        "suspects.txt": `嫌疑人档案：

代号A - "教授"
特征：声音浑厚，语速较慢
身份：前声学专家

代号B - "工程师"
特征：说话干脆，语气急促
身份：系统架构师

代号C - "分析师"
特征：声音清晰，逻辑性强
身份：数据专家

代号D - "幽灵"
特征：声音经过处理，难以识别
身份：未知

[分析] 所有样本都可能经过伪装，需要用声纹比对找出真实身份`
    },
    hints: [
        "使用 voiceprint 命令比对可疑声音与样本",
        "注意观察声波的频率特征",
        "相似度达到85%以上可认为是同一个人",
        "背景音中可能包含摩斯密码",
        "最终密码与说话人身份有关"
    ]
}; 