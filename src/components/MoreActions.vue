<script setup lang="ts">
defineProps<{
  open: boolean
}>()

</script>

<template>
  <button class="w-6 h-6 px-[4px] py-[10px] relative select-none">
    <span class="dots" :class="{ open: open }" />
  </button>
</template>

<style scoped>
.dots,
.dots::before,
.dots::after {
  @apply inline-block w-1 h-1 rounded-full bg-blacks-40;
  transition-property: width, height, left, top, transform, background-color;
  transition-duration: .1s;
  transition-timing-function: ease-in-out;
}
.dots {
  @apply absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dots::before,
.dots::after {
  @apply absolute content-none;
}
.dots::before {
  @apply left-[6px];
}
.dots::after {
  @apply -left-[6px];
}

.open {
  background-color: transparent;
}
.open::before,
.open::after {
  @apply -left-[6px] w-[16px] h-[2px];
}
.open::before {
  transform: rotate(45deg);
}
.open::after {
  transform: rotate(-45deg);
}
</style>
