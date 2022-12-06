<script setup lang="ts">
import { onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { useUndoStore } from '~/stores/undo'
import { useRedoStore } from '~/stores/redo'
import { COLORS, FONT_FAMILIES, FONT_SIZES, LAYOUTS } from '~/constants'
import { getColor } from '~/utils'

const props = defineProps<{
  open: Boolean
  collapse: Function
  isMobile: Boolean
}>()

const user = useUserStore()
const toolbar = useToolbarStore()
const undoStore = useUndoStore()
const redoStore = useRedoStore()
const { isCVPreviewVisible, dropdownMenu, currentState } = storeToRefs(toolbar)

const onClick = () => {
  if (Object.values(dropdownMenu.value).some(item => item))
    toolbar.toggle('')
}

const onColorChange = (id: string) => {
  toolbar.changeColor(id)
}

const onFontSizeChange = (id: string) => {
  toolbar.changeFontSize(id)
}

const onFontFamilyChange = (id: string) => {
  toolbar.changeFontFamily(id)
}

const onLayoutChange = (id: string) => {
  toolbar.changeLayout(id)
}

onUnmounted(() => {
  window.removeEventListener('click', onClick)
})

window.addEventListener('click', onClick, false)

function undo() {
  const list = undoStore.list
  if (list.length >= 2) {
    const newState = list[list.length - 2]
    if (newState) {
      const last = undoStore.pop()
      redoStore.push(last)
      newState.user.action = 'undo'
      updateStore(newState)
    }
  }
}
function redo() {
  const list = redoStore.list
  if (list.length) {
    const newState = list[list.length - 1]
    if (newState) {
      redoStore.pop()
      newState.user.action = 'redo'
      updateStore(newState)
    }
  }
}

function updateStore(obj) {
  Object.keys(obj).forEach((key) => {
    if (key === 'user') {
      const subObj = obj[key]
      Object.keys(subObj).forEach((subKey) => {
        user.$patch((state) => {
          state[subKey] = subObj[subKey]
        })
      })
      user.updateTimestamp()
    }
    else if (key === 'toolbar') {
      const subObj = obj[key]
      Object.keys(subObj).forEach((subKey) => {
        toolbar.$patch((state) => {
          state[subKey] = subObj[subKey]
        })
      })
    }
  })
}

function onCollapse() {
  if (!props.open)
    props.collapse()
}
</script>

<template>
  <div
    class="w-full h-[80px] text-center bg-white flex justify-center gap-4 px-4 py-4 sm:w-auto sm-h-20 sm:rounded-xl sm:shadow-custom transition"
    :class="{ 'hover:cursor-pointer': !open }"
    @click="onCollapse"
  >
    <div v-if="!open" class="btn-group-toolbar h-12 relative sm:flex">
      <div class="btn-toolbar w-8 h-8">
        <button
          :style="{
            '--color-primary': getColor(currentState.color).primary,
            '--color-secondary': getColor(currentState.color).secondary
          }"
          class="w-8 h-8 icon-color-item"
        />
      </div>
    </div>

    <div
      v-if="open"
      class="btn-group-toolbar w-22 h-12"
      :class="{ 'hidden': isMobile && isCVPreviewVisible }"
    >
      <button
        class="btn-toolbar"
        :disabled="undoStore.isEmpty"
        @click="undo"
      >
        <span
          class="i-custom:undo w-8 h-8"
          :class="{ 'text-blacks-10': undoStore.isEmpty }"
        />
      </button>
      <button
        class="btn-toolbar"
        :disabled="redoStore.isEmpty"
        @click="redo"
      >
        <span
          class="i-custom:redo w-8 h-8"
          :class="{ 'text-blacks-10': redoStore.isEmpty }"
        />
      </button>
    </div>

    <div
      v-if="open"
      class="btn-group-toolbar w-42 h-12 relative sm:flex"
      :class="{ 'hidden': !isCVPreviewVisible }"
    >
      <DropdownMenu id="layout" label="Layout" icon="i-custom:layout text-blacks-70">
        <div
          v-for="item in LAYOUTS"
          :key="item.id"
          class="btn-toolbar w-12 h-12"
          :class="{ 'bg-primary-10 rounded-full': currentState.layout === item.id }"
        >
          <button
            class="w-8 h-8"
            :class="item.icon"
            @click="onLayoutChange(item.id)"
          />
        </div>
      </DropdownMenu>
      <DropdownMenu
        id="color"
        :style="{
          '--color-primary': getColor(currentState.color).primary,
          '--color-secondary': getColor(currentState.color).secondary
        }"
        label="Colour" icon="icon-color-item"
      >
        <div
          v-for="item in COLORS"
          :key="item.id"
          class="btn-toolbar w-12 h-12"
          :class="{ 'bg-primary-10 rounded-full': currentState.color === item.id }"
        >
          <button
            :style="{
              '--color-primary': item.primary,
              '--color-secondary': item.secondary
            }"
            class="icon-color-item "
            @click="onColorChange(item.id)"
          />
        </div>
      </DropdownMenu>
      <DropdownMenu id="fontSize" label="Font Size" icon="i-custom:font-size text-blacks-70">
        <div
          v-for="item in FONT_SIZES"
          :key="item.id"
          class="btn-toolbar w-12 h-12"
          :class="{ 'bg-primary-10 rounded-full': currentState.fontSize === item.id }"
        >
          <button
            :class="item.icon"
            @click="onFontSizeChange(item.id)"
          />
        </div>
      </DropdownMenu>
      <DropdownMenu id="fontFamily" label="Font Family" icon="i-custom:font-family text-blacks-70">
        <div class="w-full h-22 overflow-auto custom-scrollbar">
          <div
            v-for="item in FONT_FAMILIES"
            :key="item.id"
            :class="{ 'bg-primary-10': currentState.fontFamily === item.id }"
          >
            <button
              :class="item.id"
              class="w-full h-[46px] text-left text-base px-4 py-3 hover:bg-primary-10"
              @click="onFontFamilyChange(item.id)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
      </DropdownMenu>
    </div>
    <!-- <div v-if="open" class="btn-group-toolbar w-12 h-12">
      <div class="btn-toolbar">
        <button class="i-custom:note w-8 h-8" />
      </div>
    </div> -->
  </div>
</template>
