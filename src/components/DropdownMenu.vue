<script lang="ts">
import { ref } from 'vue'

export default {
  props: {
    label: String,
    icon: String,
  },
  setup() {
    const isOpen = ref(false)

    function toggle() {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      toggle,
    }
  },
}
</script>

<template>
  <div class="relative">
    <div class="btn-toolbar">
      <button
        class="w-8 h-8"
        :class="icon"
        @click="toggle"
      />
    </div>
    <div v-if="isOpen" class="w-[232px] h-[168px] bg-white shadow-custom rounded-[20px] p-4 absolute left-0 -top-[200px] bg-red-400">
      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
          <span class="i-custom:template icon-32" />
          <label class="leading text-blacks-100">{{ label }}</label>
        </div>
        <span
          class="i-custom:cancel icon-24"
          @click="toggle"
        />
      </div>
      <div class="mt-4 px-2 flex gap-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
