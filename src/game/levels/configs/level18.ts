import { level18Locales } from '../locales/level18';
import { createLevelConfig } from '../utils/levelHelper';

export const level18 = createLevelConfig(18, level18Locales, {
  requiredTasks: ['analyze_cctv', 'track_route', 'find_hideout'],
  fileSystem: {
    "~": [
      "readme.txt",
      "map.jpg", 
      "cctv_logs",
      "traffic_data",
      "analysis"
    ],
    "~/cctv_logs": [
      "camera_01.log",
      "camera_02.log", 
      "camera_03.log",
      "camera_04.log"
    ],
    "~/traffic_data": [
      "subway.log",
      "bus.log",
      "taxi.log"
    ],
    "~/analysis": [
      "locations.txt",
      "timeline.txt"
    ]
  }
}); 