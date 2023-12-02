
<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import type { OnClickOutsideOptions } from '@vueuse/core'
import { SOCIAL_MEDIA_ICONS } from '~/constants'

const props = defineProps <{
  icon: string
  onClick?: () => void
  index: number
  changeIcon: (item: string, index: number) => void
}>()

const showIcons = ref(false)
const ignoreElRef = ref()

function toggleIcons() {
  showIcons.value = !showIcons.value
}

const onClickOutsideHandler: [(evt: any) => void, OnClickOutsideOptions] = [
  (ev) => {
    showIcons.value = false
  },
  { ignore: [ignoreElRef] },
]
</script>

<template>
  <div>
    <label class="block note text-blacks-70">Icon</label>
    <div ref="ignoreElRef" class="ql-container single-line icon-container" :onclick="() => toggleIcons()">
      <IconElement
        :icon="icon"
      />
    </div>
    <div v-if="showIcons" v-on-click-outside="onClickOutsideHandler" class="flex justify-between items-star ql-container single-line icons overflow-auto icon-container">
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
