import type {Command} from "@/types/terminal";

// 修改类型定义以匹配实际的模块导出结构
type ModuleType = { 
  [key: string]: { [key: string]: Command };
};

const commandModules = import.meta.glob<ModuleType>([
  './basic.ts',
  './filesystem.ts', 
  './save.ts',
  './easter/*.ts',
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
