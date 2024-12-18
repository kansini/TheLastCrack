<template>
  <div class="app-container">
    <MainMenu v-if="!gameStore.gameStarted" />
    <Terminal v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGameStore } from '@/stores/game';
import { useSaveStore } from '@/stores/save';
import Terminal from '@/components/Terminal.vue';
import MainMenu from '@/components/MainMenu.vue';

const gameStore = useGameStore();
const saveStore = useSaveStore();

onMounted(() => {
  // 清除旧格式的存档数据
  try {
    const savedData = localStorage.getItem('hacker_game_saves');
    if (savedData && !savedData.includes('"saves"')) {
      localStorage.removeItem('hacker_game_saves');
    }
  } catch (error) {
    console.error('Failed to check old saves:', error);
  }
  
  saveStore.loadSavesFromStorage();
});
</script>

<style lang="scss">
.app-container {
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
