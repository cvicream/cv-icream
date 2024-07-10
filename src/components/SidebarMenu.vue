<script setup lang="ts">
const props = defineProps<{
  id: string
  path: string
  name: string
  icon: string
  showOnlyIcon: boolean
  disabled: boolean
  click: (id: string, path: string) => void
}>()

const router = useRouter()

function isActivePath(targetPath: string) {
  return router.currentRoute.value.path.indexOf(targetPath) === 0
}

function handleClick() {
  props.click(props.id, props.path)
}
</script>

<template>
  <button
    :key="path"
    class="w-full flex items-center px-3 py-2 user-select-none sm:hover:bg-primary-10 sm:hover:rounded"
    :class="isActivePath(path) && 'bg-primary-10 rounded'"
    @click="handleClick"
  >
    <span
      class="w-8 h-8 flex-shrink-0"
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
