<template>
  <canvas ref="canvas" class="confetti-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrame: number;
let particles: Particle[] = [];
let burstCount = 0;
const maxBursts = 3;
let isRaining = false;
let burstTimeout: number | null = null;

interface Particle {
  x: number;
  y: number;
  rotation: number;
  size: number;
  color: string;
  velocity: {
    x: number;
    y: number;
    rotation: number;
  };
  gravity: number;
  drag: number;
  shrink: number;
  fade: number;
  alpha: number;
}

const colors = [
  '#ff0000', // 红
  '#ff7f00', // 橙
  '#ffff00', // 黄
  '#00ff00', // 绿
  '#0000ff', // 蓝
  '#4b0082', // 靛
  '#8f00ff', // 紫
  '#ff69b4', // 粉
  '#ffd700', // 金
  '#00ffff', // 青
];

function createParticle(x: number, y: number, burst: boolean = false): Particle {
  const angle = burst ? Math.random() * Math.PI * 2 : Math.PI + Math.random() * Math.PI;
  const speed = burst ? Math.random() * 35 + 15 : Math.random() * 3 + 1;
  const size = Math.random() * (burst ? 24 : 16) + (burst ? 16 : 8);
  
  return {
    x,
    y,
    rotation: Math.random() * 360,
    size,
    color: colors[Math.floor(Math.random() * colors.length)],
    velocity: {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
      rotation: (Math.random() - 0.5) * (burst ? 12 : 3)
    },
    gravity: burst ? 0.35 : 0.15,
    drag: burst ? 0.97 : 0.98,
    shrink: burst ? 0.97 : 0.99,
    fade: burst ? Math.random() * 0.015 + 0.008 : Math.random() * 0.008 + 0.004,
    alpha: 1
  };
}

function createBurst() {
  if (!canvas.value) return;
  const x = canvas.value.width / 2;
  const y = canvas.value.height * 0.7;
  
  const burstPoints = [
    { x, y },
    { x: x - 50, y: y - 20 },
    { x: x + 50, y: y - 20 },
  ];

  burstPoints.forEach(point => {
    for (let i = 0; i < 100; i++) {
      particles.push(createParticle(point.x, point.y, true));
    }
  });
  
  burstCount++;

  if (burstCount === maxBursts) {
    burstTimeout = window.setTimeout(() => {
      isRaining = true;
      particles = [];
    }, 2500);
  }
}

function createRainParticles() {
  if (!canvas.value) return;
  const maxParticles = isRaining ? 150 : 0;
  if (particles.length < maxParticles && Math.random() < 0.3) {
    const x = Math.random() * canvas.value.width;
    particles.push(createParticle(x, -20, false));
  }
}

function animate() {
  if (!canvas.value || !ctx) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  if (burstCount < maxBursts && !isRaining) {
    createBurst();
    if (burstCount < maxBursts) {
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 300);
      return;
    }
  } else if (isRaining) {
    createRainParticles();
  }

  particles = particles.filter(particle => {
    particle.x += particle.velocity.x;
    particle.y += particle.velocity.y;
    particle.rotation += particle.velocity.rotation;

    particle.velocity.x *= particle.drag;
    particle.velocity.y *= particle.drag;
    particle.velocity.y += particle.gravity;
    particle.size *= particle.shrink;
    particle.alpha -= particle.fade;

    if (particle.alpha > 0 && particle.size > 1) {
      ctx!.save();
      ctx!.translate(particle.x, particle.y);
      ctx!.rotate((particle.rotation * Math.PI) / 180);
      ctx!.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
      ctx!.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
      ctx!.restore();
      return true;
    }
    return false;
  });

  animationFrame = requestAnimationFrame(animate);
}

function resizeCanvas() {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

onMounted(() => {
  if (!canvas.value) return;
  ctx = canvas.value.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  animate();
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
  cancelAnimationFrame(animationFrame);
  if (burstTimeout) {
    clearTimeout(burstTimeout);
  }
});
</script>

<style scoped>
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}
</style> 