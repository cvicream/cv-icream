<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { DEFAULT_TEMPLATE, HIDDEN_INFORMATION, TEMPLATE_LIST_ITEM } from '~/constants'

const user = useUserStore()
const { certificate } = storeToRefs(user)

const isEditName = ref(false)
const nameInput = ref<HTMLInputElement | null>(null)
const componentKey = ref(0) // force Editor component to re-render

function forceRerender() {
  componentKey.value += 1
}

watch(nameInput, () => {
  if (nameInput.value && isEditName.value) {
    nameInput.value.focus()
    nameInput.value.select()
  }
})

function onEditNameClick() {
  isEditName.value = !isEditName.value
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
    const newItem = JSON.parse(JSON.stringify(TEMPLATE_LIST_ITEM))
    state.certificate.list.push(newItem)
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
    state.certificate.list[index].isEditing = false
    const currentItem = JSON.parse(JSON.stringify(state.certificate.list[index]))
    state.certificate.list.splice(index, 0, currentItem)
  })
  forceRerender()
}

function deleteItem(index: number) {
  if (user.certificate.list.length <= 1) return

  user.$patch((state) => {
    state.certificate.list.splice(index, 1)
  })
  forceRerender()
}
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="i-custom:certificate icon-32" />
    <div class="flex-1 h-6 overflow-hidden">
      <input
        v-if="isEditName"
        ref="nameInput"
        v-model="certificate.name"
        type="text"
        class="w-full h-full leading text-blacks-100 bg-transparent outline-none"
        :title="certificate.name"
        @keyup.enter="onEditNameClick"
      >
      <div
        v-else
        class="w-full h-full leading leading-6 text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent"
        :title="certificate.name"
      >
        {{ certificate.name }}
      </div>
    </div>
    <button @click="onEditNameClick">
      <span
        class="icon-24"
        :class="isEditName ? 'i-custom:ok' : 'i-custom:edit'"
      />
    </button>
    <ToggleSwitch
      :checked="certificate.isShow"
      @click="toggleShowAll"
    />
  </div>
  <div class="flex flex-col gap-6 pr-2 -mr-3 overflow-y-scroll custom-scrollbar">
    <p v-if="!certificate.isShow" class="paragraph text-blacks-40">
      {{ HIDDEN_INFORMATION }}
    </p>
    <p v-else class="paragraph text-blacks-70">
      Tell people what kind of certificates you have to help you apply this position.
    </p>
    <div
      v-for="(item, index) in certificate.list"
      :key="componentKey + '-' + index"
      class="group"
      @focusin="() => focusIn(index)"
      @focusout="() => focusOut(index)"
    >
      <div class="flex justify-between items-center">
        <h3 v-if="certificate.name" class="subleading text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden">
          {{ certificate.name + ' ' + (index + 1) }}
        </h3>
        <div
          class="invisible flex items-center gap-3 ml-3"
          :class="{ 'group-hover:visible': certificate.isShow }"
        >
          <button v-if="certificate.list.length > 1" @click="toggleShowItem(index)">
            <span
              class="icon-24"
              :class="item.isShow ? 'i-custom:show' : 'i-custom:hide'"
            />
          </button>
          <button @click="duplicateItem(index)">
            <span class="i-custom:variant icon-24" />
          </button>
          <button v-if="certificate.list.length > 1" @click="deleteItem(index)">
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
            :class="item.isCollapsed ? 'i-origin:open' : 'i-origin:close'"
          />
        </button>
        <div>
          <label class="note text-blacks-70">Title</label>
          <Editor
            v-model="item.title"
            class-name="h-[46px]"
            :enable="item.isShow"
            :placeholder="DEFAULT_TEMPLATE.certificate.list[0].title"
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
              :placeholder="DEFAULT_TEMPLATE.certificate.list[0].subtitle"
              :is-single-line="true"
            />
          </div>
          <div>
            <label class="note text-blacks-70">Description</label>
            <Editor
              v-model="item.paragraph"
              class-name="h-[130px]"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.certificate.list[0].paragraph"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      class="w-full rounded-xl text-blacks-40 inline-flex justify-center items-center p-3 border-transparent border-1 group"
      :class="certificate.isShow ? 'bg-primary-10 hover:border-primary-100 ' : 'bg-blacks-10'"
      :disabled="!certificate.isShow"
      @click="addItem"
    >
      <span
        class="i-custom:add w-6 h-6 text-blacks-40 flex-shrink-0"
        :class="certificate.isShow && 'group-hover:text-blacks-70'"
      />
      <span class="subleading text-ellipsis whitespace-nowrap overflow-hidden" :class="certificate.isShow && 'group-hover:text-blacks-100'">
        Add {{ certificate.name }}
      </span>
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
