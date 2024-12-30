import type { Command } from "@/types/terminal";
import { useTerminalStore } from "@/stores/terminal";
import { useLanguageStore } from "@/stores/language";
import { matrixLocales } from "../locales/matrix";

export const matrixCommand: Command = {
    name: "matrix",
    description: "启动黑客帝国特效",
    execute: () => {
        const terminalStore = useTerminalStore();
        const { currentLanguage } = useLanguageStore();
        const t = matrixLocales[currentLanguage];

        try {
            // 创建 canvas 元素
            const canvas = document.createElement('canvas');
            canvas.id = 'matrix-effect';
            canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                background: black;
                opacity: 0.9;
            `;
            document.body.appendChild(canvas);

            // 设置 canvas 大小
            const resizeCanvas = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            // 获取绘图上下文
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('无法获取 canvas 上下文');

            // 设置字符大小和列数
            const fontSize = 14;
            const columns = Math.floor(canvas.width / fontSize);
            const drops: number[] = new Array(columns).fill(1);

            // 绘制函数
            function draw() {
                if (!ctx) return;
                
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#0F0';
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < drops.length; i++) {
                    // 随机选择字符类型
                    const charType = Math.random();
                    let text;
                    
                    if (charType < 0.4) {
                        // 40% 概率显示 0 或 1
                        text = Math.random() > 0.5 ? '0' : '1';
                    } else if (charType < 0.7) {
                        // 30% 概率显示字母
                        text = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                    } else {
                        // 30% 概率显示中文字符
                        text = String.fromCharCode(0x4e00 + Math.floor(Math.random() * 0x9fff - 0x4e00));
                    }

                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            }

            // 开始动画
            const animationId = setInterval(draw, 33);

            // 添加点击事件监听器来停止动画
            const stopMatrix = () => {
                clearInterval(animationId);
                canvas.remove();
                window.removeEventListener('resize', resizeCanvas);
                terminalStore.addLine('output', t.stopText);
            };
            canvas.addEventListener('click', stopMatrix);

            terminalStore.addLine('output', t.startText);
        } catch (error) {
            terminalStore.addLine('output', t.errorText + error);
        }

        return '';
    }
}; 