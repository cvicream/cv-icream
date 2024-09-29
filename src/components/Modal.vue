<script setup lang="ts">
const emit = defineEmits(['close'])

defineProps<{
  title?: string
  subtitle?: string
  titleStyle?: string
  subtitleStyle?: string
}>()

function closeModal() {
  emit('close')
}
</script>

<template>
  <div
    class="fixed top-0 right-0 bottom-0 left-0 z-99 flex justify-center items-center"
    style="background-color: rgba(241, 139, 107, 0.1);"
  >
    <div class="w-[352px] sm:w-[400px] p-6 bg-white rounded-2xl">
      <div class="flex justify-between items-start">
        <div>
          <div class="leading text-primary-100" :style="titleStyle">
            {{ title }}
          </div>
          <div class="paragraph text-blacks-70 mt-40" :style="subtitleStyle">
            {{ subtitle }}
          </div>
        </div>
        <button class="w-6 h-6" @click="closeModal">
          <span
            class="i-custom:cancel icon-24"
          />
        </button>
      </div>

      <slot />
    </div>
  </div>
</template>
