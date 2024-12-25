<template>
  <div class="loading-screen" :class="{ 'fade-out': !isLoading }">
    <div class="crt-screen">
      <div class="crt-effects">
        <div class="crt-scanlines"></div>
        <div class="crt-flicker"></div>
        <div class="crt-vignette"></div>
        <div class="crt-noise"></div>
      </div>
      <div class="loading-content">
        <div class="screen-header">SYSTEM BOOT</div>
        <div class="loading-text">
          <div class="progress-bar">
            <div class="progress" :style="{ width: `${progress}%` }"></div>
          </div>
          <div class="status-text">{{ statusText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue"

const isLoading = ref(true)
const progress = ref(0)
const statusText = ref("Initializing...")

const statusMessages = [
  "Connecting to mainframe...",
  "Establishing secure connection...",
  "Loading system modules...",
  "Initializing core components...",
  "Verifying system integrity...",
  "Starting application..."
]

onMounted(() => {
  let currentStatus = 0
  const progressInterval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 1
      if (progress.value % 20 === 0 && currentStatus < statusMessages.length) {
        statusText.value = statusMessages[currentStatus]
        currentStatus++
      }
    } else {
      clearInterval(progressInterval)
      setTimeout(() => {
        isLoading.value = false
      }, 500)
    }
  }, 30)
})
</script>

<style scoped lang="scss">
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s;

  &.fade-out {
    opacity: 0;
    pointer-events: none;
  }
}

.crt-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
    pointer-events: none;
  }
}

.crt-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.crt-scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
          to bottom,
          transparent 50%,
          rgba(0, 0, 0, 0.3) 51%
  );
  background-size: 100% 3px;
  animation: scanline 10s linear infinite;
  opacity: 0.7;
}

.crt-flicker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  animation: flicker 0.15s infinite;
}

.crt-vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
          circle at center,
          transparent 60%,
          rgba(0, 0, 0, 0.8) 100%
  );
  pointer-events: none;
}

.crt-noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANgpUgAAAACHRSTlMzMzMzMzMzM85JBgUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAwSURBVDjLY2AYBaNg8ANTC4Q5AlnCECYzkMkKYbIAmQxgZgKQOQzGDAyTRsFgBgDqpApNXQ6EawAAAABJRU5ErkJggg==');
  background-repeat: repeat;
  opacity: 0.05;
  animation: noise 0.2s infinite;
}

.loading-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #0ff;
  font-family: 'Share Tech Mono', monospace;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);

  .screen-header {
    font-size: 32px;
    margin-bottom: 16px;
    letter-spacing: 2px;
    animation: textGlow 2s ease-in-out infinite;
  }

  .loading-text {
    font-size: 24px;
    animation: textGlow 2s ease-in-out infinite;

    .progress-bar {
      width: 240px;
      height: 4px;
      background: rgba(0, 255, 255, 0.2);
      margin: 20px auto;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);

      .progress {
        height: 100%;
        background: #0ff;
        transition: width 0.3s ease;
        position: relative;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
                  90deg,
                  transparent,
                  rgba(255, 255, 255, 0.4),
                  transparent
          );
          animation: progressGlow 2s linear infinite;
        }
      }
    }
  }
}


.status-text {
  font-size: 16px;
  opacity: 0.8;
  height: 20px;
  margin-top: 10px;
  letter-spacing: 1px;
}

@keyframes scanline {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(4px);
  }
}

@keyframes flicker {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.1;
  }
}

@keyframes textGlow {
  0%, 100% {
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
  }
}

@keyframes progressGlow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes noise {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-1%, -1%);
  }
  20% {
    transform: translate(1%, 1%);
  }
  30% {
    transform: translate(-2%, -2%);
  }
  40% {
    transform: translate(2%, 2%);
  }
  50% {
    transform: translate(-1%, 1%);
  }
  60% {
    transform: translate(1%, -1%);
  }
  70% {
    transform: translate(2%, -2%);
  }
  80% {
    transform: translate(-2%, 2%);
  }
  90% {
    transform: translate(1%, -1%);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style> 