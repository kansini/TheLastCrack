import { defineStore } from 'pinia';
import type { GameSave, SaveSlot } from '@/types/save';
import { useGameStore } from './game';
import { useTerminalStore } from './terminal';

const SAVE_KEY = 'hacker_game_saves';
const MAX_SAVES = 5;

interface SaveState {
  saves: SaveSlot[];
  nextId: number;
}

export const useSaveStore = defineStore('save', {
  state: (): SaveState => ({
    saves: [],
    nextId: 1
  }),

  actions: {
    loadSavesFromStorage() {
      try {
        const savedData = localStorage.getItem(SAVE_KEY);
        if (savedData) {
          const data = JSON.parse(savedData);
          // 验证数据格式
          if (data && typeof data === 'object') {
            this.saves = Array.isArray(data.saves) ? data.saves : [];
            this.nextId = typeof data.nextId === 'number' ? data.nextId : 1;
          } else {
            // 如果数据格式不正确，重置状态
            this.saves = [];
            this.nextId = 1;
          }
        }
      } catch (error) {
        console.error('Failed to load saves:', error);
        // 出错时重置状态
        this.saves = [];
        this.nextId = 1;
      }
    },

    savesToStorage() {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify({
          saves: this.saves,
          nextId: this.nextId
        }));
      } catch (error) {
        console.error('Failed to save:', error);
      }
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

      const id = this.nextId++;
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

      try {
        // 恢复游戏状态
        gameStore.currentLevel = saveData.save.currentLevel;
        gameStore.currentDirectory = saveData.save.currentDirectory;
        gameStore.inventory = Array.isArray(saveData.save.inventory) ? [...saveData.save.inventory] : [];
        gameStore.completedTasks = Array.isArray(saveData.save.completedTasks) ? [...saveData.save.completedTasks] : [];
        
        // 确保 commandHistory 存在且是数组
        if (Array.isArray(saveData.save.commandHistory)) {
          terminalStore.setCommandHistory([...saveData.save.commandHistory]);
        } else {
          terminalStore.setCommandHistory([]);
        }

        // 清除当前终端历史
        terminalStore.clearHistory();
        
        return true;
      } catch (error) {
        console.error('Failed to load save:', error);
        return false;
      }
    },

    deleteSave(id: number) {
      const index = this.saves.findIndex(s => s.id === id);
      if (index !== -1) {
        this.saves.splice(index, 1);
        this.savesToStorage();
      }
    },

    getSaves(): SaveSlot[] {
      try {
        // 确保 saves 是数组
        const validSaves = Array.isArray(this.saves) ? this.saves : [];
        // 按 ID 降序排序，使最新的存档显示在前面
        return [...validSaves]
          .sort((a, b) => b.id - a.id)
          .map(save => ({
            ...save,
            name: `${save.name} (Level ${save.save.currentLevel})`
          }));
      } catch (error) {
        console.error('Failed to get saves:', error);
        return [];
      }
    }
  }
}); 