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
  <div class="">
    <div class="btn-toolbar w-8 h-8">
      <button
        class="w-8 h-8"
        :class="icon"
        @click="toggle"
      />
    </div>
    <div v-if="isOpen" class="w-[232px] h-[168px] bg-white shadow-custom rounded-[20px] p-4 absolute left-0 bottom-[72px]">
      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
          <span
            class="w-8 h-8"
            :class="icon"
          />
          <label class="leading text-blacks-100">{{ label }}</label>
        </div>
        <span
          class="i-custom:cancel icon-24 cursor-pointer"
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
