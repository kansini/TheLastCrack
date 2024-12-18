<template>
  <div class="about-modal" v-if="visible">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ t('aboutTitle') }}</h2>
        <button @click="$emit('close')" class="close-btn">×</button>
      </div>
      <div class="modal-body">
        <p class="description">{{ t('aboutDesc') }}</p>

        <section class="about-section">
          <h3>{{ t('features') }}</h3>
          <ul class="features-list">
            <li>{{ t('feature1') }}</li>
            <li>{{ t('feature2') }}</li>
            <li>{{ t('feature3') }}</li>
            <li>{{ t('feature4') }}</li>
          </ul>
        </section>

        <section class="about-section">
          <h3>{{ t('version') }}</h3>
          <div class="version-info">
            <div class="info-item">
              <span class="label">{{ t('currentVersion') }}</span>
              <span class="value">1.0.0</span>
            </div>
            <div class="info-item">
              <span class="label">{{ t('developer') }}</span>
              <span class="value">ssflood</span>
            </div>
          </div>
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
.about-modal {
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

      .about-section {
        margin-bottom: $spacing-lg;

        h3 {
          color: $primary-color;
          margin-bottom: $spacing-md;
          border-bottom: 1px solid rgba($primary-color, 0.3);
          padding-bottom: $spacing-xs;
        }

        .features-list {
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

        .version-info {
          .info-item {
            display: flex;
            align-items: center;
            margin-bottom: $spacing-sm;

            .label {
              min-width: 120px;
              color: rgba($primary-color, 0.8);
            }

            .value {
              color: lighten($primary-color, 10%);
              margin-left: $spacing-md;
            }
          }
        }
      }
    }
  }
}
</style> 