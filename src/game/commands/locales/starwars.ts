import type { Language } from '@/stores/language';

export const starwarsLocales: Record<Language, {
  description: string;
  initText: string;
  prepareText: string;
  forceText: string;
  endText: string;
}> = {
  zh: {
    description: "??????????",
    initText: "[系统] 很久很久以前，在一个遥远的银河系...",
    prepareText: "[系统] 准备进入超空间跳跃...",
    forceText: "[系统] 愿原力与你同在...",
    endText: "[系统] 超空间跳跃结束..."
  },
  en: {
    description: "??????????",
    initText: "[SYSTEM] A long time ago in a galaxy far, far away...",
    prepareText: "[SYSTEM] Preparing for hyperspace jump...",
    forceText: "[SYSTEM] May the Force be with you...",
    endText: "[SYSTEM] Hyperspace jump completed..."
  }
}; 