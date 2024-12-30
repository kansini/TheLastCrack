import type { Language } from '@/stores/language';

export const countdownLocales: Record<Language, {
  warningTitle: string;
  countdownText: string;
  warningText: string;
  criticalText: string;
  dataText: string;
  completedText: string;
}> = {
  zh: {
    warningTitle: '⚠️ 💣💥 警告：系统即将自毁 💥💣 ⚠️',
    countdownText: '倒计时: %s 秒',
    warningText: '⚠️ 💣💥警告：无法中止自毁程序💥💣 ⚠️',
    criticalText: '⚠️ 💣💥警告：系统关键模块已锁定💥💣 ⚠️',
    dataText: '⚠️ 💣💥警告：正在清除所有数据💥💣 ⚠️',
    completedText: '自毁程序已中止\n系统恢复正常! 🎉😊🎉😊🎉😊'
  },
  en: {
    warningTitle: '⚠️ 💣💥 WARNING: SYSTEM SELF-DESTRUCT INITIATED 💥💣 ⚠️',
    countdownText: 'Countdown: %s seconds',
    warningText: '⚠️ 💣💥WARNING: SELF-DESTRUCT SEQUENCE CANNOT BE ABORTED💥💣 ⚠️',
    criticalText: '⚠️ 💣💥WARNING: SYSTEM CRITICAL MODULES LOCKED💥💣 ⚠️',
    dataText: '⚠️ 💣💥WARNING: ERASING ALL DATA💥💣 ⚠️',
    completedText: 'Self-destruct sequence aborted\nSystem restored to normal! 🎉😊🎉😊🎉😊'
  }
}; 