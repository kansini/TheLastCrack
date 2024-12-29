<template>
  <div class="main-menu">
    <!--    <div class="cyber-grid"></div>-->
    <div class="radar-container">
      <svg class="radar-svg" viewBox="0 0 200 200">
        <defs>
          <radialGradient id="scanGradient">
            <stop offset="0%" stop-color="rgba(0, 255, 255, 0.6)"/>
            <stop offset="60%" stop-color="rgba(0, 255, 255, 0.2)"/>
            <stop offset="100%" stop-color="rgba(0, 255, 255, 0)"/>
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(0, 255, 255, 0.4)" stroke-width="1"/>
        <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(0, 255, 255, 0.3)" stroke-width=".5"/>
        <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(0, 255, 255, 0.2)" stroke-width=".5"/>
        <circle cx="100" cy="100" r="25" fill="none" stroke="rgba(0, 255, 255, 0.1)" stroke-width="1"/>

        <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(0, 255, 255, 0.3)" stroke-width=".5"/>
        <line x1="100" y1="0" x2="100" y2="200" stroke="rgba(0, 255, 255, 0.3)" stroke-width=".5"/>

        <path class="radar-sweep"
              d="M 100,100 L 100,0 A 100,100 0 0,1 190,50 L 100,100"
              fill="url(#scanGradient)"/>
      </svg>
    </div>
    <div class="menu-container">
      <div class="game-logo">
        <div class="glitch-text" data-text="THE LAST TRACK">THE LAST TRACK</div>
        <div class="sub-title">SYSTEM INFILTRATION v{{ version }}</div>
      </div>
      <!-- 中央主菜单 -->
      <div class="central-menu">
        <div class="menu-options">
          <button @click="startNewGame" class="menu-btn" @mouseenter="playButtonSound">
            <div class="btn-content">
              <span class="btn-text">{{ t("newGame") }}</span>
            </div>
            <div class="btn-border"></div>
            <div class="btn-glow"></div>
          </button>
          <button @click="toggleLoadGame" v-if="hasSaves" class="menu-btn" @mouseenter="playButtonSound">
            <div class="btn-content">
              <span class="btn-text">{{ t("continueGame") }}</span>
            </div>
            <div class="btn-border"></div>
            <div class="btn-glow"></div>
          </button>
          <button @click="toggleSettings" class="menu-btn" @mouseenter="playButtonSound">
            <div class="btn-content">
              <span class="btn-text">{{ t("settings") }}</span>
            </div>
            <div class="btn-border"></div>
            <div class="btn-glow"></div>
          </button>
          <button @click="showTutorial" class="menu-btn" @mouseenter="playButtonSound">
            <div class="btn-content">
              <span class="btn-text">{{ t("tutorial") }}</span>
            </div>
            <div class="btn-border"></div>
            <div class="btn-glow"></div>
          </button>
          <button @click="showAbout" class="menu-btn" @mouseenter="playButtonSound">
            <div class="btn-content">
              <span class="btn-text">{{ t("about") }}</span>
            </div>
            <div class="btn-border"></div>
            <div class="btn-glow"></div>
          </button>
          <button @click="toggleLanguage" class="lang-btn">
            {{ currentLanguage === "zh" ? "ENG" : "中文" }}
          </button>
        </div>

        <div class="decoration-container">
          <div class="decoration-line"></div>
          <div class="decoration-text">{{ t("systemReady") }}</div>
          <div class="decoration-line"></div>
        </div>
      </div>

      <!-- 存档列表 -->
      <SaveList :visible="showSaveList" @close="toggleLoadGame"/>
    </div>

    <!-- 教程和关于页面 -->
    <Tutorial :visible="showTutorialModal" @close="closeTutorial"/>
    <About :visible="showAboutModal" @close="closeAbout"/>
    <Settings :visible="showSettingsModal" @close="closeSettings"/>

    <!--    <div class="glitch-effects">-->
    <!--      <div class="glitch-line"></div>-->
    <!--      <div class="glitch-line"></div>-->
    <!--      <div class="glitch-line"></div>-->
    <!--    </div>-->
    <div class="noise-overlay"></div>
    <div class="scan-lines"></div>

    <!-- 添加音乐控制按钮 -->
    <button 
      @click="toggleBgm" 
      class="bgm-btn"
      :class="{ playing: bgmPlaying }"
    >
      <span class="icon">{{ bgmPlaying ? '🔊' : '🔈' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted} from "vue";
import {useGameStore} from "@/stores/game";
import {useSaveStore} from "@/stores/save";
import {useLanguageStore} from "@/stores/language";
// import {getCurrentLevelData} from "@/game/levels";
import Tutorial from "./Tutorial.vue";
import About from "./About.vue";
import Settings from "./Settings.vue";
import SaveList from "./SaveList.vue";

const gameStore = useGameStore();
const saveStore = useSaveStore();
const languageStore = useLanguageStore();

const showSaveList = ref(false);
const showTutorialModal = ref(false);
const showAboutModal = ref(false);
const showSettingsModal = ref(false);
const uptimeSeconds = ref(0);

const saves = computed(() => saveStore.getSaves());
const hasSaves = computed(() => saves.value.length > 0);
const currentLanguage = computed(() => languageStore.currentLanguage);
const t = computed(() => languageStore.t);

let uptimeInterval: number;

// 添加音效相关代码
const buttonSound = new URL("../assets/audio/button.wav", import.meta.url).href;
const buttonSoundRef = ref<HTMLAudioElement>();

// 添加音频相关的 ref
const bgmRef = ref<HTMLAudioElement>();
const bgmPlaying = ref(true);

onMounted(() => {
  // 初始化音频
  buttonSoundRef.value = new Audio(buttonSound);
  if (buttonSoundRef.value) {
    buttonSoundRef.value.volume = 0.3;
  }

  uptimeInterval = window.setInterval(() => {
    uptimeSeconds.value++;
  }, 1000);

  // 初始化背景音乐
  const bgmUrl = new URL("../assets/audio/bgm.mp3", import.meta.url).href;
  bgmRef.value = new Audio(bgmUrl);
  if (bgmRef.value) {
    bgmRef.value.volume = 0.3;
    bgmRef.value.loop = true;
    bgmRef.value.play().catch(() => {
      bgmPlaying.value = false;
      document.addEventListener('click', startBgm, { once: true });
    });
  }
});

onUnmounted(() => {
  clearInterval(uptimeInterval);
  if (bgmRef.value) {
    bgmRef.value.pause();
    bgmRef.value = undefined;
  }
});

const startNewGame = () => {
  gameStore.startNewGame();
};

const toggleLoadGame = () => {
  showSaveList.value = !showSaveList.value;
};

const version = computed(()=>{
  return import.meta.env.VITE_APP_VERSION
})
// const loadGame = (saveId: number) => {
//   if (saveStore.loadSave(saveId)) {
//     const saveData = saveStore.getSaveData(saveId);
//     if (saveData) {
//       gameStore.loadSavedGame(saveData);
//     }
//   }
// };

// const deleteSave = (saveId: number) => {
//   saveStore.deleteSave(saveId);
// };
//
// const formatDate = (timestamp: number) => {
//   return new Date(timestamp).toLocaleString();
// };

const showTutorial = () => {
  showTutorialModal.value = true;
};

const closeTutorial = () => {
  showTutorialModal.value = false;
};

const showAbout = () => {
  showAboutModal.value = true;
};

const closeAbout = () => {
  showAboutModal.value = false;
};

const toggleLanguage = () => {
  languageStore.toggleLanguage();
};

const playButtonSound = () => {
  if (buttonSoundRef.value) {
    buttonSoundRef.value.currentTime = 0;
    buttonSoundRef.value.play().catch(error => {
      console.info("Button sound play prevented:", error);
    });
  }
};

const toggleSettings = () => {
  showSettingsModal.value = true;
};

const closeSettings = () => {
  showSettingsModal.value = false;
};

// 开始播放背景音乐
const startBgm = () => {
  if (bgmRef.value && !bgmPlaying.value) {
    bgmRef.value.play()
      .then(() => {
        bgmPlaying.value = true;
      })
      .catch(err => {
        console.error('Failed to play BGM:', err);
      });
  }
};

// 切换背景音乐播放状态
const toggleBgm = () => {
  if (!bgmRef.value) return;
  
  if (bgmPlaying.value) {
    bgmRef.value.pause();
    bgmPlaying.value = false;
  } else {
    bgmRef.value.play()
      .then(() => {
        bgmPlaying.value = true;
      });
  }
};
</script>

<style lang="scss" scoped>
.main-menu {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $bg-primary;
  color: $primary-color;
  position: relative;
  overflow: hidden;
  font-family: 'Share Tech Mono', monospace;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba($primary-color, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba($primary-color, 0.2) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.2;
    animation: gridMove 10s linear infinite;
  }

  .radar-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vh;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid rgba(0, 255, 255, 0.2);
    opacity: 0.3;
    pointer-events: none;
    background: radial-gradient(
            circle at center,
            rgba(0, 255, 255, 0.1) 0%,
            rgba(0, 255, 255, 0.08) 50%,
            transparent 70%
    );

    .radar-svg {
      width: 100%;
      height: 100%;

      .radar-sweep {
        transform-origin: 100px 100px;
        animation: radar-sweep 5s linear infinite;
        filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.5));
      }
    }
  }

  .menu-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: $spacing-lg;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      padding: $spacing-md;
    }

    .game-logo {
      text-align: center;

      .glitch-text {
        font-size: 3.5em;
        font-weight: bold;
        letter-spacing: 0.2em;
        position: relative;
        text-shadow: 0 0 10px $primary-green;
        color: $primary-green;

        &::before,
        &::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        &::before {
          left: 2px;
          text-shadow: -2px 0 #ff0000;
          animation: glitch-1 2s infinite linear alternate-reverse;
        }

        &::after {
          left: -2px;
          text-shadow: 2px 0 #0000ff;
          animation: glitch-2 3s infinite linear alternate-reverse;
        }
      }

      .sub-title {
        font-size: 1em;
        color: $text-color;
        margin-top: 8px;
        letter-spacing: 0.5em;
        @media (max-width: 768px) {
          font-size: 0.6em;
        }
      }
    }
  }

  .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba($primary-color, 0.5);
    box-shadow: 0 0 10px rgba($primary-color, 0.8);
    animation: scanLine 8s linear infinite;
    opacity: 0.6;
  }

  .info-panel, .status-panel {
    border: 1px solid rgba($primary-color, 0.3);
    background: rgba($bg-secondary, 0.7);
    padding: $spacing-md;
    backdrop-filter: blur(5px);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, $primary-color, transparent);
      animation: borderGlow 4s ease-in-out infinite;
    }
  }

  .header-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba($primary-color, 0.5), transparent);
    margin-left: $spacing-sm;
  }

  .status-header, .info-header {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-md;

    span {
      font-size: 0.9rem;
      letter-spacing: 1px;
      white-space: nowrap;
    }
  }

  .status-item, .info-item, .version-item, .stat-item {
    margin-bottom: $spacing-sm;

    .label {
      display: block;
      font-size: 0.8rem;
      opacity: 0.8;
      margin-bottom: 2px;
    }

    .value {
      font-size: 1rem;
      color: lighten($primary-color, 10%);
    }
  }

  .progress-bar {
    height: 4px;
    background: rgba($primary-color, 0.2);
    position: relative;
    border-radius: 2px;
    overflow: hidden;

    .progress {
      height: 100%;
      background: $primary-color;
      box-shadow: 0 0 10px $primary-color;
      transition: width 0.3s ease;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(white, 0.3), transparent);
        animation: progressGlow 2s ease-in-out infinite;
      }
    }

    .progress-text {
      position: absolute;
      right: 0;
      top: -18px;
      font-size: 0.8rem;
      opacity: 0.8;
    }
  }

  .network-status {
    display: flex;
    align-items: center;
    gap: $spacing-sm;

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $primary-color;

      &.active {
        animation: pulse 2s infinite;
      }
    }

    .ping {
      margin-left: auto;
      font-size: 0.8rem;
      opacity: 0.8;
    }
  }

  .title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: $spacing-xl;
    width: 100%;

    .title-line {
      height: 2px;
      width: 300px;
      background: $primary-color;
      box-shadow: 0 0 10px $primary-color;
      margin: $spacing-md 0;
    }


    @media (max-width: 768px) {
      margin-bottom: $spacing-lg;

      .title-line {
        width: 200px;
      }

      .lang-btn {
        margin-top: $spacing-sm;
        font-size: 0.8rem;
      }
    }
  }

  .lang-btn {
    background: transparent;
    border: 1px solid $primary-color;
    color: $primary-color;
    padding: $spacing-xs $spacing-sm;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    margin-top: $spacing-md;
    letter-spacing: 2px;

    &:hover {
      background: rgba($primary-color, 0.1);
      border-color: lighten($primary-color, 20%);
      color: lighten($primary-color, 20%);
    }
  }

  .menu-btn {
    position: relative;
    padding: $spacing-md;
    background: transparent;
    border: none;
    color: $primary-color;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    width: 300px;
    height: 54px;
    z-index: 10;

    @media (max-width: 768px) {
      width: 250px;
      padding: $spacing-sm;

      .btn-text {
        font-size: 1rem;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba($primary-color, 0.1);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover {
      color: lighten($primary-color, 20%);

      &::before {
        transform: scaleX(1);
        transform-origin: left;
      }

      .btn-border {
        &::before, &::after {
          transform: scaleX(1);
        }
      }

      .btn-glow {
        opacity: 1;
      }
    }

    .btn-content {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
      width: 100%;
    }

    .btn-text {
      text-align: center;
      font-size: 1.2rem;
      letter-spacing: 2px;
    }

    .btn-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;

      &::before, &::after {
        content: '';
        position: absolute;
        background: $primary-color;
        transition: transform 0.3s ease;
      }

      &::before {
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        transform: scaleX(0);
        transform-origin: right;
      }

      &::after {
        bottom: 0;
        right: 0;
        width: 100%;
        height: 1px;
        transform: scaleX(0);
        transform-origin: left;
      }
    }

    .btn-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba($primary-color, 0.2), transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 0;
    }
  }

  .menu-options {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    align-items: center;
    margin: $spacing-xl 0;
    width: 100%;
    z-index: 10;

    @media (max-width: 768px) {
      margin: $spacing-lg 0;
      gap: $spacing-sm;
      position: relative;
    }
  }

  .decoration-container {
    margin-top: $spacing-xl;
    display: flex;
    align-items: center;
    gap: $spacing-md;
    position: relative;

    .decoration-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba($primary-color, 0.5), transparent);
    }

    .decoration-text {
      font-size: 0.9rem;
      letter-spacing: 2px;
      animation: blink 2s infinite;
      margin: 0 $spacing-md;
    }

    @media (max-width: 768px) {
      width: 90%;
      margin-top: $spacing-lg;
      flex-wrap: wrap;
      justify-content: center;

      .decoration-line {
        width: 60px;
      }

      .decoration-text {
        font-size: 0.8rem;
      }
    }
  }

  .ambient-light {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: radial-gradient(
            circle at 50% 50%,
            rgba($primary-color, 0.1),
            transparent 50%
    );
    animation: pulse 4s ease-in-out infinite;
    z-index: 1;
  }

  .glitch-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
            0deg,
            rgba($primary-color, 0.1) 0px,
            rgba($primary-color, 0.1) 1px,
            transparent 1px,
            transparent 2px
    );
    pointer-events: none;
    animation: scanline 10s linear infinite;
    opacity: 0.5;
    z-index: 2;
  }

  .scan-lines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 51%
    );
    background-size: 100% 4px;
    pointer-events: none;
    animation: scanlines 0.5s linear infinite;
    opacity: 0.3;
    z-index: 3;
  }

  .title-wrapper h1 {
    position: relative;
    animation: glitchText 5s infinite;
    text-shadow: 0 0 10px $primary-color,
    0 0 20px $primary-color,
    0 0 30px $primary-color;

    &::before,
    &::after {
      content: 'THE LAST CRACK';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      clip: rect(0, 900px, 0, 0);
    }

    &::before {
      text-shadow: 2px 0 #ff00ff;
      animation: glitch 3s infinite linear alternate-reverse;
    }

    &::after {
      text-shadow: -2px 0 #00ffff;
      animation: glitch 2s infinite linear alternate;
    }
  }

  .menu-btn {
    &:hover {
      .btn-text {
        animation: neonPulse 1.5s ease-in-out infinite;
      }
    }
  }

  .cyber-grid {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba($primary-color, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba($primary-color, 0.5) 1px, transparent 1px);
    background-size: 30px 30px;
    transform-origin: center;
    animation: gridRotate 120s linear infinite;
    opacity: .5;
    z-index: 0;
  }

  .title-wrapper {
    h1 {
      position: relative;
      animation: glitchText 5s infinite;
      text-shadow: 0 0 10px $primary-color,
      0 0 20px $primary-color,
      0 0 30px $primary-color;

      &::before,
      &::after {
        content: 'THE LAST CRACK';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        clip: rect(0, 900px, 0, 0);
      }

      &::before {
        text-shadow: 2px 0 #ff00ff;
        animation: glitch 3s infinite linear alternate-reverse;
      }

      &::after {
        text-shadow: -2px 0 #00ffff;
        animation: glitch 2s infinite linear alternate;
      }
    }
  }

  .menu-btn {
    &:hover {
      .btn-text {
        animation: neonPulse 1.5s ease-in-out infinite;
      }

      .btn-border {
        &::before,
        &::after {
          animation: borderGlow 1.5s ease-in-out infinite;
        }
      }
    }
  }

  .scan-lines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 51%
    );
    background-size: 100% 4px;
    pointer-events: none;
    animation: scanlines 0.5s linear infinite;
    opacity: 0.3;
    z-index: 3;
  }
}



.central-menu {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: $spacing-xl 0;

  @media (max-width: 768px) {
    padding: $spacing-lg 0;

    .title-wrapper h1 {
      font-size: 2rem;
    }

    .title-line {
      width: 200px;
    }
  }
}

.glitch-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;

  .glitch-line {
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: rgba($primary-color, 0.5);
    box-shadow: 0 0 10px rgba($primary-color, 0.8);

    &:nth-child(1) {
      top: 30%;
      animation: glitch1 4s infinite linear;
      opacity: 0.3;
    }

    &:nth-child(2) {
      top: 50%;
      animation: glitch2 3s infinite linear;
      opacity: 0.4;
    }

    &:nth-child(3) {
      top: 70%;
      animation: glitch3 2.5s infinite linear;
      opacity: 0.5;
    }
  }
}

.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: .15;
  animation: noise 0.2s infinite;
  pointer-events: none;
  z-index: 1;
}

.bgm-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba($bg-primary, 0.2);
  border: 1px solid rgba($primary-color, 0.3);
  color: $primary-color;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    background: rgba($bg-primary, 0.4);
    border-color: rgba($primary-color, 0.6);
  }

  &.playing {
    animation: pulse 2s infinite;
    border-color: rgba($primary-color, 0.8);
  }

  .icon {
    font-size: 20px;
    line-height: 1;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba($primary-color, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba($primary-color, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba($primary-color, 0);
  }
}



</style> 