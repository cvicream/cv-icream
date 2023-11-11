<script setup lang="ts">
import { type Quill } from '@vueup/vue-quill'

const props = defineProps<{
  editor: Quill
  closeIconPopover: () => void
}>()

const onClick = async(name: string) => {
  const quill = (props.editor as Quill).getQuill()
  const range = quill.getSelection()
  quill.insertEmbed(range.index, 'iconBlot', name)
}

</script>

<template>
  <div
    class="absolute bottom-[-140px] h-[128px] left-0 right-0 z-10 bg-white p-4 rounded-[1.25rem] shadow-custom"
  >
    <div class="flex justify-between mb-[16px]">
      <div class="flex gap-2 items-center">
        <div class="w-8 h-8 flex justify-center items-center">
          <span class="i-custom:icon w-6 h-6 text-blacks-70" />
        </div>
        <span class="leading text-blacks-100">Icon</span>
      </div>
      <button @click="closeIconPopover">
        <span class="i-custom:cancel w-5 h-5 text-blacks-40 hover:text-blacks-70 transition-[color] duration-300" />
      </button>
    </div>
    <div class="flex justify-between">
      <div class="flex justify-start items-start ">
        <IconElement icon="behance" :on-click="() => onClick('behance')" />
        <IconElement icon="instagram" :on-click="() => onClick('instagram')" />
        <IconElement icon="facebook" :on-click="() => onClick('instagram')" />
        <IconElement icon="linkedln" :on-click="() => onClick('instagram')" />
        <IconElement icon="whatsapp" :on-click="() => onClick('instagram')" />
        <IconElement icon="youtube" :on-click="() => onClick('instagram')" />
      </div>
    </div>
  </div>
</template>
