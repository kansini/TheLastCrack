<template>
  <div class="about-modal" v-if="visible">
    <div class="modal-content">
      <h2>关于游戏</h2>
      <div class="about-content">
        <section>
          <h3>游戏简介</h3>
          <p>《The Last Crack》是一款模拟黑客体验的文字冒险游戏。在游戏中，玩家将扮演一名黑客，通过终端命令与游戏世界互动，解开谜题，揭示隐藏的故事。</p>
        </section>

        <section>
          <h3>游戏特色</h3>
          <ul>
            <li>真实的终端操作体验</li>
            <li>引人入胜的故事情节</li>
            <li>富有挑战性的解密谜题</li>
            <li>循序渐进的难度设计</li>
            <li>完整的存档功能</li>
          </ul>
        </section>

        <section>
          <h3>技术栈</h3>
          <div class="tech-list">
            <span class="tech-item">Vue 3</span>
            <span class="tech-item">TypeScript</span>
            <span class="tech-item">Vite</span>
            <span class="tech-item">Pinia</span>
            <span class="tech-item">SCSS</span>
          </div>
        </section>

        <section>
          <h3>版本信息</h3>
          <p>当前版本：1.0.0</p>
          <p>最后更新：2024-01-01</p>
        </section>

        <section>
          <h3>开发者信息</h3>
          <p>开发者：Flood</p>
          <p>联系方式：你猜</p>
        </section>
      </div>
      <button class="close-btn" @click="close">返回</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
.about-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($bg-primary, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
  .modal-content {
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    background-color: $bg-secondary;
    border: 2px solid $primary-color;
    border-radius: $border-radius;
    padding: $spacing-lg;
    overflow-y: auto;
    
    h2 {
      color: $primary-color;
      font-size: 2rem;
      margin-bottom: $spacing-lg;
      text-align: center;
    }
    
    .about-content {
      section {
        margin-bottom: $spacing-lg;
        
        h3 {
          color: $primary-color;
          font-size: 1.5rem;
          margin-bottom: $spacing-md;
          border-bottom: 1px solid rgba($primary-color, 0.3);
          padding-bottom: $spacing-xs;
        }
        
        p {
          margin-bottom: $spacing-sm;
          line-height: 1.6;
        }
        
        ul {
          list-style: none;
          padding-left: $spacing-md;
          
          li {
            margin-bottom: $spacing-sm;
            position: relative;
            
            &::before {
              content: ">";
              color: $primary-color;
              position: absolute;
              left: -$spacing-md;
            }
          }
        }
        
        .tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: $spacing-sm;
          
          .tech-item {
            padding: $spacing-xs $spacing-sm;
            background-color: rgba($primary-color, 0.1);
            border: 1px solid rgba($primary-color, 0.3);
            border-radius: $border-radius;
            color: $primary-color;
          }
        }
      }
    }
    
    .close-btn {
      display: block;
      margin: $spacing-lg auto 0;
      padding: $spacing-sm $spacing-lg;
      font-size: 1.1rem;
      background-color: transparent;
      border: 2px solid $primary-color;
      color: $primary-color;
      cursor: pointer;
      transition: all $transition-duration;
      
      &:hover {
        background-color: $primary-color;
        color: $bg-primary;
      }
    }
  }
}
</style> 