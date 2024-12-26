import {Command} from "@/types/terminal"
import {useGameStore} from "@/stores/game"
import {createApp, h} from "vue"
import VoiceprintAnalyzer from "@/components/VoiceprintAnalyzer.vue"

export const voiceprintCommand: Command = {
    name: "voiceprint",
    description: "分析声纹样本",
    execute: (args: string[]) => {
        const gameStore = useGameStore()
        
        if (gameStore.currentLevel !== 17) {
            return "voiceprint: 命令不可用"
        }

        if (args.length !== 2) {
            return "用法: voiceprint <可疑音频> <样本音频>"
        }

        let [targetFile, sampleFile] = args



        // 验证文件是否存在
        if (targetFile !== "suspicious.wav") {
            return "错误: 可疑音频文件不存在"
        }

        const validSamples = ["sample_1.wav", "sample_2.wav", "sample_3.wav", "sample_4.wav"]
        if (!validSamples.includes(sampleFile)) {
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
                    targetAudio: targetFile,
                    sampleAudio: sampleFile,
                    onClose: () => {
                        app.unmount()
                        document.body.removeChild(container)
                    }
                })
            }
        })

        app.mount(container)

        // 返回分析结果
        // sample_2 和 sample_3 是匹配度较高的样本
        if (sampleFile === "sample_2.wav") {
            gameStore.completeTask("match_voice")
            return "正在分析声纹...\n\n[发现] 尽管使用了变声器，但语音习惯显示较高匹配度(78%)！"
        } else if (sampleFile === "sample_3.wav") {
            gameStore.completeTask("match_voice")
            return "正在分析声纹...\n\n[发现] 说话方式和语音特征显示较高匹配度(75%)！"
        }

        return "正在分析声纹...\n\n[结果] 匹配度较低，可能不是同一个人。"
    }
} 