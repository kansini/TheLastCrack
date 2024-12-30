<template>
  <div class="virtual-keyboard"
       :class="{ 'is-visible': visible }"
       :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
       @mousedown.prevent
       @touchstart.prevent>
    <!-- 顶部栏 -->
    <div class="keyboard-header">
      <div class="header-placeholder"></div>
      <div class="drag-handle"
           @mousedown="startDrag"
           @touchstart="startDrag">
        <div class="drag-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="close-button" @click="$emit('close')">×</div>
    </div>

    <div class="keyboard-container" @mousedown.prevent @touchstart.prevent>
      <!-- 功能键区域 -->
      <div class="keyboard-row function-keys">
        <div v-for="item in functionKeys"
             :key="item.key"
             class="key function-key"
             :style="{ flex: item.width }"
             :class="{ 'key-active': activeKeys.includes(item.key) }"
             @click="onKeyClick(item.key)">
          {{ item.key }}
        </div>
      </div>

      <!-- 主键区域 -->
      <div class="keyboard-main">
        <div v-for="(row, rowIndex) in mainKeys"
             :key="rowIndex"
             class="keyboard-row">
          <div v-for="item in row"
               :key="item.key"
               class="key"
               :style="{ flex: item.width }"
               :class="{
                 'key-active': activeKeys.includes(item.key) || 
                              (item.key === 'Enter' && activeKeys.includes('Enter')) ||
                              (item.key === 'Delete' && activeKeys.includes('Backspace')) ||
                              (item.key === 'Space' && activeKeys.includes(' ')) ||
                              (item.key === '⌘' && isCommandPressed) ||
                              (item.key === 'option' && isOptionPressed) ||
                              (item.key === 'control' && isControlPressed)
               }"
               @click="onKeyClick(item.key)">
            {{ item.key }}
          </div>
        </div>

        <!-- 底部区域 -->
        <div class="keyboard-row bottom-row">
          <div class="key" style="flex: 1.25" @click="onKeyClick('fn')">fn</div>
          <div class="key" style="flex: 1.25"
               :class="{ 'key-active': isControlPressed }"
               @click="onKeyClick('control')">control
          </div>
          <div class="key" style="flex: 1.25"
               :class="{ 'key-active': isOptionPressed }"
               @click="onKeyClick('option')">option
          </div>
          <div class="key" style="flex: 1.25"
               :class="{ 'key-active': isCommandPressed }"
               @click="onKeyClick('⌘')">⌘
          </div>
          <div class="key" style="flex: 5"
               :class="{ 'key-active': activeKeys.includes('Space') }"
               @click="onKeyClick('Space')">space
          </div>
          <div class="key" style="flex: 1.25"
               :class="{ 'key-active': isCommandPressed }"
               @click="onKeyClick('⌘')">⌘
          </div>
          <div class="key" style="flex: 1.25"
               :class="{ 'key-active': isOptionPressed }"
               @click="onKeyClick('option')">option
          </div>
          <div class="arrows" style="flex: 1.5">
            <div class="key key-arrow">←</div>
            <div class="arrows-updown">
              <div class="key key-arrow">↑</div>
              <div class="key key-arrow">↓</div>
            </div>
            <div class="key key-arrow">→</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from "vue"

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["input", "close"])

// 活动按键状态
const activeKeys = ref<string[]>([])

// 键盘布局数据
const functionKeys = [
  {key: "Esc", width: 1},
  {key: "F1", width: 1},
  {key: "F2", width: 1},
  {key: "F3", width: 1},
  {key: "F4", width: 1},
  {key: "F5", width: 1},
  {key: "F6", width: 1},
  {key: "F7", width: 1},
  {key: "F8", width: 1},
  {key: "F9", width: 1},
  {key: "F10", width: 1},
  {key: "F11", width: 1},
  {key: "F12", width: 1}
]

const mainKeys = [
  // 第一行 - 数字键
  [
    {key: "`", width: 1},
    {key: "1", width: 1},
    {key: "2", width: 1},
    {key: "3", width: 1},
    {key: "4", width: 1},
    {key: "5", width: 1},
    {key: "6", width: 1},
    {key: "7", width: 1},
    {key: "8", width: 1},
    {key: "9", width: 1},
    {key: "0", width: 1},
    {key: "-", width: 1},
    {key: "=", width: 1},
    {key: "Delete", width: 1.5}
  ],
  // 第二行 - QWERTY
  [
    {key: "Tab", width: 1.5},
    {key: "Q", width: 1},
    {key: "W", width: 1},
    {key: "E", width: 1},
    {key: "R", width: 1},
    {key: "T", width: 1},
    {key: "Y", width: 1},
    {key: "U", width: 1},
    {key: "I", width: 1},
    {key: "O", width: 1},
    {key: "P", width: 1},
    {key: "[", width: 1},
    {key: "]", width: 1},
    {key: "\\", width: 1.5}
  ],
  // 第三行 - ASDF
  [
    {key: "Caps", width: 1.75},
    {key: "A", width: 1},
    {key: "S", width: 1},
    {key: "D", width: 1},
    {key: "F", width: 1},
    {key: "G", width: 1},
    {key: "H", width: 1},
    {key: "J", width: 1},
    {key: "K", width: 1},
    {key: "L", width: 1},
    {key: ";", width: 1},
    {key: "'", width: 1},
    {key: "Enter", width: 2.25}
  ],
  // 第四行 - ZXCV
  [
    {key: "Shift", width: 2.25},
    {key: "Z", width: 1},
    {key: "X", width: 1},
    {key: "C", width: 1},
    {key: "V", width: 1},
    {key: "B", width: 1},
    {key: "N", width: 1},
    {key: "M", width: 1},
    {key: ",", width: 1},
    {key: ".", width: 1},
    {key: "/", width: 1},
    {key: "Shift", width: 2.75}
  ]
]

// 键盘映射表
const keyMap: Record<string, string> = {
  // 基础按键
  " ": "Space",
  "Escape": "Esc",

  // Meta 键 (Command/Windows)
  "Meta": "⌘",
  "MetaLeft": "⌘",
  "MetaRight": "⌘",
  "OS": "⌘",           // Windows 键
  "OSLeft": "⌘",
  "OSRight": "⌘",

  // Alt/Option 键
  "Alt": "option",
  "AltLeft": "option",
  "AltRight": "option",

  // Control 键
  "Control": "control",
  "ControlLeft": "control",
  "ControlRight": "control",

  // 其他功能键
  "Enter": "Enter",
  "Tab": "Tab",
  "Backspace": "Delete",
  "Delete": "Del",

  // 方向键
  "ArrowUp": "↑",
  "ArrowDown": "↓",
  "ArrowLeft": "←",
  "ArrowRight": "→",

  // 字母键 (确保大小写映射)
  "KeyA": "A", "KeyB": "B", "KeyC": "C",
  "KeyD": "D", "KeyE": "E", "KeyF": "F",
  "KeyG": "G", "KeyH": "H", "KeyI": "I",
  "KeyJ": "J", "KeyK": "K", "KeyL": "L",
  "KeyM": "M", "KeyN": "N", "KeyO": "O",
  "KeyP": "P", "KeyQ": "Q", "KeyR": "R",
  "KeyS": "S", "KeyT": "T", "KeyU": "U",
  "KeyV": "V", "KeyW": "W", "KeyX": "X",
  "KeyY": "Y", "KeyZ": "Z"
}

// 添加大小写状态
const isCapsLock = ref(false)
const isShiftPressed = ref(false)
const isCommandPressed = ref(false)
const isOptionPressed = ref(false)
const isControlPressed = ref(false)

// 修改按键点击处理
const onKeyClick = (key: string) => {
  // 仅在需要时阻止事件冒泡和默认行为
  if (key !== "⌘" && key !== "control" && key !== "option") {
    event?.preventDefault();
    event?.stopPropagation();
  }

  let value = key

  switch (key) {
    case "Space":
      value = " "
      break
    case "Enter":
      emit("input", "Enter") // 发送 Enter 事件
      return
    case "Tab":
      value = "\t"
      break
    case "Delete":
    case "Backspace":
      emit("input", "Backspace")
      return
    case "Caps":
      isCapsLock.value = !isCapsLock.value
      return
    case "Shift":
      isShiftPressed.value = !isShiftPressed.value
      return
    case "control":
      isControlPressed.value = !isControlPressed.value
      return
    case "option":
      isOptionPressed.value = !isOptionPressed.value
      return
    case "⌘":
      isCommandPressed.value = !isCommandPressed.value
      return
    case "fn":
    case "Esc":
    case "F1":
    case "F2":
    case "F3":
    case "F4":
    case "F5":
    case "F6":
    case "F7":
    case "F8":
    case "F9":
    case "F10":
    case "F11":
    case "F12":
    case "↑":
    case "↓":
    case "←":
    case "→":
      // 修饰键和功能键不产生输入
      return
    default:
      // 如果有修饰键被按下，发送组合键事件
      if (isCommandPressed.value || isOptionPressed.value || isControlPressed.value) {
        const modifiers = []
        if (isCommandPressed.value) modifiers.push("Meta")
        if (isOptionPressed.value) modifiers.push("Alt")
        if (isControlPressed.value) modifiers.push("Control")

        emit("input", {
          key: key.toLowerCase(),
          modifiers,
          type: "shortcut"
        })

        // 发送组合键后重置修饰键状态
        isCommandPressed.value = false
        isOptionPressed.value = false
        isControlPressed.value = false
        return
      }

      // 处理普通字符输入
      if (key.length === 1) {
        const isLetter = /^[A-Za-z]$/.test(key)
        if (isLetter) {
          const shouldBeUpperCase = isCapsLock.value !== isShiftPressed.value
          value = shouldBeUpperCase ? key.toUpperCase() : key.toLowerCase()
        } else if (isShiftPressed.value) {
          // 处理数字键上的特殊字符
          const shiftSymbols: Record<string, string> = {
            "1": "!",
            "2": "@",
            "3": "#",
            "4": "$",
            "5": "%",
            "6": "^",
            "7": "&",
            "8": "*",
            "9": "(",
            "0": ")",
            "-": "_",
            "=": "+",
            "[": "{",
            "]": "}",
            "\\": "|",
            ";": ":",
            "'": "\"",
            ",": "<",
            ".": ">",
            "/": "?",
            "`": "~"
          }
          value = shiftSymbols[key] || key
        }
      }
  }

  if (value) {
    emit("input", value)
  }
}

// 修改键盘事件处理
const handleKeyDown = (e: KeyboardEvent) => {
  // 如果有组合键，不阻止默认行为
  if (!e.metaKey && !e.ctrlKey && !e.altKey && e.key === "Tab") {
    e.preventDefault()
  }

  const key = keyMap[e.code] || keyMap[e.key] || e.key.toUpperCase()

  // 更新修饰键状态
  if (e.metaKey) isCommandPressed.value = true
  if (e.altKey) isOptionPressed.value = true
  if (e.ctrlKey) isControlPressed.value = true

  if (!activeKeys.value.includes(key)) {
    activeKeys.value.push(key)
  }

  // 如果键盘可见且按下了修饰键，处理组合键
  if (props.visible && (e.metaKey || e.altKey || e.ctrlKey)) {
    const modifiers = []
    if (e.metaKey) modifiers.push("Meta")
    if (e.altKey) modifiers.push("Alt")
    if (e.ctrlKey) modifiers.push("Control")

    // 使用 e.code 来确保正确的键值
    const keyToEmit = e.code.startsWith("Key") ? e.code.slice(3).toLowerCase() : key.toLowerCase()

    if (!["meta", "alt", "control", "⌘", "option"].includes(keyToEmit.toLowerCase())) {
      // 对于复制操作，不阻止默认行为
      if (!(e.metaKey && keyToEmit.toLowerCase() === "c")) {
        e.preventDefault()
      }
      emit("input", {
        key: keyToEmit,
        modifiers,
        type: "shortcut"
      })
    }
  }
}

const handleKeyUp = (e: KeyboardEvent) => {
  const key = keyMap[e.code] || keyMap[e.key] || e.key.toUpperCase()

  // 处理修饰键状态
  if (e.metaKey) {
    isCommandPressed.value = false
  }
  if (e.altKey) {
    isOptionPressed.value = false
  }
  if (e.ctrlKey) {
    isControlPressed.value = false
  }

  activeKeys.value = activeKeys.value.filter(k => k !== key)
}

// 拖动相关
const position = ref({x: 0, y: 0})
const isDragging = ref(false)
const dragOffset = ref({x: 0, y: 0})

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  const pos = "touches" in e ? e.touches[0] : e
  dragOffset.value = {
    x: pos.clientX - position.value.x,
    y: pos.clientY - position.value.y
  }

  document.addEventListener("mousemove", handleDrag)
  document.addEventListener("touchmove", handleDrag)
  document.addEventListener("mouseup", stopDrag)
  document.addEventListener("touchend", stopDrag)
}

const handleDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return

  const pos = "touches" in e ? e.touches[0] : e
  position.value = {
    x: pos.clientX - dragOffset.value.x,
    y: pos.clientY - dragOffset.value.y
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener("mousemove", handleDrag)
  document.removeEventListener("touchmove", handleDrag)
  document.removeEventListener("mouseup", stopDrag)
  document.removeEventListener("touchend", stopDrag)
}

// 组件挂载时添加事件监听
onMounted(() => {
  window.addEventListener("keydown", handleKeyDown)
  window.addEventListener("keyup", handleKeyUp)

  // 计算初始位置：水平居中，垂直位置从顶部开始
  position.value = {
    x: 0,
    y: -400 // 从顶部向下400px的位置
  }
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown)
  window.removeEventListener("keyup", handleKeyUp)
  document.removeEventListener("mousemove", handleDrag)
  document.removeEventListener("touchmove", handleDrag)
  document.removeEventListener("mouseup", stopDrag)
  document.removeEventListener("touchend", stopDrag)
})
</script>

<style scoped lang="scss">
.virtual-keyboard {
  position: fixed;
  left: 50%;
  width: 720px;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.95);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid transparent;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
  z-index: 99999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  user-select: none;
  position: relative;

  // 流动光效边框 - 使用标准属性
  &::before {
    content: '';
    position: absolute;
    inset: -1px; // 边框位于元素外部
    border-radius: 8px;
    background: linear-gradient(
            90deg,
            rgba($primary-color, .1),
            rgba($primary-color, .8),
            rgba($primary-color, .1)
    );
    background-size: 300% 100%;
    animation: borderFlow 8s linear infinite;
    pointer-events: none;
    z-index: -1;
  }

  // 遮罩层，创建边框效果
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    border-radius: 8px;
    z-index: -1;
  }

  &.is-visible {
    opacity: 1;
    pointer-events: all;
  }
}

@keyframes borderFlow {
  0%, 100% {
    background-position: 100% 0;
  }
  50% {
    background-position: -100% 0;
  }
}

// 拖动区域样式
.drag-handle {
  height: 20px;
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  .drag-dots {
    display: flex;
    gap: 4px;

    span {
      width: 4px;
      height: 4px;
      background: #00ff00;
      border-radius: 50%;
      opacity: 0.3;
      transition: opacity 0.2s ease;
    }
  }

  &:hover .drag-dots span {
    opacity: 0.8;
  }
}

.keyboard-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 8px;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  margin: 4px 0;
  gap: 4px;
  height: 40px;
}

.function-keys {
  margin-bottom: 15px;
}

.key {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 0;
  padding: 0 4px;
  font-size: 12px;
  background: rgba(20, 20, 20, 0.9);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 6px;
  color: #00ff00;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  // 悬浮时的光晕效果
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
            circle at center,
            rgba(0, 255, 0, 0.1) 0%,
            transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(0, 255, 0, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 255, 0, 0.2);

    &::before {
      opacity: 1;
    }
  }

  // 点击和激活状态
  &:active,
  &.key-active {
    transform: translateY(1px);
    box-shadow: none;
    background: rgba(40, 40, 40, 0.95);
    border-color: rgba(0, 255, 0, 0.6);

    // 按下时的光晕扩散效果
    &::after {
      content: '';
      position: absolute;
      inset: -5px;
      background: radial-gradient(
              circle at center,
              rgba(0, 255, 0, 0.2) 0%,
              transparent 70%
      );
      animation: keypress 0.3s ease-out;
    }
  }

  &.key-toggled {
    background: rgba(0, 255, 0, 0.15);
    border-color: rgba(0, 255, 0, 0.5);
  }
}

// 按键动画
@keyframes keypress {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

.function-key {
  font-size: 12px;
  background: #111;
}

.key-wide {
  min-width: 80px;
}

@media (max-width: 768px) {
  .key {
    min-width: 30px;
    height: 35px;
    font-size: 12px;
  }

  .key-wide {
    min-width: 60px;
  }
}

// 修改底部按键样式
.bottom-row {
  display: flex !important;
  gap: 5px;
}

.key-space {
  flex: 3;
  min-width: 200px !important;
}

.key-close {
  flex: 1;
  min-width: 80px !important;
}

// 响应式调整
@media (max-width: 768px) {
  .virtual-keyboard {
    width: 95%;
    bottom: 10px;
  }

  .key-space {
    min-width: 150px !important;
  }

  .key-close {
    min-width: 60px !important;
  }
}

// 新增和修改的样式
.keyboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 30px;
}

.header-placeholder {
  width: 20px; // 与关闭按钮宽度相同
}

.drag-handle {
  height: 20px;
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  .drag-dots {
    display: flex;
    gap: 4px;

    span {
      width: 4px;
      height: 4px;
      background: #00ff00;
      border-radius: 50%;
      opacity: 0.3;
      transition: opacity 0.2s ease;
    }
  }

  &:hover .drag-dots span {
    opacity: 0.8;
  }
}

.close-button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #00ff00;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.3;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

.key {
  text-transform: lowercase;
  font-size: 12px;
  border-radius: 6px;
  background: #2c2c2c;
  border: 1px solid #444;

  &.esc {
    background: #1c1c1c;
  }
}

.bottom-row {
  margin-top: 10px;
}

.key-fn,
.key-control,
.key-option,
.key-command {
  min-width: 50px !important;
}

.key-space {
  flex: 1;
  min-width: 200px !important;
}

.arrows {
  display: flex;
  gap: 2px;

  .key-arrow {
    min-width: 32px !important;
    height: 32px;
  }

  .arrows-updown {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .key-arrow {
      height: 15px;
    }
  }
}

@media (max-width: 768px) {
  .keyboard-container {
    transform: scale(0.9);
  }

  .key-fn,
  .key-control,
  .key-option,
  .key-command {
    min-width: 40px !important;
  }

  .key-space {
    min-width: 120px !important;
  }

  .arrows {
    display: none;
  }
}
</style> 