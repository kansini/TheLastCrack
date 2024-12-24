<template>
  <div class="modal-overlay">
    <Transition :name="transitionName">
      <div class="modal-content" :style="{ width }" v-if="visible">
        <div class="modal-header">
          <h2>{{ title }}</h2>
          <button @click="onClose" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  visible: boolean;
  title: string;
  width?: string;
  transitionName?: "fade" | "slide-top" | "slide-bottom" | "slide-left" | "slide-right" | "zoom";
}>(), {
  transitionName: "slide-top"
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const onClose = () => {
  emit("close");
};
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
    min-width: 640px;
    background: rgba($bg-secondary, 0.1);
    border: 1px solid rgba($primary-color, 0.3);
    box-shadow: inset 0 0 20px rgba($primary-color, 0.2);
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    pointer-events: all;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg,
          transparent,
          rgba($primary-color, 0.5),
          transparent
      );
      animation: glow 2s linear infinite;
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
}


@keyframes glow {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.modal-header {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid rgba($primary-color, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg,
        transparent,
        rgba($primary-color, 0.1),
        transparent
    );
    animation: headerGlow 3s linear infinite;
  }

  h2 {
    margin: 0;
    font-size: 1.2rem;
    color: $primary-color;
    text-shadow: 0 0 10px rgba($primary-color, 0.5);
  }

  .close-btn {
    background: none;
    border: none;
    color: $primary-color;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0 $spacing-sm;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;

    &:hover {
      color: lighten($primary-color, 20%);
      text-shadow: 0 0 10px rgba($primary-color, 0.8);
      transform: scale(1.1);
    }
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

.modal-body {
  flex: 1;
  overflow-y: auto;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba($primary-color, 0.3);
    border-radius: 4px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba($primary-color, 0.5);
    }
  }
}

.modal-footer {
  flex-shrink: 0;
  padding: $spacing-md $spacing-lg;
  background: rgba($bg-secondary, 0.1);
  border-top: 1px solid rgba($primary-color, 0.3);
  display: flex;
  justify-content: flex-end;
  gap: $spacing-md;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg,
        transparent,
        rgba($primary-color, 0.1),
        transparent
    );
    animation: footerGlow 3s linear infinite reverse;
  }
}

@keyframes footerGlow {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(50%);
  }
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
    border-color: lighten($primary-color, 20%);
    color: lighten($primary-color, 20%);
    transform: translateY(-1px);
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
</style> 