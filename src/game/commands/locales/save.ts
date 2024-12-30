import type { Language } from '@/stores/language';

export const saveLocales: Record<Language, {
  save: {
    description: string;
    usage: string;
    success: string;
  };
  load: {
    description: string;
    noSaves: string;
    availableSaves: string;
    loadPrompt: string;
    invalidId: string;
    level: string;
    loadSuccess: string;
    saveNotFound: string;
  };
  delete: {
    description: string;
    usage: string;
    success: string;
    invalidId: string;
  };
}> = {
  zh: {
    save: {
      description: "保存游戏进度",
      usage: "Usage: save <存档名称>",
      success: "游戏保存到存档 #%s: %s"
    },
    load: {
      description: "加载游戏存档",
      noSaves: "没有找到任何存档",
      availableSaves: "可用存档：",
      loadPrompt: "\n\n请用 load <存档ID> 来加载存档",
      invalidId: "请输入有效的存档ID",
      level: "第%s关 - %s",
      loadSuccess: "存档读取成功！\n当前位于第%s关 - %s",
      saveNotFound: "未找到存档 #%s"
    },
    delete: {
      description: "删除游戏存档",
      usage: "Usage: deletesave <存档ID>",
      success: "存档 #%s 已删除",
      invalidId: "请输入有效的存档ID"
    }
  },
  en: {
    save: {
      description: "Save game progress",
      usage: "Usage: save <save name>",
      success: "Game saved to slot #%s: %s"
    },
    load: {
      description: "Load game save",
      noSaves: "No saves found",
      availableSaves: "Available saves:",
      loadPrompt: "\n\nUse load <save ID> to load a save",
      invalidId: "Please enter a valid save ID",
      level: "Level %s - %s",
      loadSuccess: "Save loaded successfully!\nCurrently at Level %s - %s",
      saveNotFound: "Save #%s not found"
    },
    delete: {
      description: "Delete game save",
      usage: "Usage: deletesave <save ID>",
      success: "Save #%s deleted",
      invalidId: "Please enter a valid save ID"
    }
  }
}; 