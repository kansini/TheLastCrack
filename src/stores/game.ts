import { defineStore } from 'pinia';
import { getCurrentLevelData } from '@/game/levels';

interface GameState {
  currentLevel: number;
  currentDirectory: string;
  inventory: string[];
  completedTasks: string[];
  gameStarted: boolean;
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    currentLevel: 1,
    currentDirectory: '~',
    inventory: [],
    completedTasks: [],
    gameStarted: false,
  }),
  
  actions: {
    startGame() {
      this.gameStarted = true;
      this.currentLevel = 1;
      this.loadLevel(1);
    },
    
    loadLevel(level: number) {
      const levelData = getCurrentLevelData(level);
      this.currentLevel = level;
      this.currentDirectory = '~';
      this.completedTasks = [];
    },
    
    completeTask(taskId: string) {
      if (!this.completedTasks.includes(taskId)) {
        this.completedTasks.push(taskId);
      }
    },
    
    addToInventory(item: string) {
      if (!this.inventory.includes(item)) {
        this.inventory.push(item);
      }
    },
    
    completeLevel() {
      const levelCompleted = `level_${this.currentLevel}_completed`;
      this.completedTasks.push(levelCompleted);
      
      this.currentLevel += 1;
      this.currentDirectory = '~';
      this.loadLevel(this.currentLevel);
    },
    
    markSecretFound() {
      if (!this.completedTasks.includes('find_secret')) {
        this.completedTasks.push('find_secret');
      }
    },

    setCurrentDirectory(path: string) {
      this.currentDirectory = path;
    }
  },
  
  getters: {
    isLevelComplete: (state) => {
      const levelData = getCurrentLevelData(state.currentLevel);
      return levelData.requiredTasks.every(task => 
        state.completedTasks.includes(task)
      );
    },
  },
}); 