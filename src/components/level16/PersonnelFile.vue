<!-- 人员档案组件 -->
<template>
  <Modal
      transitionName="zoom"
      :visible="isVisible"
      title="可疑人员档案"
      @close="handleClose"
  >
    <div class="personnel-file">
      <div class="file-header">
        <h2>档案编号: {{ data.id }}</h2>
        <div :class="['status', statusClass]">{{ data.status }}</div>
      </div>

      <div class="file-content">
        <div class="image-section">
          <div class="image-container">
            <img :src="`./img/characters/character_${data.id}.jpg`" :alt="data.name">
            <div class="scan-line"></div>
            <div class="scan-overlay"></div>
            <div class="scan-grid"></div>
            <div class="scan-glitch"></div>
            <div class="scan-text">SCANNING...</div>
          </div>
        </div>

        <div class="info-section text-scan-container">
          <div class="text-scan-line"></div>
          <div class="text-scan-overlay"></div>

          <div class="basic-info">
            <p><strong>姓名：</strong>{{ data.name }}</p>
            <p><strong>年龄：</strong>{{ data.age }}</p>
            <p><strong>最后出现：</strong>{{ data.lastSeen }}</p>
          </div>

          <div class="details">
            <h3>描述：</h3>
            <p>{{ data.description }}</p>

            <h3>备注：</h3>
            <p>{{ data.notes }}</p>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "../kits/Modal.vue";
import {computed, ref, onMounted} from "vue"

interface PersonnelData {
  id: string;
  name: string;
  age: number;
  status: string;
  lastSeen: string;
  description: string;
  notes: string;
  image?: string;
}

const props = defineProps<{
  data: PersonnelData;
}>();

const isVisible = ref(false);
const emit = defineEmits<{
  (e: "close"): void;
}>();

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 0);
});

const handleClose = () => {
  isVisible.value = false;
  setTimeout(() => {
    emit("close");
  }, 300);
};

const statusClass = computed(() => {
  switch (props.data.status) {
    case "在逃":
      return "danger";
    case "监控中":
      return "warning";
    case "调查中":
      return "warning";
    default:
      return "unknown";
  }
});
</script>

<style lang="scss" scoped>
.personnel-file {
  color: #e0e0e0;

  .file-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 8px;
    border-bottom: 1px solid #444;
  }

  .file-content {
    display: grid;
    grid-template-columns: 248px 1fr;
    gap: 16px;

    .image-section {
      .image-container {
        position: relative;
        width: 100%;
        height: 320px;
        overflow: hidden;
        border: 1px solid #444;
        padding: 8px;

        img {
          height: 100%;
          width: auto;
          display: block;
          filter: contrast(.8) brightness(0.8) grayscale(.9);
        }

        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(0, 255, 0, 0.8);
          box-shadow: 0 0 8px rgba(0, 255, 0, 0.8),
          0 0 16px rgba(0, 255, 0, 0.4);
          animation: scan 2s linear infinite;
          z-index: 3;
        }

        .scan-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
                  to bottom,
                  transparent,
                  rgba(255, 46, 46, 0.6) 50%,
                  transparent
          );
          animation: overlay 2s linear infinite;
          z-index: 2;
        }

        .scan-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(rgba(255, 46, 46, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 46, 46, 0.2) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: grid 1s linear infinite;
          z-index: 1;
        }

        .scan-glitch {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 255, 0, 0.1);
          animation: glitch 3s linear infinite;
          z-index: 4;
          opacity: 0;
          mix-blend-mode: screen;
        }

        .scan-text {
          position: absolute;
          top: 10px;
          left: 10px;
          color: #0f0;
          font-family: monospace;
          font-size: 12px;
          text-shadow: 0 0 4px rgba(0, 255, 0, 0.8);
          animation: blink 1s steps(2) infinite;
          z-index: 5;
        }
      }
    }
  }
}


@keyframes scan {
  0% {
    top: -10%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 110%;
    opacity: 0;
  }
}

@keyframes overlay {
  0% {
    opacity: 0.2;
    background-position: 0 0;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.2;
    background-position: 0 20px;
  }
}

@keyframes grid {
  0% {
    opacity: 0.5;
    transform: translateY(0);
  }
  100% {
    opacity: 0.5;
    transform: translateY(20px);
  }
}

@keyframes glitch {
  0%, 100% {
    opacity: 0;
  }
  10%, 90% {
    opacity: 0;
  }
  11%, 89% {
    opacity: 0.1;
  }
  48%, 52% {
    opacity: 0.3;
    transform: translate(2px, 0);
  }
  49%, 51% {
    opacity: 0.4;
    transform: translate(-2px, 0);
  }
  50% {
    opacity: 0.5;
    transform: translate(0, 2px);
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.info-section {
  position: relative;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.status {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
}

.status.danger {
  color: #ff4444;
}

.status.warning {
  color: #ffbb33;
}

.status.unknown {
  color: #fff;
}

.basic-info {
  margin-bottom: 20px;
}

.details h3 {
  margin: 16px 0 8px;
  color: #4CAF50;
}

@media (max-width: 768px) {
  .file-content {
    grid-template-columns: 1fr;
  }

  .image-section {
    text-align: center;

    .image-container {
      display: inline-block;
      max-width: 300px;
    }
  }
}

/* 渐入动画 */
.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
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

/* 打字机效果 */
.typing-text {
  display: inline-block;
  overflow: hidden;
  border-right: 2px solid #4CAF50;
  white-space: nowrap;
  animation: typing 1s steps(30, end),
  blink-caret 0.75s step-end infinite;
  animation-fill-mode: both;
  width: fit-content;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
    border-right-color: transparent;
  }
}

@keyframes blink-caret {
  from, to {
    border-right-color: transparent;
  }
  50% {
    border-right-color: #4CAF50;
  }
}

/* 标题打字机效果 */
.typing {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #4CAF50;
  animation: typing 1s steps(20, end),
  blink-caret 0.75s step-end infinite;
  margin: 0;
  padding-right: 4px;
}

/* 调整文字容器样式 */
.basic-info p, .details p {
  margin: 10px 0;
  line-height: 1.6;
}

.details p {
  white-space: normal;
  border-right: none;
  animation: fadeIn 0.5s ease forwards;
}

/* 确保长文本正确换行 */
.typing-text {
  white-space: normal;
  border-right: none;
  position: relative;
}

.typing-text::after {
  content: '';
  position: absolute;
  right: -2px;
  top: 0;
  height: 100%;
  width: 2px;
  background: #4CAF50;
  animation: blink-caret 0.75s step-end infinite;
}

/* 调整动画时间 */
.basic-info .typing-text {
  animation-duration: 0.5s;
}

.details .typing-text {
  animation-duration: 1s;
}

.text-scan-container {
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: textAppear 0.3s ease forwards 0.5s;
}

.text-scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(0, 255, 0, 0.8);
  box-shadow: 0 0 8px rgba(0, 255, 0, 0.8),
  0 0 16px rgba(0, 255, 0, 0.4);
  animation: textScan 2s ease-out forwards;
  z-index: 2;
}

.text-scan-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
          to bottom,
          transparent,
          rgba(0, 255, 0, 0.1) 10%,
          rgba(0, 255, 0, 0.1) 90%,
          transparent
  );
  transform: translateY(-100%);
  animation: textOverlay 2s ease-out forwards;
  z-index: 1;
}

.info-section {
  position: relative;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid rgba($primary-color, 0.3);
}

.basic-info p, .details p, .details h3 {
  opacity: 0;
  animation: revealText 0.5s ease forwards;
}

.basic-info p:nth-child(1) {
  animation-delay: 0.3s;
}

.basic-info p:nth-child(2) {
  animation-delay: 0.6s;
}

.basic-info p:nth-child(3) {
  animation-delay: 0.9s;
}

.details h3:nth-of-type(1) {
  animation-delay: 1.2s;
}

.details p:nth-of-type(1) {
  animation-delay: 1.5s;
}

.details h3:nth-of-type(2) {
  animation-delay: 1.8s;
}

.details p:nth-of-type(2) {
  animation-delay: 2.1s;
}

@keyframes textAppear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes textScan {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

@keyframes textOverlay {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes revealText {
  from {
    opacity: 0;
    color: #4CAF50;
    text-shadow: 0 0 8px rgba(76, 175, 80, 0.8);
  }
  to {
    opacity: 1;
    color: #e0e0e0;
    text-shadow: none;
  }
}

/* 移除之前的打字机效果相关样式 */
</style> 