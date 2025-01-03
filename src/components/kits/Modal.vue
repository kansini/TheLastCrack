<template>
  <Transition :name="transitionName">
    <div class="modal-overlay" :style="{zIndex: currentZIndex }" v-if="visible" @mousedown.self="handleClose">

      <div class="modal-content"
           :style="{ 
             width:width,
             transform: `translate(${position.x}px, ${position.y}px)`,
              }"

           ref="modalRef"
           @click="handleModalClick"
           @mousedown="handleModalClick">
        <div class="corner-decoration top-left"></div>
        <div class="corner-decoration top-right"></div>
        <div class="corner-decoration bottom-left"></div>
        <div class="corner-decoration bottom-right"></div>
        <div class="modal-header"
             :class="{ draggable }"
             @mousedown="handleHeaderMouseDown">
          <h2>{{ title }}</h2>
          <button @click.stop="onClose" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>

    </div>
  </Transition>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from "vue";
import {useTerminalStore} from "../../stores/terminal";

// 全局 z-index 管理
let globalZIndex = 1000;
const getNextZIndex = () => ++globalZIndex;

const props = withDefaults(defineProps<{
  visible: boolean;
  title: string;
  width?: string;
  transitionName?: "fade" | "slide-top" | "slide-bottom" | "slide-left" | "slide-right" | "zoom";
  draggable?: boolean;
}>(), {
  transitionName: "slide-top",
  draggable: true
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const modalRef = ref<HTMLElement | null>(null);
const position = ref({x: 0, y: 0});
const isDragging = ref(false);
const startPosition = ref({x: 0, y: 0});
const mouseStartPosition = ref({x: 0, y: 0});
const currentZIndex = ref(getNextZIndex());

const handleModalClick = () => {
  // 点击时更新 z-index 到最新
  currentZIndex.value = getNextZIndex();
};

const handleHeaderMouseDown = (e: MouseEvent) => {
  if (!props.draggable || e.button !== 0) return; // 只响应左键点击

  isDragging.value = true;
  startPosition.value = {...position.value};
  mouseStartPosition.value = {x: e.clientX, y: e.clientY};

  // 点击标题栏时也更新 z-index
  currentZIndex.value = getNextZIndex();

  // 防止文本选中
  e.preventDefault();
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value || !modalRef.value) return;

  // 计算鼠标移动的距离
  const deltaX = e.clientX - mouseStartPosition.value.x;
  const deltaY = e.clientY - mouseStartPosition.value.y;

  // 计算新位置
  let newX = startPosition.value.x + deltaX;
  let newY = startPosition.value.y + deltaY;

  // 获取窗口和模态框的尺寸
  // const modalRect = modalRef.value.getBoundingClientRect();
  // const windowWidth = window.innerWidth;
  // const windowHeight = window.innerHeight;

  // 限制拖动范围
  // newX = Math.min(Math.max(newX, 0), windowWidth - modalRect.width);
  // newY = Math.min(Math.max(newY, 0), windowHeight - modalRect.height);

  position.value = {x: newX, y: newY};
};

const stopDrag = () => {
  if (isDragging.value) {
    isDragging.value = false;
  }
};

const onClose = () => {
  emit("close");
};

// 在模态框关闭时重置键盘状态
const handleClose = (e: MouseEvent) => {
  const terminalStore = useTerminalStore();
  terminalStore.showKeyboard = false;
  localStorage.setItem('terminalSettings', JSON.stringify({ showKeyboard: false }));
  if (e.target === e.currentTarget) {
    emit('close')
  }
};

// 在组件挂载时添加全局事件监听
onMounted(() => {
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
  // 添加鼠标离开窗口的处理
  document.addEventListener("mouseleave", stopDrag);
});

// 在组件卸载时移除全局事件监听
onUnmounted(() => {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("mouseleave", stopDrag);
});
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: none;

  .modal-content {
    position: relative;
    max-height: 80vh;
    background: rgba($bg-primary, 0.1);
    border: 1px solid $border-color;
    box-shadow: inset 0 0 20px rgba($bg-primary, 0.2);
    backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    pointer-events: all;
    user-select: none;

    .corner-decoration {
      position: absolute;
      width: 12px;
      height: 12px;
      border: 2px solid $primary-color;
      animation: cornerPulse 2s ease-in-out infinite;

      &.top-left {
        top: -2px;
        left: -2px;
        border-right: none;
        border-bottom: none;
      }

      &.top-right {
        top: -2px;
        right: -2px;
        border-left: none;
        border-bottom: none;
      }

      &.bottom-left {
        bottom: -2px;
        left: -2px;
        border-right: none;
        border-top: none;
      }

      &.bottom-right {
        bottom: -2px;
        right: -2px;
        border-left: none;
        border-top: none;
      }
    }

    @keyframes cornerPulse {
      0% {
        border-color: rgba($primary-color, 0.4);
        //box-shadow: 0 0 5px rgba($primary-color, 0.2);
      }
      50% {
        border-color: rgba($primary-color, 1);
        //box-shadow: 0 0 10px rgba($primary-color, 0.6);
      }
      100% {
        border-color: rgba($primary-color, 0.4);
        //box-shadow: 0 0 5px rgba($primary-color, 0.2);
      }
    }

  }
}

.modal-header {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  border-bottom: 1px solid $border-color;
  position: relative;
  overflow: hidden;
  pointer-events: all;

  &.draggable {
    cursor: move;
  }

  .close-btn {
    position: absolute;
    right: 0;
    top: 0;
    background: none;
    border: none;
    color: rgba($primary-color-dark, .6);
    font-size: 1.5rem;
    cursor: pointer;
    width: 48px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    transition: all 0.2s;

    &:hover {
      color: rgba($primary-color-dark, 1);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    animation: headerGlow 3s linear infinite;
  }


  h2 {
    font-size: 1.2rem;
    color: $primary-color;
  }


}

.modal-body {
  position: relative;
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg,
        rgba($primary-color, 0.1) 1px,
        transparent 1px
    ),
    linear-gradient(
            rgba($primary-color, 0.1) 1px,
            transparent 1px
    );
    background-size: 24px 24px;
    mask-image: radial-gradient(circle at 50% 50%,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0.3)
    );
    animation: gridFlicker 8s linear infinite;
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
        transparent,
        rgba($primary-color, 0.5),
        transparent
    );
    animation: glow 2s linear infinite reverse;
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  flex-shrink: 0;
  padding: 8px 16px;
  border-top: 1px solid rgba($primary-color, 0.3);
}

@keyframes glow {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes headerGlow {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(50%);
  }
}

@keyframes gridFlicker {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.8;
  }
  85% {
    opacity: 1;
  }
  95% {
    opacity: 0.6;
  }
}

// 添加过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-top-enter-active,
.slide-top-leave-active {
  transition: all 0.3s ease;
}

.slide-top-enter-from,
.slide-top-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

:deep(.btn) {
  padding: $spacing-sm $spacing-lg;
  background: transparent;
  border: 1px solid $primary-color;
  color: $primary-color;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
        transparent,
        rgba($primary-color, 0.2),
        transparent
    );
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba($primary-color, 0.1);
    border-color: scale-color($primary-color, $lightness: 20%);
    color: scale-color($primary-color, $lightness: 20%);
    box-shadow: 0 2px 8px rgba($primary-color, 0.2);

    &::before {
      transform: translateX(200%);
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &.primary {
    background: $primary-color;
    color: $bg-secondary;

    &:hover {
      background: lighten($primary-color, 10%);
    }
  }

  &.danger {
    border-color: $primary-orange;
    color: $primary-orange;

    &:hover {
      background: rgba($primary-orange, 0.1);
      border-color: lighten($primary-orange, 20%);
      color: lighten($primary-orange, 20%);
      box-shadow: 0 2px 8px rgba($primary-orange, 0.2);
    }
  }
}

// 添加全局滑块样式
:deep(input[type="range"]) {
  height: 16px;
  background: rgba($primary-color, 0);
  border-radius: 2px;
  -webkit-appearance: none;
  flex: 2;

  &::-webkit-slider-runnable-track {
    height: 4px;
    background: linear-gradient(to right, 
      $primary-color 0%, 
      $primary-color var(--range-progress, 50%), 
      rgba($primary-color, 0.2) var(--range-progress, 50%)
    );
    border-radius: 2px;
  }

  &::-moz-range-progress {
    height: 4px;
    background: $primary-color;
    border-radius: 2px;
  }

  &::-ms-fill-lower {
    height: 4px;
    background: $primary-color;
    border-radius: 2px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    margin-top: -6px;
    background: $primary-color;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: $primary-color;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &::-ms-thumb {
    width: 16px;
    height: 16px;
    background: $primary-color;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style> 