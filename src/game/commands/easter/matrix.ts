import type { Command } from '@/types/terminal';
import { useTerminalStore } from '@/stores/terminal';
import { createApp, h } from 'vue';
import MatrixEffect from '@/components/easter/MatrixEffect.vue';

// Matrix 效果命令
export const matrixCommand: Command = {
    name: "matrix",
    description: "??????????",
    execute: async (args: string[]) => {
        const store = useTerminalStore();
        
        // 解析持续时间参数（秒）
        let duration = 20;  // 默认20秒
        if (args.length > 0) {
            const requestedDuration = parseInt(args[0]);
            if (!isNaN(requestedDuration) && requestedDuration > 0) {
                duration = Math.min(Math.max(requestedDuration, 5), 300);  // 限制在5-300秒之间
            }
        }

        // 逐行显示文字
        const messages = [
            "[系统] 正在进入矩阵...",
            "[系统] Wake up, Neo...",
            "[系统] The Matrix has you...",
            "[系统] Follow the white rabbit...",
            "[系统] Knock, knock, Neo...",
            `\nMatrix效果将持续 ${duration} 秒...`
        ];

        // 使用 Promise 逐行显示文字
        for (const message of messages) {
            store.addLine("output", message);
            await new Promise(resolve => setTimeout(resolve, 800));
        }

        // 等待最后一行显示完毕后再创建 Matrix 效果
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // 创建并挂载 Matrix 效果
        const matrixContainer = document.createElement('div');
        document.body.appendChild(matrixContainer);
        const matrixApp = createApp({
            render: () => h(MatrixEffect)
        });
        
        // 挂载组件并获取实例
        const matrixInstance = matrixApp.mount(matrixContainer) as any;
        
        // 启动动画
        if (matrixInstance && typeof matrixInstance.startAnimation === 'function') {
            matrixInstance.startAnimation();
        }

        // 指定时间后自动清理
        setTimeout(() => {
            if (matrixInstance && typeof matrixInstance.stopAnimation === 'function') {
                matrixInstance.stopAnimation();
            }
            setTimeout(() => {
                matrixApp.unmount();
                document.body.removeChild(matrixContainer);
            }, 500);
        }, duration * 1000);

        return "";
    }
}; 