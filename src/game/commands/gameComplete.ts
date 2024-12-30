import { useTerminalStore } from "@/stores/terminal";
import { useGameStore } from "@/stores/game";
import { createApp, h } from 'vue';
import ConfettiEffect from '@/components/easter/ConfettiEffect.vue';

// 打字机效果
const typewriterEffect = async (terminalStore: any, text: string, delay: number = 50) => {
    let currentText = '';
    for (const char of text) {
        currentText += char;
        terminalStore.history[terminalStore.history.length - 1] = {
            type: 'output',
            content: currentText,
            timestamp: Date.now(),
            directory: terminalStore.currentDirectory
        };
        await new Promise(resolve => setTimeout(resolve, delay));
    }
};

// 闪烁文字效果
const flashText = async (terminalStore: any, text: string, times: number = 3) => {
    const spaces = " ".repeat(text.length);
    for (let i = 0; i < times; i++) {
        terminalStore.addLine('output', text);
        await new Promise(resolve => setTimeout(resolve, 300));
        terminalStore.history[terminalStore.history.length - 1] = {
            type: 'output',
            content: spaces,
            timestamp: Date.now(),
            directory: terminalStore.currentDirectory
        };
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    terminalStore.addLine('output', text);
};

// 等待用户输入
const waitForInput = async (terminalStore: any): Promise<string> => {
    return new Promise((resolve) => {
        // 清除输入框并聚焦
        const inputElement = document.querySelector('.terminal-input') as HTMLInputElement;
        if (inputElement) {
            inputElement.value = '';
            inputElement.focus();
        }

        const originalAddLine = terminalStore.addLine;
        terminalStore.addLine = (type: string, content: string) => {
            originalAddLine.call(terminalStore, type, content);
            if (type === 'input') {
                // 恢复原始的 addLine 函数
                terminalStore.addLine = originalAddLine;
                // 再次清除输入框
                if (inputElement) {
                    inputElement.value = '';
                }
                resolve(content.trim().toUpperCase());
            }
        };
    });
};

export const showGameComplete = async () => {
    const terminalStore = useTerminalStore();
    const gameStore = useGameStore();
    
    // 清屏
    terminalStore.clearHistory();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 创建并挂载彩带效果
    const confettiContainer = document.createElement('div');
    document.body.appendChild(confettiContainer);
    const confettiApp = createApp({
        render: () => h(ConfettiEffect)
    });
    
    // 挂载组件并获取实例
    const confettiInstance = confettiApp.mount(confettiContainer) as any;
    
    // 确保组件已经挂载
    await new Promise(resolve => setTimeout(resolve, 100));

    // 可以通过实例访问组件的方法（如果需要的话）
    if (confettiInstance && typeof confettiInstance.startAnimation === 'function') {
        confettiInstance.startAnimation();
    }

    // ASCII 艺术标题
    const title = [
        "    ____                            __      __  _           _ ",
        "   / ___| __ _ _ __ ___   ___      \\ \\    / / (_) _ __   | |",
        "  | |    / _` | '_ ` _ \\ / _ \\      \\ \\/\\/ /  | || '_ \\  | |",
        "  | |___| (_| | | | | | |  __/       \\    /   | || | | | |_|",
        "   \\____|\\__,_|_| |_| |_|\\___|        \\/\\/    |_||_| |_| (_)"
    ];

    // 闪烁显示标题
    for (const line of title) {
        terminalStore.addLine('output', line);
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 闪烁显示祝贺文字
    await new Promise(resolve => setTimeout(resolve, 500));
    await flashText(terminalStore, "  ★ ★ ★ ★ ★ 恭喜你通关了 The Last Crack! ★ ★ ★ ★ ★");

    // 打字机效果显示成就
    terminalStore.addLine('output', "");
    await typewriterEffect(terminalStore, "     你成功完成了所有关卡，成为了一名真正的黑客高手！");
    
    // 制作人员名单
    const credits = [
        "",
        "     制作人员名单：",
        "     - 游戏设计：Old Flood",
        "     - 关卡设计：Old Flood",
        "     - 程序开发：Old Flood",
        "     - 特别感谢：所有测试玩家",
        ""
    ];

    await new Promise(resolve => setTimeout(resolve, 1000));
    for (const line of credits) {
        terminalStore.addLine('output', line);
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    // 最终动画效果
    const finalStars = "★ ".repeat(20);
    for (let i = 0; i < 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        terminalStore.addLine('output', finalStars);
    }

    // 最终消息和选择
    await new Promise(resolve => setTimeout(resolve, 1000));
    terminalStore.addLine('output', '');  // 添加一个空行
    await typewriterEffect(terminalStore, "是否重新开始游戏？(Y/N): ");
    
    // 等待用户输入
    let response = await waitForInput(terminalStore);
    
    // 验证输入，只接受 Y 或 N
    while (response !== 'Y' && response !== 'N') {
        await typewriterEffect(terminalStore, "请输入 Y 或 N: ");
        response = await waitForInput(terminalStore);
    }
    
    // 清理彩带效果
    if (confettiInstance && typeof confettiInstance.stopAnimation === 'function') {
        confettiInstance.stopAnimation();
    }
    confettiApp.unmount();
    document.body.removeChild(confettiContainer);

    // 处理用户选择
    if (response === 'Y') {
        gameStore.startNewGame();
        terminalStore.clearHistory();
        return `欢迎回到第一关！

输入 help 查看可用命令`;
    } else {
        return "感谢游玩！期待与你的下次相遇！";
    }
}; 