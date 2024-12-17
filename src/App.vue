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
  saveStore.loadSavesFromStorage();
});
</script>
