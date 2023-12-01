
<script setup lang="ts">
import { SOCIAL_MEDIA_ICONS } from '~/constants'

const props = defineProps <{
  icon: string
  onClick?: () => void
  index: number
  changeIcon: (item: string, index: number) => void
}>()

const showIcons = ref(false)

function toggleIcons() {
  showIcons.value = !showIcons.value
}
</script>

<template>
  <div>
    <label class="block note text-blacks-70">Icon</label>
    <div class="ql-container single-line icon-container" :onclick="() => toggleIcons()">
      <IconElement
        :icon="icon"
      />
    </div>
    <div v-if="showIcons" class="flex justify-between items-star ql-container single-line icons overflow-auto icon-container">
      <IconElement
        v-for="(item) in SOCIAL_MEDIA_ICONS"
        :key="item"
        :icon="item"
        :on-click="() => changeIcon(item, index)"
        :is-selected="item === icon"
      />
    </div>
  </div>
</template>

<style scoped>
.icon-container {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
