import { createLevelConfig } from '../utils/levelHelper';
import { level19Locales } from "../locales/level19";

export const level19 = createLevelConfig(19, level19Locales, {
   requiredTasks: ["analyze_file", "decode_manuscript", "find_connection"],
   fileSystem: {
    "~": ['note.txt','.secret-file.jpg','manuscript.jpg']
    }
});
