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
    name: "ascii",
    description: "??????????",
    execute: () => {
        return `
   _____          _____   _____ ______ _____  
  / ____|   /\\   |  __ \\ / ____|  ____|  __ \\ 
 | |       /  \\  | |__) | (___ | |__  | |  | |
 | |      / /\\ \\ |  ___/ \\___ \\|  __| | |  | |
 | |____ / ____ \\| |     ____) | |____| |__| |
  \\_____/_/    \\_\\_|    |_____/|______|_____/ 
                                              
[CASPER] The friendly ghost in your terminal...`;
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
    description: "??????????",
    execute: () => {
        const store = useTerminalStore();
        
        // 添加初始警告
        store.addLine("output", "[系统] 正在初始化自毁程序...", "countdown-init");
        
        setTimeout(() => {
            store.addLine("output", "[警告] 系统将在以下时间后自毁：\n", "countdown-warning");
        }, 1000);

        // 倒计时动画
        let count = 10;
        const countdownInterval = setInterval(() => {
            if (count > 0) {
                store.addLine("output", `${count}...`, `countdown-${count}`);
                count--;
            } else {
                clearInterval(countdownInterval);
                
                setTimeout(() => {
                    store.addLine("output", "\n[警告] 自毁程序已启动！", "countdown-final-warning");
                }, 500);

                setTimeout(() => {
                    store.addLine("output", "[系统] 检测到紧急中止指令...", "countdown-abort");
                }, 2000);

                setTimeout(() => {
                    store.addLine("output", "[系统] 自毁程序已取消！", "countdown-cancel");
                }, 3000);

                setTimeout(() => {
                    store.addLine("output", "[系统] 开个玩笑 😄\n[系统] 你的终端很安全...", "countdown-safe");
                }, 4000);
            }
        }, 1000);

        return "";
    }
}; 