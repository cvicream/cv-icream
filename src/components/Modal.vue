<script setup lang="ts">
const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>

<template>
  <div
    class="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
    style="background-color: rgba(241, 139, 107, 0.1);"
  >
    <div class="w-[400px] p-4 bg-white rounded-lg">
      <div class="text-right">
        <button @click="closeModal">
          <span
            class="i-custom:cancel icon-24"
          />
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>
