import { level17Locales } from '../locales/level17';
import { createLevelConfig } from '../utils/levelHelper';

export const level17 = createLevelConfig(17, level17Locales, {
  requiredTasks: ["match_fingerprints", "match_voice"],
  fileSystem: {
    "~": ["readme.txt", "audio", "fingerprints", "analysis.txt", "tools"],
    "~/tools": ["voiceprint.exe", "fingerprint.exe", "suspects.exe"],
    "~/audio": ["suspicious.wav", "samples"],
    "~/audio/samples": ["sample_1.wav", "sample_2.wav", "sample_3.wav", "sample_4.wav"],
    "~/fingerprints": ["scene.fpt", "keyboard.fpt", "door.fpt", "samples"],
    "~/fingerprints/samples": ["sample_1.fpt", "sample_2.fpt", "sample_3.fpt", "sample_4.fpt"]
  }
}); 