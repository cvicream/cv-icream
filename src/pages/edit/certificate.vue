<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { HIDDEN_INFORMATION } from '~/constants'

const user = useUserStore()
const { certificate } = storeToRefs(user)

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
    state.certificate.list[index].isEditing = true
  })
}

function focusOut(index) {
  user.$patch((state) => {
    state.certificate.list[index].isEditing = false
  })
}

function toggleShowAll() {
  user.$patch((state) => {
    state.certificate.isShow = !state.certificate.isShow
    state.certificate.list.forEach(item => item.isShow = state.certificate.isShow)
  })
}

function addItem() {
  user.$patch((state) => {
    state.certificate.list.push({
      isShow: true,
      isCollapsed: false,
      isEditing: false,
      title: '',
      subtitle1: '',
      subtitle2: '',
      paragraph: '',
    })
  })
}

function toggleCollapseItem(index: number) {
  user.$patch((state) => {
    state.certificate.list[index].isCollapsed = !state.certificate.list[index].isCollapsed
  })
}

function toggleShowItem(index: number) {
  user.$patch((state) => {
    state.certificate.list[index].isShow = !state.certificate.list[index].isShow
  })
}

function duplicateItem(index: number) {
  user.$patch((state) => {
    const currentItem = JSON.parse(JSON.stringify(state.certificate.list[index]))
    state.certificate.list.splice(index, 0, currentItem)
  })
}

function deleteItem(index: number) {
  if (user.certificate.list.length <= 1) return

  user.$patch((state) => {
    state.certificate.list.splice(index, 1)
  })
}
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="flex items-center">
      <span class="i-custom:certificate icon-32" />
      <input
        ref="nameInput"
        v-model="certificate.name"
        type="text"
        maxlength="15"
        class="max-w-[132px] h-6 leading text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent outline-none ml-2"
        :title="certificate.name"
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
      :checked="certificate.isShow"
      @click="toggleShowAll"
    />
  </div>
  <div class="flex flex-col gap-6 pr-2 -mr-3 overflow-y-scroll custom-scrollbar">
    <p v-if="!certificate.isShow" class="paragraph text-blacks-70">
      {{ HIDDEN_INFORMATION }}
    </p>
    <div
      v-for="(item, index) in certificate.list"
      :key="index"
      class="group"
      @focusin="() => focusIn(index)"
      @focusout="() => focusOut(index)"
    >
      <div class="flex justify-between items-center">
        <div>
          <h3 v-if="certificate.name" class="subleading text-blacks-100">
            {{ certificate.name[0]?.toUpperCase() + certificate.name.slice(1).toLowerCase() + ' ' + (index + 1) }}
          </h3>
        </div>
        <div
          class="invisible flex items-center gap-3"
          :class="{ 'group-hover:visible': certificate.isShow }"
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
          <Editor
            v-model="item.title"
            class-name="h-[46px]"
            :enable="item.isShow"
            placeholder="Title"
            :is-single-line="true"
          />
        </div>
        <div :class="item.isCollapsed ? 'hidden' : 'flex flex-col gap-6'">
          <div>
            <label class="note text-blacks-70">Subtitle</label>
            <Editor
              v-model="item.subtitle1"
              class-name="h-[46px]"
              :enable="item.isShow"
              placeholder="Subtitle"
              :is-single-line="true"
            />
          </div>
          <div>
            <label class="note text-blacks-70">Paragraph</label>
            <Editor
              v-model="item.paragraph"
              class-name="h-[130px]"
              :enable="item.isShow"
              placeholder="Paragraph"
            />
          </div>
        </div>
      </form>
    </div>
    <button
      class="w-full rounded-xl text-blacks-40 inline-flex justify-center items-center py-3 border-transparent border-1 group"
      :class="certificate.isShow ? 'bg-primary-10 hover:border-primary-100 ' : 'bg-blacks-10'"
      :disabled="!certificate.isShow"
      @click="addItem"
    >
      <span
        class="i-custom:add w-6 h-6 text-blacks-40"
        :class="certificate.isShow && 'group-hover:text-blacks-70'"
      />
      <span class="subleading" :class="certificate.isShow && 'group-hover:text-blacks-100'">
        Add {{ certificate.name.toLowerCase() }}
      </span>
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
