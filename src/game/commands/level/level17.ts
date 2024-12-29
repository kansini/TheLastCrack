import {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
import {createApp, h} from "vue";
import VoiceprintAnalyzer from "@/components/VoiceprintAnalyzer.vue";
import FingerprintAnalyzer from "@/components/FingerprintAnalyzer.vue";
import SuspectsList from "@/components/SuspectsList.vue";

const voiceprintCommand: Command = {
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
const fingerprintCommand: Command = {
    name: "fingerprint",
    description: "比对指纹样本",
    execute: (args: string[]) => {
        const gameStore = useGameStore()

        if (gameStore.currentLevel !== 17) {
            return "fingerprint: 命令不可用"
        }

        if (args.length !== 2) {
            return "用法: fingerprint <目标指纹> <样本指纹>"
        }

        let [targetFile, sampleFile] = args


        // 验证文件是否存在
        const validTargets = ["scene.fpt", "keyboard.fpt", "door.fpt"]
        const validSamples = ["sample_1.fpt", "sample_2.fpt", "sample_3.fpt", "sample_4.fpt"]

        if (!validTargets.includes(targetFile)) {
            return "错误: 目标指纹文件不存在"
        }

        if (!validSamples.includes(sampleFile)) {
            return "错误: 样本指纹文件不存在"
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
                return h(FingerprintAnalyzer, {
                    targetPrint: targetFile,
                    samplePrint: sampleFile,
                    onClose: () => {
                        app.unmount()
                        document.body.removeChild(container)
                    }
                })
            }
        })

        app.mount(container)

        // 返回分析结果
        // sample_1 和 sample_3 是匹配度较高的样本
        if (targetFile === "keyboard.fpt" || targetFile === "fingerprints/keyboard.fpt") {  // 键盘上的指纹最清晰
            if (sampleFile === "sample_1.fpt") {
                gameStore.completeTask("match_fingerprint")
                return "正在分析指纹...\n\n[发现] 指纹匹配度很高(87%)！"
            } else if (sampleFile === "sample_3.fpt") {
                gameStore.completeTask("match_fingerprint")
                return "正在分析指纹...\n\n[发现] 指纹匹配度极高(92%)！"
            }
        }

        return "正在分析指纹...\n\n[结果] 匹配度较低，可能不是同一个人。"
    }
}
const suspectsCommand: Command = {
    name: "suspects",
    description: "查看嫌疑人名单",
    execute: () => {
        const gameStore = useGameStore()

        if (gameStore.currentLevel !== 17) {
            return "suspects: 命令不可用"
        }

        // 创建嫌疑人名单窗口
        const container = document.createElement("div")
        container.style.position = "fixed"
        container.style.top = "50%"
        container.style.left = "50%"
        container.style.transform = "translate(-50%, -50%)"
        container.style.zIndex = "9999"
        document.body.appendChild(container)

        const app = createApp({
            render() {
                return h(SuspectsList, {
                    onClose: () => {
                        app.unmount()
                        document.body.removeChild(container)
                    }
                })
            }
        })

        app.mount(container)

        return "正在打开嫌疑人名单..."
    }
}


export const level17Commands: { [key: string]: Command } = {
    voiceprint: voiceprintCommand,
    fingerprint: fingerprintCommand,
    suspects: suspectsCommand
};
