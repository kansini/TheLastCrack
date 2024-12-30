import type { Command } from '@/types/terminal';
import { useTerminalStore } from '@/stores/terminal';
import { createApp, h } from 'vue';
import StarWarsEffect from '@/components/easter/StarWarsEffect.vue';

// Star Wars 效果命令
export const starwarsCommand: Command = {
    name: "starwars",
    description: "??????????",
    execute: async () => {
        const store = useTerminalStore();
        
        // 显示初始化消息
        store.addLine("output", `[系统] 很久很久以前，在一个遥远的银河系...`);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        store.addLine("output", `[系统] 准备进入超空间跳跃...`);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        store.addLine("output", `[系统] 愿原力与你同在...`);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 创建并挂载 Star Wars 效果
        const container = document.createElement('div');
        document.body.appendChild(container);
        const app = createApp({
            render: () => h(StarWarsEffect)
        });
        
        // 挂载组件
        app.mount(container);

        // 8秒后自动清理
        await new Promise(resolve => setTimeout(resolve, 8000));
        
        app.unmount();
        document.body.removeChild(container);
        
        store.addLine("output", `[系统] 超空间跳跃结束...`);
        await new Promise(resolve => setTimeout(resolve, 200));
        
        store.addLine("output", `[系统] 愿原力与你同在...`);

        return "";
    }
}; 