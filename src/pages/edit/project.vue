<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { HIDDEN_INFORMATION } from '~/constants'

const user = useUserStore()
const { project } = storeToRefs(user)

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
    state.project.isShow = !state.project.isShow
    state.project.list.forEach(item => item.isShow = state.project.isShow)
  })
}

function addItem() {
  user.$patch((state) => {
    state.project.list.push({
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
    state.project.list[index].isCollapsed = !state.project.list[index].isCollapsed
  })
}

function toggleShowItem(index: number) {
  user.$patch((state) => {
    state.project.list[index].isShow = !state.project.list[index].isShow
  })
}

function duplicateItem(index: number) {
  user.$patch((state) => {
    const currentItem = JSON.parse(JSON.stringify(state.project.list[index]))
    state.project.list.splice(index, 0, currentItem)
  })
}

function deleteItem(index: number) {
  if (user.project.list.length <= 1) return

  user.$patch((state) => {
    state.project.list.splice(index, 1)
  })
}
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="flex items-center">
      <span class="i-custom:project icon-32" />
      <input
        ref="nameInput"
        v-model="project.name"
        type="text"
        maxlength="15"
        class="max-w-[132px] h-6 leading text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent outline-none ml-2"
        :title="project.name"
      >
      <button class="ml-1" @click="onEditNameClick">
        <span
          class="icon-24"
          :class="isEditName ? 'i-custom:ok' : 'i-custom:edit'"
        />
      </button>
    </h2>
    <ToggleSwitch
      :checked="project.isShow"
      @click="toggleShowAll"
    />
  </div>
  <div class="flex flex-col gap-6 pr-2 -mr-3 overflow-y-scroll custom-scrollbar">
    <p v-if="!project.isShow">
      {{ HIDDEN_INFORMATION }}
    </p>
    <div
      v-for="(item, index) in project.list"
      :key="index"
      class="group"
    >
      <div class="flex justify-between items-center">
        <h3 v-if="project.name" class="subleading text-blacks-100">
          {{ project.name[0]?.toUpperCase() + project.name.slice(1).toLowerCase() + ' ' + (index + 1) }}
        </h3>
        <div
          class="invisible flex items-center gap-3"
          :class="{ 'group-hover:visible': project.isShow }"
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
            placeholder="Project name"
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
              placeholder="Team name"
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
              placeholder="Timeline"
              class="form-input"
              :disabled="!item.isShow"
            >
          </div>
          <div>
            <label class="note text-blacks-70">Paragraph</label>
            <textarea
              v-model="item.paragraph"
              name="paragraph"
              placeholder="Describe what you have done for this project..."
              class="form-textarea custom-scrollbar"
              :disabled="!item.isShow"
            />
          </div>
        </div>
      </form>
    </div>
    <button
      class="w-full rounded-xl text-blacks-40 inline-flex justify-center items-center py-3 border-transparent border-1 group"
      :class="project.isShow ? 'bg-primary-10 hover:border-primary-100 ' : 'bg-blacks-10'"
      :disabled="!project.isShow"
      @click="addItem"
    >
      <span
        class="i-custom:add w-6 h-6 text-blacks-40"
        :class="project.isShow && 'group-hover:text-blacks-70'"
      />
      <span class="subleading" :class="project.isShow && 'group-hover:text-blacks-100'">
        Add {{ project.name.toLowerCase() }}
      </span>
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
