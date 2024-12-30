import type { Language } from '@/stores/language';

export const gameCompleteLocales: Record<Language, {
  title: string[];
  congratulations: string;
  achievement: string;
  credits: string[];
  restart: string;
  invalidInput: string;
  welcome: string;
  thanks: string;
}> = {
  zh: {
    title: [
      "    ____                            __      __  _           _ ",
      "   / ___| __ _ _ __ ___   ___      \\ \\    / / (_) _ __   | |",
      "  | |    / _` | '_ ` _ \\ / _ \\      \\ \\/\\/ /  | || '_ \\  | |",
      "  | |___| (_| | | | | | |  __/       \\    /   | || | | | |_|",
      "   \\____|\\__,_|_| |_| |_|\\___|        \\/\\/    |_||_| |_| (_)"
    ],
    congratulations: "  ★ ★ ★ ★ ★ 恭喜你通关了 The Last Crack! ★ ★ ★ ★ ★",
    achievement: "     你成功完成了所有关卡，成为了一名真正的黑客高手！",
    credits: [
      "",
      "     制作人员名单：",
      "     - 游戏设计：Old Flood",
      "     - 关卡设计：Old Flood",
      "     - 程序开发：Old Flood",
      "     - 特别感谢：所有测试玩家",
      ""
    ],
    restart: "是否重新开始游戏？(Y/N): ",
    invalidInput: "请输入 Y 或 N: ",
    welcome: "欢迎回到第一关！\n\n输入 help 查看可用命令",
    thanks: "感谢游玩！期待与你的下次相遇！"
  },
  en: {
    title: [
      "    ____                            __      __  _           _ ",
      "   / ___| __ _ _ __ ___   ___      \\ \\    / / (_) _ __   | |",
      "  | |    / _` | '_ ` _ \\ / _ \\      \\ \\/\\/ /  | || '_ \\  | |",
      "  | |___| (_| | | | | | |  __/       \\    /   | || | | | |_|",
      "   \\____|\\__,_|_| |_| |_|\\___|        \\/\\/    |_||_| |_| (_)"
    ],
    congratulations: "  ★ ★ ★ ★ ★ Congratulations on completing The Last Crack! ★ ★ ★ ★ ★",
    achievement: "     You've completed all levels and become a true hacker master!",
    credits: [
      "",
      "     Credits:",
      "     - Game Design: Old Flood",
      "     - Level Design: Old Flood",
      "     - Programming: Old Flood",
      "     - Special Thanks: All testers",
      ""
    ],
    restart: "Would you like to restart the game? (Y/N): ",
    invalidInput: "Please enter Y or N: ",
    welcome: "Welcome back to Level 1!\n\nType help to see available commands",
    thanks: "Thanks for playing! Looking forward to seeing you again!"
  }
}; 