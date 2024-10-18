<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <img :src="src" class="w-8 h-8 rounded-full">
</template>
