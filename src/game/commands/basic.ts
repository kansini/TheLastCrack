import type { Command } from '@/types/terminal';
import { useGameStore } from '@/stores/game';
import { getCurrentLevelData } from '@/game/levels';
import { useTerminalStore } from '@/stores/terminal';
import { useSaveStore } from '@/stores/save';

export const helpCommand: Command = {
  name: 'help',
  description: '显示所有可用命令',
  execute: () => {
    return `可用命令：
  help - 显示此帮助信息
  ls - 列出当前目录文件
  cd <目录> - 切换目录
  cat <文件> - 查看文件内容
  clear - 清除终端屏幕
  decode <text> - 解密文本
  unlock <密码> - 使用密码解锁下一关
  scan <文件> - 扫描分析文件
  repair <源文件> <备份文件> - 修复损坏的文件
  ping <IP> - 测试网络连接
  connect <IP> <用户名> <密码> - 连接服务器
  download <文件名> - 下载服务器文件
  save <名称> - 保存游戏进度
  load [ID] - 查看或加载存档
  deletesave <ID> - 删除存档`;
  }
};

export const lsCommand: Command = {
  name: 'ls',
  description: '列出当前目录文件',
  execute: (args: string[]) => {
    const gameStore = useGameStore();
    const levelData = getCurrentLevelData(gameStore.currentLevel);
    const currentDir = gameStore.currentDirectory;
    
    // 确保目录存在
    const dirToCheck = currentDir === '~' ? '~' : `${currentDir}`;
    if (!levelData.fileSystem[dirToCheck]) {
      return `ls: 无法访问 '${currentDir}': 目录不存在`;
    }
    
    const files = levelData.fileSystem[dirToCheck];
    
    // 检查是否使用了 -a 参数
    const showHidden = args.includes('-a');
    
    // 过滤文件列表
    const filteredFiles = files.filter(file => {
      if (showHidden) {
        return true;
      }
      return !file.startsWith('.');
    });
    
    return filteredFiles.join('\n');
  }
};

export const cdCommand: Command = {
  name: 'cd',
  description: '切换目录',
  execute: (args: string[]) => {
    const gameStore = useGameStore();
    const path = args[0] || '~';
    const currentDir = gameStore.currentDirectory;
    const levelData = getCurrentLevelData(gameStore.currentLevel);
    
    // 处理特殊路径
    if (path === '~') {
      gameStore.setCurrentDirectory('~');
      return '';
    }
    
    if (path === '..') {
      if (currentDir === '~') {
        return '已经在根目录了';
      }
      // 移除最后一个目录
      const parts = currentDir.split('/').filter(p => p && p !== '~');
      if (parts.length === 0) {
        gameStore.setCurrentDirectory('~');
      } else {
        parts.pop();
        const newPath = parts.length === 0 ? '~' : `~/${parts.join('/')}`;
        gameStore.setCurrentDirectory(newPath);
      }
      return '';
    }
    
    // 处理绝对路径（以 ~ 开头）
    if (path.startsWith('~/')) {
      const targetPath = path;
      const dirToCheck = targetPath === '~' ? '~' : `${targetPath}`;
      if (levelData.fileSystem[dirToCheck]) {
        gameStore.setCurrentDirectory(targetPath);
        return '';
      }
      return `cd: ${path}: 目录不存在`;
    }
    
    // 处理相对路径
    let targetPath: string;
    if (currentDir === '~') {
      targetPath = `~/${path}`;
    } else {
      targetPath = `${currentDir}/${path}`;
    }
    
    // 检查目录是否存在
    const dirToCheck = targetPath === '~' ? '~' : `${targetPath}`;
    if (levelData.fileSystem[dirToCheck]) {
      gameStore.setCurrentDirectory(targetPath);
      return '';
    }
    
    return `cd: ${path}: 目录不存在`;
  }
};

export const catCommand: Command = {
  name: 'cat',
  description: '查看文件内容',
  execute: (args: string[]) => {
    if (!args.length) {
      return 'Usage: cat <filename>';
    }
    
    const gameStore = useGameStore();
    const levelData = getCurrentLevelData(gameStore.currentLevel);
    const filename = args[0];
    
    const fileContent = levelData.fileContents[filename];
    if (!fileContent) {
      return `cat: ${filename}: 文件不存在`;
    }

    // 如果查看的是 .secret 文件，标记任务完成
    if (filename === '.secret') {
      gameStore.markSecretFound();
    }

    // 如果查看了第三关的关键文件，标记任务完成
    if (gameStore.currentLevel === 3 && 
        (filename === 'diary.txt' || filename === 'access_log.txt' || filename === '.private')) {
      gameStore.completeTask('find_key');
    }
    
    return fileContent;
  }
};

export const clearCommand: Command = {
  name: 'clear',
  description: '清除终端屏幕',
  execute: () => {
    const store = useTerminalStore();
    store.clearHistory();
    return '';
  }
};

export const unlockCommand: Command = {
  name: 'unlock',
  description: '使用密码解锁下一关',
  execute: (args: string[]) => {
    if (!args.length) {
      return 'Usage: unlock <password>';
    }

    const gameStore = useGameStore();
    const level = gameStore.currentLevel;
    const password = args.join(' ');

    switch (level) {
      case 1:
        // 第一关的逻辑
        if (!gameStore.completedTasks.includes('find_secret')) {
          return '你还没有找到必要的线索！';
        }
        if (password.toUpperCase() === 'MOON_LIGHT') {
          gameStore.completeLevel();
          return '密码正确！欢迎进入下一关...';
        }
        break;

      case 2:
        // 第二关的逻辑
        if (!gameStore.completedTasks.includes('decode_text')) {
          return '你需要先使用 decode 命令解密文本！';
        }
        if (password === 'Old Flood') {
          gameStore.completeLevel();
          return '密码正确！欢迎进入下一关...';
        }
        break;

      case 3:
        // 第三关的逻辑
        if (!gameStore.completedTasks.includes('find_key')) {
          return '你需要先查看相关文件获取密码线索！';
        }
        if (password === 'HACK-0401') {
          gameStore.completeLevel();
          return '密码正确！欢迎进入下一关...';
        }
        break;

      case 4:
        if (!gameStore.completedTasks.includes('repair_data')) {
          return '你需要先修复损坏的数据文件！';
        }
        if (password === 'D@t@B@se_2024') {
          gameStore.completeLevel();
          return '密码正确！欢迎进入下一关...';
        }
        break;

      case 5:
        if (!gameStore.completedTasks.includes('get_data')) {
          return '你需要先从服务器下载数据！';
        }
        if (password === 'C0nnected@2024') {
          gameStore.completeLevel();
          return '密码正确！欢迎进入下一关...';
        }
        break;

      // ... 其他关卡的逻辑
    }

    return '密码错误，请继续寻找线索。';
  }
};

export const hintCommand: Command = {
  name: 'hint',
  description: '获取当前关卡的提示（隐藏命令）',
  execute: () => {
    const gameStore = useGameStore();
    const level = gameStore.currentLevel;
    
    switch (level) {
      case 1:
        return '提示：使用 ls -a 命令可以查看隐藏文件';
      case 2:
        return `提示：
1. 加密文本 "Pme!Gmppe!" 中的每个字母都被向后移动了一位
2. 例如：'T' 变成了 'U', 'h' 变成了 'i'
3. 解密后的文本 "Old Flood"
4. 试试在工具目录中找解密工具`;
      case 3:
        return `提示：
1. 使用 cd <目录名> 进入目录，使用 cd .. 返回上级目录
2. 密钥被分成了两个部分（XXXX-XXXX 格式）
3. 第一部分在 .keys 目录中的 key_fragment_1 文件里
4. 第���部分在 .keys 目录中的 key_fragment_2 文件里
5. 使用 ls -a 可以看到隐藏的 .keys 目录
6. 进入目录后使用 cat 命令查看文件内容
7. 将两个密钥碎片按 XXXX-XXXX 格式组合
8. 最后使用 unlock 命令输入完整密钥`;
      case 4:
        return `提示：
1. 使用 scan corrupted_data.db 分析损坏的文件
2. 检查 logs 目录下的日志文件，找出数据库损坏的具体时间
3. 在 backup 目录中找到损坏时间之前的最后一个备份
4. 使用 repair 命令修复文件：repair corrupted_data.db backup_0401.bak
5. 修复后的数据就是解锁密码`;
      default:
        return '当前关卡暂无提示';
    }
  }
};

export const decodeCommand: Command = {
  name: 'decode',
  description: '解密文本',
  execute: (args: string[]) => {
    if (!args.length) {
      return 'Usage: decode <text>';
    }

    const gameStore = useGameStore();
    const text = args.join(' ');
    
    // 简单的解密逻辑：每个字母向前移动一位
    const decrypted = text.split('').map(char => {
      if (/[A-Za-z]/.test(char)) {
        const code = char.charCodeAt(0);
        return String.fromCharCode(code - 1);
      }
      if (char === '!') return ' '; // 处理感叹号
      return char;
    }).join('');

    // 如果解密的是目标文本，标记任务完成
    if (text === 'Pme!Gmppe!') {
      gameStore.completeTask('decode_text');
      return `解密成功！解密结果：${decrypted}\n恭喜你发现了密码！`;
    }

    return `解密结果：${decrypted}`;
  }
};

export const saveCommand: Command = {
  name: 'save',
  description: '保存游戏进度',
  execute: (args: string[]) => {
    if (!args.length) {
      return 'Usage: save <存档名称>';
    }

    const saveStore = useSaveStore();
    const saveName = args.join(' ');
    const saveId = saveStore.createSave(saveName);

    return `游戏已保存到存档 #${saveId}: ${saveName}`;
  }
};

export const loadCommand: Command = {
  name: 'load',
  description: '加载游戏存档',
  execute: (args: string[]) => {
    if (!args.length) {
      const saveStore = useSaveStore();
      const saves = saveStore.getSaves();
      if (saves.length === 0) {
        return '没有找到任何存档';
      }
      return `可用存档：\n${saves.map(s => 
        `#${s.id}: ${s.name} (${new Date(s.save.timestamp).toLocaleString()})`
      ).join('\n')}\n\n使用 load <存档ID> 来加载存档`;
    }

    const saveId = parseInt(args[0]);
    if (isNaN(saveId)) {
      return '请输入有效的存档ID';
    }

    const saveStore = useSaveStore();
    if (saveStore.loadSave(saveId)) {
      return '存档加载成功！';
    } else {
      return `未找到存档 #${saveId}`;
    }
  }
};

export const deleteSaveCommand: Command = {
  name: 'deletesave',
  description: '删除游戏存档',
  execute: (args: string[]) => {
    if (!args.length) {
      return 'Usage: deletesave <存档ID>';
    }

    const saveId = parseInt(args[0]);
    if (isNaN(saveId)) {
      return '请输入有效的存档ID';
    }

    const saveStore = useSaveStore();
    saveStore.deleteSave(saveId);
    return `存档 #${saveId} 已删除`;
  }
};

export const scanCommand: Command = {
  name: 'scan',
  description: '扫描分析文件',
  execute: (args: string[]) => {
    if (!args.length) {
      return 'Usage: scan <filename>';
    }

    const gameStore = useGameStore();
    const levelData = getCurrentLevelData(gameStore.currentLevel);
    const filename = args[0];

    if (!levelData.fileContents[filename]) {
      return `scan: ${filename}: 文件不存在`;
    }

    if (filename === 'corrupted_data.db') {
      gameStore.completeTask('analyze_corrupt');
      return `扫描结果：
1. 文件状态：已损坏
2. 损坏时间：2024-04-01 23:59:59
3. 损坏部分：字符替换
4. 建议操作：使用正确的备份文件修复
5. 备份时间：在损坏发生之前`;
    }

    return `扫描结果：文件完整，无需修复`;
  }
};

export const repairCommand: Command = {
  name: 'repair',
  description: '修复损坏的文件',
  execute: (args: string[]) => {
    if (args.length !== 2) {
      return 'Usage: repair <源文件> <备份文件>';
    }

    const gameStore = useGameStore();
    const levelData = getCurrentLevelData(gameStore.currentLevel);
    const [sourceFile, backupFile] = args;

    if (!levelData.fileContents[sourceFile] || !levelData.fileContents[backupFile]) {
      return '指定的文件不存在';
    }

    if (sourceFile === 'corrupted_data.db' && backupFile === 'backup_0401.bak') {
      gameStore.completeTask('repair_data');
      return `修复成功！
原始数据已恢复：D@t@B@se_2024
这就是你需要的密码！`;
    }

    return '修复失败：备份文件不匹配或已损坏';
  }
};

export const pingCommand: Command = {
  name: 'ping',
  description: '测试网络连接',
  execute: (args: string[]) => {
    if (!args.length) {
      return 'Usage: ping <IP>';
    }

    const ip = args[0];
    if (ip === '192.168.1.200') {
      return `正在 Ping ${ip}...
来自 192.168.1.200 的回复: 时间<1ms
来自 192.168.1.200 的回复: 时间<1ms
来自 192.168.1.200 的回复: 时间<1ms

192.168.1.200 的 Ping 统计信息:
    数包: 已发送 = 3，已接收 = 3，丢失 = 0 (0% 丢失)
往返行程的估计时间(以毫秒为单位):
    最短 = 0ms，最长 = 1ms，平均 = 0ms`;
    }

    return `Ping 请求找不到主机 ${ip}。请检查该名称，然后重试。`;
  }
};

export const connectCommand: Command = {
  name: 'connect',
  description: '连接远程服务器',
  execute: (args: string[]) => {
    if (args.length !== 3) {
      return 'Usage: connect <IP> <username> <password>';
    }

    const gameStore = useGameStore();
    const [ip, username, password] = args;

    if (ip === '192.168.1.200' && username === 'admin' && password === 'Netw0rk@2024') {
      gameStore.completeTask('connect_server');
      return '连接成功！服务器已就绪。\n可以使用 download 命令下载数据。';
    }

    return '连接失败：认证错误。请检查 IP、用户名和密码。';
  }
};

export const downloadCommand: Command = {
  name: 'download',
  description: '下载服务器数据',
  execute: (args: string[]) => {
    if (!args.length) {
      return 'Usage: download <filename>';
    }

    const gameStore = useGameStore();
    if (!gameStore.completedTasks.includes('connect_server')) {
      return '错误：未连接到服务器！请先使用 connect 命令建立连接。';
    }

    const filename = args[0];
    if (filename === 'secret_data') {
      gameStore.completeTask('get_data');
      return `正在下载 ${filename}...
下载完成！
文件内容：C0nnected@2024
这是通关密码！`;
    }

    return `错误：文件 '${filename}' 不存在或无法访问。`;
  }
}; 