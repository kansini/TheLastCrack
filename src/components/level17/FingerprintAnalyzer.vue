<template>
  <Modal
      transitionName="zoom"
      :visible="isVisible"
      title="指纹比对分析"
      @close="handleClose"
  >
    <div class="fingerprint-analyzer">
      <div class="fingerprints">
        <div class="fingerprint-container">
          <div class="fingerprint-label">
            目标指纹:{{ targetPrint }}
            <span class="source" v-if="fingerprintPatterns[targetPrint].source">
              [{{ fingerprintPatterns[targetPrint].source }}]
            </span>
          </div>
          <div class="fingerprint" :class="fingerprintPatterns[targetPrint].quality">
            <img :src="fingerprintSvg" alt="fingerprint" 
                 :style="{
                   transform: `rotate(${fingerprintPatterns[targetPrint].rotation}deg)`,
                   opacity: fingerprintPatterns[targetPrint].quality === 'high' ? 1 :
                           fingerprintPatterns[targetPrint].quality === 'medium' ? 0.7 : 0.4
                 }"
            />
            <canvas ref="targetCanvasRef" class="scan-canvas"></canvas>
            <div class="scan-line"></div>
          </div>
        </div>

        <div class="fingerprint-container">
          <div class="fingerprint-label">
            样本指纹:{{ samplePrint }}
            <span class="owner" v-if="fingerprintPatterns[samplePrint].owner">
              [{{ fingerprintPatterns[samplePrint].owner }}]
            </span>
          </div>
          <div class="fingerprint" :class="fingerprintPatterns[samplePrint].quality">
            <img :src="fingerprintSvg" alt="fingerprint"
                 :style="{
                   transform: `rotate(${fingerprintPatterns[samplePrint].rotation}deg)`,
                   opacity: fingerprintPatterns[samplePrint].quality === 'high' ? 1 :
                           fingerprintPatterns[samplePrint].quality === 'medium' ? 0.7 : 0.4
                 }"
            />
            <canvas ref="sampleEffectCanvas" class="effect-canvas"></canvas>
            <canvas ref="sampleCanvasRef" class="scan-canvas"></canvas>
            <div class="scan-line"></div>
          </div>
        </div>
      </div>

      <div class="analysis-result" v-if="showResult">
        <div class="result-header">
          <h3>分析结果</h3>
          <div class="similarity">总体相似度: {{ similarity }}%</div>
          <div class="suspect-actions" v-if="fingerprintPatterns[samplePrint]?.owner">
            <button 
              class="btn-suspect"
              :class="{ active: isSuspect }"
              @click="toggleSuspect"
            >
              {{ isSuspect ? '移出嫌疑名单' : '加入嫌疑名单' }}
            </button>
          </div>
        </div>
        <div class="result-content">
          <div class="match-item">
            <span>纹路匹配度:</span>
            <div class="match-value" :class="getMatchClass(patternMatch)">
              {{ patternMatch }}%
            </div>
          </div>
          <div class="match-item">
            <span>特征点匹配:</span>
            <div class="match-value" :class="getMatchClass(featureMatch)">
              {{ featureMatch }}%
            </div>
          </div>
          <div class="match-item">
            <span>细节相似度:</span>
            <div class="match-value" :class="getMatchClass(detailMatch)">
              {{ detailMatch }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick, onUnmounted, computed} from "vue"
import Modal from "../kits/Modal.vue"
import fingerprintSvg from '@/assets/img/fingerprint.svg'
import { useSuspectsStore } from '@/stores/game.js'

const props = defineProps<{
  targetPrint: string
  samplePrint: string
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const isVisible = ref(false)
const similarity = ref(0)
const patternMatch = ref(0)
const featureMatch = ref(0)
const detailMatch = ref(0)
const showResult = ref(false)

const targetCanvasRef = ref<HTMLCanvasElement>()
const sampleCanvasRef = ref<HTMLCanvasElement>()
const sampleEffectCanvas = ref<HTMLCanvasElement>()

let animationFrame: number
let scanTime = 0

const suspectsStore = useSuspectsStore()

const isSuspect = computed(() => {
  const owner = fingerprintPatterns[props.samplePrint]?.owner
  if (!owner) return false
  
  return suspectsStore.getSuspectsByType('fingerprint')
    .some(s => s.name === owner)
})

const toggleSuspect = () => {
  const owner = fingerprintPatterns[props.samplePrint]?.owner
  if (!owner) return
  
  if (isSuspect.value) {
    suspectsStore.removeSuspect(owner, 'fingerprint')
  } else {
    suspectsStore.addSuspect({
      id: Math.random().toString(36).substr(2, 9),
      name: owner,
      type: 'fingerprint',
      matchScore: similarity.value,
      fingerprintFile: props.samplePrint
    })
  }
}

// 指纹模式定义
const fingerprintPatterns: any = {
  "scene.fpt": {
    type: "partial",
    quality: "medium",
    features: 12,
    pattern: "arch",
    rotation: 15,
    source: "现场遗留",
    featurePoints: [
      {x: 0.3, y: 0.4},
      {x: 0.5, y: 0.6},
      {x: 0.7, y: 0.3},
      {x: 0.4, y: 0.7}
    ]
  },
  "keyboard.fpt": {
    type: "complete",
    quality: "high",
    features: 18,
    pattern: "whorl",
    rotation: 0,
    source: "键盘表面",
    featurePoints: [
      {x: 0.4, y: 0.3},
      {x: 0.6, y: 0.5},
      {x: 0.5, y: 0.7},
      {x: 0.7, y: 0.4}
    ]
  },
  "door.fpt": {
    type: "smudged",
    quality: "low",
    features: 8,
    pattern: "loop",
    rotation: -10,
    source: "门把手",
    featurePoints: [
      {x: 0.2, y: 0.3},
      {x: 0.4, y: 0.5},
      {x: 0.6, y: 0.4},
      {x: 0.3, y: 0.6}
    ]
  },
  "sample_1.fpt": {
    type: "complete",
    quality: "high",
    features: 15,
    pattern: "whorl",
    rotation: 30,
    damage: {
      opacity: 1.0,
      blur: 0
    },
    owner: "John Smith",
    featurePoints: [
      {x: 0.3, y: 0.5},
      {x: 0.5, y: 0.4},
      {x: 0.6, y: 0.6},
      {x: 0.4, y: 0.3}
    ]
  },
  "sample_2.fpt": {
    type: "complete",
    quality: "medium",
    features: 14,
    pattern: "arch",
    rotation: -20,
    damage: {
      opacity: 0.8,
      blur: 2
    },
    owner: "Michael Brown",
    featurePoints: [
      {x: 0.35, y: 0.45},
      {x: 0.55, y: 0.55},
      {x: 0.65, y: 0.35},
      {x: 0.45, y: 0.65}
    ]
  },
  "sample_3.fpt": {
    type: "complete",
    quality: "high",
    features: 18,
    pattern: "whorl",
    rotation: 0,
    damage: {
      opacity: 0.9,
      blur: 1
    },
    owner: "James Wilson",
    featurePoints: [
      {x: 0.4, y: 0.3},
      {x: 0.6, y: 0.5},
      {x: 0.5, y: 0.7},
      {x: 0.7, y: 0.4}
    ]
  },
  "sample_4.fpt": {
    type: "partial",
    quality: "medium",
    features: 10,
    pattern: "loop",
    rotation: 15,
    damage: {
      opacity: 0.7,
      blur: 3
    },
    owner: "David Miller",
    featurePoints: [
      {x: 0.25, y: 0.35},
      {x: 0.45, y: 0.55},
      {x: 0.65, y: 0.45},
      {x: 0.35, y: 0.65}
    ]
  }
}

// 计算相似度
const calculateSimilarity = () => {
  const targetName = props.targetPrint.split("/").pop()
  const sampleName = props.samplePrint.split("/").pop()
  
  if (targetName === "keyboard.fpt") {
    if (sampleName === "sample_1.fpt") {
      similarity.value = 87
      patternMatch.value = 85
      featureMatch.value = 88
      detailMatch.value = 87
    } else if (sampleName === "sample_3.fpt") {
      similarity.value = 92
      patternMatch.value = 90
      featureMatch.value = 94
      detailMatch.value = 92
    } else {
      // 固定的低匹配度
      similarity.value = 45
      patternMatch.value = 48
      featureMatch.value = 42
      detailMatch.value = 44
    }
  } else {
    // 其他指纹的匹配度稍低
    if (sampleName === "sample_1.fpt" || sampleName === "sample_3.fpt") {
      similarity.value = 65
      patternMatch.value = 68
      featureMatch.value = 64
      detailMatch.value = 63
    } else {
      // 固定的低匹配度
      similarity.value = 45
      patternMatch.value = 48
      featureMatch.value = 42
      detailMatch.value = 44
    }
  }
}

// 根据匹配度返回对应的样式类
const getMatchClass = (value: number) => {
  if (value >= 85) return 'match-high'
  if (value >= 70) return 'match-medium'
  if (value >= 50) return 'match-low'
  return 'match-poor'
}

const handleClose = () => {
  isVisible.value = false
  setTimeout(() => {
    emit("close")
  }, 300)
}

// 绘制扫描效果
const drawScanEffect = (canvas: HTMLCanvasElement, pattern: any, time: number, isTarget: boolean) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 设置画布尺寸
  canvas.width = canvas.offsetWidth * window.devicePixelRatio
  canvas.height = canvas.offsetHeight * window.devicePixelRatio
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const width = canvas.width / window.devicePixelRatio
  const height = canvas.height / window.devicePixelRatio

  // 扫描线位置
  const scanY = (time * 100) % height

  // 绘制扫描效果
  ctx.save()

  // 主扫描线
  const gradient = ctx.createLinearGradient(0, scanY - 10, 0, scanY + 10)
  gradient.addColorStop(0, 'rgba(0, 255, 255, 0)')
  gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.2)')
  gradient.addColorStop(1, 'rgba(0, 255, 255, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, scanY - 10, width, 20)

  // 扫描网格
  ctx.strokeStyle = 'rgba(0, 255, 255, 1)'
  ctx.lineWidth = 0.5

  // 垂直网格线
  for (let x = 0; x < width; x += 10) {
    const opacity = Math.max(0, 1 - Math.abs(x - scanY) / 50)
    ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.3})`
    ctx.beginPath()
    ctx.moveTo(x, Math.max(0, scanY - 100))
    ctx.lineTo(x, Math.min(height, scanY + 100))
    ctx.stroke()
  }

  // 水平网格线
  for (let y = scanY - 100; y < scanY + 100; y += 10) {
    if (y < 0 || y > height) continue
    const opacity = Math.max(0, 1 - Math.abs(y - scanY) / 50)
    ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.3})`
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // 添加扫描点效果
  const points = Math.floor(pattern.features / 2)
  for (let i = 0; i < points; i++) {
    const x = Math.random() * width
    const y = scanY + (Math.random() - 0.5) * 80
    if (y < 0 || y > height) continue

    ctx.beginPath()
    ctx.arc(x, y, 1, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 0, 0, ${Math.random() * 0.5 + 0.5})`
    ctx.fill()
  }

  // 绘制特征点
  const matchingPoints = getMatchingFeaturePoints(
    fingerprintPatterns[props.targetPrint],
    fingerprintPatterns[props.samplePrint]
  )
  
  pattern.featurePoints.forEach((point: {x: number, y: number}) => {
    const x = point.x * width
    const y = point.y * height
    const isMatched = matchingPoints.some(mp => 
      (isTarget && mp.target === point) || (!isTarget && mp.sample === point)
    )
    
    // 绘制外圈光晕
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    if (isMatched) {
      const glowAlpha = (Math.sin(time * 5) + 1) / 2 * 0.3
      ctx.fillStyle = `rgba(0, 255, 0, ${glowAlpha})`
    } else {
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)'
    }
    ctx.fill()
    
    // 绘制中间圈
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    if (isMatched) {
      // 匹配点闪烁效果
      const alpha = (Math.sin(time * 5) + 1) / 2
      ctx.strokeStyle = `rgba(0, 255, 0, ${alpha * 0.8})`
      ctx.fillStyle = `rgba(0, 255, 0, ${alpha * 0.4})`
    } else {
      ctx.strokeStyle = 'rgba(255, 255, 0, 0.6)'
      ctx.fillStyle = 'rgba(255, 255, 0, 0.3)'
    }
    ctx.lineWidth = 2
    ctx.fill()
    ctx.stroke()
    
    // 绘制中心点
    ctx.beginPath()
    ctx.arc(x, y, 2, 0, Math.PI * 2)
    if (isMatched) {
      ctx.fillStyle = `rgba(0, 255, 0, ${(Math.sin(time * 5) + 1) / 2})`
    } else {
      ctx.fillStyle = 'rgba(255, 255, 0, 0.8)'
    }
    ctx.fill()
  })

  ctx.restore()
}

// 绘制指纹损坏效果
const drawDamageEffect = (canvas: HTMLCanvasElement, pattern: any) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 设置画布尺寸
  canvas.width = canvas.offsetWidth * window.devicePixelRatio
  canvas.height = canvas.offsetHeight * window.devicePixelRatio
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

  const width = canvas.width / window.devicePixelRatio
  const height = canvas.height / window.devicePixelRatio

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 添加整体模糊效果
  ctx.fillStyle = `rgba(0, 0, 0, ${1 - pattern.damage.opacity})`
  ctx.fillRect(0, 0, width, height)

  // 添加模糊效果
  if (pattern.damage.blur > 0) {
    ctx.filter = `blur(${pattern.damage.blur}px)`
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
    ctx.fillRect(0, 0, width, height)
    ctx.filter = 'none'
  }
}

// 计算特征点匹配
const getMatchingFeaturePoints = (target: any, sample: any) => {
  const matches: {target: {x: number, y: number}, sample: {x: number, y: number}}[] = []
  
  target.featurePoints.forEach((tp: {x: number, y: number}) => {
    sample.featurePoints.forEach((sp: {x: number, y: number}) => {
      const distance = Math.sqrt(Math.pow(tp.x - sp.x, 2) + Math.pow(tp.y - sp.y, 2))
      if (distance < 0.15) { // 匹配阈值
        matches.push({target: tp, sample: sp})
      }
    })
  })
  
  return matches
}

// 动画循环
const animate = () => {
  scanTime += 0.005
  
  if (targetCanvasRef.value && sampleCanvasRef.value) {
    drawScanEffect(targetCanvasRef.value, fingerprintPatterns[props.targetPrint], scanTime, true)
    drawScanEffect(sampleCanvasRef.value, fingerprintPatterns[props.samplePrint], scanTime, false)
  }
  
  animationFrame = requestAnimationFrame(animate)
}

onMounted(async () => {
  isVisible.value = true
  await nextTick()
  animate()
  
  if (sampleEffectCanvas.value) {
    drawDamageEffect(sampleEffectCanvas.value, fingerprintPatterns[props.samplePrint])
  }
  
  // 立即计算初始结果
  calculateSimilarity()
  
  // 延迟显示结果
  setTimeout(() => {
    showResult.value = true
  }, 1000)
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped lang="scss">
.fingerprint-analyzer {
  color: #e0e0e0;
  width: 640px;

  .fingerprints {
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin-bottom: 24px;

    .fingerprint-container {
      flex: 1;

      .fingerprint-label {
        margin-bottom: 8px;
        font-size: 14px;
        color: #00ffff;

        .owner {
          color: $primary-color-dark;
        }
        
        .source {
          color: $primary-color-dark;
        }
      }

      .fingerprint {
        height: 220px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(0, 255, 255, 0.3);
        border-radius: 4px;
        width: 100%;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          height: 85%;
          width: auto;
          filter: brightness(1.5) drop-shadow(0 0 5px rgba(0, 255, 255, 0.5));
          transition: transform 0.3s ease;
        }

        .scan-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .effect-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          mix-blend-mode: multiply;
        }
      }
    }
  }

  .analysis-result {
    padding: 12px;
    border-radius: 4px;
    border: 1px solid rgba($primary-color, 0.2);
    animation: fadeIn 0.5s ease;

    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0, 255, 255, 0.2);

      h3 {
        margin: 0;
        color: #00ffff;
        font-size: 16px;
      }

      .similarity {
        font-size: 16px;
        color: #00ffff;
      }

      .suspect-actions {
        margin-left: 16px;
        
        .btn-suspect {
          padding: 4px 8px;
          font-size: 12px;
          color: #00ffff;
          background: transparent;
          border: 1px solid #00ffff;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:hover {
            background: rgba(0, 255, 255, 0.1);
          }
          
          &.active {
            background: #00ffff;
            color: #000;
          }
        }
      }
    }

    .result-content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;

      .match-item {
        text-align: center;

        span {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          color: #fff;
        }

        .match-value {
          font-size: 20px;
          transition: all 0.3s ease;

          &.match-poor {
            color: #ff4444;
          }

          &.match-low {
            color: #ffaa00;
          }

          &.match-medium {
            color: #ffff00;
          }

          &.match-high {
            color: #00ff00;
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
</style> 