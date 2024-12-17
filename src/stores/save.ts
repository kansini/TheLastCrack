import { defineStore } from 'pinia';
import type { GameSave, SaveSlot } from '@/types/save';
import { useGameStore } from './game';
import { useTerminalStore } from './terminal';

const SAVE_KEY = 'hacker_game_saves';
const MAX_SAVES = 5;

interface SaveState {
  saves: SaveSlot[];
}

export const useSaveStore = defineStore('save', {
  state: (): SaveState => ({
    saves: []
  }),

  actions: {
    loadSavesFromStorage() {
      const savedData = localStorage.getItem(SAVE_KEY);
      if (savedData) {
        this.saves = JSON.parse(savedData);
      }
    },

    savesToStorage() {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.saves));
    },

    createSave(name: string): number {
      const gameStore = useGameStore();
      const terminalStore = useTerminalStore();

      const save: GameSave = {
        timestamp: Date.now(),
        currentLevel: gameStore.currentLevel,
        currentDirectory: gameStore.currentDirectory,
        inventory: [...gameStore.inventory],
        completedTasks: [...gameStore.completedTasks],
        commandHistory: terminalStore.commandHistory
      };

      const id = this.saves.length + 1;
      this.saves.push({ id, name, save });
      
      // 保持最大存档数量
      if (this.saves.length > MAX_SAVES) {
        this.saves.shift();
      }

      this.savesToStorage();
      return id;
    },

    loadSave(id: number): boolean {
      const saveData = this.saves.find(s => s.id === id);
      if (!saveData) return false;

      const gameStore = useGameStore();
      const terminalStore = useTerminalStore();

      // 恢复游戏状态
      gameStore.currentLevel = saveData.save.currentLevel;
      gameStore.currentDirectory = saveData.save.currentDirectory;
      gameStore.inventory = [...saveData.save.inventory];
      gameStore.completedTasks = [...saveData.save.completedTasks];
      
      // 确保 commandHistory 存在且是数组
      if (Array.isArray(saveData.save.commandHistory)) {
        terminalStore.setCommandHistory(saveData.save.commandHistory);
      } else {
        terminalStore.setCommandHistory([]);
      }

      // 清除当前终端历史
      terminalStore.clearHistory();
      
      return true;
    },

    deleteSave(id: number) {
      const index = this.saves.findIndex(s => s.id === id);
      if (index !== -1) {
        this.saves.splice(index, 1);
        this.savesToStorage();
      }
    },

    getSaves(): SaveSlot[] {
      return this.saves.map(save => ({
        ...save,
        name: `${save.name} (Level ${save.save.currentLevel})`
      }));
    }
  }
}); 