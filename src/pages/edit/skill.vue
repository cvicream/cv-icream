<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { DEFAULT_TEMPLATE, HIDDEN_INFORMATION, TEMPLATE_LIST_ITEM } from '~/constants'

const user = useUserStore()
const { skill } = storeToRefs(user)

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

function focusIn(index) {
  user.$patch((state) => {
    state.skill.list[index].isEditing = true
  })
}

function focusOut(index) {
  user.$patch((state) => {
    state.skill.list[index].isEditing = false
  })
}

function toggleShowAll() {
  user.$patch((state) => {
    state.skill.isShow = !state.skill.isShow
    state.skill.list.forEach(item => item.isShow = state.skill.isShow)
  })
}

function addItem() {
  user.$patch((state) => {
    state.skill.list.push(TEMPLATE_LIST_ITEM)
  })
}

function toggleCollapseItem(index: number) {
  user.$patch((state) => {
    state.skill.list[index].isCollapsed = !state.skill.list[index].isCollapsed
  })
}

function toggleShowItem(index: number) {
  user.$patch((state) => {
    state.skill.list[index].isShow = !state.skill.list[index].isShow
  })
}

function duplicateItem(index: number) {
  user.$patch((state) => {
    state.skill.list[index].isEditing = false
    const currentItem = JSON.parse(JSON.stringify(state.skill.list[index]))
    state.skill.list.splice(index, 0, currentItem)
  })
}

function deleteItem(index: number) {
  if (user.skill.list.length <= 1) return

  user.$patch((state) => {
    state.skill.list.splice(index, 1)
  })
}
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="flex items-center">
      <span class="i-custom:skill icon-32" />
      <input
        ref="nameInput"
        v-model="skill.name"
        type="text"
        maxlength="15"
        class="max-w-[132px] h-6 leading text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent outline-none ml-2"
        :title="skill.name"
        :disabled="!isEditName"
      >
      <button class="ml-1" @click="onEditNameClick">
        <span
          class="icon-24"
          :class="isEditName ? 'i-custom:ok' : 'i-custom:edit'"
        />
      </button>
    </h2>
    <ToggleSwitch
      :checked="skill.isShow"
      @click="toggleShowAll"
    />
  </div>
  <div class="flex flex-col gap-6 pr-2 -mr-3 overflow-y-scroll custom-scrollbar">
    <p v-if="!skill.isShow" class="paragraph text-blacks-70">
      {{ HIDDEN_INFORMATION }}
    </p>
    <div
      v-for="(item, index) in skill.list"
      :key="index"
      class="group"
      @focusin="() => focusIn(index)"
      @focusout="() => focusOut(index)"
    >
      <div class="flex justify-between items-center">
        <div>
          <h3 v-if="skill.name" class="subleading text-blacks-100">
            {{ skill.name[0]?.toUpperCase() + skill.name.slice(1).toLowerCase() + ' ' + (index + 1) }}
          </h3>
        </div>
        <div
          class="invisible flex items-center gap-3"
          :class="{ 'group-hover:visible': skill.isShow }"
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
      <div
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
          <Editor
            v-model="item.title"
            class-name="h-[46px]"
            :enable="item.isShow"
            :placeholder="DEFAULT_TEMPLATE.skill.list[0].title"
            :is-single-line="true"
          />
        </div>
        <div :class="item.isCollapsed ? 'hidden' : 'flex flex-col gap-6'">
          <div>
            <label class="note text-blacks-70">Subtitle</label>
            <Editor
              v-model="item.subtitle"
              class-name="h-[46px]"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.skill.list[0].subtitle"
              :is-single-line="true"
            />
          </div>
          <div>
            <label class="note text-blacks-70">Paragraph</label>
            <Editor
              v-model="item.paragraph"
              class-name="h-[130px]"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.skill.list[0].paragraph"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      class="w-full rounded-xl text-blacks-40 inline-flex justify-center items-center py-3 border-transparent border-1 group"
      :class="skill.isShow ? 'bg-primary-10 hover:border-primary-100 ' : 'bg-blacks-10'"
      :disabled="!skill.isShow"
      @click="addItem"
    >
      <span
        class="i-custom:add w-6 h-6 text-blacks-40"
        :class="skill.isShow && 'group-hover:text-blacks-70'"
      />
      <span class="subleading" :class="skill.isShow && 'group-hover:text-blacks-100'">
        Add {{ skill.name.toLowerCase() }}
      </span>
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
