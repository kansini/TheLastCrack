import type {Command} from "@/types/terminal";
import {useTerminalStore} from "@/stores/terminal";
import {useLanguageStore} from "@/stores/language";
import {countdownLocales} from "../locales/countdown";

export const countdownCommand: Command = {
    name: "countdown",
    description: "启动倒计时序列",
    execute: () => {
        const terminalStore = useTerminalStore();
        const {currentLanguage} = useLanguageStore();
        const t = countdownLocales[currentLanguage];

        // 禁用鼠标和键盘
        const disableInteraction = () => {
            const style = document.createElement("style");
            style.id = "countdown-style";
            style.innerHTML = `
                * {
                    cursor: none !important;
                    user-select: none !important;
                    pointer-events: none !important;
                }
                body::before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 0, 0, 0.1);
                    z-index: 9999;
                    animation: pulse 1s infinite;
                }
                @keyframes pulse {
                    0% { background: rgba(255, 0, 0, 0.1); }
                    50% { background: rgba(255, 0, 0, 0.2); }
                    100% { background: rgba(255, 0, 0, 0.1); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .terminal {
                    animation: shake 0.5s infinite;
                }
            `;
            document.head.appendChild(style);
        };

        // 启用鼠标和键盘
        const enableInteraction = () => {
            const style = document.getElementById("countdown-style");
            if (style) {
                style.remove();
            }
        };

        // 阻止刷新和关闭页面
        const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            return "";
        };
        window.addEventListener("beforeunload", beforeUnloadHandler);

        // 警告音效
        const playWarningSound = () => {
            try {
                const settings = JSON.parse(localStorage.getItem('terminalSettings') || '{}');
                if (!settings.soundEnabled) return null;

                const audio = new Audio();
                audio.src = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgA";
                audio.loop = true;
                audio.volume = settings.soundVolume ?? 0.3;
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Audio playback failed:", error);
                    });
                }
                return audio;
            } catch (error) {
                console.log("Failed to create audio:", error);
                return null;
            }
        };

        let count = 10;
        const warningSound = playWarningSound();

        // 添加红色闪烁效果
        disableInteraction();

        const updateDisplay = () => {
            const display = `
${t.warningTitle}
================================

         ${t.countdownText.replace('%s', count.toString())}

================================
${count <= 5 ? "\n" + t.warningText : ""}
${count <= 3 ? "\n" + t.criticalText : ""}
${count <= 2 ? "\n" + t.dataText : ""}
`;
            terminalStore.clearHistory();
            terminalStore.addLine("output", display, "countdown-warning");
        };

        const interval = setInterval(() => {
            count--;
            updateDisplay();

            if (count <= 0) {
                clearInterval(interval);
                if (warningSound) warningSound.pause();
                enableInteraction();
                window.removeEventListener("beforeunload", beforeUnloadHandler);

                // 恢复正常显示
                setTimeout(() => {
                    terminalStore.clearHistory();
                    terminalStore.addLine("output", t.completedText, "countdown-complete");
                }, 1000);
            }
        }, 1000);

        updateDisplay();
        return "";
    }
};