export interface GameSave {
  timestamp: number;
  currentLevel: number;
  currentDirectory: string;
  inventory: string[];
  completedTasks: string[];
  commandHistory: string[];
}

export interface SaveSlot {
  id: number;
  name: string;
  save: GameSave;
} 