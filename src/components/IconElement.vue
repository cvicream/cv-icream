<script setup lang="ts">
const props = defineProps <{
  icon: string
  onClick: () => void
}>()

const className = `i-custom:${props.icon} w-[20px] h-[20px] text-white`
</script>

<template>
  <button class="btn-icon-48  icon-container">
    <div class="icon-mask" :onclick="onClick">
      <span
        :class="className"
      />
    </div>
  </button>
</template>

<style scoped>
.icon-container {
  box-shadow: none;
}
.icon-mask {
  background-color: var(--primary-color);
  border-radius: 50%;
  opacity: 70%;
  cursor: pointer;
  height: 32px;
  width: 32px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
