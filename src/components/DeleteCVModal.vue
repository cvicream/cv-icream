<script setup lang="ts">
const emit = defineEmits(['yes'])

defineProps<{
  visible: boolean
  toggle: () => void
}>()

const deleteCV = () => {
  emit('yes')
}
</script>

<template>
  <Modal
    v-show="visible"
    title="You’re about to delete this CV"
    subtitle="This action cannot be undone."
    subtitle-style="margin-top: 4;"
    @close="toggle"
  >
    <div class="flex flex-col gap-6 mt-8 sm:flex-row sm:justify-between">
      <button
        class="btn-secondary px-12 flex-shrink-0"
        @click="toggle"
      >
        <span class="subleading text-blacks-100">Cancel</span>
      </button>
      <button
        class="btn-primary px-6 flex-grow flex-shrink-0 text-white bg-primary-100"
        @click="deleteCV"
      >
        <span class="subleading text-white">Delete</span>
      </button>
    </div>
  </Modal>
</template>
