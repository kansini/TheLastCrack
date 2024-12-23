<template>
  <Modal 
    :visible="visible" 
    :title="t('settingsTitle')" 
    width="600px"
    @close="cancelSettings"
  >
    <div class="setting-group">
      <h3>{{ t("colorSettings") }}</h3>
      <div class="setting-item">
        <label>{{ t("backgroundColor") }}</label>
        <input type="color" v-model="settings.backgroundColor" @change="updateSettings">
      </div>
      <div class="setting-item">
        <label>{{ t("backgroundOpacity") }}</label>
        <div class="range-control">
          <input 
            type="range" 
            v-model="settings.opacity" 
            min="0.3" 
            max="1" 
            step="0.1"
            @change="updateSettings"
          >
          <span>{{ Math.round(settings.opacity * 100) }}%</span>
        </div>
      </div>
      <div class="setting-item">
        <label>{{ t("inputTextColor") }}</label>
        <input type="color" v-model="settings.textColor" @change="updateSettings">
      </div>
      <div class="setting-item">
        <label>{{ t("outputTextColor") }}</label>
        <input type="color" v-model="settings.outputTextColor" @change="updateSettings">
      </div>
      <div class="setting-item">
        <label>{{ t("promptColor") }}</label>
        <input type="color" v-model="settings.promptColor" @change="updateSettings">
      </div>
      <div class="setting-item">
        <label>{{ t("caretColor") }}</label>
        <input type="color" v-model="settings.caretColor" @change="updateSettings">
      </div>
      <div class="setting-item">
        <label>{{ t("scrollbarColor") }}</label>
        <input type="color" v-model="settings.scrollbarColor" @change="updateSettings">
      </div>
    </div>

    <div class="setting-group">
      <h3>{{ t("fontSettings") }}</h3>
      <div class="setting-item">
        <label>{{ t("fontSize") }}</label>
        <div class="range-control">
          <input 
            type="range" 
            v-model="settings.fontSize" 
            min="12" 
            max="24" 
            step="1"
            @change="updateSettings"
          >
          <span>{{ settings.fontSize }}px</span>
        </div>
      </div>
    </div>

    <template #footer>
      <button @click="resetToDefault" class="btn">
        {{ t("resetSettings") }}
      </button>
      <button @click="cancelSettings" class="btn">
        {{ t("cancel") }}
      </button>
      <button @click="saveSettings" class="btn primary">
        {{ t("save") }}
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useLanguageStore } from '@/stores/language';
import Modal from './Modal.vue';

const props = defineProps<{
  visible: boolean
}>();

watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    const savedSettings = localStorage.getItem('terminalSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      settings.value = { ...parsedSettings };
      originalSettings.value = { ...parsedSettings };
    } else {
      settings.value = { ...defaultSettings };
      originalSettings.value = { ...defaultSettings };
    }
    updateSettings();
  }
});

const emit = defineEmits<{
  (e: 'close'): void
}>();

const languageStore = useLanguageStore();
const t = computed(() => languageStore.t);

const defaultSettings = {
  backgroundColor: '#000000',
  opacity: 1,
  textColor: '#33ff3b',
  outputTextColor: '#36c2ff',
  promptColor: '#33ff3b',
  caretColor: '#33ff3b',
  scrollbarColor: '#003344',
  fontSize: 14
};

const settings = ref({ ...defaultSettings });
const originalSettings = ref({ ...defaultSettings });

const updateSettings = () => {
  const bgColor = settings.value.backgroundColor + Math.round(settings.value.opacity * 255).toString(16).padStart(2, '0');
  document.documentElement.style.setProperty('--terminal-bg', bgColor);
  document.documentElement.style.setProperty('--terminal-text', settings.value.textColor);
  document.documentElement.style.setProperty('--terminal-output-text', settings.value.outputTextColor);
  document.documentElement.style.setProperty('--terminal-prompt-color', settings.value.promptColor);
  document.documentElement.style.setProperty('--terminal-caret-color', settings.value.caretColor);
  document.documentElement.style.setProperty('--terminal-scrollbar-color', settings.value.scrollbarColor);
  document.documentElement.style.setProperty('--terminal-font-size', `${settings.value.fontSize}px`);
};

const saveSettings = () => {
  localStorage.setItem('terminalSettings', JSON.stringify(settings.value));
  originalSettings.value = { ...settings.value };
  emit('close');
};

const cancelSettings = () => {
  settings.value = { ...originalSettings.value };
  updateSettings();
  emit('close');
};

const resetToDefault = () => {
  settings.value = { ...defaultSettings };
  updateSettings();
};

onMounted(() => {
  const savedSettings = localStorage.getItem('terminalSettings');
  if (savedSettings) {
    const parsedSettings = JSON.parse(savedSettings);
    settings.value = { ...parsedSettings };
    originalSettings.value = { ...parsedSettings };
  }
  updateSettings();
});
</script>

<style lang="scss" scoped>
.setting-group {
  margin-bottom: $spacing-lg;
  padding: $spacing-md;
  border: 1px solid rgba($primary-color, 0.1);
  border-radius: 4px;

  h3 {
    margin: 0 0 $spacing-md;
    color: $primary-color;
    font-size: 1.1rem;
  }
}

.setting-item {
  margin-bottom: $spacing-md;

  label {
    display: block;
    margin-bottom: $spacing-sm;
    color: $primary-color;
  }

  input[type="color"] {
    width: 100%;
    height: 40px;
    border: 1px solid rgba($primary-color, 0.3);
    background: transparent;
    cursor: pointer;

    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    &::-webkit-color-swatch {
      border: none;
    }
  }
}

.range-control {
  display: flex;
  align-items: center;
  gap: $spacing-md;

  input[type="range"] {
    flex: 1;
    height: 4px;
    background: rgba($primary-color, 0.3);
    border-radius: 2px;
    -webkit-appearance: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      background: $primary-color;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  span {
    min-width: 50px;
    color: $primary-color;
  }
}
</style> 