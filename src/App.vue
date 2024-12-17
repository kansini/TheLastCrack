<template>
  <MainMenu v-if="!gameStore.gameStarted" />
  <Terminal v-else />
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
