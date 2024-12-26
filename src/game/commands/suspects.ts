import { Command } from "@/types/terminal"
import { useGameStore } from "@/stores/game"
import { createApp, h } from "vue"
import SuspectsList from "@/components/SuspectsList.vue"

export const suspectsCommand: Command = {
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