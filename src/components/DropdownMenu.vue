<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { onClickOutside } from '@vueuse/core'
import { useToolbarStore } from '~/stores/toolbar'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: String,
  icon: String,
  tooltip: String,
})

const toolbar = useToolbarStore()
const { currentState, dropdownMenu } = storeToRefs(toolbar)
const target = ref(null)

onClickOutside(target, (event) => {
  toggle()
})

const information = computed(() => {
  if (props.id === 'fontSize') {
    if (currentState.value.fontSize === 'default')
      return 'Smallest text: 12px (9pt)'
    else if (currentState.value.fontSize === 'large')
      return 'Smallest text: 16px (12pt)'
  }
  return ''
})

function toggle() {
  if (!dropdownMenu[props.id])
    toolbar.toggle(props.id)
}
</script>

<template>
  <div>
    <Tooltip
      placement="top"
      :text="tooltip"
    >
      <div class="btn-toolbar w-8 h-8">
        <button
          class="w-8 h-8"
          :class="icon"
          @click="toggle"
        />
      </div>
    </Tooltip>
    <div
      v-if="dropdownMenu[id]"
      ref="target"
      class="w-[232px] h-[168px] bg-white shadow-custom rounded-[20px] px-2 py-4 absolute left-0 bottom-[72px]"
    >
      <div class="flex px-2 justify-between items-center">
        <div class="flex gap-2 items-center">
          <span
            class="w-8 h-8"
            :class="icon"
          />
          <label class="leading text-blacks-100">{{ label }}</label>
        </div>
        <span
          class="i-custom:cancel icon-24 cursor-pointer"
          @click.stop="toggle"
        />
      </div>
      <div class="mt-4 flex flex-wrap gap-x-2">
        <slot />
      </div>
      <p v-if="information" class="note text-blacks-20 mt-[22px]">
        {{ information }}
      </p>
    </div>
  </div>
</template>

<style scoped>
</style>
