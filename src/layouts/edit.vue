<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getColor, setCssVariable } from '~/utils'

const user = useUserStore()
const toolbar = useToolbarStore()
const { isCVPreviewVisible, currentState } = storeToRefs(toolbar)

function toggleCVPreview() {
  toolbar.$patch((state) => {
    state.isCVPreviewVisible = !state.isCVPreviewVisible
  })
}

onBeforeMount(() => {
  window.addEventListener('beforeunload', onBeforeUnload)
})

onMounted(() => {
  user.$patch((state) => {
    state.isEditing = true
  })

  const color = getColor(currentState.value.color)
  setCssVariable('--primary-color', color.primary)
  setCssVariable('--secondary-color', color.secondary)
  setCssVariable('--shadow-color', color.shadow)
  setCssVariable('--border-color', color.border)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', onBeforeUnload)
})

function onBeforeUnload(event) {
  // cancel the event as stated by the standard
  event.preventDefault()
  // chrome requires returnValue to be set
  event.returnValue = ''
  return false
}

</script>

<template>
  <main class="h-screen">
    <Header :is-edit="true" />
    <div class="relative sm:flex sm:flex-row h-[calc(100%-138px)] overflow-hidden sm:h-[calc(100%-57px)]">
      <Sidebar />
      <div
        class="absolute top-0 bottom-0 left-0 right-0 bg-white px-4 py-8 overflow-auto custom-scrollbar sm:static sm:px-8 sm:py-16 sm:z-0 sm:w-[calc(100%-390px)] sm:flex"
        :class="{ 'visible z-2': isCVPreviewVisible }"
      >
        <div class="w-[595px] min-w-[595px] h-[842px] min-h-[842px] mx-auto">
          <CVPreview id="cv-preview" />
        </div>
        <div class="flex justify-center fixed bottom-0 left-0 right-0 z-2 sm:bottom-8 sm:right-[390px] sm:z-0">
          <Toolbar />
        </div>
        <button
          class="btn-icon-48 fixed bottom-28 right-8 z-2 sm:hidden"
          @click="toggleCVPreview"
        >
          <span
            class="icon-32"
            :class="isCVPreviewVisible ? 'i-custom:edit' : 'i-custom:preview'"
          />
        </button>
      </div>
    </div>
  </main>
</template>
