<script setup lang="ts">
import { onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useToolbarStore } from '~/stores/toolbar'
import { COLORS, FONT_FAMILIES, FONT_SIZES, LAYOUTS } from '~/constants'
import { getColor } from '~/utils'

const toolbar = useToolbarStore()
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
</script>

<template>
  <div class="w-full h-20 text-center bg-white flex justify-between gap-4 px-4 py-4 border-t-1 border-blacks-20 sm:w-auto sm:border-0 sm:rounded-xl sm:shadow-custom">
    <div class="btn-group-toolbar w-22 h-12">
      <div class="btn-toolbar">
        <button class="i-custom:undo w-8 h-8" />
      </div>
      <div class="btn-toolbar">
        <button class="i-custom:redo w-8 h-8" />
      </div>
    </div>
    <div class="icon" />
    <div
      class="btn-group-toolbar w-42 h-12 relative sm:flex"
      :class="{ 'hidden': !isCVPreviewVisible }"
    >
      <DropdownMenu id="layout" label="Layout" icon="i-custom:template text-blacks-70">
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
    <!-- <div class="btn-group-toolbar w-12 h-12">
      <div class="btn-toolbar">
        <button class="i-custom:note w-8 h-8" />
      </div>
    </div> -->
  </div>
</template>
