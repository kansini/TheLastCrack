<template>
  <Modal
      transitionName="zoom"
      :visible="isVisible"
      title="声纹分析"
      @close="handleClose"
  >
    <div class="voiceprint-analyzer">
      <div class="waveforms">
        <div class="waveform-container">
          <div class="waveform-label">
            可疑音频: {{ targetAudio }}
          </div>
          <div class="waveform" ref="targetContainer"></div>
        </div>
        <div class="waveform-container">
          <div class="waveform-label">
            样本音频: {{ sampleAudio }}
            <span class="owner" v-if="voiceprintPatterns[sampleAudio]?.owner">
              [{{ voiceprintPatterns[sampleAudio].owner }}]
            </span>
          </div>
          <div class="waveform" ref="sampleContainer"></div>
        </div>
      </div>

      <div class="analysis-result" v-if="showResult">
        <div class="result-header">
          <h3>分析结果</h3>
          <div class="similarity">总体匹配度: {{ similarity }}%</div>
          <div class="suspect-actions" v-if="voiceprintPatterns[sampleAudio]?.owner">
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
            <span>音色匹配:</span>
            <div class="match-value" :class="getMatchClass(toneMatch)">
              {{ toneMatch }}%
            </div>
          </div>
          <div class="match-item">
            <span>语音特征:</span>
            <div class="match-value" :class="getMatchClass(featureMatch)">
              {{ featureMatch }}%
            </div>
          </div>
          <div class="match-item">
            <span>频谱分析:</span>
            <div class="match-value" :class="getMatchClass(spectrumMatch)">
              {{ spectrumMatch }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick, onUnmounted, computed} from "vue"
import Modal from "./Modal.vue"
import * as THREE from "three"
import { useSuspectsStore } from '@/stores/game'

const props = defineProps<{
  targetAudio: string
  sampleAudio: string
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const isVisible = ref(false)
const showResult = ref(false)
const similarity = ref(0)
const toneMatch = ref(0)
const featureMatch = ref(0)
const spectrumMatch = ref(0)

const targetContainer = ref<HTMLDivElement>()
const sampleContainer = ref<HTMLDivElement>()

let animationFrame: number
// let scanTime = 0

// 声纹模式定义
const voiceprintPatterns: any = {
  "suspicious.wav": {
    type: "distorted",
    pattern: "complex",
    features: 15,
    distortion: 0.7,
    wavePattern: {
      frequency: [1.5, 2.5, 0.5],
      amplitude: [0.4, 0.25, 0.15],
      phase: [0, Math.PI / 4, Math.PI / 2]
    }
  },
  "sample_1.wav": {
    type: "normal",
    pattern: "simple",
    features: 12,
    owner: "John Smith",
    matchScore: 45,
    wavePattern: {
      frequency: [1.2, 2.0, 0.4],
      amplitude: [0.3, 0.2, 0.1],
      phase: [0, Math.PI / 6, Math.PI / 3]
    }
  },
  "sample_2.wav": {
    type: "normal",
    pattern: "complex",
    features: 14,
    owner: "Michael Brown",
    matchScore: 70,
    wavePattern: {
      frequency: [1.5, 2.5, 0.5],
      amplitude: [0.4, 0.25, 0.15],
      phase: [0, Math.PI / 4, Math.PI / 2]
    }
  },
  "sample_3.wav": {
    type: "normal",
    pattern: "complex",
    features: 15,
    owner: "James Wilson",
    matchScore: 75,
    wavePattern: {
      frequency: [1.5, 2.5, 0.5],
      amplitude: [0.4, 0.25, 0.15],
      phase: [0, Math.PI / 4, Math.PI / 2]
    }
  },
  "sample_4.wav": {
    type: "normal",
    pattern: "simple",
    features: 10,
    owner: "David Miller",
    matchScore: 42,
    wavePattern: {
      frequency: [1.2, 2.0, 0.4],
      amplitude: [0.3, 0.2, 0.1],
      phase: [0, Math.PI / 6, Math.PI / 3]
    }
  }
}

// 获取文件名（不含路径）
const getFileName = (path: string) => path.split("/").pop() || path

// 根据匹配度返回对应的样式类
const getMatchClass = (value: number) => {
  if (value >= 85) return "match-high"
  if (value >= 70) return "match-medium"
  if (value >= 50) return "match-low"
  return "match-poor"
}

interface WaveScene {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  waves: THREE.Line[]
  time: number
  id: string
  animationParams: any
}
interface IHarmonic {
  frequency: number
  amplitude: number
}
const scenes: { [key: string]: WaveScene } = {}

// 创建声波场景
const createWaveScene = (container: HTMLElement, pattern: any, isTarget: boolean) => {
  const scene = new THREE.Scene()

  // 设置相机
  const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
  )
  camera.position.z = 2.0

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setClearColor(0x000000, 0)
  container.appendChild(renderer.domElement)

  let scanGroup = null
  let particles = null

  // 只为样本音频添加背景网格和扫描效果
  if (!isTarget) {
    const gridHelper = new THREE.Group()

    // 创建背景网格着色器材质
    const gridMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: {value: 0},
        color: {value: new THREE.Color(0x004455)},
        opacity: {value: 0.5}
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float opacity;
        varying vec2 vUv;
        
        void main() {
          // 添加流动效果
          float flow = sin(vUv.y * 10.0 + time) * 0.5 + 0.5;
          // 添加呼吸效果
          float breath = sin(time * 0.5) * 0.2 + 0.8;
          gl_FragColor = vec4(color, opacity * flow * breath);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    // 水平线
    for (let i = -2; i <= 2; i += 0.15) {  // 增加网格密度
      const geometry = new THREE.BufferGeometry()
      const points = [
        new THREE.Vector3(-4, i, -0.5),  // 扩大网格范围
        new THREE.Vector3(4, i, -0.5)
      ]
      geometry.setFromPoints(points)
      const material = gridMaterial.clone()
      const line = new THREE.Line(geometry, material)
      gridHelper.add(line)
    }

    // 垂直线
    for (let i = -4; i <= 4; i += 0.3) {  // 增加网格密度
      const geometry = new THREE.BufferGeometry()
      const points = [
        new THREE.Vector3(i, -2, -0.5),  // 扩大网格范围
        new THREE.Vector3(i, 2, -0.5)
      ]
      geometry.setFromPoints(points)
      const material = gridMaterial.clone()
      const line = new THREE.Line(geometry, material)
      gridHelper.add(line)
    }

    // 添加网格动画更新函数
    gridHelper.userData.update = (time: number) => {
      gridHelper.children.forEach((line) => {
        const lineObj = line as THREE.Line
        if (lineObj.material instanceof THREE.ShaderMaterial) {
          lineObj.material.uniforms.time.value = time
        }
      })
    }

    scene.add(gridHelper)

    // 创建扫描效果（仅对样本）
    scanGroup = new THREE.Group()

    // 主扫描线
    const scanLineGeometry = new THREE.PlaneGeometry(0.05, 4)
    const scanLineMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: {value: new THREE.Color(0x00ffff)}
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          float intensity = pow(1.0 - abs(vUv.x - 0.5) * 2.0, 2.0);
          gl_FragColor = vec4(color, intensity * 0.6);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    const scanLine = new THREE.Mesh(scanLineGeometry, scanLineMaterial)
    scanGroup.add(scanLine)

    // 扫描光束效果
    const beamGeometry = new THREE.PlaneGeometry(1, 4)
    const beamMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: {value: new THREE.Color(0x00ffff)}
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          float beam = exp(-pow(vUv.x * 2.0 - 1.0, 2.0) * 4.0);
          gl_FragColor = vec4(color, beam * 0.15);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    const beam = new THREE.Mesh(beamGeometry, beamMaterial)
    scanGroup.add(beam)

    // 添加扫描数据点效果
    const particleCount = 50
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleSizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 0.5
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3
      particlePositions[i * 3 + 2] = 0
      particleSizes[i] = Math.random() * 0.03 + 0.01
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(particleSizes, 1))

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: {value: new THREE.Color(0x00ffff)},
        time: {value: 0}
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        varying float vAlpha;
        void main() {
          vAlpha = 0.5 + 0.5 * sin(time * 5.0 + position.x * 10.0);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vAlpha;
        void main() {
          float r = length(gl_PointCoord - vec2(0.5));
          if (r > 0.5) discard;
          float intensity = 1.0 - pow(r * 2.0, 2.0);
          gl_FragColor = vec4(color, intensity * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    particles = new THREE.Points(particleGeometry, particleMaterial)
    scanGroup.add(particles)

    scene.add(scanGroup)
  }

  // 创建多层声波
  const waves: THREE.Line[] = []
  const waveCount = 30
  const matchScore = pattern.matchScore || 100

  for (let i = 0; i < waveCount; i++) {
    const points: THREE.Vector3[] = []
    const segmentCount = 200

    for (let j = 0; j <= segmentCount; j++) {
      points.push(new THREE.Vector3(
          (j - segmentCount / 2) * 0.015,
          0,
          0
      ))
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    // 根据匹配度调整颜色
    const baseHue = isTarget ? 0.6 : 0.55
    const hueRange = 0.1
    const hue = baseHue + (i / waveCount) * hueRange

    const color = new THREE.Color().setHSL(
        hue,
        isTarget ? 0.8 : (0.6 * matchScore / 100),
        isTarget ? 0.6 : (0.4 + (matchScore / 100) * 0.3)
    )

    const material = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: (0.7 - (i * 0.015)) * (isTarget ? 1 : matchScore / 100),
      linewidth: 1
    })

    const wave = new THREE.Line(geometry, material)
    wave.position.z = -i * 0.05
    const scale = isTarget ? 3 : 2 + (matchScore / 100)
    wave.scale.set(scale, 1.5, 1)
    scene.add(wave)
    waves.push(wave)
  }

  // 动画参数
  const wavePattern = pattern.wavePattern
  const animationParams = {
    baseAmplitude: isTarget ? 0.4 : 0.3 * (matchScore / 100),
    frequencies: wavePattern.frequency.map((f: number) => f * 1.5),
    phases: wavePattern.phase,
    harmonics: [1, 2, 3, 4].map((h): IHarmonic => ({
      frequency: h * 0.5,
      amplitude: 1 / (h * 2)
    }))
  }

  return {
    scene,
    camera,
    renderer,
    waves,
    scanGroup: scanGroup || null,
    particles: particles || null,
    time: 0,
    id: Math.random().toString(36).substr(2, 9),
    animationParams
  }
}

// 动画循环
const animate = () => {
  Object.values(scenes).forEach((sceneObj: any) => {
    const {scene, camera, renderer, waves, scanGroup, particles, time, id, animationParams} = sceneObj

    // 更新网格动画
    scene.children.forEach((child: any) => {
      if (child.userData.update) {
        child.userData.update(time)
      }
    })

    // 波形动画
    waves.forEach((wave: any, index: number) => {
      const positions = wave.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        // 更复杂的波形合成
        let y = 0
        // 基础波形
        animationParams.frequencies.forEach((freq: any, idx: any) => {
          y += Math.sin(x * freq + time + animationParams.phases[idx]) *
              animationParams.baseAmplitude * (1 - index * 0.2)
        })
        // 添加谐波
        animationParams.harmonics.forEach(({frequency, amplitude}:IHarmonic) => {
          y += Math.sin(x * frequency + time) * amplitude *
              animationParams.baseAmplitude * 0.3
        })
        // 添加噪声
        y += (Math.random() - 0.5) * 0.02
        positions[i + 1] = y * (1 - index * 0.03)  // 随层数逐渐减小振幅
      }
      wave.geometry.attributes.position.needsUpdate = true
    })

    // 只对有扫描效果的场景更新扫描动画
    if (scanGroup && particles) {
      // 更新扫描效果
      scanGroup.position.x = ((time * 0.5) % 6) - 3

      if (particles.material instanceof THREE.ShaderMaterial) {
        particles.material.uniforms.time.value = time
      }

      // 更新粒子位置
      const positions = particles.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += (Math.random() - 0.5) * 0.02
        positions[i + 1] += (Math.random() - 0.5) * 0.02

        // 保持粒子在扫描区域内
        if (Math.abs(positions[i]) > 0.25) {
          positions[i] *= -0.9
        }
        if (Math.abs(positions[i + 1]) > 1.5) {
          positions[i + 1] *= -0.9
        }
      }
      particles.geometry.attributes.position.needsUpdate = true
    }

    renderer.render(scene, camera)
    scenes[id].time += 0.01
  })

  animationFrame = requestAnimationFrame(animate)
}

// 计算匹配度
const calculateMatches = () => {
  const sampleName = getFileName(props.sampleAudio)

  if (sampleName === "sample_2.wav") {
    toneMatch.value = 78
    featureMatch.value = 82
    spectrumMatch.value = 74
    similarity.value = 78
  } else if (sampleName === "sample_3.wav") {
    toneMatch.value = 72
    featureMatch.value = 85
    spectrumMatch.value = 68
    similarity.value = 75
  } else {
    // 固定的低匹配度
    toneMatch.value = 45
    featureMatch.value = 42
    spectrumMatch.value = 38
    similarity.value = 42
  }
}

const suspectsStore = useSuspectsStore()

const isSuspect = computed(() => {
  const sampleName = getFileName(props.sampleAudio)
  const owner = voiceprintPatterns[sampleName]?.owner
  if (!owner) return false
  
  return suspectsStore.getSuspectsByType('voiceprint')
    .some(s => s.name === owner)
})

const toggleSuspect = () => {
  const sampleName = getFileName(props.sampleAudio)
  const owner = voiceprintPatterns[sampleName]?.owner
  if (!owner) return
  
  if (isSuspect.value) {
    suspectsStore.removeSuspect(owner, 'voiceprint')
  } else {
    suspectsStore.addSuspect({
      id: Math.random().toString(36).substr(2, 9),
      name: owner,
      type: 'voiceprint',
      matchScore: similarity.value,
      audioFile: sampleName
    })
  }
}

onMounted(async () => {
  isVisible.value = true
  await nextTick()

  if (targetContainer.value && sampleContainer.value) {
    const targetName = getFileName(props.targetAudio)
    const sampleName = getFileName(props.sampleAudio)

    const targetScene = createWaveScene(targetContainer.value, voiceprintPatterns[targetName], true)
    const sampleScene = createWaveScene(sampleContainer.value, voiceprintPatterns[sampleName], false)

    scenes[targetScene.id] = targetScene
    scenes[sampleScene.id] = sampleScene

    animate()

    // 延迟显示结果
    setTimeout(() => {
      calculateMatches()
      showResult.value = true
    }, 1000)
  }
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }

  // 清理 Three.js 资源
  Object.values(scenes).forEach(({renderer}) => {
    renderer.dispose()
  })
})

const handleClose = () => {
  isVisible.value = false
  setTimeout(() => {
    emit("close")
  }, 300)
}


</script>

<style scoped lang="scss">
.voiceprint-analyzer {
  width: 640px;
  color: #e0e0e0;

  .waveforms {
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin-bottom: 24px;

    .waveform-container {
      flex: 1;

      .waveform-label {
        margin-bottom: 8px;
        font-size: 14px;
        color: #00ffff;

        .owner {
          color: $primary-color-dark;
        }

        .suspect-actions {
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

      .waveform {
        height: 128px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(0, 255, 255, 0.3);
        border-radius: 4px;
        position: relative;
        overflow: hidden;
        background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 1),
                rgba(0, 10, 20, 1),
                rgba(0, 0, 0, 1)
        );
      }
    }
  }

  .analysis-result {
    padding: 12px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    border: 1px solid rgba(0, 255, 255, 0.2);
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

@keyframes scan {
  from {
    left: 0;
  }
  to {
    left: 100%;
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