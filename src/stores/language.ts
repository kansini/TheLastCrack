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