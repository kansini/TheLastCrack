<template>
  <Modal
      transitionName="zoom"
      :visible="isVisible"
      title="声纹比对分析"
      @close="handleClose"
  >
    <div class="voiceprint-analyzer">
      <div class="waveforms">
        <div class="waveform-container">
          <div class="waveform-label">目标音频: {{ targetAudio }}</div>
          <canvas ref="targetWaveform" class="waveform"></canvas>
        </div>

        <div class="waveform-container">
          <div class="waveform-label">样本音频: {{ sampleAudio }}</div>
          <canvas ref="sampleWaveform" class="waveform"></canvas>
        </div>
      </div>

      <div class="analysis-result" v-if="showResult">
        <div class="result-header">
          <h3>分析结果</h3>
          <div class="similarity">总体相似度: {{ similarity }}%</div>
        </div>
        <div class="result-content">
          <div class="match-item">
            <span>频率匹配度:</span>
            <div class="match-value" :class="getMatchClass(frequencyMatch)">
              {{ frequencyMatch }}%
            </div>
          </div>
          <div class="match-item">
            <span>音色相似度:</span>
            <div class="match-value" :class="getMatchClass(timbreMatch)">
              {{ timbreMatch }}%
            </div>
          </div>
          <div class="match-item">
            <span>语气特征匹配:</span>
            <div class="match-value" :class="getMatchClass(patternMatch)">
              {{ patternMatch }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick, onUnmounted} from "vue"
import Modal from "./Modal.vue"

const props = defineProps<{
  targetAudio: string
  sampleAudio: string
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const isVisible = ref(false)
const similarity = ref(0)
const frequencyMatch = ref(0)
const timbreMatch = ref(0)
const patternMatch = ref(0)
const showResult = ref(false)

const targetWaveform = ref()
const sampleWaveform = ref()

// 波形模式定义
const wavePatterns:any = {
  "meeting.wav": {
    barCount: 100,
    minHeight: 5,
    maxHeight: 40,
    color: "#00ffff",
    variance: 0.3,
    pattern: "normal",
    frequency: 0.8
  },
  "suspicious.wav": {
    barCount: 100,
    minHeight: 10,
    maxHeight: 60,
    color: "#00ffff",
    variance: 0.5,
    pattern: "distorted",
    frequency: 1.2
  },
  "background.wav": {
    barCount: 100,
    minHeight: 2,
    maxHeight: 20,
    color: "#00ffff",
    variance: 0.2,
    pattern: "noise",
    frequency: 0.5
  },
  "sample_A.wav": {
    barCount: 100,
    minHeight: 8,
    maxHeight: 35,
    color: "#00ffff",
    variance: 0.25,
    pattern: "normal",
    frequency: 0.7
  },
  "sample_B.wav": {
    barCount: 100,
    minHeight: 5,
    maxHeight: 40,
    color: "#00ffff",
    variance: 0.3,
    pattern: "normal",
    frequency: 0.8
  },
  "sample_C.wav": {
    barCount: 100,
    minHeight: 4,
    maxHeight: 30,
    color: "#00ffff",
    variance: 0.2,
    pattern: "normal",
    frequency: 0.6
  },
  "sample_D.wav": {
    barCount: 100,
    minHeight: 10,
    maxHeight: 60,
    color: "#00ffff",
    variance: 0.5,
    pattern: "distorted",
    frequency: 1.2
  }
}

// 绘制波形
const drawWaveform = (canvas: HTMLCanvasElement, pattern: any, time: number) => {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // 设置画布尺寸
  canvas.width = canvas.offsetWidth * window.devicePixelRatio
  canvas.height = canvas.offsetHeight * window.devicePixelRatio
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 计算参数
  const width = canvas.width / window.devicePixelRatio
  const height = canvas.height / window.devicePixelRatio
  const centerY = height / 2
  const barWidth = width / pattern.barCount
  const spacing = 0

  // 绘制网格背景
  ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)'
  ctx.lineWidth = 0.5

  // 横线
  for (let y = 0; y < height; y += 10) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // 竖线
  for (let x = 0; x < width; x += 10) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  // 设置绘图样式
  ctx.fillStyle = pattern.color
  ctx.strokeStyle = pattern.color
  ctx.lineWidth = 1

  // 创建渐变
  const gradient = ctx.createLinearGradient(0, centerY - 50, 0, centerY + 50)
  gradient.addColorStop(0, 'rgba(0, 255, 255, 0.1)')
  gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.4)')
  gradient.addColorStop(1, 'rgba(0, 255, 255, 0.1)')
  ctx.fillStyle = gradient

  // 计算滚动偏移量
  const scrollOffset = (time * 100) % (barWidth + spacing)

  // 绘制波形
  for (let i = -1; i < pattern.barCount + 1; i++) {
    const progress = i / pattern.barCount
    let barHeight = 0

    // 计算动态振幅因子
    const amplitudeFactor = 0.7 + Math.sin(time * pattern.frequency * Math.PI + i * 0.1) * 0.3

    switch (pattern.pattern) {
      case "distorted":
        // 扭曲的波形
        const distortion = Math.sin(time * 8 + i * 0.4) * pattern.variance
        const glitch = Math.random() > 0.95 ? Math.random() * 20 : 0
        barHeight = pattern.minHeight +
                   (pattern.maxHeight - pattern.minHeight) *
                   (0.5 + Math.sin(progress * Math.PI * 2) * 0.5) *
                   (1 + distortion) * amplitudeFactor + glitch
        break

      case "noise":
        // 噪声波形
        const noiseBase = pattern.minHeight + Math.random() * pattern.maxHeight * 0.5
        barHeight = noiseBase * amplitudeFactor
        break

      case "normal":
      default:
        // 正常波形
        const smooth = Math.sin(time * 5 + i * 0.2) * pattern.variance
        barHeight = pattern.minHeight +
                   (pattern.maxHeight - pattern.minHeight) *
                   (0.5 + Math.sin(progress * Math.PI) * 0.5) *
                   (1 + smooth) * amplitudeFactor
    }

    const x = i * (barWidth + spacing) - scrollOffset

    // 只绘制可见区域
    if (x < -barWidth || x > width) continue

    // 添加微小的随机抖动
    const jitter = Math.random() * 2 - 1
    barHeight += jitter

    // 绘制波形条
    ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight)

    // 添加发光效果
    ctx.shadowColor = pattern.color
    ctx.shadowBlur = 0

    // 绘制顶部和底部的亮点
    // ctx.beginPath()
    // ctx.arc(x + barWidth / 2, centerY - barHeight / 2, 1, 0, Math.PI * 2)
    // ctx.arc(x + barWidth / 2, centerY + barHeight / 2, 1, 0, Math.PI * 2)
    // ctx.fill()
  }

  // 添加扫描线效果
  ctx.fillStyle = 'rgba(0, 255, 255, 0.1)'
  const scanLineY = (time * 100) % height
  ctx.fillRect(0, scanLineY, width, 2)
}

// 动画循环
let animationFrame: number
const animate = (targetCanvas: HTMLCanvasElement, sampleCanvas: HTMLCanvasElement) => {
  let time = 0

  const loop = () => {
    time += 0.01 // 降低滚动速度
    drawWaveform(targetCanvas, wavePatterns[props.targetAudio], time)
    drawWaveform(sampleCanvas, wavePatterns[props.sampleAudio], time)
    animationFrame = requestAnimationFrame(loop)
  }

  loop()
}

const handleClose = () => {
  isVisible.value = false
  setTimeout(() => {
    emit("close")
  }, 300)
}

// 计算相似度
const calculateSimilarity = (target: string, sample: string) => {
  const targetData = wavePatterns[target]
  const sampleData = wavePatterns[sample]

  if (!targetData || !sampleData) {
    return {
      frequency: 0,
      timbre: 0,
      pattern: 0,
      total: 0
    }
  }

  // 计算各项匹配度
  const heightMatch = Math.min(100, 100 - Math.abs(targetData.maxHeight - sampleData.maxHeight) * 2)
  const varianceMatch = Math.min(100, 100 - Math.abs(targetData.variance - sampleData.variance) * 200)
  const patternMatch = Math.min(100, heightMatch * 0.7 + varianceMatch * 0.3)

  return {
    frequency: heightMatch,
    timbre: varianceMatch,
    pattern: patternMatch,
    total: Math.round((heightMatch + varianceMatch + patternMatch) / 3)
  }
}

// 根据匹配度返回对应的样式类
const getMatchClass = (value: number) => {
  if (value >= 85) return 'match-high'
  if (value >= 70) return 'match-medium'
  if (value >= 50) return 'match-low'
  return 'match-poor'
}

onMounted(async () => {
  isVisible.value = true
  await nextTick()

  const targetCanvas = targetWaveform.value as HTMLCanvasElement
  const sampleCanvas = sampleWaveform.value as HTMLCanvasElement

  if (targetCanvas && sampleCanvas) {
    animate(targetCanvas, sampleCanvas)

    // 计算实际的匹配结果
    setTimeout(() => {
      const result = calculateSimilarity(props.targetAudio, props.sampleAudio)
      similarity.value = result.total
      frequencyMatch.value = result.frequency
      timbreMatch.value = result.timbre
      patternMatch.value = result.pattern
      showResult.value = true
    }, 2000)
  }
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped lang="scss">
.voiceprint-analyzer {
  color: #e0e0e0;
  min-width: 600px;

  .waveforms {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 24px;

    .waveform-container {
      .waveform-label {
        margin-bottom: 10px;
        font-size: 16px;
        color: #00ffff;
      }

      .waveform {
        height: 100px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(0, 255, 255, 0.3);
        border-radius: 4px;
        width: 100%;
      }
    }
  }

  .analysis-result {
    padding: 15px;
    background: rgba(0, 255, 255, 0.1);
    border-radius: 4px;
    border: 1px solid rgba(0, 255, 255, 0.2);
    animation: fadeIn 0.5s ease;

    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0, 255, 255, 0.2);

      h3 {
        margin: 0;
        color: #00ffff;
      }

      .similarity {
        font-size: 18px;
        color: #00ffff;
      }
    }

    .result-content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;

      .match-item {
        text-align: center;

        span {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          color: #fff;
        }

        .match-value {
          font-size: 24px;
          transition: all 0.3s ease;

          // 差(0-49)
          &.match-poor {
            color: #ff4444;
            text-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
          }

          // 低(50-69)
          &.match-low {
            color: #ffaa00;
            text-shadow: 0 0 10px rgba(255, 170, 0, 0.5);
          }

          // 中(70-84)
          &.match-medium {
            color: #ffff00;
            text-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
          }

          // 高(85-100)
          &.match-high {
            color: #00ff00;
            text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
            animation: pulse 2s infinite;
          }
        }
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(0, 255, 0, 0.8);
  }
  100% {
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
}
</style> 