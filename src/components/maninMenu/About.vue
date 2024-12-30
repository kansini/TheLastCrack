<template>
  <Modal
      :visible="visible"
      :title="t('aboutTitle')"
      @close="$emit('close')"
  >
    <div class="about-content">
      <p class="description">{{ t("aboutDesc") }}</p>
      <section class="about-section">
        <h3>{{ t("features") }}</h3>
        <ul class="features-list">
          <li>{{ t("feature1") }}</li>
          <li>{{ t("feature2") }}</li>
          <li>{{ t("feature3") }}</li>
          <li>{{ t("feature4") }}</li>
        </ul>
      </section>

      <section class="about-section">
        <h3>{{ t("version") }}</h3>
        <div class="version-info">
          <div class="info-item">
            <span class="label">{{ t("currentVersion") }}</span>
            <span class="value">{{ version }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ t("developer") }}</span>
            <span class="value">Old Flood</span>
          </div>
          <div class="info-item">
            <span class="label"> github </span>
            <a class="value" target="_blank" href="https://github.com/kansini/TheLastCrack">https://github.com/kansini/TheLastCrack</a>
          </div>
        </div>
      </section>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import {useLanguageStore} from "@/stores/language.ts";
import Modal from "../kits/Modal.vue";
import {computed} from "vue";

defineProps<{
  visible: boolean
}>();


const languageStore = useLanguageStore();
const t = computed(() => languageStore.t);

const version = computed(() => import.meta.env.VITE_APP_VERSION || "1.0.0");


</script>

<style lang="scss" scoped>
.about-content {
  color: $text-color;

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
          color: $text-color;
          margin-left: $spacing-md;
        }
      }
    }
  }
}

</style> 