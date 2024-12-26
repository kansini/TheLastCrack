import type {LevelData} from "@/types/game";

export const level17: LevelData = {
    id: 17,
    title: "双重验证",
    description: "通过声纹和指纹双重比对，确认嫌疑人身份",

    objectives: [
        "阅读 readme.txt 了解分析系统",
        "分析可疑声音录音",
        "比对现场指纹",
        "确认嫌疑人身份",
        "提交正确的通关密码"
    ],

    requiredTasks: [
        "match_fingerprints",
        "match_voice"
    ],

    fileSystem: {
        "~": ["readme.txt", "audio", "fingerprints", "analysis.txt", "tools"],
        "~/tools": ["voiceprint.exe", "fingerprint.exe","suspects.exe"],
        "~/audio": ["suspicious.wav", "samples"],
        "~/audio/samples": ["sample_1.wav", "sample_2.wav", "sample_3.wav", "sample_4.wav"],
        "~/fingerprints": ["scene.fpt", "keyboard.fpt", "door.fpt", "samples"],
        "~/fingerprints/samples": ["sample_1.fpt", "sample_2.fpt", "sample_3.fpt", "sample_4.fpt"]
    },

    fileContents: {
        "readme.txt": `任务简报：
在一起数据中心入侵事件中，我们发现了以下关键证据：
1. 可疑的会议录音片段
2. 三处现场指纹
3. 四名嫌疑人的声纹和指纹样本

任务目标：
1. 分析可疑录音内容
2. 比对嫌疑人声纹样本
3. 分析现场遗留指纹
4. 确认嫌疑人身份
        
注意事项：
- 嫌疑人使用了变声器
- 重点关注高质量的指纹样本
- 仔细核对时间线信息`,
        "analysis.txt": `现场分析报告
---------------------------
时间：
23:35 - 监控系统被关闭
23:40 - 数据中心入口处发现指纹 (scene.fpt)
23:42 - 主机键盘上发现完整指纹 (keyboard.fpt)
        同时监测到可疑对话 (suspicious.wav)
23:44 - 紧急出口门把手发现指纹 (door.fpt)
23:45 - 备用监控恢复，但未拍到嫌疑人
        
物证分析：
1. 声音分析
- 可疑对话内容："...计划已经开始执行，所有证据都被清理干净了..."
- 使用了变声器，但语音习惯和说话方式仍可分析
- 说话方式显示对系统非常熟悉
        
2. 指纹分析
- scene.fpt：部分指纹，质量中等，方向完整
- keyboard.fpt：完整指纹，质量优良，细节清晰
- door.fpt：模糊指纹，但纹路特征可辨识
        
结论：
1. 所有物证都指向同一时间段：23:40-23:44
2. 嫌疑人熟悉系统，提前关闭了监控
3. 建议重点对比 keyboard.fpt 的指纹
+4. 交叉比对声纹和指纹的结果，找出共同嫌疑人
        
[重要提示]
- 确定嫌疑人后，请按以下格式提交结果：
  时间_嫌疑人名_姓（全大写）
  例如：2345_JOHN_SMITH`,

        "suspicious.wav": `[会议录音片段 - 23:42]
[背景音：键盘敲击声]
未知人士：(使用变声器) "...计划已经开始执行，所有证据都被清理干净了..."
[背景音：设备运行声]
未知人士：(继续) "...主机已经被重置，数据无法恢复..."
[背景音：脚步声]
[录音结束]
        
[系统分析]
- 说话人使用了高级变声器
- 背景噪音显示位于数据中心
- 对话时间：23:42:15`,

        "voiceprint.exe": `[声纹分析工具]
使用方法: voiceprint <可疑音频> <样本音频>
示例：voiceprint suspicious.wav sample_1.wav
        
注意：即使使用了变声器，语音习惯和说话方式仍可分析
      建议找出匹配度较高的2-3名嫌疑人`,

        "fingerprint.exe": `
[指纹比对工具]
使用方法: fingerprint <目标指纹> <样本指纹>
        
分析结果包括：
- 纹路匹配度
- 特征点匹配
- 细节相似度
- 总体相似度
示例：fingerprint keyboard.fpt sample_1.fpt
注意：相似度超过85%表示高度匹配`,
        "suspects.exe":`
 [查看嫌疑列表工具]
 使用方法: 执行命令 suspects 即可查看你添加的所有嫌疑人信息
 `
    },
    story: `
        调查进展到了关键时刻。在一次秘密会议的录音中，发现了一段可疑的声音。
        同时，现场还发现了三处指纹:
        - 现场遗留的部分指纹 (scene.fpt)
        - 主机键盘上的完整指纹 (keyboard.fpt)
        - 门把手上的模糊指纹 (door.fpt)

        警方数据库中有四名嫌疑人的声纹和指纹样本:
        - John Smith (sample_1.wav / sample_1.fpt)
        - Michael Brown (sample_2.wav / sample_2.fpt)
        - James Wilson (sample_3.wav / sample_3.fpt)
        - David Miller (sample_4.wav / sample_4.fpt)

        需要通过声纹和指纹的双重比对，确认嫌疑人身份。
        注意：
        1. 即使使用了变声器，声纹分析仍能缩小嫌疑人范围
        2. 指纹是无法伪装的物证
        3. 根据现场时间推断，嫌疑人在23:42留下了这些证据`,

    // 更新提示
    hints: [
        "先用 voiceprint 命令分析可疑声音，但要注意结果可能被变声器干扰",
        "使用 fingerprint 命令分析指纹，格式: fingerprint <目标指纹> <样本指纹>",
        "仔细阅读分析报告中的时间信息",
        "特别关注键盘上的完整指纹，它的匹配结果最可靠",
        "通关密码格式：时间_名_姓 (例如：23:40_JOHN_SMITH)"
    ],
} 