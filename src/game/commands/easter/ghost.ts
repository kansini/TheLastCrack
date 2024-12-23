import type { Command } from '@/types/terminal';
import { useTerminalStore } from '@/stores/terminal';

// ASCII 艺术
export const ghostCommand: Command = {
    name: "ghost",
    description: "??????????",
    execute: () => {
        const store = useTerminalStore();
        const ghost = `
     .-.
   .'   \`.
   :g g   :
   : o    \`.
  :         \`\`.
 :             \`.
:  :         .   \`.
:   :          \`\`. \`.
 \`\`. \`       .   \`. \`.
    \`.        \`\`\`  \`. \`.
      \`\`--..          \`. \`.
            \`\`--..      \`. \`.
                  \`\`--.   \`. \`
                       \`\`-.\`. :
                           \`:.:

[GHOST] Boo!`;
        store.addLine("output", ghost);
        return "";
    }
}; 