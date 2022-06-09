<script lang="ts">
export default {
  props: {
    isEdit: Boolean,
  },
}
</script>

<template>
  <header class="h-[80px] leading-80px text-center bg-white border-b border-b-blacks-20 flex justify-between px-8 py-4">
    <div class="flex gap-8">
      <span class="btn-header bg-primary-10" />
      <button class="btn-icon-48">
        <span class="i-custom:idea icon-32" />
      </button>
    </div>
    <div v-if="isEdit" class="flex gap-8">
      <button class="btn-icon-48">
        <span class="i-custom:save icon-32" />
      </button>
      <button class="btn-icon-48">
        <span class="i-custom:load icon-32" />
      </button>
      <button class="btn-icon-48-fill">
        <span class="i-custom:download icon-32-fill" />
      </button>
    </div>
  </header>
</template>
