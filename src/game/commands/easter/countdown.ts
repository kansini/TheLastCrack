import type {Command} from "@/types/terminal";
import {useTerminalStore} from "@/stores/terminal";

export const countdownCommand: Command = {
    name: "countdown",
    description: "启动倒计时序列",
    execute: () => {
        const terminalStore = useTerminalStore();

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
            e.returnValue = "";
            return "";
        };
        window.addEventListener("beforeunload", beforeUnloadHandler);

        // 警告音效
        const playWarningSound = () => {
            try {
                const audio = new Audio();
                // 使用更简单的警告音效
                audio.src = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgA";
                audio.loop = true;
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Audio playback failed:", error);
                    });
                }
                return audio;
            } catch (error) {
                console.log("Failed to create audio:", error);
                return {
                    pause: () => {
                    } // 提供一个空的 pause 方法
                };
            }
        };

        let count = 10;
        const warningSound = playWarningSound();

        // 添加红色闪烁效果
        disableInteraction();

        const updateDisplay = () => {
            const display = `
⚠️ 💣💥 警告：系统即将自毁 💥💣 ⚠️
================================

         倒计时: ${count} 秒

================================
${count <= 5 ? "\n⚠️  💣💥警告：无法中止自毁程序💥💣  ⚠️" : ""}
${count <= 3 ? "\n⚠️  💣💥警告：系统关键模块已锁定💥💣  ⚠️" : ""}
${count <= 2 ? "\n⚠️  💣💥警告：正在清除所有数据💥💣  ⚠️" : ""}
`;
            terminalStore.clearHistory();
            terminalStore.addLine("output", display, "countdown-warning");
        };

        const interval = setInterval(() => {
            count--;
            updateDisplay();

            if (count <= 0) {
                clearInterval(interval);
                warningSound.pause();
                enableInteraction();
                window.removeEventListener("beforeunload", beforeUnloadHandler);

                // 恢复正常显示
                setTimeout(() => {
                    terminalStore.clearHistory();
                    terminalStore.addLine("output", `
自毁程序已中止 
系统恢复正常! 🎉😊🎉😊🎉😊
`, "countdown-complete");
                }, 1000);
            }
        }, 1000);

        updateDisplay();
        return "";
    }
};