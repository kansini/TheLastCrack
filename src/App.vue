<template>
  <LoadingScreen v-if="isLoading"/>
  <div class="app-container" v-show="!isLoading">
    <transition name="fade">
      <MainMenu v-if="!gameStore.gameStarted"/>
    </transition>
    <transition name="turn-on">
      <Terminal v-if="gameStore.gameStarted"/>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useGameStore} from "@/stores/game";
import {useSaveStore} from "@/stores/save";
import Terminal from "@/components/Terminal.vue";
import MainMenu from "@/components/maninMenu/MainMenu.vue";
import LoadingScreen from "@/components/LoadingScreen.vue";

const gameStore = useGameStore();
const saveStore = useSaveStore();
const isLoading = ref(true);

onMounted(() => {
  // 清除旧格式的存档数据
  try {
    const savedData = localStorage.getItem("hacker_game_saves");
    if (savedData && !savedData.includes("\"saves\"")) {
      localStorage.removeItem("hacker_game_saves");
    }
  } catch (error) {
    console.error("Failed to check old saves:", error);
  }

  saveStore.loadSavesFromStorage();

  // 模拟加载时间，实际项目中可以根据资源加载情况决定
  setTimeout(() => {
    isLoading.value = false;
  }, 4000);
});
</script>

<style lang="scss">
.app-container {
  width: 100%;
  height: 100vh;
  transition: opacity 0.5s ease;
}
</style>
