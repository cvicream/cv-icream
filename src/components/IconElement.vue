<script setup lang="ts">
const props = defineProps <{
  icon: string
  isSelected?: boolean
  onClick?: () => void
}>()

const className = computed(() => `i-custom:${props.icon} w-[20px] h-[20px] text-white`)
const backgroundColor = computed(() => props.isSelected ? 'var(--secondary-color)' : '')
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
  background: v-bind('backgroundColor')
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
  margin: 0;
}
</style>
