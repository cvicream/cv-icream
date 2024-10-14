<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { getColor, setCssVariable } from '~/utils'

onBeforeMount(() => {
  // make sure style change back to default
  const color = getColor('default')
  setCssVariable('--primary-color', color.primary)
  setCssVariable('--primary-70-color', color.primary70)
  setCssVariable('--primary-40-color', color.primary40)
  setCssVariable('--primary-20-color', color.primary20)
  setCssVariable('--primary-10-color', color.primary10)
  setCssVariable('--secondary-color', color.secondary)
  setCssVariable('--shadow-color', color.shadow)
  setCssVariable('--border-color', color.border)
})
</script>

<template>
  <main class="h-full">
    <Header />
    <div class="h-[calc(100%-57px)] custom-scrollbar bg-blacks-5 overflow-auto">
      <router-view />
      <div class="mt-8 p-25 text-center">
        <span class="i-origin:logo-background w-[140px] h-[38px]" />
        <p class="paragraph text-blacks-40 mt-3">
          {{ `Copyright ©${new Date().getFullYear()} CV Icream` }}
        </p>
      </div>
    </div>
  </main>
</template>
