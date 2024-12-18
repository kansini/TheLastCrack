<template>
  <div class="main-menu">
    <div class="menu-container">
      <h1>The Last Crack</h1>
      <div class="menu-options">
        <button @click="startNewGame">新游戏</button>
        <button @click="toggleLoadGame" v-if="hasSaves">继续游戏</button>
        <button @click="showTutorial">游戏教程</button>
        <button @click="showAbout">关于游戏</button>
      </div>

      <!-- 存档列表 -->
      <div class="save-list" v-if="showSaveList">
        <h2>选择存档</h2>
        <div class="saves-container">
          <div v-if="saves.length === 0" class="no-saves">
            暂无存档
          </div>
          <div v-else v-for="save in saves" :key="save.id" class="save-item">
            <div class="save-info">
              <span class="save-name">#{{ save.id }}: {{ save.name }}</span>
              <span class="save-date">{{ formatDate(save.save.timestamp) }}</span>
            </div>
            <div class="save-actions">
              <button @click="loadGame(save.id)" class="action-btn">加载</button>
              <button @click="deleteSave(save.id)" class="action-btn delete">删除</button>
            </div>
          </div>
        </div>
        <button @click="toggleLoadGame" class="back-btn">返回</button>
      </div>
    </div>

    <!-- 教程和关于页面 -->
    <Tutorial :visible="showTutorialModal" @close="closeTutorial" />
    <About :visible="showAboutModal" @close="closeAbout" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGameStore } from '@/stores/game';
import { useSaveStore } from '@/stores/save';
import Tutorial from './Tutorial.vue';
import About from './About.vue';

const gameStore = useGameStore();
const saveStore = useSaveStore();
const showSaveList = ref(false);
const showTutorialModal = ref(false);
const showAboutModal = ref(false);

const saves = computed(() => saveStore.getSaves());
const hasSaves = computed(() => saves.value.length > 0);

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
  position: absolute;
  top: 0;
  left: 0;
  
  .menu-container {
    text-align: center;
    width: 100%;
    max-width: 600px;
    padding: $spacing-lg;
    
    h1 {
      font-size: 3rem;
      margin-bottom: $spacing-lg;
      text-shadow: 0 0 10px $primary-color-light;
    }
    
    h2 {
      font-size: 1.5rem;
      margin-bottom: $spacing-md;
    }
    
    .menu-options {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
      
      button {
        padding: $spacing-md $spacing-lg;
        font-size: 1.2rem;
        background-color: transparent;
        border: 2px solid $primary-color;
        color: $primary-color;
        cursor: pointer;
        transition: all $transition-duration;
        
        &:hover {
          background-color: $primary-color;
          color: $bg-primary;
        }
      }
    }
  }

  .save-list {
    margin-top: $spacing-lg;
    
    .saves-container {
      max-height: 300px;
      overflow-y: auto;
      margin: $spacing-md 0;
      padding: $spacing-md;
      border: 1px solid $primary-color;
      border-radius: $border-radius;
      
      &::-webkit-scrollbar {
        width: 8px;
      }
      
      &::-webkit-scrollbar-track {
        background: $bg-primary;
      }
      
      &::-webkit-scrollbar-thumb {
        background: $primary-color;
        border-radius: $border-radius;
      }
    }
    
    .save-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacing-sm;
      border-bottom: 1px solid rgba($primary-color, 0.3);
      
      &:last-child {
        border-bottom: none;
      }
      
      .save-info {
        text-align: left;
        
        .save-name {
          display: block;
          font-size: 1.1rem;
        }
        
        .save-date {
          font-size: 0.9rem;
          opacity: 0.8;
        }
      }
      
      .save-actions {
        display: flex;
        gap: $spacing-sm;
        
        .action-btn {
          padding: $spacing-xs $spacing-sm;
          font-size: 0.9rem;
          background-color: transparent;
          border: 1px solid $primary-color;
          color: $primary-color;
          cursor: pointer;
          transition: all $transition-duration;
          
          &:hover {
            background-color: $primary-color;
            color: $bg-primary;
          }
          
          &.delete {
            border-color: #ff4444;
            color: #ff4444;
            
            &:hover {
              background-color: #ff4444;
              color: $bg-primary;
            }
          }
        }
      }
    }
    
    .back-btn {
      margin-top: $spacing-md;
      padding: $spacing-sm $spacing-lg;
      font-size: 1rem;
      background-color: transparent;
      border: 1px solid $primary-color;
      color: $primary-color;
      cursor: pointer;
      transition: all $transition-duration;
      
      &:hover {
        background-color: $primary-color;
        color: $bg-primary;
      }
    }
    
    .no-saves {
      padding: $spacing-lg;
      color: rgba($primary-color, 0.7);
    }
  }
}
</style> 