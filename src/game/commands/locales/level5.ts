import type { Language } from '@/stores/language';

export const level5Locales: Record<Language, {
  ping: {
    description: string;
    usage: string;
    success: string;
    failed: string;
    connecting: string;
    detail: {
      pinging: string;
      reply: string;
      stats: {
        title: string;
        packets: string;
        times: string;
      };
      hint: string;
    };
  };
  connect: {
    description: string;
    usage: string;
    success: string;
    failed: string;
    wrongPassword: string;
    needPing: string;
  };
  download: {
    description: string;
    usage: string;
    failed: string;
    needConnect: string;
    downloadComplete: string;
  };
}> = {
  zh: {
    ping: {
      description: "测试网络连接",
      usage: "Usage: ping <IP>",
      success: "服务器 %s 可以访问",
      failed: "无法连接到服务器 %s",
      connecting: "正在连接服务器...",
      detail: {
        pinging: "正在 Ping %s...",
        reply: "来自 %s 的回复: 时间<1ms",
        stats: {
          title: "%s 的 Ping 统计信息:",
          packets: "    数据包: 已发送 = 3，已接收 = 3，丢失 = 0 (0% 丢失)",
          times: "往返行程的估计时间(以毫秒为单位):\n    最短 = 0ms，最长 = 1ms，平均 = 0ms"
        },
        hint: "[提示] 服务器在线，可以尝试使用 connect 命令连接"
      }
    },
    connect: {
      description: "连接到远程服务器",
      usage: "Usage: connect <IP> <用户名> <密码>",
      success: "成功连接到服务器\n\n发现一个可疑文件：secret_data, 使用 download 命令" ,
      failed: "连接失败",
      wrongPassword: "密码错误",
      needPing: "请先使用 ping 命令测试连接"
    },
    download: {
      description: "下载文件",
      usage: "Usage: download <文件名>",
      failed: "下载失败：%s",
      needConnect: "请先连接到服务器",
      downloadComplete: "文件下载完成。\n\n发现通关密码：C0nnected@2024"
    }
  },
  en: {
    ping: {
      description: "Test network connection",
      usage: "Usage: ping <IP>",
      success: "Server %s is accessible",
      failed: "Cannot connect to server %s",
      connecting: "Connecting to server...",
      detail: {
        pinging: "Pinging %s...",
        reply: "Reply from %s: time<1ms",
        stats: {
          title: "Ping statistics for %s:",
          packets: "    Packets: Sent = 3, Received = 3, Lost = 0 (0% loss)",
          times: "Approximate round trip times in milli-seconds:\n    Minimum = 0ms, Maximum = 1ms, Average = 0ms"
        },
        hint: "[Hint] Server is online, try using connect command"
      }
    },
    connect: {
      description: "Connect to remote server",
      usage: "Usage: connect <IP> <username> <password>",
      success: "Successfully connected to server\n\nFound suspicious file: secret_data, use download command",
      failed: "Connection failed",
      wrongPassword: "Wrong password",
      needPing: "Please use ping command first to test connection"
    },
    download: {
      description: "Download file",
      usage: "Usage: download <filename>",
      failed: "Download failed: %s",
      needConnect: "Please connect to server first",
      downloadComplete: "File download complete.\n\nPassword found: C0nnected@2024"
    }
  }
}; 