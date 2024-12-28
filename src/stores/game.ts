import {defineStore} from "pinia";
import {useTerminalStore} from "./terminal";
import {getCurrentLevelData} from "@/game/levels";

interface GameState {
    gameStarted: boolean;
    currentLevel: number;
    currentDirectory: string;
    inventory: string[];
    completedTasks: string[];
}

export const useGameStore = defineStore("game", {
    state: (): GameState => ({
        gameStarted: false,
        currentLevel: 1,
        currentDirectory: "~",
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
            this.currentDirectory = "~";
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
            this.currentDirectory = "~";
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
            this.currentDirectory = "~";
            this.loadLevel(this.currentLevel);
        },

        markSecretFound() {
            if (!this.completedTasks.includes("find_secret")) {
                this.completedTasks.push("find_secret");
            }
        },

        exitGame() {
            this.gameStarted = false;
            this.currentLevel = 1;
            this.completedTasks = [];
            this.currentDirectory = "~";
            this.inventory = [];
        },

        setLevel(level: number) {
            this.currentLevel = level;
            this.currentDirectory = "~";
            this.completedTasks = [];
        },
    },

    getters: {
        isLevelComplete: (state) => {
            return state.gameStarted && state.currentLevel > 0;
        },
        currentLevelData: (state) => {
            return getCurrentLevelData(state.currentLevel);
        },
    },
});


interface Suspect {
    id: string
    name: string
    type: "voiceprint" | "fingerprint"
    matchScore: number
    audioFile?: string
    fingerprintFile?: string
}

export const useSuspectsStore = defineStore("suspects", {
    state: () => ({
        suspects: [] as Suspect[]
    }),

    actions: {
        addSuspect(suspect: Suspect) {
            // 检查是否已存在
            const exists = this.suspects.find(s =>
                s.name === suspect.name && s.type === suspect.type
            )
            if (!exists) {
                this.suspects.push(suspect)
            }
        },

        removeSuspect(name: string, type: "voiceprint" | "fingerprint") {
            const index = this.suspects.findIndex(s =>
                s.name === name && s.type === type
            )
            if (index > -1) {
                this.suspects.splice(index, 1)
            }
        },

        clearSuspects() {
            this.suspects = []
        }
    },

    getters: {
        getSuspectsByType: (state) => {
            return (type: "voiceprint" | "fingerprint") =>
                state.suspects.filter(s => s.type === type)
        },

        getOverlappingSuspects: (state) => {
            const names = new Set()
            const overlapping = new Set()

            state.suspects.forEach(suspect => {
                if (names.has(suspect.name)) {
                    overlapping.add(suspect.name)
                }
                names.add(suspect.name)
            })

            return Array.from(overlapping)
        }
    }
})