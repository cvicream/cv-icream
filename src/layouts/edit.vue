<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getColor, getStorage, hasStorage, isSaved, setCssVariable, setStatus } from '~/utils'
import { MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH, MOBILE_BREAKPOINT } from '~/constants'

const user = useUserStore()
const toolbar = useToolbarStore()
const { isCVPreviewVisible, currentState } = storeToRefs(toolbar)

const isDesignBarOpen = ref(true)
const saveModalVisible = ref(false)
const recoverModalVisible = ref(false)
const isMobile = ref(false)

const resizer = ref<any>(null)
const leftSide = ref<any>(null)
const rightSide = ref<any>(null)
// current position of mouse
const x = ref(0)
const y = ref(0)
const leftWidth = ref(0)
const rightWidth = ref(MIN_SIDEBAR_WIDTH)

const rightWidthStyle = computed(() => {
  return {
    right: `${rightWidth.value}px`,
  }
})

function toggleCVPreview() {
  toolbar.$patch((state) => {
    state.isCVPreviewVisible = !state.isCVPreviewVisible
  })
}

onBeforeMount(() => {
  window.addEventListener('beforeunload', onBeforeUnload)
  resize()
})

onMounted(() => {
  setStatus({ isEditing: true })

  if (isSaved() && !isUpload())
    recoverModalVisible.value = isSaved()

  const color = getColor(currentState.value.color)
  setCssVariable('--primary-color', color.primary)
  setCssVariable('--secondary-color', color.secondary)
  setCssVariable('--shadow-color', color.shadow)
  setCssVariable('--border-color', color.border)

  window.addEventListener('resize', resize)

  if (leftSide.value && resizer.value && rightSide.value)
    resizer.value.addEventListener('mousedown', mouseDownHandler)
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
  return backUrl?.indexOf('/landing') >= 0
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
  if (window.innerWidth <= MOBILE_BREAKPOINT) {
    isMobile.value = true
    isDesignBarOpen.value = true
    rightWidth.value = 0
    rightSide.value.style.removeProperty('width')
    rightSide.value.style.removeProperty('min-width')
    leftSide.value.style.removeProperty('width')
  }
  else {
    isMobile.value = false
    if (rightSide?.value?.offsetWidth)
      rightWidth.value = rightSide.value.offsetWidth
  }
}

function mouseDownHandler(e) {
  // get the current mouse position
  x.value = e.clientX
  y.value = e.clientY
  leftWidth.value = leftSide.value.offsetWidth
  rightWidth.value = rightSide.value.offsetWidth

  // attach the listeners to `document`
  document.addEventListener('mousemove', mouseMoveHandler)
  document.addEventListener('mouseup', mouseUpHandler)
}

function mouseMoveHandler(e) {
  // how far the mouse has been moved
  const dx = resizer.value.parentNode.offsetWidth - e.clientX

  if (dx >= MIN_SIDEBAR_WIDTH && dx <= MAX_SIDEBAR_WIDTH) {
    const leftMargin = getElementMarginX(leftSide.value)
    leftSide.value.style.width = `${e.clientX - resizer.value.offsetWidth - leftMargin}px`
    rightSide.value.style.width = `${dx}px`
    rightSide.value.style['min-width'] = `${dx}px`
    rightWidth.value = dx
  }

  resizer.value.style.cursor = 'col-resize'
  document.body.style.cursor = 'col-resize'

  leftSide.value.style.userSelect = 'none'
  leftSide.value.style.pointerEvents = 'none'

  rightSide.value.style.userSelect = 'none'
  rightSide.value.style.pointerEvents = 'none'
}

function mouseUpHandler() {
  resizer.value.style.removeProperty('cursor')
  document.body.style.removeProperty('cursor')

  leftSide.value.style.removeProperty('user-select')
  leftSide.value.style.removeProperty('pointer-events')

  rightSide.value.style.removeProperty('user-select')
  rightSide.value.style.removeProperty('pointer-events')

  // remove the handlers of `mousemove` and `mouseup`
  document.removeEventListener('mousemove', mouseMoveHandler)
  document.removeEventListener('mouseup', mouseUpHandler)
}

function getElementMarginX(element) {
  const cs = window.getComputedStyle(element)
  const marginLeft = parseFloat(cs['margin-left'])
  const marginRight = parseFloat(cs['margin-right'])
  return marginLeft + marginRight
}
</script>

<template>
  <CVPreview id="cv-preview-print" />
  <main class="h-screen">
    <Header :is-edit="true" />
    <div
      class="w-full h-[calc(100%-137px)] sm:flex sm:flex-row sm:h-[calc(100%-57px)] overflow-hidden"
      :class="{ 'border-b-1 border-blacks-20 sm:border-0 ': isCVPreviewVisible }"
    >
      <div
        ref="leftSide"
        class="h-[calc(100%-8px)] bg-white px-4 py-8 overflow-auto custom-scrollbar flex-grow flex-shrink sm:px-8 sm:py-16 m-1"
        :class="{ 'absolute hidden': isMobile && !isCVPreviewVisible }"
      >
        <div class="w-[210mm] h-[297mm] mx-auto">
          <CVPreview id="cv-preview" />
        </div>
        <div
          class="fixed bottom-0 left-0 right-0 z-2 sm:bottom-8 sm:z-0"
          :style="rightWidthStyle"
        >
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

      <div
        ref="resizer"
        class="h-full sm:border-l border-blacks-20 cursor-[ew-resize]"
        :class="{ 'hidden': isMobile }"
      />

      <div
        ref="rightSide"
        class="w-full h-full sm:w-[390px] sm:min-w-[390px]"
      >
        <Sidebar />
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
