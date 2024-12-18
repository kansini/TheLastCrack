import { defineStore } from 'pinia';
import { useGameStore } from './game';

interface SaveData {
  id: number;
  name: string;
  save: {
    timestamp: number;
    currentLevel: number;
    completedTasks: string[];
    currentDirectory: string;
    inventory: string[];
  };
}

export const useSaveStore = defineStore('save', {
  state: () => ({
    saves: [] as SaveData[],
    nextId: 1
  }),

  actions: {
    createSave(name: string) {
      const gameStore = useGameStore();
      const save: SaveData = {
        id: this.nextId++,
        name,
        save: {
          timestamp: Date.now(),
          currentLevel: gameStore.currentLevel,
          completedTasks: [...gameStore.completedTasks],
          currentDirectory: gameStore.currentDirectory,
          inventory: [...gameStore.inventory]
        }
      };

      this.saves.push(save);
      this.savesToStorage();
      return save.id;
    },

    loadSave(id: number) {
      const save = this.saves.find(s => s.id === id);
      if (!save) return false;
      return true;
    },

    getSaveData(id: number) {
      const save = this.saves.find(s => s.id === id);
      if (!save) return null;
      return save.save;
    },

    deleteSave(id: number) {
      const index = this.saves.findIndex(s => s.id === id);
      if (index !== -1) {
        this.saves.splice(index, 1);
        this.savesToStorage();
      }
    },

    getSaves() {
      return this.saves;
    },

    savesToStorage() {
      try {
        localStorage.setItem('hacker_game_saves', JSON.stringify({
          saves: this.saves,
          nextId: this.nextId
        }));
      } catch (error) {
        console.error('Failed to save to storage:', error);
      }
    },

    loadSavesFromStorage() {
      try {
        const data = localStorage.getItem('hacker_game_saves');
        if (data) {
          const parsed = JSON.parse(data);
          this.saves = parsed.saves;
          this.nextId = parsed.nextId;
        }
      } catch (error) {
        console.error('Failed to load saves:', error);
      }
    }
  }
}); 