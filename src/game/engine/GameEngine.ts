import type { Command } from '@/types/terminal';
import { useGameStore } from '@/stores/game';
import { useLanguageStore } from '@/stores/language';

export class GameEngine {
  private commands: Map<string, Command> = new Map();
  
  registerCommand(command: Command) {
    this.commands.set(command.name, command);
  }
  
  async executeCommand(commandLine: string): Promise<string> {
    const [commandName, ...args] = commandLine.trim().split(/\s+/);
    const command = this.commands.get(commandName);
    
    const languageStore = useLanguageStore();
    const t = languageStore.t;
    
    if (!command) {
      return `${t('commandNotFound')}: ${commandName}`;
    }

    try {
      // 获取游戏状态
      const gameStore = useGameStore();
      const currentLevel = gameStore.currentLevel;

      // 检查命令是否可用
      const output = await command.execute(args);
      if (output === `ps: ${t('invalidCommand')}` || 
          output === `kill: ${t('invalidCommand')}` || 
          output === `top: ${t('invalidCommand')}`) {
        // 如果是第4关，这些命令应该可用
        if (currentLevel === 4) {
          return await command.execute(args);
        }
      }
      return output;
    } catch (error) {
      return `${t('commandError')}: ${error}`;
    }
  }
}

export const gameEngine = new GameEngine(); 