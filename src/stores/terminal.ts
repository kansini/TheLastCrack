import { defineStore } from 'pinia';
import type { TerminalState, TerminalLine } from '@/types/terminal';

export const useTerminalStore = defineStore('terminal', {
  state: (): TerminalState => ({
    history: [],
    currentDirectory: '~',
    currentLevel: 1,
    commandHistory: [],
  }),
  
  actions: {
    addLine(type: 'input' | 'output', content: string, directory?: string) {
      this.history.push({
        type,
        content,
        timestamp: Date.now(),
        directory
      });

      if (type === 'input') {
        this.commandHistory.push(content);
      }
    },
    
    clearHistory() {
      this.history = [];
    },
    
    setCurrentDirectory(path: string) {
      this.currentDirectory = path;
    },
    
    setCurrentLevel(level: number) {
      this.currentLevel = level;
    },

    setCommandHistory(history: string[]) {
      this.commandHistory = [...history];
    }
  },
}); 