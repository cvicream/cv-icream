<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { HIDDEN_INFORMATION } from '~/constants'

const user = useUserStore()
const { experience } = storeToRefs(user)

const isEditName = ref(false)
const nameInput = ref<HTMLInputElement | null>(null)

function onEditNameClick() {
  isEditName.value = !isEditName.value
  if (nameInput.value) {
    if (isEditName.value) {
      nameInput.value.disabled = false
      nameInput.value.focus()
      nameInput.value.select()
    }
    else {
      nameInput.value.disabled = true
    }
  }
}

function toggleShowAll() {
  user.$patch((state) => {
    state.experience.isShow = !state.experience.isShow
    state.experience.list.forEach(item => item.isShow = state.experience.isShow)
  })
}

function addItem() {
  user.$patch((state) => {
    state.experience.list.push({
      isShow: true,
      isCollapsed: false,
      title: '',
      subtitle1: '',
      subtitle2: '',
      paragraph: '',
    })
  })
}

function toggleCollapseItem(index: number) {
  user.$patch((state) => {
    state.experience.list[index].isCollapsed = !state.experience.list[index].isCollapsed
  })
}

function toggleShowItem(index: number) {
  user.$patch((state) => {
    state.experience.list[index].isShow = !state.experience.list[index].isShow
  })
}

function duplicateItem(index: number) {
  user.$patch((state) => {
    const currentItem = JSON.parse(JSON.stringify(state.experience.list[index]))
    state.experience.list.splice(index, 0, currentItem)
  })
}

function deleteItem(index: number) {
  if (user.experience.list.length <= 1) return

  user.$patch((state) => {
    state.experience.list.splice(index, 1)
  })
}
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="flex items-center">
      <span class="i-custom:experience icon-32" />
      <input
        ref="nameInput"
        v-model="experience.name"
        type="text"
        maxlength="15"
        class="max-w-[132px] h-6 leading text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent outline-none ml-2"
        :title="experience.name"
      >
      <button class="ml-1" @click="onEditNameClick">
        <span
          class="icon-24"
          :class="isEditName ? 'i-custom:ok' : 'i-custom:edit'"
        />
      </button>
    </h2>
    <ToggleSwitch
      :checked="experience.isShow"
      @click="toggleShowAll"
    />
  </div>
  <div class="flex flex-col gap-6 pr-2 -mr-3 overflow-y-scroll custom-scrollbar">
    <p v-if="!experience.isShow">
      {{ HIDDEN_INFORMATION }}
    </p>
    <div
      v-for="(item, index) in experience.list"
      :key="index"
      class="group"
    >
      <div class="flex justify-between items-center">
        <h3 v-if="experience.name" class="subleading text-blacks-100">
          {{ experience.name[0]?.toUpperCase() + experience.name.slice(1).toLowerCase() + ' ' + (index + 1) }}
        </h3>
        <div
          class="invisible flex items-center gap-3"
          :class="{ 'group-hover:visible': experience.isShow }"
        >
          <button @click="toggleShowItem(index)">
            <span
              class="icon-24"
              :class="item.isShow ? 'i-custom:show' : 'i-custom:hide'"
            />
          </button>
          <button @click="duplicateItem(index)">
            <span class="i-custom:variant icon-24" />
          </button>
          <button @click="deleteItem(index)">
            <span class="i-custom:delete icon-24" />
          </button>
        </div>
      </div>
      <form
        class="rounded-xl mt-3 px-4 py-6 flex flex-col gap-6 relative"
        :class="[(item.isShow ? 'bg-primary-10': 'bg-blacks-10')]"
      >
        <button
          class="absolute top-4 right-4"
          @click.prevent="toggleCollapseItem(index)"
        >
          <span
            class="icon-24"
            :class="item.isCollapsed ? 'i-custom:min' : 'i-custom:max'"
          />
        </button>
        <div>
          <label class="note text-blacks-70">Title</label>
          <input
            v-model="item.title"
            type="search"
            name="title"
            placeholder="Title"
            class="form-input"
            :disabled="!item.isShow"
          >
        </div>
        <div :class="item.isCollapsed ? 'hidden' : 'flex flex-col gap-6'">
          <div>
            <label class="note text-blacks-70">Subtitle (to the left)</label>
            <input
              v-model="item.subtitle1"
              type="search"
              name="subtitle"
              placeholder="Subtitle"
              class="form-input"
              :disabled="!item.isShow"
            >
          </div>
          <div>
            <label class="note text-blacks-70">Subtitle (to the right)</label>
            <input
              v-model="item.subtitle2"
              type="search"
              name="subtitle"
              placeholder="Subtitle"
              class="form-input"
              :disabled="!item.isShow"
            >
          </div>
          <div>
            <label class="note text-blacks-70">Paragraph</label>
            <textarea
              v-model="item.paragraph"
              name="paragraph"
              placeholder="Paragraph"
              class="form-textarea custom-scrollbar"
              :disabled="!item.isShow"
            />
          </div>
        </div>
      </form>
    </div>
    <button
      class="w-full rounded-xl font-normal text-lg leading-[1.375rem] text-blacks-40 inline-flex justify-center items-center py-3 border-transparent border-1 group"
      :class="experience.isShow ? 'bg-primary-10 hover:border-primary-100 ' : 'bg-blacks-10'"
      :disabled="!experience.isShow"
      @click="addItem"
    >
      <span
        class="i-custom:add w-6 h-6 text-blacks-40"
        :class="experience.isShow && 'group-hover:text-blacks-70'"
      />
      <span :class="experience.isShow && 'group-hover:text-blacks-100'">
        Add {{ experience.name.toLowerCase() }}
      </span>
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
