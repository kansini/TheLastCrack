import type { Language } from '@/stores/language';

export const level4Locales: Record<Language, {
  ps: {
    description: string;
    usage: string;
    processList: string;
    malwareFound: string;
    noMalware: string;
    failed: string;
    header: string;
    process: {
      name: string;
      status: string;
    };
  };
  kill: {
    description: string;
    usage: string;
    success: string;
    failed: string;
    invalidPid: string;
    notFound: string;
    terminated: string;
  };
}> = {
  zh: {
    ps: {
      description: "查看进程列表",
      usage: "Usage: ps",
      processList: "进程列表：",
      malwareFound: "发现可疑进程：PID %s",
      noMalware: "未发现可疑进程",
      failed: "命令不可用",
      header: "PID    名称          CPU    内存   状态",
      process: {
        name: "名称",
        status: "运行中"
      }
    },
    kill: {
      description: "终止进程",
      usage: "Usage: kill <PID>",
      success: "进程 %s 已终止",
      failed: "终止进程失败",
      invalidPid: "请输入有效的进程ID",
      notFound: "未找到进程 %s",
      terminated: "进程已终止。\n系统状态开始恢复正常...\n\n发现通关密码：D@t@B@se_2024"
    }
  },
  en: {
    ps: {
      description: "List processes",
      usage: "Usage: ps",
      processList: "Process list:",
      malwareFound: "Suspicious process found: PID %s",
      noMalware: "No suspicious process found",
      failed: "command not available",
      header: "PID    NAME          CPU    MEM    STATUS",
      process: {
        name: "name",
        status: "running"
      }
    },
    kill: {
      description: "Terminate process",
      usage: "Usage: kill <PID>",
      success: "Process %s terminated",
      failed: "Failed to terminate process",
      invalidPid: "Please enter a valid process ID",
      notFound: "Process %s not found",
      terminated: "Process terminated.\nSystem status recovering...\n\nPassword found: D@t@B@se_2024"
    }
  }
}; 