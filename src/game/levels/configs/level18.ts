import { LevelData } from "@/types/game"

export const level18: LevelData = {
  id: 18,
  title: "第18关：追踪逃犯",
  description: "嫌疑人已经逃跑，我们需要分析监控数据和交通记录，在城市地图上追踪他的行踪。",
  
  objectives: [
    '分析监控录像确定目标位置',
    '查看交通记录寻找移动轨迹',
    '在地图上标记可疑路线',
    '定位嫌疑人藏身处'
  ],

  requiredTasks: ['analyze_cctv', 'track_route', 'find_hideout'],
  
  // tasks: {
  //   analyze_cctv: {
  //     name: "分析监控录像",
  //     description: "分析各个监控点位的录像，确定嫌疑人出现的时间点"
  //   },
  //   track_route: {
  //     name: "追踪逃跑路线",
  //     description: "在地图上标记嫌疑人的移动轨迹"
  //   },
  //   find_hideout: {
  //     name: "定位藏身处",
  //     description: "根据分析结果，找出嫌疑人可能的藏身位置"
  //   }
  // },

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
  },

  fileContents: {
    "readme.txt": `追踪分析指南:
1. 使用 cctv <摄像头编号> 查看监控录像
2. 使用 track 在地图上分析路线
3. 查看 traffic_data 目录下的交通记录
4. 在 analysis 目录记录分析结果

提示: 嫌疑人可能会利用公共交通工具逃跑`,

    "camera_01.log": "[监控点1 - 火车站大厅]\n时间: 2024-01-15 15:30\n可疑人员匆忙进入地铁站",
    "camera_02.log": "[监控点2 - 商业中心]\n时间: 2024-01-15 16:15\n目标出现在购物中心出口",
    "camera_03.log": "[监控点3 - 公园南门]\n时间: 2024-01-15 17:00\n有人在长椅上等待出租车",
    "camera_04.log": "[监控点4 - 居民区]\n时间: 2024-01-15 17:45\n目标进入老旧居民区",

    "subway.log": "地铁乘客记录:\n15:35 2号线往东\n15:50 换乘1号线往南\n16:10 在商业中心站下车",
    "bus.log": "公交刷卡记录:\n16:30 25路公交\n16:45 换乘17路\n17:00 在公园站下车",
    "taxi.log": "出租车记录:\n17:10 从公园南门上车\n17:30 在老旧居民区下车\n费用: 35元",

    "locations.txt": "可疑位置标记:\n1. 火车站(监控点1)\n2. 商业中心(监控点2)\n3. 公园南门(监控点3)\n4. 老旧居民区(监控点4)",
    "timeline.txt": "时间轴:\n15:30 火车站出现\n16:15 商业中心出现\n17:00 公园停留\n17:45 进入居民区"
  },

  hints: [
    '仔细查看每个监控点的时间记录',
    '对比交通工具的使用时间',
    '注意目标在各个地点停留的时长',
    '分析可能的换乘路线',
    '找出最终的落脚点'
  ],

  // commands: {
  //   "track": {
  //     description: "在地图上追踪和分析逃犯路线",
  //     component: "TrackAnalyzer"
  //   },
  //   "cctv": {
  //     description: "查看监控录像记录",
  //     component: "CCTVViewer"
  //   }
  // },

  // onStart: () => {
  //   const gameStore = useGameStore()
  //   gameStore.setCurrentDirectory("~")
  // },
  //
  // onComplete: () => {
  //   // 关卡完成后的处理
  // }
} 