<script setup lang="ts">
import { useToolbarStore } from '~/stores/toolbar'
import { getColor, setCssVariable, setStatus } from '~/utils'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'CV Icream',
  meta: [
    { name: 'description', content: '' },
  ],
})

const toolbar = useToolbarStore()

toolbar.$subscribe((mutation, state) => {
  const color = getColor(state.currentState.color)
  setCssVariable('--primary-color', color.primary)
  setCssVariable('--secondary-color', color.secondary)
  setCssVariable('--shadow-color', color.shadow)
  setCssVariable('--border-color', color.border)
})

setStatus({ isEditing: false })
</script>

<template>
  <router-view />
</template>
