<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  format: {
    type: String,
    validator(value: string) {
      return ['url', 'base64'].includes(value)
    },
    default: 'url',
  },
  src: {
    type: String,
    default: null,
  },
})

const src = computed(() => {
  if (!props.src)
    return ''

  if (props.format === 'url')
    return props.src
  else if (props.format === 'base64')
    return `data:image/jpg;base64,${props.src}`
  return ''
})
</script>

<template>
  <img v-if="src" :src="src" class="w-8 h-8 rounded-full">
  <span v-else class="w-8 h-8 rounded-full i-origin:avatar-default" />
</template>
