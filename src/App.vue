<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { TEMPLATES } from '~/constants'
import { setCssVariable } from '~/utils'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'CV Icream',
  meta: [
    { name: 'description', content: '' },
  ],
})

const user = useUserStore()
const toolbar = useToolbarStore()

user.$subscribe((mutation, state) => {
  const defaultTemplate = TEMPLATES.find(t => t.template === state.template)
  if (defaultTemplate)
    Object.assign(state, defaultTemplate)
})

toolbar.$subscribe((mutation, state) => {
  setCssVariable('--primary-color', state.currentState.primaryColour)
  setCssVariable('--secondary-color', state.currentState.secondaryColour)
  setCssVariable('--shadow-color', state.currentState.shadowColour)
})
</script>

<template>
  <router-view />
</template>
