
<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import type { OnClickOutsideOptions } from '@vueuse/core'
import { DEFAULT_TEMPLATE, SOCIAL_MEDIA_ICONS } from '~/constants'

const props = defineProps <{
  icon: string
  onClick?: () => void
  index: number
  changeIcon: (item: string, index: number) => void
}>()

const showIcons = ref(false)
const ignoreElRef = ref()
const className = computed(() => showIcons.value ? 'toggle-triangle up' : 'toggle-triangle down')

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
    <label class="block note text-blacks-70">Link Type</label>
    <div ref="ignoreElRef" class="ql-container single-line icon-container" :onclick="() => toggleIcons()">
      <IconElement
        :icon="icon || DEFAULT_TEMPLATE.social.list[0].icon"
      />
      <div :class="className" />
    </div>
    <div v-if="showIcons" v-on-click-outside="onClickOutsideHandler" class="icon-list flex justify-between items-start ql-container single-line icons overflow-auto icon-container">
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

<style lang="scss" scoped>
.icon-container {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.icon-list {
  position: absolute;
  max-width: 568px;
  height: 80px;
  align-items: center;
  padding: 0px 8px 0px 8px;
}
.toggle-triangle {
  border: 1px solid black;
  border-width: 0 1px 1px 0px;
  padding: 4px;
  display: inline-block;
  margin-left: 10px;
  transition: 0.3s ease-out;
  &.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    margin-bottom: 3px;
  }
  &.up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }
}
</style>
