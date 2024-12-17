export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => string | Promise<string>;
}

export interface TerminalState {
  history: TerminalLine[];
  currentDirectory: string;
  currentLevel: number;
  commandHistory: string[];
}

export interface TerminalLine {
  type: 'input' | 'output';
  content: string;
  timestamp: number;
  directory?: string;
} 