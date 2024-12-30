<template>
  <Modal 
    :visible="visible" 
    :title="t('selectSaveFile')" 
    width="600px"
    @close="$emit('close')"
  >
    <div class="saves-container">
      <div v-if="saves.length === 0" class="no-saves">
        {{ t("noSaves") }}
      </div>
      <div v-else v-for="save in saves" :key="save.id" class="save-item">
        <div class="save-info">
          <span class="save-name">SAVE_#{{ save.id }}: {{ save.name }}</span>
          <span class="save-level">第{{ save.save.currentLevel }}关 - {{ getCurrentLevelData(save.save.currentLevel).title }}</span>
          <span class="save-date">{{ formatDate(save.save.timestamp) }}</span>
        </div>
        <div class="save-actions">
          <button @click="loadGame(save.id)" class="btn">{{ t("load") }}</button>
          <button @click="deleteSave(save.id)" class="btn danger">{{ t("delete") }}</button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLanguageStore } from '@/stores/language.ts';
import { useSaveStore } from '@/stores/save.ts';
import { useGameStore } from '@/stores/game.ts';
import { getCurrentLevelData } from '@/game/levels';
import Modal from '../kits/Modal.vue';

defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const languageStore = useLanguageStore();
const saveStore = useSaveStore();
const gameStore = useGameStore();
const t = computed(() => languageStore.t);
const saves = computed(() => saveStore.getSaves());

const loadGame = (saveId: number) => {
  if (saveStore.loadSave(saveId)) {
    const saveData = saveStore.getSaveData(saveId);
    if (saveData) {
      gameStore.loadSavedGame(saveData);
    }
  }
  emit('close');
};

const deleteSave = (saveId: number) => {
  saveStore.deleteSave(saveId);
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};
</script>

<style lang="scss" scoped>
.saves-container {
  .no-saves {
    text-align: center;
    padding: $spacing-lg;
    color: rgba($primary-color, 0.7);
  }

  .save-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-sm;
    border: 1px solid rgba($primary-color, 0.2);
    margin-bottom: $spacing-sm;

    &:hover {
      background: rgba($primary-color, 0.1);
    }

    .save-info {
      .save-name {
        display: block;
        font-size: 1.1rem;
      }

      .save-level {
        font-size: 0.9rem;
        opacity: 0.7;
      }

      .save-date {
        font-size: 0.9rem;
        opacity: 0.7;
      }
    }

    .save-actions {
      display: flex;
      gap: $spacing-sm;
    }
  }
}
</style> 