import type { Command } from '@/types/terminal';
import { useTerminalStore } from '@/stores/terminal';

// Matrix 效果
export const matrixCommand: Command = {
    name: "matrix",
    description: "??????????",
    execute: () => {
        const store = useTerminalStore();
        // 使用中文乱码和数字
        const chars = "龘䨻䘨龘㗊㔺䜌㦲淾䗦0123456789";
        const lines = [];
        const columns = 40;
        const rows = 15;

        // 生成多行数字雨
        for (let i = 0; i < rows; i++) {
            let line = "";
            for (let j = 0; j < columns; j++) {
                // 随机决定是否在这个位置放置字符
                if (Math.random() < 0.3) {  // 降低字符密度
                    line += chars[Math.floor(Math.random() * chars.length)];
                } else {
                    line += "  ";  // 用两个空格代替，让字符更分散
                }
            }
            lines.push(line);
        }

        // 逐行添加，创造动态效果
        let delay = 0;
        lines.forEach((line, index) => {
            setTimeout(() => {
                store.addLine("output", line, `matrix-rain-${index}`);
            }, delay);
            delay += 100;
        });

        // 最后添加 Matrix 风格的消息
        setTimeout(() => {
            store.addLine("output", `\n[系统] 正在进入矩阵...
[系统] 跟随白兔...
[系统] 敲门声，尼奥...`, "matrix-message");
        }, delay);

        return "";
    }
};

// 黑客帝国风格的 hello world
export const helloCommand: Command = {
    name: "hello",
    description: "??????????",
    execute: () => {
        const store = useTerminalStore();
        const message = `
[SYSTEM] Initializing...
[SYSTEM] Connecting to the Matrix...
[SYSTEM] Access granted...

01001000 01000101 01001100 01001100 01001111
01010111 01001111 01010010 01001100 01000100

[DECODED] Hello, World!
[SYSTEM] The Matrix has you...`;
        
        store.addLine("output", message, "hello");
        return "";
    }
};

// ASCII 艺术
export const asciiCommand: Command = {
    name: "ghost",
    description: "??????????",
    execute: () => {
        const store = useTerminalStore();
        store.clearHistory();

        // 将幽灵帧分成多行，以便控制布局
        const ghostLines = [
            "      .-\\\"\\\"\\\"\\\"-.      ",
            "     /  _  _  \\     ",
            "    |  (o)(o)  |    ",
            "    |   (ll)   |    ",
            "     \\   --   /     ",
            "    .-'\\.__.'/-,    ",
            "   /  /\\    /\\  \\   ",
            "   \\ /  \\  /  \\ /   ",
            "    '    \\/    '    ",
            "          ''        "
        ];

        const ghostLines2 = [
            "      .-\\\"\\\"\\\"\\\"-.      ",
            "     /  ^  ^  \\     ",
            "    |  (o)(o)  |    ",
            "    |   (ll)   |    ",
            "     \\   --   /     ",
            "    .-'\\.__.'/-,    ",
            "   /  /\\    /\\  \\   ",
            "   \\ /  \\  /  \\ /   ",
            "    '    \\/    '    ",
            "          ''        "
        ];

        const frames = [ghostLines, ghostLines, ghostLines2, ghostLines2];

        // 创建5个幽灵的状态，初始位置均匀分布
        const ghostCount = 5;
        const spacing = 20; // 增加间距
        const ghosts = Array(ghostCount).fill(null).map((_, index) => ({
            frameIndex: Math.floor(Math.random() * frames.length),
            basePosition: index * spacing,
            offset: 0,
            direction: Math.random() > 0.5 ? 1 : -1,
            speed: 0.2 + Math.random() * 0.3,
        }));

        // 添加 CSS 样式
        const style = document.createElement('style');
        style.id = 'ghost-style';
        style.innerHTML = `
            @keyframes ghostFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .ghost-frame {
                color: #fff;
                text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #4ff;
                animation: ghostFloat 2s ease-in-out infinite;
                position: relative;
                white-space: pre;
            }
        `;
        document.head.appendChild(style);

        // 动画间隔
        const interval = setInterval(() => {
            store.clearHistory();
            
            // 对于每一行，构建包含所有幽灵的输出
            const ghostHeight = frames[0].length;
            for (let row = 0; row < ghostHeight; row++) {
                let line = '';
                ghosts.forEach((ghost) => {
                    // 计算当前位置
                    ghost.offset += ghost.speed * ghost.direction;
                    if (Math.abs(ghost.offset) > 2) {
                        ghost.direction *= -1;
                    }
                    
                    const totalPosition = Math.max(0, Math.floor(ghost.basePosition + ghost.offset));
                    const spaces = " ".repeat(totalPosition);
                    
                    // 添加当前行的幽灵部分
                    line += spaces + frames[ghost.frameIndex][row];
                });
                store.addLine("output", line, `ghost-line-${row}`);
            }
            
            // 更新幽灵帧
            ghosts.forEach(ghost => {
                ghost.frameIndex = (ghost.frameIndex + 1) % frames.length;
            });
            
            // 添加提示信息
            store.addLine("output", "\n👻 The friendly ghosts in your terminal... 👻", "ghost-message");
        }, 100);

        // 30秒后停止动画
        setTimeout(() => {
            clearInterval(interval);
            const style = document.getElementById('ghost-style');
            if (style) {
                style.remove();
            }
        }, 30000);

        return "";
    }
};

// 星球大战风格的滚动字幕
export const starwarsCommand: Command = {
    name: "starwars",
    description: "??????????",
    execute: () => {
        const store = useTerminalStore();
        const message = `
Episode IV: A New Terminal

It is a period of cyber war.
Rebel hackers, striking
from a hidden base, have won
their first victory against
the evil Galactic Empire.

During the battle, Rebel
spies managed to steal secret
plans to the Empire's
ultimate weapon, the DEATH
STAR, an armored space
station with enough power
to destroy an entire planet.

Pursued by the Empire's
sinister agents, Princess
Leia races home aboard her
starship, custodian of the
stolen plans that can save her
people and restore
freedom to the galaxy....`;
        
        store.addLine("output", message, "starwars");
        return "";
    }
};

// 彩虹文字
export const rainbowCommand: Command = {
    name: "rainbow",
    description: "??????????",
    execute: () => {
        const store = useTerminalStore();
        const message = `
🌈 SOMEWHERE OVER THE RAINBOW 🌈
    Where troubles melt like lemon drops
    Way above the chimney tops
    That's where you'll find me...

[RAINBOW] Colors activated in your terminal!`;
        
        store.addLine("output", message, "rainbow");
        return "";
    }
};

// 黑客帝国风格的倒计时
export const countdownCommand: Command = {
    name: "countdown",
    description: "启动倒计时序列",
    execute: () => {
        const terminalStore = useTerminalStore();
        
        // 禁用鼠标和键盘
        const disableInteraction = () => {
            const style = document.createElement('style');
            style.id = 'countdown-style';
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
            const style = document.getElementById('countdown-style');
            if (style) {
                style.remove();
            }
        };

        // 阻止刷新和关闭页面
        const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
            return '';
        };
        window.addEventListener('beforeunload', beforeUnloadHandler);

        // 警告音效
        const playWarningSound = () => {
            try {
                const audio = new Audio();
                // 使用更简单的警告音效
                audio.src = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgA';
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
                    pause: () => {} // 提供一个空的 pause 方法
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
${count <= 5 ? '\n⚠️  💣💥警告：无法中止自毁程序💥💣  ⚠️' : ''}
${count <= 3 ? '\n⚠️  💣💥警告：系统关键模块已锁定💥💣  ⚠️' : ''}
${count <= 2 ? '\n⚠️  💣💥警告：正在清除所有数据💥💣  ⚠️' : ''}
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
                window.removeEventListener('beforeunload', beforeUnloadHandler);
                
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
        return '';
    }
}; 