<template>
  <Modal
    transitionName="zoom"
    :visible="visible"
    :title="t('settingsTitle')"
    @close="closeModal"
  >
    <div class="settings">
      <div class="settings-container">
        <!-- 左侧列 -->
        <div class="settings-column">
          <div class="settings-section">
            <h3>{{ t('terminalColors') }}</h3>
            <div class="setting-item">
              <label>{{ t('backgroundColor') }}</label>
              <input type="color" v-model="settings.backgroundColor"/>
            </div>
            <div class="setting-item">
              <label>{{ t('textColor') }}</label>
              <input type="color" v-model="settings.textColor"/>
            </div>
            <div class="setting-item">
              <label>{{ t('outputTextColor') }}</label>
              <input type="color" v-model="settings.outputTextColor"/>
            </div>
          </div>

          <div class="settings-section">
            <h3>{{ t('terminalStyle') }}</h3>
            <div class="setting-item">
              <label>{{ t('fontSize') }}</label>
              <input type="range" 
                     v-model="settings.fontSize" 
                     min="12" 
                     max="24"
                     @input="updateRangeProgress"
                     :style="{ '--range-progress': `${((settings.fontSize - 12) / 12) * 100}%` }"/>
              <span class="value">{{ settings.fontSize }}px</span>
            </div>
            <div class="setting-item">
              <label>{{ t('outputFontSize') }}</label>
              <input type="range" 
                     v-model="settings.outputFontSize" 
                     min="12" 
                     max="24"
                     @input="updateRangeProgress"
                     :style="{ '--range-progress': `${((settings.outputFontSize - 12) / 12) * 100}%` }"/>
              <span class="value">{{ settings.outputFontSize }}px</span>
            </div>
            <div class="setting-item">
              <label>{{ t('opacity') }}</label>
              <input type="range" 
                     v-model="settings.opacity" 
                     min="0" 
                     max="1" 
                     step="0.1"
                     @input="updateRangeProgress"
                     :style="{ '--range-progress': `${settings.opacity * 100}%` }"/>
              <span class="value">{{ Math.round(settings.opacity * 100) }}%</span>
            </div>
          </div>
        </div>

        <!-- 右侧列 -->
        <div class="settings-column">
          <div class="settings-section">
            <h3>{{ t('promptStyle') }}</h3>
            <div class="setting-item">
              <label>{{ t('promptColor') }}</label>
              <input type="color" v-model="settings.promptColor"/>
            </div>
            <div class="setting-item">
              <label>{{ t('caretColor') }}</label>
              <input type="color" v-model="settings.caretColor"/>
            </div>
          </div>

          <div class="settings-section">
            <h3>{{ t('others') }}</h3>
            <div class="setting-item">
              <label>{{ t('scrollbarColor') }}</label>
              <input type="color" v-model="settings.scrollbarColor"/>
            </div>
            <div class="setting-item">
              <label>{{ t('audio') }}</label>
              <div class="toggle">
                <input 
                  type="checkbox"
                  :checked="settings.soundEnabled"
                />
                <span class="slider" @click="toggleSound"></span>
              </div>
            </div>
            <div class="setting-item">
              <label>{{ t('volume') }}</label>
              <input 
                type="range"
                :value="settings.soundVolume"
                min="0"
                max="1"
                step="0.1"
                @input="handleVolumeChange"
                :style="{ '--range-progress': `${(settings.soundVolume || 0) * 100}%` }"
              />
              <span class="value">{{ Math.round((settings.soundVolume || 0) * 100) }}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-footer">
        <button class="btn-reset" @click="resetSettings">{{ t('resetSettings') }}</button>
        <button class="btn-save" @click="saveSettings">{{ t('saveSettings') }}</button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useLanguageStore } from '@/stores/language.ts';
import Modal from '../kits/Modal.vue';

const props = defineProps<{
  visible: boolean
}>();

const emit = defineEmits<{
  (e: 'close'): void
}>();

const languageStore = useLanguageStore();
const t = computed(() => languageStore.t);

// 修改默认设置中的音量值
const defaultSettings = {
  backgroundColor: '#000000',
  opacity: 1,
  textColor: '#33ff3b',
  outputTextColor: '#36c2ff',
  promptColor: '#33ff3b',
  caretColor: '#33ff3b',
  scrollbarColor: '#003344',
  fontSize: 14,
  outputFontSize: 16,
  soundEnabled: true,
  soundVolume: 1.0
};

const settings = ref({ ...defaultSettings });
const originalSettings = ref({ ...defaultSettings });

// 监听 visible 变化
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

// 更新设置到 DOM
const updateSettings = () => {
  try {
    const currentSettings = settings.value;
    
    // 背景颜色和透明度
    const opacity = Math.max(0, Math.min(1, currentSettings.opacity || defaultSettings.opacity));
    const opacityHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
    const bgColor = `${currentSettings.backgroundColor || defaultSettings.backgroundColor}${opacityHex}`;

    // 更新基本设置
    document.documentElement.style.setProperty('--terminal-bg', bgColor);
    document.documentElement.style.setProperty('--terminal-text', currentSettings.textColor || defaultSettings.textColor);
    document.documentElement.style.setProperty('--terminal-output-text', currentSettings.outputTextColor || defaultSettings.outputTextColor);
    document.documentElement.style.setProperty('--terminal-prompt-color', currentSettings.promptColor || defaultSettings.promptColor);
    document.documentElement.style.setProperty('--terminal-caret-color', currentSettings.caretColor || defaultSettings.caretColor);
    document.documentElement.style.setProperty('--terminal-scrollbar-color', currentSettings.scrollbarColor || defaultSettings.scrollbarColor);
    document.documentElement.style.setProperty('--terminal-font-size', `${currentSettings.fontSize || defaultSettings.fontSize}px`);
    document.documentElement.style.setProperty('--terminal-output-font-size', `${currentSettings.outputFontSize || defaultSettings.outputFontSize}px`);

    // 更新音效设置
    const soundEnabled = currentSettings.soundEnabled ?? defaultSettings.soundEnabled;
    const soundVolume = currentSettings.soundVolume ?? defaultSettings.soundVolume;
    
    document.documentElement.style.setProperty('--sound-enabled', soundEnabled ? '1' : '0');
    document.documentElement.style.setProperty('--sound-volume', soundVolume.toString());

    // 更新所有音频元素
    const audioElements = document.getElementsByTagName('audio');
    Array.from(audioElements).forEach(audio => {
      if (audio) {
        audio.volume = soundVolume;
        if (!soundEnabled) {
          audio.pause();
        }
      }
    });
  } catch (error) {
    console.error('Error updating settings:', error);
  }
};

const closeModal = () => {
  settings.value = { ...originalSettings.value };
  updateSettings();
  emit('close');
};

const resetSettings = () => {
  settings.value = { ...defaultSettings };
  updateSettings();
  localStorage.setItem('terminalSettings', JSON.stringify(defaultSettings));
  originalSettings.value = { ...defaultSettings };
  // emit('close');
};

const saveSettings = () => {
  updateSettings();
  localStorage.setItem('terminalSettings', JSON.stringify(settings.value));
  originalSettings.value = { ...settings.value };
  emit('close');
};

// 更新滑块进度
const updateRangeProgress = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const min = parseFloat(input.min);
  const max = parseFloat(input.max);
  const val = parseFloat(input.value);
  const percentage = ((val - min) / (max - min)) * 100;
  input.style.setProperty('--range-progress', `${percentage}%`);
};

// 修改音效开关处理函数
const toggleSound = (e: Event) => {
  e.preventDefault(); // 阻止默认行为
  const target = e.target as HTMLInputElement;
  const newValue = !settings.value.soundEnabled; // 直接取反当前值
  
  settings.value = {
    ...settings.value,
    soundEnabled: newValue
  };
  
  updateSettings();
  localStorage.setItem('terminalSettings', JSON.stringify(settings.value));
};

// 添加音量变化处理函数
const handleVolumeChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const newVolume = parseFloat(target.value);
  settings.value = {
    ...settings.value,
    soundVolume: newVolume
  };
  updateSettings();
  updateRangeProgress(e);
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
.settings {
  width: 800px;
  color: $text-color;

  .settings-container {
    display: flex;
    gap: 24px;
    padding: 16px;
  }

  .settings-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .settings-section {
    background: rgba($bg-secondary, 0.3);
    border: 1px solid rgba($primary-color, 0.2);
    border-radius: 4px;
    padding: 8px 16px;
    min-height: 200px;

    h3 {
      color: $primary-color;
      margin: 0 0 16px;
      font-size: 16px;
      border-bottom: 1px solid rgba($primary-color, 0.2);
      padding-bottom: 8px;
    }

    .setting-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      gap: 12px;

      &:last-child {
        margin-bottom: 0;
      }

      label {
        flex: 1;
        font-size: 14px;
      }

      input[type="color"] {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 4px;
        background: none;
        cursor: pointer;
        padding: 0;
        overflow: hidden;
        
        &::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        
        &::-webkit-color-swatch {
          border: none;
          border-radius: 4px;
        }
        
        &::-moz-color-swatch {
          border: none;
          border-radius: 4px;
        }
      }

      input[type="range"] {
        flex: 2;
      }

      .value {
        min-width: 48px;
        text-align: right;
        font-size: 14px;
        color: $primary-color;
      }

      select {
        flex: 2;
        background: rgba($bg-secondary, 0.5);
        border: 1px solid rgba($primary-color, 0.3);
        color: $text-color;
        padding: 4px 8px;
        border-radius: 4px;
        outline: none;
        cursor: pointer;

        &:focus {
          border-color: $primary-color;
        }
      }

      .toggle {
        position: relative;
        width: 40px;
        height: 20px;

        input {
          opacity: 0;
          width: 0;
          height: 0;

          &:checked + .slider {
            background: $primary-color;

            &:before {
              transform: translateX(20px);
            }
          }
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba($primary-color, 0.2);
          transition: 0.3s;
          border-radius: 20px;

          &:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background: white;
            transition: 0.3s;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .settings-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 0 0 0;
    border-top: 1px solid rgba($primary-color, 0.2);

    button {
      padding: 8px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;

      &.btn-reset {
        background: rgba($primary-orange, 0.1);
        border: 1px solid $primary-orange;
        color: $primary-orange;

        &:hover {
          background: rgba($primary-orange, 0.2);
        }
      }

      &.btn-save {
        background: rgba($primary-color, 0.1);
        border: 1px solid $primary-color;
        color: $primary-color;

        &:hover {
          background: rgba($primary-color, 0.2);
        }
      }
    }
  }
}
</style> 