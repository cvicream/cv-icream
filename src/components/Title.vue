<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const props = defineProps<{
  category: string
  hasToggleBtn?: boolean
}>()

const user = useUserStore()
const item = storeToRefs(user)[props.category]

const isEditName = ref(false)
const nameInput = ref<HTMLInputElement | null>(null)

watch(nameInput, () => {
  if (nameInput.value && isEditName.value)
    nameInput.value?.focus()
})

function onChangToEdit() {
  isEditName.value = true
}

function onChangeToDisplay() {
  isEditName.value = false
}

function toggleShowAll() {
  user.$patch((state) => {
    state[props.category].isShow = !state[props.category].isShow
    state[props.category].list.forEach(item => item.isShow = state[props.category].isShow)
  })
}

</script>

<template>
  <div class="flex items-center gap-2">
    <span :class="'i-origin:' + props.category + ' icon-32'" />
    <div class="flex-1 h-8 overflow-hidden">
      <input
        v-if="isEditName"
        ref="nameInput"
        v-model="item.name"
        type="text"
        class="w-full h-full leading text-blacks-100 bg-transparent outline-none"
        :title="item.name"
        @keyup.enter="onChangeToDisplay"
        @focusout="onChangeToDisplay"
      >
      <div
        v-else
        class="hover:bg-blacks-20 hover:cursor-text w-full h-full flex items-center leading leading-6 text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent"
        :title="item.name"
        @click="onChangToEdit"
      >
        {{ item.name }}
      </div>
    </div>
    <ToggleSwitch
      v-if="hasToggleBtn"
      :checked="item.isShow"
      @click="toggleShowAll"
    />
  </div>
</template>
