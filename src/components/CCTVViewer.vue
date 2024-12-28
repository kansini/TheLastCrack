<template>
  <Modal
      transitionName="zoom"
      :visible="isVisible"
      :title="'监控录像 - ' + cameraName"
      @close="handleClose"
  >
    <div class="cctv-viewer">
      <div class="video-container">
        <div class="video-frame">
          <!-- 监控画面 -->
          <div class="video-content">
            <!-- 噪点效果 -->
            <div class="noise-overlay"></div>

            <!-- 监控画面内容 -->
            <div class="scene" :class="'scene-' + props.cameraId">
              <!-- 视频背景 -->
              <video
                  ref="videoRef"
                  class="scene-video"
                  :src="getSceneVideo"
                  muted
                  loop
                  :playbackRate="0.5"
                  :currentTime="videoTime"
              ></video>

              <!-- 动态目标 -->
              <div class="target"
                   v-if="showTarget"
                   :style="targetStyle"
                   :class="{ active: isTargetInView }">
                <div class="target-box"></div>
              </div>

              <!-- 场景元素 -->
              <div class="scene-elements"></div>
            </div>
          </div>

          <!-- 扫描线 -->
          <div class="scan-line"></div>

          <!-- 界面元素 -->
          <div class="overlay-elements">
            <div class="timestamp">{{ currentTime }}</div>
            <div class="location">{{ location }}</div>
            <div class="status" :class="{ alert: hasTarget }">
              {{ status }}
            </div>

            <!-- 目标框 -->
            <div class="target-frame"
                 v-if="hasTarget"
                 :style="targetFrameStyle">
              <div class="corner top-left"></div>
              <div class="corner top-right"></div>
              <div class="corner bottom-left"></div>
              <div class="corner bottom-right"></div>
              <div class="target-info">
                ID: SUSPECT-{{ props.cameraId }}
                <br>
                MATCH: 89%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <div class="time-slider">
          <input type="range"
                 v-model="currentFrame"
                 :min="0"
                 :max="totalFrames"
                 @input="updateFrame"/>
        </div>
        <div class="buttons">
          <button @click="playPause">
            {{ isPlaying ? "暂停" : "播放" }}
          </button>
          <button @click="markTarget"
                  :class="{ active: hasTarget }">
            标记目标
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, computed} from "vue"
import Modal from "./Modal.vue"
import {useGameStore} from "@/stores/game"

const props = defineProps<{
  cameraId: string
  onClose: () => void
}>()

const gameStore = useGameStore()
const isVisible = ref(false)
const currentFrame = ref(0)
const totalFrames = ref(100)
const isPlaying = ref(false)
const hasTarget = ref(false)
let playInterval: number | null = null

// 摄像头信息
const cameraInfo: any = {
  "01": {name: "火车站大厅", location: "火车站出口", time: "15:30", hasTarget: true},
  "02": {name: "商业中心", location: "购物中心出口", time: "16:15", hasTarget: true},
  "03": {name: "公园南门", location: "公园长椅区", time: "17:00", hasTarget: true},
  "04": {name: "居民区", location: "居民区入口", time: "17:45", hasTarget: true}
}

const cameraName = computed(() => cameraInfo[props.cameraId]?.name || "未知位置")
const location = computed(() => cameraInfo[props.cameraId]?.location || "")
const currentTime = computed(() => {
  const baseTime = cameraInfo[props.cameraId]?.time || "00:00"
  const [hours, minutes] = baseTime.split(":").map(Number)
  const addedMinutes = Math.floor((currentFrame.value / totalFrames.value) * 10)
  const newMinutes = minutes + addedMinutes
  return `${hours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`
})

const status = computed(() => {
  if (hasTarget.value) return "检测到目标"
  return "正常监控中"
})

const videoRef = ref<HTMLVideoElement | null>(null)

// 获取场景视频
const getSceneVideo = computed(() => {
  switch (props.cameraId) {
    case "01":
      return new URL("../assets/video/station.mp4", import.meta.url).href
    case "02":
      return new URL("../assets/video/mall.mp4", import.meta.url).href
    case "03":
      return new URL("../assets/video/park.mp4", import.meta.url).href
    case "04":
      return new URL("../assets/video/residential.mp4", import.meta.url).href
    default:
      return ""
  }
})

// 控制视频播放时间
const videoTime = computed(() => {
  return (currentFrame.value / totalFrames.value) * (videoRef.value?.duration as number) || 0
})

// 播放/暂停时同时控制视频
const playPause = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    videoRef.value?.play()
    playInterval = window.setInterval(() => {
      if (currentFrame.value >= totalFrames.value) {
        currentFrame.value = 0
      } else {
        currentFrame.value++
      }
    }, 100)
  } else {
    videoRef.value?.pause()
    if (playInterval) {
      clearInterval(playInterval)
    }
  }
}

// 更新帧时同时更新视频时间
const updateFrame = () => {
  const frame = currentFrame.value
  const total = totalFrames.value
  const progress = frame / total

  // 根据不同摄像头设置目标出现的时间段
  switch (props.cameraId) {
    case "01":
      showTarget.value = progress > 0.3 && progress < 0.8
      isTargetInView.value = progress > 0.4 && progress < 0.6
      break
    case "02":
      showTarget.value = progress > 0.2 && progress < 0.7
      isTargetInView.value = progress > 0.3 && progress < 0.5
      break
    case "03":
      showTarget.value = progress > 0.4 && progress < 0.9
      isTargetInView.value = progress > 0.5 && progress < 0.7
      break
    case "04":
      showTarget.value = progress > 0.3 && progress < 0.6
      isTargetInView.value = progress > 0.4 && progress < 0.5
      break
  }

  if (videoRef.value) {
    videoRef.value.currentTime = videoTime.value
  }
}

// 标记目标
const markTarget = () => {
  hasTarget.value = !hasTarget.value
  if (hasTarget.value) {
    gameStore.completeTask("analyze_cctv")
  }
}

const handleClose = () => {
  isVisible.value = false
  if (playInterval) {
    clearInterval(playInterval)
  }
  setTimeout(() => {
    props.onClose()
  }, 300)
}

const showTarget = ref(false)
const isTargetInView = ref(false)

// 目标位置动画
const targetStyle = computed(() => {
  const progress = currentFrame.value / totalFrames.value
  let x, y

  switch (props.cameraId) {
    case "01":
      // 从左向右移动到地铁入口
      x = progress * 60 + 20
      y = 50
      break
    case "02":
      // 从商场出口往公交站移动
      x = 40 - progress * 20
      y = 60 + progress * 10
      break
    case "03":
      // 在公园长椅区等待
      x = 50
      y = 50 + Math.sin(progress * Math.PI * 2) * 2 // 轻微移动
      break
    case "04":
      // 进入居民区
      x = 30 + progress * 40
      y = 40
      break
    default:
      x = 50
      y = 50
  }

  return {
    left: `${x}%`,
    top: `${y}%`
  }
})

// 目标框样式
const targetFrameStyle = computed(() => {
  if (!showTarget.value || !isTargetInView.value) return {}

  const {left, top} = targetStyle.value

  return {
    left: left,
    top: top,
    transform: "translate(-50%, -50%)",
    transition: "all 0.3s ease"
  }
})

onMounted(() => {
  isVisible.value = true
  // 加载完成后自动播放
  if (videoRef.value) {
    videoRef.value.play()
  }
})

onUnmounted(() => {
  if (playInterval) {
    clearInterval(playInterval)
  }
  // 停止视频播放
  if (videoRef.value) {
    videoRef.value.pause()
  }
})
</script>

<style scoped lang="scss">
.cctv-viewer {
  width: 640px;
  padding: 16px;
  color: #e0e0e0;

  .video-container {
    aspect-ratio: 16/9;
    background: #000;
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    margin-bottom: 16px;

    .video-frame {
      width: 100%;
      height: 100%;
      position: relative;
      background: linear-gradient(rgba(0, 255, 255, 0.1), rgba(0, 255, 255, 0.05));

      .scan-line {
        position: absolute;
        width: 100%;
        height: 2px;
        background: rgba(0, 255, 255, 0.3);
        animation: scan 2s linear infinite;
      }

      .timestamp {
        position: absolute;
        top: 16px;
        right: 16px;
        color: #00ffff;
        font-family: monospace;
        font-size: 14px;
      }

      .location {
        position: absolute;
        top: 16px;
        left: 16px;
        color: #00ffff;
        font-size: 14px;
      }

      .status {
        position: absolute;
        bottom: 16px;
        left: 16px;
        padding: 4px 8px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        font-size: 12px;

        &.alert {
          color: #ff0000;
          animation: blink 1s infinite;
        }
      }
    }
  }

  .controls {
    .time-slider {
      margin-bottom: 16px;

      input[type="range"] {
        width: 100%;
        background: rgba(0, 255, 255, 0.1);
      }
    }

    .buttons {
      display: flex;
      gap: 8px;

      button {
        flex: 1;
        padding: 8px;
        background: rgba(0, 255, 255, 0.1);
        border: 1px solid rgba(0, 255, 255, 0.3);
        border-radius: 4px;
        color: #00ffff;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(0, 255, 255, 0.2);
        }

        &.active {
          background: rgba(255, 0, 0, 0.2);
          border-color: #ff0000;
          color: #ff0000;
        }
      }
    }
  }

  .video-content {
    position: absolute;
    inset: 0;
    overflow: hidden;

    .noise-overlay {
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      opacity: 0.1;
      pointer-events: none;
    }

    .scene {
      position: absolute;
      inset: 0;
      background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)) center/cover;

      .scene-video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.8; // 调整视频透明度
        filter: brightness(0.7) contrast(1.2); // 调整视频效果
      }
    }

    .target {
      position: absolute;
      width: 40px;
      height: 40px;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;

      .target-box {
        width: 100%;
        height: 100%;
        border: 2px solid rgba(255, 255, 0, 0.5);

        &::before {
          content: '';
          position: absolute;
          inset: 5px;
          border: 1px solid rgba(255, 255, 0, 0.3);
        }
      }

      &.active .target-box {
        border-color: rgba(255, 0, 0, 0.7);
        animation: pulse 1s infinite;
      }
    }
  }

  .target-frame {
    position: absolute;
    width: 120px;
    height: 120px;
    border: 2px solid rgba(255, 0, 0, 0.7);

    .corner {
      position: absolute;
      width: 10px;
      height: 10px;
      border: 2px solid rgba(255, 0, 0, 0.7);

      &.top-left {
        top: -2px;
        left: -2px;
        border-right: none;
        border-bottom: none;
      }

      // ... 其他角落样式类似
    }

    .target-info {
      position: absolute;
      bottom: 0;
      left: 4px;
      color: #ffffff;
      font-size: 10px;
      font-family: monospace;
      text-shadow: 0 0 2px rgba(255, 0, 0, 0.5);
    }
  }
}

@keyframes scan {
  from {
    top: 0;
  }
  to {
    top: 100%;
  }
}

@keyframes blink {
  50% {
    opacity: 0.5;
  }
}
</style> 