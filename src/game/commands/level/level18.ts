import {Command} from "@/types/terminal";
import {useGameStore} from "@/stores/game";
import {createApp, h} from "vue";
import {useLanguageStore} from "@/stores/language";
import TrackAnalyzer from "@/components/level18/TrackAnalyzer.vue";
import CCTVViewer from "@/components/level18/CCTVViewer.vue";

const trackCommand: Command = {
    name: "track",
    description: "在地图上追踪和分析逃犯路线",
    execute: () => {
        const gameStore = useGameStore()

        if (gameStore.currentLevel !== 18) {
            return "track: 命令不可用"
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
                return h(TrackAnalyzer, {
                    onClose: () => {
                        app.unmount()
                        document.body.removeChild(container)
                    }
                })
            }
        })

        app.mount(container)
        return "正在打开路线分析器..."
    }
} // level18

const cctvCommand: Command = {
    name: "cctv",
    description: "查看监控录像记录",
    execute: (args: string[]) => {
        const languageStore = useLanguageStore();
        const t = languageStore.t;
        const gameStore = useGameStore();

        if (gameStore.currentLevel !== 18) {
            return `cctv: ${t("invalidCommand")}`;
        }

        if (args.length !== 1) {
            return `${t("invalidUsage")}: cctv <${t("cameraId")}>`;
        }

        const cameraId = args[0];
        if (!["01", "02", "03", "04"].includes(cameraId)) {
            return t("invalidCamera");
        }

        // 创建查看窗口
        const container = document.createElement("div")
        container.style.position = "fixed"
        container.style.top = "50%"
        container.style.left = "50%"
        container.style.transform = "translate(-50%, -50%)"
        container.style.zIndex = "9999"
        document.body.appendChild(container)

        const app = createApp({
            render() {
                return h(CCTVViewer, {
                    cameraId,
                    onClose: () => {
                        app.unmount()
                        document.body.removeChild(container)
                    }
                })
            }
        })

        app.mount(container)
        return `${t("viewingCamera")} ${cameraId}...`
    }
} // level18

export const level18Commands: { [key: string]: Command } = {
    track: trackCommand,
    cctv: cctvCommand
};
