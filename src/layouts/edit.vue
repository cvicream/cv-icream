<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getColor, getStorage, hasStorage, isSaved, setCssVariable, setStatus } from '~/utils'

const user = useUserStore()
const toolbar = useToolbarStore()
const { isCVPreviewVisible, currentState } = storeToRefs(toolbar)
const saveModalVisible = ref(false)
const recoverModalVisible = ref(false)

function toggleCVPreview() {
  toolbar.$patch((state) => {
    state.isCVPreviewVisible = !state.isCVPreviewVisible
  })
}

onBeforeMount(() => {
  window.addEventListener('beforeunload', onBeforeUnload)
})

onMounted(() => {
  if (isSaved() && !isUpload())
    recoverModalVisible.value = isSaved()
  else
    setStatus({ isEditing: true })

  const color = getColor(currentState.value.color)
  setCssVariable('--primary-color', color.primary)
  setCssVariable('--secondary-color', color.secondary)
  setCssVariable('--shadow-color', color.shadow)
  setCssVariable('--border-color', color.border)
})

onUnmounted(() => {
  setStatus({ isEditing: false })
  // window.removeEventListener('beforeunload', onBeforeUnload)
})

function onBeforeUnload(event) {
  if (!isSaved())
    saveModalVisible.value = true

  // cancel the event as stated by the standard
  event.preventDefault()
  // chrome requires returnValue to be set
  event.returnValue = ''
  return false
}

function isUpload() {
  const backUrl = window.history.state.back
  return backUrl?.indexOf('/layout') >= 0
}

function save() {
  setStatus({ isSaved: true })

  // TODO: better way to start to save data in localstorage
  user.$patch((state) => {
    state.isSaved = true
  })

  saveModalVisible.value = false
}

function recover() {
  if (hasStorage()) {
    const storage = getStorage()
    if (storage) {
      Object.keys(storage).forEach((key) => {
        if (key === 'user') {
          user.$patch((state) => {
            Object.assign(state, storage[key])
          })
        }
        else if (key === 'toolbar') {
          toolbar.$patch((state) => {
            Object.assign(state, storage[key])
          })
        }
      })
    }
  }

  recoverModalVisible.value = false
  setStatus({ isEditing: true })
}

function cancelRecover() {
  recoverModalVisible.value = false
  setStatus({ isEditing: true })
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

    <Modal
      v-show="recoverModalVisible"
      @close="recoverModalVisible = false"
    >
      <div class="leading text-primary-100 mt-1 px-2">
        Recover your information?
      </div>
      <div class="paragraph text-blacks-100 mt-6 px-2">
        Would you like to recover your information?
      </div>
      <div class="flex flex-col gap-6 px-2 pt-6 pb-2 sm:flex-row">
        <button
          class="btn-secondary px-8 flex-shrink-0"
          @click="cancelRecover"
        >
          <span class="subleading">
            No, thanks.
          </span>
        </button>
        <button
          class="btn-primary px-8 flex-shrink-0"
          @click="recover"
        >
          <span class="subleading">
            Yes, please.
          </span>
        </button>
      </div>
    </Modal>

    <Modal
      v-show="saveModalVisible"
      @close="saveModalVisible = false"
    >
      <div class="leading text-primary-100 mt-1 px-2">
        Save your information?
      </div>
      <div class="paragraph text-blacks-100 mt-6 px-2">
        Would you like to save your information and continue editing when you come back next time?
      </div>
      <div class="flex flex-col gap-6 px-2 pt-6 pb-2 sm:flex-row">
        <button
          class="btn-secondary px-8 flex-shrink-0"
          @click="saveModalVisible = false"
        >
          <span class="subleading">
            No, thanks.
          </span>
        </button>
        <button
          class="btn-primary px-8 flex-shrink-0"
          @click="save"
        >
          <span class="subleading">
            Yes, please.
          </span>
        </button>
      </div>
    </Modal>
  </main>
</template>
