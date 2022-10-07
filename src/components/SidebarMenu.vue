<script setup lang="ts">
const props = defineProps<{
  path: string
  name: string
  icon: string
  showOnlyIcon: boolean
  disabled: boolean
  click: (path: string) => void
}>()

const router = useRouter()

function isActivePath(targetPath: string) {
  return router.currentRoute.value.path.indexOf(targetPath) === 0
}

function handleClick(path) {
  props.click(path)
}
</script>

<template>
  <button
    :key="path"
    class="flex items-center px-3 py-2 user-select-none hover:bg-primary-10 hover:rounded"
    :class="isActivePath(path) && 'bg-primary-10 rounded'"
    @click="handleClick(path)"
  >
    <span
      class="w-8 h-8"
      :class="!disabled ? `${icon} text-blacks-70` : `${icon} text-blacks-40`"
    />
    <span
      class="leading ml-4"
      :class="{
        'hidden': showOnlyIcon,
        'text-blacks-70': !disabled,
        'text-blacks-40': disabled
      }"
    >
      {{ name }}
    </span>
  </button>
</template>
