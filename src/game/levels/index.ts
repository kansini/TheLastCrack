import type { LevelData } from '@/types/game';
import { levelConfigs } from './levelConfigs';

export const getCurrentLevelData = (level: number): LevelData => {
  const levelData = levelConfigs[level];
  if (!levelData) {
    throw new Error(`关卡 ${level} 不存在`);
  }
  return levelData;
}; 