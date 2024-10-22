<script setup lang="ts">
import type { Option } from '~/types'

const props = defineProps<{
  option: Option
  selected: boolean
  canSelect: boolean
}>()

const emit = defineEmits(['clickOption'])

const isSelected = ref<Boolean>(props.selected)

const getOptionClasses = computed(() => {
  const classes: string[]
    = ['sm:min-w-[351px] border-1 rounded-xl border-blacks-20 flex gap-[24px] p-[12px] hover:bg-primary-10 w-100% cursor-pointer text-start']
  if (isSelected.value)
    classes.push('border-1 border-primary-100 rounded')

  return classes.join(' ')
})

function onClickOption(value) {
  if (!props.canSelect && !isSelected.value)
    return
  emit('clickOption', value, !isSelected.value)
  isSelected.value = !isSelected.value
}
</script>

<template>
  <div
    :key="option.value"
    :class="getOptionClasses"
    @click="onClickOption(option.value)"
  >
    <div
      v-if="!isSelected"
      class="min-w-[24px] min-h-[24px] h-[24px] border-1 border-blacks-70 rounded"
    />
    <div
      v-else
      class="min-w-[24px] min-h-[24px] h-[24px] i-origin:survey-checkbox"
    />
    <div class="subleading mr-[11px]">
      {{ option.label }}
    </div>
  </div>
</template>
