import type { Command } from '@/types/terminal';
import { useGameStore } from '@/stores/game';
import { useLanguageStore } from '@/stores/language';

export class GameEngine {
  private commands: Map<string, Command> = new Map();
  private successSound: HTMLAudioElement;

  constructor() {
    // 初始化过关音效
    this.successSound = new Audio(new URL("../../assets/audio/success.mp3", import.meta.url).href);
    this.successSound.volume = 0.3;
  }

  // 添加播放过关音效的方法
  private playSuccessSound() {
    try {
      const settings = JSON.parse(localStorage.getItem('terminalSettings') || '{}');
      const sound = new Audio(this.successSound.src);
      sound.volume = settings.soundVolume ?? 0.3;
      sound.play().catch(err => {
        console.debug('Success sound play prevented:', err);
      });
    } catch (error) {
      console.debug('Error playing success sound:', error);
    }
  }

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
      
      // 如果是 unlock 命令且执行成功，播放过关音效
      if (commandName === 'unlock' && output && output.includes('密码正确')) {
        this.playSuccessSound();
      }
      
      if (output === `ps: ${t('invalidCommand')}` || 
          output === `kill: ${t('invalidCommand')}` || 
          output === `top: ${t('invalidCommand')}`) {
        if (currentLevel === 4) {
          return await command.execute(args);
        }
      }
      return output;
    } catch (error) {
      return `${t('commandError')}: ${error}`;
    }
  }

  // getAvailableCommands(): string[] {
  //   const gameStore = useGameStore();
  //   return Object.keys(getAvailableCommands(gameStore.currentLevel));
  // }
}

export const gameEngine = new GameEngine(); 