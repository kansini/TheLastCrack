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
  status - 查看当前任务状态
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
    if (!levelData.fileSystem[currentDir]) {
      return `ls: 无法访问 '${currentDir}': 目录不存在`;
    }
    
    const files = levelData.fileSystem[currentDir];
    
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
    
    // 处理特殊路径
    if (path === '~') {
      gameStore.setCurrentDirectory('~');
      return '';
    }
    
    if (path === '..') {
      if (currentDir === '~') {
        return ''; // 已经在根目录，不做任何操作
      }
      // 移除最后一个目录
      const parts = currentDir.split('/');
      parts.pop();
      // 如果只剩下 ~ 或空，则返回根目录
      const newPath = parts.length <= 1 ? '~' : parts.join('/');
      gameStore.setCurrentDirectory(newPath);
      return '';
    }
    
    // 构建新路径
    let newPath: string;
    if (currentDir === '~') {
      newPath = `~/${path}`;
    } else {
      newPath = `${currentDir}/${path}`;
    }
    
    // 检查目录是否存在
    const levelData = getCurrentLevelData(gameStore.currentLevel);
    if (levelData.fileSystem[newPath]) {
      gameStore.setCurrentDirectory(newPath);
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

    // 如果查看的是密钥碎片，标记任务完成
    if (filename === 'key_fragment_1' || filename === 'key_fragment_2') {
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
        if (password === 'The Code World') {
          gameStore.completeLevel();
          return '密码正确！欢迎进入下一关...';
        }
        break;

      case 3:
        // 第三关的逻辑
        if (!gameStore.completedTasks.includes('find_key')) {
          return '你需要先找到密钥碎片！';
        }
        if (password === 'HACK-0401') {
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
1. 加密文本 "Uif!Dpef!Xpsme!" 中的每个字母都被向后移动了一位
2. 例如：'T' 变成了 'U', 'h' 变成了 'i'
3. 解密后的文本是 "The Code World!"
4. 试试在工具目录中寻找解密工具`;
      case 3:
        return `提示：
1. 使用 cd <目录名> 进入目录，使用 cd .. 返回上级目录
2. 密钥被分成了两个部分（XXXX-XXXX 格式）
3. 第一部分在 .keys 目录中的 key_fragment_1 文件里
4. 第二部分在 .keys 目录中的 key_fragment_2 文件里
5. 使用 ls -a 可以看到隐藏的 .keys 目录
6. 进入目录后使用 cat 命令查看文件内容
7. 将两个密钥碎片按 XXXX-XXXX 格式组合
8. 最后使用 unlock 命令输入完整密钥`;
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
    if (text === 'Uif!Dpef!Xpsme!') {
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