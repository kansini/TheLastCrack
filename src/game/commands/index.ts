import type {Command} from "@/types/terminal";

type ModuleType = { [key: string]: { [key: string]: Command } };

// 使用 Vite 的 import.meta.glob 动态导入功能
const commandModules = import.meta.glob<ModuleType>([
  './basic.ts',
  './filesystem.ts',
  './save.ts',
  './easter.ts',
  './level/*.ts'
], { eager: true });

export const commands: { [key: string]: Command } = Object.values(commandModules).reduce<{ [key: string]: Command }>((acc, module) => {
  const moduleCommands = Object.values(module)[0];

  if (moduleCommands && typeof moduleCommands === 'object') {
    return {
      ...acc,
      ...moduleCommands
    };
  }
  return acc;
}, {});
