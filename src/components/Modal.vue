<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content" :style="{ width }">
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
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean;
  title: string;
  width?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const onClose = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  max-height: 80vh;
  background:rgba($bg-secondary, 0.1);
  border: 1px solid rgba($primary-color, 0.3);
  box-shadow:inset 0 0 20px rgba($primary-color, 0.2);
  display: flex;
  flex-direction: column;
}

.modal-header {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  border-bottom: 1px solid rgba($primary-color, 0.3);

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: $primary-color;
  }

  .close-btn {
    background: none;
    border: none;
    color: $primary-color;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0 $spacing-sm;

    &:hover {
      color: lighten($primary-color, 20%);
    }
  }
}

.modal-body {
  flex: 1;
  padding: $spacing-lg;
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

    &:hover {
      background: rgba($primary-color, 0.5);
    }
  }
}

.modal-footer {
  flex-shrink: 0;
  padding: $spacing-md $spacing-lg;
 background:rgba($bg-secondary, 0.1);
  border-top: 1px solid rgba($primary-color, 0.3);
  display: flex;
  justify-content: flex-end;
  gap: $spacing-md;
}

:deep(.btn) {
  padding: $spacing-sm $spacing-lg;
  background: transparent;
  border: 1px solid $primary-color;
  color: $primary-color;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;

  &:hover {
    background: rgba($primary-color, 0.1);
    border-color: lighten($primary-color, 20%);
    color: lighten($primary-color, 20%);
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
    }
  }
}
</style> 