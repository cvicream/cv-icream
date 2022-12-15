<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="text-center">
    <div class="i-carbon-warning w-10 h-10" />
    <h2 class="heading2 mt-4">
      {{ t('not-found') }}
    </h2>
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
