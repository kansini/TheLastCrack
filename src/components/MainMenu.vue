<template>
  <div class="main-menu">
    <div class="menu-container">
      <!-- 中央主菜单 -->
      <div class="central-menu">
        <div class="grid-overlay"></div>

        <div class="title-container">
          <div class="title-line"></div>
          <div class="title-wrapper">
            <div class="title-decoration left"></div>
            <h1>THE LAST CRACK</h1>
            <div class="title-decoration right"></div>
          </div>
          <div class="title-line"></div>
          <button @click="toggleLanguage" class="lang-btn">
            {{ currentLanguage === "zh" ? "ENG" : "中文" }}
          </button>
        </div>

        <div class="menu-options">
          <button @click="startNewGame" class="menu-btn">
            <div class="btn-content">
              <span class="btn-text">{{ t("newGame") }}</span>
            </div>
            <div class="btn-border"></div>
            <div class="btn-glow"></div>
          </button>
          <button @click="toggleLoadGame" v-if="hasSaves" class="menu-btn">
            <div class="btn-content">
              <span class="btn-text">{{ t("continueGame") }}</span>
            </div>
            <div class="btn-border"></div>
            <div class="btn-glow"></div>
          </button>
          <button @click="showTutorial" class="menu-btn">
            <div class="btn-content">
              <span class="btn-text">{{ t("tutorial") }}</span>
            </div>
            <div class="btn-border"></div>
            <div class="btn-glow"></div>
          </button>
          <button @click="showAbout" class="menu-btn">
            <div class="btn-content">
              <span class="btn-text">{{ t("about") }}</span>
            </div>
            <div class="btn-border"></div>
            <div class="btn-glow"></div>
          </button>
        </div>

        <div class="decoration-container">
          <div class="decoration-line"></div>
          <div class="decoration-text">{{ t("systemReady") }}</div>
          <div class="decoration-line"></div>
        </div>
      </div>

      <!-- 存档列表 -->
      <div class="save-list" v-if="showSaveList">
        <div class="save-list-container">
          <div class="save-header">
            <h2>{{ t("selectSaveFile") }}</h2>
            <button @click="toggleLoadGame" class="close-btn">×</button>
          </div>
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
                <button @click="loadGame(save.id)" class="action-btn load">{{ t("load") }}</button>
                <button @click="deleteSave(save.id)" class="action-btn delete">{{ t("delete") }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 教程和关于页面 -->
    <Tutorial :visible="showTutorialModal" @close="closeTutorial"/>
    <About :visible="showAboutModal" @close="closeAbout"/>

    <div class="glitch-effects">
      <div class="glitch-line"></div>
      <div class="glitch-line"></div>
      <div class="glitch-line"></div>
    </div>
    <div class="noise-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted} from "vue";
import {useGameStore} from "@/stores/game";
import {useSaveStore} from "@/stores/save";
import {useLanguageStore} from "@/stores/language";
import {getCurrentLevelData} from "@/game/levels";
import Tutorial from "./Tutorial.vue";
import About from "./About.vue";

const gameStore = useGameStore();
const saveStore = useSaveStore();
const languageStore = useLanguageStore();

const showSaveList = ref(false);
const showTutorialModal = ref(false);
const showAboutModal = ref(false);
const uptimeSeconds = ref(0);

const saves = computed(() => saveStore.getSaves());
const hasSaves = computed(() => saves.value.length > 0);
const currentLanguage = computed(() => languageStore.currentLanguage);
const t = computed(() => languageStore.t);

// const uptime = computed(() => {
//   const hours = Math.floor(uptimeSeconds.value / 3600);
//   const minutes = Math.floor((uptimeSeconds.value % 3600) / 60);
//   const seconds = uptimeSeconds.value % 60;
//   return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
// });
//
// const lastSaveTime = computed(() => {
//   if (saves.value.length === 0) return "N/A";
//   const lastSave = saves.value[saves.value.length - 1];
//   return new Date(lastSave.save.timestamp).toLocaleString();
// });

let uptimeInterval: number;

onMounted(() => {
  uptimeInterval = window.setInterval(() => {
    uptimeSeconds.value++;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(uptimeInterval);
});

const startNewGame = () => {
  gameStore.startNewGame();
};

const toggleLoadGame = () => {
  showSaveList.value = !showSaveList.value;
};

const loadGame = (saveId: number) => {
  if (saveStore.loadSave(saveId)) {
    const saveData = saveStore.getSaveData(saveId);
    if (saveData) {
      gameStore.loadSavedGame(saveData);
    }
  }
};

const deleteSave = (saveId: number) => {
  saveStore.deleteSave(saveId);
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

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
    background: linear-gradient(rgba($primary-color, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba($primary-color, 0.3) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.3;
    animation: gridMove 20s linear infinite;
  }

  .menu-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $spacing-lg;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      padding: $spacing-md;
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

    .title-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      gap: $spacing-md;
      justify-content: center;

      .title-decoration {
        width: 20px;
        height: 20px;
        position: relative;

        &::before, &::after {
          content: '';
          position: absolute;
          background: $primary-color;
          box-shadow: 0 0 10px $primary-color;
        }

        &.left {
          &::before {
            left: 0;
            top: 50%;
            width: 100%;
            height: 2px;
            transform: translateY(-50%);
          }

          &::after {
            left: 0;
            top: 0;
            width: 2px;
            height: 100%;
          }
        }

        &.right {
          &::before {
            right: 0;
            top: 50%;
            width: 100%;
            height: 2px;
            transform: translateY(-50%);
          }

          &::after {
            right: 0;
            top: 0;
            width: 2px;
            height: 100%;
          }
        }
      }

      h1 {
        font-size: 3rem;
        text-shadow: 0 0 20px $primary-color;
        letter-spacing: 4px;
        margin: 0 $spacing-md;
        white-space: nowrap;
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

    @media (max-width: 768px) {
      margin-bottom: $spacing-lg;

      .title-line {
        width: 200px;
      }

      .title-wrapper {
        h1 {
          font-size: 2rem;
          margin: 0 $spacing-sm;
        }

        .title-decoration {
          width: 15px;
          height: 15px;
        }
      }

      .lang-btn {
        margin-top: $spacing-sm;
        font-size: 0.8rem;
      }
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

  .save-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($bg-primary, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    z-index: 100;

    .save-list-container {
      width: 600px;
      background: $bg-secondary;
      border: 1px solid rgba($primary-color, 0.3);
      box-shadow: 0 0 20px rgba($primary-color, 0.2);
      position: relative;
      z-index: 101;

      .save-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: $spacing-md;
        border-bottom: 1px solid rgba($primary-color, 0.3);

        h2 {
          font-size: 1.5rem;
          margin: 0;
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

      .saves-container {
        max-height: 400px;
        overflow-y: auto;
        padding: $spacing-md;

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

            .action-btn {
              padding: $spacing-xs $spacing-sm;
              background: transparent;
              border: 1px solid $primary-color;
              color: $primary-color;
              cursor: pointer;
              transition: all 0.3s ease;

              &:hover {
                background: $primary-color;
                color: $bg-primary;
              }

              &.delete {
                border-color: #ff4444;
                color: #ff4444;

                &:hover {
                  background: #ff4444;
                  color: $bg-primary;
                }
              }
            }
          }
        }
      }
    }
  }
}

@keyframes gridMove {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(50px);
  }
}

@keyframes scanLine {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
}

@keyframes borderGlow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

@keyframes progressGlow {
  0%, 100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
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
  opacity: 0.05;
  pointer-events: none;
  z-index: 1;
}

.title-wrapper h1 {
  position: relative;
  animation: textGlitch 3s infinite;

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
    text-shadow: -2px 0 $primary-color;
    animation: glitchText 3s infinite linear alternate-reverse;
  }

  &::after {
    text-shadow: 2px 0 $primary-color;
    animation: glitchText 2s infinite linear alternate;
  }
}

@keyframes glitch1 {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes glitch2 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes glitch3 {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(50%);
  }
}

@keyframes textGlitch {
  0%, 100% {
    transform: none;
  }
  92% {
    transform: skew(2deg);
  }
  94% {
    transform: skew(-2deg);
  }
  96% {
    transform: skew(1deg);
  }
  98% {
    transform: skew(-1deg);
  }
}

@keyframes glitchText {
  0% {
    clip: rect(44px, 9999px, 56px, 0);
  }
  5% {
    clip: rect(12px, 9999px, 23px, 0);
  }
  10% {
    clip: rect(64px, 9999px, 70px, 0);
  }
  15% {
    clip: rect(32px, 9999px, 39px, 0);
  }
  20% {
    clip: rect(27px, 9999px, 36px, 0);
  }
  25% {
    clip: rect(54px, 9999px, 63px, 0);
  }
  30% {
    clip: rect(19px, 9999px, 28px, 0);
  }
  35% {
    clip: rect(42px, 9999px, 51px, 0);
  }
  40% {
    clip: rect(35px, 9999px, 44px, 0);
  }
  45% {
    clip: rect(63px, 9999px, 72px, 0);
  }
  50% {
    clip: rect(15px, 9999px, 24px, 0);
  }
  55% {
    clip: rect(47px, 9999px, 56px, 0);
  }
  60% {
    clip: rect(29px, 9999px, 38px, 0);
  }
  65% {
    clip: rect(52px, 9999px, 61px, 0);
  }
  70% {
    clip: rect(21px, 9999px, 30px, 0);
  }
  75% {
    clip: rect(46px, 9999px, 55px, 0);
  }
  80% {
    clip: rect(33px, 9999px, 42px, 0);
  }
  85% {
    clip: rect(59px, 9999px, 68px, 0);
  }
  90% {
    clip: rect(24px, 9999px, 33px, 0);
  }
  95% {
    clip: rect(49px, 9999px, 58px, 0);
  }
  100% {
    clip: rect(37px, 9999px, 46px, 0);
  }
}

.menu-btn {
  &:hover {
    .btn-text {
      animation: buttonGlitch 0.3s cubic-bezier(.25, .46, .45, .94) both;
    }
  }
}

@keyframes buttonGlitch {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}

.language-switch {
  display: none;
}
</style> 