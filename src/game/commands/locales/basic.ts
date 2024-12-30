import type { Language } from '@/stores/language';

export const basicLocales: Record<Language, {
  help: {
    description: string;
    availableCommands: string;
    helpDesc: string;
    lsDesc: string;
    cdDesc: string;
    catDesc: string;
    clearDesc: string;
    decodeDesc: string;
    unlockDesc: string;
    saveDesc: string;
    loadDesc: string;
    deleteDesc: string;
    directory: string;
    file: string;
    password: string;
    saveName: string;
  };
  clear: {
    description: string;
  };
  unlock: {
    description: string;
    wrongPassword: string;
    correctPassword: string;
    welcome: string;
    level: string;
    objectives: string;
    needClue: string;
    needDecode: string;
    needFile: string;
    needKill: string;
    needData: string;
    needRestore: string;
    needShadow: string;
    needBlockLeak: string;
    needFindSecret: string;
    needDecodePlan: string;
    needDecodeSecret: string;
    needFindData: string;
    needTrojan: string;
    needInvestigation: string;
    needExploit: string;
    needAnalysis: string;
    needVoiceprint: string;
  };
  decode: {
    description: string;
  };
  exit: {
    description: string;
    confirmExit: string;
  };
  level: {
    description: string;
    currentLevel: string;
    objectives: string;
  };
  hint: {
    description: string;
    available: string;
  };
  goto: {
    description: string;
    jumpedTo: string;
    objectives: string;
  };
}> = {
  zh: {
    help: {
      description: "显示所有可用命令",
      availableCommands: "可用命令：",
      helpDesc: "显示帮助信息",
      lsDesc: "列出目录内容",
      cdDesc: "切换目录",
      catDesc: "查看文件内容",
      clearDesc: "清屏",
      decodeDesc: "解码文本",
      unlockDesc: "输入密码解锁下一关",
      saveDesc: "保存游戏进度",
      loadDesc: "加载游戏存档",
      deleteDesc: "删除游戏存档",
      directory: "目录",
      file: "文件",
      password: "密码",
      saveName: "存档名"
    },
    clear: {
      description: "清空终端"
    },
    unlock: {
      description: "输入密码解锁下一关",
      wrongPassword: "密码错误",
      correctPassword: "密码正确，正在进入下一关...",
      welcome: "密码正确！欢迎进入下一关...",
      level: "【第%s关】",
      objectives: "目标：",
      needClue: "你还没有找到必要的线索！",
      needDecode: "你需要先使用 decode 命令解密文本！",
      needFile: "你需要先查看相关文件获取密码线索！",
      needKill: "你需要先终止恶意进程！",
      needData: "你需要先从服务器下载数据！",
      needRestore: "你需要先恢复系统状态！",
      needShadow: "你需要先获取 shadow 文件中的密码！",
      needBlockLeak: "你需要先阻止数据泄露！",
      needFindSecret: "需要先找到隐藏在件中的秘密",
      needDecodePlan: "你需要先破解加密的信息！",
      needDecodeSecret: "你需要先破解隐藏的信息！",
      needFindData: "你需要先找到被窃取的数据！",
      needTrojan: "你需要先植入木马程序！",
      needInvestigation: "你需要先完成所有调查任务！",
      needExploit: "你需要先完成所有漏洞利用任务！",
      needAnalysis: "你需要先完成所有档案分析任务！",
      needVoiceprint: "需要完成所有声纹分析任务！"
    },
    decode: {
      description: "解码文本"
    },
    exit: {
      description: "退出游戏",
      confirmExit: "确定要退出游戏吗？"
    },
    level: {
      description: "显示当前关卡信息",
      currentLevel: "当前关卡：",
      objectives: "目标："
    },
    hint: {
      description: "显示提示信息",
      available: "可用提示："
    },
    goto: {
      description: "跳转到指定关卡",
      jumpedTo: "已跳转到第%s关：",
      objectives: "目标："
    }
  },
  en: {
    help: {
      description: "Show all available commands",
      availableCommands: "Available commands:",
      helpDesc: "Show help information",
      lsDesc: "List directory contents",
      cdDesc: "Change directory",
      catDesc: "View file contents",
      clearDesc: "Clear screen",
      decodeDesc: "Decode text",
      unlockDesc: "Enter password to unlock next level",
      saveDesc: "Save game progress",
      loadDesc: "Load game save",
      deleteDesc: "Delete game save",
      directory: "directory",
      file: "file",
      password: "password",
      saveName: "save name"
    },
    clear: {
      description: "Clear terminal"
    },
    unlock: {
      description: "Enter password to unlock next level",
      wrongPassword: "Wrong password",
      correctPassword: "Correct password, entering next level...",
      welcome: "Password correct! Welcome to next level...",
      level: "Level %s:",
      objectives: "Objectives:",
      needClue: "You haven't found the necessary clues yet!",
      needDecode: "You need to use decode command first!",
      needFile: "You need to check related files for password clues!",
      needKill: "You need to terminate the malicious process first!",
      needData: "You need to download data from the server first!",
      needRestore: "You need to restore system state first!",
      needShadow: "You need to get the password from shadow file first!",
      needBlockLeak: "You need to block data leakage first!",
      needFindSecret: "You need to find the hidden secret first!",
      needDecodePlan: "You need to decrypt the encrypted message first!",
      needDecodeSecret: "You need to decrypt the hidden message first!",
      needFindData: "You need to find the stolen data first!",
      needTrojan: "You need to plant the trojan program first!",
      needInvestigation: "You need to complete all investigation tasks first!",
      needExploit: "You need to complete all vulnerability exploitation tasks first!",
      needAnalysis: "You need to complete all file analysis tasks first!",
      needVoiceprint: "You need to complete all voiceprint analysis tasks first!"
    },
    decode: {
      description: "Decode text"
    },
    exit: {
      description: "Exit game",
      confirmExit: "Are you sure you want to exit?"
    },
    level: {
      description: "Show current level info",
      currentLevel: "Current level:",
      objectives: "Objectives:"
    },
    hint: {
      description: "Show hints",
      available: "Available hints:"
    },
    goto: {
      description: "Jump to specified level",
      jumpedTo: "Jumped to level %s:",
      objectives: "Objectives:"
    }
  }
}; 