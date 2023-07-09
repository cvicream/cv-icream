<script setup lang="ts">
import type { Note } from '~/types'

const props = defineProps<{
  note: Note
}>()

</script>

<template>
  <button
    class="note"
  >
    <span
      class="i-custom:note w-8 h-8"
    />
  </button>
</template>

<style>
.note {
  position: absolute;
  z-index: 1;
  top: calc(v-bind('props.note.location.top') * 1px);
  left: calc(v-bind('props.note.location.left') * 1px);
}
</style>
