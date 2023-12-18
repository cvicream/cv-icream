
<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import type { OnClickOutsideOptions } from '@vueuse/core'
import { SOCIAL_MEDIA_ICONS } from '~/constants'

const props = defineProps <{
  icon: string
  onClick?: () => void
  index: number
  changeIcon: (item: string, index: number) => void
  clearIcon: (index: number) => void
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
        v-if="icon"
        :icon="icon"
      />
      <input v-else class="icon-input" placeholder="Icon">
      <div :class="className" />
    </div>
    <div v-if="showIcons" v-on-click-outside="onClickOutsideHandler" class="icon-popover ql-container single-line ">
      <div class="icon-list flex justify-between">
        <IconElement
          v-for="(item) in SOCIAL_MEDIA_ICONS"
          :key="item"
          :icon="item"
          :on-click="() => changeIcon(item, index)"
          :is-selected="item === icon"
        />
      </div>
      <span class="remove" :onclick="() => clearIcon(index)">Remove Icon</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-input {
  width: 35px;
  font-family: "Mark Pro";
  font-size: 1rem;
  line-height: 1.5rem;
  margin-right: -19px;
}
.icon-popover {
  display: flex;
  flex-direction: column;
  max-width: 584px;
  height: 110px;
  overflow-x: auto;
  overflow-y: hidden;
  position: absolute;
  padding: 16px;
  gap: 12px;
  box-shadow: 2px 2px 10px 0px rgba(241, 139, 107, 0.20);
  margin-top: 8px;
  width: unset;
  left: 1rem;
  right: 1rem;
  border: none;
  .icon-list {
    gap: 8px;
    .icon-container {
      min-width: 48px;
      &:hover {
        background: var(--secondary-color);
      }
    }
  }
  .remove {
    font-size: 14px;
    line-height: 18px;
    color: var(--black-70, #656565);
    font-family: Mark Pro;
    align-self: end;
    &:hover {
      color: var(--black-70);
    }
  }
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
