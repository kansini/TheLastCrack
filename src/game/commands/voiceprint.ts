import {Command} from "@/types/terminal"
import {useGameStore} from "@/stores/game"
import {createApp, h} from "vue"
import VoiceprintAnalyzer from "@/components/VoiceprintAnalyzer.vue"

export const voiceprintCommand: Command = {
    name: "voiceprint",
    description: "比对声纹样本",
    execute: (args: string[]) => {
        const gameStore = useGameStore()

        if (gameStore.currentLevel !== 17) {
            return "voiceprint: 命令不可用"
        }

        if (args.length !== 2) {
            return "用法: voiceprint <目标音频> <样本音频>"
        }

        const [target, sample] = args

        // 验证文件是否存在
        const validTargets = ["meeting.wav", "suspicious.wav", "background.wav"]
        const validSamples = ["sample_A.wav", "sample_B.wav", "sample_C.wav", "sample_D.wav"]

        if (!validTargets.includes(target)) {
            return "错误: 目标音频文件不存在"
        }

        if (!validSamples.includes(sample)) {
            return "错误: 样本音频文件不存在"
        }

        // 创建分析窗口
        const container = document.createElement("div")
        container.style.position = "fixed"
        container.style.top = "50%"
        container.style.left = "50%"
        container.style.transform = "translate(-50%, -50%)"
        container.style.zIndex = "9999"
        document.body.appendChild(container)

        const app = createApp({
            render() {
                return h(VoiceprintAnalyzer, {
                    targetAudio: target,
                    sampleAudio: sample,
                    onClose: () => {
                        app.unmount()
                        document.body.removeChild(container)
                    }
                })
            }
        })

        app.mount(container)

        // 特定组合的匹配结果
        if (target === "suspicious.wav" && sample === "sample_D.wav") {
            gameStore.completeTask("match_voice")
            return "正在分析声纹...\n\n[发现] 声纹匹配度超过85%，确认为同一人！"
        }

        if (target === "meeting.wav" && sample === "sample_B.wav") {
            return "正在分析声纹...\n\n[分析] 声纹特征有一定相似度，但不足以确定是同一人。"
        }

        if (target === "background.wav") {
            return "正在分析声纹...\n\n[警告] 背景噪声过大，无法进行有效分析。"
        }

        return "正在分析声纹..."
    }
} 