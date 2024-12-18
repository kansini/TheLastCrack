<template>
  <div class="terminal">
    <div class="terminal-content" ref="contentRef">
      <div class="terminal-history">
        <div v-for="(line, index) in history" :key="index" class="terminal-line">
          <template v-if="line.type === 'input'">
            <span class="prompt">{{ formatPrompt(line.directory as string) }} $</span>
            <span class="input">{{ line.content }}</span>
          </template>
          <template v-else>
            <span class="output">{{ line.content }}</span>
          </template>
        </div>
      </div>
      
      <div class="terminal-input">
        <span class="prompt">{{ formatPrompt(currentDirectory) }} $</span>
        <input
          ref="inputRef"
          v-model="inputContent"
          @keydown.enter="handleCommand"
          @keydown.up.prevent="navigateHistory('up')"
          @keydown.down.prevent="navigateHistory('down')"
          type="text"
          spellcheck="false"
          autocomplete="off"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { useTerminalStore } from '@/stores/terminal';
import { 
  helpCommand, 
  lsCommand, 
  cdCommand, 
  catCommand, 
  clearCommand, 
  unlockCommand,
  decodeCommand,
  hintCommand,
  saveCommand,
  loadCommand,
  deleteSaveCommand,
  scanCommand,
  repairCommand,
  pingCommand,
  connectCommand,
  downloadCommand,
  psCommand,
  topCommand,
  analyzeCommand,
  killCommand,
  restoreCommand,
  whoamiCommand,
  sudoCommand,
  chmodCommand,
  tcpdumpCommand,
  wiresharkCommand,
  iptablesCommand,
  mailCommand,
  searchCommand,
  draftCommand,
  chatCommand,
  privateCommand,
  historyCommand,
  exitCommand,
  levelCommand,
  memdumpCommand,
  stringsCommand,
  volatilityCommand,
  loganalyzerCommand,
  timelineCommand,
  traceCommand
} from '@/game/commands/basic';
import { gameEngine } from '@/game/engine/GameEngine';

// 注册命令
gameEngine.registerCommand(helpCommand);
gameEngine.registerCommand(lsCommand);
gameEngine.registerCommand(cdCommand);
gameEngine.registerCommand(catCommand);
gameEngine.registerCommand(clearCommand);
gameEngine.registerCommand(unlockCommand);
gameEngine.registerCommand(decodeCommand);
gameEngine.registerCommand(hintCommand);
gameEngine.registerCommand(saveCommand);
gameEngine.registerCommand(loadCommand);
gameEngine.registerCommand(deleteSaveCommand);
gameEngine.registerCommand(scanCommand);
gameEngine.registerCommand(repairCommand);
gameEngine.registerCommand(pingCommand);
gameEngine.registerCommand(connectCommand);
gameEngine.registerCommand(downloadCommand);
gameEngine.registerCommand(psCommand);
gameEngine.registerCommand(topCommand);
gameEngine.registerCommand(analyzeCommand);
gameEngine.registerCommand(killCommand);
gameEngine.registerCommand(restoreCommand);
gameEngine.registerCommand(whoamiCommand);
gameEngine.registerCommand(sudoCommand);
gameEngine.registerCommand(chmodCommand);
gameEngine.registerCommand(tcpdumpCommand);
gameEngine.registerCommand(wiresharkCommand);
gameEngine.registerCommand(iptablesCommand);
gameEngine.registerCommand(mailCommand);
gameEngine.registerCommand(searchCommand);
gameEngine.registerCommand(draftCommand);
gameEngine.registerCommand(chatCommand);
gameEngine.registerCommand(privateCommand);
gameEngine.registerCommand(historyCommand);
gameEngine.registerCommand(exitCommand);
gameEngine.registerCommand(levelCommand);
gameEngine.registerCommand(memdumpCommand);
gameEngine.registerCommand(stringsCommand);
gameEngine.registerCommand(volatilityCommand);
gameEngine.registerCommand(loganalyzerCommand);
gameEngine.registerCommand(timelineCommand);
gameEngine.registerCommand(traceCommand);

const store = useTerminalStore();
const inputContent = ref('');
const contentRef = ref<HTMLElement>();
const inputRef = ref<HTMLInputElement>();

// 使用 store 中的命令历史
const historyIndex = ref(-1);
const tempInput = ref('');

// 计算属性获取命令历史
const commandHistory = computed(() => store.commandHistory);

const currentDirectory = computed(() => store.currentDirectory);
interface IHistoryLine {
  type: 'input' | 'output';
  content: string;
  timestamp: number;
  directory?: string
}
const history = computed<IHistoryLine[]>(() => store.history);

// 修改格式化提示符的函数
const formatPrompt = (path: string) => {
  if (!path || path === '~') return '~';
  // 直接返回完整路径，因为 path 已经包含了完整的路径（如 ~/network）
  return path;
};

const handleCommand = async () => {
  if (!inputContent.value.trim()) return;
  
  const command = inputContent.value;
  store.addLine('input', command, currentDirectory.value);
  
  // 重置历史索引
  historyIndex.value = commandHistory.value.length;
  
  try {
    const output = await gameEngine.executeCommand(command);
    if (output) {
      store.addLine('output', output);
    }
  } catch (error) {
    store.addLine('output', `Error: ${error}`);
  }
  
  inputContent.value = '';
  tempInput.value = '';
  await nextTick();
  scrollToBottom();
  inputRef.value?.focus();
};

const navigateHistory = (direction: 'up' | 'down') => {
  if (commandHistory.value.length === 0) return;
  
  if (direction === 'up') {
    // 如果是第一次按上箭头，保存当前输入
    if (historyIndex.value === commandHistory.value.length) {
      tempInput.value = inputContent.value;
    }
    
    // 向上导航历史记录
    if (historyIndex.value > 0) {
      historyIndex.value--;
      inputContent.value = commandHistory.value[historyIndex.value];
    }
  } else {
    // 向下导航历史记录
    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++;
      inputContent.value = commandHistory.value[historyIndex.value];
    } else if (historyIndex.value === commandHistory.value.length - 1) {
      // 恢复到最新的未提交输入
      historyIndex.value = commandHistory.value.length;
      inputContent.value = tempInput.value;
    }
  }
  
  // 将光标移动到输入末尾
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.selectionStart = inputContent.value.length;
      inputRef.value.selectionEnd = inputContent.value.length;
    }
  });
};

const scrollToBottom = () => {
  if (contentRef.value) {
    contentRef.value.scrollTop = contentRef.value.scrollHeight;
  }
};

onMounted(() => {
  inputRef.value?.focus();
});

// 确保输入框始终获得焦点
// const handleClick = () => {
//   inputRef.value?.focus();
// };
</script>

<style lang="scss" scoped>
.terminal {
  height: 100%;
  width: 100%;
  background-color: $bg-primary;
  color: $text-primary;
  font-family: $font-family-mono;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  
  .terminal-content {
    height: 100%;
    overflow-y: auto;
    padding: $spacing-md;
    
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: $bg-primary;
    }
    
    &::-webkit-scrollbar-thumb {
      background: $bg-scrollbar;
      border-radius: $border-radius;
    }
  }
  
  .terminal-history {
    padding-bottom: $spacing-sm;
  }
  
  .terminal-line {
    margin: $spacing-xs 0;
    white-space: pre-wrap;
    line-height: 1.4;
  }
  
  .terminal-input {
    display: flex;
    align-items: center;
    padding: $spacing-xs 0;
    
    input {
      flex: 1;
      background: transparent;
      border: none;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      padding: 0;
      outline: none;
      caret-color: $caret-color;
    }
  }
  
  .prompt {
    color: $prompt-color;
    margin-right: $spacing-xs;
    user-select: none;
  }
  
  .input {
    color: $text-primary;
  }
  
  .output {
    color: $text-secondary;
  }
}
</style> 