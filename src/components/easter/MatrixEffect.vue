<template>
  <div class="matrix-container">
    <canvas ref="canvas" :style="{ opacity }"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
const opacity = ref(0);
let animationId: number | null = null;

// Matrix字符集
const chars = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// 雨滴类
class Drop {
  x: number;
  y: number;
  speed: number;
  value: string;
  fontSize: number;
  canvasHeight: number;

  constructor(x: number, canvasHeight: number) {
    this.x = x;
    this.y = 0;
    this.speed = 1 + Math.random() * 3;
    this.value = '';
    this.fontSize = 20 + Math.random() * 6;
    this.canvasHeight = canvasHeight;
    this.setRandomValue();
  }

  setRandomValue() {
    this.value = chars[Math.floor(Math.random() * chars.length)];
  }

  update() {
    this.y += this.speed;
    if (this.y > this.canvasHeight) {
      this.y = 0;
      this.setRandomValue();
    }
    if (Math.random() > 0.95) {
      this.setRandomValue();
    }
  }
}

onMounted(() => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  // 设置画布大小
  const resize = () => {
    canvas.value!.width = window.innerWidth;
    canvas.value!.height = window.innerHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  // 创建雨滴
  const drops: Drop[] = [];
  const columnCount = Math.floor(canvas.value.width / 20);
  for (let i = 0; i < columnCount; i++) {
    drops.push(new Drop(i * 20, canvas.value.height));
  }

  // 渐入效果
  let fadeIn = 0;
  const fadeInInterval = setInterval(() => {
    fadeIn += 0.05;
    opacity.value = Math.min(fadeIn, 0.8);
    if (fadeIn >= 0.8) {
      clearInterval(fadeInInterval);
    }
  }, 50);

  // 动画循环
  const animate = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.value!.width, canvas.value!.height);

    drops.forEach((drop, _i) => {
      // 主字符
      const gradient = ctx.createLinearGradient(0, drop.y - drop.fontSize, 0, drop.y);
      gradient.addColorStop(0, '#0f0');
      gradient.addColorStop(1, '#0a0');
      ctx.fillStyle = gradient;
      ctx.font = `${drop.fontSize}px monospace`;
      ctx.fillText(drop.value, drop.x, drop.y);

      // 尾迹效果
      for (let j = 1; j <= 5; j++) {
        const y = drop.y - j * drop.fontSize;
        if (y > 0) {
          ctx.fillStyle = `rgba(0, 255, 0, ${0.2 - j * 0.03})`;
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], drop.x, y);
        }
      }

      drop.update();
    });

    animationId = requestAnimationFrame(animate);
  };

  animate();

  // 清理事件监听
  onUnmounted(() => {
    window.removeEventListener('resize', resize);
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
    }
  });
});

const startAnimation = () => {
  opacity.value = 0.8;
};

const stopAnimation = () => {
  opacity.value = 0;
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }
};

defineExpose({
  startAnimation,
  stopAnimation
});
</script>

<style scoped>
.matrix-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  background: black;
}

canvas {
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease;
}
</style> 