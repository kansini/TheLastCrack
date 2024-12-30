import type { Language } from '@/stores/language';

export const matrixLocales: Record<Language, {
  description: string;
  startText: string;
  stopText: string;
  errorText: string;
}> = {
  zh: {
    description: '启动黑客帝国特效',
    startText: '黑客帝国特效已启动...',
    stopText: '黑客帝国特效已停止',
    errorText: '启动特效时发生错误：'
  },
  en: {
    description: 'Start Matrix effect',
    startText: 'Matrix effect started...',
    stopText: 'Matrix effect stopped',
    errorText: 'Error starting effect: '
  }
}; 