<script setup lang="ts">

const props = defineProps<{
  visible: boolean
  deleteIdx: number
  toggle: () => void
  deleteItem: (index: number) => void
}>()

</script>

<template>
  <Modal
    v-show="visible"
    title="Are You Sure?"
    subtitle="Delete a block can’t be recovered. Are you sure to delete it?"
    subtitle-style="margin-top: 4;"
    @close="toggle"
  >
    <div class="flex flex-col gap-6 mt-8 sm:flex-row sm:justify-between">
      <button
        class="btn-secondary px-12 flex-shrink-0"
        @click="toggle"
      >
        <span class="subleading">Cancel</span>
      </button>
      <button
        class="btn-primary px-6 flex-grow flex-shrink-0 text-white bg-primary-100"
        @click="deleteItem(deleteIdx)"
      >
        <span class="subleading">Yes, delete it</span>
      </button>
    </div>
  </Modal>
</template>
