import { defineStore } from 'pinia';
import { useTerminalStore } from './terminal';
import { getCurrentLevelData } from '@/game/levels';

interface GameState {
  gameStarted: boolean;
  currentLevel: number;
  currentDirectory: string;
  inventory: string[];
  completedTasks: string[];
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    gameStarted: false,
    currentLevel: 1,
    currentDirectory: '~',
    inventory: [],
    completedTasks: []
  }),

  actions: {
    setCurrentDirectory(path: string) {
      this.currentDirectory = path;
      const terminalStore = useTerminalStore();
      terminalStore.setCurrentDirectory(path);
    },

    startNewGame() {
      this.gameStarted = true;
      this.currentLevel = 1;
      this.completedTasks = [];
      this.currentDirectory = '~';
      this.inventory = [];
      this.loadLevel(1);
    },

    loadSavedGame(saveData: GameState) {
      this.gameStarted = true;
      this.currentLevel = saveData.currentLevel;
      this.completedTasks = saveData.completedTasks;
      this.currentDirectory = saveData.currentDirectory;
      this.inventory = saveData.inventory;
      this.loadLevel(saveData.currentLevel);
    },
    
    loadLevel(level: number) {
      getCurrentLevelData(level);
      this.currentLevel = level;
      this.currentDirectory = '~';
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
    
    exitGame() {
      this.gameStarted = false;
      this.currentLevel = 1;
      this.completedTasks = [];
      this.currentDirectory = '~';
      this.inventory = [];
    },
  },
  
  getters: {
    isLevelComplete: (state) => {
      const levelData = getCurrentLevelData(state.currentLevel);
      return levelData.requiredTasks.every(task => 
        state.completedTasks.includes(task)
      );
    },
    currentLevelData: (state) => {
      return getCurrentLevelData(state.currentLevel);
    },
  },
}); 