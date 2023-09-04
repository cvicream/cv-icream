<script setup lang="ts">
import { computed, ref } from 'vue'
import { isMobileDevice, isSafari } from '~/utils'
import { FONT_FAMILIES } from '~/constants'

const fontFamilyOptions = FONT_FAMILIES.map(item => ({
  label: item.label,
  value: item.id,
}))

interface Option {
  label: string
  value: string
}

const props = defineProps({
  modelValue: String,
  placement: {
    validator(value: string) {
      return ['top', 'bottom'].includes(value)
    },
    default() {
      return 'bottom'
    },
  },
})

const emit = defineEmits(['update:modelValue'])

const menuVisible = ref(false)

const selectedOption = computed(() => {
  return fontFamilyOptions.find(option => option.value === props.modelValue)
})

const getOptionClass = (option: Option, index: number) => {
  const result: string[] = []
  if (index === 0) {
    if (isSafari() || isMobileDevice())
      result.push('rounded-t-[11px]')
    else
      result.push('rounded-t-xl')
  }
  else if (fontFamilyOptions.length && index === fontFamilyOptions.length - 1) {
    if (isSafari() || isMobileDevice())
      result.push('rounded-b-[11px]')
    else
      result.push('rounded-b-xl')
  }

  if (selectedOption?.value?.value === option.value)
    result.push('bg-primary-10')

  return result.join(' ')
}

function toggle(event) {
  menuVisible.value = !menuVisible.value
  event.stopPropagation()
}

function handleChange(event, option: Option, index: number) {
  emit('update:modelValue', option.value)
}
</script>

<template>
  <div @click="toggle">
    <div
      class="h-[46px] pl-4 pr-2 py-[11px] flex justify-between items-center border rounded-xl sm:hover:border-blacks-100 sm:hover:cursor-pointer"
      :class="menuVisible ? 'border-blacks-100' : 'border-white'"
    >
      <span
        class="font-normal text-base leading-[1.375rem] text-blacks-100"
        :class="selectedOption ? selectedOption.value : ''"
      >
        {{ selectedOption ? selectedOption.label : '' }}
      </span>
      <span
        class="i-custom:arrow-down w-6 h-6 text-blacks-70 transition"
        :class="menuVisible ? 'rotate-180' : 'rotate-0'"
      />
    </div>

    <div
      v-if="menuVisible"
      class="absolute left-2 right-2 z-3"
      :class="placement === 'top' ? 'bottom-[112px]' : 'top-[64px]'"
    >
      <div
        class="bg-white rounded-xl overflow-hidden"
        :class="isSafari() || isMobileDevice() ? 'border-1 border-blacks-100' : 'outline outline-1 outline-blacks-100'"
      >
        <div
          v-for="(option, index) in fontFamilyOptions"
          :key="option.value"
          class="w-full h-[45px] flex justify-start items-center px-4 py-3 sm:hover:bg-primary-10 sm:hover:cursor-pointer"
          :class="getOptionClass(option, index)"
          @mousedown="event => handleChange(event, option, index)"
        >
          <span
            class="paragraph text-blacks-100"
            :class="`${option.value}`"
          >
            {{ option.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
