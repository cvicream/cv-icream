<script setup lang="ts">
import { computed } from 'vue'
import { isMobileDevice } from '~/utils'

const props = defineProps({
  placement: {
    validator(value: string) {
      return ['top', 'left', 'right', 'bottom'].includes(value)
    },
    default() {
      return 'top'
    },
  },
  text: {
    type: String,
    require: true,
  },
  style: {
    type: Object,
    default: () => {},
  },
})

const tooltipClass = computed(() => {
  return `tooltip-${props.placement}`
})
</script>

<template>
  <div class="tooltip-container">
    <slot />
    <div v-if="(text || $slots.content) && !isMobileDevice()" class="tooltip" :class="tooltipClass" :style="style">
      <span v-if="text" class="note text-blacks-100">{{ text }}</span>
      <slot v-else name="content" />
    </div>
  </div>
</template>

<style scoped>
.tooltip-container {
  position: relative;
}

@media (min-width:640px){
  .tooltip-container:hover .tooltip {
    display: block;
  }
}

.tooltip {
  @apply flex justify-center items-center absolute px-3 py-2 bg-white rounded-lg border border-blacks-20 transition duration-500 ease-in-out;
  width: max-content;
  z-index: 999;
  display: none;
}

.tooltip::after {
  @apply absolute w-4 h-4 bg-white rounded-tr-sm border border-b-white border-l-white border-r-blacks-20 border-t-blacks-20 transition duration-500 ease-in-out;
  content: '';
}

.tooltip-left {
  top: 50%;
  right: calc(100% + 18px);
  transform: translateY(-50%);
}
.tooltip-left::after {
  top: 50%;
  right: -8px;
  transform: translateY(-50%) rotate(45deg);
}

.tooltip-right {
  top: 50%;
  left: calc(100% + 18px);
  transform: translateY(-50%);
}
.tooltip-right::after {
  top: 50%;
  left: -8px;
  transform: translateY(-50%) rotate(-135deg);
}

.tooltip-top {
  left: 50%;
  bottom: calc(100% + 18px);
  transform: translateX(-50%);
}
.tooltip-top::after {
  left: 50%;
  bottom: -8px;
  transform: translateX(-50%) rotate(135deg);
}

.tooltip-bottom {
  left: 50%;
  top: calc(100% + 18px);
  transform: translateX(-50%);
}
.tooltip-bottom::after {
  left: 50%;
  top: -8px;
  transform: translateX(-50%) rotate(-45deg);
}
</style>
