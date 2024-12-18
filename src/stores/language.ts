import { defineStore } from 'pinia';

interface Translation {
  [key: string]: {
    zh: string;
    en: string;
  };
}

const translations: Translation = {
  newGame: {
    zh: '新游戏',
    en: 'New Game'
  },
  continueGame: {
    zh: '继续游戏',
    en: 'Continue'
  },
  tutorial: {
    zh: '游戏教程',
    en: 'Tutorial'
  },
  about: {
    zh: '关于游戏',
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
  }
};

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLanguage: 'zh'
  }),

  getters: {
    t: (state) => {
      return (key: string) => {
        if (!translations[key]) {
          console.warn(`Translation missing for key: ${key}`);
          return key;
        }
        return translations[key][state.currentLanguage as keyof typeof translations[string]];
      };
    }
  },

  actions: {
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'zh' ? 'en' : 'zh';
    }
  }
}); 