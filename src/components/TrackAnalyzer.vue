<template>
  <Modal
      transitionName="zoom"
      :visible="isVisible"
      title="路线追踪分析"
      @close="handleClose"
      class="track-modal"
  >
    <div class="track-analyzer">
      <div class="map-container">
        <div class="map">
          <!-- 监控点位标记 -->
          <div v-for="camera in cameras"
               :key="camera.id"
               class="camera-marker"
               :style="{ left: camera.x + '%', top: camera.y + '%' }"
               :class="{ active: camera.hasTarget }"
               @click="selectCamera(camera)">
            <div class="marker-icon"></div>
            <div class="marker-info" v-if="camera.hasTarget">
              <div class="marker-name">{{ camera.name }}</div>
              <div class="marker-time">{{ formatTime(camera.timestamp) }}</div>
            </div>
          </div>

          <!-- 路线绘制 -->
          <svg class="route-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path :d="routePath"
                  class="route-line"
                  fill="none"
                  stroke="#00ff00"
                  stroke-width="0.2"
                  stroke-dasharray="1"/>
          </svg>

          <!-- 时间轴标记 -->
          <div v-for="point in timelinePoints"
               :key="point.time"
               class="timeline-marker"
               :style="{ left: point.x + '%', top: point.y + '%' }">
            <div class="marker-time">{{ formatTime(point.time) }}</div>
          </div>
        </div>
      </div>

      <div class="analysis-panel">
        <div class="data-list-container">
          <div class="data-list-header">
            <h3>时间轴</h3>
          </div>
          <div class="timeline-events">
            <div v-for="event in events"
                 :key="event.time"
                 class="event-item"
                 :class="{ active: event.confirmed }">
              <span class="time">{{ formatTime(event.time) }}</span>
              <span class="desc">{{ event.description }}</span>
            </div>
          </div>
        </div>
        <div class="data-list-container">
          <div class="data-list-header">
            <h3>交通数据</h3>
            <div class="actions">
              <a @click="confirmRoute" class="btn-confirm">
                确认路线
              </a>
              <a @click="resetAnalysis" class="btn-reset">
                重置分析
              </a>
            </div>
          </div>
          <div class="data-list">
            <div v-for="record in transportRecords"
                 :key="record.id"
                 class="record-item">
              <span class="type">{{ record.type }}</span>
              <span class="info">{{ record.info }}</span>
              <span class="time">{{ formatTime(record.time) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from "vue"
import Modal from "./Modal.vue"
import {useGameStore} from "@/stores/game"

const props = defineProps<{
  onClose: () => void
}>()

const gameStore = useGameStore()
const isVisible = ref(false)
const routePath = ref("")
const selectedPoints = ref<Point[]>([])

interface Point {
  id: string
  x: number
  y: number
  time: string
  type: "camera" | "transport" | "hideout"
}

// 预定义的监控点位
const cameras = ref([
  {id: "cam1", x: 80, y: 20, name: "火车站", hasTarget: false, timestamp: "15:30"},
  {id: "cam2", x: 40, y: 40, name: "商业中心", hasTarget: false, timestamp: "16:15"},
  {id: "cam3", x: 60, y: 65, name: "公园南门", hasTarget: false, timestamp: "17:00"},
  {id: "cam4", x: 75, y: 80, name: "居民区", hasTarget: false, timestamp: "17:45"}
])

// 交通记录数据
const transportRecords = ref([
  {id: 1, type: "地铁", info: "2号线→1号线", time: "15:35-16:10"},
  {id: 2, type: "公交", info: "25路→17路", time: "16:30-17:00"},
  {id: 3, type: "出租车", info: "公园→居民区", time: "17:10-17:30"}
])

// 事件时间轴
const events = ref([
  {time: "15:30", description: "火车站出现", confirmed: false},
  {time: "15:35", description: "乘坐地铁", confirmed: false},
  {time: "16:15", description: "商业中心现身", confirmed: false},
  {time: "16:30", description: "转乘公交", confirmed: false},
  {time: "17:00", description: "公园停留", confirmed: false},
  {time: "17:10", description: "乘坐出租车", confirmed: false},
  {time: "17:45", description: "进入居民区", confirmed: false}
])

// 时间轴上的点
const timelinePoints = computed(() => {
  return selectedPoints.value.map(p => ({
    x: p.x,
    y: p.y,
    time: p.time
  }))
})

// 路线是否有效
const isValidRoute = computed(() => {
  return selectedPoints.value.length >= 4 &&
      selectedPoints.value[0].id === "cam1" &&
      selectedPoints.value[selectedPoints.value.length - 1].id === "cam4"
})

// 选择监控点
const selectCamera = (camera: any) => {
  camera.hasTarget = !camera.hasTarget
  if (camera.hasTarget) {
    selectedPoints.value.push({
      id: camera.id,
      x: camera.x,
      y: camera.y,
      time: camera.timestamp,
      type: "camera"
    })
  } else {
    selectedPoints.value = selectedPoints.value.filter(p => p.id !== camera.id)
  }
  updateRoutePath()
}

// 更新路线
const updateRoutePath = () => {
  if (selectedPoints.value.length < 2) {
    routePath.value = ""
    return
  }

  routePath.value = `M ${selectedPoints.value[0].x} ${selectedPoints.value[0].y} ` +
      selectedPoints.value.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ")
}

// 确认路线
const confirmRoute = () => {
  if (!isValidRoute.value) return

  // 验证路线是否正确
  const correctOrder = ["cam1", "cam2", "cam3", "cam4"]
  const currentOrder = selectedPoints.value.map(p => p.id)

  if (JSON.stringify(correctOrder) === JSON.stringify(currentOrder)) {
    gameStore.completeTask("track_route")
    // 显示成功消息
  }
}

// 重置分析
const resetAnalysis = () => {
  selectedPoints.value = []
  cameras.value.forEach(c => c.hasTarget = false)
  routePath.value = ""
}

const formatTime = (time: string) => {
  return time
}

const handleClose = () => {
  isVisible.value = false
  setTimeout(() => {
    props.onClose()
  }, 300)
}

onMounted(() => {
  isVisible.value = true
})
</script>

<style scoped lang="scss">

.track-analyzer {
  width: 50vw;
  color: #e0e0e0;

  .map-container {
    width: 100%;
    aspect-ratio: 20/9;
    position: relative;
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-radius: 4px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
    margin-bottom: 16px;

    .map {
      position: relative;
      width: 100%;
      height: 100%;
      background: url("../assets/img/map.jpg") no-repeat center;
      background-size: cover;

    }

    .camera-marker {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: pointer;
      z-index: 2;

      .marker-icon {
        width: 16px;
        height: 16px;
        background: rgba(0, 255, 255, 0.2);
        border: 1px solid rgba(0, 255, 255, 0.5);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        animation: pulse 1s infinite;

        &:hover {
          background: rgba(0, 255, 255, 0.3);
        }
      }

      .marker-info {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        padding: 4px 8px;
        border-radius: 4px;
        white-space: nowrap;
        margin-top: 4px;

        .marker-name {
          font-size: 12px;
          color: #00ffff;
        }

        .marker-time {
          font-size: 10px;
          color: #ffffff;
        }
      }

      &.active {
        .marker-icon {
          width: 24px;
          height: 24px;
          background: rgba(0, 255, 0, 0.3);
          border-color: rgba(0, 255, 0, 0.8);
          animation: pulse 2s infinite;
        }
      }
    }

    .route-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;

      .route-line {
        stroke-dasharray: .5;
        animation: dash 20s linear infinite;
      }
    }

    .timeline-marker {
      position: absolute;
      transform: translate(-50%, -170%);
      z-index: 3;

      .marker-time {
        background: rgba(0, 0, 0, 0.8);
        padding: 2px 4px;
        border-radius: 2px;
        font-size: 10px;
        color: #00ff00;
      }
    }
  }

  .analysis-panel {
    height: 240px;
    display: flex;
    gap: 16px;
    border: 1px solid rgba($primary-color, 0.2);
    border-radius: 4px;
    padding: 16px;
    overflow: hidden;

    .data-list-container {
      flex: 1;
      overflow-y: auto;

      .data-list-header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0, 255, 255, 0.2);
        padding-bottom: 8px;

        h3 {
          color: $primary-color;
          font-size: 16px;

        }

        .actions {
          display: flex;
          gap: 8px;

          a {
            cursor: pointer;
            font-size: 12px;
            color: $primary-green;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 8px;
            height: 24px;
            border-radius: 4px;
            border: 1px solid $primary-green;
          }
        }
      }

      .data-list {
        .record-item {
          padding: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 8px;
          align-items: center;

          .type {
            color: $primary-color-dark;
            font-size: 14px;
            padding: 2px 6px;
            background: rgba($primary-color-dark, 0.2);
            border-radius: 4px;
          }

          .info {
            color: #ffffff;
            font-size: 14px;
          }

          .time {
            color: $primary-color-dark;
            font-size: 14px;
          }
        }
      }
    }


    .timeline-events {
      .event-item {
        padding: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        gap: 8px;

        &.active {
          background: rgba(0, 255, 0, 0.1);
        }

        .time {
          color: $primary-color-dark;
          font-size: 14px;
          padding: 2px 6px;
          background: rgba($primary-color-dark, 0.2);
          border-radius: 4px;
        }

        .desc {
          color: #ffffff;
          font-size: 14px;
        }
      }
    }


  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 255, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: -40;
  }
}
</style> 