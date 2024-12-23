import type { Command } from '@/types/terminal';
import { useTerminalStore } from '@/stores/terminal';

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