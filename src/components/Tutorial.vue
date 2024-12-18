<template>
  <div class="tutorial-modal" v-if="visible">
    <div class="modal-content">
      <h2>游戏教程</h2>
      <div class="tutorial-content">
        <section>
          <h3>基本操作</h3>
          <div class="command-list">
            <div class="command-item">
              <code>help</code> - 显示所有可用命令
            </div>
            <div class="command-item">
              <code>ls</code> - 列出当前目录文件
            </div>
            <div class="command-item">
              <code>cd &lt;目录&gt;</code> - 切换目录
            </div>
            <div class="command-item">
              <code>cat &lt;文件&gt;</code> - 查看文件内容
            </div>
            <div class="command-item">
              <code>clear</code> - 清除终端屏幕
            </div>
          </div>
        </section>

        <section>
          <h3>游戏存档</h3>
          <div class="command-list">
            <div class="command-item">
              <code>save &lt;名称&gt;</code> - 保存游戏进度
            </div>
            <div class="command-item">
              <code>load [ID]</code> - 查看或加载存档
            </div>
            <div class="command-item">
              <code>deletesave &lt;ID&gt;</code> - 删除存档
            </div>
          </div>
        </section>

        <section>
          <h3>游戏玩法</h3>
          <p>1. 每个关卡都有特定的目标和任务</p>
          <p>2. 使用终端命令探索环境，寻找线索</p>
          <p>3. 解开谜题，找到密码，进入下一关</p>
          <p>4. 遇到困难时可以使用 <code>hint</code> 命令获取提示</p>
          <p>5. 找到密码后使用 <code>unlock &lt;密码&gt;</code> 解锁下一关</p>
        </section>

        <section>
          <h3>小技巧</h3>
          <ul>
            <li>使用方向键 ↑↓ 可以快速调出历史命令</li>
            <li>使用 <code>ls -a</code> 可以查看隐藏文件</li>
            <li>注意查看每个文件的内容，可能包含重要线索</li>
            <li>遇到新命令时可以尝试不带参数运行，会显示使用说明</li>
            <li>随时可以使用 <code>exit</code> 命令返回主菜单</li>
          </ul>
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
.tutorial-modal {
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
    
    .tutorial-content {
      section {
        margin-bottom: $spacing-lg;
        
        h3 {
          color: $primary-color;
          font-size: 1.5rem;
          margin-bottom: $spacing-md;
          border-bottom: 1px solid rgba($primary-color, 0.3);
          padding-bottom: $spacing-xs;
        }
        
        .command-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: $spacing-sm;
          
          .command-item {
            padding: $spacing-sm;
            border: 1px solid rgba($primary-color, 0.2);
            border-radius: $border-radius;
            
            code {
              color: $primary-color;
              background-color: rgba($primary-color, 0.1);
              padding: 2px 6px;
              border-radius: 3px;
            }
          }
        }
        
        p {
          margin-bottom: $spacing-sm;
          line-height: 1.6;
          
          code {
            color: $primary-color;
            background-color: rgba($primary-color, 0.1);
            padding: 2px 6px;
            border-radius: 3px;
          }
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
            
            code {
              color: $primary-color;
              background-color: rgba($primary-color, 0.1);
              padding: 2px 6px;
              border-radius: 3px;
            }
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