<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps<{
  message?: string
  visible?: boolean
  duration?: number // visibility duration in milliseconds, set to 0 to keep it visible
}>()

const emit = defineEmits(['close'])

onMounted(() => {
  if (props.duration) {
    setTimeout(() => {
      emit('close')
    }, props.duration)
  }
})

function close() {
  emit('close')
}
</script>

<template>
  <div
    v-if="visible"
    class="fixed bottom-8 left-0 right-0 flex justify-center items-center z-99"
  >
    <div class="bg-primary-100 w-112 h-16 rounded-xl">
      <div class="flex justify-between px-5 mt-4">
        <div class=" text-white paragraph px-1 mt-1">
          {{ message }}
        </div>
        <button
          class="w-10 h-8 rounded flex justify-center items-center gap-4"
          @click="close"
        >
          <span class="w-[1px] h-8 bg-blacks-20" />
          <span class="i-custom:cancel icon-24 bg-white" />
        </button>
      </div>
    </div>
  </div>
</template>
