<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToolbarStore } from '~/stores/toolbar'
const toolbar = useToolbarStore()
const { currentState } = storeToRefs(toolbar)
</script>
<template>
  <label class="w-12 h-6 inline-block relative shrink-0">
    <input
      v-bind="$attrs"
      type="checkbox"
      class="hidden"
    >
    <span class="slider round" />
    <span class="tick round">
      <span
        class="i-custom:ok w-3 h-3 text-primary-100 hidden"
      />
    </span>
  </label>
</template>

<style scoped>
.slider {
  @apply bg-blacks-20 absolute top-0 right-0 bottom-0 left-0 cursor-pointer duration-500
}
.tick {
  @apply w-4 h-4 bg-white absolute content-none top-1 left-1 duration-500 flex flex-row justify-center items-center
}
.tick span {
  @apply absolute top-1/2 left-1/2 -translate-1/2
}
input:checked ~ .slider {
  @apply bg-primary-100
}
input:checked ~ .tick {
  @apply translate-x-6
}
input:checked ~ .tick span {
  @apply inline-block
}
.slider.round,
.tick.round {
  @apply rounded-xl
}
</style>
