<template>
  <div class="star_wars-container">
    <canvas ref="starCanvas" class="star-background"></canvas>
    <div class="fade"></div>
    <div class="crawl">
      <div class="title">
        <p>Episode IV</p>
        <h1>A New Hope</h1>
      </div>
      <p>It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory
        against the evil Galactic Empire.</p>

      <p>During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR,
        an armored space station with enough power to destroy an entire planet.</p>

      <p>Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen
        plans that can save her people and restore freedom to the galaxy....</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from "vue";

const starCanvas = ref<HTMLCanvasElement | null>(null);
let animationId: number | null = null;

// 星星类
class Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  brightness: number;
  color: string;

  constructor(width: number, height: number) {
    this.x = Math.random() * width - width / 2;
    this.y = Math.random() * height - height / 2;
    this.z = Math.random() * 2000;
    this.size = Math.random() < 1 ?
      Math.random() * 0.8 + 0.1 :
      Math.random() * 1.5 + 2;
    this.speed = this.size * 2;
    this.brightness = Math.min(1, this.size * 0.4);
    this.color = Math.random() > 0.7 ? 'rgba(135, 206, 235, ' : 'rgba(255, 255, 255, ';
  }

  // 更新星星位置
  update(width: number, height: number) {
    this.z -= this.speed;
    if (this.z <= 0) {
      this.z = 2000;
      this.x = Math.random() * width - width / 2;
      this.y = Math.random() * height - height / 2;
      this.size = Math.random() < 0.8 ? 
        Math.random() * 2 + 0.1 : 
        Math.random() * 4 + 2;
      this.speed = this.size * 1.5;
    }
  }

  // 绘制星星
  draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const x = (this.x / this.z) * 2000 + width / 2;
    const y = (this.y / this.z) * 2000 + height / 2;
    const size = (1 - this.z / 2000) * this.size * 3;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2.5);
    gradient.addColorStop(0, this.color + this.brightness + ')');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = this.color + this.brightness + ')';
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 初始化星空
function initStars(width: number, height: number, count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push(new Star(width, height));
  }
  return stars;
}

// 动画循环
function animate(ctx: CanvasRenderingContext2D, width: number, height: number, stars: Star[]) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, width, height);

  stars.forEach(star => {
    star.update(width, height);
    star.draw(ctx, width, height);
  });

  animationId = requestAnimationFrame(() => animate(ctx, width, height, stars));
}

onMounted(() => {
  document.body.style.overflow = "hidden";

  if (!starCanvas.value) return;
  const ctx = starCanvas.value.getContext("2d");
  if (!ctx) return;

  // 设置画布尺寸
  const width = window.innerWidth;
  const height = window.innerHeight;
  starCanvas.value.width = width;
  starCanvas.value.height = height;

  // 根据屏幕大小调整星星数量
  const starCount = Math.floor((width * height) / 2000);
  const stars = initStars(width, height, Math.max(1500, starCount));
  animate(ctx, width, height, stars);

  // 监听窗口大小变化
  const handleResize = () => {
    if (!starCanvas.value || !ctx) return;
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    starCanvas.value.width = newWidth;
    starCanvas.value.height = newHeight;
    // 重新计算星星数量
    const newStarCount = Math.floor((newWidth * newHeight) / 2000);
    stars.length = 0;
    stars.push(...initStars(newWidth, newHeight, Math.max(1000, newStarCount)));
  };
  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
    }
  });
});
</script>

<style lang="scss" scoped>
.star_wars-container {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  font-family: "News Gothic", Arial, sans-serif;
  perspective: 400px;

  .star-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .fade {
    position: absolute;
    width: 100%;
    min-height: 60vh;
    top: -25px;
    background-image: linear-gradient(0deg, transparent, black 75%);
    z-index: 1;
  }

  .crawl {
    position: absolute;
    top: 80%;
    transform-origin: 50% 100%;
    animation: crawl 8s linear;
    text-align: justify;
    width: 100vw;
    left: 50%;
    transform: translateX(-50%) rotateX(25deg);
    line-height: 1.8;

    .title {
      font-size: 300%;
      text-align: center;
      margin-bottom: 1em;

      h1 {
        font-size: 250%;
        color: #ffd700;
        margin: 0 0 0.5em;
      }

      p {
        margin: 0;
        color: #ffd700;
        font-size: 150%;
      }
    }

    p {
      color: #ffd700;
      font-size: 2.8vw;
      line-height: 1.8;
      font-weight: bold;
      margin: 1em 0;
      letter-spacing: 2px;
    }
  }
}

@keyframes crawl {
  0% {
    top: 80%;
    transform: translateX(-50%) rotateX(25deg) translateZ(0);
  }
  100% {
    top: -200%;
    transform: translateX(-50%) rotateX(25deg) translateZ(-2500px);
  }
}
</style> 