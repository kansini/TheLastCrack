import { defineStore } from 'pinia';

interface TerminalState {
  history: Array<{
    type: 'input' | 'output';
    content: string;
    timestamp: number;
    directory?: string;
  }>;
  currentDirectory: string;
  commandHistory: string[];
}

export const useTerminalStore = defineStore('terminal', {
  state: (): TerminalState => ({
    history: [],
    currentDirectory: '~',
    commandHistory: []
  }),

  actions: {
    setCurrentDirectory(path: string) {
      this.currentDirectory = path;
    },

    addLine(type: 'input' | 'output', content: string, directory?: string) {
      this.history.push({
        type,
        content,
        timestamp: Date.now(),
        directory: directory || this.currentDirectory
      });

      if (type === 'input' && content.trim()) {
        this.commandHistory.push(content);
      }
    },

    clearHistory() {
      this.history = [];
    },

    setCommandHistory(history: string[]) {
      this.commandHistory = [...history];
    }
  }
}); 