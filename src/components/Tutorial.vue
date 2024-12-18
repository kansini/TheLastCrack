<template>
  <div class="tutorial-modal" v-if="visible">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ t('tutorialTitle') }}</h2>
        <button @click="$emit('close')" class="close-btn">×</button>
      </div>
      <div class="modal-body">
        <p class="description">{{ t('tutorialDesc') }}</p>

        <section class="tutorial-section">
          <h3>{{ t('basicCommands') }}</h3>
          <div class="command-list">
            <div class="command-item">
              <code>help</code>
              <span>{{ t('commandHelp') }}</span>
            </div>
            <div class="command-item">
              <code>ls</code>
              <span>{{ t('commandLs') }}</span>
            </div>
            <div class="command-item">
              <code>cd &lt;{{ t('directory') }}&gt;</code>
              <span>{{ t('commandCd') }}</span>
            </div>
            <div class="command-item">
              <code>cat &lt;{{ t('file') }}&gt;</code>
              <span>{{ t('commandCat') }}</span>
            </div>
            <div class="command-item">
              <code>clear</code>
              <span>{{ t('commandClear') }}</span>
            </div>
            <div class="command-item">
              <code>unlock &lt;{{ t('password') }}&gt;</code>
              <span>{{ t('commandUnlock') }}</span>
            </div>
          </div>
        </section>

        <section class="tutorial-section">
          <h3>{{ t('gameProgress') }}</h3>
          <div class="command-list">
            <div class="command-item">
              <code>save &lt;{{ t('saveName') }}&gt;</code>
              <span>{{ t('commandSave') }}</span>
            </div>
            <div class="command-item">
              <code>load [ID]</code>
              <span>{{ t('commandLoad') }}</span>
            </div>
            <div class="command-item">
              <code>deletesave &lt;ID&gt;</code>
              <span>{{ t('commandDelete') }}</span>
            </div>
          </div>
        </section>

        <section class="tutorial-section">
          <h3>{{ t('tips') }}</h3>
          <ul class="tips-list">
            <li>{{ t('tip1') }}</li>
            <li>{{ t('tip2') }}</li>
            <li>{{ t('tip3') }}</li>
            <li>{{ t('tip4') }}</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguageStore } from '@/stores/language';

defineProps<{
  visible: boolean;
}>();

const { t } = useLanguageStore();
</script>

<style lang="scss" scoped>
.tutorial-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($bg-primary, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 1000;
  font-family: 'Share Tech Mono', monospace;

  .modal-content {
    width: 800px;
    max-width: 90%;
    max-height: 90vh;
    background: $bg-secondary;
    border: 1px solid rgba($primary-color, 0.3);
    box-shadow: 0 0 20px rgba($primary-color, 0.2);
    overflow-y: auto;
    position: relative;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacing-md;
      border-bottom: 1px solid rgba($primary-color, 0.3);

      h2 {
        margin: 0;
        color: $primary-color;
      }

      .close-btn {
        background: none;
        border: none;
        color: $primary-color;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;

        &:hover {
          color: lighten($primary-color, 20%);
        }
      }
    }

    .modal-body {
      padding: $spacing-md;

      .description {
        margin-bottom: $spacing-lg;
        line-height: 1.6;
      }

      .tutorial-section {
        margin-bottom: $spacing-lg;

        h3 {
          color: $primary-color;
          margin-bottom: $spacing-md;
          border-bottom: 1px solid rgba($primary-color, 0.3);
          padding-bottom: $spacing-xs;
        }

        .command-list {
          display: grid;
          gap: $spacing-sm;

          .command-item {
            display: flex;
            align-items: center;
            gap: $spacing-md;

            code {
              background: rgba($primary-color, 0.1);
              padding: $spacing-xs $spacing-sm;
              border-radius: 4px;
              color: lighten($primary-color, 10%);
              min-width: 120px;
            }

            span {
              color: rgba($primary-color, 0.8);
            }
          }
        }

        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            margin-bottom: $spacing-sm;
            padding-left: $spacing-md;
            position: relative;

            &::before {
              content: '>';
              position: absolute;
              left: 0;
              color: $primary-color;
            }
          }
        }
      }
    }
  }
}
</style> 