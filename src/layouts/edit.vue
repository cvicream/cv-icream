<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { getColor, getStorage, hasStorage, isEditing, isMac, isMobileDevice, setCssVariable, setStatus } from '~/utils'
import {
  A4_HEIGHT_PX,
  A4_WIDTH_PX,
  MAX_SCALE,
  MAX_SIDEBAR_WIDTH,
  MIN_SCALE,
  MIN_SIDEBAR_WIDTH,
  MOBILE_BREAKPOINT,
  PAGE_BREAKPOINT,
} from '~/constants'

const user = useUserStore()
const toolbar = useToolbarStore()
const { isCVPreviewVisible, currentState, isMobileScreen, noteList } = storeToRefs(toolbar)

const isDesignBarOpen = ref(true)
const scale = ref(100)
const isNoteEditing = ref(false)
const newNoteId = ref(0)

toolbar.$onAction(({ name, args }) => {
  if (name === 'addNote')
    newNoteId.value = args[0].id
})

const scaleText = computed(() => {
  return `${scale.value.toString().replace(/[^0-9]/g, '')}%`
})

const cvPreviewWidth = computed(() => {
  const width = 210 * scale.value / 100
  return `${width}mm`
})
const cvPreviewHeight = computed(() => {
  const height = 297 * scale.value / 100
  return `${height}mm`
})

const scaleA4Height = computed(() => {
  return A4_HEIGHT_PX * scale.value / 100
})
const cvPreview = ref<any>(null)
const { height } = useElementSize(cvPreview)
const extraPages = ref<number>(0)
const isShortPage = ref<boolean>(false)

watch(height, () => {
  const pages = Math.ceil(height.value / scaleA4Height.value)
  extraPages.value = pages > 0 ? pages - 1 : 0
})

watch(noteList, (newVal, oldVal) => {
  if (newVal.length < oldVal.length) {
    // make status of note editing to false when a note is removed
    isNoteEditing.value = false
  }
})

const resizer = ref<any>(null)
const leftSide = ref<any>(null)
const rightSide = ref<any>(null)
const isSidebarOpen = ref(false)

// current position of mouse
const x = ref(0)
const y = ref(0)
const leftWidth = ref(0)
const rightWidth = ref(MIN_SIDEBAR_WIDTH)

const rightWidthStyle = computed(() => {
  return {
    right: `${isMobileScreen.value ? 0 : rightWidth.value}px`,
  }
})

function toggleCVPreview() {
  toolbar.$patch((state) => {
    state.isCVPreviewVisible = !state.isCVPreviewVisible
  })
}

onBeforeMount(() => {
  if (!isEditing() && hasStorage()) {
    const storage = getStorage()
    Object.keys(storage).forEach((key) => {
      if (key === 'user') {
        const subObj = storage[key]
        Object.keys(subObj).forEach((subKey) => {
          user.$patch((state) => {
            state[subKey] = subObj[subKey]
          })
        })
        user.updateTimestamp()
      }
      else if (key === 'toolbar') {
        const subObj = storage[key]
        Object.keys(subObj).forEach((subKey) => {
          if (subKey === 'currentState') {
            toolbar.setCurrentState(subObj[subKey])
          }
          else {
            toolbar.$patch((state) => {
              state[subKey] = subObj[subKey]
            })
          }
        })
      }
    })
  }

  window.addEventListener('beforeunload', onBeforeUnload)
  resize()
  initializeWidth()
})

onMounted(() => {
  setStatus({ isEditing: true })

  const color = getColor(currentState.value.color)
  setCssVariable('--primary-color', color.primary)
  setCssVariable('--primary-70-color', color.primary70)
  setCssVariable('--primary-40-color', color.primary40)
  setCssVariable('--primary-20-color', color.primary20)
  setCssVariable('--primary-10-color', color.primary10)
  setCssVariable('--secondary-color', color.secondary)
  setCssVariable('--shadow-color', color.shadow)
  setCssVariable('--border-color', color.border)

  window.addEventListener('resize', resize)

  if (leftSide.value && resizer.value && rightSide.value)
    resizer.value.addEventListener('mousedown', mouseDownHandler)

  overrideDefaultZoom()
})

onUnmounted(() => {
  setStatus({ isEditing: false })
  window.removeEventListener('beforeunload', onBeforeUnload)
  window.removeEventListener('resize', resize)
})

function overrideDefaultZoom() {
  document.addEventListener('keydown', (event) => {
    // use `event.code` to check if it needs to zoom in/out
    if (['Equal'].includes(event.code)) {
      zoomIn()
      event.preventDefault()
    }
    else if (['Minus'].includes(event.code)) {
      zoomOut()
      event.preventDefault()
    }
  })
  document.addEventListener('wheel', (event) => {
    if ((isMac() && (event.metaKey || event.ctrlKey)) || (!isMac() && event.ctrlKey)) {
      if (event.deltaY < 0) zoomIn(5)
      else if (event.deltaY > 0) zoomOut(5)

      event.preventDefault()
    }
  }, { passive: false })
}

function initializeWidth() {
  const width = (window.innerWidth - 1) / 2 // resizer width is 1px
  leftWidth.value = width
  rightWidth.value = width
}

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
  isShortPage.value = window.innerWidth < PAGE_BREAKPOINT

  if (window.innerWidth <= MOBILE_BREAKPOINT) {
    toolbar.setIsMobileScreen(true)
    toolbar.setIsCVPreviewVisible(false)
    isDesignBarOpen.value = true
    rightWidth.value = 0

    if (rightSide.value) {
      rightSide.value.style.removeProperty('width')
      leftSide.value.style.removeProperty('width')
    }
  }
  else {
    toolbar.setIsMobileScreen(false)
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

  leftSide.value.classList.remove('transition-all', 'duration-200')
  rightSide.value.classList.remove('transition-all', 'duration-200')

  // attach the listeners to `document`
  document.addEventListener('mousemove', mouseMoveHandler)
  document.addEventListener('mouseup', mouseUpHandler)
}

function mouseMoveHandler(e) {
  // how far the mouse has been moved
  const dx = resizer.value.parentNode.offsetWidth - e.clientX

  if (
    (
      (isSidebarOpen.value && dx >= (MIN_SIDEBAR_WIDTH + 172))
        || (!isSidebarOpen.value && dx >= (MIN_SIDEBAR_WIDTH))
    ) && (
      dx <= MAX_SIDEBAR_WIDTH
    )
  ) {
    const leftMargin = getElementMarginX(leftSide.value)
    leftSide.value.style.width = `${e.clientX - resizer.value.offsetWidth - leftMargin}px`
    rightSide.value.style.width = `${dx}px`
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
  leftSide.value.classList.add('transition-all', 'duration-200')

  rightSide.value.style.removeProperty('user-select')
  rightSide.value.style.removeProperty('pointer-events')
  rightSide.value.classList.add('transition-all', 'duration-200')

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

function handleScaleChange(event) {
  const value = parseInt(event.target.value.replace(/[^0-9]/g, ''))
  if (value) {
    if (value >= MAX_SCALE) scale.value = MAX_SCALE
    else if (value <= MIN_SCALE) scale.value = MIN_SCALE
    else scale.value = value
  }
}

function zoomIn(step?: number) {
  const value = step ? scale.value + step : Math.round(scale.value * 2)
  scale.value = value < MAX_SCALE ? value : MAX_SCALE
}

function zoomOut(step?: number) {
  const value = step ? scale.value - step : Math.round(scale.value / 2)
  scale.value = value > MIN_SCALE ? value : MIN_SCALE
}

function zoomFit() {
  if (leftSide.value) {
    const { width, height } = getElementInnerDimensions(leftSide.value)
    scale.value = (width > height) ? Math.floor(height * 100 / A4_HEIGHT_PX) : Math.floor(width * 100 / A4_WIDTH_PX)
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

function handleLeftPageClick() {

}
function handleRightPageClick() {

}

function setSidebarOpen(value) {
  isSidebarOpen.value = value
}
function toggleSidebar(isOpen) {
  if (isOpen) {
    leftSide.value.style.width = `${leftSide.value.offsetWidth - 172}px`
    rightSide.value.style.width = `${rightSide.value.offsetWidth + 172}px`
  }
  else {
    leftSide.value.style.width = `${leftSide.value.offsetWidth + 172}px`
    rightSide.value.style.width = `${rightSide.value.offsetWidth - 172}px`
  }
}
</script>

<template>
  <CVPreview id="cv-preview-print" read-only />
  <main class="h-full">
    <Header :is-edit="true" />
    <div class="w-full h-[calc(100%-137px)] border-b-1 border-blacks-20 sm:flex sm:flex-row sm:h-[calc(100%-57px)] sm:border-0 overflow-hidden">
      <div
        id="left-side"
        ref="leftSide"
        class="h-[calc(100%-8px)] bg-white px-3 pt-[52px] pb-7 overflow-auto custom-scrollbar flex-grow flex-shrink sm:px-7 sm:pt-15 sm:pb-[132px] m-1 transition-all duration-200"
        :class="{ 'absolute hidden': isMobileScreen && !isCVPreviewVisible }"
        :style="isMobileScreen ? 'width: 100%' : `width: ${leftWidth}px`"
      >
        <div
          class="mx-auto relative"
          :style="{
            width: cvPreviewWidth,
            height: cvPreviewHeight,
          }"
        >
          <p class="absolute -top-[26px] note text-blacks-20 whitespace-nowrap">
            Layout size: A4 (21x29.7cm)
          </p>
          <div
            ref="cvPreview"
            class="w-[210mm] min-h-[297mm]"
            :style="{
              transform: `scale(${scale}%)`,
              'transform-origin': '0 0',
            }"
          >
            <CVPreview id="cv-preview" />
            <div v-if="!isMobileScreen && !isMobileDevice()">
              <Note
                v-for="note in noteList"
                :key="note.id"
                v-model:is-note-editing="isNoteEditing"
                :note="note"
                :is-open="newNoteId === note.id"
              />
            </div>
          </div>
          <div
            v-for="index in extraPages"
            :key="index"
            class="absolute flex justify-between"
            :style="{ top: `${index * scaleA4Height}px`}"
            :class="isShortPage ? '-left-5 -right-5' : '-left-25 -right-25'"
          >
            <Tooltip
              placement="right"
              text="Click ‘Download’ to see how it shows on PDF"
              style="width: 252px;"
            >
              <div
                class="note text-blacks-20 text-right pt-1 border-t border-dashed border-blacks-20"
                :class="isShortPage ? 'w-10' : 'w-30 pr-7'"
                @click="handleLeftPageClick"
              >
                {{ isShortPage ? `p.${index + 1}` : `Page ${index + 1}` }}
              </div>
            </Tooltip>
            <Tooltip
              placement="left"
              text="Click ‘Download’ to see how it shows on PDF"
              style="width: 252px;"
            >
              <div
                class="note text-blacks-20 text-left pt-1 border-t border-dashed border-blacks-20"
                :class="isShortPage ? 'w-10' : 'w-30 pl-7'"
                @click="handleRightPageClick"
              >
                {{ isShortPage ? `p.${index + 1}` : `Page ${index + 1}` }}
              </div>
            </Tooltip>
          </div>
        </div>
        <div
          class="fixed bottom-0 left-0 right-0 z-3 sm:z-0"
          :class="isDesignBarOpen ? 'sm:bottom-8' : 'sm:bottom-48'"
          :style="rightWidthStyle"
        >
          <div
            class="flex sm:inline-flex absolute bottom-0 transition group"
            :class="isDesignBarOpen ? 'center' : 'right'"
          >
            <button
              class="w-5 h-7 pb-2 m-0 hidden sm:inline-block absolute bottom-full right-0 invisible sm:group-hover:visible"
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
              :is-mobile="isMobileScreen"
            />
          </div>
        </div>

        <div
          class="fixed bottom-0 left-0 right-0 z-2 bottom-48 sm:bottom-8 sm:z-0"
          :style="rightWidthStyle"
        >
          <div class="w-12 h-32 p-2 rounded-[69px] bg-white shadow-custom flex flex-col justify-between items-center absolute bottom-0 right transition group">
            <Tooltip placement="left">
              <button class="btn-icon-32 transition-[background] duration-300" @click="() => zoomIn()">
                <span class="i-custom:zoom-in w-6 h-6" />
              </button>
              <template #content>
                <div class="flex justify-center items-center gap-4">
                  <span class="note text-blacks-100">Zoom in</span>
                  <div class="w-4 h-4 flex justify-center items-center p-[2px] border border-blacks-40 rounded">
                    <span class="i-custom:plus w-3 h-3 text-blacks-40" />
                  </div>
                </div>
              </template>
            </Tooltip>

            <Tooltip placement="left" text="Double-click to fit the screen">
              <input
                class="max-w-[42px] note text-center whitespace-nowrap text-blacks-70 outline-none rounded-none select-none hover:bg-blacks-10 focus:bg-blacks-10 transition-[background] duration-300"
                :value="scaleText"
                @change="handleScaleChange"
                @dblclick="zoomFit"
              >
            </Tooltip>

            <Tooltip placement="left">
              <button class="btn-icon-32 transition-[background] duration-300" @click="() => zoomOut()">
                <span class="i-custom:zoom-out w-6 h-6" />
              </button>
              <template #content>
                <div class="flex justify-center items-center gap-4">
                  <span class="note text-blacks-100">Zoom out</span>
                  <div class="w-4 h-4 flex justify-center items-center p-[2px] border border-blacks-40 rounded">
                    <span class="i-custom:minus w-3 h-3 text-blacks-40" />
                  </div>
                </div>
              </template>
            </Tooltip>
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
        class="resizer h-full sm:w-[1px] bg-blacks-20 cursor-[col-resize] select-none"
        :class="{ 'hidden': isMobileScreen }"
      />

      <div
        ref="rightSide"
        class="w-full h-full sm:min-w-[390px] transition-all duration-200"
        :style="isMobileScreen ? 'width: 100%' : `width: ${rightWidth}px`"
      >
        <Sidebar
          :is-mobile="isMobileScreen"
          :is-open="isSidebarOpen"
          :draggable="!isMobileScreen || !isMobileDevice()"
          :toggle="toggleSidebar"
          :set-open="setSidebarOpen"
        />
      </div>
    </div>

    <Toolbar
      v-if="isMobileScreen && !isCVPreviewVisible"
      :open="isDesignBarOpen"
      :collapse="onCollapse"
      :is-mobile="isMobileScreen"
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
@media (min-width: 640px) {
  .resizer::before:hover {
    @apply cursor-[col-resize];
  }
}
</style>
