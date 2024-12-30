import type { Language } from '@/stores/language';

export const level19CommandLocales: Record<Language, {
  compare: {
    description: string;
    usage: string;
    failed: string;
    comparing: string;
    result: string;
    notFound: string;
    success: string;
    notAvailable: string;
    needAnalyze: string;
    needDecode: string;
  };
}> = {
  zh: {
    compare: {
      description: "比对两个文件的关联",
      usage: "用法: compare <文件1> <文件2>",
      failed: "比对失败：%s",
      comparing: "正在比对文件...\n\n发现以下关联：",
      result: "1. 两份文件使用了相似的符号系统\n2. 数字'1912'在两处均有出现\n3. 文件中的'V0yN1cH'与手稿作者相关\n4. 组合分析显示一个可能的密码",
      notFound: "找不到文件：%s",
      success: "比对完成！\n\n发现通关密码：V0yN1cH_1912\n\n[提示] 这个密码与伏尼契手稿的发现年份有关",
      notAvailable: "命令在当前关卡不可用",
      needAnalyze: "请先使用 analyze 命令分析文件",
      needDecode: "请先使用 decode 命令解密手稿"
    }
  },
  en: {
    compare: {
      description: "Compare connections between two files",
      usage: "Usage: compare <file1> <file2>",
      failed: "Comparison failed: %s",
      comparing: "Comparing files...\n\nFound following connections:",
      result: "1. Both files use similar symbol systems\n2. Number '1912' appears in both\n3. 'V0yN1cH' relates to manuscript author\n4. Combined analysis reveals possible password",
      notFound: "File not found",
      success: "Comparison complete!\n\nPassword found: V0yN1cH_1912\n\n[Hint] This password relates to the year when Voynich manuscript was discovered",
      notAvailable: "命令在当前关卡不可用",
      needAnalyze: "请先使用 analyze 命令分析文件",
      needDecode: "请先使用 decode 命令解密手稿"
    }
  }
}; 