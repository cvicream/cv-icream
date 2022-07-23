<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getColor, getStorage, hasStorage, isSaved, setCssVariable, setStatus } from '~/utils'

const user = useUserStore()
const toolbar = useToolbarStore()
const { isCVPreviewVisible, currentState } = storeToRefs(toolbar)

const isDesignBarOpen = ref(true)
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

  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  setStatus({ isEditing: false })
  // window.removeEventListener('beforeunload', onBeforeUnload)

  window.removeEventListener('resize', resize)
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

function onCollapse() {
  isDesignBarOpen.value = !isDesignBarOpen.value
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

function resize() {
  if (window.innerWidth < 640)
    isDesignBarOpen.value = true
}
</script>

<template>
  <CVPreview id="cv-preview-print" />
  <main class="h-screen">
    <Header :is-edit="true" />
    <div
      class="relative sm:flex sm:flex-row h-[calc(100%-137px)] overflow-hidden sm:h-[calc(100%-57px)]"
      :class="{ 'border-b-1 border-blacks-20 sm:border-0 ': isCVPreviewVisible }"
    >
      <Sidebar />
      <div
        class="absolute top-1 bottom-1 left-1 right-1 bg-white px-4 py-8 overflow-auto custom-scrollbar sm:static sm:px-8 sm:py-16 sm:z-0 sm:w-[calc(100%-398px)] sm:m-1 sm:flex"
        :class="{ 'visible z-2': isCVPreviewVisible }"
      >
        <div class="w-[210mm] min-w-[210mm] min-h-[297mm] mx-auto">
          <CVPreview id="cv-preview" />
        </div>
        <div class="fixed bottom-0 left-0 right-0 z-2 sm:bottom-8 sm:right-[390px] sm:z-0">
          <div
            class="flex sm:inline-flex absolute bottom-0 transition group"
            :class="isDesignBarOpen ? 'center' : 'right'"
          >
            <button class="w-5 h-7 pb-2 m-0 hidden sm:inline-block absolute bottom-full right-0 invisible group-hover:visible" @click="onCollapse">
              <span
                class="w-5 h-5"
                :class="isDesignBarOpen ? 'i-origin:close' : 'i-origin:open'"
              />
            </button>
            <Toolbar :open="isDesignBarOpen" :collapse="onCollapse" />
          </div>
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

<style>
.center {
  right: 50%;
  transform: translateX(50%);
}
.right {
  right: 32px;
}
.transition {
  transition: all 0.5s;
}
</style>
