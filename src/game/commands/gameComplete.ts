import { useTerminalStore } from "@/stores/terminal";
import { useGameStore } from "@/stores/game";
import { useLanguageStore } from "@/stores/language";
import { gameCompleteLocales } from "./locales/gameComplete";
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
    const { currentLanguage } = useLanguageStore();
    const t = gameCompleteLocales[currentLanguage];
    
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
    for (const line of t.title) {
        terminalStore.addLine('output', line);
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 闪烁显示祝贺文字
    await new Promise(resolve => setTimeout(resolve, 500));
    await flashText(terminalStore, t.congratulations);

    // 打字机效果显示成就
    terminalStore.addLine('output', "");
    await typewriterEffect(terminalStore, t.achievement);
    
    // 制作人员名单
    await new Promise(resolve => setTimeout(resolve, 1000));
    for (const line of t.credits) {
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
    terminalStore.addLine('output', '');
    await typewriterEffect(terminalStore, t.restart);
    
    // 等待用户输入
    let response = await waitForInput(terminalStore);
    
    // 验证输入，只接受 Y 或 N
    while (response !== 'Y' && response !== 'N') {
        await typewriterEffect(terminalStore, t.invalidInput);
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
        return t.welcome;
    } else {
        return t.thanks;
    }
}; 