<template>
  <Modal
    transitionName="zoom"
    :visible="isVisible"
    title="嫌疑人名单"
    @close="handleClose"
  >
    <div class="suspects-list">
      <div class="list-header">
        <div class="stats">共 {{ suspects.length }} 人</div>
      </div>
      
      <div class="list-content">
        <div v-for="suspect in suspects" :key="suspect.id" class="suspect-item">
          <div class="suspect-info">
            <div class="name">{{ suspect.name }}</div>
            <div class="evidence">
              <span v-if="suspect.audioFile" class="tag voice">
                声纹匹配: {{ suspect.matchScore }}%
              </span>
              <span v-if="suspect.fingerprintFile" class="tag fingerprint">
                指纹匹配: {{ suspect.matchScore }}%
              </span>
            </div>
          </div>
          <button class="btn-remove" @click="removeSuspect(suspect.name, suspect.type)">
            移除
          </button>
        </div>
        
        <div v-if="overlappingSuspects.length" class="overlapping">
          <h4>重点嫌疑人</h4>
          <div v-for="name in overlappingSuspects"  class="overlap-item">
            {{ name }} (声纹+指纹匹配)
          </div>
        </div>
        
        <div v-if="!suspects.length" class="empty">
          暂无嫌疑人
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Modal from "./Modal.vue"
import { useSuspectsStore } from '@/stores/game'

const suspectsStore = useSuspectsStore()
const isVisible = ref(false)

const suspects = computed(() => suspectsStore.suspects)
const overlappingSuspects = computed(() => suspectsStore.getOverlappingSuspects)

const removeSuspect = (name: string, type: 'voiceprint' | 'fingerprint') => {
  suspectsStore.removeSuspect(name, type)
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleClose = () => {
  isVisible.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}

onMounted(() => {
  isVisible.value = true
})
</script>

<style scoped lang="scss">
.suspects-list {
  color: #e0e0e0;
  min-width: 560px;
  
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 255, 255, 0.2);
    
    .stats {
      font-size: 14px;
      color: #00ffff;
    }
  }
  
  .list-content {
    .suspect-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      
      &:last-child {
        border-bottom: none;
      }
      
      .suspect-info {
        .name {
          font-size: 14px;
          margin-bottom: 4px;
        }
        
        .evidence {
          display: flex;
          gap: 8px;
          
          .tag {
            font-size: 12px;
            padding: 2px 6px;
            border-radius: 4px;
            
            &.voice {
              background: rgba(0, 255, 255, 0.1);
              color: #00ffff;
            }
            
            &.fingerprint {
              background: rgba(255, 255, 0, 0.1);
              color: #ffff00;
            }
          }
        }
      }
      
      .btn-remove {
        padding: 4px 8px;
        font-size: 12px;
        color: #ff4444;
        background: transparent;
        border: 1px solid #ff4444;
        border-radius: 4px;
        cursor: pointer;
        
        &:hover {
          background: rgba(255, 68, 68, 0.1);
        }
      }
    }
    
    .overlapping {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(0, 255, 255, 0.2);
      
      h4 {
        margin: 0 0 8px;
        color: #00ff00;
        font-size: 14px;
      }
      
      .overlap-item {
        color: #00ff00;
        font-size: 14px;
        padding: 4px 0;
      }
    }
    
    .empty {
      text-align: center;
      padding: 16px;
      color: #666;
      font-size: 14px;
    }
  }
}
</style> 