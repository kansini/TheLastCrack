import { defineStore } from 'pinia';

interface Translation {
  [key: string]: {
    zh: string;
    en: string;
  };
}

const translations: Translation = {
  newGame: {
    zh: '进入系统',
    en: 'Enter'
  },
  continueGame: {
    zh: '读取存档',
    en: 'Continue'
  },
  tutorial: {
    zh: '教程',
    en: 'Tutorial'
  },
  about: {
    zh: '关于',
    en: 'About'
  },
  systemReady: {
    zh: '系统就绪',
    en: 'SYSTEM READY'
  },
  selectSaveFile: {
    zh: '选择存档',
    en: 'SELECT SAVE FILE'
  },
  noSaves: {
    zh: '没有找到存档',
    en: 'NO SAVE FILES FOUND'
  },
  load: {
    zh: '加载',
    en: 'LOAD'
  },
  delete: {
    zh: '删除',
    en: 'DELETE'
  },
  tutorialTitle: {
    zh: '游戏教程',
    en: 'Game Tutorial'
  },
  tutorialDesc: {
    zh: '欢迎来到 The Last Crack，一个充满挑战的黑客模拟游戏。在这里，你将扮演一名黑客，通过解决各种谜题和挑战来提升自己的技能。',
    en: 'Welcome to The Last Crack, a challenging hacker simulation game. Here, you will play as a hacker, improving your skills by solving various puzzles and challenges.'
  },
  basicCommands: {
    zh: '基础命令',
    en: 'Basic Commands'
  },
  commandHelp: {
    zh: '显示所有可用命令',
    en: 'Display all available commands'
  },
  commandLs: {
    zh: '列出当前目录文件',
    en: 'List files in current directory'
  },
  commandCd: {
    zh: '切换目录',
    en: 'Change directory'
  },
  commandCat: {
    zh: '查看文件内容',
    en: 'View file content'
  },
  commandClear: {
    zh: '清除终端屏幕',
    en: 'Clear terminal screen'
  },
  commandLevel: {
    zh: '显示当前关卡信息',
    en: 'Display current level information'
  },
  commandUnlock: {
    zh: '使用密码解锁下一关',
    en: 'Use password to unlock next level'
  },
  gameProgress: {
    zh: '游戏进度',
    en: 'Game Progress'
  },
  commandSave: {
    zh: '保存游戏进度',
    en: 'Save game progress'
  },
  commandLoad: {
    zh: '加载已保存的游戏',
    en: 'Load saved game'
  },
  commandDelete: {
    zh: '删除存档',
    en: 'Delete save file'
  },
  tips: {
    zh: '游戏提示',
    en: 'Game Tips'
  },
  tip1: {
    zh: '仔细阅读每一关的说明和提示',
    en: 'Read carefully the instructions and hints for each level'
  },
  tip2: {
    zh: '注意观察文件和目录的命名特征',
    en: 'Pay attention to file and directory naming patterns'
  },
  tip3: {
    zh: '合理利用命令组合来解决问题',
    en: 'Use command combinations effectively to solve problems'
  },
  tip4: {
    zh: '遇到困难时可以使用 hint 命令获取提示',
    en: 'Use the hint command when you need help'
  },
  aboutTitle: {
    zh: '关于游戏',
    en: 'About Game'
  },
  aboutDesc: {
    zh: 'The Last Crack 是一个融合了解谜、黑客技术和故事情节的终端模拟游戏。',
    en: 'The Last Crack is a terminal simulation game that combines puzzle-solving, hacking techniques, and storytelling.'
  },
  features: {
    zh: '游戏特色',
    en: 'Features'
  },
  feature1: {
    zh: '真实的终端操作体验',
    en: 'Authentic terminal operation experience'
  },
  feature2: {
    zh: '引人入胜的黑客剧情',
    en: 'Engaging hacker storyline'
  },
  feature3: {
    zh: '递进式的难度设计',
    en: 'Progressive difficulty design'
  },
  feature4: {
    zh: '丰富的解谜元素',
    en: 'Rich puzzle elements'
  },
  version: {
    zh: '版本信息',
    en: 'Version Info'
  },
  currentVersion: {
    zh: '当前版本',
    en: 'Current Version'
  },
  developer: {
    zh: '开发者',
    en: 'Developer'
  },
  close: {
    zh: '关闭',
    en: 'Close'
  },
  directory: {
    zh: '目录',
    en: 'directory'
  },
  file: {
    zh: '文件',
    en: 'file'
  },
  password: {
    zh: '密码',
    en: 'password'
  },
  saveName: {
    zh: '名称',
    en: 'name'
  },
  settings: {
    zh: '设置',
    en: 'Settings'
  },
  settingsTitle: {
    zh: '终端设置',
    en: 'Terminal Settings'
  },
  backgroundColor: {
    zh: '背景颜色',
    en: 'Background Color'
  },
  textColor: {
    zh: '字体颜色',
    en: 'Text Color'
  },
  inputTextColor: {
    zh: '输入文字颜色',
    en: 'Input Text Color'
  },
  outputTextColor: {
    zh: '输出文字颜色',
    en: 'Output Text Color'
  },
  fontSize: {
    zh: '字体大小',
    en: 'Font Size'
  },
  resetSettings: {
    zh: '恢复默认',
    en: 'Default'
  },
  colorSettings: {
    zh: '颜色设置',
    en: 'Color Settings'
  },
  fontSettings: {
    zh: '字体设置',
    en: 'Font Settings'
  },
  backgroundOpacity: {
    zh: '背景透明度',
    en: 'Background Opacity'
  },
  promptColor: {
    zh: '提示符颜色',
    en: 'Prompt Color'
  },
  caretColor: {
    zh: '光标颜色',
    en: 'Caret Color'
  },
  scrollbarColor: {
    zh: '滚动条颜色',
    en: 'Scrollbar Color'
  },
  save: {
    zh: '确定',
    en: 'Save'
  },
  cancel: {
    zh: '取消',
    en: 'Cancel'
  },
  saveSettings: {
    zh: '保存设置',
    en: 'Save'
  },
  terminalColors: {
    zh: '颜色设置',
    en: 'Colors'
  },
  terminalStyle: {
    zh: '字体设置',
    en: 'Font'
  },
  promptStyle: {
    zh: '提示符',
    en: 'Prompt'
  },
  scrollbarStyle: {
    zh: '滚动条',
    en: 'Scrollbar'
  },
  opacity: {
    zh: '背景透明度',
    en: 'Background Opacity'
  },
  outputFontSize: {
    zh: '输出字体大小',
    en: 'Output Font Size'
  },
  commandNotFound: {
    zh: '命令未找到',
    en: 'Command not found'
  },
  commandNotAvailable: {
    zh: '命令不可用',
    en: 'Command not available'
  },
  fileNotFound: {
    zh: '找不到文件：',
    en: 'File not found:'
  },
  directoryNotFound: {
    zh: '目录不存在：',
    en: 'Directory not found:'
  },
  levelComplete: {
    zh: '关卡完成！',
    en: 'Level Complete!'
  },
  taskComplete: {
    zh: '任务完成：',
    en: 'Task completed:'
  },
  saveSuccess: {
    zh: '游戏已保存',
    en: 'Game saved'
  },
  loadSuccess: {
    zh: '存档读取成功！',
    en: 'Save loaded successfully!'
  },
  currentLevel: {
    zh: '当前位于第',
    en: 'Current level:'
  },
  level: {
    zh: '关',
    en: 'Level'
  },
  usage: {
    zh: '用法：',
    en: 'Usage:'
  },
  availableCommands: {
    zh: '可用命令：',
    en: 'Available commands:'
  },
  invalidPassword: {
    zh: '密码错误',
    en: 'Invalid password'
  },
  accessDenied: {
    zh: '访问被拒绝',
    en: 'Access denied'
  },
  objectives: {
    zh: '目标：',
    en: 'Objectives:'
  },
  pressEnter: {
    zh: '按回车继续...',
    en: 'Press Enter to continue...'
  },
  helpDesc: {
    zh: '显示此帮助信息',
    en: 'Show this help message'
  },
  lsDesc: {
    zh: '列出当前目录文件',
    en: 'List files in current directory'
  },
  cdDesc: {
    zh: '切换目录',
    en: 'Change directory'
  },
  catDesc: {
    zh: '查看文件内容',
    en: 'View file content'
  },
  clearDesc: {
    zh: '清除终端屏幕',
    en: 'Clear terminal screen'
  },
  decodeDesc: {
    zh: '解密文本',
    en: 'Decode text'
  },
  unlockDesc: {
    zh: '使用密码解锁下一关',
    en: 'Use password to unlock next level'
  },
  saveDesc: {
    zh: '保存游戏进度',
    en: 'Save game progress'
  },
  loadDesc: {
    zh: '查看或加载存档',
    en: 'View or load saves'
  },
  deleteDesc: {
    zh: '删除存档',
    en: 'Delete save file'
  },
  levelDesc: {
    zh: '显示当前关卡信息',
    en: 'Show current level info'
  },
  exitDesc: {
    zh: '返回主菜单',
    en: 'Return to main menu'
  },
  loadPrompt: {
    zh: '请用 load <存档ID> 来加载存档',
    en: 'Use load <save ID> to load a save'
  },
  permissionDenied: {
    zh: '权限不足，需要root权限',
    en: 'Permission denied, root access required'
  },
  fileNotExist: {
    zh: '文件不存在',
    en: 'File does not exist'
  },
  isDirectory: {
    zh: '是一个目录',
    en: 'Is a directory'
  },
  alreadyInRoot: {
    zh: '已经在根目录了',
    en: 'Already in root directory'
  },
  invalidCommand: {
    zh: '命令不可用',
    en: 'Command not available'
  },
  invalidUsage: {
    zh: '用法',
    en: 'Usage'
  },
  scanResult: {
    zh: '扫描结果',
    en: 'Scan result'
  },
  analyzing: {
    zh: '正在分析',
    en: 'Analyzing'
  },
  connecting: {
    zh: '正在连接',
    en: 'Connecting'
  },
  connectionFailed: {
    zh: '连接失败',
    en: 'Connection failed'
  },
  invalidCamera: {
    zh: '无效的摄像头编号',
    en: 'Invalid camera ID'
  },
  viewingCamera: {
    zh: '正在查看摄像头',
    en: 'Viewing camera'
  },
  networkAnalysis: {
    zh: '网络分析命令',
    en: 'Network Analysis Commands'
  },
  tcpdumpDesc: {
    zh: '捕获网络数据包',
    en: 'Capture network packets'
  },
  analyzeDesc: {
    zh: '分析数据包内容',
    en: 'Analyze packet content'
  },
  memoryAnalysis: {
    zh: '内存分析命令',
    en: 'Memory Analysis Commands'
  },
  volatilityDesc: {
    zh: '分析内存镜像',
    en: 'Analyze memory image'
  },
  stringsDesc: {
    zh: '提取内存字符串',
    en: 'Extract memory strings'
  },
  timelineDesc: {
    zh: '分析事件时间线',
    en: 'Analyze event timeline'
  },
  mailAnalysis: {
    zh: '邮件分析命令',
    en: 'Mail Analysis Commands'
  },
  mailListDesc: {
    zh: '列出所有邮箱用户',
    en: 'List all mailbox users'
  },
  mailReadDesc: {
    zh: '读取用户邮件',
    en: 'Read user mail'
  },
  mailSearchDesc: {
    zh: '搜索邮件内容',
    en: 'Search mail content'
  },
  mailTrashDesc: {
    zh: '查看已删除邮件',
    en: 'View deleted mail'
  },
  voiceprintAnalysis: {
    zh: '声纹分析命令',
    en: 'Voiceprint Analysis Commands'
  },
  voiceprintDesc: {
    zh: '比对声纹样本',
    en: 'Compare voiceprint samples'
  },
  hints: {
    zh: '提示',
    en: 'Hints'
  },
  decryptSuccess: {
    zh: '解密成功！解密结果',
    en: 'Decryption successful! Result'
  },
  foundPassword: {
    zh: '恭喜你发现了密码',
    en: 'Congratulations, you found the password'
  },
  decryptResult: {
    zh: '解密结果',
    en: 'Decryption result'
  },
  scanFileNotExist: {
    zh: '文件不存在',
    en: 'File does not exist'
  },
  scanResults: {
    zh: '扫描结果',
    en: 'Scan Results'
  },
  fileStatus: {
    zh: '文件状态',
    en: 'File Status'
  },
  corrupted: {
    zh: '已损坏',
    en: 'Corrupted'
  },
  damageTime: {
    zh: '损坏时间',
    en: 'Damage Time'
  },
  damagePart: {
    zh: '损坏部分',
    en: 'Damaged Part'
  },
  charReplacement: {
    zh: '字符替换',
    en: 'Character Replacement'
  },
  suggestedAction: {
    zh: '建议操作',
    en: 'Suggested Action'
  },
  useBackup: {
    zh: '使用正确的备份文件修复',
    en: 'Repair using correct backup file'
  },
  backupTime: {
    zh: '备份时间',
    en: 'Backup Time'
  },
  beforeDamage: {
    zh: '在损坏发生之前',
    en: 'Before damage occurred'
  },
  fileIntact: {
    zh: '文件完整，无需修复',
    en: 'File intact, no repair needed'
  },
  chmodDesc: {
    zh: '修改文件权限',
    en: 'Modify file permissions'
  },
  needRoot: {
    zh: '需要 root 权限',
    en: 'Root access required'
  },
  captureStart: {
    zh: '开始捕获数据包...',
    en: 'Starting packet capture...'
  },
  suspiciousScan: {
    zh: '发现可疑的扫描行为',
    en: 'Suspicious scanning behavior detected'
  },
  sourceIP: {
    zh: '源IP',
    en: 'Source IP'
  },
  targetPorts: {
    zh: '目标端口',
    en: 'Target ports'
  },
  attackType: {
    zh: '攻击类型',
    en: 'Attack type'
  },
  synScan: {
    zh: 'SYN扫描',
    en: 'SYN scan'
  },
  analyzeHint: {
    zh: '使用 analyze network.pcap 分析完整的攻击数据',
    en: 'Use analyze network.pcap to analyze complete attack data'
  },
  filterHint: {
    zh: '使用 SYN 作为过滤器来捕获可疑的扫描包',
    en: 'Use SYN as filter to capture suspicious scan packets'
  },
  captureComplete: {
    zh: '捕获完成！可疑数据包已保存到 packets.pcap',
    en: 'Capture complete! Suspicious packets saved to packets.pcap'
  },
  noSuspicious: {
    zh: '未发现可疑数据包',
    en: 'No suspicious packets found'
  },
  repairDesc: {
    zh: '修复损坏的文件',
    en: 'Repair corrupted files'
  },
  specifiedFileNotFound: {
    zh: '指定的文件不存在',
    en: 'Specified file not found'
  },
  repairSuccess: {
    zh: '修复成功！',
    en: 'Repair successful!'
  },
  dataRestored: {
    zh: '原始数据已恢复',
    en: 'Original data restored'
  },
  passwordFound: {
    zh: '这就是你需要的密码！',
    en: 'This is the password you need!'
  },
  repairFailed: {
    zh: '修复失败：备份文件不匹配或已损坏',
    en: 'Repair failed: Backup file mismatch or corrupted'
  },
  pingDesc: {
    zh: '测试网络连接',
    en: 'Test network connection'
  },
  pinging: {
    zh: '正在 Ping',
    en: 'Pinging'
  },
  replyFrom: {
    zh: '来自',
    en: 'Reply from'
  },
  pingStats: {
    zh: '的 Ping 统计信息',
    en: 'Ping statistics for'
  },
  hostNotFound: {
    zh: 'Ping 请求找不到主机',
    en: 'Ping request could not find host'
  },
  checkAndRetry: {
    zh: '请检查该名称，然后重试',
    en: 'Please check the name and try again'
  },
  serverOnline: {
    zh: '服务器在线，可以尝试使用 connect 命令连接',
    en: 'Server online, try using connect command'
  },
  connectDesc: {
    zh: '连接远程服务器',
    en: 'Connect to remote server'
  },
  connectSuccess: {
    zh: '连接成功！',
    en: 'Connection successful!'
  },
  serverReady: {
    zh: '服务器已就绪',
    en: 'Server ready'
  },
  downloadHint: {
    zh: '使用 download 命令下载数据',
    en: 'Use download command to get data'
  },
  authError: {
    zh: '连接失败：认证错误。请检查 IP、用户名和密码',
    en: 'Connection failed: Authentication error. Check IP, username and password'
  },
  commandError: {
    zh: '执行命令出错',
    en: 'Command execution error'
  }
};

export type Language = 'zh' | 'en';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLanguage: 'zh' as Language
  }),

  getters: {
    t: (state) => {
      return (key: string) => {
        if (!translations[key]) {
          console.warn(`Translation missing for key: ${key}`);
          return key;
        }
        return translations[key][state.currentLanguage as Language];
      };
    }
  },

  actions: {
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'zh' ? 'en' : 'zh';
    }
  }
}); 