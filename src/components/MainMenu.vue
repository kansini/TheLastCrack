<template>
  <div class="main-menu" v-if="!gameStore.gameStarted">
    <div class="menu-container">
      <h1>黑客模拟器</h1>
      <div class="menu-options">
        <button @click="startGame">开始游戏</button>
        <button @click="showTutorial">游戏教程</button>
        <button @click="showAbout">关于游戏</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();

const startGame = () => {
  gameStore.startGame();
};

const showTutorial = () => {
  // TODO: 实现教程显示逻辑
};

const showAbout = () => {
  // TODO: 实现关于页面显示逻辑
};
</script>

<style lang="scss" scoped>
.main-menu {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $bg-primary;
  color: $primary-color;
  
  .menu-container {
    text-align: center;
    
    h1 {
      font-size: 3rem;
      margin-bottom: $spacing-lg;
      text-shadow: 0 0 10px $primary-color-light;
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
}
</style> 