<script setup lang="ts">
import { onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useToolbarStore } from '~/stores/toolbar'

const toolbar = useToolbarStore()
const { dropdownMenu, colours, fontFamily } = storeToRefs(toolbar)

const onClick = () => {
  if (Object.values(dropdownMenu.value).some(item => item))
    toolbar.toggle('')
}

const onColourChange = (index: number) => {
  toolbar.changeColour(index)
}

const onFontSizeChange = (fontSizeType: string) => {
  toolbar.changeFontSize(fontSizeType)
}

const onFontFamilyChange = (index: number) => {
  toolbar.changeFontFamily(index)
}

const onLayoutChange = (layoutType: string) => {
  toolbar.changeLayout(layoutType)
}

onUnmounted(() => {
  window.removeEventListener('click', onClick)
})

window.addEventListener('click', onClick, false)
</script>

<template>
  <div class="font-arial font-gill-sans font-helvetica font-times-new-roman font-georgia font-lato" />
  <div class="w-full h-20 text-center bg-white flex justify-between gap-4 px-4 py-4 border-t-1 border-blacks-20 sm:w-auto sm:border-0 sm:rounded-xl sm:shadow-custom">
    <div class="btn-group-toolbar w-22 h-12">
      <div class="btn-toolbar">
        <button class="i-custom:undo w-8 h-8" />
      </div>
      <div class="btn-toolbar">
        <button class="i-custom:redo w-8 h-8" />
      </div>
    </div>
    <div class="btn-group-toolbar w-42 h-12 relative">
      <DropdownMenu id="layout" label="Layout" icon="i-custom:template text-blacks-70">
        <div class="btn-toolbar w-12 h-12">
          <button
            class="i-custom:template-right w-8 h-8"
            @click="onLayoutChange('main-right')"
          />
        </div>
        <div class="btn-toolbar w-12 h-12">
          <button
            class="i-custom:template-left w-8 h-8"
            @click="onLayoutChange('main-left')"
          />
        </div>
        <div class="btn-toolbar w-12 h-12">
          <button
            class="i-custom:template-full w-8 h-8"
            @click="onLayoutChange('main-full')"
          />
        </div>
      </DropdownMenu>
      <DropdownMenu id="colour" label="Colour" icon="icon-colour">
        <div
          v-for="(item, index) in colours"
          :key="index"
          class="btn-toolbar w-12 h-12"
        >
          <button
            :style="{
              '--colour-primary': item.primary,
              '--colour-secondary': item.secondary
            }"
            class="icon-colour-item"
            @click="onColourChange(index)"
          />
        </div>
      </DropdownMenu>
      <DropdownMenu id="fontSize" label="Font Size" icon="i-custom:font-size text-blacks-70">
        <div class="btn-toolbar w-12 h-12">
          <button
            class="i-custom:font-size w-6 h-6"
            @click="onFontSizeChange('default')"
          />
        </div>
        <div class="btn-toolbar w-12 h-12">
          <button
            class="i-custom:font-size  w-8 h-8"
            @click="onFontSizeChange('large')"
          />
        </div>
      </DropdownMenu>
      <DropdownMenu id="fontFamily" label="Font Family" icon="i-custom:font-family text-blacks-70">
        <div class="w-full h-22 overflow-auto custom-scrollbar">
          <div
            v-for="(item, index) in fontFamily"
            :key="index"
          >
            <button
              :class="item.name"
              class="w-full h-[46px] text-left text-base px-4 py-3 hover:bg-primary-10"
              @click="onFontFamilyChange(index)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
      </DropdownMenu>
    </div>
    <div class="btn-group-toolbar w-22 h-12">
      <div class="btn-toolbar">
        <button class="i-custom:note w-8 h-8" />
      </div>
      <div class="btn-toolbar">
        <button class="i-custom:feedback w-8 h-8" />
      </div>
    </div>
  </div>
</template>
