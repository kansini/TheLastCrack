export interface LevelData {
  id: number;
  title: string;
  description: string;
  objectives: string[];
  requiredTasks: string[];
  fileSystem: Record<string, string[]>;
  fileContents: Record<string, string>;
  hints: string[];
} 