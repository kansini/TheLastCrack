import { LevelLocales } from "./index";

export const level18Locales: LevelLocales = {
  zh: {
    title: "追踪逃犯",
    description: "嫌疑人已经逃跑，我们需要分析监控数据和交通记录，在城市地图上追踪他的行踪。",
    objectives: [
      '分析监控录像确定目标位置',
      '查看交通记录寻找移动轨迹',
      '在地图上标记可疑路线',
      '定位嫌疑人藏身处'
    ],
    hints: [
      '仔细查看每个监控点的时间记录',
      '对比交通工具的使用时间',
      '注意目标在各个地点停留的时长',
      '分析可能的换乘路线',
      '找出最终的落脚点'
    ],
    fileContents: {
      "readme.txt": "追踪分析指南:\n1. 使用 cctv <摄像头编号> 查看监控录像\n2. 使用 track 在地图上分析路线\n3. 查看 traffic_data 目录下的交通记录\n4. 在 analysis 目录记录分析结果\n\n提示: 嫌疑人可能会利用公共交通工具逃跑",
      "camera_01.log": "[监控点1 - 火车站大厅]\n时间: 2024-01-15 15:30\n可疑人员匆忙进入地铁站",
      "camera_02.log": "[监控点2 - 商业中心]\n时间: 2024-01-15 16:15\n目标出现在购物中心出口",
      "camera_03.log": "[监控点3 - 公园南门]\n时间: 2024-01-15 17:00\n有人在长椅上等待出租车",
      "camera_04.log": "[监控点4 - 居民区]\n时间: 2024-01-15 17:45\n目标进入老旧居民区",
      "subway.log": "地铁乘客记录:\n15:35 2号线往东\n15:50 换乘1号线往南\n16:10 在商业中心站下车",
      "bus.log": "公交刷卡记录:\n16:30 25路公交\n16:45 换乘17路\n17:00 在公园站下车",
      "taxi.log": "出租车记录:\n17:10 从公园南门上车\n17:30 在老旧居民区下车\n费用: 35元",
      "locations.txt": "可疑位置标记:\n1. 火车站(监控点1)\n2. 商业中心(监控点2)\n3. 公园南门(监控点3)\n4. 老旧居民区(监控点4)",
      "timeline.txt": "时间轴:\n15:30 火车站出现\n16:15 商业中心出现\n17:00 公园停留\n17:45 进入居民区"
    }
  },
  en: {
    title: "Fugitive Tracking",
    description: "The suspect has fled, we need to analyze surveillance data and traffic records to track their movements on the city map.",
    objectives: [
      'Analyze surveillance footage to determine target location',
      'Check traffic records to find movement patterns',
      'Mark suspicious routes on map',
      'Locate suspect hideout'
    ],
    hints: [
      'Carefully check time records from each surveillance point',
      'Compare usage times of different transportation',
      'Note how long target stays at each location',
      'Analyze possible transfer routes',
      'Find the final destination'
    ],
    fileContents: {
      "readme.txt": "Tracking Analysis Guide:\n1. Use cctv <camera number> to view surveillance footage\n2. Use track to analyze routes on map\n3. Check traffic records in traffic_data directory\n4. Record analysis results in analysis directory\n\nHint: Suspect may use public transportation to escape",
      "camera_01.log": "[Camera 1 - Train Station Hall]\nTime: 2024-01-15 15:30\nSuspicious person hurriedly enters subway station",
      "camera_02.log": "[Camera 2 - Shopping Center]\nTime: 2024-01-15 16:15\nTarget appears at shopping center exit",
      "camera_03.log": "[Camera 3 - Park South Gate]\nTime: 2024-01-15 17:00\nPerson waiting for taxi on bench",
      "camera_04.log": "[Camera 4 - Residential Area]\nTime: 2024-01-15 17:45\nTarget enters old residential area",
      "subway.log": "Subway Passenger Records:\n15:35 Line 2 eastbound\n15:50 Transfer to Line 1 southbound\n16:10 Exit at Shopping Center station",
      "bus.log": "Bus Card Records:\n16:30 Bus Route 25\n16:45 Transfer to Route 17\n17:00 Exit at Park station",
      "taxi.log": "Taxi Records:\n17:10 Pickup at Park South Gate\n17:30 Dropoff at old residential area\nFare: 35 yuan",
      "locations.txt": "Suspicious Location Marks:\n1. Train Station (Camera 1)\n2. Shopping Center (Camera 2)\n3. Park South Gate (Camera 3)\n4. Old Residential Area (Camera 4)",
      "timeline.txt": "Timeline:\n15:30 Appears at train station\n16:15 Appears at shopping center\n17:00 Stays at park\n17:45 Enters residential area"
    }
  }
}; 