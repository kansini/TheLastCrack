import type { Command } from '@/types/terminal';

export class GameEngine {
  private commands: Map<string, Command> = new Map();
  
  registerCommand(command: Command) {
    this.commands.set(command.name, command);
  }
  
  async executeCommand(commandLine: string): Promise<string> {
    const [commandName, ...args] = commandLine.trim().split(/\s+/);
    const command = this.commands.get(commandName);
    
    if (!command) {
      return `Command not found: ${commandName}`;
    }
    
    try {
      return await command.execute(args);
    } catch (error) {
      return `Error executing command: ${error}`;
    }
  }
}

export const gameEngine = new GameEngine(); 