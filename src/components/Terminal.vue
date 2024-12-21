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
import {ref, onMounted, computed, nextTick} from "vue";
import {useTerminalStore} from "@/stores/terminal";
import {commands} from "@/game/commands";
import {
  matrixCommand,
  helloCommand,
  asciiCommand,
  starwarsCommand,
  rainbowCommand,
  countdownCommand
} from "@/game/commands/easter";

import {gameEngine} from "@/game/engine/GameEngine";

// 注册命令
Object.values(commands).forEach(command => {
  gameEngine.registerCommand(command);
});

// 注册彩蛋命令
gameEngine.registerCommand(matrixCommand);
gameEngine.registerCommand(helloCommand);
gameEngine.registerCommand(asciiCommand);
gameEngine.registerCommand(starwarsCommand);
gameEngine.registerCommand(rainbowCommand);
gameEngine.registerCommand(countdownCommand);

const store = useTerminalStore();
const inputContent = ref("");
const contentRef = ref<HTMLElement>();
const inputRef = ref<HTMLInputElement>();

// 使用 store 中的命令历史
const historyIndex = ref(-1);
const tempInput = ref("");

// 计算属性获取命令历史
const commandHistory = computed(() => store.commandHistory);

const currentDirectory = computed(() => store.currentDirectory);

interface IHistoryLine {
  type: "input" | "output";
  content: string;
  timestamp: number;
  directory?: string
}

const history = computed<IHistoryLine[]>(() => store.history);

// 修改格式化提示符的函数
const formatPrompt = (path: string) => {
  if (!path || path === "~") return "~";
  // 直接返回完整路径，因为 path 已经包含了完整的路径（如 ~/network）
  return path;
};

const handleCommand = async () => {
  if (!inputContent.value.trim()) return;

  const command = inputContent.value;
  store.addLine("input", command, currentDirectory.value);

  // 重置历史索引
  historyIndex.value = commandHistory.value.length;

  try {
    const output = await gameEngine.executeCommand(command);
    if (output) {
      store.addLine("output", output);
    }
  } catch (error) {
    store.addLine("output", `Error: ${error}`);
  }

  inputContent.value = "";
  tempInput.value = "";
  await nextTick();
  scrollToBottom();
  inputRef.value?.focus();
};

const navigateHistory = (direction: "up" | "down") => {
  if (commandHistory.value.length === 0) return;

  if (direction === "up") {
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

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(0, 255, 0, 0.1);
    animation: scan 8s linear infinite;
    pointer-events: none;
  }

  @keyframes scan {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(100vh);
    }
  }

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

    // Matrix 效果
    &[class*="matrix-rain-"] {
      color: #00ff00;
      text-shadow: 0 0 5px #00ff00;
      font-family: $font-family-mono;
      display: block;
      animation: matrix-drop 2s forwards;
      opacity: 0;
    }

    // Matrix 消息效果
    &.matrix-message {
      color: #00ff00;
      text-shadow: 0 0 5px #00ff00;
      animation: matrix-glow 1.5s infinite;
    }

    // Hello World 效果
    &.hello {
      color: #00ffff;
      text-shadow: 0 0 5px #00ffff;
    }

    // Star Wars 效果
    &.starwars {
      color: #ffd700;
      animation: scroll 20s linear;
      transform-origin: 50% 100%;
    }

    // Rainbow 效果
    &.rainbow {
      background: linear-gradient(to right,
          #ff0000, #ff7f00, #ffff00, #00ff00,
          #0000ff, #4b0082, #8f00ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: rainbow 5s linear infinite;
    }

    // Countdown 效果
    &.countdown {
      color: #ff0000;
      text-shadow: 0 0 5px #ff0000;
      animation: pulse 1s infinite;
    }

    // Countdown 效果
    &.countdown-init {
      color: #ffff00;
      text-shadow: 0 0 5px #ffff00;
    }

    &.countdown-warning {
      color: #ff0000;
      text-shadow: 0 0 5px #ff0000;
      animation: warning-flash 0.5s infinite;
    }

    &[class*="countdown-"] {
      font-size: 1.2em;
      font-weight: bold;
      text-align: center;
      animation: countdown-pulse 1s ease-in-out;
    }

    &.countdown-final-warning {
      color: #ff0000;
      text-shadow: 0 0 10px #ff0000;
      font-size: 1.3em;
      animation: danger-flash 0.2s infinite;
    }

    &.countdown-abort {
      color: #ffa500;
      text-shadow: 0 0 5px #ffa500;
    }

    &.countdown-cancel {
      color: #00ff00;
      text-shadow: 0 0 5px #00ff00;
    }

    &.countdown-safe {
      color: #00ffff;
      text-shadow: 0 0 5px #00ffff;
      animation: safe-glow 2s infinite;
    }
  }
}

@keyframes flicker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}

@keyframes scroll {
  0% {
    transform: perspective(300px) rotateX(20deg) translateY(100%);
  }
  100% {
    transform: perspective(300px) rotateX(20deg) translateY(-100%);
  }
}

@keyframes rainbow {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes matrix-drop {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0.7;
  }
}

@keyframes matrix-glow {
  0% {
    text-shadow: 0 0 5px #00ff00;
  }
  50% {
    text-shadow: 0 0 20px #00ff00;
  }
  100% {
    text-shadow: 0 0 5px #00ff00;
  }
}

@keyframes warning-flash {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes countdown-pulse {
  0% {
    transform: scale(1.5);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}

@keyframes danger-flash {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes safe-glow {
  0% {
    text-shadow: 0 0 5px #00ffff;
  }
  50% {
    text-shadow: 0 0 20px #00ffff;
  }
  100% {
    text-shadow: 0 0 5px #00ffff;
  }
}
</style> 