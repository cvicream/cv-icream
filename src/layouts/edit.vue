<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useToolbarStore } from '~/stores/toolbar'
import { getColor, setCssVariable, setStatus } from '~/utils'
import { MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH, MOBILE_BREAKPOINT, SCALES } from '~/constants'

const toolbar = useToolbarStore()
const { isCVPreviewVisible, currentState } = storeToRefs(toolbar)

const isDesignBarOpen = ref(true)
const isMobile = ref(false)
const scale = ref(100)
const isFitEnable = ref(false)

const cvPreviewWidth = computed(() => {
  const width = 210 * scale.value / 100
  return `${width}mm`
})
const cvPreviewHeight = computed(() => {
  const height = 297 * scale.value / 100
  return `${height}mm`
})

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
  window.removeEventListener('beforeunload', onBeforeUnload)

  window.removeEventListener('resize', resize)
})

function onBeforeUnload(event) {
  // cancel the event as stated by the standard
  event.preventDefault()
  // chrome requires returnValue to be set
  event.returnValue = ''
  return false
}

function onCollapse() {
  isDesignBarOpen.value = !isDesignBarOpen.value
}

function resize() {
  if (window.innerWidth <= MOBILE_BREAKPOINT) {
    isMobile.value = true
    isDesignBarOpen.value = true
    rightWidth.value = 0

    if (rightSide.value) {
      rightSide.value.style.removeProperty('width')
      rightSide.value.style.removeProperty('min-width')
      leftSide.value.style.removeProperty('width')
    }
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

function zoomIn() {
  const max = SCALES[SCALES.length - 1]
  if (scale.value < max) {
    if (SCALES.includes(scale.value)) { scale.value = scale.value * 2 }
    else {
      const filter = SCALES.filter(n => n >= scale.value)
      scale.value = filter.length ? filter[0] : max
    }
  }
}

function zoomOut() {
  const min = SCALES[0]
  if (scale.value > min) {
    if (SCALES.includes(scale.value)) { scale.value = scale.value / 2 }
    else {
      const filter = SCALES.filter(n => n < scale.value)
      scale.value = filter.length ? filter[filter.length - 1] : min
    }
  }
}

function zoomFit() {
  if (leftSide.value) {
    const { width, height } = getElementInnerDimensions(leftSide.value)
    scale.value = (width > height) ? Math.floor(height * 100 / 1122.5) : Math.floor(width * 100 / 793.7)
  }
}

function getElementInnerDimensions(element) {
  const computedStyle = getComputedStyle(element)
  let width = element.clientWidth // width with padding
  let height = element.clientHeight // height with padding

  width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)
  height -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)

  return { width, height }
}
</script>

<template>
  <CVPreview id="cv-preview-print" />
  <main class="h-full">
    <Header :is-edit="true" />
    <div class="w-full h-[calc(100%-137px)] border-b-1 border-blacks-20 sm:flex sm:flex-row sm:h-[calc(100%-57px)] sm:border-0 overflow-hidden">
      <div
        ref="leftSide"
        class="h-[calc(100%-8px)] bg-white px-3 py-7 overflow-auto custom-scrollbar flex-grow flex-shrink sm:px-7 sm:py-15 m-1"
        :class="{ 'absolute hidden': isMobile && !isCVPreviewVisible }"
      >
        <div
          class="mx-auto"
          :style="{
            width: cvPreviewWidth,
            height: cvPreviewHeight,
          }"
        >
          <div
            class="w-[210mm] h-[297mm]"
            :style="{
              transform: `scale(${scale}%)`,
              'transform-origin': '0 0',
            }"
          >
            <CVPreview id="cv-preview" />
          </div>
        </div>
        <div
          class="fixed bottom-0 left-0 right-0 z-2 sm:z-0"
          :class="isDesignBarOpen ? 'sm:bottom-8' : 'sm:bottom-48'"
          :style="rightWidthStyle"
        >
          <div
            class="flex sm:inline-flex absolute bottom-0 transition group"
            :class="isDesignBarOpen ? 'center' : 'right'"
          >
            <button
              class="w-5 h-7 pb-2 m-0 hidden sm:inline-block absolute bottom-full right-0 invisible group-hover:visible"
              @click="onCollapse"
            >
              <span
                class="w-5 h-5 rotate-90"
                :class="isDesignBarOpen ? 'i-origin:close' : 'i-origin:open'"
              />
            </button>
            <Toolbar
              :open="isDesignBarOpen"
              :collapse="onCollapse"
              :is-mobile="isMobile"
            />
          </div>
        </div>

        <div
          class="fixed bottom-0 left-0 right-0 z-2 bottom-48 sm:bottom-8 sm:z-0"
          :style="rightWidthStyle"
        >
          <div class="w-12 h-32 p-2 rounded-[69px] bg-white shadow-custom flex flex-col justify-between absolute bottom-0 right transition group">
            <button class="btn-icon-32" @click="zoomIn">
              <span class="i-custom:zoom-in w-6 h-6" />
            </button>
            <button
              class="note text-center whitespace-nowrap -mx-2"
              :class="isFitEnable ? 'text-blacks-40' : 'text-blacks-70'"
              @mouseover="isFitEnable = true"
              @mouseout="isFitEnable = false"
              @click="zoomFit"
            >
              {{ isFitEnable ? 'Fit' : `${scale}%` }}
            </button>
            <button class="btn-icon-32" @click="zoomOut">
              <span class="i-custom:zoom-out w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <button
        class="btn-icon-48-fill fixed bottom-28 right-8 z-2 sm:hidden"
        @click="toggleCVPreview"
      >
        <span
          class="icon-32 text-white"
          :class="isCVPreviewVisible ? 'i-custom:edit' : 'i-custom:preview'"
        />
      </button>

      <div
        ref="resizer"
        class="resizer h-full sm:border-l border-blacks-20 cursor-[col-resize]"
        :class="{ 'hidden': isMobile }"
      />

      <div
        ref="rightSide"
        class="w-full h-full sm:w-[390px] sm:min-w-[390px]"
      >
        <Sidebar />
      </div>
    </div>

    <Toolbar
      v-if="isMobile && !isCVPreviewVisible"
      :open="isDesignBarOpen"
      :collapse="onCollapse"
      :is-mobile="isMobile"
    />
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

.resizer {
  @apply relative;
}
.resizer::before {
  @apply absolute w-3 h-full z-1;
  content: '';
  left: 50%;
  transform: translateX(-50%);
}
.resizer::before:hover {
  @apply cursor-[col-resize];
}
</style>
